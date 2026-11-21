# Arivoli

Vitrine de Gilbert Maury, consultant Analytics et performance e-commerce. Cible de production : https://arivoli.fr/.

## Modifier le site

La page d’accueil et son simulateur utilisent `index.html` et `assets/cohorte.js`. Les interventions et la rubrique des futurs cas d’usage se trouvent dans `priorites.html`. Les références de Gilbert Maury figurent dans `gilbert-maury.html`. Le contact public passe par LinkedIn. Les styles et la palette se trouvent dans `assets/editorial.css`.

## Aperçu local

Depuis la racine du dépôt, lancez :

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Ouvrez http://127.0.0.1:8000/. Le site est statique et ses fichiers sont directement déployables au niveau de la racine web.

## Déploiement OVHcloud

L’hébergement Web gratuit d’arivoli.fr expose le dossier `www` via SFTP. Le workflow **Déployer sur OVHcloud** utilise cet accès sur chaque push vers `main`. Le premier déploiement peut aussi être lancé depuis l’onglet **Actions** avec **Run workflow**.

1. Dans **Settings → Secrets and variables → Actions**, ajoutez un secret de dépôt `OVH_SFTP_PASSWORD` contenant le mot de passe du compte SFTP affiché dans l’onglet **FTP – SSH** du Manager OVHcloud. Le mot de passe du Manager et celui du compte SFTP sont distincts.
2. Dans **Variables**, ajoutez `OVH_SFTP_KNOWN_HOSTS` avec l’entrée `known_hosts` vérifiée pour `ftp.cluster129.hosting.ovh.net`. Utilisez la clé d’une connexion de confiance ou comparez son empreinte à une source OVHcloud de confiance avant de l’enregistrer. OpenSSH refusera toute clé non reconnue.
3. Lancez **Déployer sur OVHcloud** et vérifiez le journal du workflow, puis https://arivoli.fr/ et https://arivoli.fr/cas-usages.html.

Le workflow publie uniquement la liste de fichiers définie dans le script SFTP. Il envoie les ressources avant la page principale, remplace chaque fichier après son transfert et conserve les autres fichiers de `www`.

[Connexion SFTP à l’hébergement web OVHcloud](https://docs.ovhcloud.com/fr/guides/web-cloud/web-hosting/ftp-connection)
