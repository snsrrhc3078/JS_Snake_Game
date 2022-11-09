


addEventListener("load", function(){
    init();
})
const MAP_WIDTH_HEIGHT = 500;
const OBJECT_SIZE = 25;
const MAP_SIZE = MAP_WIDTH_HEIGHT/OBJECT_SIZE;

let contentArea;
let head;
let flag = false;
let food = null;
let directionBuffer=["right"];
let id;

let characterArray = [];
let locationArray = [];
let isGameOver = false;

function init(){
    contentArea = document.querySelector("#content-area");
    contentArea.style.backgroundPosition = `0 0, ${OBJECT_SIZE}px ${OBJECT_SIZE}px`;
    contentArea.style.backgroundSize = `${OBJECT_SIZE*2}px ${OBJECT_SIZE*2}px`;


    createHead();

    id = setInterval(gameLoop, 32);

    document.body.addEventListener("keydown", function(event){
        if(event.repeat == false){ // 키 누른채로 있어서 버퍼에 쌓이는거 방지
            // console.log(event);
            switch(event.code){
                case "ArrowUp": directionBuffer.push("up"); break;
                case "ArrowRight": directionBuffer.push("right"); break;
                case "ArrowDown": directionBuffer.push("down"); break;
                case "ArrowLeft": directionBuffer.push("left"); break;
                case "Space": flag = !flag;
            }
        }
        // console.log(head.direction);
    })

}

// #루프
function gameLoop(){
    if(flag){
        // 만약 Character 객체들의 좌표값이 Object_SIZE의 정배수라면
        if(head.x % OBJECT_SIZE == 0 && head.y % OBJECT_SIZE == 0){
            setHeadDirection();
            setBodyDirection();
            getCharacterLocation();
            isHeadOutMap();
        }
        
        if(food==null){
            createFood();
        }
        food.detecting(head);
        if(food.handleOnEaten()){
            food = null;
            createBody();
        }

        getBodiesDetecting();
        if(isGameOver){
            gameOver();
            return 0;
        }

        head.tick();        
        head.render();
        bodyMove();
    }
}


// #객체생성
function createHead(){
    head = new Character(contentArea, OBJECT_SIZE * (MAP_SIZE / 4), OBJECT_SIZE * (MAP_SIZE/2), OBJECT_SIZE, OBJECT_SIZE, 5, "black", "right", characterArray.length);
    characterArray.push(head);
    locationArray.push({
        row: head.x/OBJECT_SIZE,
        col: head.y/OBJECT_SIZE,
    })
}

function createFood(){
    let result = getPlaceAbleArray();
    let randumNumber = getRandom(result.length);
    console.log(result);
    let foodX = result[randumNumber].row * OBJECT_SIZE;
    let foodY = result[randumNumber].col * OBJECT_SIZE;

    food = new Food(contentArea, foodX, foodY, OBJECT_SIZE, OBJECT_SIZE, "white")
}

function createBody(){
    let lastBody = characterArray.at(-1);
    console.log(lastBody);
    let body;
    switch(lastBody.direction){
        case "up":
                body = new Character(contentArea, lastBody.x, lastBody.y + OBJECT_SIZE, OBJECT_SIZE, OBJECT_SIZE, lastBody.vel, lastBody.color, lastBody.direction, characterArray.length)
                break;
            case "right":
                body = new Character(contentArea, lastBody.x - OBJECT_SIZE, lastBody.y, OBJECT_SIZE, OBJECT_SIZE, lastBody.vel, lastBody.color, lastBody.direction, characterArray.length)
                break;
            case "down":
                body = new Character(contentArea, lastBody.x, lastBody.y - OBJECT_SIZE, OBJECT_SIZE, OBJECT_SIZE, lastBody.vel, lastBody.color, lastBody.direction, characterArray.length)
                break;
            case "left":
                body = new Character(contentArea, lastBody.x + OBJECT_SIZE, lastBody.y, OBJECT_SIZE, OBJECT_SIZE, lastBody.vel, lastBody.color, lastBody.direction, characterArray.length)
                break;
    }
    characterArray.push(body);
    locationArray.push({
        row: body.x/OBJECT_SIZE,
        col: body.y/OBJECT_SIZE,
    })
}

// #객체조작
function setHeadDirection(){
    if(directionBuffer.length != 0)
    head.direction = directionBuffer.shift();
}

function setBodyDirection(){
    for (let i = characterArray.length-1; i >= 1; i--) {
        characterArray[i].direction = characterArray[i - 1].before;
        console.log(characterArray[i].direction);
    }
}
function bodyMove(){
    for (let i = 1; i < characterArray.length; i++) {
        characterArray[i].tick()
        characterArray[i].render();
    }
}

function getBodiesDetecting(){

    for(let i = 1;i<characterArray.length;i++){
        if(characterArray[i].getCollisionDetecting(head)){
            isGameOver = true;
        }
    }
}


function getCharacterLocation(){
        // 이전에 있던 location배열의 값들을 비우고
        locationArray.length = 0;

        // 현재 존재하는 chraracter 객체들의 위치를 locationArray에 넣음
        for(let i = 0; i< characterArray.length;i++){
            locationArray.push({
                row: characterArray[i].x/OBJECT_SIZE,
                col: characterArray[i].y/OBJECT_SIZE,
            })
        }
    // console.log(locationArray[0].row, locationArray[0].col);
}

// food를 놓기 위해서는 현재 character 객체들이 있는곳을 제외한 빈공간의
// 좌표값을 구분해내기 위해 character객체들을 제외한 빈공간들을 찾아내야 함
function getPlaceAbleArray() {
    // 맵 크기의 배열을 만듬
    let map = Array.from(Array(MAP_SIZE), () => Array(MAP_SIZE));
    let result = [];

    // map의 각 요소들은 각 요소 스스로의 배열 위치값을 객체 형태로 가짐
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            map[i][j] = {
                row: i,
                col: j,
            }
        }
    }


    // map을 반복문을 돌리는데 locationArray에는 각 chraracter 객체들의 위치가
    // 들어있음 findIndex를 이용해 만약 locationArray에 map의 현재 요소값이
    // 존재하지 않는다면 findIndex는 -1을 출력할 것이고 그려면 result에 push하게 됨
    //  반복문이 다 돌면 chraracter 객체들의 위치를 제외한 모든 공간의 좌표를 나타내는
    // result 배열을 얻을 수 있음
    map.forEach(item => {
        item.forEach(item2 => {

            let isMatch = locationArray.findIndex(item3 => {
            item2.row ==  item3.row && item2.col == item3.col ? console.log(item2, item3):{};
                return item2.row == item3.row && item2.col == item3.col;
            })
            if (isMatch == -1) {
                result.push(item2);
            }
        })
    })
    return result;
}

function gameOver(){
    flag = false;
    clearInterval(id);
    alert("게임 오버");
}

function isHeadOutMap(){
    if((locationArray[0].row <=0 && head.direction == "left") || (locationArray[0].row > MAP_SIZE-2 && head.direction == "right") || (locationArray[0].col <= 0 && head.direction == "up") || (locationArray[0].col > MAP_SIZE-2 && head.direction == "down")){
        isGameOver = true;
    }
}