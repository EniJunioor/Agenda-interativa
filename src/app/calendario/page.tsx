"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, ChevronLeft, ChevronRight, Plus, Filter } from "lucide-react"
import { WeeklyCalendar } from "@/components/calendar/WeeklyCalendar"
import { NovaAulaModal } from "@/components/calendar/NovaAulaModal"
import { DetalhesAulaModal } from "@/components/calendar/DetalhesAulaModal"
import { aulas, professores, tiposAula } from "@/lib/data"
import { format, addWeeks, subWeeks, startOfWeek, endOfWeek } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Aula } from "@/types"

export default function CalendarioPage() {
  const [currentWeek, setCurrentWeek] = useState(new Date())
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDetalhesModalOpen, setIsDetalhesModalOpen] = useState(false)
  const [selectedAula, setSelectedAula] = useState<Aula | null>(null)
  const [selectedProfessor, setSelectedProfessor] = useState<string>("")
  const [selectedTipoAula, setSelectedTipoAula] = useState<string>("")

  const weekStart = startOfWeek(currentWeek, { locale: ptBR })
  const weekEnd = endOfWeek(currentWeek, { locale: ptBR })

  const filteredAulas = aulas.filter(aula => {
    if (selectedProfessor && aula.professorId !== selectedProfessor) return false
    if (selectedTipoAula && aula.tipoAulaId !== selectedTipoAula) return false
    return true
  })

  const nextWeek = () => setCurrentWeek(addWeeks(currentWeek, 1))
  const prevWeek = () => setCurrentWeek(subWeeks(currentWeek, 1))

  const handleNewAula = () => {
    setIsModalOpen(true)
  }

  const handleAulaClick = (aula: Aula) => {
    setSelectedAula(aula)
    setIsDetalhesModalOpen(true)
  }

  const selectedProfessorData = selectedAula ? professores.find(p => p.id === selectedAula.professorId) || null : null
  const selectedTipoAulaData = selectedAula ? tiposAula.find(t => t.id === selectedAula.tipoAulaId) || null : null

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Calendário</h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Visualize e gerencie as aulas da academia
            </p>
          </div>
          <Button onClick={handleNewAula} className="w-full sm:w-auto button-hover">
            <Plus className="w-4 h-4 mr-2" />
            Nova Aula
          </Button>
        </div>

        {/* Controles do calendário */}
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
              {/* Navegação de semanas */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex items-center justify-center sm:justify-start space-x-2 sm:space-x-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={prevWeek}
                    className="flex items-center space-x-1 sm:space-x-2 button-hover"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span className="hidden sm:inline">Semana Anterior</span>
                  </Button>
                  
                  <div className="text-center min-w-0 flex-1 sm:flex-none">
                    <p className="font-medium text-gray-900 text-sm sm:text-base truncate">
                      {format(weekStart, "dd 'de' MMMM", { locale: ptBR })} - {format(weekEnd, "dd 'de' MMMM", { locale: ptBR })}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600">
                      {format(weekStart, "yyyy", { locale: ptBR })}
                    </p>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={nextWeek}
                    className="flex items-center space-x-1 sm:space-x-2 button-hover"
                  >
                    <span className="hidden sm:inline">Próxima Semana</span>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Filtros */}
              <div className="flex flex-col sm:flex-row gap-2 min-w-0">
                <select
                  value={selectedProfessor}
                  onChange={(e) => setSelectedProfessor(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="">Todos os professores</option>
                  {professores.map((professor) => (
                    <option key={professor.id} value={professor.id}>
                      {professor.nome}
                    </option>
                  ))}
                </select>

                <select
                  value={selectedTipoAula}
                  onChange={(e) => setSelectedTipoAula(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="">Todos os tipos</option>
                  {tiposAula.map((tipo) => (
                    <option key={tipo.id} value={tipo.id}>
                      {tipo.nome}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Calendário */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-lg sm:text-xl">
              <Calendar className="w-5 h-5" />
              <span>Calendário Semanal</span>
            </CardTitle>
            <CardDescription>
              Horários das aulas de {format(weekStart, "dd/MM", { locale: ptBR })} a {format(weekEnd, "dd/MM", { locale: ptBR })}
            </CardDescription>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <div className="min-w-[800px]">
              <WeeklyCalendar
                currentWeek={currentWeek}
                aulas={filteredAulas}
                professores={professores}
                tiposAula={tiposAula}
                onAulaClick={handleAulaClick}
              />
            </div>
          </CardContent>
        </Card>

        {/* Legenda */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Professores</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
              {professores.map((professor) => (
                <div key={professor.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full ${professor.cor} flex-shrink-0`}></div>
                  <span className="text-sm font-medium text-gray-900 truncate">
                    {professor.nome}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Modal de nova aula */}
        <NovaAulaModal
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          professores={professores}
          tiposAula={tiposAula}
        />

        {/* Modal de detalhes da aula */}
        <DetalhesAulaModal
          open={isDetalhesModalOpen}
          onOpenChange={setIsDetalhesModalOpen}
          aula={selectedAula}
          professor={selectedProfessorData}
          tipoAula={selectedTipoAulaData}
        />
      </div>
    </DashboardLayout>
  )
}
