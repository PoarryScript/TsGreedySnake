import './style/index.less';

//创建类

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

/**
 * 记分牌
 */
class ScorePanel {
    score = 0;
    level = 1;
    scoreEle: HTMLElement;
    levelEle: HTMLElement;
    //等级限制
    maxLevel:number;
    //设置变量多少分升级
    levelScore:number;

    constructor(max:number=10,lScore:number=10) {
        this,this.maxLevel = max;
        this.levelScore = lScore;
        this.scoreEle = document.getElementById('score')!;
        this.levelEle = document.getElementById('level')!;

    }

    /**
     * 得分
     */
    addScore() {
        this.score++;
        //更新UI
        this.scoreEle.innerHTML  =this.score+'';
        if(this.score%this.levelScore===0){
            //10分升级一次
            this.levelUp();
        }

    }
    /**
     * 升级  升级由加分来控制
     */
    levelUp() {

        if(this.level>this.maxLevel){
            //等级限制
            return;
        }
        this.level++;
        //更新UI
        this.levelEle.innerHTML  =this.level+'';

    }
}

