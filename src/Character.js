
// 캐릭터를 선언하는 클래스
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

    render(){
        this.objStyle.left = this.x + "px";
        this.objStyle.top = this.y + "px";
    }
}