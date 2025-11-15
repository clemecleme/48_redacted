import { DocumentNode as DocumentNodeType } from '../../types'
import DocumentNode from './DocumentNode'

interface DocumentOverlayProps {
  document: DocumentNodeType | null
  onClose: () => void
}

const DocumentOverlay = ({ document, onClose }: DocumentOverlayProps) => {
  if (!document) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div 
        className="document-node w-full max-w-5xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '900px', minWidth: '600px' }}
      >
        {/* Header - Same style as nodes */}
        <div className="node-header" style={{ padding: '0.75rem 1rem' }}>
          <button className="node-close-button" onClick={onClose}>×</button>
          <div className="node-title" style={{ fontSize: '1.1rem' }}>
            {document.data.title}
          </div>
        </div>

        {/* Content - Scrollable, reuses the DocumentNode rendering */}
        <div className="flex-1 overflow-y-auto p-8" style={{ background: '#000' }}>
          <DocumentNode 
            data={document.data} 
            type={document.type}
            id={document.id}
            position={document.position}
            selected={false}
            isConnectable={false}
            zIndex={1}
            dragging={false}
          />
        </div>
      </div>
    </div>
  )
}

export default DocumentOverlay
