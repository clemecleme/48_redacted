import { memo } from 'react'
import { ConnectionLineComponentProps } from '@xyflow/react'

const SagConnectionLine = memo(({
  fromX,
  fromY,
  toX,
  toY,
}: ConnectionLineComponentProps) => {
  // Calculate distance between points
  const dx = toX - fromX
  const dy = toY - fromY
  const distance = Math.sqrt(dx * dx + dy * dy)
  
  // Create sagging effect - the longer the distance, the more sag
  const sagAmount = Math.min(distance * 0.3, 150) // Max sag of 150px
  
  // Control points for bezier curve - push them downward to create gravity effect
  const midX = (fromX + toX) / 2
  const midY = (fromY + toY) / 2
  
  // Sag point is at the middle but pushed down
  const sagY = midY + sagAmount
  
  // Create a quadratic bezier curve with sag
  const path = `M ${fromX},${fromY} Q ${midX},${sagY} ${toX},${toY}`
  
  return (
    <g>
      <path
        d={path}
        fill="none"
        stroke="var(--board-accent)"
        strokeWidth={3}
        strokeLinecap="round"
        style={{
          filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))',
        }}
      />
      <circle
        cx={toX}
        cy={toY}
        r={4}
        fill="var(--board-accent)"
        stroke="none"
      />
    </g>
  )
})

SagConnectionLine.displayName = 'SagConnectionLine'

export default SagConnectionLine

