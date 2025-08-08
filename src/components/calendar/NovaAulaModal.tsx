"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Dumbbell, 
  Activity, 
  Music, 
  User, 
  Shield, 
  Calendar,
  Clock,
  Heart,
  Star,
  Circle,
  Square
} from "lucide-react"
import { Professor, TipoAula } from "@/types"

interface NovaAulaModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  professores: Professor[]
  tiposAula: TipoAula[]
}

const icones: Record<string, React.ComponentType<{ className?: string }>> = {
  "Dumbbell": Dumbbell,
  "Activity": Activity,
  "Music": Music,
  "User": User,
  "Shield": Shield,
  "Calendar": Calendar,
  "Clock": Clock,
  "Heart": Heart,
  "Star": Star,
  "Circle": Circle,
  "Square": Square,
}

export function NovaAulaModal({ open, onOpenChange, professores, tiposAula }: NovaAulaModalProps) {
  const [formData, setFormData] = useState({
    data: "",
    hora: "",
    professorId: "",
    tipoAulaId: "",
    quantidadeAlunos: "",
    valorAula: "",
    status: "agendada",
    observacoes: "",
  })

  const [selectedTipoAula, setSelectedTipoAula] = useState<string>("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aqui você implementaria a lógica para salvar a aula
    console.log("Nova aula:", formData)
    alert("Aula criada com sucesso!")
    onOpenChange(false)
    setFormData({
      data: "",
      hora: "",
      professorId: "",
      tipoAulaId: "",
      quantidadeAlunos: "",
      valorAula: "",
      status: "agendada",
      observacoes: "",
    })
    setSelectedTipoAula("")
  }

  const handleTipoAulaSelect = (tipoId: string) => {
    setSelectedTipoAula(tipoId)
    setFormData(prev => ({ ...prev, tipoAulaId: tipoId }))
  }

  const getIconComponent = (iconName: string) => {
    const IconComponent = icones[iconName as keyof typeof icones]
    if (!IconComponent) {
      return <User className="w-5 h-5" />
    }
    return <IconComponent className="w-5 h-5" />
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Nova Aula</DialogTitle>
          <DialogDescription>
            Preencha os dados para criar uma nova aula
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Tipos de Aula */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Tipo de Aula *
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {tiposAula.map((tipo) => (
                <button
                  key={tipo.id}
                  type="button"
                  onClick={() => handleTipoAulaSelect(tipo.id)}
                  className={`p-4 border-2 rounded-lg text-center transition-all duration-200 hover:shadow-md ${
                    selectedTipoAula === tipo.id
                      ? "border-blue-500 bg-blue-50 shadow-md"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex flex-col items-center space-y-2">
                    <div className={`p-2 rounded-full ${tipo.cor} text-white shadow-sm`}>
                      {getIconComponent(tipo.icone)}
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {tipo.nome}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Data e Hora */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="data" className="block text-sm font-medium text-gray-700 mb-2">
                Data *
              </label>
              <div className="relative">
                <Input
                  id="data"
                  type="date"
                  value={formData.data}
                  onChange={(e) => setFormData(prev => ({ ...prev, data: e.target.value }))}
                  required
                />
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>
            <div>
              <label htmlFor="hora" className="block text-sm font-medium text-gray-700 mb-2">
                Hora *
              </label>
              <div className="relative">
                <Input
                  id="hora"
                  type="time"
                  value={formData.hora}
                  onChange={(e) => setFormData(prev => ({ ...prev, hora: e.target.value }))}
                  required
                />
                <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Professor */}
          <div>
            <label htmlFor="professor" className="block text-sm font-medium text-gray-700 mb-2">
              Professor *
            </label>
            <select
              id="professor"
              value={formData.professorId}
              onChange={(e) => setFormData(prev => ({ ...prev, professorId: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Selecione um professor</option>
              {professores.map((professor) => (
                <option key={professor.id} value={professor.id}>
                  {professor.nome}
                </option>
              ))}
            </select>
          </div>

          {/* Quantidade de Alunos e Valor */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="quantidadeAlunos" className="block text-sm font-medium text-gray-700 mb-2">
                Quantidade de Alunos *
              </label>
              <Input
                id="quantidadeAlunos"
                type="number"
                min="1"
                value={formData.quantidadeAlunos}
                onChange={(e) => setFormData(prev => ({ ...prev, quantidadeAlunos: e.target.value }))}
                required
              />
            </div>
            <div>
              <label htmlFor="valorAula" className="block text-sm font-medium text-gray-700 mb-2">
                Valor da Aula (R$) *
              </label>
              <Input
                id="valorAula"
                type="number"
                min="0"
                step="0.01"
                value={formData.valorAula}
                onChange={(e) => setFormData(prev => ({ ...prev, valorAula: e.target.value }))}
                required
              />
            </div>
          </div>

          {/* Status */}
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
              Status *
            </label>
            <select
              id="status"
              value={formData.status}
              onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="agendada">Agendada</option>
              <option value="realizada">Teve Aula</option>
              <option value="cancelada">Cancelada</option>
              <option value="remarcar">Precisa Remarcar</option>
            </select>
          </div>

          {/* Observações */}
          <div>
            <label htmlFor="observacoes" className="block text-sm font-medium text-gray-700 mb-2">
              Observações
            </label>
            <textarea
              id="observacoes"
              value={formData.observacoes}
              onChange={(e) => setFormData(prev => ({ ...prev, observacoes: e.target.value }))}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Observações adicionais..."
            />
          </div>

          {/* Botões */}
          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="button-hover"
            >
              Cancelar
            </Button>
            <Button 
              type="submit" 
              className="bg-blue-600 hover:bg-blue-700 button-hover"
            >
              Criar Aula
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
