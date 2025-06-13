export default function Shipments() {
  const [searchTerm, setSearchTerm] = useState('')
  const [isNewShipmentOpen, setIsNewShipmentOpen] = useState(false)

  const shipments = [
    {
      id: 'ENV001',
      customer: 'Tech Solutions Ltd',
      origin: 'São Paulo, SP',
      destination: 'Rio de Janeiro, RJ',
      status: 'Em Trânsito',
      weight: '2,5 kg',
      value: 'R$ 850,00',
      createdAt: '10/01/2024',
      estimatedDelivery: '15/01/2024',
      trackingCode: 'TRK123456789'
    },
    {
      id: 'ENV002',
      customer: 'Comercial ABC',
      origin: 'Belo Horizonte, MG',
      destination: 'Salvador, BA',
      status: 'Saiu para Entrega',
      weight: '5,0 kg',
      value: 'R$ 1.200,00',
      createdAt: '11/01/2024',
      estimatedDelivery: '14/01/2024',
      trackingCode: 'TRK987654321'
    },
    {
      id: 'ENV003',
      customer: 'Indústria XYZ',
      origin: 'Porto Alegre, RS',
      destination: 'Curitiba, PR',
      status: 'No Centro de Distribuição',
      weight: '8,3 kg',
      value: 'R$ 2.100,00',
      createdAt: '12/01/2024',
      estimatedDelivery: '16/01/2024',
      trackingCode: 'TRK456789123'
    },
    {
      id: 'ENV004',
      customer: 'Varejo 123',
      origin: 'Fortaleza, CE',
      destination: 'Recife, PE',
      status: 'Entregue',
      weight: '1,2 kg',
      value: 'R$ 350,00',
      createdAt: '08/01/2024',
      estimatedDelivery: '12/01/2024',
      trackingCode: 'TRK789123456'
    },
    {
      id: 'ENV005',
      customer: 'Startup Innovation',
      origin: 'Brasília, DF',
      destination: 'Goiânia, GO',
      status: 'Coletado',
      weight: '3,7 kg',
      value: 'R$ 950,00',
      createdAt: '13/01/2024',
      estimatedDelivery: '18/01/2024',
      trackingCode: 'TRK321654987'
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
      case 'Coletado':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredShipments = shipments.filter(shipment =>
    shipment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shipment.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shipment.destination.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-8">
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Envios</h1>
          <p className="text-gray-600 mt-2">Gerencie todos os envios e suas informações</p>
        </div>
        
        <Dialog open={isNewShipmentOpen} onOpenChange={setIsNewShipmentOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Novo Envio
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Criar Novo Envio</DialogTitle>
              <DialogDescription>
                Preencha as informações do novo envio
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="customer">Cliente</Label>
                  <Input id="customer" placeholder="Nome do cliente" />
                </div>
                <div>
                  <Label htmlFor="weight">Peso (kg)</Label>
                  <Input id="weight" type="number" placeholder="0,0" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="origin">Origem</Label>
                  <Input id="origin" placeholder="Cidade, Estado" />
                </div>
                <div>
                  <Label htmlFor="destination">Destino</Label>
                  <Input id="destination" placeholder="Cidade, Estado" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="value">Valor</Label>
                  <Input id="value" placeholder="R$ 0,00" />
                </div>
                <div>
                  <Label htmlFor="priority">Prioridade</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a prioridade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="express">Express</SelectItem>
                      <SelectItem value="urgent">Urgente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="description">Descrição</Label>
                <Textarea id="description" placeholder="Descrição dos itens..." />
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsNewShipmentOpen(false)}>
                Cancelar
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setIsNewShipmentOpen(false)}>
                Criar Envio
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filtros e Busca */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar por ID, cliente ou destino..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabela de Envios */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Lista de Envios
          </CardTitle>
          <CardDescription>
            {filteredShipments.length} envio(s) encontrado(s)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Rota</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Peso</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Entrega Prevista</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredShipments.map((shipment) => (
                  <TableRow key={shipment.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{shipment.id}</TableCell>
                    <TableCell>{shipment.customer}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <MapPin className="h-3 w-3 text-gray-400" />
                        {shipment.origin} → {shipment.destination}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(shipment.status)} variant="secondary">
                        {shipment.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{shipment.weight}</TableCell>
                    <TableCell>{shipment.value}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <Calendar className="h-3 w-3 text-gray-400" />
                        {shipment.estimatedDelivery}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}