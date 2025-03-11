var rows = 5;
var columns = 5;
var currentTile;
var otherTile;
var turns = 0;
window.onload = function () {
    for (var r = 0; r < rows; r++) {
        for (var c = 0; c < columns; c++) {
            var tile = document.createElement("img");
            tile.src = "../images/white.jpg";

            tile.addEventListener("dragstart", dragStart); //click on image to drag
            tile.addEventListener("dragover", dragOver);   //drag an image
            tile.addEventListener("dragenter", dragEnter); //dragging an image into another one
            tile.addEventListener("dragleave", dragLeave); //dragging an image away from another one
            tile.addEventListener("drop", dragDrop);       //drop an image onto another one
            tile.addEventListener("dragend", dragEnd);      //after you completed dragDrop
            document.getElementById("board").append(tile);

        }
    }
    var pieces = [];
    for (var i = 1; i <= rows * columns; i++) {
        pieces.push(i.toString());
    }
    pieces.reverse();
    for (var i = 0; i < pieces.length; i++) {
        var j = Math.floor(Math.random() * pieces.length);
        var tmp = pieces[i];
        pieces[i] = pieces[j];
        pieces[j] = tmp;
    }
    for (var i = 0; i < pieces.length; i++) {
        var tile = document.createElement('img');
        tile.src = "../images/" + pieces[i] + ".jpg";

        tile.addEventListener("dragstart", dragStart);
        tile.addEventListener("dragover", dragOver);
        tile.addEventListener("dragenter", dragEnter);
        tile.addEventListener("dragleave", dragLeave);
        tile.addEventListener("drop", dragDrop);
        tile.addEventListener("dragend", dragEnd);

        document.getElementById("pieces").append(tile);

    }
}
function dragStart(){
    currentTile=this;//this refers to image that was clicked on for dragging

}
function dragOver(e){
    e.preventDefault();
}
function dragEnter(e){
    e.preventDefault();
}
function dragLeave(){
    
}
function dragDrop(){
  otherTile=this;//this refers to image that is being dropped on
}
function dragEnd(){
    if(currentTile.src.includes("white")){
        return;
    }
    var currentImg=currentTile.src;
    var otherImg=otherTile.src;
    currentTile.src=otherImg;
    otherTile.src=currentImg;
    turns +=1;
    document.getElementById("turns").innerText=turns;
}