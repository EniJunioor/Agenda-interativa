"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dumbbell, Search, Plus, Eye, Edit, Filter } from "lucide-react"
import { treinos, alunos, professores } from "@/lib/data"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

export default function TreinosPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("")

  const filteredTreinos = treinos.filter(treino => {
    const aluno = alunos.find(a => a.id === treino.alunoId)
    const professor = professores.find(p => p.id === treino.professorId)
    
    const matchesSearch = searchTerm === "" || 
      treino.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      aluno?.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      professor?.nome.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === "" || treino.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ativo":
        return "bg-green-100 text-green-800"
      case "inativo":
        return "bg-gray-100 text-gray-800"
      case "concluido":
        return "bg-blue-100 text-blue-800"
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
      case "concluido":
        return "Concluído"
      default:
        return status
    }
  }

  const handleViewTreino = (treinoId: string) => {
    // Implementar visualização do treino
    console.log("Visualizar treino:", treinoId)
    alert(`Visualizando treino: ${treinoId}`)
  }

  const handleEditTreino = (treinoId: string) => {
    // Implementar edição do treino
    console.log("Editar treino:", treinoId)
    alert(`Editando treino: ${treinoId}`)
  }

  const handleNewTreino = () => {
    // Implementar criação de novo treino
    console.log("Novo treino")
    alert("Criando novo treino...")
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Treinos</h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Gerencie as fichas de treino dos alunos
            </p>
          </div>
          <Button onClick={handleNewTreino} className="w-full sm:w-auto button-hover">
            <Plus className="w-4 h-4 mr-2" />
            Novo Treino
          </Button>
        </div>

        {/* Filtros */}
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Buscar por nome do treino, aluno ou professor..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="">Todos os status</option>
                <option value="ativo">Ativo</option>
                <option value="inativo">Inativo</option>
                <option value="concluido">Concluído</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Lista de Treinos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredTreinos.map((treino) => {
            const aluno = alunos.find(a => a.id === treino.alunoId)
            const professor = professores.find(p => p.id === treino.professorId)
            
            return (
              <Card key={treino.id} className="hover:shadow-lg transition-all duration-200 card-hover">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-lg truncate">{treino.nome}</CardTitle>
                      <CardDescription className="mt-1 text-sm truncate">
                        {treino.descricao}
                      </CardDescription>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(treino.status)} flex-shrink-0`}>
                      {getStatusText(treino.status)}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Informações do Aluno */}
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 font-medium text-sm">
                        {aluno?.nome?.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 text-sm sm:text-base truncate">{aluno?.nome}</p>
                      <p className="text-xs sm:text-sm text-gray-600 capitalize">{aluno?.plano}</p>
                    </div>
                  </div>

                  {/* Informações do Professor */}
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-green-600 font-medium text-xs">
                        {professor?.nome?.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">{professor?.nome}</p>
                      <p className="text-xs text-gray-600">Professor</p>
                    </div>
                  </div>

                  {/* Estatísticas do Treino */}
                  <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                    <div>
                      <p className="text-xs text-gray-600">Exercícios</p>
                      <p className="font-medium text-gray-900 text-sm sm:text-base">{treino.exercicios.length}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Última Atualização</p>
                      <p className="font-medium text-gray-900 text-sm sm:text-base">
                        {format(treino.dataAtualizacao, "dd/MM", { locale: ptBR })}
                      </p>
                    </div>
                  </div>

                  {/* Ações */}
                  <div className="flex space-x-2 pt-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 button-hover"
                      onClick={() => handleViewTreino(treino.id)}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Visualizar
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 button-hover"
                      onClick={() => handleEditTreino(treino.id)}
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Editar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Estado vazio */}
        {filteredTreinos.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Dumbbell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Nenhum treino encontrado
              </h3>
              <p className="text-gray-600">
                {searchTerm || statusFilter 
                  ? "Tente ajustar os filtros de busca"
                  : "Comece criando o primeiro treino"
                }
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
