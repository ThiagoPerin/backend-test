import fs from 'fs';
import readline from 'readline';
import { IpRangeType } from '../types/ipRangesType';

function sanitizeCsvValue(value: string): string {
    return value.replace(/^"|"$/g, '').trim();
}

export async function loadAndProcessCsv(filePath: string): Promise<IpRangeType[]> {
    console.log('Loading And Processing CSV...');
    const ipRanges: IpRangeType[] = [];

    const rl = readline.createInterface({
        input: fs.createReadStream(filePath),
        crlfDelay: Infinity,
    });

    for await (const line of rl) {
        const cols = line.split(',');
        if (cols.length >= 6) {
            ipRanges.push({
                lower: Number(sanitizeCsvValue(cols[0])),
                upper: Number(sanitizeCsvValue(cols[1])),
                countryCode: sanitizeCsvValue(cols[2]),
                countryName: sanitizeCsvValue(cols[3]),
                state: sanitizeCsvValue(cols[4]),
                city: sanitizeCsvValue(cols[5]),
            });
        }
    }

    console.log('Sorting IP Ranges...');
    ipRanges.sort((a, b) => a.lower - b.lower);

    console.log('CSV loaded and processed.');
    return ipRanges;
}
