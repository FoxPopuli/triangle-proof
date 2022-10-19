
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

// get two angles for each node
// start angle is the smaller one


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
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw lines
    const lineAngles = [];
    for (let i in shapeArr) {

        let j;
        if (+i === 2) {
            j = 0;
        } else {
            j = +i + 1;
        }


        let k;
        if (j === 2) {
            k = 0;
        } else {
            k = j + 1;
        }

        let x1 = shapeArr[i].x;
        let y1 = shapeArr[i].y;

        let x2 = shapeArr[j].x;
        let y2 = shapeArr[j].y;

        let x3 = shapeArr[k].x;
        let y3 = shapeArr[k].y;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        // Get gradient
        let m1 = (y2 - y1)/(x2 - x1);
        let a1 = Math.atan(m1);

        let m2 = (y3 - y1)/(x3 - x1);
        let a2 = Math.atan(m2)

        let angles = [a1, a2].sort( (a, b) => {
            return a < b ? 1 : -1;
        })

        ctx.beginPath();
        ctx.arc(x1, y1, 10, angles[0], angles[1], true);
        ctx.stroke();
        i++;
    }

    let j = 2;
    for (let i in lineAngles) {
        let j = i + 1
        if (j === 3) {j = 0};

        ctx.beginPath();
        let rad = 5;
        ctx.arc(shapeArr[i].x, shapeArr[i].y, rad, );

    }


    // Draw circles
    shapeArr.forEach(vertex => {
        ctx.beginPath();
        ctx.arc(vertex.x, vertex.y, vertex.r, 0, Math.PI*2);
        ctx.fillStyle = 'blue';
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    })


    // get angles
    for (let i in shapeArr) {
        let j;
        if (+i === 2) {
            j = 0;
        } else {
            j = +i + 1;
        }


    }

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