import { useState, useMemo } from 'react'
import ScoreCard from './ScoreCard'

function ScoreList({ scores, onDelete }) {
  const [searchTerm, setSearchTerm] = useState('')

  // FIX 5: useMemo for search filter - only recompute when scores or searchTerm changes
  const filteredScores = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return scores.filter(s =>
      s.game.toLowerCase().includes(term) ||
      s.player.toLowerCase().includes(term)
    );
  }, [scores, searchTerm])

  return (
    <div>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by game or player..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredScores.map(score => (
          <ScoreCard key={score.id} score={score} onDelete={onDelete} />
        ))}
      </div>
      <p className="mt-4 text-gray-400 text-center">
        Showing {filteredScores.length} of {scores.length} scores
      </p>
    </div>
  )
}

export default ScoreList
