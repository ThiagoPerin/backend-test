import { IpRangesService } from '../services/IpRangesService';
import { IpRangesRepository } from '../repositories/IpRangesRepository';

jest.mock('../repositories/IpRangesRepository');

describe('IpRangesService', () => {
    let service: IpRangesService;

    beforeEach(() => {
        service = new IpRangesService();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should return location data when IP is found', async () => {
        const mockIpRange = {
            countryName: 'Brazil',
            countryCode: 'BR',
            city: 'Curitiba',
        };

        (IpRangesRepository.prototype.findIpRange as jest.Mock).mockResolvedValue(mockIpRange);

        const result = await service.findIpRange('1.1.1.1');

        expect(result).toEqual({
            country: 'Brazil',
            countryCode: 'BR',
            city: 'Curitiba',
        });
    });

    test('should return null when IP is not found', async () => {
        (IpRangesRepository.prototype.findIpRange as jest.Mock).mockResolvedValue(null);

        const result = await service.findIpRange('256.256.256.256');

        expect(result).toBeNull();
    });
});
