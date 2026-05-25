import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ScoresPage from './pages/ScoresPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ScoresPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
