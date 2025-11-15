import { Document } from '../../types'

interface DocumentSidebarProps {
  documents: Document[]
  onDragStart: (event: React.DragEvent, document: Document) => void
}

const DocumentSidebar = ({ documents, onDragStart }: DocumentSidebarProps) => {
  const handleDoubleClick = (doc: Document) => {
    if (doc.state === 'unopened') {
      alert('Drag and drop the document on your board to open it')
    }
  }

  return (
    <div className="document-sidebar">
      <div className="sidebar-header">
        <h3>EVIDENCE FILES</h3>
        <div className="sidebar-count">{documents.length} ITEMS</div>
      </div>
      
      <div className="sidebar-content">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className={`sidebar-document ${doc.state === 'onBoard' ? 'used' : ''}`}
            draggable={doc.state === 'unopened'}
            onDragStart={(e) => onDragStart(e, doc)}
            onDoubleClick={() => handleDoubleClick(doc)}
          >
            <div className="doc-icon">{doc.icon}</div>
            <div className="doc-info">
              <div className="doc-name">{doc.name}</div>
              <div className="doc-type">[{doc.type.toUpperCase()}]</div>
            </div>
            {doc.state === 'onBoard' && (
              <div className="doc-status">ON BOARD</div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default DocumentSidebar

