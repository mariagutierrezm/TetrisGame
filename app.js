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












})