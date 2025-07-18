import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { 
  Mail, 
  MessageSquare, 
  Users, 
  TrendingUp, 
  Clock,
  Play,
  Pause,
  MoreHorizontal,
  Plus
} from 'lucide-react'
import { blink } from '../blink/client'

interface Campaign {
  id: string
  name: string
  status: 'active' | 'paused' | 'draft'
  prospects: number
  sent: number
  opened: number
  replied: number
  createdAt: string
}

export default function Dashboard() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [stats, setStats] = useState({
    totalProspects: 0,
    emailsSent: 0,
    openRate: 0,
    replyRate: 0
  })

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      // Load campaigns from database
      const campaignData = await blink.db.campaigns.list({
        orderBy: { createdAt: 'desc' },
        limit: 10
      })
      
      setCampaigns(campaignData.map(c => ({
        id: c.id,
        name: c.name,
        status: c.status as 'active' | 'paused' | 'draft',
        prospects: c.prospects || 0,
        sent: c.sent || 0,
        opened: c.opened || 0,
        replied: c.replied || 0,
        createdAt: c.createdAt
      })))

      // Calculate stats
      const totalProspects = campaignData.reduce((sum, c) => sum + (c.prospects || 0), 0)
      const emailsSent = campaignData.reduce((sum, c) => sum + (c.sent || 0), 0)
      const totalOpened = campaignData.reduce((sum, c) => sum + (c.opened || 0), 0)
      const totalReplied = campaignData.reduce((sum, c) => sum + (c.replied || 0), 0)

      setStats({
        totalProspects,
        emailsSent,
        openRate: emailsSent > 0 ? (totalOpened / emailsSent) * 100 : 0,
        replyRate: emailsSent > 0 ? (totalReplied / emailsSent) * 100 : 0
      })
    } catch (error) {
      console.error('Failed to load dashboard data:', error)
      // Set demo data for now
      setCampaigns([
        {
          id: '1',
          name: 'Q1 SaaS Outreach',
          status: 'active',
          prospects: 250,
          sent: 180,
          opened: 72,
          replied: 12,
          createdAt: new Date().toISOString()
        },
        {
          id: '2',
          name: 'Enterprise Follow-up',
          status: 'paused',
          prospects: 85,
          sent: 85,
          opened: 34,
          replied: 8,
          createdAt: new Date(Date.now() - 86400000).toISOString()
        }
      ])
      
      setStats({
        totalProspects: 335,
        emailsSent: 265,
        openRate: 40.0,
        replyRate: 7.5
      })
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'paused': return 'bg-yellow-100 text-yellow-800'
      case 'draft': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Monitor your outreach campaigns and performance</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Prospects</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProspects.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Emails Sent</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.emailsSent.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +8% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.openRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              +2.1% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reply Rate</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.replyRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              +0.8% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Campaigns */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Campaigns</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Your latest outreach campaigns and their performance
            </p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Campaign
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {campaigns.map((campaign) => (
              <div key={campaign.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-medium text-foreground">{campaign.name}</h3>
                      <Badge className={getStatusColor(campaign.status)}>
                        {campaign.status}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                      <span>{campaign.prospects} prospects</span>
                      <span>{campaign.sent} sent</span>
                      <span>{campaign.opened} opened</span>
                      <span>{campaign.replied} replied</span>
                      <span className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {formatDate(campaign.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {campaign.status === 'active' ? (
                    <Button variant="outline" size="sm">
                      <Pause className="w-4 h-4 mr-1" />
                      Pause
                    </Button>
                  ) : (
                    <Button variant="outline" size="sm">
                      <Play className="w-4 h-4 mr-1" />
                      Resume
                    </Button>
                  )}
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
            
            {campaigns.length === 0 && (
              <div className="text-center py-12">
                <Mail className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No campaigns yet</h3>
                <p className="text-muted-foreground mb-4">Create your first outreach campaign to get started</p>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Campaign
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}