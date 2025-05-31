# HealCon - Organizador de Documentos Médicos

HealCon é uma aplicação web moderna desenvolvida com foco em organizar o histórico médico do usuário de forma segura, simples e acessível. O sistema permite armazenar, visualizar e gerenciar documentos como consultas, exames, vacinas e retornos médicos, com suporte ao upload de múltiplos arquivos por registro.

---

## Landing Page
A Landing Page é uma página do "Frontend" feito em react.
Ela está disponível através da URL: https://levycs.github.io/PI-SENAC-5SEM-PT2/

## 🚀 Funcionalidades

* ✅ Cadastro e autenticação de usuários com JWT
* ✅ Persistência do login com Zustand + localStorage
* ✅ Criação, edição, visualização e listagem de registros médicos
* ✅ Upload de múltiplos arquivos por registro (armazenamento local)
* ✅ Visualização de anexos no modo de leitura
* ✅ Proteção de rotas com verificação do token
* ✅ Interceptor Axios para lidar com expiração de token (401)
* ✅ Tela de login, cadastro de usuário e landing page institucional
* ✅ Modal de carregamento global durante requisições

---

## 🧪 Tecnologias Utilizadas

### 💻 Frontend

* [React.js + Vite](https://vitejs.dev/) com TypeScript
* [TailwindCSS](https://tailwindcss.com/) para estilos
* [React Router DOM](https://reactrouter.com/) para navegação
* [Zustand](https://github.com/pmndrs/zustand) para gerenciamento global de estado
* [React Hook Form](https://react-hook-form.com/) + [Zod](https://github.com/colinhacks/zod) para validações de formulários
* [Axios](https://axios-http.com/) com interceptor JWT

### 🧠 Backend

* [Node.js + Express](https://expressjs.com/)
* [Prisma ORM](https://www.prisma.io/) com banco de dados SQLite
* [Multer](https://github.com/expressjs/multer) para upload de arquivos

---

## 📦 Instalação e execução local

### Pré-requisitos

* Node.js 18+
* npm ou yarn

### 1. Clonar o repositório

```bash
git clone https://github.com/seuusuario/healcon.git
cd healcon
```

### 2. Instalar as dependências

```bash
npm install
# ou
yarn
```

### 3. Rodar o frontend

```bash
npm run dev
```

### 4. Rodar o backend (exemplo)

```bash
cd backend
npm install
npx prisma migrate dev
npm run dev
```

---

## 📁 Estrutura de Diretórios (Frontend)

```
/src
  ├── pages/         # Telas (Login, Registro, Home, LandingPage)
  ├── components/    # Componentes reutilizáveis (Modal, Layout, etc)
  ├── store/         # Zustand stores (useAuth.ts)
  ├── lib/           # Axios API config
  └── App.tsx        # Rotas
```

---

## 💡 Sobre o Produto

O HealCon foi criado para usuários que desejam centralizar e organizar seu histórico médico pessoal. Pensado para facilitar o acesso a documentos importantes de forma intuitiva e segura, é ideal para quem:

* Realiza consultas e exames com frequência
* Precisa apresentar documentos médicos em diferentes locais
* Deseja manter um histórico de saúde pessoal ou familiar acessível

Com um design moderno, responsivo e objetivo, o HealCon proporciona uma ótima experiência em dispositivos móveis e desktops.

---

## 📬 Contato

Caso tenha dúvidas, sugestões ou queira contribuir:

* ✉️ Email: [contato@healcon.app](mailto:contato@healcon.app)
* 🌐 Website: [https://healcon.app](https://healcon.app) (fictício)

---

Feito com ❤️ por desenvolvedores apaixonados por saúde e tecnologia.
