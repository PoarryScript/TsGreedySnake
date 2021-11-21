//创建贪吃蛇的食物类
class Food {
    //定义一个属性表示食物所对应的元素
    element: HTMLElement;
    constructor() {
        //获取页面中的food元素
        this.element = document.getElementById('food')!;
    }
    //获取食物x坐标
    get X() {
        return this.element.offsetLeft;
    }
    get Y() {
        return this.element.offsetTop;
    }
    /**
     * 随机更新食物坐标范围
     * 范围0-290
     * 且坐标是整数 因为每次移动一次10px
     */
    update() {
        let top = Math.round(Math.random() * 29) * 10;
        let left = Math.round(Math.random() * 29) * 10;

        this.element.style.left = left + "px";

        this.element.style.top = top + "px";

    }

}

export default Food;
