//Plateau de jeu pour jouer
let board = [
    {x: 0, y: 0, value: 1, id: 1},
    {x: 0, y: 1, value: 2, id: 2},
    {x: 0, y: 2, value: 3, id: 3},
    {x: 0, y: 3, value: 4, id: 4},
    {x: 1, y: 0, value: 5, id: 5},
    {x: 1, y: 1, value: 6, id: 6},
    {x: 1, y: 2, value: 7, id: 7},
    {x: 1, y: 3, value: 8, id: 8},
    {x: 2, y: 0, value: 9, id: 9},
    {x: 2, y: 1, value: "V", id: 10},
    {x: 2, y: 2, value: 11, id: 11},
    {x: 2, y: 3, value: 12, id: 12},
    {x: 3, y: 0, value: 13, id: 13},
    {x: 3, y: 1, value: 14, id: 14},
    {x: 3, y: 2, value: 10, id: 15},
    {x: 3, y: 3, value: 15, id: 16}
];

//Plateau de jeu initial
let boardInitial = [
    {x: 0, y: 0, value: 1, id: 1},
    {x: 0, y: 1, value: 2, id: 2},
    {x: 0, y: 2, value: 3, id: 3},
    {x: 0, y: 3, value: 4, id: 4},
    {x: 1, y: 0, value: 5, id: 5},
    {x: 1, y: 1, value: 6, id: 6},
    {x: 1, y: 2, value: 7, id: 7},
    {x: 1, y: 3, value: 8, id: 8},
    {x: 2, y: 0, value: 9, id: 9},
    {x: 2, y: 1, value: 10, id: 10},
    {x: 2, y: 2, value: 11, id: 11},
    {x: 2, y: 3, value: 12, id: 12},
    {x: 3, y: 0, value: 13, id: 13},
    {x: 3, y: 1, value: 14, id: 14},
    {x: 3, y: 2, value: "V", id: 15},
    {x: 3, y: 3, value: 15, id: 16}
];

//Plateau de jeu gagnant
let boardGagnant = [
    {x: 0, y: 0, value: 1, id: 1},
    {x: 0, y: 1, value: 2, id: 2},
    {x: 0, y: 2, value: 3, id: 3},
    {x: 0, y: 3, value: 4, id: 4},
    {x: 1, y: 0, value: 5, id: 5},
    {x: 1, y: 1, value: 6, id: 6},
    {x: 1, y: 2, value: 7, id: 7},
    {x: 1, y: 3, value: 8, id: 8},
    {x: 2, y: 0, value: 9, id: 9},
    {x: 2, y: 1, value: 10, id: 10},
    {x: 2, y: 2, value: 11, id: 11},
    {x: 2, y: 3, value: 12, id: 12},
    {x: 3, y: 0, value: 13, id: 13},
    {x: 3, y: 1, value: 14, id: 14},
    {x: 3, y: 2, value: 15, id: 15},
    {x: 3, y: 3, value: "V", id: 16}
];
//Type de case : chiffre ou image
let typeCase;
let tableauGagnant = [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,"V"]];
//correspond au plateau de jeu sous forme d'un tableau 2 dimensions (utile pour le DFS)
let tableauJeu = [];
//Déterminer le nombre de mouvements
let nbMouv = 23;

//Profondeur maximum (nb de permutations)
let max_depth = 0;
//Tableau contenant les déplacements à effectuer
// let moves = [];
//Tableau contenant la meilleure solution pour résoudre le taquin
let best_moves = [];
//Nb minimum de mouvements
let best_depth = max_depth;



