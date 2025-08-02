"use client"

import { useState } from "react"
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  CreditCard,
  Wallet,
  PieChart,
  Calendar,
  Download,
  Filter,
  Eye,
  EyeOff,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DashboardLayout } from "@/components/dashboard/layout"
import { OrganizationSelector } from "@/components/ui/organization-selector"

export default function FinancialPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("30d")
  const [showValues, setShowValues] = useState(true)

  // Mock financial data
  const financialOverview = {
    totalRevenue: 89750.5,
    totalExpenses: 45230.25,
    netProfit: 44520.25,
    profitMargin: 49.6,
    revenueGrowth: 12.5,
    expenseGrowth: 8.3,
    averageTicket: 82.45,
    totalTransactions: 1089,
  }

  const revenueByService = [
    { service: "Corte + Escova", revenue: 25680.0, percentage: 28.6, growth: 15.2 },
    { service: "Coloração", revenue: 18950.0, percentage: 21.1, growth: 8.7 },
    { service: "Tratamento Capilar", revenue: 15420.0, percentage: 17.2, growth: 22.1 },
    { service: "Manicure", revenue: 12340.0, percentage: 13.8, growth: 5.4 },
    { service: "Pedicure", revenue: 9180.0, percentage: 10.2, growth: -2.1 },
    { service: "Outros", revenue: 8180.5, percentage: 9.1, growth: 18.9 },
  ]

  const revenueByUnit = [
    { unit: "Vila Madalena", revenue: 52450.3, percentage: 58.4, growth: 14.2 },
    { unit: "Jardins", revenue: 37300.2, percentage: 41.6, growth: 10.1 },
  ]

  const recentTransactions = [
    {
      id: "1",
      date: "2024-01-18",
      client: "Maria Silva",
      service: "Corte + Escova",
      amount: 85.0,
      method: "Cartão",
      status: "Concluído",
    },
    {
      id: "2",
      date: "2024-01-18",
      client: "João Santos",
      service: "Barba",
      amount: 45.0,
      method: "PIX",
      status: "Concluído",
    },
    {
      id: "3",
      date: "2024-01-18",
      client: "Ana Costa",
      service: "Coloração",
      amount: 180.0,
      method: "Cartão",
      status: "Concluído",
    },
    {
      id: "4",
      date: "2024-01-17",
      client: "Carlos Lima",
      service: "Corte",
      amount: 60.0,
      method: "Dinheiro",
      status: "Concluído",
    },
    {
      id: "5",
      date: "2024-01-17",
      client: "Fernanda Oliveira",
      service: "Tratamento",
      amount: 120.0,
      method: "Cartão",
      status: "Pendente",
    },
  ]

  const formatCurrency = (value: number) => {
    if (!showValues) return "R$ •••••"
    return `R$ ${value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`
  }

  const formatPercentage = (value: number) => {
    return `${value > 0 ? "+" : ""}${value.toFixed(1)}%`
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Financeiro</h1>
            <p className="text-gray-600">Controle financeiro completo do seu negócio</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowValues(!showValues)}
              className="border-gray-300"
            >
              {showValues ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
            </Button>
            <Button variant="outline" className="border-gray-300">
              <Filter className="h-4 w-4 mr-2" />
              Filtros
            </Button>
            <Button className="bg-primary hover:bg-primary/90 text-white">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </div>
        </div>

        {/* Organization Context */}
        <OrganizationSelector />

        {/* Period Selector */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium">Período:</span>
              </div>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Últimos 7 dias</SelectItem>
                  <SelectItem value="30d">Últimos 30 dias</SelectItem>
                  <SelectItem value="90d">Últimos 90 dias</SelectItem>
                  <SelectItem value="1y">Último ano</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Financial Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(financialOverview.totalRevenue)}</div>
              <p className="text-xs text-green-600 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                {formatPercentage(financialOverview.revenueGrowth)} vs período anterior
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Despesas</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(financialOverview.totalExpenses)}</div>
              <p className="text-xs text-red-600 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                {formatPercentage(financialOverview.expenseGrowth)} vs período anterior
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Lucro Líquido</CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{formatCurrency(financialOverview.netProfit)}</div>
              <p className="text-xs text-muted-foreground">Margem: {financialOverview.profitMargin}%</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ticket Médio</CardTitle>
              <PieChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(financialOverview.averageTicket)}</div>
              <p className="text-xs text-muted-foreground">{financialOverview.totalTransactions} transações</p>
            </CardContent>
          </Card>
        </div>

        {/* Financial Details */}
        <Tabs defaultValue="revenue" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="revenue">Receita</TabsTrigger>
            <TabsTrigger value="expenses">Despesas</TabsTrigger>
            <TabsTrigger value="transactions">Transações</TabsTrigger>
            <TabsTrigger value="analysis">Análises</TabsTrigger>
          </TabsList>

          {/* Revenue Tab */}
          <TabsContent value="revenue" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Revenue by Service */}
              <Card>
                <CardHeader>
                  <CardTitle>Receita por Serviço</CardTitle>
                  <CardDescription>Distribuição da receita por tipo de serviço</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {revenueByService.map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{item.service}</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-bold">{formatCurrency(item.revenue)}</span>
                            <Badge
                              variant="outline"
                              className={
                                item.growth > 0 ? "text-green-600 border-green-200" : "text-red-600 border-red-200"
                              }
                            >
                              {formatPercentage(item.growth)}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Progress value={item.percentage} className="flex-1" />
                          <span className="text-xs text-gray-500 w-12">{item.percentage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Revenue by Unit */}
              <Card>
                <CardHeader>
                  <CardTitle>Receita por Unidade</CardTitle>
                  <CardDescription>Performance financeira de cada unidade</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {revenueByUnit.map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{item.unit}</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-bold">{formatCurrency(item.revenue)}</span>
                            <Badge variant="outline" className="text-green-600 border-green-200">
                              {formatPercentage(item.growth)}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Progress value={item.percentage} className="flex-1" />
                          <span className="text-xs text-gray-500 w-12">{item.percentage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Expenses Tab */}
          <TabsContent value="expenses" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Controle de Despesas</CardTitle>
                <CardDescription>Categorização e análise das despesas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <CreditCard className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Módulo de despesas em desenvolvimento</p>
                  <p className="text-sm">Em breve você poderá gerenciar todas as despesas aqui</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Transactions Tab */}
          <TabsContent value="transactions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Transações Recentes</CardTitle>
                <CardDescription>Histórico detalhado de todas as transações</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Data</TableHead>
                      <TableHead>Cliente</TableHead>
                      <TableHead>Serviço</TableHead>
                      <TableHead>Valor</TableHead>
                      <TableHead>Método</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentTransactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell>{new Date(transaction.date).toLocaleDateString("pt-BR")}</TableCell>
                        <TableCell className="font-medium">{transaction.client}</TableCell>
                        <TableCell>{transaction.service}</TableCell>
                        <TableCell className="font-mono">{formatCurrency(transaction.amount)}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{transaction.method}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={transaction.status === "Concluído" ? "default" : "secondary"}>
                            {transaction.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analysis Tab */}
          <TabsContent value="analysis" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Análise de Tendências</CardTitle>
                  <CardDescription>Projeções e insights financeiros</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                        <span className="font-semibold text-green-800">Crescimento Positivo</span>
                      </div>
                      <p className="text-sm text-green-700">
                        Receita cresceu {financialOverview.revenueGrowth}% no período, superando a meta de 10%.
                      </p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <PieChart className="h-4 w-4 text-blue-600" />
                        <span className="font-semibold text-blue-800">Margem Saudável</span>
                      </div>
                      <p className="text-sm text-blue-700">
                        Margem de lucro de {financialOverview.profitMargin}% está acima da média do setor (35-40%).
                      </p>
                    </div>
                    <div className="p-4 bg-yellow-50 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <TrendingDown className="h-4 w-4 text-yellow-600" />
                        <span className="font-semibold text-yellow-800">Atenção</span>
                      </div>
                      <p className="text-sm text-yellow-700">
                        Serviço "Pedicure" apresentou queda de 2.1%. Considere revisar estratégia.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Metas Financeiras</CardTitle>
                  <CardDescription>Acompanhamento das metas mensais</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Meta de Receita</span>
                        <span className="text-sm font-bold">R$ 90.000,00</span>
                      </div>
                      <Progress value={99.7} className="mb-1" />
                      <p className="text-xs text-gray-600">
                        {formatCurrency(financialOverview.totalRevenue)} de R$ 90.000,00 (99.7%)
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Meta de Lucro</span>
                        <span className="text-sm font-bold">R$ 40.000,00</span>
                      </div>
                      <Progress value={111.3} className="mb-1" />
                      <p className="text-xs text-green-600">
                        {formatCurrency(financialOverview.netProfit)} de R$ 40.000,00 (111.3%)
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Meta de Ticket Médio</span>
                        <span className="text-sm font-bold">R$ 80,00</span>
                      </div>
                      <Progress value={103.1} className="mb-1" />
                      <p className="text-xs text-green-600">
                        {formatCurrency(financialOverview.averageTicket)} de R$ 80,00 (103.1%)
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
