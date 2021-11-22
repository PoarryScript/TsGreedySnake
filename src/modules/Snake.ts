

/**
 * 贪吃蛇 蛇
 */
class Snake {

    container: HTMLElement;//蛇的容器
    //表示蛇头的元素
    head: HTMLElement;
    //身体 包括头
    bodies: HTMLCollection;
    constructor() {
        this.container = document.getElementById('snake')!;
        //取snake的第一个div
        this.head = document.querySelector('#snake>div')!;
        this.bodies = this.container.getElementsByTagName('div');

    }

    /**
     * 获取蛇的坐标 头部
     */
    get X() {
        return this.head.offsetLeft;
    }

    get Y() {
        return this.head.offsetTop;
    }

    set X(value: number) {
        if (this.X == -value) {
            return;
        }

        if (value < 0 || value > 290) {
            throw new Error("撞墙来");
        }
        this.moveBody();

        this.head.style.left = value + 'px';
    }
    set Y(value: number) {
        if (this.Y === value) {
            return;
        }
        if (value < 0 || value > 290) {
            throw new Error("撞墙来");
        }
        this.moveBody();
        this.head.style.top = value + 'px';
    }
    /**
     * 增加身体的长度
     *
     * **/
    addBody() {
        //在beforeendbody结束标签前新增div
        this.container.insertAdjacentHTML("beforeend", "<div></div>");
    }

    /**
     * 蛇移动身体
     */
    moveBody() {
        //将后边的身体设置为前面一格的位置
        //遍历获取所有身体
        for (let i = this.bodies.length - 1; i > 0; i--) {
            //前面节点
            let x = (this.bodies[i - 1] as HTMLElement).offsetLeft;
            let y = (this.bodies[i - 1] as HTMLElement).offsetTop;
            //设置到当前节点身体
            (this.bodies[i - 1] as HTMLElement).style.left = x + 'px';
            (this.bodies[i - 1] as HTMLElement).style.top = y + 'px ';


        }

    }
}
export default Snake;
