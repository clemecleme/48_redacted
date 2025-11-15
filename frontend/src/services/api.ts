import axios from 'axios'

// Re-export from mockData for convenience
export { getAllMissions, getMissionById, getDocumentsForMission } from '../utils/mockData'

// API base URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Set wallet address for auth
export const setAuthToken = (walletAddress: string | null) => {
  if (walletAddress) {
    apiClient.defaults.headers.common['X-Wallet-Address'] = walletAddress
  } else {
    delete apiClient.defaults.headers.common['X-Wallet-Address']
  }
}

// Authenticate wallet
export const authenticateWallet = async (walletAddress: string) => {
  console.log('Authenticating wallet:', walletAddress)
  return {
    success: true,
    user: {
      address: walletAddress,
      registeredMissions: [],
    },
  }
}

// Get mission board (returns empty - populated via drag & drop)
export const getMissionBoard = async (missionId: string) => {
  console.log('Fetching board for mission:', missionId)
  return []
}

// Submit answer
export const submitAnswer = async (missionId: string, answer: string) => {
  console.log('Submitting answer for mission:', missionId)
  return {
    success: true,
    message: 'Answer submitted successfully',
  }
}
