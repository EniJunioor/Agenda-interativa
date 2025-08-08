"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Settings, User, Bell, Shield, Database, Palette, Save } from "lucide-react"

export default function ConfiguracoesPage() {
  const [configuracoes, setConfiguracoes] = useState({
    nomeAcademia: "Academia Fitness",
    email: "contato@academia.com",
    telefone: "(11) 99999-9999",
    endereco: "Rua das Flores, 123 - Centro",
    horarioFuncionamento: "06:00 - 22:00",
    notificacoesEmail: true,
    notificacoesPush: true,
    temaEscuro: false,
  })

  const handleSaveConfiguracoes = () => {
    // Implementar salvamento das configurações
    console.log("Salvando configurações:", configuracoes)
    alert("Configurações salvas com sucesso!")
  }

  const handleResetConfiguracoes = () => {
    // Implementar reset das configurações
    console.log("Resetando configurações")
    alert("Configurações resetadas!")
  }

  const handleBackupDados = () => {
    // Implementar backup dos dados
    console.log("Fazendo backup dos dados")
    alert("Backup iniciado!")
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Configurações</h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Gerencie as configurações do sistema
          </p>
        </div>

        {/* Configurações Gerais */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-lg sm:text-xl">
              <Settings className="w-5 h-5" />
              <span>Configurações Gerais</span>
            </CardTitle>
            <CardDescription>
              Informações básicas da academia
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome da Academia
                </label>
                <Input
                  value={configuracoes.nomeAcademia}
                  onChange={(e) => setConfiguracoes({...configuracoes, nomeAcademia: e.target.value})}
                  placeholder="Nome da academia"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email de Contato
                </label>
                <Input
                  type="email"
                  value={configuracoes.email}
                  onChange={(e) => setConfiguracoes({...configuracoes, email: e.target.value})}
                  placeholder="contato@academia.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Telefone
                </label>
                <Input
                  value={configuracoes.telefone}
                  onChange={(e) => setConfiguracoes({...configuracoes, telefone: e.target.value})}
                  placeholder="(11) 99999-9999"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Horário de Funcionamento
                </label>
                <Input
                  value={configuracoes.horarioFuncionamento}
                  onChange={(e) => setConfiguracoes({...configuracoes, horarioFuncionamento: e.target.value})}
                  placeholder="06:00 - 22:00"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Endereço
              </label>
              <Input
                value={configuracoes.endereco}
                onChange={(e) => setConfiguracoes({...configuracoes, endereco: e.target.value})}
                placeholder="Endereço completo"
              />
            </div>
          </CardContent>
        </Card>

        {/* Configurações de Notificações */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-lg sm:text-xl">
              <Bell className="w-5 h-5" />
              <span>Notificações</span>
            </CardTitle>
            <CardDescription>
              Configure como receber notificações
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Notificações por Email</p>
                <p className="text-sm text-gray-600">Receber notificações por email</p>
              </div>
              <Button
                variant={configuracoes.notificacoesEmail ? "default" : "outline"}
                size="sm"
                onClick={() => setConfiguracoes({...configuracoes, notificacoesEmail: !configuracoes.notificacoesEmail})}
                className="button-hover"
              >
                {configuracoes.notificacoesEmail ? "Ativado" : "Desativado"}
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Notificações Push</p>
                <p className="text-sm text-gray-600">Receber notificações no navegador</p>
              </div>
              <Button
                variant={configuracoes.notificacoesPush ? "default" : "outline"}
                size="sm"
                onClick={() => setConfiguracoes({...configuracoes, notificacoesPush: !configuracoes.notificacoesPush})}
                className="button-hover"
              >
                {configuracoes.notificacoesPush ? "Ativado" : "Desativado"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Configurações de Aparência */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-lg sm:text-xl">
              <Palette className="w-5 h-5" />
              <span>Aparência</span>
            </CardTitle>
            <CardDescription>
              Personalize a aparência do sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Tema Escuro</p>
                <p className="text-sm text-gray-600">Ativar modo escuro</p>
              </div>
              <Button
                variant={configuracoes.temaEscuro ? "default" : "outline"}
                size="sm"
                onClick={() => setConfiguracoes({...configuracoes, temaEscuro: !configuracoes.temaEscuro})}
                className="button-hover"
              >
                {configuracoes.temaEscuro ? "Ativado" : "Desativado"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Configurações de Sistema */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-lg sm:text-xl">
              <Database className="w-5 h-5" />
              <span>Sistema</span>
            </CardTitle>
            <CardDescription>
              Configurações avançadas do sistema
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                onClick={handleBackupDados}
                className="button-hover"
              >
                <Database className="w-4 h-4 mr-2" />
                Fazer Backup
              </Button>
              <Button
                variant="outline"
                onClick={handleResetConfiguracoes}
                className="button-hover"
              >
                <Settings className="w-4 h-4 mr-2" />
                Resetar Configurações
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Ações */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={handleSaveConfiguracoes}
            className="flex-1 sm:flex-none button-hover"
          >
            <Save className="w-4 h-4 mr-2" />
            Salvar Configurações
          </Button>
        </div>
      </div>
    </DashboardLayout>
  )
}
