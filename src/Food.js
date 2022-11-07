
class Food extends GameObject {
    constructor(container, x, y, width, height, color){
        super(container, x, y, width, height, color);
        this.isEaten=false;
    }
    detecting(head){
        let currentDetectingFunction;
        switch(head.direction){
            case "up": currentDetectingFunction = collisionDetectingOnlyBottom;break;
            case "right": currentDetectingFunction = collisionDetectingOnlyLeft;break;
            case "left": currentDetectingFunction = collisionDetectingOnlyRight;break;
            case "down": currentDetectingFunction = collisionDetectingOnlyTop;break;
        }
        if(typeof(currentDetectingFunction) == "function"){
            let detectingResult = currentDetectingFunction(this, head);
            if(detectingResult){
                this.isEaten = true;
            }
        }
    }// end of detecting
    handleOnEaten(){
        if(this.isEaten){
            this.container.removeChild(this.obj);
            console.log("먹혔음");
            this.isEaten = false
            return true;
        }else{
            return false;
        }
    }
}// end of class