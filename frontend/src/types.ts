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

// Document types - 12 evidence types
export type DocumentType = 
  | 'email'             // Email message
  | 'diary'             // Diary entry
  | 'police_report'     // Police report
  | 'badge'             // ID badge
  | 'witness_statement' // Witness statement
  | 'bank_statement'    // Bank statement
  | 'newspaper'         // Newspaper page
  | 'internal_memo'     // Internal memo
  | 'phone_record'      // Phone call record
  | 'receipt'           // Receipt
  | 'surveillance_log'  // Surveillance log
  | 'medical_record'    // Medical record
  | 'article'           // Article (legacy)
  | 'terminal'          // Terminal (legacy)
  | 'image'             // Image (legacy)

export type DocumentState = 'unopened' | 'onBoard'

// Document content interface - holds all possible fields for all document types
export interface DocumentContent {
  // Email fields
  from?: string
  to?: string
  subject?: string
  emailDate?: string
  emailTime?: string
  body?: string
  cc?: string
  bcc?: string
  attachments?: string[]
  
  // Diary fields
  diaryDate?: string
  diaryEntry?: string
  mood?: string
  weather?: string
  
  // Police Report fields
  caseNumber?: string
  reportDate?: string
  reportTime?: string
  officer?: string
  badge?: string
  incidentType?: string
  location?: string
  reportSummary?: string
  witnessCount?: string
  evidenceList?: string[]
  
  // Badge fields
  badgeId?: string
  employeeName?: string
  department?: string
  position?: string
  issueDate?: string
  expiryDate?: string
  accessLevel?: string
  badgePhoto?: string
  
  // Witness Statement fields
  witnessName?: string
  witnessAddress?: string
  statementDate?: string
  statementTime?: string
  interviewedBy?: string
  statementText?: string
  witnessSignature?: string
  
  // Bank Statement fields
  accountNumber?: string
  accountHolder?: string
  statementPeriod?: string
  openingBalance?: string
  closingBalance?: string
  transactions?: Array<{
    date: string
    description: string
    amount: string
    balance: string
  }>
  
  // Internal Memo fields
  memoTo?: string
  memoFrom?: string
  memoDate?: string
  memoSubject?: string
  memoBody?: string
  priority?: string
  confidential?: boolean
  
  // Phone Record fields
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
  
  // Receipt fields
  storeName?: string
  storeAddress?: string
  receiptNumber?: string
  receiptDate?: string
  receiptTime?: string
  items?: Array<{
    name: string
    quantity: string
    price: string
  }>
  totalAmount?: string
  paymentMethod?: string
  
  // Surveillance Log fields
  surveillanceDate?: string
  surveillanceLocation?: string
  operator?: string
  logEntries?: Array<{
    time: string
    activity: string
    notes: string
  }>
  
  // Medical Record fields
  patientName?: string
  medicalDate?: string
  doctorName?: string
  diagnosis?: string
  notes?: string
  
  // Newspaper fields
  newspaperName?: string
  date?: string
  volume?: string
  issue?: string
  price?: string
  headline?: string
  subheadline?: string
  author?: string
  mainArticle?: string
  articleText?: string
  photoUrl?: string
  photoCaption?: string
  
  // Article fields (legacy)
  heading?: string
  source?: string
  previewText?: string
  articleImage?: string
  
  // Terminal fields (legacy)
  terminalText?: string
  
  // Image fields (legacy)
  imageUrl?: string
  caption?: string
  
  // Generic fields
  title?: string
  description?: string
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
