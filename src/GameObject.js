
// 게임의 기본 오브젝트를 선언

class GameObject{
    /**
     * 
     * @param {Node} container 
     * @param {Number} x 
     * @param {Number} y 
     * @param {Number} width 
     * @param {Number} height 
     * @param {String} color
     */
    constructor(container, x, y, width, height, color = "black"){
        this.container = container;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;

        this.obj  = document.createElement("div");
        this.objStyle = this.obj.style;

        this.objStyle.position = "absolute";
        this.objStyle.left = this.x + "px";
        this.objStyle.top = this.y + "px";
        this.objStyle.width = this.width + "px";
        this.objStyle.height = this.height + "px";
        this.objStyle.backgroundColor = this.color;

        this.container.appendChild(this.obj);

    }
}
