# Instructions de déploiement et de maintenance des workflows

## État des workflows

Le dépôt contient un seul workflow GitHub Actions actif : `.github/workflows/deploy-ovh.yml` (**Déployer sur OVHcloud**). Il est nécessaire à la publication de https://arivoli.fr/ et doit être conservé.

N'ajoutez pas de workflows de déploiement redondants. Avant de supprimer un workflow, vérifiez ses déclencheurs, ses éventuels appels par d'autres workflows, ses secrets, ses environnements, ses contrôles requis et sa relation avec la production. Ne supprimez jamais un workflow sur la seule base de son nom ou de sa fréquence d'exécution.

## Déclenchement

- Un push sur `main` lance le déploiement.
- `workflow_dispatch` permet un déclenchement manuel depuis **Actions**.
- Le job ne s'exécute que sur `refs/heads/main`.
- Le groupe de concurrence `arivoli-production` évite les déploiements simultanés sans annuler celui en cours.

**Attention :** une modification de documentation fusionnée sur `main` déclenche également le workflow, car aucun filtre de chemins n'est configuré.

## Pré-requis GitHub

Dans **Settings → Secrets and variables → Actions** :

1. Secret `OVH_SFTP_PASSWORD` : mot de passe du compte SFTP OVHcloud (différent du mot de passe du Manager).
2. Variable `OVH_SFTP_KNOWN_HOSTS` : ligne(s) `known_hosts` vérifiée(s) pour `ftp.cluster129.hosting.ovh.net`.

Ne mettez jamais le mot de passe ou une clé privée dans le dépôt, la documentation ou les journaux. Avant d'accepter une nouvelle clé hôte SSH, comparez son empreinte à une source de confiance ; `ssh-keyscan` seul ne prouve pas son authenticité.

Si la configuration manque, le workflow affiche une notice et saute les étapes SFTP ; **une exécution affichée comme réussie ne garantit donc pas, à elle seule, qu'un déploiement a eu lieu**.

## Ce que fait le workflow

1. Récupère le code (sans conserver les identifiants Git).
2. Vérifie la syntaxe de `assets/cohorte.js` avec `node --check`.
3. Vérifie la présence de la configuration SFTP et, si nécessaire, relève les clés hôte à comparer.
4. Installe `sshpass`, puis transfère vers `www` les fichiers explicitement inscrits dans le script SFTP.
5. Transfère chaque fichier sous un nom temporaire puis le renomme.
6. Compare le contenu téléchargé depuis le site public avec les fichiers locaux pour `index.html`, `priorites.html`, `gilbert-maury.html`, `robots.txt` et `sitemap.xml`.

Le workflow publie actuellement :

- `assets/arivoli.svg`, `assets/editorial.css`, `assets/cohorte.js`
- `priorites.html`, `gilbert-maury.html`, `cas-usages.html`
- `sitemap.xml`, `robots.txt`, `index.html`

Il ne supprime pas automatiquement les fichiers déjà présents dans `www`. La vérification HTTP ne couvre pas actuellement tous les fichiers transférés.

## Procédure de modification

1. Modifiez le site dans une branche dédiée et vérifiez l'aperçu local avec `python3 -m http.server 8000 --bind 127.0.0.1`.
2. Lancez `node --check assets/cohorte.js` si le JavaScript change.
3. Si vous ajoutez ou renommez un fichier public, mettez à jour **la liste des transferts SFTP** dans `.github/workflows/deploy-ovh.yml` et adaptez les vérifications lorsque c'est pertinent.
4. Vérifiez que les secrets/variables existent, sans afficher leur contenu.
5. Faites relire les modifications du workflow avant fusion dans `main`.
6. Après fusion, contrôlez l'exécution dans **Actions**, les étapes SFTP et de vérification, puis https://arivoli.fr/ et les pages modifiées.
7. En cas d'échec, consultez les journaux Actions, corrigez la configuration ou le code, puis relancez le workflow. Pour revenir en arrière, restaurez un commit connu comme fonctionnel et redéployez depuis `main`.

## Politique de nettoyage

Conservez ce seul workflow tant qu'OVHcloud/SFTP est la méthode de publication. Ne retirez un ancien workflow que lorsqu'un remplacement fonctionne et que ses dépendances sont traitées. Évitez de supprimer des contrôles de sécurité, de validation ou de déploiement simplement pour réduire le nombre d'exécutions.

Pour les détails généraux du site et l'accès OVHcloud, consultez également `README.md`.
