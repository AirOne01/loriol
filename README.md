<img src="https://file.diplomeo-static.com/file/00/00/01/46/14677.svg" alt="Logo Ecole La Mache" title="Ecole La Mache" height="100"/>

# Projet Loriol
### Partie individuelle d'<u>Erwann Lagouche</u>
## Description
**Ce programme est à la fois un serveur web sur lequel un utilisateur peut gérer l'infrastructure et récolter des informations et une interface cliente d'une API d'informations météorologiques, ainsi qu'une API REST sur laquelle sont récupérées les informations des capteurs sonores**

## Contenu du code source
* Commentaires rédigés en anglais (sauf dans ce fichier)
* Utilisation de Node.js (haut niveau)
* Enregistrement et commuting sur GitHub

## Utilisation
* Installez Node.js (LTS recommandé)
* Clonez le dépôt localement ou téléchargez-le en zip
`git clone https://github.com/AirOne01/loriol`
* Lancez le script correspondant à votre OS.
   * Sur **Windows**: `powershell start.bat`, ou double-cliquez simplement *start.bat*
   * Sur **Linux**: `./start.sh`
   
## TODO
* ✔️ ~~Faire les scripts de débogage Windows/Linux (*debug.js*)~~
* ✔️ ~~Arrêter d'utiliser *chance*~~
* ✔️ ~~Enregistrement du mot de passe admin avec *Bcrypt.js*, utilisant le moteur de chiffrage *Bcrypt*~~
* ✔️ ~~Faire une autre repo pour les fichiers Arduino~~ Voir [github/AirOne01/loriol-arduino](https://github.com/AirOne01/loriol-arduino)
* ✔️ ~~Préparer l'app pour le déploiement~~
* ✔ ~~Communiquer avec l'API météorologique et stocker ses données~~
* ❌ Faire l'interface graphique sur le site
* ❌ Faire une interface téléphone
* ❌ Réfléchir à une licence plus sérieuse que du full-copyright ou copyleft (voir Mozilla ou Creative Commons)
* ❌ Utiliser une librairie comme [Plotly](https://plotly.com/nodejs/) pour afficher des graphiques récapitulatifs
* ❌ Communiquer avec l'Arduino pour controller la pompe régulièrement
* ❌ Récupérer les données météo manquées avec l'API
* ❌ Ajouter plus de couleurs aux messages d'erreurs
###### Légende: ✔ *OK*, ❓ *En cours*, ❌ *À faire*

## Dépendances
**Moteur** :
* [Node.js](https://nodejs.org/fr/) (utilise [Chromium](https://fr.wikipedia.org/wiki/Chromium), programmation en Javascript et/ou Typescript)

**Modules NPM** :
* [axios](https://www.npmjs.com/package/axios): Requêtes HTTP
* [bcryptjs](https://www.npmjs.com/package/bcryptjs): Chiffrage avec *Bcrypt*
* [cron](https://www.npmjs.com/package.cron): Tâches périodiques (récupération et stockage de données)
* [debug](https://www.npmjs.com/package/debug): Débogage et verbose
* [express](https://www.npmjs.com/package/express): Serveur HTTP facilement
    * [cookie-parser](https://www.npmjs.com/package/cookie-parser): Middleware pour récupérer les cookies.
    * [body-parser](https://www.npmjs.com/package/body-parser): Middleware pour récupérer le body. Remplace `express#bodyParser()`, [obsolète](https://github.com/expressjs/body-parser/commit/b7420f8dc5c8b17a277c9e50d72bbaf3086a3900) depuis peu.
* [json-format](https://www.npmjs.com/package/json-format): Pour que les fichiers de config aient bonne figure
* [mysql](https://www.npmjs.com/package/mysql): Pour interagir avec mysql
* [supports-color](https://www.npmjs.com/package/supports-color): Active le support des couleurs pour *debug*

## Licence
Voir [LICENSE.md](./LICENSE.md)
