"use client"

import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Users, Dumbbell, DollarSign, TrendingUp, Clock } from "lucide-react"
import { aulas, alunos, professores, treinos } from "@/lib/data"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

export default function DashboardPage() {
  const hoje = new Date()
  const aulasHoje = aulas.filter(aula => 
    format(aula.dataHora, 'yyyy-MM-dd') === format(hoje, 'yyyy-MM-dd')
  )
  
  const proximasAulas = aulas
    .filter(aula => aula.dataHora > hoje)
    .sort((a, b) => a.dataHora.getTime() - b.dataHora.getTime())
    .slice(0, 5)

  const stats = [
    {
      title: "Total de Aulas",
      value: aulas.length.toString(),
      icon: Calendar,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Aulas Hoje",
      value: aulasHoje.length.toString(),
      icon: Clock,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Total de Alunos",
      value: alunos.length.toString(),
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Professores",
      value: professores.length.toString(),
      icon: Users,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "Treinos Ativos",
      value: treinos.filter(t => t.status === 'ativo').length.toString(),
      icon: Dumbbell,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
    },
    {
      title: "Receita Mensal",
      value: `R$ ${aulas.reduce((acc, aula) => acc + aula.valorAula, 0).toFixed(2)}`,
      icon: DollarSign,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Bem-vindo de volta! Aqui está um resumo das atividades da academia.
          </p>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-200 card-hover">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">{stat.title}</p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900 truncate">{stat.value}</p>
                  </div>
                  <div className={`p-2 sm:p-3 rounded-lg ${stat.bgColor} flex-shrink-0`}>
                    <stat.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Próximas Aulas */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-lg sm:text-xl">
              <Calendar className="w-5 h-5" />
              <span>Próximas Aulas</span>
            </CardTitle>
            <CardDescription>
              Aulas agendadas para os próximos dias
            </CardDescription>
          </CardHeader>
          <CardContent>
            {proximasAulas.length > 0 ? (
              <div className="space-y-4">
                {proximasAulas.map((aula) => {
                  const professor = professores.find(p => p.id === aula.professorId)
                  return (
                    <div
                      key={aula.id}
                      className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-4 mb-3 sm:mb-0">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 text-sm sm:text-base truncate">
                            {format(aula.dataHora, "EEEE, dd 'de' MMMM", { locale: ptBR })}
                          </p>
                          <p className="text-xs sm:text-sm text-gray-600 truncate">
                            {format(aula.dataHora, "HH:mm")} • {professor?.nome} • {aula.quantidadeAlunos} alunos
                          </p>
                        </div>
                      </div>
                      <div className="text-left sm:text-right">
                        <p className="font-medium text-gray-900 text-sm sm:text-base">
                          R$ {aula.valorAula.toFixed(2)}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-600 capitalize">
                          {aula.status}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Nenhuma aula agendada</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Atividades Recentes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-lg sm:text-xl">
              <TrendingUp className="w-5 h-5" />
              <span>Atividades Recentes</span>
            </CardTitle>
            <CardDescription>
              Últimas atividades do sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  id: "1",
                  tipo: "aula_criada",
                  titulo: "Nova aula criada",
                  descricao: "Aula de Natação Adulto agendada para amanhã às 07:00",
                  data: new Date(Date.now() - 1000 * 60 * 30), 
                },
                {
                  id: "2",
                  tipo: "aluno_cadastrado",
                  titulo: "Novo aluno cadastrado",
                  descricao: "Maria Silva foi cadastrada no sistema",
                  data: new Date(Date.now() - 1000 * 60 * 60 * 2), 
                },
                {
                  id: "3",
                  tipo: "treino_atualizado",
                  titulo: "Treino atualizado",
                  descricao: "Treino A foi atualizado para João Santos",
                  data: new Date(Date.now() - 1000 * 60 * 60 * 4), 
                },
              ].map((atividade) => (
                <div
                  key={atividade.id}
                  className="flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 bg-gray-50 rounded-lg"
                >
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 text-sm sm:text-base">{atividade.titulo}</p>
                    <p className="text-xs sm:text-sm text-gray-600 truncate">{atividade.descricao}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {format(atividade.data, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
