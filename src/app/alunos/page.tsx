"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Users, Search, Plus, Eye, Edit, Mail, Phone, Calendar, Filter } from "lucide-react"
import { alunos, professores } from "@/lib/data"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

export default function AlunosPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [planoFilter, setPlanoFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("")

  const filteredAlunos = alunos.filter(aluno => {
    const matchesSearch = searchTerm === "" || 
      aluno.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      aluno.email.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesPlano = planoFilter === "" || aluno.plano === planoFilter
    const matchesStatus = statusFilter === "" || aluno.status === statusFilter
    
    return matchesSearch && matchesPlano && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ativo":
        return "bg-green-100 text-green-800"
      case "inativo":
        return "bg-gray-100 text-gray-800"
      case "pendente":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "ativo":
        return "Ativo"
      case "inativo":
        return "Inativo"
      case "pendente":
        return "Pendente"
      default:
        return status
    }
  }

  const handleViewAluno = (alunoId: string) => {
    // Implementar visualização do aluno
    console.log("Visualizar aluno:", alunoId)
  }

  const handleEditAluno = (alunoId: string) => {
    // Implementar edição do aluno
    console.log("Editar aluno:", alunoId)
  }

  const handleNewAluno = () => {
    // Implementar criação de novo aluno
    console.log("Novo aluno")
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Alunos</h1>
            <p className="text-gray-600">
              Gerencie o cadastro de alunos da academia
            </p>
          </div>
          <Button onClick={handleNewAluno} className="w-full sm:w-auto">
            <Plus className="w-4 h-4 mr-2" />
            Novo Aluno
          </Button>
        </div>

        {/* Filtros */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Buscar por nome ou email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={planoFilter}
                onChange={(e) => setPlanoFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Todos os planos</option>
                <option value="mensal">Mensal</option>
                <option value="trimestral">Trimestral</option>
                <option value="semestral">Semestral</option>
                <option value="anual">Anual</option>
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Todos os status</option>
                <option value="ativo">Ativo</option>
                <option value="inativo">Inativo</option>
                <option value="pendente">Pendente</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Lista de Alunos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAlunos.map((aluno) => (
            <Card key={aluno.id} className="hover:shadow-lg transition-all duration-200 card-hover">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{aluno.nome}</CardTitle>
                    <CardDescription className="mt-1">
                      {aluno.email}
                    </CardDescription>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(aluno.status)}`}>
                    {getStatusText(aluno.status)}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Informações de contato */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span>{aluno.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span>{aluno.telefone}</span>
                  </div>
                </div>

                {/* Informações do plano */}
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 capitalize">
                      {aluno.plano}
                    </p>
                    <p className="text-xs text-gray-600">
                      Válido até {format(aluno.dataVencimento, "dd/MM/yyyy", { locale: ptBR })}
                    </p>
                  </div>
                </div>

                {/* Estatísticas */}
                <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                  <div>
                    <p className="text-xs text-gray-600">Aulas Realizadas</p>
                    <p className="font-medium text-gray-900">{aluno.aulasRealizadas}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Treinos Ativos</p>
                    <p className="font-medium text-gray-900">{aluno.treinosAtivos}</p>
                  </div>
                </div>

                {/* Ações */}
                <div className="flex space-x-2 pt-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 button-hover"
                    onClick={() => handleViewAluno(aluno.id)}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Visualizar
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 button-hover"
                    onClick={() => handleEditAluno(aluno.id)}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Editar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Estado vazio */}
        {filteredAlunos.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Nenhum aluno encontrado
              </h3>
              <p className="text-gray-600">
                {searchTerm || planoFilter || statusFilter 
                  ? "Tente ajustar os filtros de busca"
                  : "Comece cadastrando o primeiro aluno"
                }
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
