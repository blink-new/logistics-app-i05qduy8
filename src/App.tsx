import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from "next-themes"
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Shipments from './pages/Shipments'
import Tracking from './pages/Tracking'
import Fleet from './pages/Fleet'
import Customers from './pages/Customers'

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="logistics-app-theme">
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/shipments" element={<Shipments />} />
            <Route path="/tracking" element={<Tracking />} />
            <Route path="/fleet" element={<Fleet />} />
            <Route path="/customers" element={<Customers />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  )
}

export default App