$(document).ready(function () {

    //Lorsque l'on click sur le bouton newgame générer une nouvelle partie
    $(".newgameChiffres").click(function () {
        //Afficher le plateau de jeu
        deleteTable();
        //-------------------- ANCIENNE VERSION ----------------------
        //Générer un tableau de valeurs aléatoires
        // tableauAlea = generateTableValue();
        //Créer le plateau de jeu grâce au tableau de valeurs aléatoires
        // board = createBoard(tableauAlea, board);

        // -------------------- NOUVELLE VERSION -----------------
        //Générer un tableau de mouvements obligatoires
        let tabMouv = tableauDeMouvements(nbMouv);
        console.log("Tableau de mouvements obligatoires : " + tabMouv);
        //Créer un tableau de jeu 2 dimensions avec les mouvements aléatoires
        tableauJeu = creerTableauJeu(tabMouv, tableauGagnant);
        //Créer sous forme d'un tableau d'objets le plateau de jeu
        board = creerTableauObjets(tableauJeu, board);

        // -------------------- PARTIE COMMUNE -----------------
        //Sauvegarder le board dans son état initial
        boardInitial = $.extend(true, [], board);
        //Afficher le plateau de jeu vide
        typeCase = "caseChiffre";
        generateCadre(board, typeCase);
        //Mettre les valeurs dans le plateau de jeu
        updateValues(board, typeCase);
        //Définir si le plateau de jeu généré (sous forme de tableau simple) est soluble ou pas : renvoi true of false
        tableauAlea = creerSimpleTableau(tableauJeu); //A AJOUTER QUE POUR LA NOUVELLE VERSION
        soluble = solubleOrNot(tableauAlea);
        //Afficher un message si c'est soluble or not
        narguer(soluble);
    })

    $(".newgameImage").click(function () {
        //Afficher le plateau de jeu
        deleteTable();
        //-------------------- ANCIENNE VERSION ----------------------
        // //Générer un tableau de valeurs aléatoires
        // tableauAlea = generateTableValue();
        // //Créer le plateau de jeu grâce au tableau de valeurs aléatoires
        // board = createBoard(tableauAlea, board);

        //-------------------- NOUVELLE VERSION ----------------------
        //Générer un tableau de mouvements obligatoires
        let tabMouv = tableauDeMouvements(nbMouv);
        console.log("Tableau de mouvements obligatoires + " + tabMouv);
        //Créer un tableau de jeu 2 dimensions avec les mouvements aléatoires
        tableauJeu = creerTableauJeu(tabMouv, tableauGagnant);
        //Créer sous forme d'un tableau d'objets le plateau de jeu
        board = creerTableauObjets(tableauJeu, board);

        //-------------------- PARTIE COMMUNE ----------------------
        //Sauvegarder le board dans son état initial
        boardInitial = $.extend(true, [], board);
        //Afficher le plateau de jeu vide
        typeCase = "";
        generateCadre(board, typeCase);
        //Mettre les valeurs dans le plateau de jeu
        updateValues(board, typeCase);
        //Définir si le plateau de jeu généré (sous forme de tableau simple) est soluble ou pas : renvoi true of false
        tableauAlea = creerSimpleTableau(tableauJeu); //A AJOUTER QUE POUR LA NOUVELLE VERSION
        soluble = solubleOrNot(tableauAlea);
        narguer(soluble);
    })

    $(".taquin").click(function () {
        //Récupérer sous forme de tableau unique le plateau de jeu en cours dès qu'on clique sur le jeu
        let resultatJoueur = makeTableResult(board);
        //Lorsque le joueur joue, vérifier s'il a gagné à chaque mouvement
        isAWinner(resultatJoueur);
        if (isAWinner(resultatJoueur) == true){
            setTimeout(function()
            {
                alert("Partie gagnée !!!!");
            }, 500);
        }
    })

    $(".initialiser").click(function () {
        //Board reprend la valeur du boardInitial
        board = $.extend(true, [], boardInitial);
        //Afficher les valeurs et bouger les cases
        updateValues(board, typeCase);
    })

    $(".resolution").click(function () {
        //Tableau regroupant les états connus lors de la résolution
        let connus = [];
        //Tableau contenant les mouvements à effectuer pour résoudre le taquin
        let moves = [];
        //Résoudre le taquin
        console.log("Profondeur max pour la résolution : " + max_depth);
        searchDFS(tableauJeu, 0, connus, moves);
        //Afficher la solution dans la div
        $(".titreSolution").show();
        $(".solution").html(moves.join(" - ")).show();
    })

    // $(".deplacer").click(function () {
    //     let test = ["Up", "Down", "Left", "Right", "Right"];
    //     deplacerCaseVide(board, "caseChiffre", test);
    // })
})


