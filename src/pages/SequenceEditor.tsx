import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Badge } from '../components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { 
  Mail, 
  MessageSquare, 
  Users, 
  Play,
  Pause,
  Edit,
  Copy,
  Trash2,
  Plus,
  BarChart3,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react'

interface Sequence {
  id: string
  name: string
  status: 'active' | 'paused' | 'draft'
  steps: number
  prospects: number
  sent: number
  opened: number
  replied: number
  createdAt: string
  lastModified: string
}

export default function SequenceEditor() {
  const [sequences, setSequences] = useState<Sequence[]>([
    {
      id: '1',
      name: 'SaaS Decision Makers',
      status: 'active',
      steps: 4,
      prospects: 150,
      sent: 120,
      opened: 48,
      replied: 12,
      createdAt: '2024-01-15',
      lastModified: '2024-01-18'
    },
    {
      id: '2',
      name: 'Enterprise Follow-up',
      status: 'paused',
      steps: 3,
      prospects: 75,
      sent: 75,
      opened: 30,
      replied: 8,
      createdAt: '2024-01-10',
      lastModified: '2024-01-16'
    },
    {
      id: '3',
      name: 'Cold Outreach Template',
      status: 'draft',
      steps: 5,
      prospects: 0,
      sent: 0,
      opened: 0,
      replied: 0,
      createdAt: '2024-01-20',
      lastModified: '2024-01-20'
    }
  ])

  const [selectedSequence, setSelectedSequence] = useState<string | null>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'paused': return 'bg-yellow-100 text-yellow-800'
      case 'draft': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4" />
      case 'paused': return <Pause className="w-4 h-4" />
      case 'draft': return <AlertCircle className="w-4 h-4" />
      default: return <AlertCircle className="w-4 h-4" />
    }
  }

  const toggleSequenceStatus = (sequenceId: string) => {
    setSequences(sequences.map(seq => {
      if (seq.id === sequenceId) {
        const newStatus = seq.status === 'active' ? 'paused' : 'active'
        return { ...seq, status: newStatus, lastModified: new Date().toISOString().split('T')[0] }
      }
      return seq
    }))
  }

  const duplicateSequence = (sequenceId: string) => {
    const sequence = sequences.find(s => s.id === sequenceId)
    if (sequence) {
      const newSequence: Sequence = {
        ...sequence,
        id: Date.now().toString(),
        name: `${sequence.name} (Copy)`,
        status: 'draft',
        prospects: 0,
        sent: 0,
        opened: 0,
        replied: 0,
        createdAt: new Date().toISOString().split('T')[0],
        lastModified: new Date().toISOString().split('T')[0]
      }
      setSequences([...sequences, newSequence])
    }
  }

  const deleteSequence = (sequenceId: string) => {
    setSequences(sequences.filter(s => s.id !== sequenceId))
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const calculateOpenRate = (opened: number, sent: number) => {
    return sent > 0 ? ((opened / sent) * 100).toFixed(1) : '0.0'
  }

  const calculateReplyRate = (replied: number, sent: number) => {
    return sent > 0 ? ((replied / sent) * 100).toFixed(1) : '0.0'
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Sequence Editor</h1>
            <p className="text-muted-foreground">Manage and optimize your outreach sequences</p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Sequence
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Sequence List */}
          <div className="grid gap-6">
            {sequences.map((sequence) => (
              <Card key={sequence.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">{sequence.name}</h3>
                        <div className="flex items-center space-x-4 mt-1">
                          <Badge className={getStatusColor(sequence.status)}>
                            {getStatusIcon(sequence.status)}
                            <span className="ml-1 capitalize">{sequence.status}</span>
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {sequence.steps} steps
                          </span>
                          <span className="text-sm text-muted-foreground">
                            Modified {formatDate(sequence.lastModified)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleSequenceStatus(sequence.id)}
                      >
                        {sequence.status === 'active' ? (
                          <>
                            <Pause className="w-4 h-4 mr-1" />
                            Pause
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4 mr-1" />
                            {sequence.status === 'draft' ? 'Activate' : 'Resume'}
                          </>
                        )}
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => duplicateSequence(sequence.id)}>
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => deleteSequence(sequence.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Performance Metrics */}
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div className="text-center p-3 bg-accent/50 rounded-lg">
                      <div className="flex items-center justify-center mb-1">
                        <Users className="w-4 h-4 text-muted-foreground mr-1" />
                      </div>
                      <div className="text-2xl font-bold text-foreground">{sequence.prospects}</div>
                      <div className="text-xs text-muted-foreground">Prospects</div>
                    </div>

                    <div className="text-center p-3 bg-accent/50 rounded-lg">
                      <div className="flex items-center justify-center mb-1">
                        <Mail className="w-4 h-4 text-muted-foreground mr-1" />
                      </div>
                      <div className="text-2xl font-bold text-foreground">{sequence.sent}</div>
                      <div className="text-xs text-muted-foreground">Sent</div>
                    </div>

                    <div className="text-center p-3 bg-accent/50 rounded-lg">
                      <div className="flex items-center justify-center mb-1">
                        <BarChart3 className="w-4 h-4 text-muted-foreground mr-1" />
                      </div>
                      <div className="text-2xl font-bold text-foreground">{sequence.opened}</div>
                      <div className="text-xs text-muted-foreground">Opened</div>
                    </div>

                    <div className="text-center p-3 bg-accent/50 rounded-lg">
                      <div className="flex items-center justify-center mb-1">
                        <MessageSquare className="w-4 h-4 text-muted-foreground mr-1" />
                      </div>
                      <div className="text-2xl font-bold text-foreground">{sequence.replied}</div>
                      <div className="text-xs text-muted-foreground">Replied</div>
                    </div>

                    <div className="text-center p-3 bg-accent/50 rounded-lg">
                      <div className="text-lg font-bold text-foreground">
                        {calculateReplyRate(sequence.replied, sequence.sent)}%
                      </div>
                      <div className="text-xs text-muted-foreground">Reply Rate</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Sequences</CardTitle>
                <Mail className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{sequences.length}</div>
                <p className="text-xs text-muted-foreground">
                  {sequences.filter(s => s.status === 'active').length} active
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Prospects</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {sequences.reduce((sum, s) => sum + s.prospects, 0)}
                </div>
                <p className="text-xs text-muted-foreground">
                  Across all sequences
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Open Rate</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {sequences.length > 0 
                    ? (sequences.reduce((sum, s) => sum + parseFloat(calculateOpenRate(s.opened, s.sent)), 0) / sequences.length).toFixed(1)
                    : '0.0'
                  }%
                </div>
                <p className="text-xs text-muted-foreground">
                  +2.1% from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Reply Rate</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {sequences.length > 0 
                    ? (sequences.reduce((sum, s) => sum + parseFloat(calculateReplyRate(s.replied, s.sent)), 0) / sequences.length).toFixed(1)
                    : '0.0'
                  }%
                </div>
                <p className="text-xs text-muted-foreground">
                  +0.8% from last month
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Performance Chart Placeholder */}
          <Card>
            <CardHeader>
              <CardTitle>Sequence Performance Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-accent/20 rounded-lg">
                <div className="text-center">
                  <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Performance charts coming soon</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Sequence Templates</CardTitle>
              <p className="text-sm text-muted-foreground">
                Pre-built sequences you can customize and use
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    name: 'SaaS Cold Outreach',
                    description: '5-step sequence for SaaS prospects',
                    steps: 5,
                    channels: ['email', 'linkedin', 'email']
                  },
                  {
                    name: 'Enterprise Follow-up',
                    description: '3-step follow-up for enterprise deals',
                    steps: 3,
                    channels: ['email', 'phone', 'email']
                  },
                  {
                    name: 'Event Follow-up',
                    description: 'Post-event nurture sequence',
                    steps: 4,
                    channels: ['email', 'linkedin', 'email', 'sms']
                  }
                ].map((template, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-foreground mb-2">{template.name}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{template.description}</p>
                      
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm text-muted-foreground">{template.steps} steps</span>
                        <div className="flex space-x-1">
                          {template.channels.map((channel, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {channel}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <Button className="w-full" variant="outline">
                        Use Template
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}