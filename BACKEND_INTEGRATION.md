# Backend Integration Guide

## Overview

This document provides all the information needed to integrate the **Infinite Conspiracy** frontend with a backend API.

**Frontend Status**: ✅ Fully functional with mock data, ready for integration  
**Authentication**: MetaMask (Ethereum wallet address)  
**Blockchain**: Kusama (game transactions)  
**Storage**: Arxiv (temporary document storage)

---

## Architecture

1. **Authentication**: User connects MetaMask → Frontend gets Ethereum address
2. **Backend**: Receives wallet address in `X-Wallet-Address` header
3. **Game Transactions**: Registration and answer submission go to Kusama blockchain
4. **Document Storage**: Documents stored temporarily on Arxiv

---

## API Endpoints to Implement

All API calls are defined in `frontend/src/services/api.ts`.

### 1. Authenticate Wallet
```
POST /auth/wallet
```

**Request Body:**
```json
{
  "walletAddress": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"
}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "address": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
    "registeredMissions": ["mission-1", "mission-3"]
  }
}
```

**Notes:**
- User provides Ethereum address from MetaMask
- Backend tracks user state and registered missions

---

### 2. Get All Missions
```
GET /missions
```

**Response:**
```json
[
  {
    "id": "mission-1",
    "title": "The Hecatomb Conspiracy",
    "description": "Investigate a suspicious incident...",
    "startTime": "2024-11-15T10:00:00Z",
    "endTime": "2024-11-17T10:00:00Z",
    "status": "active",
    "image": "https://example.com/mission-image.jpg"
  }
]
```

**Status values**: `"upcoming"` | `"active"` | `"ended"`

---

### 3. Get Mission Details
```
GET /mission/:id
```

**Response:**
```json
{
  "id": "mission-1",
  "title": "The Hecatomb Conspiracy",
  "description": "Detailed description...",
  "mainQuestion": "Who is responsible for the incident?",
  "startTime": "2024-11-15T10:00:00Z",
  "endTime": "2024-11-17T10:00:00Z",
  "status": "active",
  "image": "https://example.com/mission-image.jpg"
}
```

---

### 4. Register for Mission
```
POST /mission/:id/register
```

**Headers:**
```
X-Wallet-Address: 0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb
```

**Response:**
```json
{
  "success": true,
  "message": "Successfully registered for mission",
  "transactionHash": "0xabc123...",
  "kusamaTransactionId": "kusama-tx-id"
}
```

**Notes:**
- This should create a transaction on Kusama blockchain
- Store registration on-chain
- Return both response confirmation and Kusama transaction ID

---

### 5. Get Mission Board Data
```
GET /mission/:id/board
```

**Headers:**
```
X-Wallet-Address: 0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb
```

**Response:**
```json
{
  "nodes": [
    {
      "id": "doc-1",
      "type": "email",
      "position": { "x": 250, "y": 150 },
      "data": {
        "title": "RE: Project Update",
        "content": {
          "document_id": "EM-001",
          "document_type": "email",
          "from": "john.doe@biocore.com",
          "to": "sarah.wilson@biocore.com",
          "subject": "RE: Project Update",
          "body": "Email content...",
          "timestamp": "2024-03-15T14:30:00Z"
        }
      }
    }
  ],
  "edges": []
}
```

**Notes:**
- Retrieve documents from Arxiv
- Frontend currently pre-places documents randomly
- If you want to persist board layouts, implement this endpoint

---

### 6. Submit Answer
```
POST /mission/:id/answer
```

**Headers:**
```
X-Wallet-Address: 0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb
```

**Request Body:**
```json
{
  "answer": "1: Answer to question 1 | 2: Answer to question 2 | 3: Answer to question 3 | 4: Answer to question 4"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Answer submitted successfully",
  "submissionId": "sub-123456",
  "kusamaTransactionHash": "0xdef456..."
}
```

**Notes:**
- Answer should be encrypted before storing
- Submit to Kusama blockchain
- Return transaction hash for verification

---

## Document Types Structure

All documents follow TypeScript interfaces in `frontend/src/types.ts`.

### Email Example
```json
{
  "document_id": "EM-001",
  "document_type": "email",
  "from": "sender@example.com",
  "to": "recipient@example.com",
  "subject": "Subject line",
  "body": "Email content...",
  "timestamp": "2024-03-15T14:30:00Z"
}
```

### Internal Memo Example (with encryption)
```json
{
  "document_id": "MEM-001",
  "document_type": "internal_memo",
  "from": "Department Head",
  "to": "Team",
  "date": "2024-03-15",
  "subject": "Confidential Information",
  "content": "Content...",
  "classification": "CONFIDENTIAL",
  "cipher_info": {
    "encrypted": true,
    "cipher_type": "vigenere",
    "hint": "Look for the keyword in document X"
  }
}
```

