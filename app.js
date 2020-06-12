document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    let squares = Array.from(document.querySelectorAll('.grid div'));
    const width = 10;
    const scoreDisplay = document.getElementById('score');
    const startBtn = document.getElementById('start-button');
    let nextRandom = 0;
    let timerId;
    let score = 0;
    const colors = [
        'orange',
        'blue',
        'purple',
        'grey',
        'yellow'
    ]

    const lShape = [
        [1, width + 1, width * 2 + 1, 2],
        [width, width + 1, width + 2, width * 2 + 2],
        [1, width + 1, width * 2 + 1, width * 2],
        [width, width * 2, width * 2 + 1, width * 2 + 2]
    ]

    const zShape = [
        [0, width, width + 1, width * 2 + 1],
        [width + 1, width + 2, width * 2, width * 2 + 1],
        [0, width, width + 1, width * 2 + 1],
        [width + 1, width + 2, width * 2, width * 2 + 1]
    ]

    const tShape = [
        [1, width, width + 1, width + 2],
        [1, width + 1, width + 2, width * 2 + 1],
        [width, width + 1, width + 2, width * 2 + 1],
        [1, width, width + 1, width * 2 + 1]
    ]

    const oShape = [
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1]
    ]

    const iShape = [
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3],
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3]
    ]    

    const shapes = [lShape, zShape, tShape, oShape, iShape];

    let currentPosition = 4;
    let currentRotation = 0; 

    let random = Math.floor(Math.random()*shapes.length); 
    let current = shapes[random][currentRotation];

    function draw() { 
        current.forEach(index => {
            squares[currentPosition + index].classList.add('shapes');
            squares[currentPosition + index].style.backgroundColor = colors[random]; 
        })
    }

    function undraw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.remove('shapes');
            squares[currentPosition + index].style.backgroundColor = ""; 
        })
    }

    function control(e) { 
        if(e.keyCode === 37) {
            moveLeft();
        } else if (e.keyCode === 38) {
            rotate();
        } else if (e.keyCode === 39) {
            moveRight();
        } else if (e.keyCode === 40) {
            moveDown();
        }
    }

    document.addEventListener('keydown', control);

    function moveDown() {
        undraw(); 
        currentPosition += width; 
        draw(); 
        freeze(); 
    }

    function freeze() { 
        if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
            current.forEach(index => squares[currentPosition + index].classList.add('taken'));
            random = nextRandom; 
            console.log(random, '2ND RANDOM');
            nextRandom = Math.floor(Math.random() * shapes.length);
            current = shapes[random][currentRotation]
            currentPosition = 4;
            draw();
            displayShape();
            addScore();
            gameOver();
        } 
    }

    function moveLeft() {
        undraw(); 
        const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0); 

        if(!isAtLeftEdge) {
            currentPosition -= 1;
        }
        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            currentPosition += 1; 
        }
        draw();
    }

    function moveRight() {
        undraw();
        const isAtRightEdge = current.some(index => (currentPosition + index) % width === width-1); 
        
        if(!isAtRightEdge) {
            currentPosition += 1;
        }
        
        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            currentPosition -= 1;
        }
        draw();
    }

    function rotate() { 
        undraw();
        currentRotation ++;
        if(currentRotation === current.length) { 
            currentRotation = 0;
        }
        current = shapes[random][currentRotation];
        draw();

    }

    const displaySquares = document.querySelectorAll('.mini-grid div');
    const displayWidth = 4;
    const displayIndex = 0;

    const nextShape = [ //shapes without rotation
        [1, displayWidth + 1, displayWidth * 2 + 1, 2], //lshape
        [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1], //zshape
        [1, displayWidth, displayWidth + 1, displayWidth + 2], //tshape
        [0, 1, displayWidth, displayWidth + 1], //oshape
        [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1] //ishape
    ];

    function displayShape() {
        displaySquares.forEach(item => {
           item.classList.remove('shapes'); 
           item.style.backgroundColor = "";
        }); 
        nextShape[nextRandom].forEach(index => { 
            displaySquares[displayIndex + index].classList.add('shapes');
            displaySquares[displayIndex + index].style.backgroundColor = colors[nextRandom];
        });
    }
    
    startBtn.addEventListener('click', () => { 
        if (timerId) { 
            clearInterval(timerId);
            timerId = null;
        } else { 
            draw(); 
            timerId = setInterval(moveDown, 1000); 
            nextRandom = Math.floor(Math.random() * shapes.length); 
            displayShape();
        } 
    });

    function addScore() {
        for(let i = 0; i< 199; i += width) {
            const row = [i, i+1, i+2, i+3,i+4,i+5,i+6,i+7,i+8,i+9];

            if(row.every(index => squares[index].classList.contains('taken'))) { 
                score += 10; 
                scoreDisplay.innerHTML = score;       
                row.forEach(index => {
                    squares[index].classList.remove('taken');
                    squares[index].classList.remove('shapes');
                    squares[index].style.backgroundColor = "";
                }); 
                const squaresRemoved = squares.splice(i, width);
                console.log(squaresRemoved);  
                squares = squaresRemoved.concat(squares);
                console.log(squares);
                squares.forEach(cell => grid.appendChild(cell)); 
            }
        }
    }

    function gameOver() {
         if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
             scoreDisplay.innerHTML = 'end'; 
              clearInterval(timerId);
         }
        
    }





});