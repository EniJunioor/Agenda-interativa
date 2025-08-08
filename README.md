# Sistema de Agendamento - Academia

Sistema completo de agendamento de aulas para academias desenvolvido com Next.js 15, TypeScript, Tailwind CSS e NextAuth.js.

## 🚀 Funcionalidades

- **Autenticação**: Sistema de login com três tipos de usuário (Admin, Professor, Aluno)
- **Dashboard**: Estatísticas e resumo das atividades da academia
- **Calendário**: Visualização semanal das aulas com filtros
- **Modal de Cadastro**: Interface para criar novas aulas
- **Treinos**: Gerenciamento de fichas de treino
- **PWA**: Aplicativo instalável em dispositivos móveis
- **Responsivo**: Design adaptável para desktop, tablet e mobile

## 🛠️ Tecnologias

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **UI Components**: Radix UI, Lucide React
- **Autenticação**: NextAuth.js, bcryptjs
- **Datas**: date-fns
- **PWA**: Service Worker, Manifest.json

## 📦 Instalação

1. **Clone o repositório**
```bash
git clone <url-do-repositorio>
cd sistema-agendamento
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
Crie um arquivo `.env.local` na raiz do projeto:
```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here-change-in-production
```

4. **Execute o projeto**
```bash
npm run dev
```

5. **Acesse o sistema**
Abra [http://localhost:3000](http://localhost:3000) no navegador.

## 👤 Contas de Teste

O sistema vem com três contas pré-configuradas:

- **Admin**: admin@academia.com / password123
- **Professor**: professor@academia.com / password123
- **Aluno**: aluno@academia.com / password123

## 📱 PWA (Progressive Web App)

O sistema é um PWA completo com:

- **Instalação**: Botão "Instalar App" no header
- **Offline**: Funcionalidade básica offline
- **Ícones**: Ícones personalizados (192x192 e 512x512)
- **Manifest**: Configuração completa do manifest.json
- **Service Worker**: Cache inteligente de recursos

### Como instalar no mobile:

1. Acesse o site no Chrome/Safari
2. Toque no botão "Instalar App" ou use o menu do navegador
3. Confirme a instalação
4. O app aparecerá na tela inicial

## 🎨 Design System

### Cores Principais
- **Primária**: Blue-600 (#2563eb)
- **Secundária**: Gray-900 (#111827)
- **Sucesso**: Green-500 (#10b981)
- **Aviso**: Orange-500 (#f59e0b)
- **Erro**: Red-500 (#ef4444)

### Professores (Cores do Calendário)
- Ana Silva: Purple-500
- Carlos Mendes: Orange-500
- Julia Santos: Blue-500
- Pedro Costa: Green-500
- Marina Oliveira: Pink-500
- Roberto Lima: Indigo-500

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── api/auth/[...nextauth]/route.ts
│   ├── login/page.tsx
│   ├── dashboard/page.tsx
│   ├── calendario/page.tsx
│   ├── treinos/page.tsx
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── auth/
│   │   └── SessionProvider.tsx
│   ├── layout/
│   │   ├── DashboardLayout.tsx
│   │   ├── Header.tsx
│   │   └── Sidebar.tsx
│   ├── calendar/
│   │   ├── WeeklyCalendar.tsx
│   │   └── NovaAulaModal.tsx
│   └── ui/
├── lib/
│   ├── auth.ts
│   ├── data.ts
│   └── utils.ts
├── types/
│   ├── index.ts
│   └── next-auth.d.ts
└── hooks/
    └── usePWA.ts
```

## 🔧 Configurações

### Next.js Config
O projeto está configurado com:
- Otimizações de imagem (WebP, AVIF)
- Compressão habilitada
- Headers para Service Worker
- Import otimizado do Lucide React

### Tailwind CSS
- Configuração com variáveis CSS customizadas
- Suporte a modo escuro
- Classes utilitárias para PWA

## 📱 Responsividade

O sistema é totalmente responsivo com breakpoints:

- **sm**: 640px (mobile landscape)
- **md**: 768px (tablet)
- **lg**: 1024px (desktop)
- **xl**: 1280px (large desktop)

### Adaptações Mobile
- Sidebar colapsável com overlay
- Cards em coluna única
- Modal full-screen em mobile
- Touch-friendly buttons (min 44px)
- Calendário com scroll horizontal

## 🚀 Deploy

### Vercel (Recomendado)
1. Conecte seu repositório ao Vercel
2. Configure as variáveis de ambiente
3. Deploy automático

### Outras Plataformas
O projeto pode ser deployado em qualquer plataforma que suporte Next.js:
- Netlify
- Railway
- Heroku
- AWS Amplify

## 🔒 Segurança

- Senhas hasheadas com bcryptjs
- Autenticação JWT com NextAuth.js
- Proteção de rotas
- Validação de formulários
- Sanitização de dados

## 📈 Próximos Passos

- [ ] Integração com banco de dados (PostgreSQL/MongoDB)
- [ ] Sistema de notificações push
- [ ] Relatórios e analytics
- [ ] Integração com pagamentos
- [ ] App nativo (React Native)

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Suporte

Para suporte, envie um email para suporte@academia.com ou abra uma issue no GitHub.
