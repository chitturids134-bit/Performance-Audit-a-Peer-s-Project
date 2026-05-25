const express = require('express');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient();

// GET /api/scores - Returns paginated scores (FIX 1: Pagination)
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const [scores, total] = await Promise.all([
      prisma.score.findMany({
        skip,
        take: limit,
        select: {
          id: true,
          game: true,
          player: true,
          score: true,
          date: true
          // strategyNote: intentionally omitted
        },
        orderBy: { date: 'desc' }
      }),
      prisma.score.count()
    ]);

    res.json({
      data: scores,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasNextPage: page < Math.ceil(total / limit),
        hasPrevPage: page > 1
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch scores' });
  }
});

// GET /api/scores/:id - Get single score by ID
router.get('/:id', async (req, res) => {
  try {
    const score = await prisma.score.findUnique({
      where: { id: parseInt(req.params.id) }
    });
    if (!score) {
      return res.status(404).json({ error: 'Score not found' });
    }
    res.json(score);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch score' });
  }
});

// POST /api/scores - Create new score
router.post('/', async (req, res) => {
  try {
    const { game, player, score, strategyNote } = req.body;
    const newScore = await prisma.score.create({
      data: {
        game,
        player,
        score,
        strategyNote
      }
    });
    res.status(201).json(newScore);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create score' });
  }
});

// DELETE /api/scores/:id - Delete score
router.delete('/:id', async (req, res) => {
  try {
    await prisma.score.delete({
      where: { id: parseInt(req.params.id) }
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete score' });
  }
});

module.exports = router;
