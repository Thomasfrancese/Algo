var tab = {
    0: [1, 2, 3, 4],
    1: [5, 6, 7, 8],
    2: [9, 10, 11, 12],
    3: [13, 14, 15, 'V']
};

$(document).ready(function () {

    $(".initialiser").click(function() {
        deleteTable();
        etatInitial(tab);
    })


    $(".tableauBody").click(function()  {
       let resultatJoueur = makeTableResult(tab);
       isAWinner(resultatJoueur);

    })
})

// Fonction permettant de générer un tableau
function etatInitial(tab) {
    let count = 1;
    for (let j = 0; j < Object.keys(tab).length; j++) {
        $(".tableauBody").append("<tr id='" + j + "'></tr>>");
        for (let i = 0; i < tab[j].length; i++) {
            $("#" + j).append('<td id="td' + count + '">' + tab[j][i] + '</td>');
            count++;
        }
    }
}


// Fonction pour suprime le tableau
function deleteTable(){
    $("tr").remove();
}


// Fonction pour transformer l'objet en un tableau unique
function makeTableResult(tab){
   let resultat = []
   for (let j = 0; j < Object.keys(tab).length; j++) {
       for (let i = 0; i < tab[j].length; i++) {
           resultat.push(tab[j][i])
       }
   }
   return resultat;
}


// Fonction qui compare si le resultat proposé est égal au resultat attendu
function isAWinner(resultatDuJoueur){
    console.log(resultatDuJoueur);

    var foundEmptyCaseID = resultatDuJoueur.indexOf('V');

    if (foundEmptyCaseID == resultatDuJoueur.length-1) {
        resultatDuJoueur.pop();
        console.log('"V" is the last element of the table');
    } else {
        console.log('"V" is not the last element of the table');
    }


////// Si le tableau est en ordre croissant, décroissant ou non rangé 

    var isDescending = true;
    var isAscending = true;

    for (var i=0, l=resultatDuJoueur.length-1; i<l; i++)
    {

        // Vrai si le premier index est plus grand que index+1
       isDescending = isDescending && (resultatDuJoueur[i] > resultatDuJoueur[i+1]);

       // Vrai si le premier index est plus petit que index+1
       isAscending = isAscending && (resultatDuJoueur[i] < resultatDuJoueur[i+1]);

    }

        if (isAscending)
        {
          console.log('Ascending');
        }
        else if (isDescending) 
        {
          console.log('Descending');
        }
        else
        {
          console.log('Not Sorted');
        }

}
