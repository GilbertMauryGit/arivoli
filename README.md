# Arivoli

Vitrine de Gilbert Maury, consultant Analytics et performance e-commerce. Cible de production : https://arivoli.fr/.

## Modifier le site depuis ChatGPT ou GitHub

- Pour un service, ajoutez une balise `<article>` dans `#services` dans `index.html`.
- Pour un cas d’usage, ajoutez un bloc `<details>` dans la liste de `#cas`. Indiquez le contexte, la décision et, si des résultats sont publiables, le périmètre et la méthode de mesure.
- Pour modifier la démonstration, éditez les scénarios fictifs dans `assets/demo.js`. Le scénario Search initial est également dans `index.html` pour fonctionner sans JavaScript.
- Les couleurs de la charte sont définies au début de `assets/site.css`.

Vous pouvez demander dans ChatGPT « Ajoute ce cas d’usage à arivoli, vérifie le rendu et pousse sur main ». Une fois le webhook actif, chaque push sur `main` déclenche le déploiement chez OVHcloud. Un commit sur une autre branche permet de préparer un changement avant fusion.

## Aperçu local

Depuis la racine du dépôt, lancez :

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Ouvrez http://127.0.0.1:8000/. Le site est statique et ses fichiers sont directement déployables au niveau de la racine web.

## Déploiement OVHcloud

1. Dans le Manager OVHcloud, ouvrez **Web Cloud → Hébergements web → votre hébergement → Mes sites**. Vérifiez que `arivoli.fr` et, le cas échéant, `www.arivoli.fr` pointent vers le répertoire prévu pour Arivoli et disposent du HTTPS. L’association Git s’applique à tous les domaines qui partagent ce répertoire.
2. Sur la ligne du site, ouvrez **Git → Configurer**. Renseignez le dépôt public `https://github.com/GilbertMauryGit/arivoli.git` et la branche `main`. Appliquez la configuration.
3. Copiez l’URL de déploiement automatique affichée par OVHcloud. Dans les paramètres du dépôt GitHub, créez un webhook avec cette URL, le type `application/json`, la vérification TLS activée et l’événement `push`. Conservez l’URL dans les paramètres GitHub.
4. Contrôlez la livraison du prochain push dans **Recent Deliveries**, puis le journal du dernier déploiement OVHcloud. Vérifiez ensuite la page, les assets et le HTTPS sur `arivoli.fr`.

[Documentation OVHcloud sur Git et les webhooks](https://docs.ovhcloud.com/fr/guides/web-cloud/web-hosting/git-integration-webhosting)
