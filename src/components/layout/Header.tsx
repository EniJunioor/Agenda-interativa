"use client"

import { Menu, Bell, Download, Search } from "lucide-react"
import { usePWA } from "@/hooks/usePWA"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface HeaderProps {
  onMenuClick: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  const { isInstallable, installApp } = usePWA()

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Menu button para mobile */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Título da página */}
        <div className="flex-1 lg:flex-none">
          <h1 className="text-xl font-bold text-gray-900">
            Sistema de Agendamento
          </h1>
        </div>

        {/* Barra de pesquisa (desktop) */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Pesquisar..."
              className="pl-10 bg-gray-50 border-gray-200 focus:bg-white"
            />
          </div>
        </div>

        {/* Ações do header */}
        <div className="flex items-center space-x-3">
          {/* Botão de instalação PWA */}
          {isInstallable && (
            <Button
              onClick={installApp}
              variant="outline"
              size="sm"
              className="hidden sm:flex items-center space-x-2 border-gray-200 hover:bg-gray-50"
            >
              <Download className="w-4 h-4" />
              <span>Instalar App</span>
            </Button>
          )}

          {/* Notificações */}
          <button className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
          </button>

          {/* Informações do usuário */}
          <div className="flex items-center space-x-3 pl-3 border-l border-gray-200">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-semibold text-gray-900">
                Administrador
              </p>
              <p className="text-xs text-gray-500 capitalize">
                admin
              </p>
            </div>
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-sm">
              <span className="text-white font-semibold text-sm">
                A
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
