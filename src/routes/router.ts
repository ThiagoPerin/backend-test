import { Router } from "express";

const apiRouter = Router();

apiRouter.get('/', (req, res) => {
  res.send('Teste rota base da API');
});

apiRouter.get('/ip/location', (req, res) => {
  res.statusCode = 404;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ error: 'Status 404: Not Found' }));
});

export default apiRouter;