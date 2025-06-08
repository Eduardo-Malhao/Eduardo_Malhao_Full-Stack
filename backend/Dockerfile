# Etapa 1: build da aplicação (multi-stage build)
FROM node:22.16 AS build

WORKDIR /app

# Copia apenas os arquivos necessários para instalar dependências
COPY package.json package-lock.json ./

# Instala dependências (incluindo devDependencies para o build)
RUN npm ci

# Copia o restante do código
COPY . .

# Gera Prisma Client
RUN npx prisma generate

# Transpila o TypeScript
RUN npm run build

# Etapa 2: imagem final, só com o código necessário
FROM node:22.16-alpine

WORKDIR /app

# Copia apenas o necessário para produção
COPY --from=build /app/package.json /app/package-lock.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/.env .env

# Expõe a porta que seu app usa
EXPOSE 3001

# Comando para rodar o app
CMD ["node", "dist/server.js"]