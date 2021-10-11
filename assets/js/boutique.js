new (function () {
  const srcImg = "./assets/images/albums/"; // emplacement des images de l'appli

  // Déclaration et récupération des éléments HTML à manipuler
  let id = document.getElementById("id");
  // let id2 = document.getElementById("id2");
  // let id3 = document.getElementById("id3");
  let txtSerie = document.getElementById("serie");
  let txtNumero = document.getElementById("numero");
  let txtTitre = document.getElementById("titre");
  let txtAuteur = document.getElementById("auteur");
  let txtPrix = document.getElementById("prix");
  let image = document.getElementById("albumImage");
  let messageId = document.getElementById("messageId");
  let message;

  // Ajout des écouteurs
  // Si on valide un changement de la zone "identifiant", appel de la fonction getAlbum()
  id.addEventListener("change", function () {
    getAlbum(this);
  });
  // Si on valide un changement de la zone "serie", appel de la fonction getSerie()
  // id2.addEventListener("change", function () {
  //   getSerie(this);
  // });
  // Si on valide un changement de la zone "Auteur", appel de la fonction getAuteur()
  // id3.addEventListener("change", function () {
  //   getAuteur(this);
  // });
  // Si erreur au chargement du fichier image, appel de la fonction prbImage()
  image.addEventListener("error", function () {
    prbImage(this);
  });

  /**
   * Fonction de recherche de element.value dans la Map albums
   * affichage des attributs et mémorisation en cookie du dernier élément trouvé
   *
   * @param {element HTML} element
   * @returns {objet js} contenant les attributs de album, ou undefined.
   */
  function getAlbum(element) {
    let album = albums.get(element.value);
    console.log(album);
    afficheAlbum(album);
  }

  /**
   * Fonction de recherche de element.value dans la Map series
   * affichage des attributs et mémorisation en cookie du dernier élément trouvé
   *
   * @param {element HTML} element
   * @returns {objet js} contenant les attributs de album, ou undefined.
   */
  function getSerie(element) {
    let serie = series.get(element.value);
    console.log(serie);

    afficheSerie(serie);

    // if (serie !== undefined) {
    //   setCookie("dernierId", element.value, 365);
    // }
  }

  /**
   * Fonction de recherche de element.value dans la Map auteurs
   * affichage des attributs et mémorisation en cookie du dernier élément trouvé
   *
   * @param {element HTML} element
   * @returns {objet js} contenant les attributs de album, ou undefined.
   */
  function getAuteur(element) {
    let auteur = auteurs.get(element.value);
    console.log(auteur);

    afficheAuteur(auteur);

    if (auteur !== undefined) {
      setCookie("dernierId", element.value, 365);
    }
  }

  /**
   * Affichage des attributs d'album
   * et suppression de Message
   *
   * @param {object} album
   */
  function afficheAlbum(album) {
    supprimeMessage();

    if (album === undefined) {
      message.id = "erreur";
      message.innerHTML = "Album inconnu";
      messageId.appendChild(message);
      image.src = srcImg + "noComics.gif";
      txtSerie.value = "";
      txtNumero.value = "";
      txtTitre.value = "";
      txtAuteur.value = "";
      txtPrix.value = "";
    } else {
      let serie = series.get(album.idSerie);
      let auteur = auteurs.get(album.idAuteur);
      image.src = srcImg + album.image;

      txtSerie.value = serie.nom;
      txtNumero.value = album.numero;
      txtTitre.value = album.titre;
      txtAuteur.value = auteur.nom;
      txtPrix.value = album.prix;

      let nomFic = serie.nom + "-" + album.numero + "-" + album.titre;
      // Utilisation d'une expression régulière pour supprimer
      // les caractères non autorisés dans les noms de fichiers : '!?.":$
      nomFic = nomFic.replace(/'|!|\?|\.|"|:|\$/g, "");
    }
  }

  /**
   * Affichage des attributs de series
   * et suppression de Message
   *
   * @param {object} serie
   */
  function afficheSerie(serie) {
    supprimeMessage();

    if (serie === undefined) {
      message.id = "erreur";
      message.innerHTML = "Serie inconnu";
      messageId2.appendChild(message);
      image.src = srcImg + "noComics.gif";
      txtSerie.value = "";
      txtNumero.value = "";
      txtTitre.value = "";
      txtAuteur.value = "";
      txtPrix.value = "";
    } else {
      txtSerie.value = serie.nom;
      txtNumero.value = "";
      txtTitre.value = "";
      txtAuteur.value = "";
      txtPrix.value = "";
    }
  }

  /**
   * Affichage des attributs d'auteurs
   * et suppression de Message
   *
   * @param {object} serie
   */
  function afficheAuteur(auteur) {
    supprimeMessage();

    if (auteur === undefined) {
      message.id = "erreur";
      message.innerHTML = "Auteur inconnu";
      messageId3.appendChild(message);
      image.src = srcImg + "noComics.gif";
      txtSerie.value = "";
      txtNumero.value = "";
      txtTitre.value = "";
      txtAuteur.value = "";
      txtPrix.value = "";
    } else {
      txtAuteur.value = auteur.nom;
      txtSerie.value = "";
      txtNumero.value = "";
      txtTitre.value = "";
      txtPrix.value = "";
    }
  }

  /**
   * MAJ du DOM -> création nouveau message (élément HTML de type 'p')
   * ou suppression si ancien message
   */
  function supprimeMessage() {
    message = document.getElementById("erreur");
    if (message === null) {
      message = document.createElement("p");
    } else {
      message.remove(); // remove ne supprime pas l'objet mais le retire de l'arbre auquel il appartient
    }
  }

  /**
   * Afficher l'image par défaut
   *
   * @param {object HTML} element
   */
  function prbImage(element) {
    element.src = srcImg + "noComics.gif";
  }

  // Ajout capitalisation au prototype de String
  // Mise en majuscule de la première lettre des mots.
  String.prototype.capitalize = function () {
    return this.replace(/(?:^|\s)\S/g, function (a) {
      return a.toUpperCase();
    });
  };
})();
