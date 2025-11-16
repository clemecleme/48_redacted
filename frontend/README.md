# Infinite Conspiracy - Frontend

React + TypeScript frontend for Infinite Conspiracy investigation game.

## Tech Stack

- React 19 + TypeScript
- Vite 7
- React Flow (interactive board)
- React Router v7
- MetaMask (wallet authentication)
- Axios (API calls)

## Installation

```bash
npm install
npm run dev          # Start development server
npm run build        # Build for production
```

## Environment Variables

Create `.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

## Architecture

- **Authentication**: MetaMask (Ethereum wallet address)
- **Game Logic**: Kusama blockchain (via backend)
- **Storage**: Arxiv (documents via backend)
- **Frontend**: React app with mock data, ready for backend integration

## Key Features

- MetaMask wallet connection
- Mission browsing and filtering
- Time-limited countdown timers
- Interactive investigation board (React Flow)
- Document viewer with 9+ document types
- 4-part answer submission
- Demo mode for Sub0 jury

## API Integration

All API calls in `src/services/api.ts` are currently mocked. Backend needs to implement:

- `POST /auth/wallet` - Authenticate MetaMask address
- `GET /missions` - List missions
- `GET /mission/:id` - Mission details
- `POST /mission/:id/register` - Register (Kusama tx)
- `GET /mission/:id/board` - Get documents (Arxiv)
- `POST /mission/:id/answer` - Submit answer (Kusama tx)

See `BACKEND_INTEGRATION.md` for details.

## Data Types

All TypeScript interfaces in `src/types.ts`:
- Mission, User, Document types
- 9+ document content types (email, memo, police report, etc.)

## Mock Data

Sample data in `src/utils/mockData.ts`:
- 1 active mission
- 12 evidence documents

Use as reference for backend data format.

## Development

The app is fully functional with mock data. To connect to backend:

1. Set `VITE_API_URL` in `.env`
2. Update `src/services/api.ts` to use real API calls
3. Test with backend running

---

**Ready for backend integration**
