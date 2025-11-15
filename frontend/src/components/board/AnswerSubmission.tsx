import { useState } from 'react'
import { submitAnswer } from '../../services/api'

interface AnswerSubmissionProps {
  missionId: string
  onClose: () => void
  isOpen: boolean
}

const AnswerSubmission = ({ missionId, onClose, isOpen }: AnswerSubmissionProps) => {
  const [answers, setAnswers] = useState({
    answer1: '',
    answer2: '',
    answer3: '',
    answer4: ''
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Check if all answers are filled
    if (!answers.answer1.trim() || !answers.answer2.trim() || 
        !answers.answer3.trim() || !answers.answer4.trim()) {
      setError('Please fill in all answers')
      return
    }

    setSubmitting(true)
    setError(null)

    try {
      // Combine answers into single submission
      const finalAnswer = `1: ${answers.answer1} | 2: ${answers.answer2} | 3: ${answers.answer3} | 4: ${answers.answer4}`
      const result = await submitAnswer(missionId, finalAnswer)
      if (result.success) {
        setSubmitted(true)
        console.log('Answer submitted successfully:', result.submissionId)
      }
    } catch (err: any) {
      setError(err.message || 'Failed to submit answer')
    } finally {
      setSubmitting(false)
    }
  }

  const handleCancel = () => {
    if (!submitting) {
      onClose()
    }
  }

  if (submitted) {
    return (
      <>
        {/* Backdrop */}
        <div className="document-overlay-backdrop" onClick={onClose} />
        
        {/* Success overlay */}
        <div className="document-overlay-container">
          <div className="landing-window overlay-window" onClick={(e) => e.stopPropagation()}>
            <div className="node-header">
              <button className="node-close-button" onClick={onClose}>×</button>
              <div className="node-title">SUBMISSION CONFIRMED</div>
            </div>
            
            <div className="node-content overlay-content" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✓</div>
              <h3 style={{ fontSize: '1.5rem', color: '#00ff41', marginBottom: '1rem', fontWeight: 'bold' }}>
                Answer Submitted Successfully
              </h3>
              <p style={{ color: '#b0b0b0', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                Your encrypted answer has been recorded on the blockchain via Arxiv.<br />
                Check back when the mission ends to see if you were correct!
              </p>
              <div className="terminal-line" style={{ fontSize: '0.75rem', color: '#808080' }}>
                SUBMISSION ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}
              </div>
              
              <button 
                onClick={onClose}
                className="btn-primary"
                style={{ marginTop: '2rem' }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      {/* Backdrop */}
      <div className="document-overlay-backdrop" onClick={handleCancel} />
      
      {/* Submission overlay */}
      <div className="document-overlay-container">
        <div 
          className="landing-window overlay-window submission-overlay"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="node-header">
            <button className="node-close-button" onClick={handleCancel}>×</button>
            <div className="node-title">SUBMIT FINAL ANSWER</div>
          </div>
          
          <div className="node-content overlay-content">
            <form onSubmit={handleSubmit}>
              {/* Instructions */}
              <div style={{ marginBottom: '2rem' }}>
                <p style={{ color: '#5a7fa3', fontSize: '0.9rem', lineHeight: '1.6' }}>
                  Complete the investigation report by filling in the missing information.<br />
                  All fields are required before submission.
                </p>
              </div>

              {/* Fill-in-the-blanks question */}
              <div className="terminal-doc-content" style={{ marginBottom: '2rem' }}>
                <div className="terminal-line" style={{ marginBottom: '1.5rem' }}>
                  <span className="terminal-label">INVESTIGATION REPORT:</span>
                </div>
                
                <div style={{ color: '#fff', lineHeight: '2', fontSize: '0.95rem' }}>
                  <p style={{ marginBottom: '1rem' }}>
                    Based on the evidence gathered, the primary suspect is{' '}
                    <input
                      type="text"
                      value={answers.answer1}
                      onChange={(e) => setAnswers({ ...answers, answer1: e.target.value })}
                      className="answer-input"
                      placeholder="[BLANK 1]"
                      disabled={submitting}
                    />
                    {' '}who was last seen at{' '}
                    <input
                      type="text"
                      value={answers.answer2}
                      onChange={(e) => setAnswers({ ...answers, answer2: e.target.value })}
                      className="answer-input"
                      placeholder="[BLANK 2]"
                      disabled={submitting}
                    />
                    .
                  </p>
                  
                  <p style={{ marginBottom: '1rem' }}>
                    The motive appears to be related to{' '}
                    <input
                      type="text"
                      value={answers.answer3}
                      onChange={(e) => setAnswers({ ...answers, answer3: e.target.value })}
                      className="answer-input"
                      placeholder="[BLANK 3]"
                      disabled={submitting}
                    />
                    .
                  </p>
                  
                  <p>
                    Key evidence supporting this conclusion:{' '}
                    <input
                      type="text"
                      value={answers.answer4}
                      onChange={(e) => setAnswers({ ...answers, answer4: e.target.value })}
                      className="answer-input"
                      placeholder="[BLANK 4]"
                      disabled={submitting}
                      style={{ width: '100%', marginTop: '0.5rem' }}
                    />
                  </p>
                </div>
              </div>

              {/* Error message */}
              {error && (
                <div style={{ 
                  background: 'rgba(255, 0, 64, 0.1)', 
                  border: '1px solid #ff0040',
                  padding: '0.75rem',
                  marginBottom: '1rem',
                  color: '#ff0040',
                  fontSize: '0.85rem'
                }}>
                  {error}
                </div>
              )}

              {/* Blockchain warning */}
              <div style={{
                background: 'rgba(90, 127, 163, 0.1)',
                border: '1px solid #5a7fa3',
                padding: '1rem',
                marginBottom: '1.5rem'
              }}>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'start' }}>
                  <span style={{ fontSize: '1.5rem' }}>🔐</span>
                  <div style={{ fontSize: '0.85rem', color: '#b0b0b0', lineHeight: '1.5' }}>
                    <strong style={{ color: '#5a7fa3' }}>BLOCKCHAIN SUBMISSION:</strong><br />
                    Your answer will be encrypted and stored on Kusama via Arxiv.<br />
                    It cannot be changed once submitted.
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="btn-secondary"
                  style={{ flex: 1 }}
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  style={{ flex: 1 }}
                  disabled={submitting || !answers.answer1.trim() || !answers.answer2.trim() || 
                            !answers.answer3.trim() || !answers.answer4.trim()}
                >
                  {submitting ? 'Submitting...' : 'Submit Final Answer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default AnswerSubmission


