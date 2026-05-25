const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const games = ['Donkey Kong', 'Pac-Man', 'Space Invaders', 'Galaga', 'Asteroids', 'Centipede', 'Frogger', 'Ms. Pac-Man', 'Defender', 'Tempest'];
const players = ['ArcadeKing', 'PixelMaster', 'RetroLegend', 'ScoreHunter', 'GameWizard', 'NeonNinja', 'BitBuster', 'CoinOpHero', 'HighScoreChamp', 'JoystickJedi'];

const strategyNotes = [
  'Focus on the hammer patterns on level 4-5. The timing is crucial for maximizing points.',
  'Always clear the bottom row first. This creates safe zones and prevents ghost traps.',
  'Stay in the bottom corners and use the shields strategically. Never rush the UFO.',
  'The dual ship mechanic is key. Master the capture and release for double points.',
  'Hyperspace is your friend. Use it to escape tight situations but watch the cooldown.',
  'The spider patterns are predictable. Learn them and you can survive indefinitely.',
  'Time your jumps perfectly on the logs and turtles. The alligator timing is strict.',
  'Use the warp tunnels effectively but dont get greedy. Speed is more important than points.',
  'Smart bombs should be saved for the swarm waves. Never use them on single enemies.',
  'The superzapper recharges every level. Save it for the boss waves on levels 12+.'
];

async function seed() {
  console.log('Starting seed...');
  
  // Clear existing data
  await prisma.score.deleteMany();
  
  // Create 350 scores
  const scores = [];
  for (let i = 0; i < 350; i++) {
    const game = games[Math.floor(Math.random() * games.length)];
    const player = players[Math.floor(Math.random() * players.length)];
    const score = Math.floor(Math.random() * 1000000) + 10000;
    const strategyNote = strategyNotes[Math.floor(Math.random() * strategyNotes.length)];
    
    // Random date within last year
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 365));
    
    scores.push({
      game,
      player,
      score,
      date,
      strategyNote
    });
  }
  
  // Sort by date descending
  scores.sort((a, b) => b.date - a.date);
  
  // Insert in batches
  for (let i = 0; i < scores.length; i += 50) {
    const batch = scores.slice(i, i + 50);
    await prisma.score.createMany({
      data: batch
    });
    console.log(`Inserted ${i + batch.length} scores...`);
  }
  
  console.log('Seed complete!');
}

seed()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
