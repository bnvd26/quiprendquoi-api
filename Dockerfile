# Image de base 
FROM node:8.11-alpine

# Copie de la liste des dependances
COPY package.json /app/package.json

# Installation des dependances
RUN cd /app && npm install

# Copie du code de l'application
COPY . /app/

# Espace de travail
WORKDIR /app

# Port d'écoute
EXPOSE 80

# Commande à lancer, pour démarrer l'application
CMD ["node", "app.js"]