//Fonction permettant de générer un tableau vide
function generateCadre(tab, classeCss) {
    //Déterminer la parité de la case vide
    let parite;
    for (let j = 0; j < Object.keys(tab).length; j++) {
        if (j == 0 || j == 4 || j == 8 || j == 12) {
            $(".taquin").append("<div class='row' id='ligne" + tab[j].x + "'></div>");
        }
        //Déterminer la parité de la case vide lorsqu'elle est sur cette case
        if ((tab[j].x + tab[j].y) % 2 == 0) {
            parite = "Pair";
        } else {
            parite = "Impair";
        }
        $("#ligne" + tab[j].x).append('<div id="' + tab[j].id + '" class="' + parite + ' col-md-3 res '+ classeCss+'"></div>');
    }
    moveCase(tab, classeCss);
}

//Fonction permettant d'ajouter l'image dans le plateau de jeu
function updateValuesImage(tab) {
    for (let j = 0; j < Object.keys(tab).length; j++) {
        $("#"+ (j+1)).html('<img class="caseImage" src="image/'+tab[j].value+'.png">');
    }
    $(".resultatImage").show();
    $(".resultatImage").html('Résultat <br><img src="image/resultat_image.png">');
}

//Fonction permettant d'ajouter les valeurs dans le plateau de jeu
function updateValues(tab, classeCss) {
    if (classeCss != '') {
        for (let j = 0; j < Object.keys(tab).length; j++) {
            $("#" + (j + 1)).html(tab[j].value);
            //Ajouter une classe "vide" à la case vide
            if (tab[j].value == "V") {
                $("#" + (j + 1)).addClass("vide");
            } else {
                $("#" + (j + 1)).removeClass("vide");
            }
        }
        $(".resultatImage").hide();
    }else{
        updateValuesImage(tab);
    }
    moveCase(tab, classeCss);
}


// Fonction pour supprimer le tableau
function deleteTable() {
    $("div.row").remove();
}

//Fonction pour transformer l'objet en un tableau unique
function makeTableResult(tab) {
    let resultat = [];
    for (let j = 0; j < tab.length; j++) {
            resultat.push(tab[j].value);
    }
    return resultat;
}

//Fonction permettant de retourner la parité de la case vide
function getPariteCaseVide(tableauResultat) {
    //trouver l'index dans le tableau de la case vide
    let indexV = tableauResultat.indexOf("V");
    //parité
    let pariteCaseVide = "Pair";
    //Si la case vide n'est pas à la fin du tableau, déterminer sa parité
    if (indexV != (tableauResultat.length - 1)) {
        //Checker si la case a la classe "Impair" pour déterminer sa parité
        let isImpair = $("#" + (indexV + 1)).hasClass("Impair");
        if (isImpair){
            pariteCaseVide = "Impair";
        }
    }
    console.log("parité case vide : " + pariteCaseVide);
    return pariteCaseVide;
}

