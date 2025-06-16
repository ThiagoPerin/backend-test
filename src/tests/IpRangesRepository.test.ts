import { IpRangesRepository } from '../repositories/IpRangesRepository';
import * as ipRangesCache from '../cache/ipRangesCache';
import * as ipCalculator from '../utils/ip-calculator';
import * as findIpRangeByIdUtil from '../utils/findIpRangeById';

describe('IpRangesRepository', () => {
    let repository: IpRangesRepository;

    beforeEach(() => {
        repository = new IpRangesRepository();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should return ip range when valid ip is provided', async () => {
        const mockIpRanges = [{ lower: 0, upper: 100, countryCode: 'BR', countryName: 'Brazil', state: 'PR', city: 'Curitiba' }];
        const mockIp = '1.1.1.1';
        const mockId = 50;
        const mockIpRange = mockIpRanges[0];

        jest.spyOn(ipRangesCache, 'getIpRanges').mockReturnValue(mockIpRanges);
        jest.spyOn(ipCalculator, 'ipToID').mockReturnValue(mockId);
        jest.spyOn(findIpRangeByIdUtil, 'findIpRangeById').mockReturnValue(mockIpRange);

        const result = await repository.findIpRange(mockIp);

        expect(result).toBe(mockIpRange);
    });

    test('should return null when ipToID returns NaN', async () => {
        const mockIp = 'invalid.ip';
        jest.spyOn(ipRangesCache, 'getIpRanges').mockReturnValue([]);
        jest.spyOn(ipCalculator, 'ipToID').mockReturnValue(NaN);

        const result = await repository.findIpRange(mockIp);

        expect(result).toBeNull();
    });

    test('should call findIpRangeById with correct parameters', async () => {
        const mockIpRanges = [{ lower: 0, upper: 100, countryCode: 'BR', countryName: 'Brazil', state: 'PR', city: 'Curitiba' }];
        const mockIp = '1.1.1.1';
        const mockId = 50;

        jest.spyOn(ipRangesCache, 'getIpRanges').mockReturnValue(mockIpRanges);
        jest.spyOn(ipCalculator, 'ipToID').mockReturnValue(mockId);
        const findSpy = jest.spyOn(findIpRangeByIdUtil, 'findIpRangeById').mockReturnValue(null);

        await repository.findIpRange(mockIp);

        expect(findSpy).toHaveBeenCalledWith(mockIpRanges, mockId);
    });
});
