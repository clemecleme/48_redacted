import { Link } from 'react-router-dom'
import { Mission } from '../../types'
import { useApp } from '../../contexts/AppContext'
import Timer from './Timer'

interface MissionCardProps {
  mission: Mission
  onRegister?: (missionId: string) => void
}

const MissionCard = ({ mission, onRegister }: MissionCardProps) => {
  const { user } = useApp()
  
  const isRegistered = user?.registeredMissions?.includes(mission.id) || false
  const canRegister = mission.status === 'upcoming' && !isRegistered
  const canAccess = mission.status === 'active' && isRegistered

  const getStatusBadge = () => {
    const badges = {
      active: 'bg-green-900/30 border-green-700 text-green-400',
      upcoming: 'bg-blue-900/30 border-blue-700 text-blue-400',
      ended: 'bg-gray-800 border-gray-700 text-gray-400',
    }

    const labels = {
      active: '🟢 Active',
      upcoming: '🔵 Upcoming',
      ended: '⚫ Ended',
    }

    return (
      <span className={`px-3 py-1 text-xs font-semibold border ${badges[mission.status]}`}>
        {labels[mission.status]}
      </span>
    )
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString('en-GB').replace(/\//g, '-')
  }

  // For upcoming missions, hide title and description until registered
  const displayTitle = mission.status === 'upcoming' && !isRegistered 
    ? '█████████ ████████' 
    : mission.title

  const displayDescription = mission.status === 'upcoming' && !isRegistered
    ? 'Register to unlock mission details'
    : mission.status === 'upcoming' && isRegistered
    ? 'Mission details will be revealed when it starts'
    : mission.description

  return (
    <div className="card hover:border-main-color transition-all duration-200 flex gap-4">
      {/* Image */}
      {mission.image && (
        <div className="w-40 h-[90px] flex-shrink-0">
          <img 
            src={mission.image} 
            alt={mission.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Content */}
      <div className="flex-1">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-white">{displayTitle}</h3>
          {getStatusBadge()}
        </div>

        <p className="text-gray-300 mb-4 line-clamp-2">{displayDescription}</p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span>Start: {formatDate(mission.startTime)}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span>End: {formatDate(mission.endTime)}</span>
          </div>
        </div>

        {/* Timer */}
        {mission.status === 'active' && (
          <div className="mb-4">
            <Timer targetDate={mission.endTime} label="Mission ends in" />
          </div>
        )}

        {mission.status === 'upcoming' && (
          <div className="mb-4">
            <Timer targetDate={mission.startTime} label="Starts in" />
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          {/* Registration badge for registered upcoming missions */}
          {mission.status === 'upcoming' && isRegistered && (
            <span className="px-3 py-2 bg-green-900/30 border border-green-700 text-green-400 text-sm font-semibold">
              ✓ Registered
            </span>
          )}

          {/* Registration badge for active registered missions */}
          {mission.status === 'active' && isRegistered && (
            <span className="px-3 py-2 bg-green-900/30 border border-green-700 text-green-400 text-sm font-semibold">
              ✓ Registered
            </span>
          )}

          {/* Register button for upcoming missions */}
          {canRegister && onRegister && (
            <button
              onClick={() => onRegister(mission.id)}
              className="btn-primary"
            >
              Register for Mission
            </button>
          )}

          {/* Access button for active registered missions */}
          {canAccess && (
            <Link
              to={`/mission/${mission.id}/board`}
              className="btn-primary"
            >
              Access Mission
            </Link>
          )}

          {/* Registration required message */}
          {mission.status === 'active' && !isRegistered && (
            <span className="px-3 py-2 bg-red-900/30 border border-red-700 text-red-400 text-sm">
              Registration Required
            </span>
          )}

          {/* View Results for ended missions */}
          {mission.status === 'ended' && (
            <Link
              to={`/mission/${mission.id}`}
              className="btn-secondary"
            >
              View Results
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default MissionCard
