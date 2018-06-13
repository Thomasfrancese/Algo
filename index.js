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
        // //Récupérer sous forme de tableau unique le plateau de jeu en cours dès qu'on clique sur le jeu
        // let resultatJoueur = makeTableResult(board);
        // //Lorsque le joueur joue, vérifier s'il a gagné à chaque mouvement
        // isAWinner(resultatJoueur);
        // if (isAWinner(resultatJoueur) == true){
        //     alert("Partie gagnée !!!!");
        // }
    })

    $(".initialiser").click(function () {
        //Board reprend la valeur du boardInitial
        board = $.extend(true, [], boardInitial);
        //Afficher les valeurs et bouger les cases
        updateValues(board, typeCase);
    })

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
    //Récupérer sous forme de tableau unique le plateau de jeu en cours dès qu'on clique sur le jeu
    let resultatJoueur = makeTableResult(tab);
    //Lorsque le joueur joue, vérifier s'il a gagné à chaque mouvement
    isAWinner(resultatJoueur);
    if (isAWinner(resultatJoueur) == true){
        alert("Partie gagnée !!!!");
    }
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
                // if (typeCase == "caseChiffre") {
                //     updateValues(board, typeCase);
                // }else{
                //     updateValues(board, '');
                // }
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
                if (typeCase == "caseChiffre") {
                    updateValues(board, typeCase);
                }else{
                    updateValuesImage(board);
                }
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


