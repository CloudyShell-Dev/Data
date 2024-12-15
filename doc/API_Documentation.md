```markdown
# Documentation CloudyShell API

## 🌐 Résumé
CloudyShell API est une solution de monitoring pour sites web permettant de :
- Suivre l'uptime des sites
- Collecter des métriques (version, IP)
- Fournir des assets pour les signatures de sites
- Exporter les données au format CSV

## 🔑 Authentification
**POST** `/auth/login`
```json
{
  "email": "admin@cloudyshell.com",
  "password": "your_password"
}
```
Retourne un JWT token pour l'accès aux endpoints protégés.

**GET** `/auth/me`  
Headers: `Authorization: Bearer your_jwt_token`  
Retourne les informations de l'utilisateur connecté.

## 📊 Gestion des Sites

### Création d'un site (Protégé)
**POST** `/sites`
```json
{
  "name": "Mon Site",
  "url": "https://monsite.com",
  "version": "1.0.0"
}
```

### Liste des sites (Protégé)
**GET** `/sites?page=1&limit=10`  
Retourne la liste paginée des sites avec leurs dernières métriques.

### Détails d'un site (Public)
**GET** `/sites/:id`  
Retourne les informations détaillées d'un site.

### Mise à jour des métriques (Public)
**POST** `/sites/:id/metrics`
```json
{
  "uptime": 99.9
}
```

## 🖼️ Assets
**GET** `/assets/svg/light`  
**GET** `/assets/svg/dark`  
Retourne les logos au format SVG.

**GET** `/assets/client/cloudyshell-client.min.js`  
Retourne le script client à intégrer sur les sites.

## 📑 Export (Protégé)
**GET** `/export/csv`  
Export complet des données en CSV.

**GET** `/export/csv/:id`  
Export des données d'un site spécifique.

## 💻 Intégration Client

### Sites Statiques
```html
<script src="https://api.cloudyshell.com/assets/client/cloudyshell-client.min.js"></script>
<script>
  const client = new CloudyshellClient({
    siteId: 'votre-site-id'
  });
  client.start();
</script>
```

### React/Vue
```typescript
import { CloudyshellClient } from '@cloudyshell/client';

const client = new CloudyshellClient({
  siteId: 'votre-site-id'
});

useEffect(() => {
  client.start();
  return () => client.stop();
}, []);
```
```