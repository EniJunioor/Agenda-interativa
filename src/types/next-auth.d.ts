import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      email: string
      name: string
      role: 'admin' | 'professor' | 'aluno'
      avatar?: string
    }
  }

  interface User {
    id: string
    email: string
    name: string
    role: 'admin' | 'professor' | 'aluno'
    avatar?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    role: 'admin' | 'professor' | 'aluno'
  }
}
