let tab = {
    0: ['V', 1, 3, 4],
    1: [5, 6, 7, 8],
    2: [9, 10, 11, 12],
    3: [13, 14, 15, 2]
};

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
    {x: 2, y: 1, value: 10, id: 10},
    {x: 2, y: 2, value: 11, id: 11},
    {x: 2, y: 3, value: 12, id: 12},
    {x: 3, y: 0, value: 13, id: 13},
    {x: 3, y: 1, value: 14, id: 14},
    {x: 3, y: 2, value: 15, id: 15},
    {x: 3, y: 3, value: "V", id: "vide"}
];
console.log(board);

let resultatJoueur;
let pariteCaseVide;

$(document).ready(function () {
    //Lorsque l'on click sur le bouton initialiser
    $(".initialiser").click(function () {
        deleteTable();
        etatInitial(tab);
        resultatJoueur = makeTableResult(tab);
        solubleOrNot(resultatJoueur);
    })

    $(".tableauBody").click(function () {
        resultatJoueur = makeTableResult(tab);
    })

    testMarion(board);

})

//Fonction permettant de générer un tableau
function etatInitial(tab) {
    let count = 1;
    //Déterminer la parité de la case vide
    let parite;
    for (let j = 0; j < Object.keys(tab).length; j++) {
        $(".tableauBody").append("<tr id='ligne" + j + "'></tr>>");
        for (let i = 0; i < tab[j].length; i++) {
            //Déterminer la parité de la case vide lorsqu'elle est sur cette case (si le modulo de la somme des coordonnées x,y de la case divisé par 2 = 0 alors case paire)
            if ((j + i) == 0){
                parite = "Pair";
            }
            else if ((j + i) % 2 == 0) {
                parite = "Pair";
            }
            else {
                parite = "Impair"
            }
            $("#ligne" + j).append('<td id="' + count + '" class="' + parite + '">' + tab[j][i] + '</td>');
            count++;
        }
    }
}

//Fonction permettant de générer un tableau
function testMarion(tab) {
    //Déterminer la parité de la case vide
    let parite;
    for (let j = 0; j < Object.keys(tab).length; j++) {
        if (j == 0 || j == 4 || j==8 || j==12) {
            $(".tableauBody").append("<tr id='ligne" + tab[j].x + "'></tr>>");
        }
        //Déterminer la parité de la case vide lorsqu'elle est sur cette case
        if ((tab[j].x + tab[j].y) % 2 == 0) {
            parite = "Pair";
        }else {
            parite = "Impair";
        }
        $("#ligne" + tab[j].x).append('<td id="' + tab[j].id + '" class="'+ parite +'">' + tab[j].value + '</td>');
    }
}

// Fonction pour supprimer le tableau
function deleteTable() {
    $("tr").remove();
}

//Fonction pour transformer l'objet en un tableau unique
function makeTableResult(tab) {
    let resultat = [];
    for (let j = 0; j < Object.keys(tab).length; j++) {
        for (let i = 0; i < tab[j].length; i++) {
            resultat.push(tab[j][i]);
        }
    }
    return resultat;
}

//Fonction permettant de retourner la parité de la case vide
function getPariteCaseVide(tableauResultat) {
    //trouver l'index dans le tableau de la case vide
    let indexV = tableauResultat.indexOf("V");
    //retourner la classe de la case vide qui correspond à sa parité
    let pariteCaseVide = $("#" + (indexV + 1)).attr('class');
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
        console.log("jai bougé le V")
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
            console.log("J'échange " + toMove + " avec le max : " + max);
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
    console.log("parite : " + parite);
    return parite;
}

function solubleOrNot(tableauResultat) {
    pariteCaseVide = getPariteCaseVide(tableauResultat);
    pariteTransposition = getPariteTransposition(tableauResultat);
    let soluble = true;
    if (pariteCaseVide != pariteTransposition) {
        soluble = false;
    }
    console.log("parite case vide : " + pariteCaseVide + " parité transposition : " + pariteTransposition);
    console.log("soluble : " + soluble);
    return soluble;
}