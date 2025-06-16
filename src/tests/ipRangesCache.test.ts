import { setIpRanges, getIpRanges } from '../cache/ipRangesCache';
import { IpRange } from '../types/ipRangesType';

describe('ipRangesCache', () => {
    const mockData: IpRange[] = [
        { lower: 1, upper: 10, countryCode: 'BR', countryName: 'Brazil', state: 'PR', city: 'Curitiba' },
        { lower: 11, upper: 20, countryCode: 'US', countryName: 'United States', state: 'CA', city: 'San Francisco' }
    ];

    afterEach(() => {
        setIpRanges([]);
    });

    test('should set and get ip ranges correctly', () => {
        setIpRanges(mockData);
        const result = getIpRanges();

        expect(result).toEqual(mockData);
    });

    test('should overwrite ip ranges', () => {
        const newData: IpRange[] = [
            { lower: 100, upper: 200, countryCode: 'FR', countryName: 'France', state: 'IDF', city: 'Paris' }
        ];

        setIpRanges(mockData);
        setIpRanges(newData);

        const result = getIpRanges();
        expect(result).toEqual(newData);
    });
});
