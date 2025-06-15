import { Router } from "express";
import { IpRangesController } from "../controllers/ipRangesController";

const apiRouter = Router();

apiRouter.get('/ip/location', (req, res) => { IpRangesController.findIpRange(req, res) });

export default apiRouter;