//Fonction pour déterminer si le jeu est soluble ou pas en prenant en paramètre un tableau (résultat du joueur)
function getPariteTransposition(tableauResultat) {
    //Tableau permettant de stocker le résultat du tri
    let resultat = [];
    //Variable stockant le nombre de transpositions
    let count = 0;
    //Retrouver l'index de la case Vide (valeur = V)
    indexV = tableauResultat.indexOf("V");
    if (indexV != (tableauResultat.length - 1)) {
        //Récupérer la valeur qui se trouve à la fin du tableau (il s'agir de la case qui va être échangée avec le V)
        let toMove = tableauResultat[(tableauResultat.length - 1)];
        //Mettre le V en dernière position
        tableauResultat[indexV] = toMove;
        //Remplacer la position initiale du V par la valeur qui était à la fin du tableau
        tableauResultat[(tableauResultat.length - 1)] = "V";
        count++;
    }
    //Supprimer la case vide du tableau
    tableauResultat.pop();

    //Boucler sur le tableau
    for (let i = (tableauResultat.length - 1); i >= 0; i--) {
        //Trouver le plus petit nombre du tableau
        let max = Math.max(...tableauResultat);
        //Trouver l'index du maximum
        let indexMax = tableauResultat.indexOf(max);
        //Récupérer dans une variable la case courante
        let toMove = tableauResultat[i];
        //Si l'index du max et l'index courant sont différents, échanger les cases
        if (indexMax != i) {
            tableauResultat[indexMax] = toMove;
            tableauResultat[i] = max;
            count++;
        }
        //Ajouter dans le tableau résultat le max
        resultat.push(max);
        //Supprimer le max du tableau
        tableauResultat.pop();
    }
    //Définir si le nombre de transposition est paire ou impaire
    let parite;
    if (count % 2 == 0) {
        parite = "Pair";
    } else {
        parite = "Impair";
    }
    console.log("nb transpositions : " + count);
    console.log("parite transposition : " + parite);
    return parite;
}

function solubleOrNot(tableauResultat) {
    pariteCaseVide = getPariteCaseVide(tableauResultat);
    pariteTransposition = getPariteTransposition(tableauResultat);
    let soluble = true;
    if (pariteCaseVide != pariteTransposition) {
        soluble = false;
    }
    console.log("soluble : " + soluble);
    return soluble;
}


// Fonction qui compare si le resultat proposé est égal au resultat attendu
function isAWinner(resultatDuJoueur) {
    var foundEmptyCaseID = resultatDuJoueur.indexOf('V');

    if (foundEmptyCaseID == resultatDuJoueur.length - 1) {
        resultatDuJoueur.pop();
    }

////// Si le tableau est en ordre croissant, décroissant ou non rangé 

    var isDescending = true;
    var isAscending = true;

    for (var i = 0, l = resultatDuJoueur.length - 1; i < l; i++) {

        // Vrai si le premier index est plus grand que index+1
        isDescending = isDescending && (resultatDuJoueur[i] > resultatDuJoueur[i + 1]);

        // Vrai si le premier index est plus petit que index+1
        isAscending = isAscending && (resultatDuJoueur[i] < resultatDuJoueur[i + 1]);

    }

    if (isAscending) {
        return true;
    }

}

function moveCase(board, typeCase){
    $(".res").click( function(){
        //Récupérer l'id de la case cliquée
        let divIdClicked = $(this).attr('id');

        let clickedX = board[divIdClicked-1].x;
        let clickedY = board[divIdClicked-1].y;
        let indexVide = board.findIndex(i => i.value === 'V');
        let videX = board[indexVide].x;
        let videY = board[indexVide].y;

        if(videX === clickedX){
            if(clickedY == videY-1 || clickedY == videY + 1){
                //Stocker la valeur de la case cliquée
                let valueClickedCase = board[divIdClicked-1].value;
                //Récupérer la position de la case vide dans le tableau "board"
                let indexCaseVide = board.findIndex(i => i.value === 'V');
                //Attribuer à la case cliquée la valeur "vide"
                board[divIdClicked-1].value = "V";
                //Appliquer à la case vide la valeur de la case cliquée
                board[indexCaseVide].value = valueClickedCase;
                //Afficher le plateau de jeu MAJ
                updateValues(board, typeCase);
            }
        }else if(videY === clickedY) {
            if (clickedX == videX - 1 || clickedX == videX + 1) {
                //Stocker la valeur de la case cliquée
                let valueClickedCase = board[divIdClicked - 1].value;
                //Récupérer la position de la case vide dans le tableau "board"
                let indexCaseVide = board.findIndex(i => i.value === 'V');
                //Attribuer à la case cliquée la valeur "vide"
                board[divIdClicked - 1].value = "V";
                //Appliquer à la case vide la valeur de la case cliquée
                board[indexCaseVide].value = valueClickedCase;
                //Afficher le plateau de jeu MAJ
                updateValues(board, typeCase);
            }
        }
    })
}

