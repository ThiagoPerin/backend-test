import { IpRangesRepository } from "../repositories/ipRangesRepository";

export class IpRangesService {
    private repository: IpRangesRepository;

    constructor() {
        this.repository = new IpRangesRepository();
    }

    async findIpRange(ip: string) {
        const ipRange = await this.repository.findIpRange(ip);

        if (!ipRange) return null;

        return {
            country: ipRange.countryName,
            countryCode: ipRange.countryCode,
            city: ipRange.city,
        };
    }
}