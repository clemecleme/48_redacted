import { memo } from 'react'
import { Handle, Position, NodeProps } from '@xyflow/react'
import { DocumentNode as DocumentNodeType } from '../../types'

const DocumentNode = memo(({ data, type }: NodeProps<DocumentNodeType['data']> & { type?: string }) => {
  const nodeType = type || 'terminal'
  const content = data.content || {}
  
  // Get type display name
  const getTypeName = (t: string) => {
    const names: Record<string, string> = {
      email: 'EMAIL',
      diary: 'DIARY ENTRY',
      police_report: 'POLICE REPORT',
      badge: 'ID BADGE',
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
  
  // Render content based on type - UNIFIED TERMINAL STYLE
  const renderContent = () => {
    switch (nodeType) {
      case 'email':
        return (
          <div className="terminal-doc-content">
            <div className="terminal-line"><span className="terminal-label">FROM:</span> {content.from || 'Unknown'}</div>
            <div className="terminal-line"><span className="terminal-label">TO:</span> {content.to || 'Unknown'}</div>
            <div className="terminal-line"><span className="terminal-label">SUBJECT:</span> {content.subject || 'No Subject'}</div>
            <div className="terminal-line"><span className="terminal-label">DATE:</span> {content.emailDate || 'Unknown'}</div>
            <div className="terminal-separator">---</div>
            <div className="terminal-body">{content.body || 'No content'}</div>
          </div>
        )
      
      case 'diary':
        return (
          <div className="terminal-doc-content">
            <div className="terminal-line"><span className="terminal-label">DATE:</span> {content.diaryDate || 'Unknown'}</div>
            {content.mood && <div className="terminal-line"><span className="terminal-label">MOOD:</span> {content.mood}</div>}
            <div className="terminal-separator">---</div>
            <div className="terminal-body">{content.diaryEntry || 'No entry'}</div>
          </div>
        )
      
      case 'police_report':
        return (
          <div className="terminal-doc-content">
            <div className="terminal-line"><span className="terminal-label">CASE #:</span> {content.caseNumber || 'N/A'}</div>
            <div className="terminal-line"><span className="terminal-label">DATE:</span> {content.reportDate || 'Unknown'}</div>
            <div className="terminal-line"><span className="terminal-label">OFFICER:</span> {content.officer || 'Unknown'}</div>
            <div className="terminal-line"><span className="terminal-label">TYPE:</span> {content.incidentType || 'Unknown'}</div>
            <div className="terminal-separator">---</div>
            <div className="terminal-body">{content.reportSummary || 'No summary'}</div>
          </div>
        )
      
      case 'badge':
        return (
          <div className="terminal-doc-content">
            <div className="terminal-line"><span className="terminal-label">BADGE ID:</span> {content.badgeId || 'N/A'}</div>
            <div className="terminal-line"><span className="terminal-label">NAME:</span> {content.employeeName || 'Unknown'}</div>
            <div className="terminal-line"><span className="terminal-label">DEPT:</span> {content.department || 'Unknown'}</div>
            <div className="terminal-line"><span className="terminal-label">POSITION:</span> {content.position || 'Unknown'}</div>
            <div className="terminal-line"><span className="terminal-label">ACCESS LEVEL:</span> {content.accessLevel || 'N/A'}</div>
          </div>
        )
      
      case 'witness_statement':
        return (
          <div className="terminal-doc-content">
            <div className="terminal-line"><span className="terminal-label">WITNESS:</span> {content.witnessName || 'Anonymous'}</div>
            <div className="terminal-line"><span className="terminal-label">DATE:</span> {content.statementDate || 'Unknown'}</div>
            <div className="terminal-line"><span className="terminal-label">INTERVIEWED BY:</span> {content.interviewedBy || 'Unknown'}</div>
            <div className="terminal-separator">---</div>
            <div className="terminal-body">{content.statementText || 'No statement'}</div>
          </div>
        )
      
      case 'bank_statement':
        return (
          <div className="terminal-doc-content">
            <div className="terminal-line"><span className="terminal-label">ACCOUNT:</span> {content.accountNumber || 'N/A'}</div>
            <div className="terminal-line"><span className="terminal-label">HOLDER:</span> {content.accountHolder || 'Unknown'}</div>
            <div className="terminal-line"><span className="terminal-label">PERIOD:</span> {content.statementPeriod || 'Unknown'}</div>
            <div className="terminal-line"><span className="terminal-label">BALANCE:</span> {content.closingBalance || 'N/A'}</div>
            {content.transactions && content.transactions.length > 0 && (
              <>
                <div className="terminal-separator">---</div>
                <div className="terminal-label">RECENT TRANSACTIONS:</div>
                {content.transactions.slice(0, 3).map((t: any, i: number) => (
                  <div key={i} className="terminal-line-small">{t.date}: {t.description} - {t.amount}</div>
                ))}
              </>
            )}
          </div>
        )
      
      case 'newspaper':
        return (
          <div className="terminal-doc-content">
            <div className="terminal-line"><span className="terminal-label">PUBLICATION:</span> {content.newspaperName || 'Unknown'}</div>
            <div className="terminal-line"><span className="terminal-label">DATE:</span> {content.date || 'Unknown'}</div>
            <div className="terminal-separator">---</div>
            <div className="terminal-headline">{content.headline || data.title}</div>
            {content.subheadline && <div className="terminal-subheadline">{content.subheadline}</div>}
            <div className="terminal-separator">---</div>
            <div className="terminal-body">{content.articleText || content.mainArticle || 'No article text'}</div>
          </div>
        )
      
      case 'internal_memo':
        return (
          <div className="terminal-doc-content">
            <div className="terminal-line"><span className="terminal-label">TO:</span> {content.memoTo || 'Unknown'}</div>
            <div className="terminal-line"><span className="terminal-label">FROM:</span> {content.memoFrom || 'Unknown'}</div>
            <div className="terminal-line"><span className="terminal-label">DATE:</span> {content.memoDate || 'Unknown'}</div>
            <div className="terminal-line"><span className="terminal-label">RE:</span> {content.memoSubject || 'No Subject'}</div>
            {content.confidential && <div className="terminal-alert">[CONFIDENTIAL]</div>}
            <div className="terminal-separator">---</div>
            <div className="terminal-body">{content.memoBody || 'No content'}</div>
          </div>
        )
      
      case 'phone_record':
        return (
          <div className="terminal-doc-content">
            <div className="terminal-line"><span className="terminal-label">NUMBER:</span> {content.phoneNumber || 'Unknown'}</div>
            <div className="terminal-line"><span className="terminal-label">DATE:</span> {content.callDate || 'Unknown'}</div>
            {content.callRecords && content.callRecords.length > 0 && (
              <>
                <div className="terminal-separator">---</div>
                <div className="terminal-label">CALL HISTORY:</div>
                {content.callRecords.slice(0, 5).map((call: any, i: number) => (
                  <div key={i} className="terminal-line-small">
                    {call.time} | {call.number} | {call.duration} | {call.type}
                  </div>
                ))}
              </>
            )}
          </div>
        )
      
      case 'receipt':
        return (
          <div className="terminal-doc-content">
            <div className="terminal-line"><span className="terminal-label">STORE:</span> {content.storeName || 'Unknown'}</div>
            <div className="terminal-line"><span className="terminal-label">DATE:</span> {content.receiptDate || 'Unknown'}</div>
            <div className="terminal-line"><span className="terminal-label">RECEIPT #:</span> {content.receiptNumber || 'N/A'}</div>
            {content.items && content.items.length > 0 && (
              <>
                <div className="terminal-separator">---</div>
                {content.items.map((item: any, i: number) => (
                  <div key={i} className="terminal-line-small">
                    {item.name} x{item.quantity} - {item.price}
                  </div>
                ))}
                <div className="terminal-separator">---</div>
                <div className="terminal-line"><span className="terminal-label">TOTAL:</span> {content.totalAmount || 'N/A'}</div>
              </>
            )}
          </div>
        )
      
      case 'surveillance_log':
        return (
          <div className="terminal-doc-content">
            <div className="terminal-line"><span className="terminal-label">DATE:</span> {content.surveillanceDate || 'Unknown'}</div>
            <div className="terminal-line"><span className="terminal-label">LOCATION:</span> {content.surveillanceLocation || 'Unknown'}</div>
            <div className="terminal-line"><span className="terminal-label">OPERATOR:</span> {content.operator || 'Unknown'}</div>
            {content.logEntries && content.logEntries.length > 0 && (
              <>
                <div className="terminal-separator">---</div>
                <div className="terminal-label">LOG ENTRIES:</div>
                {content.logEntries.slice(0, 5).map((entry: any, i: number) => (
                  <div key={i} className="terminal-log-entry">
                    <div className="terminal-line-small">[{entry.time}] {entry.activity}</div>
                    {entry.notes && <div className="terminal-line-small">  └─ {entry.notes}</div>}
                  </div>
                ))}
              </>
            )}
          </div>
        )
      
      case 'medical_record':
        return (
          <div className="terminal-doc-content">
            <div className="terminal-line"><span className="terminal-label">PATIENT:</span> {content.patientName || 'REDACTED'}</div>
            <div className="terminal-line"><span className="terminal-label">DATE:</span> {content.medicalDate || 'Unknown'}</div>
            <div className="terminal-line"><span className="terminal-label">DOCTOR:</span> {content.doctorName || 'Unknown'}</div>
            <div className="terminal-separator">---</div>
            <div className="terminal-body">{content.diagnosis || content.notes || 'No information'}</div>
          </div>
        )
      
      case 'article':
        return (
          <div className="terminal-doc-content">
            <div className="terminal-line"><span className="terminal-label">SOURCE:</span> {content.source || 'Unknown'}</div>
            <div className="terminal-line"><span className="terminal-label">DATE:</span> {content.date || 'Unknown'}</div>
            <div className="terminal-separator">---</div>
            <div className="terminal-headline">{content.heading || data.title}</div>
            <div className="terminal-body">{content.previewText || content.articleText || 'No content'}</div>
          </div>
        )
      
      case 'image':
        return (
          <div className="terminal-doc-content">
            {content.imageUrl && (
              <img src={content.imageUrl} alt={content.caption || data.title} className="terminal-image" />
            )}
            {content.caption && <div className="terminal-caption">{content.caption}</div>}
          </div>
        )
      
      default:
        return (
          <div className="terminal-doc-content">
            <div className="terminal-line">
              <span className="terminal-prompt">$</span>
              <span className="terminal-text">{content.terminalText || data.title}</span>
              <span className="terminal-cursor">_</span>
            </div>
          </div>
        )
    }
  }
  
  return (
    <div className="document-node terminal-style-node">
      {/* Connection Handle - Top Center */}
      <Handle 
        type="source" 
        position={Position.Top} 
        className="connection-handle connection-handle-center"
      />
      
      {/* Header */}
      <div className="node-header">
        <button className="node-close-button" onClick={(e) => {
          e.stopPropagation()
        }}>×</button>
        <div className="node-title">{getTypeName(nodeType)}</div>
      </div>
      
      {/* Content */}
      <div className="node-content">
        {renderContent()}
      </div>
    </div>
  )
})

DocumentNode.displayName = 'DocumentNode'

export default DocumentNode
