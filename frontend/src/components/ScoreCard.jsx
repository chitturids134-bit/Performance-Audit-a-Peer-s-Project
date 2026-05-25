import React from 'react'

function ScoreCard({ score, onDelete }) {
  return (
    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition-colors">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-bold text-blue-400">{score.game}</h3>
        <button
          onClick={() => onDelete(score.id)}
          className="text-red-400 hover:text-red-300 text-sm"
        >
          Delete
        </button>
      </div>
      <p className="text-gray-300 mb-1">Player: {score.player}</p>
      <p className="text-2xl font-bold text-yellow-400 mb-2">{score.score.toLocaleString()}</p>
      <p className="text-gray-500 text-sm">
        {new Date(score.date).toLocaleDateString()}
      </p>
    </div>
  )
}

export default React.memo(ScoreCard)
