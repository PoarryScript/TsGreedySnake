/**
 * 记分牌
 */
 class ScorePanel {
    score = 0;
    level = 1;
    scoreEle: HTMLElement;
    levelEle: HTMLElement;
    //等级限制
    maxLevel: number;
    //设置变量多少分升级
    levelScore: number;

    constructor(max: number = 10, lScore: number = 10) {
        this, this.maxLevel = max;
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
        console.log("this.score=="+this.score)
        this.scoreEle.innerHTML = this.score + '';
        if (this.score % this.levelScore === 0) {
            //10分升级一次
            this.levelUp();
        }

    }
    /**
     * 升级  升级由加分来控制
     */
    levelUp() {

        if (this.level > this.maxLevel) {
            //等级限制
            return;
        }
        this.level++;
        //更新UI
        this.levelEle.innerHTML = this.level + '';

    }
}

export default ScorePanel;
