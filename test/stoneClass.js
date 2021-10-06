export class stoneClass{
    constructor(stoneHtmlElement){
        this.stat = 'empty';
        this.stoneHtmlElement = stoneHtmlElement;
        this.stoneHtmlElement.style.position = 'relative';
        this.stoneHtmlElement.style.opacity = 0;
        this.stoneHtmlElement.style.width = '25px';
        this.stoneHtmlElement.style.height = '25px';
        this.stoneHtmlElement.style.borderRadius = '30px';
        this.stoneHtmlElement.style.marginBot = '40px';
        this.stoneHtmlElement.style.marginRight = '20px';
    }
    removeStone(){
        this.stat = 'empty';
        var interval = setInterval(() => {
            if (this.stoneHtmlElement.style.opacity > 0) {
                this.stoneHtmlElement.style.opacity -= 0.1;
            }
            else {
                clearInterval(interval);
            }
        }, 25);
    }

    addStone(stat){
        this.stat = stat;
        this.stoneHtmlElement.style.backgroundColor = this.stat;
        // animation 
        this.stoneHtmlElement.style.width = '40px',
        this.stoneHtmlElement.style.height = '40px',
        this.stoneHtmlElement.style.borderRadius =  '30px',
        this.stoneHtmlElement.style.marginTop = '-40px',
        this.stoneHtmlElement.style.marginLeft = '-20px',
        setTimeout(() => {
            this.stoneHtmlElement.style.width = '26px',
            this.stoneHtmlElement.style.height = '26px',
            this.stoneHtmlElement.style.borderRadius =  '20px',
            this.stoneHtmlElement.style.marginTop = '-33px',
            this.stoneHtmlElement.style.marginLeft = '-13px',
            this.stoneHtmlElement.style.opacity = 1;
        }, 100);
    }
    
}
// removeStone(){
//     this.stat = 'empty';
//     this.stoneHtmlElement.style.opacity = 0;
//     // ADD ANIMATION ccs

// }

// addStone(stat){
//     this.stat = stat;
//     this.stoneHtmlElement.style.backgroundColor = this.stat;
//     this.stoneHtmlElement.style.opacity = 1;        
// }
