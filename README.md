<img src="https://www.ecolelamache.org/wp-content/uploads/2019/10/lamache-logo3.png" alt="Logo Ecole La Mache" title="Ecole La Mache" width="140" height="200"/>

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
* ❌ Faire l'interface graphique sur le site
* ❌ Faire une interface téléphone
* ❌ Faire une autre repo pour les fichiers Arduino
* ❓ Préparer l'app pour le déploiement
* ❌ Eventuellement faire un peu de Typescript
* ❌ Réfléchir à une licence plus sérieuse que du full-copyright ou copyleft (voir Mozilla ou Creative Commons)
###### Légende: ✔ *OK*, ❓ *En cours*, ❌ *À faire*

## Dépendances
**Moteur** :

* [Node.js](https://nodejs.org/fr/) (utilise [Chromium](https://fr.wikipedia.org/wiki/Chromium), programmation en Javascript et/ou Typescript)

**Modules NPM** :

* [axios](https://www.npmjs.com/package/axios): Requêtes HTTP
* [chance](https://www.npmjs.com/package/chance): Aléatoire avancé
* [debug](https://www.npmjs.com/package/debug): Débogage et verbose
* [express](https://www.npmjs.com/package/express): Serveur HTTP facilement
* [json-format](https://www.npmjs.com/package/json-format): Pour que les fichiers de config aient bonne figure
* [supports-color](https://www.npmjs.com/package/supports-color): Active le support des couleurs pour *debug*

## Licence
Voir [LICENSE.md](./LICENSE.md)
