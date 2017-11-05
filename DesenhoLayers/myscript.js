function Slope(angle,height,color) {
	this.angle = angle;
	this.height = height;
	this.factor1 = 2;
	this.factor2 = 2;
	this.factor3 = 2;
	this.color = color;
	this.heightLeft = height;//vou usar pra ver se a altura das layers vai passar do talude
	this.layers = [];	
}

//função sendo chamada dentro da drawSlope
Slope.prototype.drawLayers = function(heights,colors,mystage) {
	/*
        D       C

    A           B
    */
	if (heights==undefined || heights == null){
		console.log("não ha layers a desenhar");
		return;
	}
	var MARGIN = 0.01; //margem de erro pra comparação de float

	for (var i = 0; i < heights.length; i++) { 
		var myLayer = new PIXI.Graphics();
		myLayer.lineStyle(2,0xFFFFFF,1);
		if ((this.heightLeft+MARGIN)-heights[i] < 0){
			//raise error (como fazer?)
			console.log("Erro de Altura, nao vou desenhar o layer",i,"e seguintes",heights,this.heightLeft);
			break;
		} 
		else {
			this.heightLeft-=heights[i]; 			          
		}
		var disp = heights[i]/Math.tan(Math.PI*this.angle/180);     
		var layerA = {
			x : this.inicialPoints[0].x,
			y : this.inicialPoints[0].y
		};
		var layerB = {
			x : this.inicialPoints[1].x,
			y : layerA.y
		};
		var layerC = {
			x : layerB.x,
			y : layerB.y-heights[i]
		};
		var layerD = {
			x : layerA.x+disp,
			y : layerC.y
		};
		//tornando os inicial points os ultimos da layer
		this.inicialPoints[0]=layerD;
		this.inicialPoints[1]=layerC;

		var layer = new PIXI.Polygon (
			new PIXI.Point (layerA.x,layerA.y),
			new PIXI.Point (layerB.x,layerB.y),
			new PIXI.Point (layerC.x,layerC.y),
			new PIXI.Point (layerD.x,layerD.y),
			new PIXI.Point (layerA.x,layerA.y)
		);
		myLayer.alpha = 0.8; //só pra destacar
		myLayer.beginFill(colors[i]);
		myLayer.drawPolygon(layer);
		myLayer.endFill();
		myLayer.hitArea = layer;
		myLayer.interactive = true;
		myLayer.buttonMode = true;

		myLayer.mouseover = function (mouseData) {
			this.alpha = 1;
		};
		myLayer.mouseout = function (mouseData) {
			this.alpha = .8;
		};
		mystage.addChild(myLayer);
	}

};

Slope.prototype.generatePoints = function () {
	/*
               D        C
               |->(height)
    F     E-----  
            disp
    A                   B
    */
	//fatores multiplicativos do talude
	//factor1 //fator que gera a altura de B até C
	//factor2 //fator que gera o comprimento de F até E
	//factor3 //fator que gera o comprimento de D até C
	var baseX = 0;
	//fazendo assim pois o P(0,0) fica no canto superior esquerdo
	var baseY = app.renderer.view.height; //Y base é agora o canto inferior esquerdo
	
    
    
	var displacement = this.height/Math.tan(Math.PI*this.angle/180);    
	this.A = {
		x:baseX,
		y:baseY
	};    
	this.B = {
		x:this.factor2*this.factor3*this.height+displacement,
		y:baseY
	};
	this.C = {
		x:this.B.x,
		y:baseY-this.factor1*this.height
	};
	this.D = {
		x:this.C.x-this.factor2*this.height,
		y:this.C.y
	};
	this.E = {
		x:this.factor2*this.height,
		y:baseY-(this.factor1*this.height-this.height)
	};
	this.F = {
		x:0,
		y:this.E.y
	};    
};

Slope.prototype.drawSlope = function (myStage) {
	this.generatePoints();
	//lista que liga todos os pontos do talude
	var path = [
		this.A.x,this.A.y,
		this.B.x,this.B.y,
		this.C.x,this.C.y,
		this.D.x,this.D.y,
		this.E.x,this.E.y,
		this.F.x,this.F.y,
		this.A.x,this.A.y
	];
	var slope = new PIXI.Graphics();
	//slope.interactive=true;
	//slope.buttonMode=true;
	slope.lineStyle(2,0xFFFFFF,1);
	slope.beginFill(this.color);
	slope.drawPolygon(path);
	slope.endFill();    
	
	myStage.addChild(slope);

	/* arrumando as variaveis do ponto inicial pra desenhar os layers */	
	var pt1 = {
		x : this.E.x,
		y :	this.E.y
	};
	var pt2 = {
		x : this.C.x,
		y :	this.E.y
	};
	this.inicialPoints = [
		pt1,pt2
	];    
 
};
function criaSlope() {
	var mySlope = new Slope(30,80,0x00FFF0);
	var colors = [
		0xfff002,
		0xf00f00,
		0xf0b5ff,
	];	
	var alturas = [
		80/3,
		80/3,
		80/3
	];
	//drawSlope(angulo,altura)
	mySlope.drawSlope(app.stage);
	mySlope.drawLayers(alturas,colors,app.stage);
	//console.log(mySlope);
}	
function resizeMe() {
	var width = divApp.clientWidth;
	var height = (9*width)/16; //16/9 aspect ratio
	app.renderer.resize(width,height);
	app.stage.removeChildren();
	criaSlope();
}


var divApp = document.getElementById("canvas");
var width = divApp.clientWidth;
var height = (9*width)/16; //16/9 aspect ratio


// pro render só precisa passar o width e o height o resto é opcional
var app = new PIXI.Application(
	width, height,{backgroundColor : 0xeeeeee},{antialias:true}
);

//Add the canvas to the HTML document
divApp.appendChild(app.view);
window.addEventListener("resize",resizeMe);
//app.stage.position.set(width1/2, height2/2);

criaSlope();


   
       