import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Mail, 
  MessageSquare, 
  Users, 
  Eye,
  Calendar,
  Download,
  Filter
} from 'lucide-react'

interface CampaignAnalytics {
  id: string
  name: string
  sent: number
  delivered: number
  opened: number
  clicked: number
  replied: number
  bounced: number
  unsubscribed: number
  openRate: number
  clickRate: number
  replyRate: number
  bounceRate: number
}

export default function Analytics() {
  const [timeRange, setTimeRange] = useState('30d')
  const [selectedCampaign, setSelectedCampaign] = useState('all')

  const campaigns: CampaignAnalytics[] = [
    {
      id: '1',
      name: 'Q1 SaaS Outreach',
      sent: 250,
      delivered: 245,
      opened: 98,
      clicked: 32,
      replied: 18,
      bounced: 5,
      unsubscribed: 2,
      openRate: 40.0,
      clickRate: 13.1,
      replyRate: 7.3,
      bounceRate: 2.0
    },
    {
      id: '2',
      name: 'Enterprise Follow-up',
      sent: 85,
      delivered: 83,
      opened: 41,
      clicked: 15,
      replied: 12,
      bounced: 2,
      unsubscribed: 1,
      openRate: 49.4,
      clickRate: 18.1,
      replyRate: 14.5,
      bounceRate: 2.4
    }
  ]

  const totalStats = campaigns.reduce((acc, campaign) => ({
    sent: acc.sent + campaign.sent,
    delivered: acc.delivered + campaign.delivered,
    opened: acc.opened + campaign.opened,
    clicked: acc.clicked + campaign.clicked,
    replied: acc.replied + campaign.replied,
    bounced: acc.bounced + campaign.bounced,
    unsubscribed: acc.unsubscribed + campaign.unsubscribed
  }), {
    sent: 0,
    delivered: 0,
    opened: 0,
    clicked: 0,
    replied: 0,
    bounced: 0,
    unsubscribed: 0
  })

  const avgOpenRate = totalStats.sent > 0 ? (totalStats.opened / totalStats.sent * 100) : 0
  const avgClickRate = totalStats.sent > 0 ? (totalStats.clicked / totalStats.sent * 100) : 0
  const avgReplyRate = totalStats.sent > 0 ? (totalStats.replied / totalStats.sent * 100) : 0
  const avgBounceRate = totalStats.sent > 0 ? (totalStats.bounced / totalStats.sent * 100) : 0

  const getPerformanceColor = (rate: number, type: 'open' | 'click' | 'reply' | 'bounce') => {
    const thresholds = {
      open: { good: 25, average: 15 },
      click: { good: 10, average: 5 },
      reply: { good: 8, average: 3 },
      bounce: { good: 2, average: 5 } // Lower is better for bounce
    }
    
    const threshold = thresholds[type]
    if (type === 'bounce') {
      if (rate <= threshold.good) return 'text-green-600'
      if (rate <= threshold.average) return 'text-yellow-600'
      return 'text-red-600'
    } else {
      if (rate >= threshold.good) return 'text-green-600'
      if (rate >= threshold.average) return 'text-yellow-600'
      return 'text-red-600'
    }
  }

  const getTrendIcon = (isPositive: boolean) => {
    return isPositive ? (
      <TrendingUp className="w-4 h-4 text-green-600" />
    ) : (
      <TrendingDown className="w-4 h-4 text-red-600" />
    )
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Analytics</h1>
            <p className="text-muted-foreground">Track and analyze your outreach performance</p>
          </div>
          <div className="flex items-center space-x-4">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Emails Sent</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStats.sent.toLocaleString()}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              {getTrendIcon(true)}
              <span className="ml-1">+12% from last period</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Rate</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getPerformanceColor(avgOpenRate, 'open')}`}>
              {avgOpenRate.toFixed(1)}%
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              {getTrendIcon(true)}
              <span className="ml-1">+2.1% from last period</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Click Rate</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getPerformanceColor(avgClickRate, 'click')}`}>
              {avgClickRate.toFixed(1)}%
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              {getTrendIcon(false)}
              <span className="ml-1">-0.5% from last period</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reply Rate</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getPerformanceColor(avgReplyRate, 'reply')}`}>
              {avgReplyRate.toFixed(1)}%
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              {getTrendIcon(true)}
              <span className="ml-1">+0.8% from last period</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="campaigns">Campaign Performance</TabsTrigger>
          <TabsTrigger value="engagement">Engagement Analysis</TabsTrigger>
          <TabsTrigger value="deliverability">Deliverability</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Performance Chart Placeholder */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Performance Trends</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Email performance over the selected time period
                </p>
              </div>
              <Select value={selectedCampaign} onValueChange={setSelectedCampaign}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Campaigns</SelectItem>
                  {campaigns.map(campaign => (
                    <SelectItem key={campaign.id} value={campaign.id}>
                      {campaign.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-accent/20 rounded-lg">
                <div className="text-center">
                  <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Interactive charts coming soon</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Insights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Subject Lines</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { subject: 'Quick question about {{company_name}}', openRate: 52.3, sent: 45 },
                    { subject: 'Following up on our conversation', openRate: 48.7, sent: 38 },
                    { subject: '{{first_name}}, thoughts on this?', openRate: 45.2, sent: 52 }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-accent/50 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-sm text-foreground">{item.subject}</p>
                        <p className="text-xs text-muted-foreground">{item.sent} emails sent</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">
                        {item.openRate}% open rate
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Best Performing Days</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { day: 'Tuesday', openRate: 42.1, sent: 89 },
                    { day: 'Wednesday', openRate: 38.9, sent: 76 },
                    { day: 'Thursday', openRate: 36.4, sent: 82 }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-accent/50 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-sm text-foreground">{item.day}</p>
                        <p className="text-xs text-muted-foreground">{item.sent} emails sent</p>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800">
                        {item.openRate}% open rate
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Campaign Performance Comparison</CardTitle>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {campaigns.map((campaign) => (
                  <div key={campaign.id} className="p-4 border border-border rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-foreground">{campaign.name}</h3>
                      <Badge variant="outline">{campaign.sent} sent</Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className={`text-lg font-bold ${getPerformanceColor(campaign.openRate, 'open')}`}>
                          {campaign.openRate.toFixed(1)}%
                        </div>
                        <div className="text-xs text-muted-foreground">Open Rate</div>
                        <div className="text-xs text-muted-foreground">{campaign.opened} opens</div>
                      </div>
                      
                      <div className="text-center">
                        <div className={`text-lg font-bold ${getPerformanceColor(campaign.clickRate, 'click')}`}>
                          {campaign.clickRate.toFixed(1)}%
                        </div>
                        <div className="text-xs text-muted-foreground">Click Rate</div>
                        <div className="text-xs text-muted-foreground">{campaign.clicked} clicks</div>
                      </div>
                      
                      <div className="text-center">
                        <div className={`text-lg font-bold ${getPerformanceColor(campaign.replyRate, 'reply')}`}>
                          {campaign.replyRate.toFixed(1)}%
                        </div>
                        <div className="text-xs text-muted-foreground">Reply Rate</div>
                        <div className="text-xs text-muted-foreground">{campaign.replied} replies</div>
                      </div>
                      
                      <div className="text-center">
                        <div className={`text-lg font-bold ${getPerformanceColor(campaign.bounceRate, 'bounce')}`}>
                          {campaign.bounceRate.toFixed(1)}%
                        </div>
                        <div className="text-xs text-muted-foreground">Bounce Rate</div>
                        <div className="text-xs text-muted-foreground">{campaign.bounced} bounces</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="engagement" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Engagement Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48 flex items-center justify-center bg-accent/20 rounded-lg">
                  <div className="text-center">
                    <Calendar className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Engagement timeline chart</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Response Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { category: 'Interested', count: 12, percentage: 40.0, color: 'bg-green-100 text-green-800' },
                    { category: 'Not Interested', count: 8, percentage: 26.7, color: 'bg-red-100 text-red-800' },
                    { category: 'Follow Up Later', count: 6, percentage: 20.0, color: 'bg-yellow-100 text-yellow-800' },
                    { category: 'Out of Office', count: 4, percentage: 13.3, color: 'bg-blue-100 text-blue-800' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Badge className={item.color}>{item.category}</Badge>
                        <span className="text-sm text-muted-foreground">{item.count} responses</span>
                      </div>
                      <span className="text-sm font-medium">{item.percentage}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="deliverability" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Delivery Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {((totalStats.delivered / totalStats.sent) * 100).toFixed(1)}%
                </div>
                <p className="text-sm text-muted-foreground">
                  {totalStats.delivered} of {totalStats.sent} emails delivered
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Bounce Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`text-3xl font-bold mb-2 ${getPerformanceColor(avgBounceRate, 'bounce')}`}>
                  {avgBounceRate.toFixed(1)}%
                </div>
                <p className="text-sm text-muted-foreground">
                  {totalStats.bounced} bounced emails
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Unsubscribe Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-orange-600 mb-2">
                  {((totalStats.unsubscribed / totalStats.sent) * 100).toFixed(1)}%
                </div>
                <p className="text-sm text-muted-foreground">
                  {totalStats.unsubscribed} unsubscribes
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Deliverability Issues</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="font-medium text-yellow-800">Domain Reputation</span>
                  </div>
                  <p className="text-sm text-yellow-700">
                    Your domain reputation is good but could be improved. Consider warming up new domains gradually.
                  </p>
                </div>
                
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="font-medium text-green-800">SPF/DKIM Setup</span>
                  </div>
                  <p className="text-sm text-green-700">
                    Your email authentication is properly configured.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}