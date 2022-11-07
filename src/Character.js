
// 캐릭터를 선언하는 클래스
/**
 * 뱀의 head와 body를 정의하는 클래스
 */
class Character extends GameObject{
    constructor(container, x, y, width, height, vel, color, direction, index){
        super(container, x, y, width, height, color);

        this.direction = direction;
        this.vel = vel;
        this.index = index;
    }


    tick(){
        this.before = this.direction;
        switch(this.direction){
            case "up":
                this.y += -this.vel;
                break;
            case "right":
                this.x += this.vel;
                break;
            case "down":
                this.y += this.vel;
                break;
            case "left":
                this.x += -this.vel;
                break;
        }
    }
    /**
     * 
     * @param {Character} head 머리 객체
     * @return head 가 해당 body에 충돌했는지 안했는지 출력
     */
    getCollisionDetecting(head){
        let currentDetectingFunction;
        switch(head.direction){
            case "up": currentDetectingFunction = collisionDetectingOnlyBottom;break;
            case "right": currentDetectingFunction = collisionDetectingOnlyLeft;break;
            case "left": currentDetectingFunction = collisionDetectingOnlyRight;break;
            case "down": currentDetectingFunction = collisionDetectingOnlyTop;break;
        }
        if(typeof(currentDetectingFunction) == "function"){
            let detectingResult = currentDetectingFunction(this, head);
            return detectingResult;
        }
    }

    render(){
        this.objStyle.left = this.x + "px";
        this.objStyle.top = this.y + "px";
    }
}