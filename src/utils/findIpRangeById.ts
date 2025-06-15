import { IpRange } from "../types/ipRangesType";

export function findIpRangeById(arr: IpRange[], value: number): IpRange | null {
    let start = 0;
    let end = arr.length - 1;
    while (start <= end) {
        let mid = Math.floor((start + end) / 2);
        if (arr[mid].lower <= value && value <= arr[mid].upper) {
            return arr[mid];
        }
        if (value < arr[mid].lower) {
            end = mid - 1;
        } else if (value > arr[mid].upper) {
            start = mid + 1;
        }
    }
    return null
}