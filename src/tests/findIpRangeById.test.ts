import { findIpRangeById } from '../utils/findIpRangeById';
import { IpRange } from '../types/ipRangesType';

describe('findIpRangeById', () => {
    const ipRanges: IpRange[] = [
        { lower: 0, upper: 99, countryCode: 'BR', countryName: 'Brazil', state: 'PR', city: 'Curitiba' },
        { lower: 100, upper: 199, countryCode: 'US', countryName: 'United States', state: 'CA', city: 'San Francisco' },
        { lower: 200, upper: 299, countryCode: 'DE', countryName: 'Germany', state: 'BE', city: 'Berlin' },
    ];

    it('should return the correct IpRange when value is within a range', () => {
        const result = findIpRangeById(ipRanges, 150);
        expect(result).toEqual(ipRanges[1]);
    });

    it('should return null when value is below all ranges', () => {
        const result = findIpRangeById(ipRanges, -10);
        expect(result).toBeNull();
    });

    it('should return null when value is above all ranges', () => {
        const result = findIpRangeById(ipRanges, 500);
        expect(result).toBeNull();
    });

    it('should return null when array is empty', () => {
        const result = findIpRangeById([], 150);
        expect(result).toBeNull();
    });
});
