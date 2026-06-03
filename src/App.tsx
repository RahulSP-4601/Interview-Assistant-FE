import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import OverlayApp from './pages/OverlayApp'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/app" element={<OverlayApp />} />
      </Routes>
    </Router>
  )
}

export default App
