# Utiliser une image de base pour Node.js pour construire l'application
FROM node:16 as build

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers de l'application
COPY . .

# Construire l'application Vue.js
RUN npm run build

# Utiliser une image de base pour Apache pour servir l'application
FROM httpd:2.4

# Installer curl
RUN apt-get update && apt-get install -y curl

# Copier les fichiers compilés dans le répertoire de publication d'Apache
COPY --from=build /app/dist/ /usr/local/apache2/htdocs/

# Copier la configuration Apache pour supporter l'historique des routes de Vue.js
COPY vuejs.conf /usr/local/apache2/conf/extra/vuejs.conf

# Inclure le fichier de configuration dans le fichier principal d'Apache
RUN sed -i '/#Include conf\/extra\/httpd-autoindex.conf/a Include conf/extra/vuejs.conf' /usr/local/apache2/conf/httpd.conf

# Exposer le port 80
EXPOSE 80

# Commande pour démarrer Apache
ENTRYPOINT ["httpd-foreground"]
