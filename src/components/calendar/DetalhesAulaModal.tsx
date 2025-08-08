"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Aula, Professor, TipoAula } from "@/types"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Calendar, Clock, Users, DollarSign, User, Edit, Trash2 } from "lucide-react"

interface DetalhesAulaModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  aula: Aula | null
  professor: Professor | null
  tipoAula: TipoAula | null
}

export function DetalhesAulaModal({ open, onOpenChange, aula, professor, tipoAula }: DetalhesAulaModalProps) {
  if (!aula || !professor || !tipoAula) return null

  const handleEdit = () => {
    console.log("Editar aula:", aula.id)
    alert(`Editando aula: ${aula.id}`)
  }

  const handleDelete = () => {
    console.log("Excluir aula:", aula.id)
    if (confirm("Tem certeza que deseja excluir esta aula?")) {
      alert(`Aula excluída: ${aula.id}`)
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <div className={`w-4 h-4 rounded-full ${professor.cor}`}></div>
            <span>{tipoAula.nome}</span>
          </DialogTitle>
          <DialogDescription>
            Detalhes da aula agendada
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Informações principais */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {format(aula.dataHora, "EEEE, dd 'de' MMMM", { locale: ptBR })}
                </p>
                <p className="text-xs text-gray-600">
                  {format(aula.dataHora, "yyyy", { locale: ptBR })}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {format(aula.dataHora, "HH:mm", { locale: ptBR })}
                </p>
                <p className="text-xs text-gray-600">Horário</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {aula.quantidadeAlunos} alunos
                </p>
                <p className="text-xs text-gray-600">Inscritos</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <DollarSign className="w-4 h-4 text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  R$ {aula.valorAula.toFixed(2)}
                </p>
                <p className="text-xs text-gray-600">Valor</p>
              </div>
            </div>
          </div>

          {/* Professor */}
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className={`w-10 h-10 rounded-full ${professor.cor} flex items-center justify-center`}>
              <span className="text-white font-semibold text-sm">
                {professor.nome.charAt(0)}
              </span>
            </div>
            <div>
              <p className="font-medium text-gray-900">{professor.nome}</p>
              <p className="text-sm text-gray-600">{professor.especialidades.join(", ")}</p>
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
            <div>
              <p className="text-sm font-medium text-blue-900">Status</p>
              <p className="text-xs text-blue-700 capitalize">{aula.status}</p>
            </div>
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${
              aula.status === 'agendada' ? 'bg-green-100 text-green-800' :
              aula.status === 'cancelada' ? 'bg-red-100 text-red-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {aula.status === 'agendada' ? 'Agendada' :
               aula.status === 'cancelada' ? 'Cancelada' :
               aula.status}
            </div>
          </div>

          {/* Ações */}
          <div className="flex space-x-2 pt-4">
            <Button
              variant="outline"
              onClick={handleEdit}
              className="flex-1 button-hover"
            >
              <Edit className="w-4 h-4 mr-2" />
              Editar
            </Button>
            <Button
              variant="outline"
              onClick={handleDelete}
              className="button-hover"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
