import fs from 'fs';
import { Readable } from 'stream';
import { loadAndProcessCsv } from '../utils/loadAndProcessCsv';

jest.mock('fs');

describe('loadAndProcessCsv', () => {
    const mockCsvData = [
        '"16777728","16778239","AU","Australia","Victoria","Melbourne"',
        '"16777472","16777727","AU","Australia","Queensland","Gold Coast"',
        '"16777216","16777471","AU","Australia","Queensland","Brisbane"',
        'invalid,line,with,less,columns'
    ];

    function createMockReadable(data: string[]) {
        const readable = new Readable({
            read() {
                data.forEach(line => this.push(line + '\n'));
                this.push(null);
            }
        });
        return readable;
    }

    beforeEach(() => {
        (fs.createReadStream as jest.Mock).mockImplementation(() => createMockReadable(mockCsvData));
    });

    test('should correctly load and process a valid CSV file', async () => {
        const result = await loadAndProcessCsv('mock.csv');

        expect(result.length).toBe(3);
        expect(result[0]).toEqual({
            lower: 16777216,
            upper: 16777471,
            countryCode: 'AU',
            countryName: 'Australia',
            state: 'Queensland',
            city: 'Brisbane'
        });
    });

    test('should ignore invalid lines with less than 6 columns', async () => {
        const result = await loadAndProcessCsv('mock.csv');

        expect(result.length).toBe(3);
        expect(result.find(r => r.city === 'columns')).toBeUndefined();
    });

    test('should sort the ip ranges by lower value', async () => {
        const result = await loadAndProcessCsv('mock.csv');

        expect(result[0].lower).toBe(16777216);
        expect(result[1].lower).toBe(16777472);
        expect(result[2].lower).toBe(16777728);
    });
});
