export default function Tracking() {
  const [trackingCode, setTrackingCode] = useState('')
  const [searchedShipment, setSearchedShipment] = useState<typeof sampleShipment | null>(null)

  const sampleShipment = {
    id: 'ENV001',
    trackingCode: 'TRK123456789',
    customer: 'Tech Solutions Ltd',
    origin: 'São Paulo, SP',
    destination: 'Rio de Janeiro, RJ',
    status: 'Em Trânsito',
    progress: 75,
    estimatedDelivery: '15/01/2024',
    timeline: [
      {
        status: 'Pedido Criado',
        location: 'Sistema',
        timestamp: '10/01/2024 08:30',
        completed: true,
        icon: Package
      },
      {
        status: 'Coletado',
        location: 'São Paulo, SP - Centro de Distribuição',
        timestamp: '10/01/2024 14:20',
        completed: true,
        icon: Package
      },
      {
        status: 'Em Trânsito',
        location: 'Rod. Presidente Dutra, Km 185',
        timestamp: '11/01/2024 09:15',
        completed: true,
        icon: Truck
      },
      {
        status: 'Centro de Distribuição',
        location: 'Rio de Janeiro, RJ - CD Norte',
        timestamp: '12/01/2024 16:45',
        completed: true,
        icon: MapPin
      },
      {
        status: 'Saiu para Entrega',
        location: 'Rio de Janeiro, RJ',
        timestamp: 'Estimado: 15/01/2024 08:00',
        completed: false,
        icon: Truck
      },
      {
        status: 'Entregue',
        location: 'Rio de Janeiro, RJ',
        timestamp: 'Estimado: 15/01/2024 17:00',
        completed: false,
        icon: CheckCircle
      }
    ]
  }

  const handleSearch = () => {
    // Simula busca - em app real, chamaria API
    if (trackingCode.toLowerCase().includes('trk') || trackingCode.toLowerCase().includes('env')) {
      setSearchedShipment(sampleShipment)
    } else {
      setSearchedShipment(null)
    }
  }

  const recentTracking = [
    {
      id: 'ENV001',
      customer: 'Tech Solutions Ltd',
      destination: 'Rio de Janeiro, RJ',
      status: 'Em Trânsito',
      progress: 75
    },
    {
      id: 'ENV002',
      customer: 'Comercial ABC',
      destination: 'Salvador, BA',
      status: 'Saiu para Entrega',
      progress: 90
    },
    {
      id: 'ENV003',
      customer: 'Indústria XYZ',
      destination: 'Curitiba, PR',
      status: 'No Centro de Distribuição',
      progress: 50
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
      case 'Entregue':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-8">
      {/* Cabeçalho */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Rastreamento</h1>
        <p className="text-gray-600 mt-2">Acompanhe seus envios em tempo real</p>
      </div>

      {/* Seção de Busca */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-900">
            <Search className="h-5 w-5" />
            Rastrear Envio
          </CardTitle>
          <CardDescription className="text-blue-700">
            Digite o código de rastreamento ou ID do envio
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="Ex: TRK123456789 ou ENV001"
                value={trackingCode}
                onChange={(e) => setTrackingCode(e.target.value)}
                className="bg-white border-blue-200 focus:border-blue-400"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <Button onClick={handleSearch} className="bg-blue-600 hover:bg-blue-700">
              <Search className="h-4 w-4 mr-2" />
              Rastrear
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Resultados da Busca */}
      {searchedShipment && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Informações do Envio */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Informações do Envio
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">ID do Envio</label>
                  <p className="text-lg font-semibold">{searchedShipment.id}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Código de Rastreamento</label>
                  <p className="text-sm font-mono bg-gray-100 p-2 rounded">{searchedShipment.trackingCode}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Cliente</label>
                  <p className="font-medium">{searchedShipment.customer}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Origem</label>
                  <p>{searchedShipment.origin}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Destino</label>
                  <p>{searchedShipment.destination}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Status Atual</label>
                  <Badge className={getStatusColor(searchedShipment.status)} variant="secondary">
                    {searchedShipment.status}
                  </Badge>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 block mb-2">Progresso</label>
                  <Progress value={searchedShipment.progress} className="h-3" />
                  <p className="text-sm text-gray-600 mt-1">{searchedShipment.progress}% concluído</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Entrega Estimada</label>
                  <p className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-gray-400" />
                    {searchedShipment.estimatedDelivery}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Linha do Tempo */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Histórico de Rastreamento
                </CardTitle>
                <CardDescription>
                  Acompanhe o progresso do seu envio
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {searchedShipment.timeline.map((event, index: number) => {
                    const Icon = event.icon
                    const isLast = index === searchedShipment.timeline.length - 1
                    return (
                      <div key={index} className="relative flex gap-4">
                        {!isLast && (
                          <div className={`absolute left-6 top-12 w-0.5 h-6 ${
                            event.completed ? 'bg-green-200' : 'bg-gray-200'
                          }`} />
                        )}
                        <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                          event.completed 
                            ? 'bg-green-100 text-green-600' 
                            : 'bg-gray-100 text-gray-400'
                        }`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className={`font-medium ${
                              event.completed ? 'text-gray-900' : 'text-gray-500'
                            }`}>
                              {event.status}
                            </h4>
                            {event.completed && (
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            )}
                          </div>
                          <p className={`text-sm mt-1 ${
                            event.completed ? 'text-gray-600' : 'text-gray-400'
                          }`}>
                            {event.location}
                          </p>
                          <p className={`text-xs mt-1 ${
                            event.completed ? 'text-gray-500' : 'text-gray-400'
                          }`}>
                            {event.timestamp}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {trackingCode && !searchedShipment && (
        <Card>
          <CardContent className="py-8">
            <div className="text-center">
              <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Envio não encontrado</h3>
              <p className="text-gray-600">
                Verifique se o código de rastreamento está correto e tente novamente.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Rastreamentos Recentes */}
      <Card>
        <CardHeader>
          <CardTitle>Rastreamentos Recentes</CardTitle>
          <CardDescription>
            Envios acompanhados recentemente
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recentTracking.map((item) => (
              <div key={item.id} className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold">{item.id}</span>
                  <Badge className={getStatusColor(item.status)} variant="secondary">
                    {item.status}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-3">{item.customer}</p>
                <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
                  <MapPin className="h-3 w-3" />
                  {item.destination}
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Progresso</span>
                    <span className="font-medium">{item.progress}%</span>
                  </div>
                  <Progress value={item.progress} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}