//Fonction générant un tableau simple avec l'ensemble des cases dispatchées aléatoirement
function generateTableValue(){
    //Générer un tableau avec l'ensemble des valeurs à disposer sur le plateau de jeu 1 à 15
    let tableau = [];
    for (let i = 1; i <= 15; i++ ){
        tableau.push(i);
    }
    //Ajouter la case vide dans ce tableau
    tableau.push("V");

    //Créer un tableau qui contiendra le résultat final
    let resultat = [];
    //Tant que le nouveau tableau n'est pas complet, le compléter
    while(resultat.length < 16) {
        //Générer un nombre aléatoire correspondant à un index du tableau
        let min = Math.ceil(0);
        let max = Math.floor((tableau.length - 1));
        let alea = Math.floor(Math.random() * (max - min +1)) + min;
        //Récupérer la valeur dont l'index a été tiré au sort
        let value = tableau[alea];
        //Ajouter la valeur (dont l'index a été sélectionné) dans le tableau de résultat final
        resultat.push(value);
        //Supprimer la valeur sélectionné dans le tableau initial
        tableau.splice(alea, 1);
    }
    return resultat;
}

//Fonction permettant de créer le plateau de jeu (board) en prenant en paramètre un tableau contenant les valeurs des cases dispatchées aléatoirement
function createBoard(tableAlea, board){
    //Parcourir le plateau de jeu (tableau d'objets)
    for (let i = 0; i < Object.keys(board).length; i++){
        board[i].value = tableAlea[i];
    }
    return board;
}

//Fonction pour narguer le joueur
function narguer(condition){
    let resultat = 'Cette partie est impossible à résoudre mais si tu es ambitieux ... sinon "nouveau jeu"';
    if (condition){
        resultat = "Je veux pas te mettre la pression mais cette partie peut être gagnée, c'est mathématique!";
    }
    $("#solubleOrNot").html(resultat);
}

//Fonction permettant de transformer en un tableau 2 dimensions, le plateau de jeu format tableau d'objets
function modifyData(board){
    let resultat = [[],[],[], []];

    for (let i = 0; i < board.length; i++){
        resultat[board[i].x][board[i].y] = board[i].value;
    }
    return resultat;
}

//Fonction retournant les coordonnées de la case vide dans un tableau à 2 dimensions
function findCoordVide(tableauJeu){
    let origineX="";
    let origineY="";
    for (let i = 0; i < tableauJeu.length; i++){
        for (let j = 0; j < tableauJeu[i].length; j++){
            if (tableauJeu[i][j] == "V"){
                origineX = i;
                origineY = j;
                return [origineX, origineY];
            }
        }
    }
}

//Fonction permettant de déterminer si le tableau de jeu est le même que le gagnant (tableau 2 dimensions)
function isCorrect(tableauJeu){
    for (let i=0; i < tableauJeu.length; i++ ){
        for (let j=0; j < tableauJeu[i].length; j++){
            if (tableauJeu[i][j] != tableauGagnant[i][j]){
                return 0;
            }
        }
    }
    return 1;
}

//Copie un tableau 2 dimensions et le retourne dans un tableau tout neuf
function copyTable(tab){
    let res = [[], [], [], []];
    for (let i = 0; i < tab.length; i++){
        for (let j = 0; j < tab[i].length; j++){
            res[i][j] = tab[i][j];
        }
    }
    return res;
}

//Permet de monter la case vide sur un tableau 2 dimensions
//return : nouveau tableau avec modif si possible ou false si impossible de monter
function up(tableauJeu){
    //Récupérer les coordonnées de la case vide
    let coordVide = findCoordVide(tableauJeu);
    let origineX = coordVide[0];
    let origineY = coordVide[1];
    //Si une case vide existe au-dessus retourner un nouveau tableau avec la permutation
    if (origineX-1 >= 0){
        let res = copyTable(tableauJeu);
        res[origineX][origineY] = res[origineX-1][origineY];
        res[origineX-1][origineY] = "V";
        return res;
    }else {
        return false;
    }
}

