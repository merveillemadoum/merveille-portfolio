# Portfolio — Merveille Madoum

Site portfolio statique (HTML/CSS/JS, Tailwind CSS via CDN — pas de build nécessaire).

## Structure

```
.
├── index.html
├── css/
│   └── style.css
├── js/
│   └── main.js
└── images/
    ├── portrait.jpg
    └── tool-*.jpg
```

## À personnaliser avant publication

- **Email de contact** : dans [index.html](index.html), remplacer les deux occurrences de `contact@example.com` (lien `mailto:` affiché et attribut `data-contact-email` du formulaire) par la vraie adresse email.
- **Réseaux sociaux** : remplacer les `href="#"` des liens LinkedIn / Instagram (barre de contact et pied de page) par les vraies URLs.
- **Localisation** : remplacer « À compléter (ville, pays) » dans la section Contact.
- **Recommandations** : remplacer les 3 cartes placeholder de la section « Recommandations » par de vrais témoignages (nom, poste, entreprise, citation).
- **Photo de profil** : `images/portrait.jpg` est une image de démonstration — à remplacer par une vraie photo si besoin.

## Aperçu en local

Ouvrir simplement `index.html` dans un navigateur, ou lancer un petit serveur local :

```bash
python3 -m http.server 8000
```

puis ouvrir http://localhost:8000

## Publier sur GitHub (Pages)

```bash
git init
git add .
git commit -m "Initial commit: portfolio site"
git branch -M main
git remote add origin https://github.com/<votre-utilisateur>/<nom-du-repo>.git
git push -u origin main
```

Puis dans les paramètres du dépôt GitHub : **Settings → Pages → Source → branch `main` / dossier `/ (root)`**.
Le site sera disponible à `https://<votre-utilisateur>.github.io/<nom-du-repo>/`.

## Publier sur Hostinger

1. Se connecter à **hPanel** → **Gestionnaire de fichiers** (ou via FTP/SFTP).
2. Aller dans le dossier `public_html` (ou le sous-dossier de votre domaine).
3. Uploader tout le contenu de ce dossier (`index.html`, `css/`, `js/`, `images/`) — pas le dossier lui-même, son **contenu**.
4. Vérifier que `index.html` est bien à la racine de `public_html`.
5. Visiter votre nom de domaine pour vérifier.

Aucune base de données ni langage serveur (PHP, Node…) n'est nécessaire : c'est un site 100% statique.
