import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../contexts/AppContext'
import Layout from '../components/layout/Layout'
import MissionCard from '../components/mission/MissionCard'
import { Mission } from '../types'
import { getAllMissions } from '../utils/mockData'

const MissionsList = () => {
  const { user, setUser } = useApp()
  const navigate = useNavigate()
  const [missions, setMissions] = useState<Mission[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'upcoming' | 'active' | 'ended'>('upcoming')

  useEffect(() => {
    // Fetch missions
    const loadMissions = async () => {
      try {
        const data = getAllMissions()
        setMissions(data)
      } catch (error) {
        console.error('Error loading missions:', error)
      } finally {
        setLoading(false)
      }
    }

    loadMissions()
  }, [user, navigate])

  const handleRegister = (missionId: string) => {
    if (!user) return
    
    setUser({
      ...user,
      registeredMissions: [...(user.registeredMissions || []), missionId]
    })
  }

  const filteredMissions = missions.filter(m => m.status === filter)

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-2xl text-white">Loading missions...</div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-main-color mb-8">Available Missions</h1>

        {/* Filter Tabs - TSUKI Style */}
        <div className="tab-navigation mb-8">
          <button
            className={`tab-button ${filter === 'upcoming' ? 'active' : ''}`}
            onClick={() => setFilter('upcoming')}
          >
            UPCOMING
          </button>
          <button
            className={`tab-button ${filter === 'active' ? 'active' : ''}`}
            onClick={() => setFilter('active')}
          >
            ACTIVE
          </button>
          <button
            className={`tab-button ${filter === 'ended' ? 'active' : ''}`}
            onClick={() => setFilter('ended')}
          >
            ENDED
          </button>
        </div>

        {/* Missions Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredMissions.map((mission) => (
            <MissionCard 
              key={mission.id} 
              mission={mission}
              onRegister={handleRegister}
            />
          ))}
        </div>

        {filteredMissions.length === 0 && (
          <div className="text-center text-gray-400 py-12">
            No {filter} missions available.
          </div>
        )}
      </div>
    </Layout>
  )
}

export default MissionsList
