//console.log('Vous êtes ici');
// création de variable global
var dom_jeu;
var motSecret = motAleatoire();
var motVisible = []; // Tableau de caractères (mot) visible inGame
var lettreChoisie = [];
var mauvaisesReponses = 0;

/****************************************************************************
 * Fonction motAleatoire() va choisir un mot aléatoire
 * dans le Dico.js et stocker le mot aléatoire dans var motSecret
 * @returns aleatoire
 *
 ***************************************************************************/
function  motAleatoire() {
    let i = Math.floor(Math.random() * nombreDeMots);
    let aleatoire = dictionnaire[i]


    return aleatoire;
}
/***************************************************************************
 * Fonction init() va initialiser le jeu du pendu et
 * incrémenter le motVisible en affichant la première et dernière lettre
 * puis cacher le reste du mot avec des underscores 
 ***************************************************************************/
function init() {
    // afficher motSecret, je dois récupérer <span id="jeu"></span>
    dom_jeu = document.getElementById('jeu');
    

    // Hydrate/insérer chaque caractère du motSecret dans le tableau motVisible
    for (let i = 0; i < motSecret.length; i++) {
        if (i == 0 || i == motSecret.length - 1) {
            motVisible.push(motSecret.charAt(i));
        } else {
            motVisible.push("_");
        }
    }
    document.getElementById("motAffiche").textContent = motVisible.join(' ');  
}
/*****************************************************************************
 * Fonction choisirLettre() va permettre :
 * - De choisir une lettre, vérifier si elle n'a pas déjà été choisie.
 * - Vérifier si la lettre n'est pas dans le mot secret
 * - Vérifier si le joueur à gagner
 * - Désactiver le boutton correspondant à la lettre choisie
 * - terminer la fonction après avoir gagné
 * 
 * @return alert
 *******************************************************************************/
function choisirLettre(lettre) {
    console.log("Lettre choisie : " + lettre);
    lettre = lettre.toUpperCase();

    // Vérifier si la lettre a déjà été choisie
    if (lettreChoisie.includes(lettre)) {
        alert("Lettre déjà choisie. Choisissez une autre lettre.");
        return;
    }

    lettreChoisie.push(lettre);

    // Vérifier si la lettre est dans le mot secret
    let lettreCorrecte = false;

    for (const [i, char] of motSecret.split('').entries()) {
        if (char === lettre) {
            motVisible[i] = lettre;
            lettreCorrecte = true;
        }
    }

    document.getElementById("motAffiche").textContent = motVisible.join(' ');

    // Vérifier si le joueur a gagné
    if (!motVisible.includes("_")) {
        alert("Félicitations ! Vous avez gagné !");
        resetGame();
        return; // Terminer la fonction après avoir gagné
    }

    // Vérifier si la lettre n'est pas dans le mot secret
    if (!lettreCorrecte) {
        // mettre à jour l'image du Pendu
        mauvaisesReponses++;
        updatePendu();  
    }
    // Désactiver le bouton correspondant à la lettre choisie et la griser
    var boutonLettre = document.getElementById('bouton-' + lettre);
    if (boutonLettre) {
        boutonLettre.disabled = true;
        boutonLettre.classList.add('lettre-desactive'); 
    }
}
/*******************************************************************************
 * Fonction updatePendu() va permettre de mettre à jour les images du pendu et la
 * couleur du background en fonction des erreurs avec un compteur d'erreurs max 
 * 
 ********************************************************************************/
function updatePendu() {
    var nombreImage = lettreChoisie.length;
    var cordeImage = document.getElementById('cordeImage');

    // Limiter le nombre d'erreurs à 6
    var erreursMax = 6;
    var erreurAfficher = Math.min(nombreImage, erreursMax);

    // Changer l'image du pendu en fonction du nombre d'erreurs
    cordeImage.src = "image/p" + erreurAfficher + ".gif";
    console.log(' erreur: ' + erreurAfficher);

    // Appeler getColorForWrongAnswers pour obtenir la couleur de fond
    var couleurFond = getColorForWrongAnswers(mauvaisesReponses);
    document.body.style.backgroundColor = couleurFond;
    
    if (nombreImage === erreursMax) {
        alert("Désolé, vous avez perdu. Le mot était : " + motSecret);
        resetGame();
    }
}
/*********************************************************************************
 * Fonction getColorForWrongAnswers() permet de changer la couleur du background
 * en fonction des erreurs
 **********************************************************************************/
function getColorForWrongAnswers(mauvaisesReponses) {  
    if (mauvaisesReponses === 1) {
        return "yellow";
    } else if (mauvaisesReponses === 2) {
        return "orange";
    } else {
        return "red";
    }
}
/***********************************************************************************
 * Fonction resetGame() va permettre de remettre le jeu à zéro pour rejouer
 ***********************************************************************************/
function resetGame() {
    mauvaisesReponses = 0;
    motVisible = [];
    lettreChoisie = [];
    document.body.style.backgroundColor = " "; 
    init();
}
// Appeler init() lorsque la page est chargée
window.onload = init;



    



    

