let tab = {
    0: [1, 2, 3, 4],
    1: [5, 6, 7, 8],
    2: [9, 10, 11, 12],
    3: [13, 14, 15, 'V']
};
console.log(tab);

// let tabInit = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,"V"]
$(document).ready(function () {
let count = 0;
    for (let j = 0; j <= 3; j++) {
        $(".tableauBody").append("<tr id='"+ j +"'></tr>>")
        for (let i = 0; i < tab[j].length; i++) {
                $("#" + j).append('<td id="td'+count+'">'+ tab[j][i] +'</td>')
                count++;
        }
    }
})