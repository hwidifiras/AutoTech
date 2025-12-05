# 🚗 AutoPartsFlow - SaaS Dashboard

**AutoPartsFlow** est une démo frontend complète d'un SaaS destiné aux vendeurs de pièces détachées automobiles, construit avec **React + Chakra UI Pro Horizon**.

---

## 🎯 Fonctionnalités Principales

### 📊 **Dashboard**
- KPI Cards: Total ventes, achats, bénéfice net, valeur stock
- Graphiques: Ventes vs achats, distribution par catégorie
- Timeline des activités récentes
- Alertes stock bas en temps réel

### 🔧 **Gestion du Stock**
- Tableau filtrable des pièces détachées
- Recherche par référence, nom, marque
- Filtrage par catégorie
- Modal d'ajout de nouvelle pièce
- Alertes de stock minimum

### 🔍 **Part Finder (Recherche Avancée)**
- Sélection de marque et modèle de voiture
- Affichage automatique des pièces compatibles
- Filtrage multi-critères
- Recherche par mots-clés
- Tableau de résultats détaillé

### 💰 **Gestion des Ventes**
- Liste complète des ventes/factures
- Création de nouvelles factures
- Suivi des paiements (espèces, crédit, virement)
- Statuts: Payée, En attente
- Export et visualisation des factures

### 🏢 **Fournisseurs & Achats**
- Gestion des fournisseurs
- Suivi des crédits fournisseurs
- Historique des achats
- Statuts de réception et paiement
- Ratings des fournisseurs

### 👥 **Clients & Crédits**
- Base de données clients
- Gestion des crédits clients
- Historique des achats par client
- Limites de crédit et alertes
- Notes et ratings

### 📝 **Bons de Commande**
- Liste des commandes
- Statuts: En attente, Confirmée, En cours, Terminée
- Dates de livraison
- Suivi complet des commandes

### 💵 **Vue Financière**
- Cashflow annuel
- Comparaison mensuelle revenus/dépenses
- Bénéfice net et marge bénéficiaire
- KPIs financiers détaillés
- Graphiques interactifs

---

## 🏗️ Architecture

```
src/
├── components/
│   ├── card/
│   │   ├── PartCard.js          # Card pour afficher une pièce
│   │   ├── ClientCard.js        # Card pour afficher un client
│   │   ├── SupplierCard.js      # Card pour afficher un fournisseur
│   │   └── StatCard.js          # Card KPI statistiques
│   ├── charts/
│   │   ├── LineChart.js
│   │   ├── BarChart.js
│   │   └── PieChart.js
│   └── ...
├── data/
│   └── autoPartsData.js         # Mock data complet
├── views/
│   └── admin/
│       └── autoparts/
│           ├── dashboard/       # Dashboard principal
│           ├── stock/           # Gestion stock
│           ├── finder/          # Recherche avancée
│           ├── sales/           # Ventes & factures
│           ├── suppliers/       # Fournisseurs & achats
│           ├── clients/         # Clients & crédits
│           ├── orders/          # Bons de commande
│           └── finance/         # Vue financière
├── routes.js                    # Configuration des routes
└── ...
```

---

## 🎨 Design System

**AutoPartsFlow** utilise exclusivement le design system de **Horizon Chakra UI Pro**:

- ✅ Composants natifs: Card, Table, Modal, Badge, Button, Input, Select
- ✅ Graphiques ApexCharts intégrés
- ✅ Palette de couleurs brand cohérente
- ✅ Layout responsive (sidebar + topbar + content)
- ✅ Dark mode ready
- ✅ Icons Material Design (react-icons/md)

---

## 🚀 Installation et Démarrage

### Prérequis
```bash
Node.js >= 14.x
npm >= 6.x
```

### Installation
```bash
# Cloner le projet
git clone <repository-url>

# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm start
```

L'application sera accessible sur `http://localhost:3000`

---

## 📋 Pages Disponibles

| Page | Route | Description |
|------|-------|-------------|
| Dashboard | `/admin/autoparts/dashboard` | Vue d'ensemble KPIs + graphiques |
| Stock | `/admin/autoparts/stock` | Gestion complète du stock |
| Finder | `/admin/autoparts/finder` | Recherche par compatibilité modèle |
| Ventes | `/admin/autoparts/sales` | Gestion ventes et factures |
| Fournisseurs | `/admin/autoparts/suppliers` | Fournisseurs + achats |
| Clients | `/admin/autoparts/clients` | Base clients + crédits |
| Commandes | `/admin/autoparts/orders` | Bons de commande |
| Finance | `/admin/autoparts/finance` | Vue financière globale |

---

## 📊 Données Mock

Toutes les données sont stockées dans `src/data/autoPartsData.js`:

- **10 pièces détachées** avec compatibilités modèles
- **12 modèles de voitures** (Peugeot, Renault, Citroën, Toyota, VW, etc.)
- **4 fournisseurs** avec crédits et historiques
- **5 clients** avec limites de crédit
- **5 ventes** récentes
- **3 achats** avec statuts
- **3 commandes** en cours
- **Données financières** pour graphiques annuels

---

## 🎯 Fonctionnalités Techniques

### Filtrage & Recherche
- Recherche temps réel
- Filtres multi-critères
- Tri dynamique (nom, stock, prix)

### Compatibilité Véhicule
- Base de données modèles/marques
- Mapping pièces ↔ modèles compatibles
- Suggestions automatiques

### Gestion Crédit
- Suivi crédit client
- Suivi crédit fournisseur
- Calcul automatique pourcentages
- Alertes visuelles

### Statistiques
- Calculs KPIs en temps réel
- Graphiques interactifs
- Comparaisons temporelles
- Export données

---

## 🛠️ Technologies Utilisées

- **React 18.2.0**
- **Chakra UI 2.6.1**
- **React Router 6.4.0**
- **ApexCharts 3.35.2**
- **React Icons 4.3.1**
- **Framer Motion 4.1.17**

---

## 🌟 Points Forts

✅ **100% Horizon UI compliant** - Utilise exclusivement les composants du template  
✅ **Design cohérent** - Palette de couleurs et spacing uniformes  
✅ **Responsive** - Fonctionne sur mobile, tablet, desktop  
✅ **Mock data réalistes** - Données professionnelles et crédibles  
✅ **Code propre** - Composants réutilisables, architecture claire  
✅ **Performance** - Optimisé pour la production  

---

## 📝 Personnalisation

### Modifier les couleurs
Éditer `src/theme/theme.js` et ajuster les variables brand.

### Ajouter des pièces
Éditer `src/data/autoPartsData.js` et ajouter des objets dans le tableau `parts`.

### Créer une nouvelle page
1. Créer le composant dans `src/views/admin/autoparts/`
2. Importer dans `src/routes.js`
3. Ajouter la route dans l'objet `AutoPartsFlow`

---

## 🤝 Support

Pour toute question ou demande de fonctionnalité:
- Créer une issue sur GitHub
- Contact: support@autopartsflow.com

---

## 📄 Licence

Ce projet est une **démo frontend** à usage éducatif et de présentation.

---

**Développé avec ❤️ en utilisant Horizon Chakra UI Pro**
