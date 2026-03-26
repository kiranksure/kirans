
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const center = { x: canvas.width / 2, y: canvas.height / 2 };
let lineLength = 100;
let legLength = lineLength / Math.PI; // Set leg length to line length divided by π
let lineAngle = 0;
let legAngle = 0;
const lineRotationSpeed = 1;
const legRotationSpeed = 1 / Math.PI; // Set leg rotation speed to 1 divided by π

// Arrays to store the positions of the leg's endpoint over time
const legPositions = [];

let animationFrameId;
const colors = ['red', 'green'];
let colorIndex = 0;
let tracedColor = colors[colorIndex];

// Function to switch between red and green
function toggleColor() {
    colorIndex = (colorIndex + 1) % colors.length;
    tracedColor = colors[colorIndex];
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the center point
    ctx.beginPath();
    ctx.arc(center.x, center.y, 5, 0, Math.PI * 2, false);
    ctx.fillStyle = 'black';
    ctx.width = 1;
    ctx.fill();

    // Calculate the position of the line end based on the line angle
    const lineEndX = center.x + lineLength * Math.cos((lineAngle * Math.PI) / 180);
    const lineEndY = center.y + lineLength * Math.sin((lineAngle * Math.PI) / 180);

    // Draw the line from the center to the endpoint with the current color
    ctx.beginPath();
    ctx.moveTo(center.x, center.y);
    ctx.lineTo(lineEndX, lineEndY);
    ctx.strokeStyle = "Green";
    ctx.stroke();

    // Calculate the position of the leg based on the leg angle
    const legEndX = lineEndX + legLength * Math.cos((legAngle * Math.PI) / 180);
    const legEndY = lineEndY + legLength * Math.sin((legAngle * Math.PI) / 180);

    // Draw the leg with the current color
    ctx.beginPath();
    ctx.moveTo(lineEndX, lineEndY);
    ctx.lineTo(legEndX, legEndY);
    ctx.strokeStyle = "Blue";
    ctx.stroke();

    // Store the leg's endpoint position in the array
    legPositions.push({ x: legEndX, y: legEndY });

    // Draw the traced path of the leg's endpoint with the current color
    ctx.beginPath();
    ctx.strokeStyle = tracedColor;
    legPositions.forEach((position, index) => {
        ctx.lineTo(position.x, position.y);
        document.getElementById("val").innerHTML = lineAngle+ " " + animationFrameId + " " + index;
    });
    ctx.stroke();

    lineAngle += lineRotationSpeed;
    legAngle += legRotationSpeed;
    animationFrameId = requestAnimationFrame(draw);
}

// Start the animation
draw();

// Add event listener to the stop button
const stopButton = document.getElementById('stopButton');
stopButton.addEventListener('click', () => {
    cancelAnimationFrame(animationFrameId); // Stop the animation
});

// Toggle colors when the traced path is complete
setInterval(() => {
    toggleColor();
}, 2 * Math.PI * (lineLength / lineRotationSpeed));

