import express from 'express';
import apiRouter from './routes/router';
import { loadAndProcessCsv } from './utils/loadAndProcessCsv';
import { setIpRanges } from './cache/ipRangesCache';

const app = express();
let server: ReturnType<typeof app.listen> | null = null;

app.use(express.json());
app.use(apiRouter);

export async function start(port = 3000) {
  if (!server) {
    const ipRangesFromCsv = await loadAndProcessCsv('./IP2LOCATION-LITE-DB11.CSV');
    setIpRanges(ipRangesFromCsv);
    
    server = app.listen(port, () => {
      console.log('Server started.');
      console.log(`Server listening at http://localhost:${port}`);
    });
  }
}

export function stop() {
  if (server) {
    server.close(() => {
      console.log('Server stopped.');
    });
    server = null;
  }
}

process.on("exit", () => {
  console.log("exiting");
  stop();
});
process.on("uncaughtException", () => {
  console.error("uncaught exception");
  stop();
});
process.on("unhandledRejection", () => {
  console.error("unhandled rejection");
  stop();
});
process.on("SIGTERM", () => {
  console.log("SIGTERM");
  stop();
});


