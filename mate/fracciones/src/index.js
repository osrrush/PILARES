/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
class menu extends Phaser.Scene{
    constructor() {
		super('menu');
	}
    preload(){
        this.load.image('fondo','./asset/img/background.png');
        //this.load.image('menu','./asset/img/MENU.png');
        this.load.css('80s','./src/fuente.css');
    }
    create(){
        this.add.image(960,540,'fondo');
        var h1 = this.add.dom(960, 150, 'h1', null, 'Fracciones');
        h1.setClassName('deepshadow');
        var lienzo =this.add.graphics();
        //this.add.image(960,540,'menu');
        
        //Explorar
        
        //lienzo.fillStyle(0x6407b4);
        lienzo.fillStyle(0xB40A28);
        lienzo.fillRect(800,346,320,90);
        this.add.text(830, 350, 'Explorar', { color: 'black', fontFamily: 'Arial', fontSize: '70px '});
        
        const explorar = this.add.zone(800, 346, 320, 90);
	explorar.setOrigin(0);
	explorar.setInteractive();
	explorar.once('pointerdown', () => this.opcionPulsada('explorar'));
	this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(explorar);
        
        //multiplicación
        
        lienzo.fillStyle(0xB407AE);
        lienzo.fillRect(600,448,320,90);
        this.add.text(630, 450, 'Mult. 1', { color: 'black', fontFamily: 'Arial', fontSize: '70px '});
        
        const m1 = this.add.zone(600, 448, 320, 85);
	m1.setOrigin(0);
	m1.setInteractive();
	m1.once('pointerdown', () => this.opcionPulsada('m1'));
	this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(m1);
        
        lienzo.fillStyle(0xB40757);
        lienzo.fillRect(1000,448,320,90);
        this.add.text(1030, 450, 'Mult. 2', { color: 'black', fontFamily: 'Arial', fontSize: '70px '});
        
        const m2 = this.add.zone(1000, 448, 320, 85);
	m2.setOrigin(0);
	m2.setInteractive();
	m2.once('pointerdown', () => this.opcionPulsada('m2'));
	this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(m2);
        
        //equivalencia
        
        lienzo.fillStyle(0x83B407);
        lienzo.fillRect(420,545,320,90);
        this.add.text(450, 550, 'Equiv. 1', { color: 'black', fontFamily: 'Arial', fontSize: '70px '});
        
        const eq1 = this.add.zone(420, 545, 320, 90);
	eq1.setOrigin(0);
	eq1.setInteractive();
	eq1.once('pointerdown', () => this.opcionPulsada('eq1'));
	this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(eq1);
        
        lienzo.fillStyle(0x03B40A);
        lienzo.fillRect(820,545,320,90);
        this.add.text(850, 550, 'Equiv. 2', { color: 'black', fontFamily: 'Arial', fontSize: '70px '});
        
        const eq2 = this.add.zone(820, 545, 320, 90);
	eq2.setOrigin(0);
	eq2.setInteractive();
	eq2.once('pointerdown', () => this.opcionPulsada('eq2'));
	this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(eq2);
        
        lienzo.fillStyle(0x07B438);
        lienzo.fillRect(1220,545,320,90);
        this.add.text(1250, 550, 'Equiv. 3', { color: 'black', fontFamily: 'Arial', fontSize: '70px '});
        
        const eq3= this.add.zone(1220, 545, 320, 90);
	eq3.setOrigin(0);
	eq3.setInteractive();
	eq3.once('pointerdown', () => this.opcionPulsada('eq3'));
	this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(eq3);
        
        //Suma
            //iguales
        lienzo.fillStyle(0XAEB407);
        lienzo.fillRect(200,645,320,90);
        this.add.text(230, 645, 'Suma 1', { color: 'black', fontFamily: 'Arial', fontSize: '70px '});
        
        const s1 = this.add.zone(200, 645, 320, 90);
	s1.setOrigin(0);
	s1.setInteractive();
	s1.once('pointerdown', () => this.opcionPulsada('s1'));
	this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(s1);
            //medios, cuartos y octavos
        lienzo.fillStyle(0X58B407);
        lienzo.fillRect(600,645,320,90);
        this.add.text(630, 645, 'Suma 2', { color: 'black', fontFamily: 'Arial', fontSize: '70px '});
        
        const s2 = this.add.zone(600, 645, 320, 90);
	s2.setOrigin(0);
	s2.setInteractive();
	s2.once('pointerdown', () => this.opcionPulsada('s2'));
	this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(s2);
/*            //tercios, sextos, novenos
        lienzo.fillStyle(0X07B40D);
        lienzo.fillRect(1000,645,320,90);
        this.add.text(1030, 645, 'Suma 3', { color: 'black', fontFamily: 'Arial', fontSize: '70px '});
        
        const s3 = this.add.zone(1000, 645, 320, 90);
	s3.setOrigin(0);
	s3.setInteractive();
	s3.once('pointerdown', () => this.opcionPulsada('s3'));
	this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(s3);
            //cuales quiera
        lienzo.fillStyle(0X07B463);
        lienzo.fillRect(1400,645,320,90);
        this.add.text(1430, 645, 'Suma 4', { color: 'black', fontFamily: 'Arial', fontSize: '70px '});
        
        const s4 = this.add.zone(1400, 645, 320, 90);
	s4.setOrigin(0);
	s4.setInteractive();
	s4.once('pointerdown', () => this.opcionPulsada('s4'));
	this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(s4);
        
        //RESTA
            //iguales
        lienzo.fillStyle(0XAEB407);
        lienzo.fillRect(200,745,320,90);
        this.add.text(230, 745, 'Resta 1', { color: 'black', fontFamily: 'Arial', fontSize: '70px '});
        
        const r1 = this.add.zone(200, 745, 320, 90);
	r1.setOrigin(0);
	r1.setInteractive();
	r1.once('pointerdown', () => this.opcionPulsada('r1'));
	this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(r1);
            //medios, cuartos y octavos
        lienzo.fillStyle(0X58B407);
        lienzo.fillRect(600,745,320,90);
        this.add.text(630, 745, 'Resta 2', { color: 'black', fontFamily: 'Arial', fontSize: '70px '});
        
        const r2 = this.add.zone(600, 745, 320, 90);
	r2.setOrigin(0);
	r2.setInteractive();
	r2.once('pointerdown', () => this.opcionPulsada('r2'));
	this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(r2);
            //tercios, sextos, novenos
        lienzo.fillStyle(0X07B40D);
        lienzo.fillRect(1000,745,320,90);
        this.add.text(1030, 745, 'Resta 3', { color: 'black', fontFamily: 'Arial', fontSize: '70px '});
        
        const r3 = this.add.zone(1000, 745, 320, 90);
	r3.setOrigin(0);
	r3.setInteractive();
	r3.once('pointerdown', () => this.opcionPulsada('r3'));
	this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(r3);
            //cuales quiera
        lienzo.fillStyle(0X07B463);
        lienzo.fillRect(1400,745,320,90);
        this.add.text(1430, 745, 'Resta 4', { color: 'black', fontFamily: 'Arial', fontSize: '70px '});
        
        const r4 = this.add.zone(1400, 745, 320, 90);
	r4.setOrigin(0);
	r4.setInteractive();
	r4.once('pointerdown', () => this.opcionPulsada('r4'));
	this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(r4);
        
        //Division
        //Iguales
        lienzo.fillStyle(0X58B407);
        lienzo.fillRect(600,845,320,90);
        this.add.text(630, 850, 'Div. 1', { color: 'black', fontFamily: 'Arial', fontSize: '70px '});
        
        const d1 = this.add.zone(600, 845, 320, 90);
	d1.setOrigin(0);
	d1.setInteractive();
	d1.once('pointerdown', () => this.opcionPulsada('d1'));
	this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(d1);
        
        lienzo.fillStyle(0X07B40D);
        lienzo.fillRect(1000,845,320,90);
        this.add.text(1030, 850, 'Div. 2', { color: 'black', fontFamily: 'Arial', fontSize: '70px '});
        
        const d2 = this.add.zone(1000, 845, 320, 90);
	d2.setOrigin(0);
	d2.setInteractive();
	d2.once('pointerdown', () => this.opcionPulsada('d2'));
	this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(d2);
        */
    }
    opcionPulsada(opcion) {
	if (opcion === 'explorar') {
		this.scene.start('Explora');
	} else if (opcion === 'm1'){
		this.scene.start('Pro');
	} else if (opcion === 'm2'){
            this.scene.start('Prob');
        } else if (opcion === 'eq1'){
            this.scene.start('Probl');
        } else if (opcion === 'eq2'){
            this.scene.start('Eq2');
            //console.log("eq2");
        } else if (opcion === 'eq3'){
            this.scene.start('Eq3');
        } else if (opcion === 's1'){
            this.scene.start('S1');
        } else  if (opcion === 's2'){
            this.scene.start('S2');
        } else {
            console.log(opcion);
        }
    }
}
class Explora extends Phaser.Scene{
    
