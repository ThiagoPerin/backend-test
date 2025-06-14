import express from 'express';

const app = express();
let server: ReturnType<typeof app.listen> | null = null;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Teste rota base da API');
});

app.get('/ip/location', (req, res) => {
  res.statusCode = 404;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ error: 'Status 404: Not Found' }));
});

export function start(port = 3000) {
  if (!server) {
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


