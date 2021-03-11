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

    addCol() {
        this.cols++;
    }

    remCol() {
        this.cols = this.cols > 1 ? this.cols-1 : 1;
    }

    addRow() {
        this.rows++;
    }

    remRow() {
        this.rows = this.rows > 1 ? this.rows-1 : 1;
    }

    static addArea(rows = 1, cols = 1) {
        const area = new Area(rows, cols);
        Area.areas.push(area);
        return area;
    }

    static removeArea(idx) {
        return Area.areas.find(area => area.idx === idx);
    }

    getRects() {
        const rects = [];
        for(let i = 1; i <= this.rows; i++) {
            for(let j = 1; j <= this.cols; j++) {
                rects.push({
                    x: this.x + j*(this.width/this.cols),
                    y: this.y + i*(this.height/this.rows),
                    w: this.x + j*(this.width/this.cols+1),
                    h: this.y + i*(this.height/this.rows+1)
                });
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

        cln.getElementsByClassName("cols")[0].innerText = area.cols;
        cln.getElementsByClassName("rows")[0].innerText = area.rows;

        cln.getElementsByClassName("col-add")[0].onclick = () => {
            area.addCol();
            cln.getElementsByClassName("cols")[0].innerText = area.cols;
        };

        cln.getElementsByClassName("col-rem")[0].onclick = () => {
            area.remCol();
            cln.getElementsByClassName("cols")[0].innerText = area.cols;
        };

        cln.getElementsByClassName("row-add")[0].onclick = () => {
            area.addRow();
            cln.getElementsByClassName("rows")[0].innerText = area.rows;
        };

        cln.getElementsByClassName("row-rem")[0].onclick = () => {
            area.remRow();
            cln.getElementsByClassName("rows")[0].innerText = area.rows;
        };

        const gridList = document.getElementById('gridList');
        gridList.appendChild(cln);
    }
}
