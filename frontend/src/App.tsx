import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider } from './contexts/AppContext'
import Landing from './pages/Landing'
import MissionsList from './pages/MissionsList'
import MissionDetail from './pages/MissionDetail'
import BoardPage from './pages/BoardPage'

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/missions" element={<MissionsList />} />
          <Route path="/mission/:id" element={<MissionDetail />} />
          <Route path="/mission/:id/board" element={<BoardPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AppProvider>
  )
}

export default App

