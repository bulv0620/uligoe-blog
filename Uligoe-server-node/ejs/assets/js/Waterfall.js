class Waterfall {
    constructor(options) {
        this.$el = null;
        this.col = 4;
        this.gap = 10;
        Object.assign(this, options);
        this.width = 0;
        this.items = [];
        this.H = [];
        this.box = null;
        this.init();
    }

    init() {
        this.items = Array.from(this.$el.children);
        this.reset();
        this.render();
    }

    reset() {
        this.width = this.$el.clientWidth / this.col;
        this.H = new Array(this.col).fill(0);
        this.$el.innerHTML = "";
    }

    render() {
        const { width, items, box, H, gap } = this;
        
        items.forEach(item => {
            item.style.width = width + 'px';
            item.style.position = 'absolute';

            let tag = H.indexOf(Math.min(...H));
            item.style.left = tag * (width + gap) + "px";
            item.style.top = H[tag] + "px";      
            this.$el.append(item);
            H[tag] += item.clientHeight + gap; 
        })
        
    }
}
