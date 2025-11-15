# Conspiracy Investigation Game - Polkadot Hackathon

A blockchain-based conspiracy investigation game where players solve fictional mysteries by exploring documents stored on the Kusama blockchain via Arxiv.

## Project Overview

Players connect their Kusama wallet, join time-limited missions (48 hours), explore an infinite board of documents (drag-and-drop), and submit encrypted answers to solve conspiracy investigations.

## Tech Stack

- **Frontend**: React + TypeScript + Vite
- **UI**: Tailwind CSS
- **Board**: React Flow (infinite canvas)
- **Blockchain**: Kusama (Polkadot.js)
- **Storage**: Arxiv (on-chain document storage)
- **Routing**: React Router

## Setup Instructions

### Prerequisites
- Node.js 18+
- Polkadot.js browser extension
- Kusama wallet

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

### Build for Production

```bash
npm run build
```

## Features

- Wallet connection (Kusama via Polkadot.js)
- Mission browsing and registration
- Infinite board with document exploration
- Document viewer overlay
- Answer submission with encryption
- Time-limited missions with countdown timers

## Architecture

All mission data, documents, and board structures are stored on Kusama blockchain via Arxiv. The frontend retrieves and displays this public data while keeping answer submissions encrypted.

## Penpot Integration (Future)

This project is configured to use Penpot MCP for design-to-code workflow. See `CURSOR_MCP_SETUP.md` for configuration details.

## Resources

- [Polkadot.js](https://polkadot.js.org/)
- [Kusama](https://kusama.network/)
- [React Flow](https://reactflow.dev/)


