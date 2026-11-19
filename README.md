# AFG Bank Côte d'Ivoire - Portail Courriers Clients

Application web statique pour préparer, prévisualiser et télécharger des courriers bancaires PDF depuis le navigateur.

## Utilisation

Ouvrez `index.html` dans un navigateur récent, ou servez le dossier avec l'extension Live Server de VS Code. L'écran de bienvenue s'affiche au chargement ; le bouton principal ouvre la sélection des motifs, et le logo de la barre supérieure permet de revenir à l'accueil. Aucune installation, compilation ou connexion à un backend n'est nécessaire.

Le parcours propose six motifs de courrier : réclamation pour débit à tort, résiliation BP Capital / NSIA, demande relative à une carte magnétique, clôture de compte, opposition sur chèque et mise à jour des informations client. Pour une clôture, le client peut sélectionner un compte ou les deux ; le second numéro de compte est alors requis. Le mode de récupération du solde peut être le retrait au guichet ou un virement bancaire, avec un champ facultatif pour le compte bénéficiaire. Les références carte sont saisies avec leurs quatre premiers et derniers chiffres, puis masquées dans le courrier. Les champs requis varient selon le motif et les choix du client.

## Fichiers

- `index.html` : structure des trois étapes et aperçu du courrier.
- `style.css` : interface responsive et mise en page A4.
- `app.js` : formulaires conditionnels, modèles de courriers, validation et export PDF.
- `assets/` : identité visuelle AFG Bank.

Tailwind CSS et html2pdf.js sont chargés via CDN ; une connexion Internet est nécessaire pour les charger. Les informations saisies sont traitées dans la page et ne sont envoyées à aucun serveur.

## Publication gratuite sur GitHub Pages

Le projet est un site statique : aucun outil de compilation n'est nécessaire. Le fichier `.github/workflows/deploy-pages.yml` publie automatiquement le site sur GitHub Pages après chaque envoi sur la branche `main`. Après le premier envoi, vérifiez dans les paramètres du dépôt GitHub que la source de publication est réglée sur **GitHub Actions**. La publication initiale peut prendre quelques minutes.
