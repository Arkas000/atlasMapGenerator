class Area {
    static _idxCount = 0;
    static areas = [];

    get idx() {
        return this._idx;
    }

    constructor(rows = 1, cols = 1) {
        this._idx = Area._idxCount++;
        this.x = 10;
        this.y = 10;
        this.width = 20*rows;
        this.height = 20*rows;

        this.rows = rows;
        this.cols = cols;
    }

    static addArea(rows = 1, cols = 1) {
        const area = new Area(rows, cols);
        Area.areas.push(new Area(rows, cols));
        return area;
    }

    static removeArea(idx) {
        return Area.areas.find(area => area.idx === idx);
    }

    getRects() {
        const rects = [];
        for(let i = 1; i <= this.rows; i++) {
            for(let j = 1; j <= this.cols; j++) {
                rects.push({x: this.x + j*(this.width/this.cols), y: this.y + i*(this.height/this.rows), w: this.x + j*(this.width/this.cols+1), h: this.y + i*(this.height/this.rows+1)});
            }
        }
        return rects;
    }

    drawGrid(ctx) {
        for(let i = 0; i <= this.rows; i++) {
            ctx.beginPath();
            ctx.moveTo(this.x, this.y + i*(this.height/this.rows));
            ctx.lineTo(this.x + this.width, this.y + i*(this.height/this.rows));
            ctx.stroke();
        }

        for(let j = 0; j <= this.cols; j++) {
            ctx.beginPath();
            ctx.moveTo(this.x + j*(this.width/this.cols), this.y);
            ctx.lineTo(this.x + j*(this.width/this.cols), this.y + this.height);
            ctx.stroke();
        }
    }

    static addGridElement() {
        const area = Area.addArea(1,1);

        const gridElTemplate = document.getElementById('gridElementTemplate');

        const cln = gridElTemplate.cloneNode(true);
        cln.id = null;

        let gridElement = document.createElement('div');
        gridElement.innerHTML = 'ciao';
        gridElement.className = 'grid-element';

        // The variable iDiv is still good... Just append to it.
        const gridList = document.getElementById('gridList');
        gridList.appendChild(cln);
    }
}