### Badge Log Example
```json
{
  "document_id": "BDG-001",
  "document_type": "badge_log",
  "facility_name": "BioCore Research Facility",
  "date": "2024-03-15",
  "log_period": "00:00 - 23:59",
  "entries": [
    {
      "badge_number": "B-1234",
      "name": "John Doe",
      "entry_time": "08:15",
      "location": "Lab A"
    }
  ]
}
```

**Full document type definitions** are in `frontend/src/types.ts`.

---

## Authentication Flow

1. User clicks "Connect Wallet" in frontend
2. MetaMask popup appears
3. User authorizes connection
4. Frontend receives Ethereum wallet address
5. Frontend sends address to backend via `POST /auth/wallet`
6. Backend returns user data (registered missions, etc.)
7. All subsequent requests include `X-Wallet-Address` header

**Example Header:**
```
X-Wallet-Address: 0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb
```

---

## Kusama Integration

### Mission Registration
- When user registers for a mission, create a transaction on Kusama
- Store registration on-chain with: wallet address, mission ID, timestamp
- Return transaction hash to frontend

### Answer Submission
- Encrypt user's answer
- Submit to Kusama blockchain
- Store: wallet address, mission ID, encrypted answer, timestamp
- Return transaction hash and submission ID

---

## Arxiv Integration

### Document Storage
- Documents are stored temporarily on Arxiv
- Backend retrieves documents when user accesses mission board
- Documents follow the structure defined in `frontend/src/types.ts`

### Document Retrieval
- When user accesses board: `GET /mission/:id/board`
- Backend fetches documents from Arxiv
- Transform to match frontend format
- Return as nodes array

---

## Mock Data Reference

Current mock data is in `frontend/src/utils/mockData.ts`:
- 1 active mission: "The Hecatomb Conspiracy"
- 12 documents of various types
- Realistic content structure

Use this as reference for data format.

---

## Integration Checklist

### Phase 1: Basic API
- [ ] Set up backend with CORS enabled for `http://localhost:5173`
- [ ] Implement `/missions` endpoint
- [ ] Implement `/mission/:id` endpoint
- [ ] Test with frontend

### Phase 2: Authentication
- [ ] Implement `/auth/wallet` endpoint
- [ ] Verify Ethereum address format
- [ ] Track user registered missions

### Phase 3: Kusama Integration
- [ ] Set up Kusama connection
- [ ] Implement registration transaction
- [ ] Implement answer submission transaction
- [ ] Return transaction hashes

### Phase 4: Arxiv Integration
- [ ] Connect to Arxiv
- [ ] Implement document retrieval
- [ ] Transform documents to match frontend format
- [ ] Implement `/mission/:id/board` endpoint

### Phase 5: Testing
- [ ] Test full user flow
- [ ] Verify blockchain transactions
- [ ] Test document retrieval
- [ ] Test answer encryption

---

## Testing the Integration

### Setup
```bash
# Frontend (port 5173)
cd frontend
npm run dev

# Backend (port 5000)
cd backend
# your backend start command
```

### Update Frontend
Create `frontend/.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

### Update API Calls
In `frontend/src/services/api.ts`, replace mock returns with real API calls:

```typescript
export const getAllMissions = async () => {
  const response = await apiClient.get('/missions')
  return response.data
}
```

### Test Flow
1. Open http://localhost:5173
2. Connect MetaMask
3. Browse missions
4. Register for a mission (Kusama tx)
5. Access the board (Arxiv documents)
6. Submit an answer (Kusama tx)

---

## Common Issues

### CORS Errors
Enable CORS on backend for frontend origin:
```python
# Flask example
from flask_cors import CORS
CORS(app, origins=["http://localhost:5173"])
```

### Wallet Address Not Sent
Check that `setAuthToken(address)` is called in `WalletConnect.tsx` after connection.

### Document Format Mismatch
Ensure Arxiv documents match TypeScript interfaces in `frontend/src/types.ts`.

---

## Key Files

1. **`frontend/src/services/api.ts`** - All API calls
2. **`frontend/src/types.ts`** - TypeScript interfaces
3. **`frontend/src/utils/mockData.ts`** - Mock data examples
4. **`frontend/src/components/wallet/WalletConnect.tsx`** - MetaMask connection

---

## Priority Order

1. **High**: `/missions` and `/mission/:id` - Get missions working
2. **High**: `/auth/wallet` - Authentication
3. **Medium**: Kusama registration transaction
4. **Medium**: Arxiv document retrieval
5. **Low**: Board layout persistence (frontend handles random placement)

---

**Questions?** Refer to TypeScript interfaces in `frontend/src/types.ts` for exact data formats.
