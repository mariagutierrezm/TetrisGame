document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    let squares = Array.from(document.querySelectorAll('.grid div'));
    const width = 10;
    const scoreDisplay = document.getElementById('score');
    const startBtn = document.getElementById('start-button');
    let nextRandom = 0;
    let timerId;

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
    let currentRotation = 0; //we will always start at the first rotation

    let random = Math.floor(Math.random()*shapes.length); //random select of shape 
    let current = shapes[random][currentRotation];

    console.log(random, '1ST RANDOM');

    function draw() { 
        current.forEach(index => {
            squares[currentPosition + index].classList.add('shapes'); 
        })
    }

    function undraw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.remove('shapes');
        })
    }

    draw()
    // setinterval = allows us to invoke a function that we pass through it after X amount of time

    

    function control(e) { // to listen when we click a key on our keyboard
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
        undraw(); //we want to undraw
        currentPosition += width; //then write a new width in the current position
        draw(); //then draw it in the new position 
        freeze(); //it invokes it and checks it every second
    }

    function freeze() { //some() checking that the logic that we write is true for some of the items in the array
        //if some of the squares that make the current shape() (of one piece of tetris), if their index plus a whole width contains a square with a class name of taken
        if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
            //we turn each of the shape squares into a square that contains the class of taken 
            current.forEach(index => squares[currentPosition + index].classList.add('taken'))
            //we get another shape to fall down
            random = nextRandom; // we choose a next randomly selected shape and assign it to next Random
            console.log(random, '2ND RANDOM');
            nextRandom = Math.floor(Math.random() * shapes.length);
            console.log(nextRandom, 'NEXTRANDOM');
            // we pass this to the shapes array and it's fast rotation, and set it as the current shape
            current = shapes[random][currentRotation]
            // put it in the current position
            currentPosition = 4;
            //draw the selected shape
            draw();
            displayShape();
        } 
    }

    function moveLeft() {
        undraw(); //remove any previous drawing to have a clean slate
        //define the left edge and if the shape is in it
        //we select the current shape, and check if some of the shape indexes divided by the width leave exactly no remainder
        const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0); //width 10 AKA index 10 and 10/10=0 so means is at the edge
        //shape can only move if is not at the left edge
        if(!isAtLeftEdge) {
            currentPosition -= 1; //shape can move minus 1 of its current position, which will be left (remember is all wrapped but also is going down on index)
        }
        //shape to stop if there is another shape there that has been frozen. take the 'taken' class to assign it to the spaces that have been taken
        //if the squares go into a space that contains a class of taken we want to push it back one space, so it seems it has not moved
        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            currentPosition += 1; //we add one so it moves back to its original space
        }

        draw();
    }

    function moveRight() {
        undraw();
        const isAtRightEdge = current.some(index => (currentPosition + index) % width === width-1); //if the remainder equals its width minus 1
        
        if(!isAtRightEdge) {
            currentPosition += 1;
        }
        
        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            currentPosition -= 1;
        }
        
        draw();
    }

    function rotate() { //to access all shapes inside the shape array
        undraw();
        currentRotation ++;
        if(currentRotation === current.length) { //if the current rotation index is == to 4 (shapes rotations) make it go back to 0 (our first rotation-index in the array)
            currentRotation = 0;
        }
        //if statement is false we pass the current rotation to the current shape
        current = shapes[random][currentRotation];

        draw();

    }

    const displaySquares = document.querySelectorAll('.mini-grid div');
    const displayWidth = 4;
    let displayIndex = 0;

    const nextShape = [ //shapes without rotation
        [1, displayWidth + 1, displayWidth * 2 + 1, 2], //lshape
        [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1], //zshape
        [1, displayWidth, displayWidth + 1, displayWidth + 2], //tshape
        [0, 1, displayWidth, displayWidth + 1], //oshape
        [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1] //ishape
    ];

    

    //display the shape in the mini-grid
    function displayShape() {
        //using all the divs in the mini-grid we are grabbing all the items and remove any trace of shape class from it
        displaySquares.forEach(item => {
           item.classList.remove('shapes'); 
        }); 
        //going into the nextShape array
        nextShape[nextRandom].forEach(index => { //for each square(item) that makes our random selected shape we add a class of shapes to it
            displaySquares[displayIndex + index].classList.add('shapes');//we pass it to on displaySquares
        });
       
    }
    
    startBtn.addEventListener('click', () => { //if button is clicked
        if (timerId) { //and timerId is not null
            clearInterval(timerId);//pause the game
            timerId = null;
        } else { 
            draw(); //we draw the shape in the default current position
            timerId = setInterval(moveDown, 1000); //assign it to timerId to stop setinterval in the future. This makes the shapes move down every second
            nextRandom = Math.floor(Math.random() * shapes.length); //select the nex random shape to display in th mini grid
            displayShape();//and invoke the display shape function that will display the randomly selected shape we just determined
        } 
    });










})