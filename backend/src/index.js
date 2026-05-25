const express = require('express');
const cors = require('cors');
const compression = require('compression');
const scoresRouter = require('./routes/scores');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();

app.use(compression());
app.use(cors());
app.use(express.json());

app.use('/api/scores', scoresRouter);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
