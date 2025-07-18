import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Badge } from '../components/ui/badge'
import { Checkbox } from '../components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { 
  Search, 
  Filter, 
  MapPin, 
  Building, 
  Users, 
  Mail,
  Phone,
  Linkedin,
  Plus,
  Download
} from 'lucide-react'

interface Prospect {
  id: string
  name: string
  title: string
  company: string
  location: string
  industry: string
  employees: string
  email: string
  phone?: string
  linkedin?: string
  score: number
}

export default function ProspectSearch() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedProspects, setSelectedProspects] = useState<string[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [prospects, setProspects] = useState<Prospect[]>([
    {
      id: '1',
      name: 'Sarah Chen',
      title: 'VP of Marketing',
      company: 'TechFlow Inc',
      location: 'San Francisco, CA',
      industry: 'SaaS',
      employees: '50-200',
      email: 'sarah.chen@techflow.com',
      phone: '+1 (555) 123-4567',
      linkedin: 'linkedin.com/in/sarahchen',
      score: 92
    },
    {
      id: '2',
      name: 'Michael Rodriguez',
      title: 'Head of Sales',
      company: 'DataSync Solutions',
      location: 'Austin, TX',
      industry: 'Data Analytics',
      employees: '200-500',
      email: 'mrodriguez@datasync.com',
      linkedin: 'linkedin.com/in/michaelrodriguez',
      score: 88
    },
    {
      id: '3',
      name: 'Emily Johnson',
      title: 'Chief Technology Officer',
      company: 'CloudVision',
      location: 'Seattle, WA',
      industry: 'Cloud Computing',
      employees: '500-1000',
      email: 'emily.j@cloudvision.io',
      phone: '+1 (555) 987-6543',
      linkedin: 'linkedin.com/in/emilyjohnson',
      score: 95
    }
  ])

  const handleSearch = async () => {
    setIsSearching(true)
    // Simulate AI-powered search
    setTimeout(() => {
      setIsSearching(false)
    }, 2000)
  }

  const toggleProspectSelection = (prospectId: string) => {
    setSelectedProspects(prev => 
      prev.includes(prospectId) 
        ? prev.filter(id => id !== prospectId)
        : [...prev, prospectId]
    )
  }

  const selectAllProspects = () => {
    setSelectedProspects(prospects.map(p => p.id))
  }

  const clearSelection = () => {
    setSelectedProspects([])
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'bg-green-100 text-green-800'
    if (score >= 80) return 'bg-blue-100 text-blue-800'
    if (score >= 70) return 'bg-yellow-100 text-yellow-800'
    return 'bg-red-100 text-red-800'
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Prospect Search</h1>
        <p className="text-muted-foreground">Find and qualify your ideal prospects with AI-powered search</p>
      </div>

      {/* Search Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Search className="w-5 h-5 mr-2" />
            AI-Powered Prospect Discovery
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex space-x-4">
              <div className="flex-1">
                <Input
                  placeholder="Describe your ideal prospect (e.g., 'VP of Marketing at SaaS companies with 50-200 employees in California')"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="text-base"
                />
              </div>
              <Button onClick={handleSearch} disabled={isSearching} className="px-8">
                {isSearching ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                ) : (
                  <Search className="w-4 h-4 mr-2" />
                )}
                {isSearching ? 'Searching...' : 'Search'}
              </Button>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4">
              <Select>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="saas">SaaS</SelectItem>
                  <SelectItem value="fintech">Fintech</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="ecommerce">E-commerce</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Company Size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-10">1-10 employees</SelectItem>
                  <SelectItem value="11-50">11-50 employees</SelectItem>
                  <SelectItem value="51-200">51-200 employees</SelectItem>
                  <SelectItem value="201-500">201-500 employees</SelectItem>
                  <SelectItem value="500+">500+ employees</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="ca">Canada</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="eu">Europe</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Search Results</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {prospects.length} prospects found • {selectedProspects.length} selected
            </p>
          </div>
          <div className="flex space-x-2">
            {selectedProspects.length > 0 && (
              <>
                <Button variant="outline" onClick={clearSelection}>
                  Clear Selection
                </Button>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add to Campaign ({selectedProspects.length})
                </Button>
              </>
            )}
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Select All */}
            <div className="flex items-center space-x-2 pb-4 border-b border-border">
              <Checkbox
                checked={selectedProspects.length === prospects.length}
                onCheckedChange={(checked) => {
                  if (checked) {
                    selectAllProspects()
                  } else {
                    clearSelection()
                  }
                }}
              />
              <span className="text-sm font-medium">Select All</span>
            </div>

            {/* Prospect List */}
            {prospects.map((prospect) => (
              <div key={prospect.id} className="flex items-center space-x-4 p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                <Checkbox
                  checked={selectedProspects.includes(prospect.id)}
                  onCheckedChange={() => toggleProspectSelection(prospect.id)}
                />
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-foreground">{prospect.name}</h3>
                      <p className="text-sm text-muted-foreground">{prospect.title}</p>
                    </div>
                    <Badge className={getScoreColor(prospect.score)}>
                      {prospect.score}% match
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center text-muted-foreground">
                      <Building className="w-4 h-4 mr-2" />
                      <div>
                        <p className="font-medium text-foreground">{prospect.company}</p>
                        <p>{prospect.industry}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-muted-foreground">
                      <MapPin className="w-4 h-4 mr-2" />
                      <div>
                        <p className="font-medium text-foreground">{prospect.location}</p>
                        <p>{prospect.employees} employees</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-muted-foreground">
                      <Mail className="w-4 h-4 mr-2" />
                      <div>
                        <p className="font-medium text-foreground">{prospect.email}</p>
                        {prospect.phone && <p>{prospect.phone}</p>}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {prospect.linkedin && (
                        <Button variant="ghost" size="sm">
                          <Linkedin className="w-4 h-4" />
                        </Button>
                      )}
                      {prospect.phone && (
                        <Button variant="ghost" size="sm">
                          <Phone className="w-4 h-4" />
                        </Button>
                      )}
                      <Button variant="ghost" size="sm">
                        <Mail className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {prospects.length === 0 && (
              <div className="text-center py-12">
                <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No prospects found</h3>
                <p className="text-muted-foreground mb-4">Try adjusting your search criteria or filters</p>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}