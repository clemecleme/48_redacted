import React, { useEffect } from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

const Modal: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  children,
  size = 'lg'
}) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl',
    full: 'max-w-[95vw] max-h-[95vh]',
  }

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.85)' }}
      onClick={onClose}
    >
      <div 
        className={`bg-dark-900 border border-gray-700 rounded-lg shadow-2xl ${sizeClasses[size]} w-full max-h-[90vh] overflow-hidden flex flex-col relative`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Floating Close Button - Always Visible */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-red-600 hover:bg-red-700 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-xl transition-colors shadow-lg"
          aria-label="Close"
          style={{ lineHeight: '1' }}
        >
          ✕
        </button>

        {/* Header */}
        {title && (
          <div className="flex items-center justify-between p-6 pr-16 border-b border-gray-700">
            <h2 className="text-2xl font-bold text-white">{title}</h2>
          </div>
        )}
        
        {/* Content - Scrollable */}
        <div className="p-6 overflow-y-auto flex-1" style={{ maxHeight: 'calc(90vh - 100px)' }}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal

