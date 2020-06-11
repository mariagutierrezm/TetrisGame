document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    let squares = Array.from(document.querySelectorAll('.grid div'));
    const width = 10;
    const scoreDisplay = document.getElementById('#score');
    const startBtn = document.getElementById('#start-button');


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
    console.log(shapes); 

    let currentPosition = 3;
    let currentRotation = 0; //we will always start at the first rotation

    let random = Math.floor(Math.random()*shapes.length); //random select of shape 
    let current = shapes[random][currentRotation];

    console.log(random, 'Hoho');
    console.log(current, 'HERE');
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

    timerId = setInterval(moveDown, 1000) //assign it to timerId to stop setinterval in the future. This makes the shapes move down every second

    function moveDown(){
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
            random = Math.floor(Math.random() * shapes.length);
            // we pass this to the shapes array and it's fast rotation, and set it as the current shape
            current = shapes[random][currentRotation]
            // put it in the current position
            currentPosition = 4;
            //draw the selected shape
            draw();
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
    console.log('hello'); 
}











})