import { useState } from 'react'
import Button from '../ui/Button'
import { submitAnswer } from '../../services/api'

interface AnswerSubmissionProps {
  missionId: string
}

const AnswerSubmission = ({ missionId }: AnswerSubmissionProps) => {
  const [answer, setAnswer] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!answer.trim()) {
      setError('Please enter your answer')
      return
    }

    setSubmitting(true)
    setError(null)

    try {
      const result = await submitAnswer(missionId, answer)
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

  if (submitted) {
    return (
      <div className="bg-dark-900 border border-gray-800 rounded-lg p-6">
        <div className="text-center">
          <div className="text-6xl mb-4">✓</div>
          <h3 className="text-2xl font-bold text-green-400 mb-2">
            Answer Submitted!
          </h3>
          <p className="text-gray-300 mb-4">
            Your encrypted answer has been recorded on the blockchain.
            Check back when the mission ends to see if you were correct!
          </p>
          <div className="text-xs text-gray-500 font-mono">
            Submission ID: {Math.random().toString(36).substr(2, 9)}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-dark-900 border border-gray-800 rounded-lg p-6">
      <h3 className="text-2xl font-bold text-white mb-4">Submit Your Answer</h3>
      <p className="text-gray-400 mb-6">
        Based on your investigation, who or what do you believe is behind the conspiracy?
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="answer" className="block text-sm font-semibold text-gray-300 mb-2">
            Your Answer
          </label>
          <textarea
            id="answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            rows={4}
            className="w-full bg-dark-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
            placeholder="Enter your answer here... Be specific and explain your reasoning."
            disabled={submitting}
          />
          <div className="text-xs text-gray-500 mt-1">
            {answer.length} characters
          </div>
        </div>

        {error && (
          <div className="bg-red-900/20 border border-red-700 rounded-lg p-3 text-red-400 text-sm">
            {error}
          </div>
        )}

        <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-4">
          <div className="flex items-start gap-2">
            <span className="text-blue-400 text-xl">🔐</span>
            <div className="text-sm text-gray-300">
              <strong className="text-blue-400">Note:</strong> Your answer will be encrypted
              and stored on the Kusama blockchain via Arxiv. It cannot be changed once submitted.
            </div>
          </div>
        </div>

        <Button
          type="submit"
          disabled={submitting || !answer.trim()}
          className="w-full text-lg py-4"
        >
          {submitting ? 'Submitting...' : 'Submit Final Answer'}
        </Button>
      </form>
    </div>
  )
}

export default AnswerSubmission

