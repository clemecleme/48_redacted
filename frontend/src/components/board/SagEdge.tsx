import { memo } from 'react'
import { EdgeProps } from '@xyflow/react'

const SagEdge = memo(({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  style = {},
  markerEnd,
}: EdgeProps) => {
  // Calculate distance between points
  const dx = targetX - sourceX
  const dy = targetY - sourceY
  const distance = Math.sqrt(dx * dx + dy * dy)
  
  // Create sagging effect - the longer the distance, the more sag
  const sagAmount = Math.min(distance * 0.3, 150) // Max sag of 150px
  
  // Control points for bezier curve - push them downward to create gravity effect
  const midX = (sourceX + targetX) / 2
  const midY = (sourceY + targetY) / 2
  
  // Sag point is at the middle but pushed down
  const sagY = midY + sagAmount
  
  // Create a quadratic bezier curve with sag
  const path = `M ${sourceX},${sourceY} Q ${midX},${sagY} ${targetX},${targetY}`
  
  return (
    <>
      <path
        id={id}
        className="react-flow__edge-path"
        d={path}
        style={style}
        markerEnd={markerEnd}
      />
    </>
  )
})

SagEdge.displayName = 'SagEdge'

export default SagEdge

