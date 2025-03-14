let canvas = document.getElementById('canvasenMin');
let c = canvas.getContext('2d');

canvas.width = innerWidth - 30;
canvas.height = innerHeight - 15;

const dudeRun1 = new Image();
dudeRun1.src = "run1.png";

const dudeRun2 = new Image();
dudeRun2.src = "run5.png";

const wholeDude = new Image();
wholeDude.src = "whole_dude.png";

const dudeRun1Flip = new Image();
dudeRun1Flip.src = "run1_flip.png";

const dudeRun2Flip = new Image();
dudeRun2Flip.src = "run5_flip.png";

const wholeDudeFlip = new Image();
wholeDudeFlip.src = "whole_dude_flip.png";

const shrimp = new Image();
shrimp.src = "shrimpy.png";

const jump = new Image();
jump.src = "jump.png";


let waterDebt = innerHeight - 35;
let keyPressed = {};
let dx = 0;
let dy = 0;
let counter = 0;
let faceDirection = true;
let deltaPlatformHeight = -70;
let deltaBody = 260;
let vy = 1
const tower = 0; 
const gravity = 1

let platform = {
    start: 100,
    end: 850,
    height: 200 + deltaPlatformHeight,
    foundationTot: 60,
}

const platformEnd = platform.end - 265

function water() {
    c.beginPath();
    c.fillStyle = 'blue';
    c.fillRect(0, waterDebt, innerWidth, waterDebt);
    c.fill();
    c.stroke();
}


function theTower(){

    let platformLegRight = platform.foundationTot + 150;
    let platformUnder = platform.height + 50

    c.beginPath();
    c.fillStyle = "lightgray";
    c.strokeStyle = "gray";
    c.moveTo(platform.foundationTot, innerHeight);
    c.lineTo(platform.start, platform.height);
    c.lineTo(platform.end, platform.height);
    c.lineTo(platform.end, platformUnder);
    c.lineTo(platformLegRight, platformUnder);
    c.lineTo(platformLegRight, innerHeight);
    c.fill();
    c.stroke();
}


let imagesLoaded = 0;
function checkAllImagesLoaded() {
    imagesLoaded++;
    if (imagesLoaded === 8) {
        runAnimation(0, 0);
    }
}

function checkDrawings(){

    dudeRun1.onload = checkAllImagesLoaded;
    dudeRun2.onload = checkAllImagesLoaded;
    wholeDude.onload = checkAllImagesLoaded;
    dudeRun1Flip.onload = checkAllImagesLoaded;
    dudeRun2Flip.onload = checkAllImagesLoaded;
    wholeDudeFlip.onload = checkAllImagesLoaded;
    jump.onload = checkAllImagesLoaded;
    shrimp.onload = checkAllImagesLoaded;

    dudeRun1.onerror = function() {
        console.error("Kunne ikke laste run1.png");
    };
    dudeRun2.onerror = function() {
        console.error("Kunne ikke laste run5.png");
    };
    wholeDude.onerror = function() {
        console.error("Kunne ikke laste whole_dude.png");
    };
    dudeRun1Flip.onerror = function() {
        console.error("Kunne ikke laste run1.png");
    };
    dudeRun2Flip.onerror = function() {
        console.error("Kunne ikke laste run5.png");
    };
    wholeDudeFlip.onerror = function() {
        console.error("Kunne ikke laste whole_dude_flip.png");
    };
    jump.onerror = function() {
        console.error("Kunne ikke laste jump.png");
    };
    shrimp.onerror = function() {
        console.error("Kunne ikke laste shrimp.png");
    };
}



function runAnimation(inputX, inputY) {
    counter++;
    if(keyPressed['ArrowRight'] && inputX < platformEnd){
        faceDirection = true;
        if(counter % 3 === 0){
            c.save();
            c.drawImage(dudeRun1, 200 + inputX, 62 + inputY + deltaPlatformHeight, 200, 200);
            c.restore();
        }else{
            c.save();
            c.drawImage(dudeRun2, 200 + inputX, 62 + inputY + deltaPlatformHeight, 200, 200);
            c.restore();
        }
    }
    else if (keyPressed['ArrowRight'] && inputX > platformEnd && 400 > inputY > tower){
        c.save();
        c.drawImage(jump, 200 + inputX, 62 + inputY + deltaPlatformHeight, 200, 200);
        c.restore();
    }
    else if (inputX > platformEnd && inputY > 400){
        c.save();
        c.drawImage(shrimp, 200 + inputX, 62 + inputY + deltaPlatformHeight, 200, 200);
        c.restore();
    }

    else if(keyPressed['ArrowLeft']){
        const wrongSideOfPlatform = -160;
        faceDirection = false
        if(counter % 3 === 0){
            c.save();
            c.drawImage(dudeRun1Flip, 200 + inputX, 62 + inputY + deltaPlatformHeight, 200, 200);
            c.restore();
        }else{
            c.save();
            c.drawImage(dudeRun2Flip, 200 + inputX, 62 + inputY + deltaPlatformHeight, 200, 200);
            c.restore();
        } if(inputX < wrongSideOfPlatform){
            keyPressed['ArrowLeft'] = false;
        }
    }
    
    else {
        if(faceDirection){
            c.save();
            c.drawImage(wholeDude, 250 + inputX, 68 + inputY + deltaPlatformHeight, 200, 200);
            c.restore();
        }
        else{
            c.save();
            c.drawImage(wholeDudeFlip, 250 + inputX, 68 + inputY + deltaPlatformHeight, 200, 200);
            c.restore(); 
        }
    }
}



function bodyMovement() {

    
    runAnimation(dx, dy)
    if (keyPressed['ArrowLeft']){
        dx -= 5;
    }
    if (keyPressed['ArrowRight']){
        dx += 5;
    }

    if(dx > platformEnd || dy < tower){
        vy += gravity
        dy += vy;
    }
    if(dx < platformEnd && dy > tower){
        dy = tower;
    }

}


function animation() {
    c.clearRect(0, 0, canvas.width, canvas.height)
    requestAnimationFrame(animation);
    bodyMovement();
    checkDrawings()
    theTower()
    water()
}

document.addEventListener('keydown', (event) => {
    keyPressed[event.key] = true;
});

document.addEventListener('keyup', (event) => {
    keyPressed[event.key] = false;
});


animation()
