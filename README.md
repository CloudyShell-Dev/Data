# CloudyShell Data API

CloudyShell Data est une API de monitoring pour sites web, permettant de suivre l'uptime, les versions et les statistiques des sites clients.

## 🚀 Features

- Monitoring d'uptime des sites web
- Gestion des données de versionnement
- Export CSV des données
- Intégration facile sur les sites clients
- Panel d'administration

## 📋 Prérequis

- Node.js 18+
- PostgreSQL 16
- Docker & Docker Compose (optionnel)

## 🛠️ Installation

1. Cloner le repository :
```bash
git clone https://github.com/CloudyShell-Dev/Data.git
cd Data
```

2. Installer les dépendances :
```bash
npm install
```

3. Configurer les variables d'environnement :
```bash
cp .env.example .env
```
Modifier le fichier .env avec vos configurations

4. Démarrer PostgreSQL :
```bash
# Avec Docker
docker compose up -d

# Ou utilisez votre propre instance PostgreSQL
```

5. Initialiser la base de données :
```bash
# Appliquer les migrations
npx prisma migrate dev

# Créer le compte admin
npm run db:seed
```

6. Démarrer l'API :
```bash
# En développement
npm run start:dev

# En production
npm run build
npm run start:prod
```

## 📚 Documentation

- [Documentation de l'API](/docs/API_DOCUMENTATION.md)

## 🔧 Configuration

Le fichier `.env` doit contenir :

```env
# Base de données
DATABASE_URL="postgresql://user:password@localhost:5432/cloudyshell"

# JWT
JWT_SECRET="votre_secret"

# Server
PORT=3000
```

## 📦 Structure du Projet

```
src/
├── auth/          # Authentication
├── sites/         # Gestion des sites
├── assets/        # Gestion des assets (SVG, client)
├── export/        # Export CSV
├── common/        # Utilitaires partagés
└── client/        # Script client

docs/              # Documentation
prisma/            # Schemas et migrations
test/              # Tests
```