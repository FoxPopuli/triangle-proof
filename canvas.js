const canvasHeight = window.innerHeight;
const canvasWidth = window.innerWidth;



const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
canvas.height = canvasHeight;
canvas.width = canvasWidth;

const canvas2 = document.querySelector('#canvas2');
const ctx2 = canvas2.getContext('2d');
canvas2.height = canvasHeight;
canvas2.width = canvasWidth;

// get two angles for each node
// start angle is the smaller one
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        canvas2.classList.toggle('hidden')
    }
})

let vertices = [
    {x: 100, y: 100, r: 5}, 
    {x: 200, y: 200, r: 5}, 
    {x: 100, y: 200, r: 5}
];

let isDragging = false;
let startX;
let startY;
let currentShape;

function draw (shapeArr) {
    // Clear the canvases
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);

    // Draw top layer
    ctx2.beginPath();
    ctx2.moveTo(0, 0);
    ctx2.lineTo(canvas2.width, 0);
    ctx2.lineTo(canvas2.width, canvas2.height);
    ctx2.lineTo(0, canvas2.height);
    ctx2.closePath();
    // ctx2.fillStyle = 'green';
    // ctx2.fill();
    ctx2.stroke();

    // Draw triangle 
    ctx.beginPath();
    ctx.moveTo(vertices[0].x, vertices[0].y);
    ctx.lineTo(vertices[1].x, vertices[1].y);
    ctx.lineTo(vertices[2].x, vertices[2].y);
    ctx.closePath();
    ctx.stroke();

    // Draw anti-triangle
    // ctx2.begin
    


    // Draw circles
    shapeArr.forEach(vertex => {
        ctx.beginPath();
        ctx.arc(vertex.x, vertex.y, vertex.r, 0, Math.PI*2);
        ctx.fillStyle = 'blue';
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    })

    // Draw anti-circles
    shapeArr.forEach(vertex => {
        ctx2.beginPath();
        ctx2.arc(vertex.x, vertex.y, vertex.r, 0, Math.PI*2, true);
        ctx2.stroke();
        // ctx2.closePath();
    })

}
draw(vertices);


function getArc(shape) {
    ctx.beginPath();
    ctx.arc(shape.x, shape.y, shape.r, 0, Math.PI*2);
    ctx.closePath();
}

// function isClickInShape(clickX, clickY, shape) {

//     return ctx.isPointInPath(clickX, clickY);

// }

canvas.onmousedown = function (e) {
    // Prevent default behaviour
    e.preventDefault();

    // Get abs position of canvas
    let rect = this.getBoundingClientRect(); 
    // Adjust mouse
    startX = e.clientX - rect.left;
    startY = e.clientY - rect.top;

    vertices.forEach(vertex => {
        getArc(vertex);
        if (ctx.isPointInPath (startX, startY)) {
            isDragging = true;
            currentShape = vertex;      
        }
    })


};

canvas.onmouseup = function (e) {
    e.preventDefault();
    if (isDragging) {
        isDragging = false;
    }
}

canvas.onmouseout = function (e) {
    e.preventDefault();
    if (isDragging) {
        isDragging = false;
    }
}

canvas.onmousemove = function (e) {
    if (!isDragging) {return};
    e.preventDefault();

    // Get abs position of canvas
    let rect = this.getBoundingClientRect(); 

    // Adjust mouse
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    let dx = x - startX;
    let dy = y - startY;

    currentShape.x += dx;
    currentShape.y += dy; 

    draw(vertices);

    startX = x;
    startY = y;

    console.log(vertices[0].x, vertices[0].y)
}