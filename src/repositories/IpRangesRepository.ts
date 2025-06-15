import { getIpRanges } from "../cache/ipRangesCache";
import { findIpRangeById } from "../utils/findIpRangeById";
import { ipToID } from "../utils/ip-calculator";

export class IpRangesRepository {
    async findIpRange(ip: string) {
        const ipRanges = getIpRanges();

        const id = ipToID(ip);
        if (isNaN(id)) return null;
        
        return findIpRangeById(ipRanges, id);
    }
}