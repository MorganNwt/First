console.log('Je suis ici');
// Déclaration des Variables et constantes
let plateauDeJeu = [];
let plateauGagnant = [];
let dom_h1, dom_plateau;
var aGagner = false;

const NB_MOUTONS = 3;
const TAILLE = NB_MOUTONS * 2 + 1;
const MOUTON_BLANC = '>';
const MOUTON_NOIR = '<';
const ESPACE_VIDE = ' ';

/*********************************************
 *         APPEL DES FONCTIONS  *
 *********************************************/
// 1 - initialier le plateau de jeu
initialierPlateau();
// 2 - afficher le plateau de jeu
afficherPlateauDeJeu();
// 3 - Jouer un coup
//  Après avoir fait un déplacement je retourne un booléen qui vérifie si le joueur à gagné.
// la fonction jouUnCoup() est executé au clic sur la balise 
jouerUnCoup();


/*********************************************
 *          DECLARATION DES FONCTIONS  *
 *********************************************/

/**
 * Fonction initialiserPlateau() qui crée 2 plateaux de jeu.
 * Le premier est initialiseé en position de départ
 * Le second est initialisé en position gagnante.
 * une fois ceci fait, je crée une balise div dans lequel il y aura  7 balise img
 * enfin je l'ajoute à mon DOM après le titre h1
 * 
 * @returns void
 */
function initialierPlateau() {
    // 1 - Création des plateaux de jeu
    for( let i = 0; i < TAILLE; i++) {
        if( i < NB_MOUTONS){
            plateauDeJeu[i] = MOUTON_BLANC;
        }
        else if(i > NB_MOUTONS) {
            plateauDeJeu[i] = MOUTON_NOIR;
        }
        else {
            plateauDeJeu[i] = ESPACE_VIDE;
        }
    }

console.log('plateauDeJeu : ' + plateauDeJeu);

    //Création du plateau gagnant
    for( let i = 0; i < TAILLE; i++) {
        if( i < NB_MOUTONS){
            plateauGagnant[i] =  MOUTON_NOIR;
        }
        else if(i > NB_MOUTONS) {
            plateauGagnant[i] = MOUTON_BLANC;
        }
        else {
            plateauGagnant[i] = ESPACE_VIDE;
        }
    }
    console.log('plateauGagnant : ' + plateauGagnant);

    // Manipulation du DOM pour afficher le plateau vierge (Visuellement)
    dom_h1 = document.getElementById('titreH1');
    dom_plateau = document.createElement('div');
    dom_plateau.setAttribute('id', 'plateauDeJeu');
    dom_h1.after(dom_plateau);
}

/**************************************************************
 * Fonction afficherPlateauDeJeu() qui va crée les balises img.
 * Celles-ci auront pour le backgound-image un mouton blanc ou noir
 * ou couleur blanche
 *****************************************************************/

function afficherPlateauDeJeu() {
    dom_plateau = document.getElementById('plateauDeJeu');
    dom_h1 = document.getElementById('titreH1');

    // Avant de remplir ( en HTML) les moutons dans le plateau de jeu.
    // Je vérifie si ma balise a des enfants
    // Si oui, je supprime le 1er enfant de la liste
    while(dom_plateau.hasChildNodes()){
        dom_plateau.removeChild(dom_plateau.children[0]);

    }

    for( let i = 0 ; i < TAILLE ; i++) {
        // A chaque tour de boucle, je crée une balise img, je la personnalise, je l'ajoute 
        // à la suite dans la div du plateauDeJeu (qui sera détruite à la fin de la boucle)
        
        let dom_img = document.createElement('img');
        dom_img.setAttribute('class', 'image');
        dom_img.setAttribute('onclick', 'jouerUnCoup('+ i +')');

        //Ici, on vérifie quel mouton est présent dans le tableau JS pour savoir quel
        //mouton afficher en tant que src='image/'.
        switch (plateauDeJeu[i]) {

            case MOUTON_BLANC : 
                // faire des doubles back slash \\ pour faire les chemins
                dom_img.setAttribute('src', '../img/sheep_w.png');
                dom_img.setAttribute('alt', 'mouton blanc');
                break;
                
            case MOUTON_NOIR: 
                dom_img.setAttribute('src', '../img/sheep_b.png'); 
                dom_img.setAttribute('alt', 'mouton noir');
                break;    
                default: 
             break;    
        }
        dom_plateau.append(dom_img); 
    } 
} 


/**
 * Fonction jouerUnCoupp() qui vérifie si le déplacement est possible
 * si oui,
 * - modifier le tableau plateauDeJeu
 * -  mettre à jour la valeur de l'attribut src.
 * Le param index représente le numéro d'indice que j'utilise pour vérifier la validité du déplacement.
 * @param {*} index 
 */

function jouerUnCoup(index){
    if (plateauDeJeu[index] == MOUTON_BLANC) {
        if (plateauDeJeu[index + 1] == ESPACE_VIDE) {
            plateauDeJeu[index + 1] = MOUTON_BLANC; 
            plateauDeJeu[index] = ESPACE_VIDE;
    }
    else if(plateauDeJeu[index + 1] == MOUTON_NOIR && plateauDeJeu[index + 2] == ESPACE_VIDE ) {
            plateauDeJeu[index + 2] = MOUTON_BLANC;
            plateauDeJeu[index] = ESPACE_VIDE;
   }
}      
    else if(plateauDeJeu[index] == MOUTON_NOIR) {
         if(plateauDeJeu[index - 1] == ESPACE_VIDE) {
            plateauDeJeu[index - 1] = MOUTON_NOIR;
            plateauDeJeu[index] = ESPACE_VIDE;
        }
       else if(plateauDeJeu[index - 1] == MOUTON_BLANC && plateauDeJeu[index - 2] == ESPACE_VIDE){
            plateauDeJeu[index - 2] = MOUTON_NOIR;
            plateauDeJeu[index] = ESPACE_VIDE;
        }   
        else{

    }
    }

    console.log('plateauDeJeu: ' + plateauDeJeu);
    afficherPlateauDeJeu();

    aGagner = verifJeu();
    if(aGagner == true) {
        dom_h1.innerText = 'BRAVO, C\'est gagné !!!';
    }
}       

/**
 * Le temps passe vite ici documentation
 * @returns // booleen
 */
function verifJeu(){
    let compteur = 0;
    for(let i = 0; i < TAILLE ; i++) {
        if(plateauDeJeu[i] == plateauGagnant[i]){
            compteur++;
        }
    }
    if(compteur === TAILLE) {
        return true;
    }
    else{
        return false;
    }
}
 