"use client"

import { format, startOfWeek, endOfWeek, eachDayOfInterval, eachHourOfInterval, isSameDay, isSameHour } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Aula, Professor, TipoAula } from "@/types"

interface WeeklyCalendarProps {
  currentWeek: Date
  aulas: Aula[]
  professores: Professor[]
  tiposAula: TipoAula[]
  onAulaClick?: (aula: Aula) => void
}

export function WeeklyCalendar({ currentWeek, aulas, professores, tiposAula, onAulaClick }: WeeklyCalendarProps) {
  const weekStart = startOfWeek(currentWeek, { locale: ptBR })
  const weekEnd = endOfWeek(currentWeek, { locale: ptBR })
  
  const days = eachDayOfInterval({ start: weekStart, end: weekEnd })
  const hours = eachHourOfInterval({ 
    start: new Date(weekStart.setHours(6, 0, 0, 0)), 
    end: new Date(weekStart.setHours(18, 0, 0, 0)) 
  })

  const getAulasForTimeSlot = (day: Date, hour: Date) => {
    return aulas.filter(aula => 
      isSameDay(aula.dataHora, day) && 
      isSameHour(aula.dataHora, hour)
    )
  }

  const getProfessorColor = (professorId: string) => {
    const professor = professores.find(p => p.id === professorId)
    return professor?.cor || "bg-gray-500"
  }

  const getTipoAulaName = (tipoAulaId: string) => {
    const tipo = tiposAula.find(t => t.id === tipoAulaId)
    return tipo?.nome || "Aula"
  }

  const handleAulaClick = (aula: Aula) => {
    if (onAulaClick) {
      onAulaClick(aula)
    }
  }

  return (
    <div className="overflow-x-auto">
      <div className="calendar-grid min-w-[800px]">
        {/* Cabeçalho dos dias */}
        <div className="calendar-time-header"></div>
        {days.map((day) => (
          <div key={day.toISOString()} className="calendar-day-header">
            <div className="font-semibold text-sm">
              {format(day, "EEE", { locale: ptBR })}
            </div>
            <div className="text-xs text-gray-500">
              {format(day, "dd/MM", { locale: ptBR })}
            </div>
          </div>
        ))}

        {/* Linhas de horário */}
        {hours.map((hour) => (
          <>
            <div key={`time-${hour.toISOString()}`} className="calendar-time">
              {format(hour, "HH:mm", { locale: ptBR })}
            </div>
            {days.map((day) => {
              const aulasSlot = getAulasForTimeSlot(day, hour)
              return (
                <div key={`${day.toISOString()}-${hour.toISOString()}`} className="calendar-cell">
                  {aulasSlot.map((aula, index) => {
                    const professor = professores.find(p => p.id === aula.professorId)
                    const tipo = tiposAula.find(t => t.id === aula.tipoAulaId)
                    
                    return (
                      <div
                        key={aula.id}
                        className={`aula-item ${getProfessorColor(aula.professorId)} cursor-pointer hover:opacity-90 transition-all duration-200`}
                        style={{
                          top: `${index * 25}px`,
                          height: '22px',
                          fontSize: '0.7rem',
                          fontWeight: '500',
                          padding: '2px 6px',
                          borderRadius: '4px',
                          color: 'white',
                          textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                        }}
                        onClick={() => handleAulaClick(aula)}
                        title={`${tipo?.nome} - ${professor?.nome} - ${aula.quantidadeAlunos} alunos`}
                      >
                        <div className="flex items-center justify-between h-full">
                          <span className="truncate">{tipo?.nome}</span>
                          <span className="text-xs opacity-90 ml-1">{aula.quantidadeAlunos}</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </>
        ))}
      </div>
    </div>
  )
}
