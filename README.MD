# 🚀 Fullstack Application - Passo a Passo

Olá!  
Aqui está o passo a passo para rodar sua aplicação **Fullstack** ✅

## 🖥️ Frontend

1️⃣ Abra um terminal e acesse a pasta `frontend`:

```bash
cd frontend
npm install
npm run dev
```

👉 O comando `npm run dev` irá disponibilizar a aplicação em uma URL `http://localhost:<porta>` no seu navegador.

### 🔐 Usuário para acesso:

- **Email:** `joao.silva@example.com`  
- **Senha:** `123456789`

## 🛠️ Backend

2️⃣ Em outro terminal, acesse a pasta `backend`:

```bash
cd backend
npm install
npx prisma generate
docker compose up -d  # aguarde finalizar
npx prisma migrate dev --name init
npm run prisma:seed
npm run build
npm start
```

## ♻️ Resetar banco de dados

Caso deseje restaurar o banco de dados para o estado original, com o Docker rodando:

```bash
npx prisma migrate reset
npm run prisma:seed
npm run build
npm start
```

## 🐳 Notas sobre Docker no Ubuntu

Caso esteja usando Ubuntu, utilize permissões de super usuário para rodar os containers:

```bash
sudo docker compose up -d
sudo docker compose down
```

## 📫 Contato

- <a href="https://www.linkedin.com/in/eduardo-malhao/" target="_blank">🔗 Meu LinkedIn</a>
- <a href="https://wa.me/5512981733073?text=Ol%C3%A1%20Eduardo!%20Vim%20pelo%20GitHub%20🚀" target="_blank">💬 Meu WhatsApp (Clique para enviar mensagem)</a>

---

Bons estudos e bom desenvolvimento! 🚀