    constructor() {
	super('Explora');
        var fra;
        var px, limx;
    }
    preload(){
        this.load.image('fondo','./asset/img/background.png');
        this.load.image('inicio','./asset/img/inicio.png');       
        this.load.image('1','./asset/img/1.png');
        this.load.image('2','./asset/img/12.png');
        this.load.image('3','./asset/img/13.png');
        this.load.image('4','./asset/img/14.png');
        this.load.image('5','./asset/img/15.png');
        this.load.image('6','./asset/img/16.png');
        this.load.image('7','./asset/img/17.png');
        this.load.image('8','./asset/img/18.png');
        this.load.image('9','./asset/img/19.png');
        this.load.image('10','./asset/img/110.png');
    }
    create(){
        this.add.image(960,540,'fondo');
        this.inicio = this.add.image(130,130,'inicio');
        this.inicio.setScale(0.5);
        this.add.image(960,720,'base');
        this.x1=300,this.x2=1600,this.y1=700,this.y2=700; 
        
        
        const inicio = this.add.zone(0, 0, 250, 250);
        inicio.setOrigin(0);
        inicio.setInteractive();
        inicio.once('pointerdown', () => this.opcionPulsada('inicio'));
        
        this.fra = new Array();
                       
        for(var i=0;i<10;i++){
            for(var j=0;j<=i;j++){
                this.fra.push(this.add.image(330+j*1260/(i+1),275+i*50,''+(i+1)).setOrigin(0, 0));
                
            }
            
        }
        for(var i=0;i<10;i++){
            for(var j=0;j<=i;j++){
                var x = i*(i-1)/2+(j+i) ;
                this.fra[x].depth=i;                
            }
        }
        
        for(var i=0;i<this.fra.length;i++){            
            this.fra[i].setInteractive();
            this.input.setDraggable(this.fra[i]);            
        }
        
        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
                //console.log(gameObject);
                var x = 1260/gameObject.width;
                //console.log("x = "+x);
                for(var i = 0;i<x;i++){
                    if(330+(i-0.5)*gameObject.width<dragX && dragX<330+(i+0.5)*gameObject.width){
                        gameObject.x=330+i*gameObject.width;
                    }
                }
                for(var i=0;i<22;i++){
                    if(i*50<dragY && i*50+50>dragY){
                        gameObject.y = 25+i*50;
                    }
                }
                //gameObject.depth=x;
            });
        
        this.debug = this.add.graphics();
        //this.cursors = this.input.keyboard.createCursorKeys();
        
    }
    update(){
        
    }
    limites(i,x,x0){
        if(this.limx[i]<x && x<this.limx[i+1]){
            return this.px[i];
        }
        return x0;
    }
    opcionPulsada(opcion) {
	this.scene.start('menu');
    }
}
class Pro extends Phaser.Scene{
    
