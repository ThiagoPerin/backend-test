import { Request, Response } from "express";
import { IpRangesService } from "../services/ipRangesService";

const service = new IpRangesService();

export class IpRangesController {
    static async findIpRange(req: Request, res: Response) {
        const ip = req.query["ip"] as string;
        try {
            const location = await service.findIpRange(ip);

            if (!location) {
                return res.status(404).json({ message: 'IP not found' });
            }

            return res.status(200).json(location);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: true, message: "Erro no servidor." });
        }
    }
}