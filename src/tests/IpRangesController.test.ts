import { Request, Response } from 'express';
import { IpRangesController } from '../controllers/IpRangesController';
import { IpRangesService } from '../services/IpRangesService';

jest.mock('../services/IpRangesService');

describe('IpRangesController', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let statusMock: jest.Mock;
    let jsonMock: jest.Mock;

    beforeEach(() => {
        req = {};
        statusMock = jest.fn().mockReturnThis();
        jsonMock = jest.fn();
        res = { status: statusMock, json: jsonMock };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should return 400 if no IP is provided', async () => {
        req.query = {};

        await IpRangesController.findIpRange(req as Request, res as Response);

        expect(statusMock).toHaveBeenCalledWith(400);
        expect(jsonMock).toHaveBeenCalledWith({ message: 'No IP provided.' });
    });

    test('should return 404 if IP location is not found', async () => {
        req.query = { ip: '1.1.1.1' };
        (IpRangesService.prototype.findIpRange as jest.Mock).mockResolvedValue(null);

        await IpRangesController.findIpRange(req as Request, res as Response);

        expect(statusMock).toHaveBeenCalledWith(404);
        expect(jsonMock).toHaveBeenCalledWith({ message: 'IP location not found.' });
    });

    test('should return 200 with location if IP is found', async () => {
        req.query = { ip: '1.1.1.1' };
        const mockLocation = { country: 'Brazil', countryCode: 'BR', city: 'Curitiba' };
        (IpRangesService.prototype.findIpRange as jest.Mock).mockResolvedValue(mockLocation);

        await IpRangesController.findIpRange(req as Request, res as Response);

        expect(statusMock).toHaveBeenCalledWith(200);
        expect(jsonMock).toHaveBeenCalledWith(mockLocation);
    });

    test('should return 500 if service throws an error', async () => {
        req.query = { ip: '1.1.1.1' };
        (IpRangesService.prototype.findIpRange as jest.Mock).mockRejectedValue(new Error('Service error'));

        const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

        await IpRangesController.findIpRange(req as Request, res as Response);

        expect(statusMock).toHaveBeenCalledWith(500);
        expect(jsonMock).toHaveBeenCalledWith({ error: true, message: 'Erro no servidor.' });

        consoleSpy.mockRestore();
    });
});
