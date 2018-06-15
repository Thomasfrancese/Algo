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
    {x: 2, y: 1, value: "V", id: 10},
    {x: 2, y: 2, value: 11, id: 11},
    {x: 2, y: 3, value: 12, id: 12},
    {x: 3, y: 0, value: 13, id: 13},
    {x: 3, y: 1, value: 14, id: 14},
    {x: 3, y: 2, value: 10, id: 15},
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

let typeCase;

$(document).ready(function () {

    //Lorsque l'on click sur le bouton newgame générer une nouvelle partie
    $(".newgameChiffres").click(function () {
        //Afficher le plateau de jeu
        deleteTable();
        //Générer un tableau de valeurs aléatoires
        tableauAlea = generateTableValue();
        //Créer le plateau de jeu grâce au tableau de valeurs aléatoires
        board = createBoard(tableauAlea, board);
        //Sauvegarder le board dans son état initial
        boardInitial = createBoard(tableauAlea, boardInitial);
        //Afficher le plateau de jeu vide
        typeCase = "caseChiffre";
        generateCadre(board, typeCase);
        //Mettre les valeurs dans le plateau de jeu
        updateValues(board, typeCase);
        //Définir si le plateau de jeu généré (sous forme de tableau simple) est soluble ou pas : renvoi true of false
        soluble = solubleOrNot(tableauAlea);
        narguer(soluble);

    })

    $(".newgameImage").click(function () {
        //Afficher le plateau de jeu
        deleteTable();
        //Générer un tableau de valeurs aléatoires
        tableauAlea = generateTableValue();
        //Créer le plateau de jeu grâce au tableau de valeurs aléatoires
        board = createBoard(tableauAlea, board);
        //Sauvegarder le board dans son état initial
        boardInitial = createBoard(tableauAlea, boardInitial);
        //Afficher le plateau de jeu vide
        typeCase = "";
        generateCadre(board, typeCase);
        //Mettre les valeurs dans le plateau de jeu
        updateValues(board, typeCase);
        //Définir si le plateau de jeu généré (sous forme de tableau simple) est soluble ou pas : renvoi true of false
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

    // $(".resolution").click(function () {
    //     let indexVide = boardInitial.findIndex(i => i.value === "V");
    //
    //     resoudreTaquin(indexVide, 0, -1 );
    //     console.log("tableau meilleurs mouvements : " + best_moves)
    //     // console.log("best-depth : " + best_depth);
    //     // console.log("best-moves : " + best_moves);
    //     // console.log("moves : " + moves);
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

//Profondeur maximum (nb de permutations)
let max_depth = 15;
//Tableau contenant les déplacements à effectuer
let moves = [];
//Tableau contenant la meilleure solution pour résoudre le taquin
let best_moves = [];
//Nb minimum de mouvements
let best_depth = max_depth;

//Fonction comparant le board avec la solution
// 0 = différent
// 1 = idem
function isCorrect(){
    for (let i = 0 ; i < boardInitial.length ; i++) {
        if (boardInitial[i].value !== boardGagnant[i].value) {
            return 0;
        }
    }
    return 1;
}

//Fonction permettant de résoudre en profondeur (DFS) le taquin
//indexVide = position actuelle de la case vide
//indexClicked = position du coup précédent
//depth = nb de coups maximum pour résoudre le taquin
function resoudreTaquin(indexVide, depth, indexClicked){
    //Si le nombre de coups est supérieur à la limite, arrêter la recherche sur cette branche
    if (depth >= best_depth){
        return;
    }

    //Dès qu'il y a un mouvement, enregistrer la valeur dans le tableau des déplacements "moves"
    if (depth != 0){
        moves[depth-1] = boardInitial[indexClicked].value;
        // moves.push(boardInitial[indexClicked].value);
        console.log("moves : " + moves);
    }

    //Si le plateau de jeu actuel correspond à celui gagnant
    if(isCorrect() === 1){
        console.log("Solution trouvé en "+depth+" mouvements");
        //enregistrer le nombre de déplacements comme "le meilleur"
        best_depth = depth;
        //Enregistrer la solution trouvée dans le tableau de la meilleure solution
        for (let i = 0; i < boardInitial.length ; i++){
            best_moves[i] = moves[i];
        }
        return;
    }

    //Créer les mouvements possibles autour de la case vide
    //Descendre
    let x1 = indexVide + 4;
    //Monter
    let x2 = indexVide -4;
    //Droite
    let x3 = indexVide + 1;
    //Gauche
    let x4 = indexVide - 1;

    //Eviter que la case vide retourne sur la case où elle était le coup précédent
    //Si la nouvelle position correspond à l'ancienne alors bloquer cette nouvelle position en lui donnant une valeur négative
    if ( x1 === indexClicked) {
        x1 = -1;
    }
    if ( x2 === indexClicked ) {
        x2 = -1;
    }
    if ( x3 === indexClicked ) {
        x3 = -1;
    }
    if ( x4 === indexClicked ) {
        x4 = -1;
    }

    //Si la case vide peut bouger vers le bas
    if ( (x1 >= 0) && (x1 < boardInitial.length)){
        //Récupérer la valeur de la case qui va être remplacée par la case vide (indexClicked)
        indexClicked = x1;
        //attribuer à la case vide la valeur de la nouvelle case
        boardInitial[indexVide].value = boardInitial[indexClicked].value;
        //attribuer à la nouvelle case la valeur de la case vide
        boardInitial[indexClicked].value = "V";
        //Appeler la fonction elle même pour continuer la récursivité
        resoudreTaquin(x1, depth + 1, indexVide);

        //Se repositionner sur le plateau de jeu initial
        //La case qui a été remplacée par la case reprend sa valeur initiale
        boardInitial[indexClicked].value = boardInitial[indexVide].value;
        //La case vide reprend sa place
        boardInitial[indexVide].value = "V";
    }

    //Si la case vide peut bouger vers le haut
    if ( (x2 >= 0) && (x2 < boardInitial.length)) {
        //Récupérer la valeur de la case qui va être remplacée par la case vide (indexClicked)
        indexClicked = x2;
        //attribuer à la case vide la valeur de la nouvelle case
        boardInitial[indexVide].value = boardInitial[indexClicked].value;
        //attribuer à la nouvelle case la valeur de la case vide
        boardInitial[indexClicked].value = "V";
        //Appeler la fonction elle même pour continuer la récursivité
        resoudreTaquin(x2, depth + 1, indexVide);

        //Se repositionner sur le plateau de jeu initial
        //La case qui a été remplacée par la case reprend sa valeur initiale
        boardInitial[indexClicked].value = boardInitial[indexVide].value;
        //La case vide reprend sa place
        boardInitial[indexVide].value = "V";
    }

    //Si la case vide peut bouger vers la droite
    // agarder :
    if ( (x3 >= 0) && (x3 < boardInitial.length) && ((x3 !==4) || (x3!==8) || (x3!==12))  ){
        //Récupérer la valeur de la case qui va être remplacée par la case vide (indexClicked)
        indexClicked = x3;
        //attribuer à la case vide la valeur de la nouvelle case
        boardInitial[indexVide].value = boardInitial[indexClicked].value;
        //attribuer à la nouvelle case la valeur de la case vide
        boardInitial[indexClicked].value = "V";
        console.log("index x3 " + x3);
        //Appeler la fonction elle même pour continuer la récursivité
        resoudreTaquin(x3, depth + 1, indexVide);

        //Se repositionner sur le plateau de jeu initial
        //La case qui a été remplacée par la case reprend sa valeur initiale
        boardInitial[indexClicked].value = boardInitial[indexVide].value;
        //La case vide reprend sa place
        boardInitial[indexVide].value = "V";
        console.log("index x3 après la récursivité " + x3);

    }

    //Si la case vide peut bouger vers la gauche
    if ( (x4 >= 0) && (x4 < boardInitial.length) && ((x4 !=3) || (x3!=7) || (x3!=11))){
        //Récupérer la valeur de la case qui va être remplacée par la case vide (indexClicked)
        indexClicked = x4;
        //attribuer à la case vide la valeur de la nouvelle case
        boardInitial[indexVide].value = boardInitial[indexClicked].value;
        //attribuer à la nouvelle case la valeur de la case vide
        boardInitial[indexClicked].value = "V";
        //Appeler la fonction elle même pour continuer la récursivité
        resoudreTaquin(x4, depth + 1, indexVide);

        //Se repositionner sur le plateau de jeu initial
        //La case qui a été remplacée par la case reprend sa valeur initiale
        boardInitial[indexClicked].value = boardInitial[indexVide].value;
        //La case vide reprend sa place
        boardInitial[indexVide].value = "V";
    }

    // console.log("Tableau des meilleurs mouvements : " +best_moves);
}



// resoudreTaquin(indexVide, 0, -1)