//Permet de descendre la case vide sur un tableau 2 dimensions
//return : nouveau tableau avec modif si possible ou false si impossible
function down(tableauJeu){
    //Récupérer les coordonnées de la case vide
    let coordVide = findCoordVide(tableauJeu);
    let origineX = coordVide[0];
    let origineY = coordVide[1];
    //Si une case vide existe au-dessus retourner un nouveau tableau avec la permutation
    if (origineX+1 < tableauJeu.length){
        let res = copyTable(tableauJeu);
        res[origineX][origineY] = res[origineX+1][origineY];
        res[origineX+1][origineY] = "V";
        return res;
    }else {
        return false;
    }
}

//Permet de décaler à gauche la case vide sur un tableau 2 dimensions
//return : nouveau tableau avec modif si possible ou false si impossible
function left(tableauJeu){
    //Récupérer les coordonnées de la case vide
    let coordVide = findCoordVide(tableauJeu);
    let origineX = coordVide[0];
    let origineY = coordVide[1];
    //Si une case vide existe au-dessus retourner un nouveau tableau avec la permutation
    if (origineY-1 >= 0){
        let res = copyTable(tableauJeu);
        res[origineX][origineY] = res[origineX][origineY-1];
        res[origineX][origineY-1] = "V";
        return res;
    }else {
        return false;
    }
}


//Permet de monter la case vide sur un tableau 2 dimensions
//return : nouveau tableau avec modif si possible ou false si impossible de monter
function right(tableauJeu){
    //Récupérer les coordonnées de la case vide
    let coordVide = findCoordVide(tableauJeu);
    let origineX = coordVide[0];
    let origineY = coordVide[1];
    //Si une case vide existe au-dessus retourner un nouveau tableau avec la permutation
    if (origineY+1 < tableauJeu.length){
        let res = copyTable(tableauJeu);
        res[origineX][origineY] = res[origineX][origineY+1];
        res[origineX][origineY+1] = "V";
        return res;
    }else {
        return false;
    }
}

//Fonction de résolution automatique DFS
function searchDFS(jeu, depth, connus, moves){
    //Ajouter l'état actuel sous forme de string dans le tableau des connus
    let etat = jeu.toString();
    connus.push(etat);

    //Vérifier la profondeur max
    if (depth > max_depth){
        return false;
    }
    //Vérifier si le tableau est gagnant
    if (isCorrect(jeu)){
        alert("terminé");
        console.log("solution trouvée en " + depth + " déplacements");
        console.log(moves);
        return true;
    }
    //Monter la case vide en vérifiant si c'est possible et si l'état généré n'est pas déjà connu
    let jeuHaut = up(jeu);
    if (jeuHaut && (connus.indexOf(jeuHaut.toString()) == -1) ){
        if (searchDFS(jeuHaut, depth+1, connus, moves)){
            //Enregistrer le mouvement effectué
            moves[depth] = "Up";
            return true;
        }
    }
    //Décaler à gauche la case vide en vérifiant si c'est possible et si l'état généré n'est pas déjà connu
    let jeuG = left(jeu);
    if (jeuG && (connus.indexOf(jeuG.toString()) == -1) ){
        if (searchDFS(jeuG, depth+1, connus, moves)){
            moves[depth] = "Left";
            return true;
        }
    }
    //Descendre la case vide en vérifiant si c'est possible et si l'état généré n'est pas déjà connu
    let jeuBas = down(jeu);
    if (jeuBas && (connus.indexOf(jeuBas.toString()) == -1) ){
        if (searchDFS(jeuBas, depth+1, connus, moves)){
            moves[depth] = "Down";
            return true;
        }
    }
    //Décaler à droite la case vide en vérifiant si c'est possible et si l'état généré n'est pas déjà connu
    let jeuD = right(jeu);
    if (jeuD && (connus.indexOf(jeuD.toString()) == -1) ){
        if (searchDFS(jeuD, depth+1, connus, moves)){
            moves[depth] = "Right";
            return true;
        }
    }

}

