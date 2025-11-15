import { Link } from 'react-router-dom'
import { useApp } from '../../contexts/AppContext'
import WalletConnect from '../wallet/WalletConnect'

const Header = () => {
  const { user } = useApp()

  return (
    <header className="bg-dark-900 border-b border-main-color sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo / Title */}
          <Link to="/" className="flex items-center gap-3 group no-underline">
            <div>
              <h1 className="text-xl font-bold text-main-color logo">
                TITLE
              </h1>
              <p className="text-xs text-gray-400">investigation protocol</p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-6">
            {user && (
              <>
                <Link 
                  to="/missions" 
                  className="text-gray-300 hover:text-main-color transition-colors font-medium"
                >
                  Missions
                </Link>
                <WalletConnect />
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
