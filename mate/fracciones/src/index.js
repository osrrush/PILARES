/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
const titulo = 'Fracciones'; //Titulo del juego
const menulabel = [['Explorar'],
                ['Contar (1)', 'Sumar(1)', 'Restar(1)', 'Multiplicar (1)'],
                ['Multiplicar (2)','Multiplicar (3)'],
                ['Equivalencia (1)','Equivalencia (2)','Equivalencia (3)'],
                ['Sumar(2)','Sumar(3)','Sumar(4)','Sumar(5)'],
                ['Restar(2)','Restar(3)','Restar(4)','Restar(5)'],
                ['Dividir(1)','Dividir(2)','Dividir(3)','Dividir(4)']]; //Opciones menú
                

//const escenas = [Contar, ENG,s1,s2,s3,r1,r2,r3,m1,m2,m3,d1,d2,d3];
const LargoM = 400; //Largo de boton en menú
const Colores = [0xd0598f,0x33a099,0xfdcf20,0x2272b4]; // Colore PILARES
var a=0,b=0; //Alpha a= error b=correcto
var c,w; //Sonido c=correcto w=equivocado
var rc=0 ; //Contadores rc = respuesta correcta
var num;


class menu extends Phaser.Scene{
    constructor() {
		super({key:'menu'}); //, active:'true'
    }
    preload(){
        this.load.image('logo','./asset/img/logo.jpeg');
        this.load.css('80s','./src/fuente.css');
    }
    create(){
        this.add.image(205,82,'logo');
        var h1 = this.add.dom(960, 150, 'h1', null, titulo);
        h1.setClassName('deepshadow');
        var lienzo =this.add.graphics();
        
        const opc = new Array();
        
        for(var i=0;i<menulabel.length;i++){
            //console.log("i = "+i);
            var x = 960 -menulabel[i].length/2*LargoM-10*(menulabel[i].length-1);
            //console.log("x = "+x);
            for(var j=0; j<menulabel[i].length;j++){
                //console.log("j = "+j);
                var tam = 80*menulabel[i][j].length;
                //console.log("tam = "+tam);
                lienzo.fillStyle(Colores[i%4]);
                lienzo.fillRect(x+(LargoM+20)*j,270+i*100,LargoM,90);
                
                if(tam <= 2*LargoM){
                    this.add.text(x+(LargoM+20)*j+LargoM/2, 270+i*100+45, menulabel[i][j], { color: 'black', fontFamily: 'Arial', fontSize: '80px '}).setOrigin(0.5,0.5);
                } else {
                    var f =Math.floor(80*(2*LargoM)/tam);
                    //console.log("f = "+f);
                    this.add.text(x+(LargoM+20)*j+LargoM/2, 270+i*100+45, menulabel[i][j], { color: 'black', fontFamily: 'Arial', fontSize: f+'px '}).setOrigin(0.5,0.5);
                }
                opc.push(this.add.zone(x+(LargoM+20)*j,270+i*100,LargoM,90));
                
                opc[opc.length-1].setOrigin(0);
                opc[opc.length-1].setInteractive();
                opc[opc.length-1].name = i+"";
                this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(opc[opc.length-1]);
            }
        
            //
            //console.log(opc[i]);
        }
        opc[0].once('pointerdown', () => this.opcionPulsada(0));
        opc[1].once('pointerdown', () => this.opcionPulsada(1));
        opc[2].once('pointerdown', () => this.opcionPulsada(2));
        opc[3].once('pointerdown', () => this.opcionPulsada(3));
        opc[4].once('pointerdown', () => this.opcionPulsada(4));
        opc[5].once('pointerdown', () => this.opcionPulsada(5));
        opc[6].once('pointerdown', () => this.opcionPulsada(6));
        opc[7].once('pointerdown', () => this.opcionPulsada(7));
        opc[8].once('pointerdown', () => this.opcionPulsada(8));
        opc[9].once('pointerdown', () => this.opcionPulsada(9));
        opc[10].once('pointerdown', () => this.opcionPulsada(10));
        opc[11].once('pointerdown', () => this.opcionPulsada(11));
        opc[12].once('pointerdown', () => this.opcionPulsada(12));
        opc[13].once('pointerdown', () => this.opcionPulsada(13));
        opc[14].once('pointerdown', () => this.opcionPulsada(14));
        opc[15].once('pointerdown', () => this.opcionPulsada(15));
        opc[16].once('pointerdown', () => this.opcionPulsada(16));
        opc[17].once('pointerdown', () => this.opcionPulsada(17));
        opc[18].once('pointerdown', () => this.opcionPulsada(18));
        opc[19].once('pointerdown', () => this.opcionPulsada(19));
        opc[20].once('pointerdown', () => this.opcionPulsada(20));
        opc[21].once('pointerdown', () => this.opcionPulsada(21));
    }
    opcionPulsada(opcion) {
        console.log("opcionPulsada("+opcion+")");
        opcion +='';
	if (opcion === '0') {
		this.scene.start('Explora');
	} else if (opcion === '1'){
		this.scene.start('C1');
	} else if (opcion === '2'){
            this.scene.start('S1');
        } else if (opcion === '3'){
            this.scene.start('R1');
        } else if (opcion === '4'){
            this.scene.start('M1');
            //console.log("eq2");
        } else if (opcion === '5'){
            this.scene.start('M2');
        } else if (opcion === '6'){
            this.scene.start('M3');
        } else  if (opcion === '7'){
            this.scene.start('Eq1');
        } else if (opcion === '8'){
            this.scene.start('Eq2');
        } else if (opcion === '9'){
            this.scene.start('Eq3');
        } else  if (opcion === '10'){
            this.scene.start('S2');
        } else  if (opcion === '11'){
            this.scene.start('S3');
        } else if (opcion === '12'){
            this.scene.start('S4');
        } else if (opcion === '13'){
            this.scene.start('S5');
        } else if (opcion === '14'){
            this.scene.start('R2');
        } else  if (opcion === '15'){
            this.scene.start('R3');
        } else if (opcion === '16'){
            this.scene.start('R4');
        } else if (opcion === '17'){
            this.scene.start('R5');
        } else if (opcion === '18'){
            this.scene.start('D1');
        } else if (opcion === '19'){
            this.scene.start('D2');
        } else  if (opcion === '20'){
            this.scene.start('D3');
        } else  if (opcion === '21'){
            this.scene.start('D4');
        } else{
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
        //this.load.image('fondo','./asset/img/logo.jpeg');
        //this.load.image('fondo','./asset/img/background.png');
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
        //this.add.image(0,0,'fondo').setOrigin(0,0);
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

class C1 extends Phaser.Scene{
    
    constructor() {
	super('C1');
        var fra;
        var px, limx;
    }
    preload(){
        this.load.image('inicio','./asset/img/inicio.png');       
        this.load.image('1','./asset/img/1.png');
        this.load.image('P','./asset/img/P.png');
        this.load.css('80s','./src/fuente.css');
        this.load.audio('correct', './asset/sounds/correct.mp3');
        this.load.audio('wrong', './asset/sounds/wrong.mp3');
     
    }
    create(){
        //this.add.image(0,0,'fondo').setOrigin(0,0);
        this.inicio = this.add.image(130,130,'inicio');
        this.inicio.setScale(0.5);
        this.x1=300,this.x2=1600,this.y1=700,this.y2=700; 
        
        
        const inicio = this.add.zone(0, 0, 250, 250);
        inicio.setOrigin(0);
        inicio.setInteractive();
        inicio.once('pointerdown', () => this.opcionPulsada('ini'));
        
        c = this.sound.add('correct',{loop:false});
        w = this.sound.add('wrong',{loop:false});
        
        this.fra = this.add.image(330,300,'1').setOrigin(0, 0);
        this.fra.displayWidth = 1260;
        this.fra.displayHeight = 75;
        
        var y1 = Math.floor(Math.random()*9)+2;
        
        
        this.f = [Math.floor(Math.random()*(y1-1)+1),y1];
        
        this.div = document.createElement('h1');
        this.div.style = 'width: 1500px; font-size: 80px; ';
        /*var span = new Array();
        span.push(document.createElement('span'));
        span[0].setAttribute("class","fup");
        span[0].innerText = f[0].toString();
        */
        console.log(this.f[0]+"/"+this.f[1]);
        
       
        this.div.innerHTML ='Dibujemos  <div class="fraction"><span class="fup">'+this.f[0]+
                       '</span><span class="bar">/</span><span class="fdn">'+
                       this.f[1]+'</span></div> ';
        
        this.add.dom(960, 100, this.div);
        
        
        
         this.input.on('gameobjectup', function (pointer, gameObject)
        {
            gameObject.emit('clicked', gameObject);
        }, this);
        
        this.texto = this.add.text(180, 630, '¿En cuántas partes IGUALES hay que dividir la unidad? ', { color: 'black', fontFamily: 'Arial', fontSize: '60px '});
        this.texto2 = this.add.text(400, 700, "En          partes iguales", { color: 'black', fontFamily: 'Arial', fontSize: '100px '});
        
        var respuesta = document.createElement('input');
        respuesta.setAttribute('type'  ,'number');
        respuesta.setAttribute('id','respuesta');
        respuesta.setAttribute('placeholder','Respuesta');
        this.res = this.add.dom(660, 750, respuesta);
        
        
        var boton = document.createElement('button');
        boton.setAttribute('type','button');
        this.element = this.add.dom(1630, 750, boton,'','Corregir');
        this.element.addListener('click');
        this.element.on('click',() => this.paso());
        
        this.input.keyboard.on('keydown-ENTER',() => this.paso());
        
        
        
        this.debug = this.add.graphics();
        //this.cursors = this.input.keyboard.createCursorKeys();
        this.lienzo = this.add.graphics();
        this.lienzo2= this.add.graphics();
        
    }
    paso(){
        var r = document.getElementById('respuesta').value;
        if(r === this.f[1]+""){
            this.texto.destroy();
            this.texto2.destroy();
            this.res.destroy();
            this.div.innerHTML = 'Selecciona  <div class="fraction"><span class="fup">'+this.f[0]+
                       '</span><span class="bar">/</span><span class="fdn">'+
                       this.f[1]+'</span></div> de la figura';
             
            this.dividir(this.f[1]);
            this.correcto();
            this.element.off('click');
            this.input.keyboard.off('keydown-ENTER');
            
            
            console.log(this.texto._text);
            
            this.element.on('click',() => this.paso2());
            
            this.input.keyboard.on('keydown-ENTER',() => this.paso2());
        }else{
            this.falso();
        }
        
    }
    paso2(){
        if(this.corregir(this.f[1])){
            this.lienzo3 = this.add.graphics();
                this.lienzo3.fillStyle(0x03A9F4);
                this.lienzo3.fillRect(1600,50,300,90);
                this.opc= this.add.text(1750, 95, '¿OTRO?', { color: 'black', fontFamily: 'Arial', fontSize: '50px '}).setOrigin(0.5,0.5);

                const otro = this.add.zone(1600, 50, 300,100);
                    otro.setOrigin(0);
                    otro.setInteractive();
                    otro.on('pointerdown', () => this.opcionPulsada('otro'));
        }
        
    }
    
    correcto(){
        b=0.5;
        c.play();
    }
    falso(){
        a=0.5;
        w.play();
        this.cameras.main.shake(200,0.01);
    }
    dividir(f1){
        for(var i=0;i<f1;i++){
            var imagen = this.add.image(330+1260/f1*i,300,'P').setOrigin(0, 0);
            imagen.displayWidth = 1260/f1;
            imagen.displayHeight = 75;
            imagen.setInteractive();
            imagen.setData({name: i, tocado:0});
            imagen.on('clicked', this.down, this);
        }
    }
    corregir(f1){
        var lista=this.add.displayList.list;
        console.log(lista);
        var tocados = 0;
        for(var i=0;i<f1;i++){
            tocados +=lista[8+i].getData('tocado');
            
        }
        console.log("tocados = "+tocados);
        if(tocados === this.f[0]){
            console.log("Correcto");
            this.correcto();
            return true;
        }else{
            this.falso();
            console.log("Incorrecto");
            return false;
        }
    }
    down(image){
        
        if(image.getData('tocado') === 0){
            image.setTint(Colores[1]);
        }else{
            image.clearTint();
        }
        image.setData('tocado',1-image.getData('tocado'));
        
    }
    update(time,delta){
        if(a>0){
                b=0;
                a-=0.3*delta/1000;
                this.lienzo.clear();
                this.lienzo.setAlpha(a);
                this.lienzo.fillStyle(0xff0000);
                this.lienzo.fillRect(0,0,1920,1080);
                this.lienzo2.clear();
                this.lienzo2.setAlpha(b);
                this.lienzo2.fillStyle(0x00ff00);
                this.lienzo2.fillRect(0,0,1920,1080);
            }else{
                a=0;

            }
            if(b>0){
                a=0;
                b-=0.3*delta/1000;
                this.lienzo.clear();
                this.lienzo.setAlpha(a);
                this.lienzo.fillStyle(0xff0000);
                this.lienzo.fillRect(0,0,1920,1080);
                this.lienzo2.clear();
                this.lienzo2.setAlpha(b);
                this.lienzo2.fillStyle(0x00ff00);
                this.lienzo2.fillRect(0,0,1920,1080);  
            }else{
                b=0;

            }
    }
    
    opcionPulsada(opcion) {
	if(opcion === 'ini'){
            this.scene.start('menu');
        } else if(opcion === 'otro'){
           this.scene.start(this.scene.key);
        }else{
            console.log("A dónde voy?");
        }
    }
}
class S1 extends Phaser.Scene{
    
    constructor() {
	super('S1');
        var fra;
        var px, limx;
    }
    preload(){
        this.load.image('inicio','./asset/img/inicio.png');       
        this.load.image('1','./asset/img/1.png');
        this.load.image('P','./asset/img/P.png');
        this.load.css('80s','./src/fuente.css');
        this.load.audio('correct', './asset/sounds/correct.mp3');
        this.load.audio('wrong', './asset/sounds/wrong.mp3');
     
    }
    create(){
        //this.add.image(0,0,'fondo').setOrigin(0,0);
        this.inicio = this.add.image(130,130,'inicio');
        this.inicio.setScale(0.5);
        this.x1=300,this.x2=1600,this.y1=700,this.y2=700; 
        
        
        const inicio = this.add.zone(0, 0, 250, 250);
        inicio.setOrigin(0);
        inicio.setInteractive();
        inicio.once('pointerdown', () => this.opcionPulsada('ini'));
        
        c = this.sound.add('correct',{loop:false});
        w = this.sound.add('wrong',{loop:false});
        this.debug = this.add.graphics();
        
        
        
        var y1 = Math.floor(Math.random()*15)+2;
        this.dividir(y1);
        
        this.f = [Math.floor(Math.random()*Math.floor(y1/2)+1),Math.floor(Math.random()*Math.floor(y1/2)+1),y1];
        
        this.div = document.createElement('h1');
        this.div.style = 'width: 1500px; font-size: 80px; ';
        /*var span = new Array();
        span.push(document.createElement('span'));
        span[0].setAttribute("class","fup");
        span[0].innerText = f[0].toString();
        */
        console.log(this.f[0]+"/"+this.f[1]);
        
       
        this.div.innerHTML ='Cuánto es  <div class="fraction"><span class="fup">'+this.f[0]+
                       '</span><span class="bar">/</span><span class="fdn">'+
                       this.f[2]+'</span></div> &plus; <div class="fraction"><span class="fup">'+this.f[1]+
                       '</span><span class="bar">/</span><span class="fdn">'+
                       this.f[2]+'</span></div>';
        
        this.add.dom(960, 100, this.div);
        
        
        
         this.input.on('gameobjectup', function (pointer, gameObject)
        {
            gameObject.emit('clicked', gameObject);
        }, this);
        
        var respuesta = document.createElement('input');
        respuesta.setAttribute('type'  ,'number');
        respuesta.setAttribute('id','respuestaN');
        this.add.dom(1260, 640, respuesta);
        var respuesta = document.createElement('input');
        respuesta.setAttribute('type'  ,'number');
        respuesta.setAttribute('id','respuestaD');
        this.add.dom(1260, 740, respuesta);
        this.debug.lineStyle(10, 0x000000, 1);
        this.debug.lineBetween(1110, 690, 1410, 690);
        this.add.text(500, 640, 'Respuesta =', { color: 'black', fontFamily: 'Arial', fontSize: '100px '});
        
        var boton = document.createElement('button');
        boton.setAttribute('type','button');
        this.element = this.add.dom(1600, 690, boton,'','Corregir');
        this.element.addListener('click');
        this.element.on('click',() => this.corregir());
        
        this.input.keyboard.on('keydown-ENTER',() => this.corregir());
        
        
        
        
        //this.cursors = this.input.keyboard.createCursorKeys();
        this.lienzo = this.add.graphics();
        this.lienzo2= this.add.graphics();
        
    }
    
    
    correcto(){
        b=0.5;
        c.play();
    }
    falso(){
        a=0.5;
        w.play();
        this.cameras.main.shake(200,0.01);
    }
    dividir(f1){
        for(var i=0;i<f1;i++){
            var imagen = this.add.image(330+1260/f1*i,300,'P').setOrigin(0, 0);
            imagen.displayWidth = 1260/f1;
            imagen.displayHeight = 75;
            imagen.setInteractive();
            imagen.setData({name: i, tocado:0});
            imagen.on('clicked', this.down, this);
        }
    }
    corregir(){
        var r1=document.getElementById('respuestaN');
        var r2=document.getElementById('respuestaD');
        
        if((this.f[0]+this.f[1])+"" === r1.value && (this.f[2])+"" === r2.value){
            this.input.keyboard.off('keydown-ENTER');
            this.element.visible=false;
            this.debug.fillStyle(0x03A9F4);
            this.debug.fillRect(1500,50,300,100);
            this.opc= this.add.text(1650, 100, '¿OTRO?', { color: 'black', fontFamily: 'Arial', fontSize: '50px '}).setOrigin(0.5,0.5);
                
            const otro = this.add.zone(1500, 50, 300,100);
                otro.setOrigin(0);
                otro.setInteractive();
                otro.once('pointerdown', () => this.opcionPulsada('otro'));
                
            this.correcto();
            
        }else{
            this.falso();
        }
    }
    down(image){
        
        if(image.getData('tocado') === 0){
            image.setTint(Colores[1]);
        }else{
            image.clearTint();
        }
        image.setData('tocado',1-image.getData('tocado'));
        
    }
    update(time,delta){
        if(a>0){
                b=0;
                a-=0.3*delta/1000;
                this.lienzo.clear();
                this.lienzo.setAlpha(a);
                this.lienzo.fillStyle(0xff0000);
                this.lienzo.fillRect(0,0,1920,1080);
                this.lienzo2.clear();
                this.lienzo2.setAlpha(b);
                this.lienzo2.fillStyle(0x00ff00);
                this.lienzo2.fillRect(0,0,1920,1080);
            }else{
                a=0;

            }
            if(b>0){
                a=0;
                b-=0.3*delta/1000;
                this.lienzo.clear();
                this.lienzo.setAlpha(a);
                this.lienzo.fillStyle(0xff0000);
                this.lienzo.fillRect(0,0,1920,1080);
                this.lienzo2.clear();
                this.lienzo2.setAlpha(b);
                this.lienzo2.fillStyle(0x00ff00);
                this.lienzo2.fillRect(0,0,1920,1080);  
            }else{
                b=0;

            }
    }
    
    opcionPulsada(opcion) {
	if(opcion === 'ini'){
            this.scene.start('menu');
        } else if(opcion === 'otro'){
           this.scene.start(this.scene.key);
        }else{
            console.log("A dónde voy?");
        }
    }
}
class R1 extends Phaser.Scene{
    
    constructor() {
	super('R1');
        var fra;
        var px, limx;
    }
    preload(){
        this.load.image('inicio','./asset/img/inicio.png');       
        this.load.image('1','./asset/img/1.png');
        this.load.image('P','./asset/img/P.png');
        this.load.css('80s','./src/fuente.css');
        this.load.audio('correct', './asset/sounds/correct.mp3');
        this.load.audio('wrong', './asset/sounds/wrong.mp3');
     
    }
    create(){
        //this.add.image(0,0,'fondo').setOrigin(0,0);
        this.inicio = this.add.image(130,130,'inicio');
        this.inicio.setScale(0.5);
        this.x1=300,this.x2=1600,this.y1=700,this.y2=700; 
        
        
        const inicio = this.add.zone(0, 0, 250, 250);
        inicio.setOrigin(0);
        inicio.setInteractive();
        inicio.once('pointerdown', () => this.opcionPulsada('ini'));
        
        c = this.sound.add('correct',{loop:false});
        w = this.sound.add('wrong',{loop:false});
        this.debug = this.add.graphics();
        
        
        
        var y1 = Math.floor(Math.random()*15)+2;
        
        
        this.f = [Math.floor(Math.random()*Math.floor(y1/2)+Math.round(y1/2)),0,y1];
        this.f[1] = Math.floor(Math.random()*(this.f[0]-1)+1);
        this.dividir(y1,this.f[0]);
        this.div = document.createElement('h1');
        this.div.style = 'width: 1500px; font-size: 80px; ';
        /*var span = new Array();
        span.push(document.createElement('span'));
        span[0].setAttribute("class","fup");
        span[0].innerText = f[0].toString();
        */
        console.log(this.f[0]+"/"+this.f[1]);
        
       
        this.div.innerHTML ='Cuánto es  <div class="fraction"><span class="fup">'+this.f[0]+
                       '</span><span class="bar">/</span><span class="fdn">'+
                       this.f[2]+'</span></div> &minus; <div class="fraction"><span class="fup">'+this.f[1]+
                       '</span><span class="bar">/</span><span class="fdn">'+
                       this.f[2]+'</span></div>';
        
        this.add.dom(960, 100, this.div);
        
        
        
         this.input.on('gameobjectup', function (pointer, gameObject)
        {
            gameObject.emit('clicked', gameObject);
        }, this);
        
        var respuesta = document.createElement('input');
        respuesta.setAttribute('type'  ,'number');
        respuesta.setAttribute('id','respuestaN');
        this.add.dom(1260, 640, respuesta);
        var respuesta = document.createElement('input');
        respuesta.setAttribute('type'  ,'number');
        respuesta.setAttribute('id','respuestaD');
        this.add.dom(1260, 740, respuesta);
        this.debug.lineStyle(10, 0x000000, 1);
        this.debug.lineBetween(1110, 690, 1410, 690);
        this.add.text(500, 640, 'Respuesta =', { color: 'black', fontFamily: 'Arial', fontSize: '100px '});
        
        var boton = document.createElement('button');
        boton.setAttribute('type','button');
        this.element = this.add.dom(1600, 690, boton,'','Corregir');
        this.element.addListener('click');
        this.element.on('click',() => this.corregir());
        
        this.input.keyboard.on('keydown-ENTER',() => this.corregir());
        
        
        
        
        //this.cursors = this.input.keyboard.createCursorKeys();
        this.lienzo = this.add.graphics();
        this.lienzo2= this.add.graphics();
        
    }
    
    
    correcto(){
        b=0.5;
        c.play();
    }
    falso(){
        a=0.5;
        w.play();
        this.cameras.main.shake(200,0.01);
    }
    dividir(f1,f2){//f1 denominador, f2 numerador
        for(var i=0;i<f1;i++){
            var imagen = this.add.image(330+1260/f1*i,300,'P').setOrigin(0, 0);
            imagen.displayWidth = 1260/f1;
            imagen.displayHeight = 75;
            imagen.setInteractive();
            if(i<f2){
                imagen.setData({name: i, tocado:1});
                imagen.setTint(Colores[1]);
            }else{
                imagen.setData({name: i, tocado:0});
            }
            
            imagen.on('clicked', this.down, this);
        }
    }
    corregir(){
        var r1=document.getElementById('respuestaN');
        var r2=document.getElementById('respuestaD');
        
        if((this.f[0]-this.f[1])+"" === r1.value && (this.f[2])+"" === r2.value){
            this.input.keyboard.off('keydown-ENTER');
            this.element.visible=false;
            this.debug.fillStyle(0x03A9F4);
            this.debug.fillRect(1500,50,300,100);
            this.opc= this.add.text(1650, 100, '¿OTRO?', { color: 'black', fontFamily: 'Arial', fontSize: '50px '}).setOrigin(0.5,0.5);
                
            const otro = this.add.zone(1500, 50, 300,100);
                otro.setOrigin(0);
                otro.setInteractive();
                otro.once('pointerdown', () => this.opcionPulsada('otro'));
                
            this.correcto();
            
        }else{
            this.falso();
        }
    }
    down(image){
        
        if(image.getData('tocado') === 0){
            image.setTint(Colores[1]);
        }else{
            image.clearTint();
        }
        image.setData('tocado',1-image.getData('tocado'));
        
    }
    update(time,delta){
        if(a>0){
                b=0;
                a-=0.3*delta/1000;
                this.lienzo.clear();
                this.lienzo.setAlpha(a);
                this.lienzo.fillStyle(0xff0000);
                this.lienzo.fillRect(0,0,1920,1080);
                this.lienzo2.clear();
                this.lienzo2.setAlpha(b);
                this.lienzo2.fillStyle(0x00ff00);
                this.lienzo2.fillRect(0,0,1920,1080);
            }else{
                a=0;

            }
            if(b>0){
                a=0;
                b-=0.3*delta/1000;
                this.lienzo.clear();
                this.lienzo.setAlpha(a);
                this.lienzo.fillStyle(0xff0000);
                this.lienzo.fillRect(0,0,1920,1080);
                this.lienzo2.clear();
                this.lienzo2.setAlpha(b);
                this.lienzo2.fillStyle(0x00ff00);
                this.lienzo2.fillRect(0,0,1920,1080);  
            }else{
                b=0;

            }
    }
    
    opcionPulsada(opcion) {
	if(opcion === 'ini'){
            this.scene.start('menu');
        } else if(opcion === 'otro'){
           this.scene.start(this.scene.key);
        }else{
            console.log("A dónde voy?");
        }
    }
}
class M1 extends Phaser.Scene{
    
    constructor() {
	super('M1');
        var fra;
        var px, limx;
    }
    preload(){
        this.load.image('inicio','./asset/img/inicio.png');       
        this.load.image('1','./asset/img/1.png');
        this.load.image('P','./asset/img/P.png');
        this.load.css('80s','./src/fuente.css');
        this.load.audio('correct', './asset/sounds/correct.mp3');
        this.load.audio('wrong', './asset/sounds/wrong.mp3');
        this.opc=[8,9,10,12,14,15,16];
        this.primos = [2,3,5,7];
     
    }
    create(){
        //this.add.image(0,0,'fondo').setOrigin(0,0);
        this.inicio = this.add.image(130,130,'inicio');
        this.inicio.setScale(0.5);
        
        
        
        const inicio = this.add.zone(0, 0, 250, 250);
        inicio.setOrigin(0);
        inicio.setInteractive();
        inicio.once('pointerdown', () => this.opcionPulsada('ini'));
        
        c = this.sound.add('correct',{loop:false});
        w = this.sound.add('wrong',{loop:false});
        this.debug = this.add.graphics();
        
        this.tintados=0;
        
        var y1 = this.opc[Math.floor(Math.random()*this.opc.length)];
        this.dividir(y1);
        
        this.f = [this.primos[Math.floor(Math.random()*this.primos.length)],0,y1];
        this.f[1]=Math.floor(Math.random()*Math.floor(this.f[2]/this.f[0])+1);
        
        this.div = document.createElement('h1');
        this.div.style = 'width: 1500px; font-size: 80px; ';
        /*var span = new Array();
        span.push(document.createElement('span'));
        span[0].setAttribute("class","fup");
        span[0].innerText = f[0].toString();
        */
        console.log(this.f[0]+"/"+this.f[1]);
        
       
        this.div.innerHTML ='Cuánto es '+this.f[0]+
                       ' &times; <div class="fraction"><span class="fup">'+this.f[1]+
                       '</span><span class="bar">/</span><span class="fdn">'+
                       this.f[2]+'</span></div>';
        
        this.add.dom(960, 100, this.div);
        
        
        
         this.input.on('gameobjectup', function (pointer, gameObject)
        {
            gameObject.emit('clicked', gameObject);
        }, this);
        
        var respuesta = document.createElement('input');
        respuesta.setAttribute('type'  ,'number');
        respuesta.setAttribute('id','respuestaN');
        this.add.dom(1260, 640, respuesta);
        var respuesta = document.createElement('input');
        respuesta.setAttribute('type'  ,'number');
        respuesta.setAttribute('id','respuestaD');
        this.add.dom(1260, 740, respuesta);
        this.debug.lineStyle(10, 0x000000, 1);
        this.debug.lineBetween(1110, 690, 1410, 690);
        this.add.text(500, 640, 'Respuesta =', { color: 'black', fontFamily: 'Arial', fontSize: '100px '});
        
        var boton = document.createElement('button');
        boton.setAttribute('type','button');
        this.element = this.add.dom(1600, 690, boton,'','Corregir');
        this.element.addListener('click');
        this.element.on('click',() => this.corregir());
        
        this.input.keyboard.on('keydown-ENTER',() => this.corregir());
        
        
        
        
        //this.cursors = this.input.keyboard.createCursorKeys();
        this.lienzo = this.add.graphics();
        this.lienzo2= this.add.graphics();
        
    }
    
    
    correcto(){
        b=0.5;
        c.play();
    }
    falso(){
        a=0.5;
        w.play();
        this.cameras.main.shake(200,0.01);
    }
    dividir(f1){
        for(var i=0;i<f1;i++){
            var imagen = this.add.image(330+1260/f1*i,300,'P').setOrigin(0, 0);
            imagen.displayWidth = 1260/f1;
            imagen.displayHeight = 75;
            imagen.setInteractive();
            imagen.setData({name: i, tocado:0});
            imagen.on('clicked', this.down, this);
        }
    }
    corregir(){
        var r1=document.getElementById('respuestaN');
        var r2=document.getElementById('respuestaD');
        
        if((this.f[0]*this.f[1])+"" === r1.value && (this.f[2])+"" === r2.value){
            this.input.keyboard.off('keydown-ENTER');
            this.element.visible=false;
            this.debug.fillStyle(0x03A9F4);
            this.debug.fillRect(1500,50,300,100);
            this.opc= this.add.text(1650, 100, '¿OTRO?', { color: 'black', fontFamily: 'Arial', fontSize: '50px '}).setOrigin(0.5,0.5);
                
            const otro = this.add.zone(1500, 50, 300,100);
                otro.setOrigin(0);
                otro.setInteractive();
                otro.once('pointerdown', () => this.opcionPulsada('otro'));
                
            this.correcto();
            
        }else{
            this.falso();
        }
    }
    down(image, pointer){
        
        var color=Math.floor(this.tintados/this.f[1])%Colores.length;
        console.log("color = "+color);
        console.log("tintados = "+this.tintados);
        if(image.getData('tocado') === 0){
            image.setTint(Colores[color]);
            this.tintados++;
        }else{
            image.clearTint();
            this.tintados--;
        }
        
        image.setData('tocado',1-image.getData('tocado'));
        
    }
    update(time,delta){
        if(a>0){
                b=0;
                a-=0.3*delta/1000;
                this.lienzo.clear();
                this.lienzo.setAlpha(a);
                this.lienzo.fillStyle(0xff0000);
                this.lienzo.fillRect(0,0,1920,1080);
                this.lienzo2.clear();
                this.lienzo2.setAlpha(b);
                this.lienzo2.fillStyle(0x00ff00);
                this.lienzo2.fillRect(0,0,1920,1080);
            }else{
                a=0;

            }
            if(b>0){
                a=0;
                b-=0.3*delta/1000;
                this.lienzo.clear();
                this.lienzo.setAlpha(a);
                this.lienzo.fillStyle(0xff0000);
                this.lienzo.fillRect(0,0,1920,1080);
                this.lienzo2.clear();
                this.lienzo2.setAlpha(b);
                this.lienzo2.fillStyle(0x00ff00);
                this.lienzo2.fillRect(0,0,1920,1080);  
            }else{
                b=0;

            }
    }
    
    opcionPulsada(opcion) {
	if(opcion === 'ini'){
            this.scene.start('menu');
        } else if(opcion === 'otro'){
           this.scene.start(this.scene.key);
        }else{
            console.log("A dónde voy?");
        }
    }
}

class M2 extends Phaser.Scene{
    
    constructor() {
        super('M2');
        this.a = 0;
    }
    preload(){
        this.load.image('fondo','./asset/img/background.png');
        this.load.image('inicio','./asset/img/inicio.png');
        this.etiq = ['uno', 'la mitad', 'un tercio', 'un cuarto', 'un quinto', 'un sexto', 'un séptimo',
                    'un octavo', 'un noveno', 'un décimo'];
        this.load.audio('correct', './asset/sounds/correct.mp3');
        this.load.audio('wrong', './asset/sounds/wrong.mp3');
    }
    create(){
        //this.add.image(960,540,'fondo');
        this.inicio = this.add.image(130,130,'inicio');
        this.inicio.setScale(0.5);
        
        this.lienzo2 = this.add.graphics();
        this.lienzo2.fillStyle(0xff0000);
        this.lienzo2.setAlpha(this.a);
        this.lienzo2.fillRect(0,0,1920,1080);
        c = this.sound.add('correct',{loop:false});
        w = this.sound.add('wrong',{loop:false});
        
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
         this.lienzo = this.add.graphics();
          this.lienzo3 = this.add.graphics();
    }
    update(time,delta){
        if(a>0){
                b=0;
                a-=0.3*delta/1000;
                this.lienzo.clear();
                this.lienzo.setAlpha(a);
                this.lienzo.fillStyle(0xff0000);
                this.lienzo.fillRect(0,0,1920,1080);
                this.lienzo2.clear();
                this.lienzo2.setAlpha(b);
                this.lienzo2.fillStyle(0x00ff00);
                this.lienzo2.fillRect(0,0,1920,1080);
            }else{
                a=0;

            }
            if(b>0){
                a=0;
                b-=0.3*delta/1000;
                this.lienzo.clear();
                this.lienzo.setAlpha(a);
                this.lienzo.fillStyle(0xff0000);
                this.lienzo.fillRect(0,0,1920,1080);
                this.lienzo2.clear();
                this.lienzo2.setAlpha(b);
                this.lienzo2.fillStyle(0x00ff00);
                this.lienzo2.fillRect(0,0,1920,1080);  
            }else{
                b=0;

            }
    }
    opcionPulsada(opcion) {
        if(opcion === "inicio"){
            this.scene.start('menu');
        }else if(opcion === "ayuda"){
            window.open('ayuda.html','Ayuda',"width=960, height=540");
        }if(opcion === "otro"){
            this.scene.start(this.scene.key);
        }else{
            console.log("A dónde voy?");
        }
    }
    corregir(x,y,i){
        if((x*y) === i){
           this.correcto();
        }else{
            this.falso();
        }
    }
    correcto(){
        b=0.5;
        c.play();
        this.lienzo3 = this.add.graphics();
                this.lienzo3.fillStyle(0x03A9F4);
                this.lienzo3.fillRect(1600,50,300,90);
                this.opc= this.add.text(1750, 95, '¿OTRO?', { color: 'black', fontFamily: 'Arial', fontSize: '50px '}).setOrigin(0.5,0.5);

                const otro = this.add.zone(1600, 50, 300,100);
                    otro.setOrigin(0);
                    otro.setInteractive();
                    otro.on('pointerdown', () => this.opcionPulsada('otro'));
    }
    falso(){
        a=0.5;
        w.play();
        this.cameras.main.shake(200,0.01);
    }
}
class M3 extends Phaser.Scene{
    constructor() {
        super('M3');
        this.a = 0;
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
            this.scene.start('M3');
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
class Eq1 extends Phaser.Scene{
    constructor() {
            super('Eq1');
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
        //this.add.image(960,540,'fondo');
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
            this.scene.start('Eq1');
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
        //this.add.image(960,540,'fondo');
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
        //this.add.image(0,0,'fondo').setOrigin(0,0);
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
class S2 extends Phaser.Scene{
    constructor() {
        super('S2');
        this.a = 0;
        this.primos = [2,3,5,7,-1];
    }
    preload(){
        this.load.image('fondo','./asset/img/background.png');
        this.load.image('inicio','./asset/img/inicio.png');
    }
    create(){
        //this.add.image(960,540,'fondo');
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
class S3 extends Phaser.Scene{
    constructor() {
        super('S3');
        this.a = 0;
        this.primos = [2,3,5,7,-1];
        this.den=[2,4,8];
    }
    preload(){
        this.load.image('fondo','./asset/img/background.png');
        this.load.image('inicio','./asset/img/inicio.png');
    }
    create(){
        //this.add.image(960,540,'fondo');
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
        }else if(opcion === "otro"){
            this.scene.start('S2');
        }else{
            console.log("A dónde voy?")
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
class S4 extends Phaser.Scene{
    constructor() {
        super('S4');
        this.a = 0;
        this.primos = [2,3,5,7,-1];
        this.den=[3,6,9];
    }
    preload(){
        this.load.image('fondo','./asset/img/background.png');
        this.load.image('inicio','./asset/img/inicio.png');
    }
    create(){
        //this.add.image(960,540,'fondo');
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
        }else if(opcion === "otro"){
            this.scene.start('S3');
        }else{
            console.log("A dónde voy?");
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
class S5 extends Phaser.Scene{
    constructor() {
        super('S5');
        this.a = 0;
        this.primos = [2,3,5,7,-1];
        this.den=[2,3,4,5,6,7,8,9,10];
    }
    preload(){
        this.load.image('fondo','./asset/img/background.png');
        this.load.image('inicio','./asset/img/inicio.png');
    }
    create(){
        //this.add.image(960,540,'fondo');
        this.inicio = this.add.image(130,130,'inicio');
        this.inicio.setScale(0.5);
        this.lienzo = this.add.graphics();
        this.lienzo.lineStyle(10, 0x000000, 1);
           
        
        const inicio = this.add.zone(0, 0, 250, 250);
        inicio.setOrigin(0);
        inicio.setInteractive();
        inicio.once('pointerdown', () => this.opcionPulsada('inicio'));
        
        this.d = [this.den[Math.floor(Math.random()*9)],this.den[Math.floor(Math.random()*9)]];
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
        }else if(opcion === "otro"){
            this.scene.start('S4');
        }else{
            console.log("A dónde voy?");
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
class R2 extends Phaser.Scene{
    constructor() {
        super('R2');
        this.a = 0;
        this.primos = [2,3,5,7,-1];
    }
    preload(){
        this.load.image('fondo','./asset/img/background.png');
        this.load.image('inicio','./asset/img/inicio.png');
    }
    create(){
        //this.add.image(960,540,'fondo');
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
        this.n2 = Math.floor(Math.random()*(this.n1-1))+1;
        
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
                       this.d+'</span></div> &minus; <div class="fraction"><span class="fup">'+this.n2+
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
            this.scene.start('R1');
        }
    }
    corregir(){
        var r1=document.getElementById('respuestaN');
        var r2=document.getElementById('respuestaD');
        this.nr=this.n1-this.n2;
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
            if(q===0){
                return p;
            }if(p === q*Math.floor(p/q)){
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
class R3 extends Phaser.Scene{
    constructor() {
        super('R3');
        this.a = 0;
        this.primos = [2,3,5,7,-1];
        this.den=[2,4,8];
    }
    preload(){
        this.load.image('fondo','./asset/img/background.png');
        this.load.image('inicio','./asset/img/inicio.png');
    }
    create(){
        //this.add.image(960,540,'fondo');
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
        
        if(this.d[0]*this.n[1]>this.d[1]*this.n[0]){
            var aux=[this.d[0],this.n[0]];
            this.d[0]=this.d[1];
            this.d[1]=aux[0];
            this.n[0]=this.n[1];
            this.n[1]=aux[1];
        }
        
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
                       this.d[0]+'</span></div> &minus; <div class="fraction"><span class="fup">'+this.n[1]+
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
        }else if(opcion === "otro"){
            this.scene.start('R2');
        }else{
            console.log("A dónde voy?")
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
                       r+'</span></div>&minus;<div class="fraction"<span class="fup">'+(this.n[1])+
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
        this.nr=this.n[0]-this.n[1];
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
        //console.log("mcm("+p+","+q+")");
        if(p>=q){
            if(q===0){
                return p;
            }if(p === q*Math.floor(p/q)){
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
class R4 extends Phaser.Scene{
    constructor() {
        super('R4');
        this.a = 0;
        this.primos = [2,3,5,7,-1];
        this.den=[3,6,9];
    }
    preload(){
        this.load.image('fondo','./asset/img/background.png');
        this.load.image('inicio','./asset/img/inicio.png');
    }
    create(){
        //this.add.image(960,540,'fondo');
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
        if(this.d[0]*this.n[1]>this.d[1]*this.n[0]){
            var aux=[this.d[0],this.n[0]];
            this.d[0]=this.d[1];
            this.d[1]=aux[0];
            this.n[0]=this.n[1];
            this.n[1]=aux[1];
        }
        
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
                       this.d[0]+'</span></div> &minus; <div class="fraction"><span class="fup">'+this.n[1]+
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
        }else if(opcion === "otro"){
            this.scene.start('R3');
        }else{
            console.log("A dónde voy?");
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
                       r+'</span></div>&minus;<div class="fraction"<span class="fup">'+(this.n[1])+
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
        this.nr=this.n[0]-this.n[1];
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
        //console.log("mcm("+p+","+q+")");
        if(p>=q){
            if(q===0){
                return p;
            }if(p === q*Math.floor(p/q)){
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
class R5 extends Phaser.Scene{
    constructor() {
        super('R5');
        this.a = 0;
        this.primos = [2,3,5,7,-1];
        this.den=[2,3,4,5,6,7,8,9,10];
    }
    preload(){
        this.load.image('fondo','./asset/img/background.png');
        this.load.image('inicio','./asset/img/inicio.png');
    }
    create(){
        //this.add.image(960,540,'fondo');
        this.inicio = this.add.image(130,130,'inicio');
        this.inicio.setScale(0.5);
        this.lienzo = this.add.graphics();
        this.lienzo.lineStyle(10, 0x000000, 1);
           
        
        const inicio = this.add.zone(0, 0, 250, 250);
        inicio.setOrigin(0);
        inicio.setInteractive();
        inicio.once('pointerdown', () => this.opcionPulsada('inicio'));
        
        this.d = [this.den[Math.floor(Math.random()*9)],this.den[Math.floor(Math.random()*9)]];
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
                       this.d[0]+'</span></div> &minus; <div class="fraction"><span class="fup">'+this.n[1]+
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
        }else if(opcion === "otro"){
            this.scene.start('R4');
        }else{
            console.log("A dónde voy?");
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
                       r+'</span></div>&minus;<div class="fraction"<span class="fup">'+(this.n[1])+
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
        this.nr=this.n[0]-this.n[1];
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
        //console.log("mcm("+p+","+q+")");
        if(p>=q){
            if(q===0){
                return p;
            }if(p === q*Math.floor(p/q)){
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
class D1 extends Phaser.Scene{
    constructor(){
        super("D1");
        this.a = 0;
    }
    preload(){
        this.load.image('fondo','./asset/img/background.png');
        this.load.image('inicio','./asset/img/inicio.png');
        this.load.css('80s','./src/fuente.css');
        
    }
    create(){
        //this.add.image(960,540,'fondo');
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
        
        this.d = Math.floor(Math.random()*9)+2;
        this.n = Math.floor(Math.random()*(this.d-1))+1;
        
        this.div = document.createElement('h1');
        this.div.style = 'width: 1000px; font-size: 80px; ';
        /*var span = new Array();
        span.push(document.createElement('span'));
        span[0].setAttribute("class","fup");
        span[0].innerText = f[0].toString();
        */
        
        this.div.innerHTML ='¿Cuántas veces cabe  ';
        this.add.dom(960, 300, this.div);
        
        this.resp =document.createElement('h1');
        this.resp.style = 'width: 1000px; font-size: 50px; ';
        this.resp.innerHTML ='<div class="fraction"><span class="fup">'+1+
                       '</span><span class="bar">/</span><span class="fdn">'+
                       this.d+'</span></div> en <div class="fraction"><span class="fup">'+this.n+
                       '</span><span class="bar">/</span><span class="fdn">'+
                       this.d+'</span></div>?';
        this.add.dom(960, 500, this.resp);
        
        var respuesta = document.createElement('input');
        respuesta.setAttribute('type'  ,'number');
        respuesta.setAttribute('id','respuesta');
        this.res = this.add.dom(910, 690, respuesta);
        this.texto = this.add.text(500, 630, 'Cabe ', { color: 'black', fontFamily: 'Arial', fontSize: '100px '});
        this.texto2 = this.add.text(1100, 630, "veces", { color: 'black', fontFamily: 'Arial', fontSize: '100px '});
        
        var boton = document.createElement('button');
        boton.setAttribute('type','button');
        this.element = this.add.dom(1630, 685, boton,'','Corregir');
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
        }else if(opcion === "otro"){
            this.scene.start('D1');
        }else{
            console.log("A dónde voy?");
        }
    }
    corregir(){
        var r=document.getElementById("respuesta").value;
        if(r === this.n.toLocaleString()){
            this.div.innerHTML = "¿Entonces cuánto es :";
            this.resp.innerHTML = '<div class="fraction"><span class="fup">'+this.n+
                       '</span><span class="bar">/</span><span class="fdn">'+
                       this.d+'</span></div> &divide; <div class="fraction"><span class="fup">'+1+
                       '</span><span class="bar">/</span><span class="fdn">'+
                       this.d+'</span></div>?';
            this.element.off('click');
            this.input.keyboard.off('keydown-ENTER');
            this.texto.visible=false;
            this.texto2.visible=false;
            
            this.element.on('click',() => this.corregir2());
            this.input.keyboard.on('keydown-ENTER',() => this.corregir2());
            
            document.getElementById("respuesta").value="";
            
        }else{
            this.a=0.75;
        }
    }
    corregir2(){
        var r=document.getElementById("respuesta").value;
        if(r === this.n.toLocaleString()){
            
            this.element.off('click');
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
class D2 extends Phaser.Scene{
    constructor(){
        super("D2");
        this.a = 0;
    }
    preload(){
        this.load.image('fondo','./asset/img/background.png');
        this.load.image('inicio','./asset/img/inicio.png');
        this.load.css('80s','./src/fuente.css');
        
    }
    create(){
        //this.add.image(960,540,'fondo');
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
        
        this.d = Math.floor(Math.random()*9)+2;
        this.n = Math.floor(Math.random()*(this.d-1))+1;
        this.r = Math.floor(Math.random()*6)+2;
        
        this.div = document.createElement('h1');
        this.div.style = 'width: 1000px; font-size: 80px; ';
        /*var span = new Array();
        span.push(document.createElement('span'));
        span[0].setAttribute("class","fup");
        span[0].innerText = f[0].toString();
        */
        
        this.div.innerHTML ='¿Cuánto es ';
        this.add.dom(960, 300, this.div);
        
        this.resp =document.createElement('h1');
        this.resp.style = 'width: 1000px; font-size: 50px; ';
        this.resp.innerHTML ='<div class="fraction"><span class="fup">'+(this.n*this.r)+
                       '</span><span class="bar">/</span><span class="fdn">'+
                       this.d+'</span></div> &divide; <div class="fraction"><span class="fup">'+this.n+
                       '</span><span class="bar">/</span><span class="fdn">'+
                       this.d+'</span></div>?';
        this.add.dom(960, 500, this.resp);
        
        var respuesta = document.createElement('input');
        respuesta.setAttribute('type'  ,'number');
        respuesta.setAttribute('id','respuesta');
        this.res = this.add.dom(1210, 690, respuesta);
        this.texto = this.add.text(500, 630, 'Respuesta = ', { color: 'black', fontFamily: 'Arial', fontSize: '100px '});
        
        
        var boton = document.createElement('button');
        boton.setAttribute('type','button');
        this.element = this.add.dom(1630, 685, boton,'','Corregir');
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
        }else if(opcion === "otro"){
            this.scene.start('D2');
        }else{
            console.log("A dónde voy?");
        }
    }
    corregir(){
        var r=document.getElementById("respuesta").value;
        if(r === this.r.toString()){
            
            this.element.off('click');
            this.input.keyboard.off('keydown-ENTER');
            this.texto.visible=false;
            
            
            var div = document.createElement('h1');
            div.style = 'width: 1000px; font-size: 80px; ';
            div.innerHTML =(this.n*this.r)+' &divide; '+this.n+" =";
            this.add.dom(900, 630, div);
            

            this.element.on('click',() => this.corregir2());
            this.input.keyboard.on('keydown-ENTER',() => this.corregir2());
            
            document.getElementById("respuesta").value="";
            
        }else{
            this.a=0.75;
        }
    }
    corregir2(){
        var r=document.getElementById("respuesta").value;
        if(r === this.r.toString()){
            
            this.element.off('click');
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
class D3 extends Phaser.Scene{
    constructor(){
        super("D3");
        this.a = 0;
        this.primos = [2,3,5,7,-1];
    }
    preload(){
        this.load.image('fondo','./asset/img/background.png');
        this.load.image('inicio','./asset/img/inicio.png');
        this.load.css('80s','./src/fuente.css');
        
    }
    create(){
        //this.add.image(960,540,'fondo');
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
        
        this.d = Math.floor(Math.random()*9)+2;
        this.n = [Math.floor(Math.random()*9)+1,Math.floor(Math.random()*(9))+1];
        
        
        this.div = document.createElement('h1');
        this.div.style = 'width: 1000px; font-size: 80px; ';
        /*var span = new Array();
        span.push(document.createElement('span'));
        span[0].setAttribute("class","fup");
        span[0].innerText = f[0].toString();
        */
        
        this.div.innerHTML ='Cuánto es: ';
        this.add.dom(960, 300, this.div);
        
        this.resp =document.createElement('h1');
        this.resp.style = 'width: 1000px; font-size: 50px; ';
        this.resp.innerHTML ='<div class="fraction"><span class="fup">'+(this.n[0])+
                       '</span><span class="bar">/</span><span class="fdn">'+
                       this.d+'</span></div> &divide; <div class="fraction"><span class="fup">'+this.n[1]+
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
        
        this.texto = this.add.text(500, 630, 'Respuesta = ', { color: 'black', fontFamily: 'Arial', fontSize: '100px '});
        
        
        var boton = document.createElement('button');
        boton.setAttribute('type','button');
        this.element = this.add.dom(1630, 685, boton,'','Corregir');
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
        }else if(opcion === "otro"){
            this.scene.start('D3');
        }else if(opcion ==="ayuda"){
            window.open('ayuda.html','Ayuda',"width=960, height=540");
        }else {
            console.log("A dónde voy?");
        }
    }
    corregir(){
        var n=document.getElementById("respuestaN").value;
        var d=document.getElementById("respuestaD").value;
        if(n === this.n[0].toString() && d === this.n[1].toString()){
            
            this.element.off('click');
            this.input.keyboard.off('keydown-ENTER');
            this.texto.visible=false;
            
            this.resp.innerHTML +='=<div class="fraction"><span class="fup">'+n+
                       '</span><span class="bar">/</span><span class="fdn">'+
                       d+'</span></div>';
            
            this.element.visible=false;
            this.rn.visible=false;
            this.rd.visible=false;
            this.lienzo.clear();
            //this.ltext.visible=false;
            //console.log(this.ltext);
            console.log(this.lienzo);
            this.r = this.mcm(this.n[0],this.n[1]);
                
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
            this.n[0] /= p;
            this.n[1] /= p;
            this.resp.innerHTML += '<div class="fraction"><span class="fup">(&divide;'+p+
                       ')</span><span class="bar">/</span><span class="fdn">(&divide;'+
                       p+')</span></div>=<div class="fraction"><span class="fup">'+(this.n[0])+
                       '</span><span class="bar">/</span><span class="fdn">'+
                       (this.n[1])+'</span></div>';
            
        }else{
            this.a=0.75;
        }
    }
    mcm(p,q){
        //console.log("mcm("+p+","+q+")");
        if(p>=q){
            if(q===0){
                return p;
            }if(p === q*Math.floor(p/q)){
                return q;
            }else{
                return this.mcm(q,p-q*Math.floor(p/q));
            }
        }else{
            return  this.mcm(q,p);
        }
    }
}
class D4 extends Phaser.Scene{
    constructor(){
        super("D4");
        this.a = 0;
        this.primos = [2,3,5,7,-1];
    }
    preload(){
        this.load.image('fondo','./asset/img/background.png');
        this.load.image('inicio','./asset/img/inicio.png');
        this.load.css('80s','./src/fuente.css');
        
    }
    create(){
        //this.add.image(960,540,'fondo');
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
        
        this.d = [Math.floor(Math.random()*9)+2,Math.floor(Math.random()*9)+2];
        this.n = [Math.floor(Math.random()*9)+1,Math.floor(Math.random()*(9))+1];
        
        
        this.div = document.createElement('h1');
        this.div.style = 'width: 1000px; font-size: 80px; ';
        
        
        this.div.innerHTML ='Cuánto es: ';
        this.add.dom(960, 300, this.div);
        
        this.resp =document.createElement('h1');
        this.resp.style = 'width: 1000px; font-size: 50px; ';
        this.resp.innerHTML ='<div class="fraction"><span class="fup">'+(this.n[0])+
                       '</span><span class="bar">/</span><span class="fdn">'+
                       this.d[0]+'</span></div> &divide; <div class="fraction"><span class="fup">'+this.n[1]+
                       '</span><span class="bar">/</span><span class="fdn">'+
                       this.d[1]+'</span></div>';
        this.add.dom(960, 500, this.resp);
        
        this.respuesta = document.createElement('input');
        this.respuesta.setAttribute('type'  ,'number');
        this.respuesta.setAttribute('id','respuesta');
        this.rd = this.add.dom(1260, 690, this.respuesta);
        
        this.text = this.add.text(300, 650, 'Denominador común =', { color: 'black', fontFamily: 'Arial', fontSize: '80px '});
        
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
        
        this.texto = this.add.text(500, 630, 'Respuesta = ', { color: 'black', fontFamily: 'Arial', fontSize: '100px '});
        */
        
        var boton = document.createElement('button');
        boton.setAttribute('type','button');
        
        
        this.element = this.add.dom(1630, 685, boton,'','Corregir');
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
        }else if(opcion === "otro"){
            this.scene.start('D3');
        }else if(opcion ==="ayuda"){
            window.open('ayuda.html','Ayuda',"width=960, height=540");
        }else {
            console.log("A dónde voy?");
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
                       r+'</span></div>&divide;<div class="fraction"<span class="fup">'+(this.n[1])+
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
        var n=document.getElementById("respuestaN").value;
        var d=document.getElementById("respuestaD").value;
        if(n === this.n[0].toString() && d === this.n[1].toString()){
            
            this.element.off('click');
            this.input.keyboard.off('keydown-ENTER');
            this.text.visible=false;
            
            this.resp.innerHTML +='=<div class="fraction"><span class="fup">'+n+
                       '</span><span class="bar">/</span><span class="fdn">'+
                       d+'</span></div>';
            
            this.element.visible=false;
            this.rn.visible=false;
            this.rd.visible=false;
            this.lienzo.clear();
            //this.ltext.visible=false;
            //console.log(this.ltext);
            console.log(this.lienzo);
            this.r = this.mcm(this.n[0],this.n[1]);
                
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
            this.n[0] /= p;
            this.n[1] /= p;
            this.resp.innerHTML += '<div class="fraction"><span class="fup">(&divide;'+p+
                       ')</span><span class="bar">/</span><span class="fdn">(&divide;'+
                       p+')</span></div>=<div class="fraction"><span class="fup">'+(this.n[0])+
                       '</span><span class="bar">/</span><span class="fdn">'+
                       (this.n[1])+'</span></div>';
            
        }else{
            this.a=0.75;
        }
    }
    mcm(p,q){
        //console.log("mcm("+p+","+q+")");
        if(p>=q){
            if(q===0){
                return p;
            }if(p === q*Math.floor(p/q)){
                return q;
            }else{
                return this.mcm(q,p-q*Math.floor(p/q));
            }
        }else{
            return  this.mcm(q,p);
        }
    }
}

const config = {
  type: Phaser.AUTO,
  width: 1920,
  height: 1080,
  backgroundColor: '#ffffff',
  parent: 'phaser-example',
  dom: {
        createContainer: true
    },
  scene: [menu,M1,R1,S1,C1,  Explora, M2,M3,Eq1,Eq2,Eq3,S5,S2,S3,S4,R5,R2,R3,R4,D1,D2,D3,D4],
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

