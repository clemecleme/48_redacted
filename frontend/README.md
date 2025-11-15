# Conspiracy Investigation Game - Frontend

React + TypeScript frontend for the blockchain-based conspiracy investigation game.

## Tech Stack

- **React 18** with TypeScript
- **Vite** - Fast build tool
- **Tailwind CSS** - Styling
- **React Flow** - Infinite board canvas
- **React Router** - Navigation
- **Polkadot.js** - Kusama wallet integration
- **Axios** - API communication

## Prerequisites

- Node.js 18+
- Polkadot.js browser extension installed
- Kusama wallet configured

## Installation

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env
```

## Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The app will be available at `http://localhost:5173`

## Project Structure

```
src/
├── components/
│   ├── board/           # Board and document components
│   ├── layout/          # Header, Layout
│   ├── mission/         # Mission cards, timer
│   ├── ui/              # Reusable UI components
│   └── wallet/          # Wallet connection
├── contexts/
│   └── AppContext.tsx   # Global state management
├── pages/
│   ├── Landing.tsx      # Home page with wallet connect
│   ├── MissionsList.tsx # Browse missions
│   ├── MissionDetail.tsx# Mission details and registration
│   └── BoardPage.tsx    # Investigation board (React Flow)
├── services/
│   └── api.ts           # API service layer
├── utils/
│   └── mockData.ts      # Mock data (simulates Arxiv)
└── App.tsx              # Main app with routing
```

## Features

### Implemented

✅ Kusama wallet connection via Polkadot.js  
✅ Mission browsing and filtering  
✅ Time-limited missions with countdown timers  
✅ Mission registration system  
✅ Infinite investigation board (React Flow)  
✅ Document drag-and-drop on board  
✅ Document viewer overlay  
✅ Answer submission with encryption placeholder  
✅ Fully responsive design  
✅ Mock data simulating Arxiv structure  

### Backend Integration Points

All API calls in `src/services/api.ts` are currently mocked. Replace with real backend endpoints:

- `POST /auth/wallet` - Authenticate wallet
- `GET /missions` - List all missions
- `GET /mission/:id` - Get mission details
- `POST /mission/:id/register` - Register for mission
- `GET /mission/:id/board` - Get board data from Arxiv
- `POST /mission/:id/answer` - Submit encrypted answer
- `GET /mission/:id/registration-status` - Check registration

## Wallet Connection

The app uses Polkadot.js extension to connect to Kusama wallets:

1. User clicks "Connect Wallet"
2. Polkadot.js extension popup appears
3. User selects account
4. Wallet address is stored in context
5. Address is sent in headers for all API requests

## Data Flow

1. **Missions** - Retrieved from Arxiv (blockchain storage)
2. **Board Nodes** - Document structure stored on Arxiv
3. **User Registration** - Blockchain transaction via backend
4. **Answer Submission** - Encrypted and stored on blockchain

## Styling

- Dark theme for "conspiracy" atmosphere
- Custom Tailwind components in `src/style.css`
- Utility classes for rapid development
- Responsive design (desktop-first)

## Development Notes

- All state managed via React Context (no external state library)
- TypeScript for type safety
- Mock data structure matches expected Arxiv format
- Ready for backend integration - just swap API calls

## Next Steps

1. Connect to real backend API
2. Implement actual encryption for answers
3. Add blockchain transaction confirmations
4. Implement force-directed layout for board
5. Add more document types and visualization
6. Mobile optimizations
7. Add Penpot design integration

## Browser Support

- Chrome/Edge (recommended) - Polkadot.js extension
- Firefox - Polkadot.js extension
- Brave - Polkadot.js extension

