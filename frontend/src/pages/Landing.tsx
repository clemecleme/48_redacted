import { useNavigate } from 'react-router-dom'
import { useApp } from '../contexts/AppContext'
import Layout from '../components/layout/Layout'
import WalletConnect from '../components/wallet/WalletConnect'

const Landing = () => {
  const { user } = useApp()
  const navigate = useNavigate()

  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="max-w-2xl w-full text-center">
          {/* Hero Section */}
          <div className="mb-12 hero-section">
            <h1 className="text-6xl font-bold mb-6 hero-title">TITLE</h1>
            <p className="text-xl mb-8 hero-subtitle">solve the mystery</p>
            <p className="text-gray-300 leading-relaxed mb-8">
              Dive into time-limited investigations
              <br />
              based on evidences stored on Arxiv
            </p>
          </div>

          {/* Get Started Section */}
          <div className="bg-dark-900 border border-main-color p-8">
            <h2 className="text-2xl font-semibold mb-6 text-main-color">
              Get Started
            </h2>
            <WalletConnect />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Landing
