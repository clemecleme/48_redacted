# TITLE - Investigation Protocol

A blockchain-based investigation game where players solve mysteries by exploring documents stored on Arxiv.

## Project Overview

Players connect their Ethereum wallet (MetaMask), join time-limited missions, explore an interactive board of evidence documents (drag-and-drop), and submit answers to solve investigations.

## Tech Stack

- **Frontend**: React + TypeScript + Vite
- **UI**: Tailwind CSS + Custom Terminal Aesthetic
- **Board**: React Flow (infinite canvas with gravity edges)
- **Blockchain**: Ethereum (MetaMask)
- **Storage**: Arxiv (decentralized document storage)
- **Routing**: React Router

## Setup Instructions

### Prerequisites
- Node.js 18+
- MetaMask browser extension (or use Demo Mode)

### Installation

```bash
# Install dependencies
cd frontend
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

## Features

### ✅ Completed
- MetaMask wallet connection + Demo Mode
- Time-limited investigation missions
- Registration system (register before mission starts)
- Interactive investigation board with drag & drop
- 9+ evidence document types (email, memo, police report, badge log, etc.)
- Terminal-style unified UI
- Gravity effect on connection edges
- Document overlay for detailed view
- Mission filtering (Upcoming / Active / Ended)

### 🚧 In Progress
- Arxiv integration for document retrieval
- Encrypted documents with cipher challenges
- Answer submission to blockchain

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── board/          # Investigation board components
│   │   ├── layout/         # Header, Layout
│   │   ├── mission/        # Mission cards, Timer
│   │   ├── wallet/         # MetaMask connection
│   │   └── ui/             # Reusable UI components
│   ├── pages/              # Main pages (Landing, Missions, Board)
│   ├── contexts/           # React Context (User, App state)
│   ├── services/           # API calls
│   ├── utils/              # Mock data, helpers
│   ├── types.ts            # TypeScript interfaces
│   └── style.css           # Global styles (TSUKI aesthetic)
└── package.json
```

## Document Types Supported

Based on Félix's Arxiv structure:
1. **Email** - Correspondence
2. **Internal Memo** - Company memos (can be encrypted)
3. **Badge Log** - Access control logs
4. **Surveillance Log** - Camera footage logs (can be encrypted)
5. **Police Report** - Official incident reports
6. **Diary** - Personal diary entries
7. **Bank Statement** - Financial transactions
8. **Receipt** - Purchase receipts
9. **Witness Statement** - Testimonies

Each document type has a specific JSON structure defined in `types.ts`.

## Contributing

This project is part of the Polkadot Hackathon.

## License

MIT
