import { Request, Response } from "express";
import { IpRangesService } from "../services/IpRangesService";

const service = new IpRangesService();

export class IpRangesController {
    static async findIpRange(req: Request, res: Response) {
        const ip = req.query["ip"] as string;

        if (ip === undefined) {
            return res.status(400).json({ message: 'No IP provided.' });
        }

        try {
            const location = await service.findIpRange(ip);

            if (location === null) {
                return res.status(404).json({ message: 'IP location not found.' });
            }

            return res.status(200).json(location);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: true, message: "Erro no servidor." });
        }
    }
}