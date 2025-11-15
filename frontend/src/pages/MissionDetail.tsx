import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useApp } from '../contexts/AppContext'
import Layout from '../components/layout/Layout'
import Timer from '../components/mission/Timer'
import { Mission } from '../types'
import { getMissionById } from '../utils/mockData'

const MissionDetail = () => {
  const { id } = useParams<{ id: string }>()
  const { user, setUser } = useApp()
  const navigate = useNavigate()
  
  const [mission, setMission] = useState<Mission | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      navigate('/')
      return
    }

    if (!id) return

    const data = getMissionById(id)
    if (!data) {
      navigate('/missions')
      return
    }
    
    setMission(data)
    setLoading(false)
  }, [id, user, navigate])

  const isRegistered = user?.registeredMissions?.includes(id || '') || false

  const handleRegister = () => {
    if (!user || !id) return
    
    setUser({
      ...user,
      registeredMissions: [...(user.registeredMissions || []), id]
    })
  }

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-2xl text-white">Loading mission...</div>
        </div>
      </Layout>
    )
  }

  if (!mission) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="text-2xl text-white mb-4">Mission not found</div>
            <Link to="/missions" className="btn-primary">
              Back to Missions
            </Link>
          </div>
        </div>
      </Layout>
    )
  }

  const canAccess = mission.status === 'active' && isRegistered

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <Link to="/missions" className="text-gray-400 hover:text-white mb-6 inline-block">
            ← Back to Missions
          </Link>

          {/* Mission Header */}
          <div className="card mb-8">
            <div className="flex justify-between items-start mb-6">
              <h1 className="text-4xl font-bold text-white">{mission.title}</h1>
              <span className={`px-4 py-2 border text-sm font-semibold ${
                mission.status === 'active' ? 'bg-green-900/30 border-green-700 text-green-400' :
                mission.status === 'upcoming' ? 'bg-blue-900/30 border-blue-700 text-blue-400' :
                'bg-gray-800 border-gray-700 text-gray-400'
              }`}>
                {mission.status.toUpperCase()}
              </span>
            </div>

            <p className="text-gray-300 text-lg mb-6">{mission.description}</p>

            {mission.mainQuestion && (
              <div className="bg-dark-800 border border-main-color p-4 mb-6">
                <div className="text-sm text-gray-400 mb-2">Main Question:</div>
                <div className="text-white font-semibold">{mission.mainQuestion}</div>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <div className="text-sm text-gray-400 mb-1">Start Time</div>
                <div className="text-white">{new Date(mission.startTime).toLocaleString('en-GB').replace(/\//g, '-')}</div>
              </div>
              <div>
                <div className="text-sm text-gray-400 mb-1">End Time</div>
                <div className="text-white">{new Date(mission.endTime).toLocaleString('en-GB').replace(/\//g, '-')}</div>
              </div>
            </div>

            {/* Timer */}
            {mission.status === 'active' && (
              <div className="mb-6">
                <Timer targetDate={mission.endTime} label="Time Remaining" />
              </div>
            )}

            {mission.status === 'upcoming' && (
              <div className="mb-6">
                <Timer targetDate={mission.startTime} label="Starts In" />
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-4">
              {mission.status === 'upcoming' && !isRegistered && (
                <button onClick={handleRegister} className="btn-primary">
                  Register for Mission
                </button>
              )}

              {mission.status === 'upcoming' && isRegistered && (
                <span className="px-4 py-2 bg-green-900/30 border border-green-700 text-green-400 font-semibold">
                  ✓ Registered - Mission will unlock when it starts
                </span>
              )}

              {canAccess && (
                <Link to={`/mission/${id}/board`} className="btn-primary">
                  Access Investigation Board
                </Link>
              )}

              {mission.status === 'active' && !isRegistered && (
                <span className="px-4 py-2 bg-red-900/30 border border-red-700 text-red-400">
                  You must have registered before the mission started to access it
                </span>
              )}

              {mission.status === 'ended' && (
                <span className="px-4 py-2 bg-gray-800 border border-gray-700 text-gray-400">
                  Mission Ended
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default MissionDetail
