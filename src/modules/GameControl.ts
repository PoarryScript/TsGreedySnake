

import Food from "./Food";
import Snake from "./Snake";
import ScorePanel from "./ScorePanel";
/**
 * 控制器，控制其他所有类
 */
class GameControl {

    //定义三个属性
    snake: Snake;
    food: Food;
    scorePanel: ScorePanel;
    //纯粹按键方向,也就是蛇移动的方向
    direction: string = '';
    //判断游戏是否结束
    isLiving = true;
    constructor() {
        this.snake = new Snake();
        this.food = new Food();
        this.scorePanel = new ScorePanel();
        this.init();
    }
    /**
     * 游戏初始化 调用之后马上开始
     */
    init() {

        //绑定键盘按下的事件
        // document.addEventListener("keydown",function(){  })
        document.addEventListener("keydown", this.keyDownhandler.bind(this));

        this.run();
    }
    /**
     * 键盘按下事件回调
     */
    keyDownhandler(event: KeyboardEvent) {

        console.log(event.key);
        //检查event.key是否合法
        //ArrowUp  Up
        //ArrowDown Down
        // ArrowRight Right
        // ArrowLeft Left
        this.direction = event.key;
    }
    /**
     * 蛇位置改变
     * 根据this.direction 值来改变移动的方向
     * 向上 top减小 向下 top增加
     * 向左 left减小 向右 left增加
     */
    run() {

        //获取当前的坐标
        let x = this.snake.X;
        let y = this.snake.Y;

        switch (this.direction) {
            case "Up":
            case "ArrowUp":
                y -= 10;
                break;
            case "Down":
            case "ArrowDown":
                y += 10;
                break;
            case "Right":
            case "ArrowRight":
                x += 10;
                break;
            case "Left":
            case "ArrowLeft":
                x -= 10;
                break;
        }
        //检查蛇是否吃了食物
        this.checkEat(x, y);

        try {
            this.snake.X = x;
            this.snake.Y = y;
        } catch (e) {
            alert(e + 'GAME OVER');
            //游戏结束
            this.isLiving = false;
        }
        //开启定时器
        this.isLiving && setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1) * 10);
    }
    /**
     * 检查是否吃到食物
     *
     * @param x 蛇的x坐标
     * @param y
     * @returns
     */
    checkEat(x: number, y: number)  {
        if (x === this.food.X && y === this.food.Y) {
            this.food.update();
            this.scorePanel.addScore();
            this.snake.addBody();
        }
    }
}

export default GameControl;
