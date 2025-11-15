import { useEffect, useState, useCallback, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  Node,
  Edge,
  useNodesState,
  useEdgesState,
  NodeTypes,
  EdgeTypes,
  Connection,
  ReactFlowInstance,
  useReactFlow,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { useApp } from '../contexts/AppContext'
import DocumentNode from '../components/board/DocumentNode'
import DocumentOverlay from '../components/board/DocumentOverlay'
import DocumentSidebar from '../components/board/DocumentSidebar'
import SagEdge from '../components/board/SagEdge'
import SagConnectionLine from '../components/board/SagConnectionLine'
import { Document, DocumentNode as DocumentNodeType } from '../types'
import { getMissionById, getDocumentsForMission } from '../utils/mockData'

const nodeTypes: NodeTypes = {
  email: DocumentNode,
  diary: DocumentNode,
  police_report: DocumentNode,
  badge: DocumentNode,
  witness_statement: DocumentNode,
  bank_statement: DocumentNode,
  newspaper: DocumentNode,
  internal_memo: DocumentNode,
  phone_record: DocumentNode,
  receipt: DocumentNode,
  surveillance_log: DocumentNode,
  medical_record: DocumentNode,
  article: DocumentNode,
  terminal: DocumentNode,
  image: DocumentNode,
}

const edgeTypes: EdgeTypes = {
  sag: SagEdge,
}

const BoardPage = () => {
  const { id } = useParams<{ id: string }>()
  const { user } = useApp()
  const navigate = useNavigate()
  const reactFlowWrapper = useRef<HTMLDivElement>(null)
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null)
  
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const [documents, setDocuments] = useState<Document[]>([])
  const [mission, setMission] = useState<any>(null)
  const [selectedDocument, setSelectedDocument] = useState<DocumentNodeType | null>(null)
  const [accessDenied, setAccessDenied] = useState(false)

  useEffect(() => {
    if (!user || !id) {
      navigate('/')
      return
    }

    // Load mission and check access
    const missionData = getMissionById(id)
    if (!missionData) {
      navigate('/missions')
      return
    }

    // Check if mission is active and user is not registered
    const isActive = missionData.status === 'active'
    const isRegistered = user.registeredMissions?.includes(id)
    
    if (isActive && !isRegistered) {
      setAccessDenied(true)
      return
    }

    setMission(missionData)

    // Load documents
    const docs = getDocumentsForMission(id)
    setDocuments(docs)
  }, [id, user, navigate])

  // Handle drag start from sidebar
  const onDragStart = (event: React.DragEvent, document: Document) => {
    if (!document || document.state === 'onBoard') return
    
    event.dataTransfer.setData('application/reactflow', JSON.stringify(document))
    event.dataTransfer.effectAllowed = 'move'
  }

  // Handle drop on board
  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault()

      if (!reactFlowInstance) return

      const documentData = event.dataTransfer.getData('application/reactflow')
      if (!documentData) return

      try {
        const document: Document = JSON.parse(documentData)

        // Convert screen coordinates to flow coordinates
        const position = reactFlowInstance.screenToFlowPosition({
          x: event.clientX,
          y: event.clientY,
        })

        // Create new node
        const newNode: Node = {
          id: `node-${document.id}-${Date.now()}`,
          type: document.type,
          position,
          data: {
            title: document.name,
            content: document.content,
          },
        }

        setNodes((nds) => nds.concat(newNode))

        // Update document state
        setDocuments((docs) =>
          docs.map((d) =>
            d.id === document.id ? { ...d, state: 'onBoard' as const } : d
          )
        )
      } catch (error) {
        console.error('Error dropping document:', error)
      }
    },
    [reactFlowInstance, setNodes]
  )

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }, [])

  // Handle node double click to open overlay
  const onNodeDoubleClick = useCallback((_event: React.MouseEvent, node: Node) => {
    const doc: DocumentNodeType = {
      id: node.id,
      type: node.type as any,
      position: node.position,
      data: node.data as any,
    }
    setSelectedDocument(doc)
  }, [])

  // Handle edge creation
  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) => {
        const newEdge: Edge = {
          id: `edge-${connection.source}-${connection.target}`,
          source: connection.source!,
          target: connection.target!,
          type: 'sag',
        }
        return eds.concat(newEdge)
      })
    },
    [setEdges]
  )

  // Handle edge deletion (right-click)
  const onEdgeContextMenu = useCallback((event: React.MouseEvent, edge: Edge) => {
    event.preventDefault()
    if (window.confirm('Delete this connection?')) {
      setEdges((eds) => eds.filter((e) => e.id !== edge.id))
    }
  }, [setEdges])

  if (accessDenied) {
    return (
      <div className="h-screen bg-dark-950 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-6">🔒</div>
          <h1 className="text-2xl font-bold text-white mb-4">Access Denied</h1>
          <p className="text-gray-400 mb-6">
            You must register for this mission before it starts to gain access.
          </p>
          <button onClick={() => navigate('/missions')} className="btn-primary">
            Back to Missions
          </button>
        </div>
      </div>
    )
  }

  if (!mission) {
    return (
      <div className="h-screen bg-dark-950 flex items-center justify-center">
        <div className="text-2xl text-white">Loading...</div>
      </div>
    )
  }

  return (
    <div className="h-screen bg-dark-950 flex flex-col">
      {/* Top Bar */}
      <div className="bg-dark-900 border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-white mb-1">{mission.title}</h1>
          {mission.mainQuestion && (
            <p className="text-sm text-gray-400">{mission.mainQuestion}</p>
          )}
        </div>

        <button className="btn-primary">
          Submit Answer
        </button>
      </div>

      {/* Main Content: Sidebar + Board */}
      <div className="flex-1 flex overflow-hidden">
        {/* Document Sidebar */}
        <DocumentSidebar documents={documents} onDragStart={onDragStart} />

        {/* React Flow Board */}
        <div ref={reactFlowWrapper} className="flex-1" onDrop={onDrop} onDragOver={onDragOver}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeDoubleClick={onNodeDoubleClick}
            onConnect={onConnect}
            onEdgeContextMenu={onEdgeContextMenu}
            onInit={setReactFlowInstance}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            connectionLineComponent={SagConnectionLine}
            fitView
            deleteKeyCode={null}
            connectionMode="loose"
          >
            <Background color="#374151" gap={16} />
            <Controls />
            <MiniMap />
          </ReactFlow>

          {/* Empty board message */}
          {nodes.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center text-gray-500">
                <div className="text-6xl mb-4">📋</div>
                <div className="text-xl mb-2">Drag documents from the sidebar to start investigating</div>
                <div className="text-sm">Double-click nodes to view details • Right-click edges to delete</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Document Overlay */}
      <DocumentOverlay
        document={selectedDocument}
        onClose={() => setSelectedDocument(null)}
      />
    </div>
  )
}

export default BoardPage
