import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Textarea } from '../components/ui/textarea'
import { Badge } from '../components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { 
  Plus, 
  Mail, 
  MessageSquare, 
  Clock, 
  Users,
  Sparkles,
  ArrowRight,
  Settings,
  Play
} from 'lucide-react'

interface CampaignStep {
  id: string
  type: 'email' | 'sms' | 'linkedin'
  delay: number
  delayUnit: 'hours' | 'days'
  subject?: string
  content: string
  conditions?: string[]
}

export default function CampaignBuilder() {
  const [campaignName, setCampaignName] = useState('')
  const [campaignDescription, setCampaignDescription] = useState('')
  const [productInfo, setProductInfo] = useState('')
  const [instructions, setInstructions] = useState('')
  const [steps, setSteps] = useState<CampaignStep[]>([
    {
      id: '1',
      type: 'email',
      delay: 0,
      delayUnit: 'days',
      subject: 'Introduction to {{company_name}}',
      content: 'Hi {{first_name}},\n\nI noticed {{company_name}} is growing rapidly in the {{industry}} space...',
      conditions: []
    }
  ])

  const addStep = () => {
    const newStep: CampaignStep = {
      id: Date.now().toString(),
      type: 'email',
      delay: 3,
      delayUnit: 'days',
      subject: '',
      content: '',
      conditions: []
    }
    setSteps([...steps, newStep])
  }

  const updateStep = (stepId: string, updates: Partial<CampaignStep>) => {
    setSteps(steps.map(step => 
      step.id === stepId ? { ...step, ...updates } : step
    ))
  }

  const removeStep = (stepId: string) => {
    setSteps(steps.filter(step => step.id !== stepId))
  }

  const generateAIContent = async (stepId: string) => {
    const step = steps.find(s => s.id === stepId)
    if (!step) return

    // Simulate AI content generation
    const aiContent = step.type === 'email' 
      ? `Hi {{first_name}},

I hope this email finds you well. I've been following {{company_name}}'s impressive growth in the {{industry}} sector, and I'm particularly intrigued by your recent {{recent_news}}.

${productInfo ? `I wanted to reach out because ${productInfo.toLowerCase()} could be a perfect fit for your current initiatives.` : 'I believe we could help accelerate your growth with our solution.'}

Would you be open to a brief 15-minute conversation next week to explore how we might be able to support {{company_name}}'s goals?

Best regards,
{{sender_name}}`
      : `Hi {{first_name}}, following up on my email about helping {{company_name}} with ${productInfo ? productInfo.toLowerCase() : 'your growth goals'}. Quick 15-min chat this week? - {{sender_name}}`

    updateStep(stepId, { 
      content: aiContent,
      subject: step.type === 'email' ? `Quick question about {{company_name}}'s ${productInfo ? productInfo.split(' ')[0].toLowerCase() : 'growth'} strategy` : undefined
    })
  }

  const getStepIcon = (type: string) => {
    switch (type) {
      case 'email': return <Mail className="w-4 h-4" />
      case 'sms': return <MessageSquare className="w-4 h-4" />
      case 'linkedin': return <Users className="w-4 h-4" />
      default: return <Mail className="w-4 h-4" />
    }
  }

  const getStepColor = (type: string) => {
    switch (type) {
      case 'email': return 'bg-blue-100 text-blue-800'
      case 'sms': return 'bg-green-100 text-green-800'
      case 'linkedin': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Campaign Builder</h1>
        <p className="text-muted-foreground">Create personalized multi-channel outreach sequences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Campaign Setup */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Campaign Setup</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Campaign Name</label>
                <Input
                  placeholder="Q1 SaaS Outreach"
                  value={campaignName}
                  onChange={(e) => setCampaignName(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Description</label>
                <Textarea
                  placeholder="Target SaaS companies for our new analytics platform..."
                  value={campaignDescription}
                  onChange={(e) => setCampaignDescription(e.target.value)}
                  rows={3}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Product/Service Info</label>
                <Textarea
                  placeholder="Describe what you're selling, key benefits, pricing, etc."
                  value={productInfo}
                  onChange={(e) => setProductInfo(e.target.value)}
                  rows={4}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Campaign Instructions</label>
                <Textarea
                  placeholder="First stage should be an email, second stage should be SMS if we have phone number, focus on pain points around data analytics..."
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Personalization Variables</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{{first_name}}</span>
                  <span className="text-foreground">Prospect's first name</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{{company_name}}</span>
                  <span className="text-foreground">Company name</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{{industry}}</span>
                  <span className="text-foreground">Company industry</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{{recent_news}}</span>
                  <span className="text-foreground">Recent company news</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{{sender_name}}</span>
                  <span className="text-foreground">Your name</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sequence Builder */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Sequence Steps</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Build your multi-channel outreach sequence
                </p>
              </div>
              <Button onClick={addStep}>
                <Plus className="w-4 h-4 mr-2" />
                Add Step
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {steps.map((step, index) => (
                  <div key={step.id} className="relative">
                    {/* Connection Line */}
                    {index < steps.length - 1 && (
                      <div className="absolute left-6 top-16 w-0.5 h-8 bg-border"></div>
                    )}
                    
                    <div className="flex items-start space-x-4">
                      {/* Step Number */}
                      <div className="flex-shrink-0 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">
                        {index + 1}
                      </div>

                      {/* Step Content */}
                      <div className="flex-1 space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Badge className={getStepColor(step.type)}>
                              {getStepIcon(step.type)}
                              <span className="ml-1 capitalize">{step.type}</span>
                            </Badge>
                            
                            {index > 0 && (
                              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                <Clock className="w-4 h-4" />
                                <span>Wait {step.delay} {step.delayUnit}</span>
                              </div>
                            )}
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => generateAIContent(step.id)}
                            >
                              <Sparkles className="w-4 h-4 mr-1" />
                              AI Generate
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeStep(step.id)}
                            >
                              Remove
                            </Button>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <Select value={step.type} onValueChange={(value) => updateStep(step.id, { type: value as any })}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="email">Email</SelectItem>
                              <SelectItem value="sms">SMS</SelectItem>
                              <SelectItem value="linkedin">LinkedIn</SelectItem>
                            </SelectContent>
                          </Select>

                          {index > 0 && (
                            <>
                              <Input
                                type="number"
                                placeholder="Delay"
                                value={step.delay}
                                onChange={(e) => updateStep(step.id, { delay: parseInt(e.target.value) || 0 })}
                              />
                              <Select value={step.delayUnit} onValueChange={(value) => updateStep(step.id, { delayUnit: value as any })}>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="hours">Hours</SelectItem>
                                  <SelectItem value="days">Days</SelectItem>
                                </SelectContent>
                              </Select>
                            </>
                          )}
                        </div>

                        {step.type === 'email' && (
                          <Input
                            placeholder="Email subject line"
                            value={step.subject || ''}
                            onChange={(e) => updateStep(step.id, { subject: e.target.value })}
                          />
                        )}

                        <Textarea
                          placeholder={`Enter your ${step.type} content here. Use {{variables}} for personalization.`}
                          value={step.content}
                          onChange={(e) => updateStep(step.id, { content: e.target.value })}
                          rows={6}
                          className="font-mono text-sm"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                {/* Action Buttons */}
                <div className="flex justify-between pt-6 border-t border-border">
                  <div className="flex space-x-2">
                    <Button variant="outline">
                      <Settings className="w-4 h-4 mr-2" />
                      Advanced Settings
                    </Button>
                    <Button variant="outline">
                      Save as Template
                    </Button>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button variant="outline">
                      Save Draft
                    </Button>
                    <Button>
                      <Play className="w-4 h-4 mr-2" />
                      Launch Campaign
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}