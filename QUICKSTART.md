# 🚀 QUICK START - AutoPartsFlow

## Démarrage Rapide

### 1. Installer les dépendances (si pas déjà fait)
```bash
npm install
```

### 2. Démarrer l'application
```bash
npm start
```

### 3. Accéder à AutoPartsFlow
Une fois l'application démarrée, dans le **sidebar** (menu latéral), vous verrez:

```
🛒 AutoPartsFlow
   📊 Dashboard            → /admin/autoparts/dashboard
   📦 Gestion Stock        → /admin/autoparts/stock
   🔍 Recherche Pièces     → /admin/autoparts/finder
   🧾 Ventes               → /admin/autoparts/sales
   🏢 Fournisseurs         → /admin/autoparts/suppliers
   👥 Clients              → /admin/autoparts/clients
   📝 Commandes            → /admin/autoparts/orders
   💰 Finance              → /admin/autoparts/finance
```

## 📋 Fonctionnalités par Page

### Dashboard
- Vue d'ensemble avec KPIs
- Graphiques ventes/achats
- Alertes stock bas
- Activités récentes

### Gestion Stock
- 10 pièces disponibles
- Filtres et recherche
- Ajout nouvelle pièce
- Alertes stock minimum

### Recherche Pièces (Part Finder)
- Sélectionner: Marque → Modèle
- Voir pièces compatibles
- Filtrage avancé

### Ventes
- 5 ventes enregistrées
- Création facture
- Suivi paiements

### Fournisseurs
- 4 fournisseurs
- Gestion crédits
- Historique achats

### Clients
- 5 clients
- Suivi crédits
- Historique achats

### Commandes
- 3 commandes en cours
- Suivi livraisons

### Finance
- Cashflow annuel
- KPIs financiers
- Graphiques détaillés

## 🎨 Testez les Fonctionnalités

### Dans "Gestion Stock":
1. Utilisez la barre de recherche
2. Filtrez par catégorie (Freinage, Moteur, etc.)
3. Triez par nom/stock/prix
4. Cliquez "Ajouter Pièce"

### Dans "Recherche Pièces":
1. Sélectionnez "Peugeot"
2. Puis "208 (2019-2024)"
3. Cliquez "Rechercher"
4. Voyez les pièces compatibles!

### Dans "Dashboard":
1. Consultez les KPIs
2. Analysez les graphiques
3. Vérifiez les alertes stock bas

## 📊 Données Disponibles

Toutes les données sont dans: `src/data/autoPartsData.js`

- 10 pièces détachées
- 12 modèles de voitures
- 4 fournisseurs
- 5 clients
- 5 ventes
- 3 achats
- 3 commandes

## 🎯 Navigation Rapide

Utilisez ces URLs directement:

- Dashboard: `http://localhost:3000/admin/autoparts/dashboard`
- Stock: `http://localhost:3000/admin/autoparts/stock`
- Finder: `http://localhost:3000/admin/autoparts/finder`
- Ventes: `http://localhost:3000/admin/autoparts/sales`
- Fournisseurs: `http://localhost:3000/admin/autoparts/suppliers`
- Clients: `http://localhost:3000/admin/autoparts/clients`
- Commandes: `http://localhost:3000/admin/autoparts/orders`
- Finance: `http://localhost:3000/admin/autoparts/finance`

## ✅ Tout est Prêt!

Votre démo AutoPartsFlow est **complète et fonctionnelle**!

Profitez de votre SaaS de gestion de pièces détachées automobiles! 🚗
