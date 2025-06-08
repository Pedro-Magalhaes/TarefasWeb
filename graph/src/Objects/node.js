//import Point from "point.js";

class Node extends Point {
    // constructor(){}
    constructor(content) {
        super();
        this.r = 20;
        this.content = content;
    }

    setXY(x, y) {
        this.x = x;
        this.y = y;
    }

    setX(x) {
        this.x = x;
    }

    setY(y) {
        this.y = y;
    }

    setR(r) {
        this.r = r;
    }

    setContent(content) {
        this.content = content;
    }

    // recebe um content e desenha o circulo
    draw(graphic) {
        graphic.drawCircle(this.x, this.y, this.r);
    }

    drawMe(stage) {
        const l = Math.floor((this.r * 2) * Math.sin(Math.PI / 4));
        const m = new PIXI.Text(this.content);
        m.style = { wordWrap: true, wordWrapWidth: l }; // WordWrap nao esta funcionando, verificar
        m.position.set(this.x, this.y);
        m.anchor.set(0.5); // anchor 0.5 centraliza o texto na posição que for colocado
        const g = new PIXI.Graphics();

        g.lineStyle(1, 0x000FF0, 1);
        g.beginFill(0xFFFFFF);
        this.draw(g);
        g.endFill();
        stage.addChild(g);
        stage.addChild(m);

    }

    connect(node) {
        return this.intersectCircle(node);
    }

    /**
     * Calculates the intersection point(s) between the line segment from this node to another node and this node's circle.
     * Returns the first intersection point found on the segment, or an empty array if there is no intersection.
     *
     * @param {Object} node - The target node with properties `x` and `y` representing its position.
     * @returns {Point|undefined} The intersection point as a `Point` object if found, otherwise `undefined`.
     */
    intersectCircle(node) {
        // Vector from this node to the other node
        const dx = node.x - this.x;
        const dy = node.y - this.y;

        // Quadratic coefficients for intersection
        const a = dx * dx + dy * dy;

        if (a === 0) return undefined; // Degenerate case

        // Find u where the intersection occurs
        const u1 = this.r / Math.sqrt(a);
        const u2 = -this.r / Math.sqrt(a);

        let ret = [];
        // Only consider intersections on the segment [0,1]
        [u1, u2].forEach(u => {
            if (u >= 0 && u <= 1) {
                const p = new Point();
                p.x = this.x + dx * u;
                p.y = this.y + dy * u;
                ret.push(p);
            }
        });

        return ret; // Return the first intersection, or undefined if none
    }
}