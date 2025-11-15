// User interface
export interface User {
  address: string
  registeredMissions: string[]
}

// Mission interface
export interface Mission {
  id: string
  title: string
  description: string
  mainQuestion?: string
  startTime: string
  endTime: string
  status: 'upcoming' | 'active' | 'ended'
  image?: string
}

// Document types - Based on Félix's Arxiv structure
export type DocumentType = 
  | 'email'
  | 'internal_memo'
  | 'badge_log'
  | 'surveillance_log'
  | 'police_report'
  | 'diary'
  | 'bank_statement'
  | 'receipt'
  | 'witness_statement'
  // Legacy types for backward compatibility
  | 'newspaper'
  | 'phone_record'
  | 'medical_record'
  | 'article'
  | 'terminal'
  | 'image'

export type DocumentState = 'unopened' | 'onBoard'

// Cipher info structure (for encrypted documents)
export interface CipherInfo {
  encrypted: boolean
  cipher_type: 'vigenere' | 'caesar' | string
  encrypted_sections?: string[]
  hint?: string
  key_hint?: string
  key_location?: string
}

// Document content interface - Matches Félix's Arxiv JSON structure exactly
export interface DocumentContent {
  // Common fields
  document_id?: string
  document_type?: string
  
  // EMAIL fields
  from?: string
  to?: string | string[]  // Can be string or array
  subject?: string
  body?: string
  timestamp?: string
  
  // INTERNAL_MEMO fields
  date?: string
  content?: string
  classification?: string
  cipher_info?: CipherInfo
  
  // BADGE_LOG fields
  facility_name?: string
  log_period?: string
  entries?: Array<{
    badge_number: string
    name: string
    entry_time: string
    location: string
  }>
  
  // SURVEILLANCE_LOG fields
  location?: string
  operator?: string
  entries?: Array<{
    time: string
    camera_id?: string
    observation: string
    action_taken: string
  }>
  
  // POLICE_REPORT fields
  case_number?: string
  officer?: string
  incident_description?: string
  witnesses?: Array<{
    name: string
    role?: string
    statement_summary?: string
  }>
  evidence_list?: Array<{
    evidence_id: string
    type: string
    description: string
  }>
  has_red_herring?: boolean
  red_herring_type?: string
  
  // DIARY fields
  entry_text?: string
  author?: string
  mood?: string
  
  // BANK_STATEMENT fields
  account_holder?: string
  account_number?: string
  period?: string
  opening_balance?: number
  closing_balance?: number
  transactions?: Array<{
    date: string
    description: string
    amount: number
    balance: number
  }>
  
  // RECEIPT fields
  merchant?: string
  time?: string
  items?: Array<{
    item?: string
    name?: string
    quantity: number
    price: number
  }>
  total?: number
  payment_method?: string
  transaction_id?: string
  
  // WITNESS_STATEMENT fields
  witness_name?: string
  statement_text?: string
  signed?: boolean
  
  // Legacy/additional fields for backward compatibility
  title?: string
  description?: string
  
  // NEWSPAPER fields (legacy)
  newspaperName?: string
  volume?: string
  issue?: string
  price?: string
  headline?: string
  subheadline?: string
  mainArticle?: string
  articleText?: string
  photoUrl?: string
  photoCaption?: string
  
  // PHONE_RECORD fields (legacy)
  phoneNumber?: string
  callDuration?: string
  callDate?: string
  callTime?: string
  callType?: string
  callRecords?: Array<{
    time: string
    number: string
    duration: string
    type: string
  }>
  
  // MEDICAL_RECORD fields (legacy)
  patientName?: string
  medicalDate?: string
  doctorName?: string
  diagnosis?: string
  notes?: string
  
  // ARTICLE fields (legacy)
  heading?: string
  source?: string
  previewText?: string
  articleImage?: string
  
  // TERMINAL fields (legacy)
  terminalText?: string
  
  // IMAGE fields (legacy)
  imageUrl?: string
  caption?: string
}

// Document in sidebar
export interface Document {
  id: string
  name: string
  type: DocumentType
  icon: string
  state: DocumentState
  content: DocumentContent
}

// Document node on the board (React Flow node)
export interface DocumentNode {
  id: string
  type: DocumentType
  position: { x: number; y: number }
  data: {
    title: string
    content: DocumentContent
  }
}

// Document edge (connection between nodes)
export interface DocumentEdge {
  id: string
  source: string
  target: string
  type?: string
}
