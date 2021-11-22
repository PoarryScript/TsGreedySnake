

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

        //修改水平坐标，避免在向左移动时不能马上向右移动 反之亦然 大于等于2个节点才考虑
        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value) {
            if (value > this.X) {
                //表示正在向右走 此时发生掉头， 禁止掉头 继续往左走
                value = this.X - 10;
            } else {
                value = this.X = 10;
            }
        }
        this.moveBody();

        this.head.style.left = value + 'px';
        this.checkHeatBody();

    }
    set Y(value: number) {
        if (this.Y === value) {
            return;
        }
        if (value < 0 || value > 290) {
            throw new Error("撞墙来");
        }
        //修改垂直坐标，避免在向左移动时不能马上向右移动 反之亦然 大于等于2个节点才考虑
        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) {
            if (value > this.X) {
                //表示正在向下走 此时发生掉头， 禁止掉头 继续往左走
                value = this.Y - 10;
            } else {
                value = this.Y += 10;
            }
        }
        this.moveBody();
        this.head.style.top = value + 'px';
        this.checkHeatBody();
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
            (this.bodies[i] as HTMLElement).style.left = x + 'px';
            (this.bodies[i] as HTMLElement).style.top = y + 'px ';


        }
    }

    /**
     * 检查头和身体有没有相撞
     * 检查坐标是否和蛇头坐标相同
     */
    checkHeatBody() {
        if (this.bodies.length < 3) {
            return;
        }
        for (let i = 1; i++; i < this.bodies.length) {
            //前面节点
            if (this.X === (this.bodies[i] as HTMLElement).offsetLeft && this.Y === (this.bodies[i] as HTMLElement).offsetTop) {
                //头撞到来身体
                throw new Error("撞到身体了~ ");
            }
        }
    }
}
export default Snake;
