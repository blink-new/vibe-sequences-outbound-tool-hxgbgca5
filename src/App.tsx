import { useState, useEffect } from 'react'
import { blink } from './blink/client'
import { Toaster } from './components/ui/toaster'
import Dashboard from './pages/Dashboard'
import ProspectSearch from './pages/ProspectSearch'
import CampaignBuilder from './pages/CampaignBuilder'
import SequenceEditor from './pages/SequenceEditor'
import Analytics from './pages/Analytics'
import Sidebar from './components/layout/Sidebar'

type Page = 'dashboard' | 'prospects' | 'campaigns' | 'sequences' | 'analytics'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState<Page>('dashboard')

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
      setLoading(state.isLoading)
    })
    return unsubscribe
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading Vibe Sequences...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">Welcome to Vibe Sequences</h1>
          <p className="text-muted-foreground mb-6">AI-powered sales outreach platform for personalized multi-channel campaigns</p>
          <button
            onClick={() => blink.auth.login()}
            className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Sign In to Continue
          </button>
        </div>
      </div>
    )
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'prospects':
        return <ProspectSearch />
      case 'campaigns':
        return <CampaignBuilder />
      case 'sequences':
        return <SequenceEditor />
      case 'analytics':
        return <Analytics />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} user={user} />
      <main className="flex-1 overflow-auto">
        {renderPage()}
      </main>
      <Toaster />
    </div>
  )
}

export default App