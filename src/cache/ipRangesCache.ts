import { IpRange } from "../types/ipRangesType";

let ipRanges: IpRange[] = [];

export function setIpRanges(data: IpRange[]) {
    ipRanges = data;
}

export function getIpRanges(): IpRange[] {
    return ipRanges;
}
