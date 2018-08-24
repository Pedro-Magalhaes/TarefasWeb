//import Point from "point.js";

class Node extends Point{
   // constructor(){}
    constructor( content ) {
        super();
        this.r = 20;
        this.content = content;
    }

    setXY(x,y) {
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

    setContent( content ) {
        this.content = content;
    }

    // recebe um content e desenha o circulo
    draw(graphic) {
        graphic.drawCircle (this.x, this.y, this.r);
    }

    drawMe( stage ) {
        const l = Math.floor( (this.r*2)*Math.sin(Math.PI/4) );
        const m = new PIXI.Text(this.content); 
        m.style = {wordWrap: true, wordWrapWidth: l}; // WordWrap nao esta funcionando, verificar
        m.position.set(this.x,this.y);
        m.anchor.set(0.5); // anchor 0.5 centraliza o texto na posição que for colocado
        const g = new PIXI.Graphics();
        
        g.lineStyle(1,0x000FF0,1);
        g.beginFill(0xFFFFFF);
        this.draw(g);
        g.endFill();
        stage.addChild(g);
        stage.addChild(m);

    }

    connect( node ) {
        return  this.intersectCircle( node );
    }

    intersectCircle ( node ) {
        let m = (node.y - this.y) / ( node.x - this.x ); // inclinação da reta
        let c = ( m * this.x ) - this.y ; // y = mx + c
        let v1 = {};
        let v2 = {};
        v1.x = this.x - node.x;
        v1.y = this.y - node.y;
        v2.x = 0;
        v2.y = 0;
        let b = (v1.x * v2.x + v1.y * v2.y);
        c = 2 * (v1.x * v1.x + v1.y * v1.y);
        b *= -2;
        let d = Math.sqrt(b * b - 2 * c * (v2.x * v2.x + v2.y * v2.y - this.r * this.r));
        if(isNaN(d)){ // no intercept
            console.log("Nenhum ponto d = ",d)
            return [];            
        }
        let u1 = (b - d) / c;  // these represent the unit distance of point one and two on the line
        let u2 = (b + d) / c;    
        let retP1 = {};   // return points
        let retP2 = {}  
        let ret = []; // return array
        if(u1 <= 1 && u1 >= 0){  // add point if on the line segment
            retP1.x = this.x + v1.x * u1;
            retP1.y = this.y + v1.y * u1;
            ret[0] = retP1;
        }
        if(u2 <= 1 && u2 >= 0){  // second add point if on the line segment
            retP2.x = this.x + v1.x * u2;
            retP2.y = this.y + v1.y * u2;
            ret[ret.length] = retP2;
        }
        console.log("Intersects: " + ret)
        return ret;
    }
}