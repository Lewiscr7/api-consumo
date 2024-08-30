# Use uma imagem base do Node.js
FROM node:18

# Cria um diretório para a aplicação
WORKDIR /usr/src/app

# Copia os arquivos package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia todo o código-fonte para o diretório de trabalho
COPY . .

# Compila o código TypeScript
RUN npm run build

# Expõe a porta que a aplicação irá usar
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]
