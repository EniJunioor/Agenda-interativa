"use client"

import { useRouter, usePathname } from "next/navigation"
import { X, Home, Calendar, Dumbbell, Users, Settings, LogOut, Menu, Waves } from "lucide-react"
import { cn } from "@/lib/utils"

interface SidebarProps {
  open: boolean
  setOpen: (open: boolean) => void
}

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Calendário", href: "/calendario", icon: Calendar },
  { name: "Treinos", href: "/treinos", icon: Dumbbell },
  { name: "Alunos", href: "/alunos", icon: Users },
  { name: "Configurações", href: "/configuracoes", icon: Settings },
]

export function Sidebar({ open, setOpen }: SidebarProps) {
  const router = useRouter()
  const pathname = usePathname()

  const handleSignOut = async () => {
    // Temporariamente desabilitado
    router.push("/dashboard")
  }

  return (
    <>
      {/* Overlay para mobile */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-xl transform transition-all duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 border-r border-gray-200",
          open ? "translate-x-0" : "-translate-x-full"
        )}
        style={{ position: 'fixed' }}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex h-16 items-center justify-between px-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-blue-700">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <Waves className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-white">Academia</span>
                <p className="text-xs text-blue-100">Sistema de Gestão</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="lg:hidden p-2 rounded-lg text-white hover:bg-white hover:bg-opacity-20 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <button
                  key={item.name}
                  onClick={() => {
                    router.push(item.href)
                    setOpen(false)
                  }}
                  className={cn(
                    "w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group",
                    isActive
                      ? "bg-blue-50 text-blue-700 border border-blue-200 shadow-sm"
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900 hover:shadow-sm"
                  )}
                >
                  <div className={cn(
                    "p-1.5 rounded-lg transition-colors",
                    isActive 
                      ? "bg-blue-100 text-blue-600" 
                      : "text-gray-500 group-hover:text-gray-700 group-hover:bg-gray-100"
                  )}>
                    <item.icon className="w-4 h-4" />
                  </div>
                  <span>{item.name}</span>
                </button>
              )
            })}
          </nav>

          {/* User info e logout */}
          <div className="border-t border-gray-200 p-4 bg-gray-50">
            <div className="flex items-center space-x-3 mb-4 p-3 bg-white rounded-xl shadow-sm">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-sm">
                <span className="text-white font-semibold text-sm">
                  A
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  Administrador
                </p>
                <p className="text-xs text-gray-500 capitalize">
                  admin
                </p>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-white hover:text-gray-900 hover:shadow-sm transition-all duration-200 group"
            >
              <div className="p-1.5 rounded-lg text-gray-500 group-hover:text-gray-700 group-hover:bg-gray-100 transition-colors">
                <LogOut className="w-4 h-4" />
              </div>
              <span>Sair</span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
