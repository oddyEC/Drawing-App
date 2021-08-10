// 1. Para la app para dibujar estaba pensando en utilizar p5js pero esto no sería utilizar Vanilla JS como les dije esta no debe tener librerías
// externas. Necesitamos declarar el contexto del canvas y el canvas para definir si será 2d. Ahora vamos a dibujar un circulo con canvas. Para
// ver de que manera dibujaremos dentro de canvas, El elemento canvas de HTML será nuestro lienzo. Bueno ahora quiero tomar la posición del mouse
// en el canvas para esto vamos a poner un console log para ver que atributos debemos tomar. Offset x y offset Y. Listo ya hemos acabado la app (broma)
//Vamos a ver si podemos poner mediante el event mousemove que realice el dibujo bien pero como ven no estoy apretando el click del mouse.

// 2. Ahora quiero que cuando yo de click pueda dibujar y cuando no pues no lo haga entonces vamos a declarar en el evento mousedown. Con esto
// me estoy acercando al objetivo
//Lo que queremos hacer ahora es unificar a los circulos porque se ven un poco raro
// Ahora para poder incrementar el tamaño o reducir el tamaño del circulo que se vaya dibujando
// Ahora vamos a tomar el color.

const canvas = document.getElementById("canvas"); // 1
const increaseBtn = document.getElementById("increase");
const decreaseBtn = document.getElementById("decrease");
const sizeEl = document.getElementById("size");
const colorEl = document.getElementById("color");
const clearEl = document.getElementById("clear");
const ctx = canvas.getContext("2d"); // 1

let size = 30; //1
let isPressed = false; // 2
let color = "black";
let x = undefined; 
let y = undefined; 
/*
canvas.addEventListener("mousedown", (e) =>{
    console.log(e);
})
*/
function drawCircle(x, y) { //1. Sin el fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
}
canvas.addEventListener("mousedown", (e) => {
    isPressed = true;

    x = e.offsetX;
    y = e.offsetY;
});

canvas.addEventListener("mouseup", (e) => {
    isPressed = false;

    x = undefined;
    y = undefined;
});

canvas.addEventListener("mousemove", (e) => { //2
    if (isPressed) {
        const x2 = e.offsetX;
        const y2 = e.offsetY;

        drawCircle(x2, y2);
        drawLine(x, y, x2, y2);
        x = x2;
        y = y2;
    }
});



function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = color;
    ctx.lineWidth = size * 2;
    ctx.stroke();
}

increaseBtn.addEventListener("click", () => {
    size += 5;

    if (size > 50) {
        size = 50;
    }

    updateSizeOnScreen();
});

decreaseBtn.addEventListener("click", () => {
    size -= 5;

    if (size < 5) {
        size = 5;
    }

    updateSizeOnScreen();
});

colorEl.addEventListener("change", (e) => {
    color = e.target.value;
});

clearEl.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

function updateSizeOnScreen() {
    sizeEl.innerText = size;
}
