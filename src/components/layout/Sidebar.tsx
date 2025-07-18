import { 
  BarChart3, 
  Mail, 
  Search, 
  Zap, 
  Users, 
  LogOut,
  Home
} from 'lucide-react'
import { blink } from '../../blink/client'

type Page = 'dashboard' | 'prospects' | 'campaigns' | 'sequences' | 'analytics'

interface SidebarProps {
  currentPage: Page
  onPageChange: (page: Page) => void
  user: any
}

const navigation = [
  { id: 'dashboard', name: 'Dashboard', icon: Home },
  { id: 'prospects', name: 'Prospect Search', icon: Search },
  { id: 'campaigns', name: 'Campaigns', icon: Mail },
  { id: 'sequences', name: 'Sequences', icon: Zap },
  { id: 'analytics', name: 'Analytics', icon: BarChart3 },
]

export default function Sidebar({ currentPage, onPageChange, user }: SidebarProps) {
  return (
    <div className="w-64 bg-card border-r border-border flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-bold text-lg text-foreground">Vibe Sequences</h1>
            <p className="text-xs text-muted-foreground">AI Sales Outreach</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon
          const isActive = currentPage === item.id
          
          return (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id as Page)}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.name}</span>
            </button>
          )
        })}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
            <Users className="w-4 h-4 text-accent-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">
              {user?.email || 'User'}
            </p>
            <p className="text-xs text-muted-foreground">Sales Rep</p>
          </div>
        </div>
        
        <button
          onClick={() => blink.auth.logout()}
          className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  )
}