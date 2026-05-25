import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import ScoreList from '../components/ScoreList'

function ScoresPage() {
  const [scores, setScores] = useState([])

  // FIX 4: Add AbortController to prevent double fetch
  useEffect(() => {
    const controller = new AbortController();

    const fetchScores = async () => {
      try {
        const res = await axios.get('/api/scores', {
          signal: controller.signal
        });
        setScores(res.data.data || res.data);
      } catch (err) {
        if (err.name !== 'CanceledError') {
          console.error('Fetch failed:', err);
        }
      }
    };

    fetchScores();

    return () => controller.abort();
  }, [])

  // FIX 6: useCallback for stable handler reference
  const handleDelete = useCallback((id) => {
    setScores(prev => prev.filter(s => s.id !== id))
  }, [])

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">🕹️ ArcadeVault Leaderboard</h1>
        <ScoreList scores={scores} onDelete={handleDelete} />
      </div>
    </div>
  )
}

export default ScoresPage
