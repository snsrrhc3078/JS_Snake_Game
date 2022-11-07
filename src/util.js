/**
 * 최대값을 정수로 입력받아 0부터 최대값 사이의 랜덤한 값을 반환하는 함수
 * @param {number} max  랜덤으로 나올 수 있는 최대값
 * @returns 정수형태의 랜덤출력값
 */
function getRandom(max){
    return parseInt(Math.random() * max) ; //0~n 사이의 정수 출력
}       

//범위가 있는 랜덤값
// min: 시작값
//max: 끝값
/**
 * 최소값과 최대값을을 정수로 입력받아 최소값부터 최대값 사이의 랜덤한 값을
 * 반환하는 함수
 * @param {number}  min 랜덤으로 나올 수 있는 최소값
 * @param {number} max  랜덤으로 나올 수 있는 최대값
 * @returns 정수형태의 랜덤출력값
 */
function getRandomWithRange(min, max){
    return parseInt(Math.random() * (max-min)) + min; //min~max 사이의 정수 출력
}

/**
 * 
 * @param {Object} me 비교할 본체 엘리먼트 객체
 * @param {Object} you 비교당할 대상 엘리먼트 객체
 * @returns  boolean
 */
function collisionDetecting(me, you){
/*     let meTop = me.y;
    let meRight = me.x + me.width;
    let meBottom = me.y + me.height;
    let meLeft = me.x;
    
    let youTop = you.y;
    let youRight = you.x + you.width;
    let youBottom = you.y + you.height;
    let youLeft = you.x;

    let result1 = meBottom >= youTop;
    let result2 = meLeft <= youRight;
    let result3 = meTop <= youBottom;
    let result4 = meRight >= youLeft;
    return result1&&result2&&result3&&result4; */

    let top =[]
    let right=[]
    let bottom =[]
    let left =[]
    for(let i =0;i<2;i++){
        top.push(arguments[i].y);
        right.push(arguments[i].x + arguments[i].width);
        bottom.push(arguments[i].y + arguments[i].height);
        left.push(arguments[i].x);
    }

    let result = new Array(4);
    result[0] = bottom[0] >= top[1];
    result[1] = left[0] <= right[1];
    result[2] = top[0] <= bottom[1];
    result[3] = right[0] >= left[1];
    return result[0]&&result[1]&result[2]&&result[3];
}

    /**
     * @note 주 대상의 top에 비교대상의 bottom이 부딛혔는지 정확하게 검사
     * @param {Object} me 비교할 본체 엘리먼트 객체
     * @param {Object} you 비교당할 대상 엘리먼트 객체
     * @returns boolean
     */
    function collisionDetectingOnlyTop(me, you) {
        let meTop = me.y;
        let meLeft = me.x;
        let meRight = me.x + me.width;

        let youBottom = you.y + you.height;
        let youRight = you.x + you.width;
        let youLeft = you.x;

        let result = meTop == youBottom && meLeft == youLeft && meRight == youRight;
        return result;
    }
    /**
     * @note 주 대상의 bottom에 비교대상의 top이 부딛혔는지 정확하게 검사
     * @param {Object} me 비교할 본체 엘리먼트 객체
     * @param {Object} you 비교당할 대상 엘리먼트 객체
     * @returns boolean
     */
    function collisionDetectingOnlyBottom(me, you){
        let meBottom = me.y + me.height;
        let meLeft = me.x;
        let meRight = me.x + me.width;
        
        let youTop = you.y;
        let youRight = you.x + you.width;
        let youLeft = you.x;

        let result = meBottom == youTop && meLeft==youLeft && meRight == youRight;
        return result;
    }
    /**
     * @note 주 대상의 left에 비교대상의 right가 부딛혔는지 정확하게 검사
     * @param {Object} me 비교할 본체 엘리먼트 객체
     * @param {Object} you 비교당할 대상 엘리먼트 객체
     * @returns boolean
     */
    function collisionDetectingOnlyLeft(me, you){
        let meTop = me.y;
        let meBottom = me.y + me.height;
        let meLeft = me.x;

        let youTop = you.y;
        let youBottom = you.y + you.height;
        let youRight = you.x + you.width;

        let result = meLeft == youRight && meTop==youTop && meBottom == youBottom;
        return result;
    }
    /**
     * @note 주 대상의 right에 비교대상의 left가 부딛혔는지 정확하게 검사
     * @param {Object} me 비교할 본체 엘리먼트 객체
     * @param {Object} you 비교당할 대상 엘리먼트 객체
     * @returns boolean
     */
    function collisionDetectingOnlyRight(me, you){
        let meTop = me.y;
        let meBottom = me.y + me.height;
        let meRight = me.x + me.width;
        
        let youTop = you.y;
        let youBottom = you.y + you.height;
        let youLeft = you.x;

        let result = meRight == youLeft && meTop==youTop && meBottom == youBottom;
        return result;
    }

//날짜관련 문자열 처리
// n이 10보타 크면 냅두고 10보다 작으면 앞에 '0'문자열 부착
/**
 * 
 * @param {Number} n 
 * @returns Stringed number with 2 digit
 */
function getDateString(n){
    let str = n;
    if(n<10){
        str = "0" + str;
        return str;
    }
    return str + "";

}
