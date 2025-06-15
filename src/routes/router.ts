import { Router } from "express";
import { IpRangesController } from "../controllers/IpRangesController";

const apiRouter = Router();

apiRouter.get('/ip/location', (req, res) => { IpRangesController.findIpRange(req, res) });

export default apiRouter;