//Génerer un tableau de mouvements aléatoires
function tableauDeMouvements(nbMouv){
   let tab = ["U", "D", "L", "R"];
   let resultat = [];
   while(resultat.length < nbMouv) {
       //Générer un nombre aléatoire correspondant à un index du tableau
       let min = Math.ceil(0);
       let max = Math.floor((tab.length - 1));
       let alea = Math.floor(Math.random() * (max - min +1)) + min;
       //Récupérer la valeur dont l'index a été tiré au sort
       let value = tab[alea];
       //Ajouter la valeur (dont l'index a été sélectionné) dans le tableau de résultat final
       resultat.push(value);
   }
   return resultat;
}

//A partir d'un tableau de mouvements aléatoire et du tableau gagnant, générer un tableau mélangé
function creerTableauJeu(tabMouv, tabGagnant){
    //Créer le tableau de résultat identique à l'état gagnant
    let resultat = copyTable(tabGagnant);

    //Réinitialiser le max_depth : max_depth compte le nb de mouvements réellement effectués et ce nb correspondra à la profondeur max pour la résolution
    max_depth = 0;
    for (let i = 0; i < tabMouv.length; i++) {
        if (tabMouv[i] == "U") {
            if (up(resultat)) {
                resultat = up(resultat);
                max_depth++;
            }
        }
        if (tabMouv[i] == "D") {
            if (down(resultat)) {
                resultat = down(resultat);
                max_depth++;
            }
        }
        if (tabMouv[i] == "L") {
            if (left(resultat)) {
                resultat = left(resultat);
                max_depth++;
            }
        }
        if (tabMouv[i] == "R") {
            if (right(resultat)) {
                resultat = right(resultat);
                max_depth++;
            }
        }
    }
    console.log(max_depth + " mouvements possibles effectués pour mélanger le taquin");

    return resultat;
}

//Créer un tableau de jeu au format "tableau d'objets" à partir d'un tableau 2 dimensions
function creerTableauObjets(tableau2d, board){
    //Compter le nombres d'itérations - correspond à l'index de board
    let count = 0;
    for (let i = 0; i < tableau2d.length; i++){
        for (let j = 0; j < tableau2d[i].length; j++){
            board[count].x = i;
            board[count].y = j;
            board[count].value = tableau2d[i][j];
            count++;
        }
    }
    return board
}

//Créer un tableau simple à partir d'un tableau 2 dimensions
function creerSimpleTableau (tableau2d){
    let resultat = [];
    for (let i = 0; i < tableau2d.length; i++) {
        for (let j = 0; j < tableau2d[i].length; j++) {
            resultat.push(tableau2d[i][j]);
        }
    }
    return resultat;
}

//Fonction permettant de bouger la case vide visuellement avec une autre
function deplacerCaseVide(board, typeCase, moves){
    // //Récupérer l'id de la div où se trouve la case vide
    // let indexCaseVide = board.findIndex(i => i.value === 'V') + 1;
    // // $("#" + (indexCaseVide-4)).fadeTo(1000, 0);
    //Avoir un tableau 2D
    let tableauJeu = modifyData(board);
    for (let i = 0; i < moves.length; i++ ){
        if (moves[i] == "Up"){
            tableauJeu = up(tableauJeu);
        }
        else if (moves[i] == "Down"){
            tableauJeu = down(tableauJeu);
        }
        else if (moves[i] == "Right"){
            tableauJeu = right(tableauJeu);
        }
        else if (moves[i] == "Left"){
            tableauJeu = left(tableauJeu);
        }

        //Transformer en board (tableau d'objets)
        board = creerTableauObjets(tableauJeu, board);
        //Mettre à jour les valeurs
        updateValues(board, "caseChiffre");

    }

}