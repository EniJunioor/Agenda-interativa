import { NextRequest, NextResponse } from "next/server"

// Desabilitando temporariamente a autenticação
export async function GET(request: NextRequest) {
  return NextResponse.json({ 
    authenticated: true, 
    user: { 
      id: "1", 
      email: "admin@academia.com", 
      name: "Administrador", 
      role: "admin" 
    } 
  })
}

export async function POST(request: NextRequest) {
  return NextResponse.json({ 
    authenticated: true, 
    user: { 
      id: "1", 
      email: "admin@academia.com", 
      name: "Administrador", 
      role: "admin" 
    } 
  })
}
