import { IpRangeType } from "../types/ipRangesType";

let ipRanges: IpRangeType[] = [];

export function setIpRanges(data: IpRangeType[]) {
    ipRanges = data;
}

export function getIpRanges(): IpRangeType[] {
    return ipRanges;
}
