
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;




let vertices = [
    {x: 100, y: 100, r: 20}, 
    {x: 200, y: 200, r: 20}, 
    {x: 100, y: 200, r: 20}
];

let isDragging = false;


function drawShapes (shapeArr) {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    shapeArr.forEach(vertex => {
        ctx.beginPath();
        ctx.arc(vertex.x, vertex.y, vertex.r, 0, Math.PI*2);
        ctx.fillStyle = 'blue';
        ctx.fill();
        ctx.stroke();
        ctx.closePath();

        // ctx.beginPath();
        // ctx.arc(vertex.x, vertex.y, (vertex.r)/2, 0, Math.PI*2);
        // ctx.fillStyle = 'red'
        // ctx.fill();
        // ctx.stroke();
        // ctx.closePath();
    })
}
drawShapes(vertices);

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
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;


    vertices.forEach(vertex => {
        getArc(vertex);
        if (ctx.isPointInPath (x, y)) {
            isDragging = true;
            console.log(true);
            
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
    console.log(isDragging);
}