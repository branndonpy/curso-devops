import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.status(200).send('Hello from acquisitions api.');
});

app.get('/healthz', (req, res) => {
  res.status(200).send('ok');
});

app.get('/readyz', (req, res) => {
  res.status(200).send('ready');
});

export default app;