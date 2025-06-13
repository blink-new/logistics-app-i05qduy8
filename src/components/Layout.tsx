import { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button } from './ui/button'
import { 
  Truck, 
  Package, 
  MapPin, 
  Users, 
  BarChart3, 
  Menu,
  Bell
} from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'

interface LayoutProps {
  children: ReactNode
}

const navigation = [
  { name: 'Dashboard', href: '/', icon: BarChart3 },
  { name: 'Envios', href: '/shipments', icon: Package },
  { name: 'Rastreamento', href: '/tracking', icon: MapPin },
  { name: 'Frota', href: '/fleet', icon: Truck },
  { name: 'Clientes', href: '/customers', icon: Users },
]

export default function Layout({ children }: LayoutProps) {
  const location = useLocation()

  const NavItems = () => (
    <>
      {navigation.map((item) => {
        const Icon = item.icon
        const isActive = location.pathname === item.href
        return (
          <Link key={item.name} to={item.href}>
            <Button
              variant={isActive ? "default" : "ghost"}
              className={`w-full justify-start gap-3 h-12 text-sm font-medium ${
                isActive ? 'bg-blue-600 text-white' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <Icon className="h-5 w-5" />
              {item.name}
            </Button>
          </Link>
        )
      })}
    </>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
          <div className="flex h-16 shrink-0 items-center">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 rounded-lg p-2">
                <Truck className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">LogiTrack</h1>
                <p className="text-xs text-gray-500">Sistema de Logística</p>
              </div>
            </div>
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-2">
              <li>
                <div className="space-y-1">
                  <NavItems />
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Mobile navigation */}
      <div className="lg:hidden">
        <div className="flex items-center justify-between bg-white px-4 py-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 rounded-lg p-2">
              <Truck className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-lg font-bold text-gray-900">LogiTrack</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72">
                <div className="flex h-16 shrink-0 items-center">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-600 rounded-lg p-2">
                      <Truck className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h1 className="text-xl font-bold text-gray-900">LogiTrack</h1>
                      <p className="text-xs text-gray-500">Sistema de Logística</p>
                    </div>
                  </div>
                </div>
                <nav className="flex flex-1 flex-col mt-8">
                  <div className="space-y-1">
                    <NavItems />
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-72">
        <div className="hidden lg:flex lg:h-16 lg:items-center lg:justify-between lg:border-b lg:border-gray-200 lg:bg-white lg:px-8">
          <div />
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <div className="h-6 w-px bg-gray-200" />
            <div className="text-sm">
              <p className="font-medium text-gray-900">Admin</p>
              <p className="text-gray-500">admin@logitrack.com</p>
            </div>
          </div>
        </div>
        
        <main className="py-6 lg:py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}