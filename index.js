const score = document.querySelector('.score');
const popUp = document.querySelector('.startScreen');
const road = document.querySelector('.gameArea');

popUp.addEventListener('click', gameStart);

let player = { speed : 5 , score : 0};



let keys = {ArrowUp : false, ArrowDown : false, ArrowLeft : false, ArrowRight : false}


document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

//key pressed
function keyDown(e) {
    e.preventDefault();

    keys[e.key] = true;
    // console.log(e.key);
    // console.log(keys);
}

//key released
function keyUp(e) {
    e.preventDefault();
    keys[e.key] = false;
    // console.log(e.key);
    // console.log(keys);
}



//check collision
function isCollide(a,b) {
    aRect = a.getBoundingClientRect();
    bRect = b.getBoundingClientRect();

    return !((aRect.top > bRect.bottom) || (aRect.bottom < bRect.top) || (aRect.left > bRect.right) || (aRect.right < bRect.left))
}






// ......................       moveLines function      .............................

function moveLines() {
    let lines = document.querySelectorAll('.lines');

    lines.forEach(function(item) {

        if(item.y >= 700) {
            item.y -= 750;
        }

        item.y += player.speed;
        item.style.top = item.y + "px";

    })
}


// ........................... END GAME  .......................

function endGame() {
    player.start = false;
    popUp.classList.remove('hide');
    popUp.innerHTML = "Game Over <br> Your Score is : " + player.score + "<br> Click here to Start Again";
    

}

// ...........................      move ENEMYCARS function    ......................

function moveEnemyCar(car) {
    let enemyCar = document.querySelectorAll('.enemyCar');

    enemyCar.forEach(function(enemy) {

        if(isCollide(car, enemy)) {
            console.log("BOOM!! HIT!!");
            endGame();
        }

        if(enemy.y >= 700) {
            enemy.y -= 350;
            enemy.style.left = Math.floor(Math.random() * 350) + "px";
        }

        enemy.y += player.speed;
        enemy.style.top = enemy.y + "px";

    })
}






//...................    after start -- to play the game    ........................

function gamePlay() {
    // console.log("Hey i am clicked");
    let car = document.querySelector('.car');
    let gameTrack = road.getBoundingClientRect();
    // console.log(gameTrack); 

    if(player.start) {

        //calling function to move the lines on the roads
        moveLines();

        //calling function to move the lines on the roads
        moveEnemyCar(car);

        if(keys.ArrowUp && player.y > (gameTrack.top + 80)) {player.y -= player.speed}
        if(keys.ArrowDown && player.y < (gameTrack.bottom - 80)) {player.y += player.speed}
        if(keys.ArrowLeft  && player.x > 0 ) {player.x -= player.speed}
        if(keys.ArrowRight && player.x < gameTrack.width - 50) {player.x += player.speed}

        car.style.top = player.y + "px";
        car.style.left = player.x + "px";

        window.requestAnimationFrame(gamePlay);
        console.log(player.score++);

        player.score++;
        let ps = player.score - 2;
        score.innerText = "Score : " + ps;
    }
    
}






// .....................      to start the game       ..........................

function gameStart() {
    // road.classList.remove('hide');
    popUp.classList.add('hide');
    road.innerHTML = "";

    player.start = true;
    player.score = 0;
    window.requestAnimationFrame(gamePlay);


    // add multiple-line son the roads
    for(x =0; x<5; x++){
        let roadLine = document.createElement('div');
        roadLine.setAttribute('class', 'lines');
        roadLine.y = (x*150);
        roadLine.style.top = roadLine.y + "px";
        road.appendChild(roadLine);
    }

    
    // add car on the roads
    let car = document.createElement('div');
    car.setAttribute('class', 'car');
    road.appendChild(car);


    player.x = car.offsetLeft;
    player.y = car.offsetTop;

    // console.log("top position " + car.offsetTop);
    // console.log("left position " + car.offsetLeft);




    // add multiple-cars on the roads
    for(x =0; x<3; x++){
        let enemyCar = document.createElement('div');
        enemyCar.setAttribute('class', 'enemyCar');
        enemyCar.y = ((x+1) *350) * -1;
        enemyCar.style.top = enemyCar.y + "px";
        // enemyCar.style.backgroundColor = randomColor();
        enemyCar.style.left = Math.floor(Math.random() * 350) + "px";
        road.appendChild(enemyCar);
    }
}










// function randomColor() {
//     function c() {
//         let hex = Math.floor(Math.random() * 256).toString(16);
//         return ("0" + String(hex)).substr(-2);
//     }
//     return "#"+ c() + c() + c();
// }