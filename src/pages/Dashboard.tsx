import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { 
  Package, 
  Truck, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  TrendingUp,
  Users,
  MapPin
} from 'lucide-react'

export default function Dashboard() {
  const stats = [
    {
      title: 'Total de Envios',
      value: '1,247',
      change: '+12%',
      changeType: 'positive',
      icon: Package,
      color: 'blue'
    },
    {
      title: 'Em Trânsito',
      value: '89',
      change: '+3%',
      changeType: 'positive',
      icon: Truck,
      color: 'orange'
    },
    {
      title: 'Entregues Hoje',
      value: '156',
      change: '+8%',
      changeType: 'positive',
      icon: CheckCircle,
      color: 'green'
    },
    {
      title: 'Pendentes',
      value: '23',
      change: '-15%',
      changeType: 'negative',
      icon: Clock,
      color: 'yellow'
    }
  ]

  const recentShipments = [
    {
      id: 'ENV001',
      customer: 'Tech Solutions Ltd',
      destination: 'São Paulo, SP',
      status: 'Em Trânsito',
      progress: 75,
      estimatedDelivery: '2024-01-15'
    },
    {
      id: 'ENV002',
      customer: 'Comercial ABC',
      destination: 'Rio de Janeiro, RJ',
      status: 'Saiu para Entrega',
      progress: 90,
      estimatedDelivery: '2024-01-14'
    },
    {
      id: 'ENV003',
      customer: 'Indústria XYZ',
      destination: 'Belo Horizonte, MG',
      status: 'No Centro de Distribuição',
      progress: 50,
      estimatedDelivery: '2024-01-16'
    },
    {
      id: 'ENV004',
      customer: 'Varejo 123',
      destination: 'Porto Alegre, RS',
      status: 'Coletado',
      progress: 25,
      estimatedDelivery: '2024-01-18'
    }
  ]

  const alerts = [
    {
      type: 'warning',
      message: 'Atraso na rota SP-RJ devido ao tráfego intenso',
      time: '5 min atrás'
    },
    {
      type: 'info',
      message: 'Nova remessa coletada em Centro de Distribuição Norte',
      time: '15 min atrás'
    },
    {
      type: 'success',
      message: '47 entregas concluídas com sucesso hoje',
      time: '1 hora atrás'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Em Trânsito':
        return 'bg-blue-100 text-blue-800'
      case 'Saiu para Entrega':
        return 'bg-orange-100 text-orange-800'
      case 'No Centro de Distribuição':
        return 'bg-purple-100 text-purple-800'
      case 'Coletado':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Visão geral das operações logísticas</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title} className="relative overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg bg-${stat.color}-100`}>
                  <Icon className={`h-4 w-4 text-${stat.color}-600`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <p className={`text-xs ${
                  stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                } flex items-center gap-1 mt-1`}>
                  <TrendingUp className="h-3 w-3" />
                  {stat.change} vs mês anterior
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Shipments */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Envios Recentes
              </CardTitle>
              <CardDescription>
                Acompanhe os envios mais recentes em tempo real
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentShipments.map((shipment) => (
                  <div key={shipment.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-3">
                          <span className="font-semibold text-gray-900">{shipment.id}</span>
                          <Badge className={getStatusColor(shipment.status)} variant="secondary">
                            {shipment.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{shipment.customer}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <MapPin className="h-3 w-3" />
                          {shipment.destination}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          Entrega: {shipment.estimatedDelivery}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Progresso</span>
                        <span className="font-medium">{shipment.progress}%</span>
                      </div>
                      <Progress value={shipment.progress} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <Button variant="outline" className="w-full">
                  Ver Todos os Envios
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alerts and Quick Actions */}
        <div className="space-y-6">
          {/* Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Alertas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {alerts.map((alert, index) => (
                  <div key={index} className="flex gap-3 p-3 rounded-lg bg-gray-50">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      alert.type === 'warning' ? 'bg-yellow-400' :
                      alert.type === 'info' ? 'bg-blue-400' : 'bg-green-400'
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{alert.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Ações Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start gap-3" variant="outline">
                <Package className="h-4 w-4" />
                Novo Envio
              </Button>
              <Button className="w-full justify-start gap-3" variant="outline">
                <Truck className="h-4 w-4" />
                Gerenciar Frota
              </Button>
              <Button className="w-full justify-start gap-3" variant="outline">
                <Users className="h-4 w-4" />
                Adicionar Cliente
              </Button>
              <Button className="w-full justify-start gap-3" variant="outline">
                <MapPin className="h-4 w-4" />
                Rastrear Envio
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}