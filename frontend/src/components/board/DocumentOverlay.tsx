import { DocumentNode as DocumentNodeType } from '../../types'

interface DocumentOverlayProps {
  document: DocumentNodeType | null
  onClose: () => void
}

const DocumentOverlay = ({ document, onClose }: DocumentOverlayProps) => {
  if (!document) return null

  const content = document.data.content || {}
  const nodeType = document.type

  // Get type display name
  const getTypeName = (t: string) => {
    const names: Record<string, string> = {
      email: 'EMAIL',
      diary: 'DIARY ENTRY',
      police_report: 'POLICE REPORT',
      badge_log: 'BADGE LOG',
      witness_statement: 'WITNESS STATEMENT',
      bank_statement: 'BANK STATEMENT',
      newspaper: 'NEWSPAPER',
      internal_memo: 'INTERNAL MEMO',
      phone_record: 'PHONE RECORD',
      receipt: 'RECEIPT',
      surveillance_log: 'SURVEILLANCE LOG',
      medical_record: 'MEDICAL RECORD',
      article: 'ARTICLE',
      terminal: 'TERMINAL',
      image: 'IMAGE'
    }
    return names[t] || t.toUpperCase()
  }

  // Render content based on type - SAME as DocumentNode but WITHOUT Handle
  const renderContent = () => {
    switch (nodeType) {
      case 'email':
        return (
          <div className="terminal-doc-content">
            <div className="terminal-line"><span className="terminal-label">FROM:</span> {content.from || 'Unknown'}</div>
            <div className="terminal-line"><span className="terminal-label">TO:</span> {Array.isArray(content.to) ? content.to.join(', ') : content.to || 'Unknown'}</div>
            <div className="terminal-line"><span className="terminal-label">SUBJECT:</span> {content.subject || 'No Subject'}</div>
            <div className="terminal-line"><span className="terminal-label">DATE:</span> {content.timestamp || content.date || 'Unknown'}</div>
            <div className="terminal-separator">---</div>
            <div className="terminal-body">{content.body || 'No content'}</div>
          </div>
        )
      
      case 'diary':
        return (
          <div className="terminal-doc-content">
            <div className="terminal-line"><span className="terminal-label">DATE:</span> {content.date || 'Unknown'}</div>
            {content.mood && <div className="terminal-line"><span className="terminal-label">MOOD:</span> {content.mood}</div>}
            {content.author && <div className="terminal-line"><span className="terminal-label">AUTHOR:</span> {content.author}</div>}
            <div className="terminal-separator">---</div>
            <div className="terminal-body">{content.entry_text || 'No entry'}</div>
          </div>
        )
      
      case 'police_report':
        return (
          <div className="terminal-doc-content">
            <div className="terminal-line"><span className="terminal-label">CASE #:</span> {content.case_number || 'N/A'}</div>
            <div className="terminal-line"><span className="terminal-label">DATE:</span> {content.date || 'Unknown'}</div>
            <div className="terminal-line"><span className="terminal-label">OFFICER:</span> {content.officer || 'Unknown'}</div>
            <div className="terminal-separator">---</div>
            <div className="terminal-body">{content.incident_description || 'No summary'}</div>
            {content.witnesses && content.witnesses.length > 0 && (
              <>
                <div className="terminal-separator">---</div>
                <div className="terminal-label">WITNESSES:</div>
                {content.witnesses.map((w: any, i: number) => (
                  <div key={i} className="terminal-line-small">• {w.name} ({w.role})</div>
                ))}
              </>
            )}
          </div>
        )
      
      case 'badge_log':
        return (
          <div className="terminal-doc-content">
            <div className="terminal-line"><span className="terminal-label">FACILITY:</span> {content.facility_name || 'Unknown'}</div>
            <div className="terminal-line"><span className="terminal-label">PERIOD:</span> {content.log_period || 'Unknown'}</div>
            {content.entries && content.entries.length > 0 && (
              <>
                <div className="terminal-separator">---</div>
                <div className="terminal-label">ACCESS LOG:</div>
                {content.entries.map((entry: any, i: number) => (
                  <div key={i} className="terminal-log-entry">
                    <div className="terminal-line-small">[{entry.entry_time}] {entry.name} (#{entry.badge_number})</div>
                    <div className="terminal-line-small">  └─ {entry.location}</div>
                  </div>
                ))}
              </>
            )}
          </div>
        )
      
      case 'witness_statement':
        return (
          <div className="terminal-doc-content">
            <div className="terminal-line"><span className="terminal-label">WITNESS:</span> {content.witness_name || 'Anonymous'}</div>
            <div className="terminal-line"><span className="terminal-label">DATE:</span> {content.date || 'Unknown'}</div>
            <div className="terminal-line"><span className="terminal-label">OFFICER:</span> {content.officer || 'Unknown'}</div>
            {content.signed && <div className="terminal-line"><span className="terminal-label">SIGNED:</span> Yes</div>}
            <div className="terminal-separator">---</div>
            <div className="terminal-body">{content.statement_text || 'No statement'}</div>
          </div>
        )
      
      case 'bank_statement':
        return (
          <div className="terminal-doc-content">
            <div className="terminal-line"><span className="terminal-label">ACCOUNT:</span> {content.account_number || 'N/A'}</div>
            <div className="terminal-line"><span className="terminal-label">HOLDER:</span> {content.account_holder || 'Unknown'}</div>
            <div className="terminal-line"><span className="terminal-label">PERIOD:</span> {content.period || 'Unknown'}</div>
            <div className="terminal-line"><span className="terminal-label">OPENING:</span> ${content.opening_balance || 'N/A'}</div>
            <div className="terminal-line"><span className="terminal-label">CLOSING:</span> ${content.closing_balance || 'N/A'}</div>
            {content.transactions && content.transactions.length > 0 && (
              <>
                <div className="terminal-separator">---</div>
                <div className="terminal-label">TRANSACTIONS:</div>
                {content.transactions.map((t: any, i: number) => (
                  <div key={i} className="terminal-line-small">
                    {t.date}: {t.description} - ${t.amount} (Bal: ${t.balance})
                  </div>
                ))}
              </>
            )}
          </div>
        )
      
      case 'internal_memo':
        return (
          <div className="terminal-doc-content">
            <div className="terminal-line"><span className="terminal-label">TO:</span> {content.to || 'Unknown'}</div>
            <div className="terminal-line"><span className="terminal-label">FROM:</span> {content.from || 'Unknown'}</div>
            <div className="terminal-line"><span className="terminal-label">DATE:</span> {content.date || 'Unknown'}</div>
            <div className="terminal-line"><span className="terminal-label">SUBJECT:</span> {content.subject || 'No Subject'}</div>
            {content.classification && <div className="terminal-alert">[{content.classification}]</div>}
            <div className="terminal-separator">---</div>
            <div className="terminal-body">{content.content || 'No content'}</div>
          </div>
        )
      
      case 'surveillance_log':
        return (
          <div className="terminal-doc-content">
            <div className="terminal-line"><span className="terminal-label">LOCATION:</span> {content.location || 'Unknown'}</div>
            <div className="terminal-line"><span className="terminal-label">DATE:</span> {content.date || 'Unknown'}</div>
            <div className="terminal-line"><span className="terminal-label">OPERATOR:</span> {content.operator || 'Unknown'}</div>
            {content.entries && content.entries.length > 0 && (
              <>
                <div className="terminal-separator">---</div>
                <div className="terminal-label">LOG ENTRIES:</div>
                {content.entries.map((entry: any, i: number) => (
                  <div key={i} className="terminal-log-entry">
                    <div className="terminal-line-small">[{entry.time}] {entry.observation}</div>
                    {entry.action_taken && <div className="terminal-line-small">  └─ Action: {entry.action_taken}</div>}
                  </div>
                ))}
              </>
            )}
          </div>
        )
      
      case 'receipt':
        return (
          <div className="terminal-doc-content">
            <div className="terminal-line"><span className="terminal-label">MERCHANT:</span> {content.merchant || 'Unknown'}</div>
            <div className="terminal-line"><span className="terminal-label">DATE:</span> {content.date || 'Unknown'}</div>
            <div className="terminal-line"><span className="terminal-label">TIME:</span> {content.time || 'Unknown'}</div>
            {content.transaction_id && <div className="terminal-line"><span className="terminal-label">TXN ID:</span> {content.transaction_id}</div>}
            {content.items && content.items.length > 0 && (
              <>
                <div className="terminal-separator">---</div>
                {content.items.map((item: any, i: number) => (
                  <div key={i} className="terminal-line-small">
                    {item.item || item.name} x{item.quantity} - ${item.price}
                  </div>
                ))}
                <div className="terminal-separator">---</div>
                <div className="terminal-line"><span className="terminal-label">TOTAL:</span> ${content.total || 'N/A'}</div>
                {content.payment_method && <div className="terminal-line-small">Payment: {content.payment_method}</div>}
              </>
            )}
          </div>
        )

      case 'article':
      case 'newspaper':
        return (
          <div className="terminal-doc-content">
            <div className="terminal-headline">{content.heading || content.headline || document.data.title}</div>
            {content.subheadline && <div className="terminal-subheadline">{content.subheadline}</div>}
            {content.source && <div className="terminal-line"><span className="terminal-label">SOURCE:</span> {content.source}</div>}
            {content.date && <div className="terminal-line"><span className="terminal-label">DATE:</span> {content.date}</div>}
            <div className="terminal-separator">---</div>
            <div className="terminal-body">{content.previewText || content.articleText || content.mainArticle || 'No content'}</div>
          </div>
        )
      
      case 'image':
        return (
          <div className="terminal-doc-content">
            {content.imageUrl && (
              <img src={content.imageUrl} alt={content.caption || document.data.title} className="terminal-image" />
            )}
            {content.caption && <div className="terminal-caption">{content.caption}</div>}
          </div>
        )
      
      default:
        return (
          <div className="terminal-doc-content">
            <div className="terminal-line">
              <span className="terminal-prompt">$</span>
              <span className="terminal-text">{content.terminalText || document.data.title}</span>
              <span className="terminal-cursor">_</span>
            </div>
          </div>
        )
    }
  }

  return (
    <>
      {/* Backdrop blur layer */}
      <div 
        className="document-overlay-backdrop"
        onClick={onClose}
      />
      
      {/* Overlay window */}
      <div className="document-overlay-container">
        <div 
          className="landing-window overlay-window"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="node-header">
            <button className="node-close-button" onClick={onClose}>×</button>
            <div className="node-title">
              {getTypeName(nodeType)} - {document.data.title}
            </div>
          </div>

          {/* Content - Scrollable */}
          <div className="node-content overlay-content">
            {renderContent()}
          </div>
        </div>
      </div>
    </>
  )
}

export default DocumentOverlay
