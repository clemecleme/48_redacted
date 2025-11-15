import { useState, useEffect } from 'react'

interface TimerProps {
  targetDate: string
  onExpire?: () => void
  label?: string
}

const Timer = ({ targetDate, onExpire, label = 'Time remaining' }: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    expired: false,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate).getTime() - new Date().getTime()

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          expired: true,
        })
        if (onExpire) {
          onExpire()
        }
        return
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        expired: false,
      })
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [targetDate, onExpire])

  if (timeLeft.expired) {
    return (
      <div className="bg-red-900/30 border border-red-700 rounded-lg p-3">
        <div className="text-red-400 font-semibold text-sm">
          Mission Ended
        </div>
      </div>
    )
  }

  return (
    <div className="bg-dark-800 border border-gray-700 rounded-lg p-3">
      <div className="text-xs text-gray-400 mb-2">{label}</div>
      <div className="flex gap-2 justify-center">
        {timeLeft.days > 0 && (
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{timeLeft.days}</div>
            <div className="text-xs text-gray-400">Days</div>
          </div>
        )}
        <div className="text-center">
          <div className="text-2xl font-bold text-white">{String(timeLeft.hours).padStart(2, '0')}</div>
          <div className="text-xs text-gray-400">Hours</div>
        </div>
        <div className="text-2xl font-bold text-white self-center">:</div>
        <div className="text-center">
          <div className="text-2xl font-bold text-white">{String(timeLeft.minutes).padStart(2, '0')}</div>
          <div className="text-xs text-gray-400">Mins</div>
        </div>
        <div className="text-2xl font-bold text-white self-center">:</div>
        <div className="text-center">
          <div className="text-2xl font-bold text-white">{String(timeLeft.seconds).padStart(2, '0')}</div>
          <div className="text-xs text-gray-400">Secs</div>
        </div>
      </div>
    </div>
  )
}

export default Timer

