class LignePanier {
  constructor(code, qte, prix) {
    this.codeArticle = code;
    this.qteArticle = qte;
    this.prixArticle = prix;
    this.ajouterQte = function (qte) {
      this.qteArticle += qte;
    };
    this.getPrixLigne = function () {
      // On divise par deux le prix pour appliquer la promotion
      let resultat = (this.prixArticle * this.qteArticle) / 2;
      return resultat;
    };
    this.getCode = function () {
      return this.codeArticle;
    };
  }
}

class Panier {
  constructor() {
    this.liste = [];
    this.ajouterArticle = function (code, qte, prix) {
      let index = this.getArticle(code);
      if (index == -1) this.liste.push(new LignePanier(code, qte, prix));
      else this.liste[index].ajouterQte(qte);
    };
    this.getPrixPanier = function () {
      let total = 0;
      for (let i = 0; i < this.liste.length; i++)
        total += this.liste[i].getPrixLigne();
      return total;
    };
    this.getArticle = function (code) {
      for (let i = 0; i < this.liste.length; i++)
        if (code == this.liste[i].getCode()) return i;
      return -1;
    };
    this.supprimerArticle = function (code) {
      let index = this.getArticle(code);
      if (index > -1) this.liste.splice(index, 1);
    };
  }
}

function ajouter() {
  let code = parseInt(document.getElementById("id").value);
  let qte = parseInt(document.getElementById("qte").value);
  let prix = parseInt(document.getElementById("prix").value);
  let monPanier = new Panier();
  monPanier.ajouterArticle(code, qte, prix);
  let tableau = document.getElementById("tableau");
  let longueurTab = parseInt(document.getElementById("nbreLignes").innerHTML);
  if (longueurTab > 0) {
    for (let i = longueurTab; i > 0; i--) {
      monPanier.ajouterArticle(
        parseInt(tableau.rows[i].cells[0].innerHTML),
        parseInt(tableau.rows[i].cells[1].innerHTML),
        parseInt(tableau.rows[i].cells[2].innerHTML)
      );
      tableau.deleteRow(i);
    }
  }
  let longueur = monPanier.liste.length;
  for (let i = 0; i < longueur; i++) {
    let ligne = monPanier.liste[i];
    let ligneTableau = tableau.insertRow(-1);
    let colonne1 = ligneTableau.insertCell(0);
    colonne1.innerHTML += ligne.getCode();
    let colonne2 = ligneTableau.insertCell(1);
    colonne2.innerHTML += ligne.qteArticle;
    let colonne3 = ligneTableau.insertCell(2);
    colonne3.innerHTML += ligne.prixArticle;
    let colonne4 = ligneTableau.insertCell(3);
    colonne4.innerHTML += ligne.getPrixLigne();
    let colonne5 = ligneTableau.insertCell(4);
    colonne5.innerHTML +=
      '<button class="hvr-buzz btnToon btn-danger mb-1" type="submit" id="btnDelete" onclick="supprimer(this.parentNode.parentNode.cells[0].innerHTML)">X</button>';
  }
  document.getElementById("prixTotal").innerHTML = monPanier.getPrixPanier();
  document.getElementById("totalNavbar").innerHTML = monPanier.getPrixPanier();

  document.getElementById("nbreLignes").innerHTML = longueur;
}

function supprimer(code) {
  let monPanier = new Panier();
  let tableau = document.getElementById("tableau");
  let longueurTab = parseInt(document.getElementById("nbreLignes").innerHTML);
  if (longueurTab > 0) {
    for (let i = longueurTab; i > 0; i--) {
      monPanier.ajouterArticle(
        parseInt(tableau.rows[i].cells[0].innerHTML),
        parseInt(tableau.rows[i].cells[1].innerHTML),
        parseInt(tableau.rows[i].cells[2].innerHTML)
      );
      tableau.deleteRow(i);
    }
  }
  monPanier.supprimerArticle(code);
  let longueur = monPanier.liste.length;
  for (let i = 0; i < longueur; i++) {
    let ligne = monPanier.liste[i];
    let ligneTableau = tableau.insertRow(-1);
    let colonne1 = ligneTableau.insertCell(0);
    colonne1.innerHTML += ligne.getCode();
    let colonne2 = ligneTableau.insertCell(1);
    colonne2.innerHTML += ligne.qteArticle;
    let colonne3 = ligneTableau.insertCell(2);
    colonne3.innerHTML += ligne.prixArticle;
    let colonne4 = ligneTableau.insertCell(3);
    colonne4.innerHTML += ligne.getPrixLigne();
    let colonne5 = ligneTableau.insertCell(4);
    colonne5.innerHTML +=
      '<button class="hvr-buzz btnToon btn-danger mb-1" type="submit" id="btnDelete" onclick="supprimer(this.parentNode.parentNode.cells[0].innerHTML)">X</button>';
  }
  document.getElementById("prixTotal").innerHTML = monPanier.getPrixPanier();
  document.getElementById("totalNavbar").innerHTML = monPanier.getPrixPanier();
  document.getElementById("nbreLignes").innerHTML = longueur;
}