    constructor() {
        super('Pro');
        this.a = 0;
    }
    preload(){
        this.load.image('fondo','./asset/img/background.png');
        this.load.image('inicio','./asset/img/inicio.png');
        this.etiq = ['uno', 'la mitad', 'un tercio', 'un cuarto', 'un quinto', 'un sexto', 'un séptimo',
                    'un octavo', 'un noveno', 'un décimo'];        
    }
    create(){
        this.add.image(960,540,'fondo');
        this.inicio = this.add.image(130,130,'inicio');
        this.inicio.setScale(0.5);
        
        this.lienzo2 = this.add.graphics();
        this.lienzo2.fillStyle(0xff0000);
        this.lienzo2.setAlpha(this.a);
        this.lienzo2.fillRect(0,0,1920,1080);
        
        const inicio = this.add.zone(0, 0, 250, 250);
        inicio.setOrigin(0);
        inicio.setInteractive();
        inicio.once('pointerdown', () => this.opcionPulsada('inicio'));
        
        var lienzo = this.add.graphics();
        lienzo.fillStyle(0xff0000);
        lienzo.fillRect(1600,50,300,100);
        this.add.text(1685, 75, 'Ayuda', { color: 'black', fontFamily: 'Arial', fontSize: '50px '});
        
        const ayuda = this.add.zone(1600, 50, 300,100);
        ayuda.setOrigin(0);
        ayuda.setInteractive();
        ayuda.once('pointerdown', () => this.opcionPulsada('ayuda'));
        
        var x = Math.floor(Math.random()*3+2);
        var y = Math.floor(Math.floor(10/x)*Math.random())+1;
        
        var h1 = this.add.dom(960, 175, 'h1', null, '¿Cuánto es ' + this.etiq[x-1]
                + ' de '+ this.etiq[y-1] + '?');
        h1.setClassName('Chrome');
        
        var botones = new Array();
        var element =new Array();
        for(var i=0;i<10;i++){
                botones.push(document.createElement('button'));
                botones[i].setAttribute('type','button');
                element.push(this.add.dom(400+(i%5)*300, 500+Math.floor(i/5)*110, botones[i], null ,this.etiq[i]));
                element[i].addListener('click');
                
        }
        element[0].on('click',() => this.corregir( x,y,1));
        element[1].on('click',() => this.corregir( x,y,2));
        element[2].on('click',() => this.corregir( x,y,3));
        element[3].on('click',() => this.corregir( x,y,4));
        element[4].on('click',() => this.corregir( x,y,5));
        element[5].on('click',() => this.corregir( x,y,6));
        element[6].on('click',() => this.corregir( x,y,7));
        element[7].on('click',() => this.corregir( x,y,8));
        element[8].on('click',() => this.corregir( x,y,9));
        element[9].on('click',() => this.corregir( x,y,10));
    }
    update(time,delta){
        if(this.a>0){
            this.a-=0.5*delta/1000;
        }else{
            this.a=0;
        }
        this.lienzo2.clear();
        this.lienzo2.setAlpha(this.a);
        this.lienzo2.fillStyle(0xff0000);
        this.lienzo2.fillRect(0,0,1920,1080);
        
    }
    opcionPulsada(opcion) {
        if(opcion === "inicio"){
            this.scene.start('menu');
        }else if(opcion === "ayuda"){
            window.open('ayuda.html','Ayuda',"width=960, height=540");
        }
    }
    corregir(x,y,i){
        if((x*y) === i){
            this.scene.start('Ganar');
        }else{
            this.a=0.75;
        }
    }
}
class Prob extends Phaser.Scene{
    constructor() {
        super('Prob');
        this.a = 0;
    }
    preload(){
        this.load.image('fondo','./asset/img/background.png');
        this.load.image('inicio','./asset/img/inicio.png');
        this.load.css('80s', './src/fuente.css');
    }
    create(){
        this.add.image(960,540,'fondo');
        this.inicio = this.add.image(130,130,'inicio');
        this.inicio.setScale(0.5);
        this.lienzo = this.add.graphics();
        this.lienzo.lineStyle(10, 0x000000, 1);
           
        
        const inicio = this.add.zone(0, 0, 250, 250);
        inicio.setOrigin(0);
        inicio.setInteractive();
        inicio.once('pointerdown', () => this.opcionPulsada('inicio'));
        var y1 = Math.floor(Math.random()*9)+2;
        var y2 = Math.floor(Math.random()*9)+2;
        
        var f = [Math.floor(Math.random()*y1+1),y1,Math.floor(Math.random()*y2+1),y2];
        
        var div = document.createElement('h1');
        div.style = 'width: 1000px; font-size: 80px; ';
        /*var span = new Array();
        span.push(document.createElement('span'));
        span[0].setAttribute("class","fup");
        span[0].innerText = f[0].toString();
        */
        
        div.innerHTML ='¿Cuánto es <div class="fraction"><span class="fup">'+f[0]+
                       '</span><span class="bar">/</span><span class="fdn">'+
                       f[1]+'</span></div> de <div class="fraction"><span class="fup">'+f[2]+
                       '</span><span class="bar">/</span><span class="fdn">'+
                       f[3]+'</span></div>?';
        this.add.dom(960, 300, div);
        
        
        
        var respuesta = document.createElement('input');
        respuesta.setAttribute('type'  ,'number');
        respuesta.setAttribute('id','respuestaN');
        this.add.dom(1260, 640, respuesta);
        var respuesta = document.createElement('input');
        respuesta.setAttribute('type'  ,'number');
        respuesta.setAttribute('id','respuestaD');
        this.add.dom(1260, 740, respuesta);
        this.lienzo.lineStyle(10, 0x000000, 1);
        this.lienzo.lineBetween(1110, 690, 1410, 690);
        this.add.text(500, 640, 'Respuesta =', { color: 'black', fontFamily: 'Arial', fontSize: '100px '});
        
        var boton = document.createElement('button');
        boton.setAttribute('type','button');
        this.element = this.add.dom(1600, 690, boton,'','Corregir');
        this.element.addListener('click');
        this.element.on('click',() => this.corregir(f[0],f[1],f[2],f[3]));
        
        this.input.keyboard.on('keydown-ENTER',() => this.corregir(f[0],f[1],f[2],f[3]));
        
        this.lienzo2 = this.add.graphics();
        this.lienzo2.fillStyle(0xff0000);
        this.lienzo2.setAlpha(this.a);
        this.lienzo2.fillRect(0,0,1920,1080);
    }
    update(time, delta){
        if(this.a>0){
            this.a-=0.5*delta/1000;
        }else{
            this.a=0;
        }
        this.lienzo2.clear();
        this.lienzo2.setAlpha(this.a);
        this.lienzo2.fillStyle(0xff0000);
        this.lienzo2.fillRect(0,0,1920,1080);
    }
    opcionPulsada(opcion) {
        if(opcion === "inicio"){
            this.scene.start('menu');
        }else if(opcion === 'otro'){
            this.scene.start('Prob');
        }else{
            
        }
    }
    corregir(x1,y1,x2,y2){
        console.log("Corregir");
        var r1=document.getElementById('respuestaN');
        var r2=document.getElementById('respuestaD');
        console.log(x1,y1,x2,y2);
        console.log(r1.value,r2.value);
        if((x1*x2)+"" === r1.value && (y1*y2)+"" === r2.value){
            this.input.keyboard.off('keydown-ENTER');
            this.element.visible=false;
            this.lienzo.fillStyle(0x00ff00);
            this.lienzo.fillRect(1300,50,300,100);
            this.opc= this.add.text(1335, 75, '¿OTRO?', { color: 'black', fontFamily: 'Arial', fontSize: '50px '});
                
            const otro = this.add.zone(1300, 50, 300,100);
                otro.setOrigin(0);
                otro.setInteractive();
                otro.once('pointerdown', () => this.opcionPulsada('otro'));
                
            var h2 = this.add.dom(1100, 500, 'h2', null, 'Ganaste ');
            h2.setClassName('dreams');
            h2.setAngle(-15);
            
        }else{
            this.a=0.75;
        }
    }
}
class Probl extends Phaser.Scene{
    constructor() {
            super('Probl');
            this.a = 0;
            
	}
    preload(){
        this.load.image('fondo','./asset/img/background.png');
        this.load.image('inicio','./asset/img/inicio.png');
        this.load.css('80s', './src/fuente.css');
        this.etiq = ['uno', 'medios', 'tercios', 'cuartos', 'quintos', 'sextos',
                    'séptimos', 'octavos', 'novenos', 'décimos'];
    }
    create(){
        this.add.image(960,540,'fondo');
        this.add.image(960,540,'fondo');
        this.inicio = this.add.image(130,130,'inicio');
        this.inicio.setScale(0.5);
        this.lienzo = this.add.graphics();
        this.lienzo.lineStyle(10, 0x000000, 1);
           
        
        const inicio = this.add.zone(0, 0, 250, 250);
        inicio.setOrigin(0);
        inicio.setInteractive();
        inicio.once('pointerdown', () => this.opcionPulsada('inicio'));
        
        this.lienzo = this.add.graphics();
        this.lienzo.fillStyle(0xff0000);
        this.lienzo.fillRect(1600,50,300,100);
        this.opc= this.add.text(1685, 75, 'Ayuda', { color: 'black', fontFamily: 'Arial', fontSize: '50px '});
        
        const ayuda = this.add.zone(1600, 50, 300,100);
        ayuda.setOrigin(0);
        ayuda.setInteractive();
        ayuda.once('pointerdown', () => this.opcionPulsada('ayuda'));
        
        var y1 = Math.floor(Math.random()*4)+2;
        var y2 = Math.floor(Math.random()*(Math.floor(10/y1)-1))+2;
        
        var f = [Math.floor(Math.random()*(y1-1)+1),y1];
        
        var div = document.createElement('h1');
        div.style = 'width: 1000px; font-size: 80px; ';
        /*var span = new Array();
        span.push(document.createElement('span'));
        span[0].setAttribute("class","fup");
        span[0].innerText = f[0].toString();
        */
        console.log("y1 = "+y1);
        console.log("y2 = "+y2);
        console.log("y1*y2 = "+(y1*y2));
       
        div.innerHTML ='¿Cuántos <div class="verde">'+this.etiq[y1*y2-1] +'</div><br>son <div class="fraction"><span class="fup">'+f[0]+
                       '</span><span class="bar">/</span><span class="fdn">'+
                       f[1]+'</span></div>?';
        
        this.add.dom(960, 300, div);
        
        
        
        var respuesta = document.createElement('input');
        respuesta.setAttribute('type'  ,'number');
        respuesta.setAttribute('id','respuesta');
        this.res = this.add.dom(910, 690, respuesta);
        this.texto = this.add.text(180, 630, 'Respuesta =', { color: 'black', fontFamily: 'Arial', fontSize: '100px '});
        this.texto2 = this.add.text(1100, 630, this.etiq[y1*y2-1], { color: 'black', fontFamily: 'Arial', fontSize: '100px '});
        
        var boton = document.createElement('button');
        boton.setAttribute('type','button');
        this.element = this.add.dom(1630, 685, boton,'','Corregir');
        this.element.addListener('click');
        this.element.on('click',() => this.corregir(f[0],y1,y2));
        
        this.input.keyboard.on('keydown-ENTER',() => this.corregir(f[0],y1,y2));
        
        this.lienzo2 = this.add.graphics();
        this.lienzo2.fillStyle(0xff0000);
        this.lienzo2.setAlpha(this.a);
        this.lienzo2.fillRect(0,0,1920,1080);
        
        
    }
    update(time,delta){
        if(this.a>0){
            this.a-=0.5*delta/1000;
        }else{
            this.a=0;
        }
        this.lienzo2.clear();
        this.lienzo2.setAlpha(this.a);
        this.lienzo2.fillStyle(0xff0000);
        this.lienzo2.fillRect(0,0,1920,1080);
    }
    opcionPulsada(opcion) {
        if(opcion === "inicio"){
            this.scene.start('menu');
        }else if(opcion === "ayuda"){
            window.open('ayuda.html','Ayuda',"width=960, height=540");
        }else{
            this.scene.start('Probl');
        }
    }
    corregir(n,y1,y2){//n=numerador  y1=denominador y2= cambio

        var r1=document.getElementById('respuesta');
        console.log(n);
        console.log(y1); 
        console.log(y2);
        if((n*y2)+"" === r1.value ){
            //this.scene.start('Ganar');
            
            this.texto.visible=false;
            this.texto2.visible=false;
            this.add.text(680, 740, y1.toString(), { color: 'red', fontFamily: 'Arial', fontSize: '100px '});
            var div = document.createElement('div');
            div.style = 'font-size: 100px; ';
            div.innerHTML ="&times;"; //&divide;
            this.add.dom(770, 790, div);
            //this.add.text(740, 740, 'x', { color: 'black', fontFamily: 'Arial', fontSize: '80px '});
            this.add.text(1040, 740, '=', { color: 'black', fontFamily: 'Arial', fontSize: '80px '});
            this.add.text(1100, 740, (y1*y2).toString(), { color: 'green', fontFamily: 'Arial', fontSize: '100px '});
            r1.value="";
            this.element.off('click');
            this.element.on('click',() => this.corregir2(n,y2));
            
            this.input.keyboard.off('keydown-ENTER');
            this.input.keyboard.on('keydown-ENTER',() => this.corregir2(n,y2));
            
            this.element.y+= 100;
            this.res.y+=100;
        }else{
            this.a=0.75;
        }
    }
    corregir2(n,r){//n=numerador  d=denominador r= cambio
        console.log("Corrigiendo 2");
        var r1=document.getElementById('respuesta');
        if(r1.value === r.toString() ){
            this.add.text(800, 740, r.toString(), { color: 'black', fontFamily: 'Arial', fontSize: '100px '});
            this.add.text(680, 640, n.toString(), { color: 'black', fontFamily: 'Arial', fontSize: '100px '});
            var div = document.createElement('div');
            div.style = 'font-size: 100px; ';
            div.innerHTML ="&times;";
            this.add.dom(770, 690, div);
            //this.add.text(740, 640, 'x', { color: 'black', fontFamily: 'Arial', fontSize: '80px '});
            this.add.text(800, 640, r.toString(), { color: 'black', fontFamily: 'Arial', fontSize: '100px '});
            this.add.text(1040, 640, '=', { color: 'black', fontFamily: 'Arial', fontSize: '80px '});
            this.res.y-=100;
            this.res.x=1200;
            r1.value="";
            this.lienzo.lineStyle(5, 0x000000, 1);
            this.lienzo.lineBetween(680, 740, 750, 740);
            this.element.off('click');
            this.element.on('click',() => this.corregir3((n*r)));
            this.input.keyboard.off('keydown-ENTER');
            this.input.keyboard.on('keydown-ENTER',() => this.corregir3(n*r));
        }else{
            this.a=0.75;
        }
    }
    corregir3(r){//r=respuesta
        console.log("Corrigiendo 3");
        var r1=document.getElementById('respuesta');
        if(r1.value === r.toString() ){
            console.log("Correcto");
            this.lienzo.fillStyle(0x00ff00);
            this.lienzo.fillRect(1300,50,300,100);
            this.opc= this.add.text(1335, 75, '¿OTRO?', { color: 'black', fontFamily: 'Arial', fontSize: '50px '});
            this.element.visible=false;
            this.res.visible=false;
            
            this.input.keyboard.off('keydown-ENTER');
            
            
            this.add.text(1100, 640, r.toString(), { color: 'black', fontFamily: 'Arial', fontSize: '100px '});
            this.lienzo.lineStyle(5, 0x000000, 1);
            this.lienzo.lineBetween(1100, 740, 1170, 740);
            const otro = this.add.zone(1300, 50, 300,100);
            otro.setOrigin(0);
            otro.setInteractive();
            otro.once('pointerdown', () => this.opcionPulsada('otro'));
            
            
            var h2 = this.add.dom(1100, 500, 'h2', null, 'Ganaste ');

            h2.setClassName('dreams');
            h2.setAngle(-15);

            
        }else{
            this.a=0.75;
        }
    }
}
class Ganar extends Phaser.Scene{
    constructor() {
		super('Ganar');
	}
    preload(){
        this.load.image('fondo','./asset/img/background.png');
        this.load.image('inicio','./asset/img/inicio.png');
        this.load.css('80s', './src/fuente.css');
        
        
    }
    create(){
        //this.add.image(960,540,'fondo');
        this.inicio = this.add.image(130,130,'inicio');
        this.inicio.setScale(0.5);
        const inicio = this.add.zone(0, 0, 250, 250);
	inicio.setOrigin(0);
	inicio.setInteractive();
	inicio.once('pointerdown', () => this.opcionPulsada('inicio'));
        
        var h1 = this.add.dom(960, 200, 'h1', null, 'Correcto');

        h1.setClassName('chrome');

        var h2 = this.add.dom(1100, 350, 'h2', null, 'Ganaste');

        h2.setClassName('dreams');
        h2.setAngle(-15);

        this.tweens.add({
            targets: [ h1, h2 ],
            y: 800,
            duration: 3000,
            ease: 'Sine.easeInOut',
            loop: -1,
            yoyo: true
        });
    }
    opcionPulsada(opcion) {
        this.scene.start('menu');
    }
    
}
class Eq2 extends Phaser.Scene{
    constructor() {
		super('Eq2');
    }
    preload(){
        this.load.image('fondo','./asset/img/background.png');
        this.load.image('inicio','./asset/img/inicio.png');
        this.load.css('80s', './src/fuente.css');
        this.etiq = ['uno', 'medios', 'tercios', 'cuartos', 'quintos', 'sextos',
                    'séptimos', 'octavos', 'novenos', 'décimos'];
    }
    create(){
        this.add.image(960,540,'fondo');
        this.add.image(960,540,'fondo');
        this.inicio = this.add.image(130,130,'inicio');
        this.inicio.setScale(0.5);
        this.lienzo = this.add.graphics();
        this.lienzo.lineStyle(10, 0x000000, 1);
           
        
        const inicio = this.add.zone(0, 0, 250, 250);
        inicio.setOrigin(0);
        inicio.setInteractive();
        inicio.once('pointerdown', () => this.opcionPulsada('inicio'));
        
        this.lienzo = this.add.graphics();
        this.lienzo.fillStyle(0xff0000);
        this.lienzo.fillRect(1600,50,300,100);
        this.opc= this.add.text(1685, 75, 'Ayuda', { color: 'black', fontFamily: 'Arial', fontSize: '50px '});
        
        const ayuda = this.add.zone(1600, 50, 300,100);
        ayuda.setOrigin(0);
        ayuda.setInteractive();
        ayuda.once('pointerdown', () => this.opcionPulsada('ayuda'));
        
        var d = Math.floor(Math.random()*4)+2;
        var r = Math.floor(Math.random()*(Math.floor(10/d)-1))+2;
        
        var f = [Math.floor(Math.random()*(d-1)+1),d];
        
        var div = document.createElement('h1');
        div.style = 'width: 1000px; font-size: 80px; ';
        
        console.log("n = "+d);
        console.log("r = "+r);
        console.log("n*r = "+(d*r));
       
        div.innerHTML ='¿Cuántos <div class="verde">'+this.etiq[d-1] +'</div><br>son <div class="fraction"><span class="fup">'+(r*f[0])+
                       '</span><span class="bar">/</span><span class="fdn">'+
                       (r*f[1])+'</span></div>?';
        
        this.add.dom(960, 300, div);
        
        
        
        var respuesta = document.createElement('input');
        respuesta.setAttribute('type'  ,'number');
        respuesta.setAttribute('id','respuesta');
        this.res = this.add.dom(910, 690, respuesta);
        this.texto = this.add.text(180, 630, 'Respuesta =', { color: 'black', fontFamily: 'Arial', fontSize: '100px '});
        this.texto2 = this.add.text(1100, 630, this.etiq[d-1], { color: 'black', fontFamily: 'Arial', fontSize: '100px '});
        
        var boton = document.createElement('button');
        boton.setAttribute('type','button');
        this.element = this.add.dom(1630, 685, boton,'','Corregir');
        this.element.addListener('click');
        this.element.on('click',() => this.corregir(f[0],d,r));
        
       
        this.input.keyboard.on('keydown-ENTER',() => this.corregir(f[0],d,r));
        
        this.lienzo2 = this.add.graphics();
        this.lienzo2.fillStyle(0xff0000);
        this.lienzo2.setAlpha(this.a);
        this.lienzo2.fillRect(0,0,1920,1080);
        
        
    }
    update(time,delta){
        if(this.a>0){
            this.a-=0.5*delta/1000;
        }else{
            this.a=0;
        }
        this.lienzo2.clear();
        this.lienzo2.setAlpha(this.a);
        this.lienzo2.fillStyle(0xff0000);
        this.lienzo2.fillRect(0,0,1920,1080);
    }
    opcionPulsada(opcion) {
        if(opcion === "inicio"){
            this.scene.start('menu');
        }else if(opcion === "ayuda"){
            window.open('ayuda.html','Ayuda',"width=960, height=540");
        }else{
            this.scene.start('Eq2');
        }
    }
    corregir(n,d,r){//n=numerador d=denominador r= cambio

        var r1=document.getElementById('respuesta');
        console.log(n);
        console.log(d); 
        console.log(r);
        if((n)+"" === r1.value ){
            //this.scene.start('Ganar');
            
            this.texto.visible=false;
            this.texto2.visible=false;
            this.add.text(630, 740, (d*r).toString(), { color: 'red', fontFamily: 'Arial', fontSize: '100px '});
            var div = document.createElement('div');
            div.style = 'font-size: 100px; ';
            div.innerHTML ="&divide;"; //&divide;
            this.add.dom(770, 790, div);
            //this.add.text(740, 740, 'x', { color: 'black', fontFamily: 'Arial', fontSize: '80px '});
            this.add.text(1040, 740, '=', { color: 'black', fontFamily: 'Arial', fontSize: '80px '});
            this.add.text(1100, 740, (d).toString(), { color: 'green', fontFamily: 'Arial', fontSize: '100px '});
            r1.value="";
            this.element.off('click');
            this.element.on('click',() => this.corregir2(n,r));
            this.input.keyboard.off('keydown-ENTER');
            this.input.keyboard.on('keydown-ENTER',() => this.corregir2(n,r));
            this.element.y+= 100;
            this.res.y+=100;
        }else{
            this.a=0.75;
        }
    }
    corregir2(n,r){//n=numerador  d=denominador r= cambio
        console.log("Corrigiendo 2");
        var r1=document.getElementById('respuesta');
        if(r1.value === r.toString() ){
            this.add.text(800, 740, r.toString(), { color: 'black', fontFamily: 'Arial', fontSize: '100px '});
            this.add.text(630, 640, (n*r).toString(), { color: 'black', fontFamily: 'Arial', fontSize: '100px '});
            var div = document.createElement('div');
            div.style = 'font-size: 100px; ';
            div.innerHTML ="&divide;";
            this.add.dom(770, 690, div);
            //this.add.text(740, 640, 'x', { color: 'black', fontFamily: 'Arial', fontSize: '80px '});
            this.add.text(800, 640, r.toString(), { color: 'black', fontFamily: 'Arial', fontSize: '100px '});
            this.add.text(1040, 640, '=', { color: 'black', fontFamily: 'Arial', fontSize: '80px '});
            this.res.y-=100;
            this.res.x=1200;
            r1.value="";
            this.lienzo.lineStyle(5, 0x000000, 1);
            this.lienzo.lineBetween(630, 740, 750, 740);
            this.element.off('click');
            this.element.on('click',() => this.corregir3((n)));
            this.input.keyboard.off('keydown-ENTER');
            this.input.keyboard.on('keydown-ENTER',() => this.corregir3(n));
            
        }else{
            this.a=0.75;
        }
    }
    corregir3(r){//r=respuesta
        console.log("Corrigiendo 3");
        var r1=document.getElementById('respuesta');
        if(r1.value === r.toString() ){
            console.log("Correcto");
            this.lienzo.fillStyle(0x00ff00);
            this.lienzo.fillRect(1300,50,300,100);
            this.opc= this.add.text(1335, 75, '¿OTRO?', { color: 'black', fontFamily: 'Arial', fontSize: '50px '});
            this.element.visible=false;
            this.res.visible=false;
            this.input.keyboard.off('keydown-ENTER');
            
            this.add.text(1100, 640, r.toString(), { color: 'black', fontFamily: 'Arial', fontSize: '100px '});
            this.lienzo.lineStyle(5, 0x000000, 1);
            this.lienzo.lineBetween(1100, 740, 1170, 740);
            const otro = this.add.zone(1300, 50, 300,100);
            otro.setOrigin(0);
            otro.setInteractive();
            otro.once('pointerdown', () => this.opcionPulsada('otro'));
            
            
            var h2 = this.add.dom(1100, 500, 'h2', null, 'Ganaste ');

            h2.setClassName('dreams');
            h2.setAngle(-15);

            
        }else{
            this.a=0.75;
        }
    }
}
class Eq3 extends Phaser.Scene{
    constructor() {
		super('Eq3');
    }
    preload(){
        this.load.image('fondo','./asset/img/background.png');
        this.load.image('inicio','./asset/img/inicio.png');
        this.load.css('80s', './src/fuente.css');
        //this.etiq = ['uno', 'medios', 'tercios', 'cuartos', 'quintos', 'sextos',
        //            'séptimos', 'octavos', 'novenos', 'décimos'];
        this.primos = [2,3,5,7,-1];
    }
    create(){
        this.add.image(960,540,'fondo');
        this.add.image(960,540,'fondo');
        this.inicio = this.add.image(130,130,'inicio');
        this.inicio.setScale(0.5);
        this.lienzo = this.add.graphics();
        this.lienzo.lineStyle(10, 0x000000, 1);
           
        
        const inicio = this.add.zone(0, 0, 250, 250);
        inicio.setOrigin(0);
        inicio.setInteractive();
        inicio.once('pointerdown', () => this.opcionPulsada('inicio'));
        
        /*
        this.lienzo = this.add.graphics();
        this.lienzo.fillStyle(0xff0000);
        this.lienzo.fillRect(1600,50,300,100);
        this.opc= this.add.text(1685, 75, 'Ayuda', { color: 'black', fontFamily: 'Arial', fontSize: '50px '});
        
        const ayuda = this.add.zone(1600, 50, 300,100);
        ayuda.setOrigin(0);
        ayuda.setInteractive();
        ayuda.once('pointerdown', () => this.opcionPulsada('ayuda'));
        */
        var d = Math.floor(Math.random()*4)+2;
        this.r = Math.floor(Math.random()*(9))+2;
        
        this.f = [Math.floor(Math.random()*(d-1)+1)*this.r,d*this.r];
        
        var div = document.createElement('h1');
        div.style = 'width: 1000px; font-size: 80px; ';
        
           
        div.innerHTML ='Simplifica <div class="fraction"><span class="fup">'+(this.f[0])+
                       '</span><span class="bar">/</span><span class="fdn">'+
                       (this.f[1])+'</span></div>';
        
        this.add.dom(960, 300, div);
        this.r=this.mcm(this.f[0],this.f[1]);
        //console.log("mcm("+this.f[0]+","+this.f[1]+")= "+this.mcm(this.f[0],this.f[1]));
        
        
        this.resp =document.createElement('h1');
        this.resp.style = 'width: 1000px; font-size: 50px; ';
        this.resp.innerHTML ='<div class="fraction"><span class="fup">'+(this.f[0])+
                       '</span><span class="bar">/</span><span class="fdn">'+
                       (this.f[1])+'</span></div>';
        this.add.dom(960, 500, this.resp);
        /*var respuesta = document.createElement('input');
        respuesta.setAttribute('type'  ,'number');
        respuesta.setAttribute('id','respuesta');
        this.res = this.add.dom(910, 690, respuesta);
        */
        this.texto = this.add.text(180, 730, '¿Con cuál número simplifico?', { color: 'black', fontFamily: 'Arial', fontSize: '100px '});
        
        var boton = new Array();
        this.element = new Array();
        for(var i=0;i<4;i++){
            boton.push(document.createElement('button'));
            boton[i].setAttribute('type','button');
            boton[i].setAttribute('id',this.primos[i].toString());
            this.element.push(this.add.dom(260+i*300, 885, boton[i],null,this.primos[i].toString())) ; 
            this.element[i].addListener('click');
        }
        boton.push(document.createElement('button'));
        boton[4].setAttribute('type','button');
        boton[4].setAttribute('id',this.primos[4].toString());
        this.element.push(this.add.dom(260+i*300, 885, boton[4],null,"Ninguno")) ; 
        this.element[4].addListener('click');
        
        this.element[0].on('click',() => this.corregir(0));
        this.element[1].on('click',() => this.corregir(1));
        this.element[2].on('click',() => this.corregir(2));
        this.element[3].on('click',() => this.corregir(3));
        this.element[4].on('click',() => this.corregir(4));
        
        this.input.keyboard.on('keydown-TWO',() => this.corregir(0));
        this.input.keyboard.on('keydown-THREE',() => this.corregir(1));
        this.input.keyboard.on('keydown-FIVE',() => this.corregir(2));
        this.input.keyboard.on('keydown-SEVEN',() => this.corregir(3));
        this.input.keyboard.on('keydown-ENTER',() => this.corregir(4));
        
        this.input.keyboard.on('keydown-NUMPAD_TWO',() => this.corregir(0));
        this.input.keyboard.on('keydown-NUMPAD_THREE',() => this.corregir(1));
        this.input.keyboard.on('keydown-NUMPAD_FIVE',() => this.corregir(2));
        this.input.keyboard.on('keydown-NUMPAD_SEVEN',() => this.corregir(3));
        this.input.keyboard.on('keydown-ENTER',() => this.corregir(4));
        
        
        
        this.lienzo2 = this.add.graphics();
        this.lienzo2.fillStyle(0xff0000);
        this.lienzo2.setAlpha(this.a);
        this.lienzo2.fillRect(0,0,1920,1080);
        
        
    }
    update(time,delta){
        if(this.a>0){
            this.a-=0.5*delta/1000;
        }else{
            this.a=0;
        }
        this.lienzo2.clear();
        this.lienzo2.setAlpha(this.a);
        this.lienzo2.fillStyle(0xff0000);
        this.lienzo2.fillRect(0,0,1920,1080);
    }
    mcm(p,q){
        //console.log("mcm("+p+","+q+")");
        if(p>q){
            if(p === q*Math.floor(p/q)){
                return q;
            }else{
                return this.mcm(q,p-q*Math.floor(p/q));
            }
        }else{
            return  this.mcm(q,p);
        }
    }
    opcionPulsada(opcion) {
        if(opcion === "inicio"){
            this.scene.start('menu');
        }else if(opcion === "ayuda"){
            window.open('ayuda.html','Ayuda',"width=960, height=540");
        }else{
            this.scene.start('Eq3');
        }
    }
    corregir(i){//n=numerador d=denominador r= cambio
        var p=this.primos[i];
        if(p === -1){
            if(this.r === 1){
                this.lienzo.fillStyle(0x00ff00);
                this.lienzo.fillRect(1300,50,300,100);
                this.opc= this.add.text(1335, 75, '¿OTRO?', { color: 'black', fontFamily: 'Arial', fontSize: '50px '});
                for(var j=0;j<5;j++){
                    this.element[j].visible=false;
                }
                const otro = this.add.zone(1300, 50, 300,100);
                otro.setOrigin(0);
                otro.setInteractive();
                otro.once('pointerdown', () => this.opcionPulsada('otro'));
                
                var h2 = this.add.dom(1100, 500, 'h2', null, 'Ganaste ');
                h2.setClassName('dreams');
                h2.setAngle(-15);
            }else{
                this.a=0.75;
            }
        }else if((this.r%p)=== 0 ){
            //this.scene.start('Ganar');
            
            this.r /= p;
            this.f[0] /= p;
            this.f[1] /= p;
            this.resp.innerHTML += '<div class="fraction"><span class="fup">(&divide;'+p+
                       ')</span><span class="bar">/</span><span class="fdn">(&divide;'+
                       p+')</span></div>=<div class="fraction"><span class="fup">'+(this.f[0])+
                       '</span><span class="bar">/</span><span class="fdn">'+
                       (this.f[1])+'</span></div>';
            
        }else{
            this.a=0.75;
        }
    }
}
class S1 extends Phaser.Scene{
    constructor() {
        super('S1');
        this.a = 0;
        this.primos = [2,3,5,7,-1];
    }
    preload(){
        this.load.image('fondo','./asset/img/background.png');
        this.load.image('inicio','./asset/img/inicio.png');
    }
    create(){
        this.add.image(960,540,'fondo');
        this.inicio = this.add.image(130,130,'inicio');
        this.inicio.setScale(0.5);
        this.lienzo = this.add.graphics();
        this.lienzo.lineStyle(10, 0x000000, 1);
           
        
        const inicio = this.add.zone(0, 0, 250, 250);
        inicio.setOrigin(0);
        inicio.setInteractive();
        inicio.once('pointerdown', () => this.opcionPulsada('inicio'));
        
        this.d = Math.floor(Math.random()*9)+2;
        this.n1 = Math.floor(Math.random()*(this.d-1))+1;
        this.n2 = Math.floor(Math.random()*(this.d-1))+1;
        
        var div = document.createElement('h1');
        div.style = 'width: 1000px; font-size: 80px; ';
        /*var span = new Array();
        span.push(document.createElement('span'));
        span[0].setAttribute("class","fup");
        span[0].innerText = f[0].toString();
        */
        
        div.innerHTML ='Cuánto es: ';
        this.add.dom(960, 300, div);
        
        this.resp =document.createElement('h1');
        this.resp.style = 'width: 1000px; font-size: 50px; ';
        this.resp.innerHTML ='<div class="fraction"><span class="fup">'+this.n1+
                       '</span><span class="bar">/</span><span class="fdn">'+
                       this.d+'</span></div> &plus; <div class="fraction"><span class="fup">'+this.n2+
                       '</span><span class="bar">/</span><span class="fdn">'+
                       this.d+'</span></div>';
        this.add.dom(960, 500, this.resp);
        
        var respuesta = document.createElement('input');
        respuesta.setAttribute('type'  ,'number');
        respuesta.setAttribute('id','respuestaN');
        this.rn = this.add.dom(1260, 640, respuesta);
        var respuesta = document.createElement('input');
        respuesta.setAttribute('type'  ,'number');
        respuesta.setAttribute('id','respuestaD');
        this.rd = this.add.dom(1260, 740, respuesta);
        this.lienzo.lineStyle(10, 0x000000, 1);
        this.ltext = this.lienzo.lineBetween(1110, 690, 1410, 690);
        
        this.text = this.add.text(500, 640, 'Respuesta =', { color: 'black', fontFamily: 'Arial', fontSize: '100px '});
        
        var boton = document.createElement('button');
        boton.setAttribute('type','button');
        this.element = this.add.dom(1600, 690, boton,'','Corregir');
        this.element.addListener('click');
        this.element.on('click',() => this.corregir());
        

        this.input.keyboard.on('keydown-ENTER',() => this.corregir());
        
        this.lienzo2 = this.add.graphics();
        this.lienzo2.fillStyle(0xff0000);
        this.lienzo2.setAlpha(this.a);
        this.lienzo2.fillRect(0,0,1920,1080);
    }
    update(time, delta){
        if(this.a>0){
            this.a-=0.5*delta/1000;
        }else{
            this.a=0;
        }
        this.lienzo2.clear();
        this.lienzo2.setAlpha(this.a);
        this.lienzo2.fillStyle(0xff0000);
        this.lienzo2.fillRect(0,0,1920,1080);
    }
    opcionPulsada(opcion) {
        if(opcion === "inicio"){
            this.scene.start('menu');
        }else if(opcion === ""+this.xkg_val){
            this.scene.start('Ganar');
        }else{
            this.scene.start('S1');
        }
    }
    corregir(){
        var r1=document.getElementById('respuestaN');
        var r2=document.getElementById('respuestaD');
        this.nr=this.n1+this.n2;
        if(this.nr+"" === r1.value && (this.d)+"" === r2.value){
                this.resp.innerHTML += '=<div class="fraction"><span class="fup">'+this.nr+
                       '</span><span class="bar">/</span><span class="fdn">'+
                       this.d;
                this.element.visible = false;
                this.rn.visible = false;
                this.rd.visible = false;
                this.text.visible = false;
                this.ltext.visible = false;
                this.lienzo.clear();
                this.lienzo.visible = true;
                this.r = this.mcm(this.nr,this.d);
                
                this.texto = this.add.text(180, 730, '¿Con cuál número simplifico?', { color: 'black', fontFamily: 'Arial', fontSize: '100px '});

                var boton = new Array();
                this.element = new Array();
                for(var i=0;i<4;i++){
                    boton.push(document.createElement('button'));
                    boton[i].setAttribute('type','button');
                    
                    this.element.push(this.add.dom(260+i*300, 885, boton[i],null,this.primos[i].toString())) ; 
                    this.element[i].addListener('click');
                }
                boton.push(document.createElement('button'));
                boton[4].setAttribute('type','button');
                boton[4].setAttribute('id',this.primos[4].toString());
                this.element.push(this.add.dom(260+i*300, 885, boton[4],null,"Ninguno")) ; 
                this.element[4].addListener('click');

                this.element[0].on('click',() => this.corregir2(0));
                this.element[1].on('click',() => this.corregir2(1));
                this.element[2].on('click',() => this.corregir2(2));
                this.element[3].on('click',() => this.corregir2(3));
                this.element[4].on('click',() => this.corregir2(4));
                
                this.input.keyboard.off('keydown-ENTER');
                
                this.input.keyboard.on('keydown-TWO',() => this.corregir2(0));
                this.input.keyboard.on('keydown-THREE',() => this.corregir2(1));
                this.input.keyboard.on('keydown-FIVE',() => this.corregir2(2));
                this.input.keyboard.on('keydown-SEVEN',() => this.corregir2(3));
                this.input.keyboard.on('keydown-ENTER',() => this.corregir2(4));

                this.input.keyboard.on('keydown-NUMPAD_TWO',() => this.corregir2(0));
                this.input.keyboard.on('keydown-NUMPAD_THREE',() => this.corregir2(1));
                this.input.keyboard.on('keydown-NUMPAD_FIVE',() => this.corregir2(2));
                this.input.keyboard.on('keydown-NUMPAD_SEVEN',() => this.corregir2(3));
                
                
        }else{
            this.a=0.75;
        }
    }
    mcm(p,q){
        //console.log("mcm("+p+","+q+")");
        if(p>=q){
            if(p === q*Math.floor(p/q)){
                return q;
            }else{
                return this.mcm(q,p-q*Math.floor(p/q));
            }
        }else{
            return  this.mcm(q,p);
        }
    }
    corregir2(i){
        var p=this.primos[i];
        if(p === -1){
            if(this.r === 1){
                this.lienzo.fillStyle(0x00ff00);
                this.lienzo.fillRect(1300,50,300,100);
                this.opc= this.add.text(1335, 75, '¿OTRO?', { color: 'black', fontFamily: 'Arial', fontSize: '50px '});
                for(var j=0;j<5;j++){
                    this.element[j].visible=false;
                }
                const otro = this.add.zone(1300, 50, 300,100);
                otro.setOrigin(0);
                otro.setInteractive();
                otro.once('pointerdown', () => this.opcionPulsada('otro'));
                
                var h2 = this.add.dom(1100, 500, 'h2', null, 'Ganaste ');
                h2.setClassName('dreams');
                h2.setAngle(-15);
            }else{
                this.a=0.75;
            }
        }else if((this.r%p)=== 0 ){
            //this.scene.start('Ganar');
            
            this.r /= p;
            this.nr /= p;
            this.d /= p;
            this.resp.innerHTML += '<div class="fraction"><span class="fup">(&divide;'+p+
                       ')</span><span class="bar">/</span><span class="fdn">(&divide;'+
                       p+')</span></div>=<div class="fraction"><span class="fup">'+(this.nr)+
                       '</span><span class="bar">/</span><span class="fdn">'+
                       (this.d)+'</span></div>';
            
        }else{
            this.a=0.75;
        }
    }
}
class S2 extends Phaser.Scene{
    constructor() {
        super('S2');
        this.a = 0;
        this.primos = [2,3,5,7,-1];
        this.den=[2,4,8];
    }
    preload(){
        this.load.image('fondo','./asset/img/background.png');
        this.load.image('inicio','./asset/img/inicio.png');
    }
    create(){
        this.add.image(960,540,'fondo');
        this.inicio = this.add.image(130,130,'inicio');
        this.inicio.setScale(0.5);
        this.lienzo = this.add.graphics();
        this.lienzo.lineStyle(10, 0x000000, 1);
           
        
        const inicio = this.add.zone(0, 0, 250, 250);
        inicio.setOrigin(0);
        inicio.setInteractive();
        inicio.once('pointerdown', () => this.opcionPulsada('inicio'));
        
        this.d = [this.den[Math.floor(Math.random()*3)],this.den[Math.floor(Math.random()*3)]];
        this.n = [Math.floor(Math.random()*(this.d[0]-1))+1,Math.floor(Math.random()*(this.d[1]-1))+1];
        
        var div = document.createElement('h1');
        div.style = 'width: 1000px; font-size: 80px; ';
        /*var span = new Array();
        span.push(document.createElement('span'));
        span[0].setAttribute("class","fup");
        span[0].innerText = f[0].toString();
        */
        
        div.innerHTML ='Cuánto es: ';
        this.add.dom(960, 300, div);
        
        this.resp =document.createElement('h1');
        this.resp.style = 'width: 1000px; font-size: 50px; ';
        this.resp.innerHTML ='<div class="fraction"><span class="fup">'+this.n[0]+
                       '</span><span class="bar">/</span><span class="fdn">'+
                       this.d[0]+'</span></div> &plus; <div class="fraction"><span class="fup">'+this.n[1]+
                       '</span><span class="bar">/</span><span class="fdn">'+
                       this.d[1]+'</span></div>';
        this.add.dom(960, 500, this.resp);
        /*
        var respuesta = document.createElement('input');
        respuesta.setAttribute('type'  ,'number');
        respuesta.setAttribute('id','respuestaN');
        this.rn = this.add.dom(1260, 640, respuesta);
        var respuesta = document.createElement('input');
        respuesta.setAttribute('type'  ,'number');
        respuesta.setAttribute('id','respuestaD');
        this.rd = this.add.dom(1260, 740, respuesta);
        this.lienzo.lineStyle(10, 0x000000, 1);
        this.ltext = this.lienzo.lineBetween(1110, 690, 1410, 690);
        */
        this.respuesta = document.createElement('input');
        this.respuesta.setAttribute('type'  ,'number');
        this.respuesta.setAttribute('id','respuesta');
        this.rd = this.add.dom(1260, 690, this.respuesta);
        
        this.text = this.add.text(300, 650, 'Denominador común =', { color: 'black', fontFamily: 'Arial', fontSize: '80px '});
        
        var boton = document.createElement('button');
        boton.setAttribute('type','button');
        this.element = this.add.dom(1600, 690, boton,'','Corregir');
        this.element.addListener('click');
        this.element.on('click',() => this.corregir0());
        
        this.input.keyboard.on('keydown-ENTER',() => this.corregir0());
        
        this.lienzo2 = this.add.graphics();
        this.lienzo2.fillStyle(0xff0000);
        this.lienzo2.setAlpha(this.a);
        this.lienzo2.fillRect(0,0,1920,1080);
    }
    update(time, delta){
        if(this.a>0){
            this.a-=0.5*delta/1000;
        }else{
            this.a=0;
        }
        this.lienzo2.clear();
        this.lienzo2.setAlpha(this.a);
        this.lienzo2.fillStyle(0xff0000);
        this.lienzo2.fillRect(0,0,1920,1080);
    }
    opcionPulsada(opcion) {
        if(opcion === "inicio"){
            this.scene.start('menu');
        }else if(opcion === ""+this.xkg_val){
            this.scene.start('Ganar');
        }else{
            this.scene.start('S1');
        }
    }
    corregir0(){
        var r=document.getElementById('respuesta').value;
        if(r===null){
            this.a=0.75;
        }else if(r%this.d[0] === 0 && r%this.d[1]===0 && r > 0){
            
            this.n[0]=this.n[0]*r/this.d[0];
            this.n[1]=this.n[1]*r/this.d[1];
            this.d[0]=r;
            this.d[1]=r;
            this.rd.visible=false;
            this.text.visible=false;
            this.resp.innerHTML += '=<div class="fraction"><span class="fup">'+(this.n[0])+
                       '</span><span class="bar">/</span><span class="fdn">'+
                       r+'</span></div>+<div class="fraction"<span class="fup">'+(this.n[1])+
                       '</span><span class="bar">/</span><span class="fdn">'+
                       r+'</span></div>';
               
            var respuesta = document.createElement('input');
            respuesta.setAttribute('type'  ,'number');
            respuesta.setAttribute('id','respuestaN');
            this.rn = this.add.dom(1260, 640, respuesta);
            var respuesta = document.createElement('input');
            respuesta.setAttribute('type'  ,'number');
            respuesta.setAttribute('id','respuestaD');
            this.rd = this.add.dom(1260, 740, respuesta);
            this.lienzo.lineStyle(10, 0x000000, 1);
            this.ltext = this.lienzo.lineBetween(1110, 690, 1410, 690);

            this.text = this.add.text(500, 640, 'Respuesta =', { color: 'black', fontFamily: 'Arial', fontSize: '100px '});
            
            this.element.off('click');
            this.element.on('click',() => this.corregir());
            
            this.input.keyboard.off('keydown-ENTER');
            this.input.keyboard.on('keydown-ENTER',() => this.corregir());
        }else{
            this.a=0.75;
        }
        
    }
    corregir(){
        var r1=document.getElementById('respuestaN');
        var r2=document.getElementById('respuestaD');
        this.nr=this.n[0]+this.n[1];
        //console.log(this.nr);
        //console.log(this.d[0]);
        if(this.nr+"" === r1.value && (this.d[0])+"" === r2.value){
                this.resp.innerHTML += '=<div class="fraction"><span class="fup">'+this.nr+
                       '</span><span class="bar">/</span><span class="fdn">'+
                       this.d[0];
                this.element.visible = false;
                this.rn.visible = false;
                this.rd.visible = false;
                this.text.visible = false;
                this.ltext.visible = false;
                this.lienzo.clear();
                this.lienzo.visible = true;
                this.r = this.mcm(this.nr,this.d[0]);
                
                this.texto = this.add.text(180, 730, '¿Con cuál número simplifico?', { color: 'black', fontFamily: 'Arial', fontSize: '100px '});

                var boton = new Array();
                this.element = new Array();
                for(var i=0;i<4;i++){
                    boton.push(document.createElement('button'));
                    boton[i].setAttribute('type','button');
                    
                    this.element.push(this.add.dom(260+i*300, 885, boton[i],null,this.primos[i].toString())) ; 
                    this.element[i].addListener('click');
                }
                boton.push(document.createElement('button'));
                boton[4].setAttribute('type','button');
                boton[4].setAttribute('id',this.primos[4].toString());
                this.element.push(this.add.dom(260+i*300, 885, boton[4],null,"Ninguno")) ; 
                this.element[4].addListener('click');

                this.element[0].on('click',() => this.corregir2(0));
                this.element[1].on('click',() => this.corregir2(1));
                this.element[2].on('click',() => this.corregir2(2));
                this.element[3].on('click',() => this.corregir2(3));
                this.element[4].on('click',() => this.corregir2(4));
                
                
                this.input.keyboard.off('keydown-ENTER');
                
                this.input.keyboard.on('keydown-TWO',() => this.corregir2(0));
                this.input.keyboard.on('keydown-THREE',() => this.corregir2(1));
                this.input.keyboard.on('keydown-FIVE',() => this.corregir2(2));
                this.input.keyboard.on('keydown-SEVEN',() => this.corregir2(3));
                this.input.keyboard.on('keydown-ENTER',() => this.corregir2(4));

                this.input.keyboard.on('keydown-NUMPAD_TWO',() => this.corregir2(0));
                this.input.keyboard.on('keydown-NUMPAD_THREE',() => this.corregir2(1));
                this.input.keyboard.on('keydown-NUMPAD_FIVE',() => this.corregir2(2));
                this.input.keyboard.on('keydown-NUMPAD_SEVEN',() => this.corregir2(3));
                
        }else{
            this.a=0.75;
        }
    }
    mcm(p,q){
        console.log("mcm("+p+","+q+")");
        if(p>=q){
            if(p === q*Math.floor(p/q)){
                return q;
            }else{
                return this.mcm(q,p-q*Math.floor(p/q));
            }
        }else{
            return  this.mcm(q,p);
        }
    }
    corregir2(i){
        var p=this.primos[i];
        if(p === -1){
            if(this.r === 1){
                this.lienzo.fillStyle(0x00ff00);
                this.lienzo.fillRect(1300,50,300,100);
                this.opc= this.add.text(1335, 75, '¿OTRO?', { color: 'black', fontFamily: 'Arial', fontSize: '50px '});
                for(var j=0;j<5;j++){
                    this.element[j].visible=false;
                }
                const otro = this.add.zone(1300, 50, 300,100);
                otro.setOrigin(0);
                otro.setInteractive();
                otro.once('pointerdown', () => this.opcionPulsada('otro'));
                
                var h2 = this.add.dom(1100, 500, 'h2', null, 'Ganaste ');
                h2.setClassName('dreams');
                h2.setAngle(-15);
            }else{
                this.a=0.75;
            }
        }else if((this.r%p)=== 0 ){
            //this.scene.start('Ganar');
            
            this.r /= p;
            this.nr /= p;
            this.d[0] /= p;
            this.resp.innerHTML += '<div class="fraction"><span class="fup">(&divide;'+p+
                       ')</span><span class="bar">/</span><span class="fdn">(&divide;'+
                       p+')</span></div>=<div class="fraction"><span class="fup">'+(this.nr)+
                       '</span><span class="bar">/</span><span class="fdn">'+
                       (this.d[0])+'</span></div>';
            
        }else{
            this.a=0.75;
        }
    }
}
const config = {
  type: Phaser.AUTO,
  width: 1920,
  height: 1080,
  backgroundColor: '#080808',
  parent: 'phaser-example',
  dom: {
        createContainer: true
    },
  scene: [menu, Explora, Pro,Prob,Probl,Ganar,Eq2,Eq3,S1,S2],
  scale: {
      mode: Phaser.Scale.Fit
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 100 }
    }
  }
}

var game = new Phaser.Game(config);

