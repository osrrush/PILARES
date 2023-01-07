/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
const titulo = 'Preescolar'; //Titulo del juego
const menulabel = [['1 al 4', '1 al 10', '1 al 10 combinado'],
                ['Dedos (1)','Desdos (2)','Dedos (3)']
            /*    ['Multiplicar (2)','Multiplicar (3)'],
                ['Equivalencia (1)','Equivalencia (2)','Equivalencia (3)'],
                ['Sumar(2)','Sumar(3)','Sumar(4)','Sumar(5)'],
                ['Restar(2)','Restar(3)','Restar(4)','Restar(5)'],
                ['Dividir(1)','Dividir(2)','Dividir(3)','Dividir(4)']
            */]; //Opciones menú
                

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
        opc[5].once('pointerdown', () => this.opcionPulsada(5));/*
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
        */
    }
    opcionPulsada(opcion) {
        //console.log("opcionPulsada("+opcion+")");
        opcion +='';
	if (opcion === '0') {
		this.scene.start('C1');
	} else if (opcion === '1'){
		this.scene.start('C2');
	} else if (opcion === '2'){
                this.scene.start('C3');
        } else if (opcion === '3'){
            this.scene.start('D1');
        } else if (opcion === '4'){
           this.scene.start('D2');
            //console.log("eq2");
        } else if (opcion === '5'){
            this.scene.start('D3');
        } else if (opcion === '6'){
           // this.scene.start('M3');
        } else  if (opcion === '7'){
           // this.scene.start('Eq1');
        } else if (opcion === '8'){
           // this.scene.start('Eq2');
        } else if (opcion === '9'){
           // this.scene.start('Eq3');
        } else  if (opcion === '10'){
           // this.scene.start('S2');
        } else  if (opcion === '11'){
          //  this.scene.start('S3');
        } else if (opcion === '12'){
           // this.scene.start('S4');
        } else if (opcion === '13'){
           // this.scene.start('S5');
        } else if (opcion === '14'){
           // this.scene.start('R2');
        } else  if (opcion === '15'){
          //  this.scene.start('R3');
        } else if (opcion === '16'){
           // this.scene.start('R4');
        } else if (opcion === '17'){
           // this.scene.start('R5');
        } else if (opcion === '18'){
           // this.scene.start('D1');
        } else if (opcion === '19'){
            //this.scene.start('D2');
        } else  if (opcion === '20'){
           // this.scene.start('D3');
        } else  if (opcion === '21'){
           // this.scene.start('D4');
        } else{
            console.log(opcion);
        }
    }
}

class C1 extends Phaser.Scene{
    
    constructor() {
	super('C1');      
    }
    preload(){
        
        this.load.audio('correct', './asset/sounds/correct.mp3');
        this.load.audio('wrong', './asset/sounds/wrong.mp3');
        this.load.image('inicio','./asset/img/inicio.png');       
        this.load.image('C','./asset/img/circulo.png');
        this.load.image('T','./asset/img/triángulo.png');
        this.load.image('Cu','./asset/img/cuadrado.png');
        this.n=Math.floor(Math.random()*4)+1;
        this.fig=Math.floor(Math.random()*3);
        this.figIma= this.fig===0 ? "C" : this.fig === 1 ? "T" : "Cu";
        //console.log(this.n);
       // console.log(this.figIma);
        this.pos =new Array();
        
        for(var i =0;i<15;i++){
            this.pos.push(i);
        }
        this.pos.sort(() => (Math.random()>0.5)? 1 :-1);
        //console.log(this.pos);
    }
    create(){
        
        this.inicio = this.add.image(130,130,'inicio');
        this.inicio.setScale(0.5);
        
        
        const inicio = this.add.zone(0, 0, 250, 250);
        inicio.setOrigin(0);
        inicio.setInteractive();
        inicio.once('pointerdown', () => this.opcionPulsada('inicio'));
        
        c = this.sound.add('correct',{loop:false});
        w = this.sound.add('wrong',{loop:false});
        
        this.div = document.createElement('h1');
        this.div.style = 'width: 1500px; font-size: 80px; ';
        this.div.innerHTML ='¿Cuántos <img src="./asset/img/'+(this.fig===0 ? 'circulo' : this.fig===1 ? 'triángulo' : 'cuadrado' )+'.png" width="80" height="80">'+
                       ' hay? ';
        
        this.add.dom(960, 100, this.div);
        
        this.fra = new Array();
                       
        for(var i=0;i<this.n;i++){
        //for(var i=0;i<15;i++){
            this.fra.push(this.add.image(500+250*(Math.floor(this.pos[i]%5)),275+200*(Math.floor(this.pos[i]/5)),this.figIma).setOrigin(0.5, 0.5));
        }
        
        for(var i=0;i<this.fra.length;i++){            
            this.fra[i].setScale(200/679*(0.25+Math.random()*0.75));
            this.fra[i].setTint(Colores[Math.floor(Math.random()*4)]);
            this.fra[i].setRotation(Math.random()*6);
        }
        
        var boton = new Array();
        this.element = new Array();
        for(var i=0;i<4;i++){
            boton.push(document.createElement('button'));
            boton[i].setAttribute('type','button');
            boton[i].setAttribute('id',i+1+"");
            this.element.push(this.add.dom(550+i*300, 885, boton[i],null,(i+1)+"")) ; 
            this.element[i].addListener('click');
        }
        
        this.element[0].on('click',() => this.corregir(0));
        this.element[1].on('click',() => this.corregir(1));
        this.element[2].on('click',() => this.corregir(2));
        this.element[3].on('click',() => this.corregir(3));
        
        
        this.input.keyboard.on('keydown-ONE',() => this.corregir(0));
        this.input.keyboard.on('keydown-TWO',() => this.corregir(1));
        this.input.keyboard.on('keydown-THREE',() => this.corregir(2));
        this.input.keyboard.on('keydown-FOUR',() => this.corregir(3));
        
        
        this.input.keyboard.on('keydown-NUMPAD_ONE',() => this.corregir(0));
        this.input.keyboard.on('keydown-NUMPAD_TWO',() => this.corregir(1));
        this.input.keyboard.on('keydown-NUMPAD_THREE',() => this.corregir(2));
        this.input.keyboard.on('keydown-NUMPAD_FOUR',() => this.corregir(3));
        
        this.lienzo  = this.add.graphics();
        this.lienzo2 = this.add.graphics();
        this.lienzo3 = this.add.graphics();
        //this.cursors = this.input.keyboard.createCursorKeys();
        
        
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
         if(b>0){
            b-=0.5*delta/1000;
        }else{
            b=0;
        }
        this.lienzo3.clear();
        this.lienzo3.setAlpha(b);
        this.lienzo3.fillStyle(0x00ff00);
        this.lienzo3.fillRect(0,0,1920,1080);
    }
    
    opcionPulsada(opcion) {
        console.log(opcion);
        if(opcion === 'otro'){
            this.scene.start(this.scene.key);
        }else{
            this.scene.start('menu');
        }
	
    }
    corregir(i){//n=numerador d=denominador r= cambio
        
        if((i+1) === this.n){
                this.lienzo.fillStyle(0x00ff00);
                this.lienzo.fillRect(1300,50,300,100);
                this.opc= this.add.text(1335, 75, '¿OTRO?', { color: 'black', fontFamily: 'Arial', fontSize: '50px '});
                for(var j=0;j<4;j++){
                    this.element[j].visible=false;
                }
                const otro = this.add.zone(1300, 50, 300,100);
                otro.setOrigin(0);
                otro.setInteractive();
                otro.once('pointerdown', () => this.opcionPulsada('otro'));
                
                var h2 = this.add.dom(1100, 500, 'h2', null, 'Ganaste ');
                h2.setClassName('dreams');
                h2.setAngle(-15);
                c.play();
                b=0.75;
        }else{
            this.a=0.75;
            this.cameras.main.shake(200,0.01);
            w.play();
        }
    }
}

class C2 extends Phaser.Scene{
    
    constructor() {
	super('C2');
        
    }
    preload(){
        this.load.audio('correct', './asset/sounds/correct.mp3');
        this.load.audio('wrong', './asset/sounds/wrong.mp3');
        this.load.image('inicio','./asset/img/inicio.png');       
        this.load.image('C','./asset/img/circulo.png');
        this.load.image('T','./asset/img/triángulo.png');
        this.load.image('Cu','./asset/img/cuadrado.png');
        this.n=Math.floor(Math.random()*10)+1;
        this.fig=Math.floor(Math.random()*3);
        this.figIma= this.fig===0 ? "C" : this.fig === 1 ? "T" : "Cu";
        //console.log(this.n);
        //console.log(this.figIma);
        this.pos =new Array();
        
        for(var i =0;i<15;i++){
            this.pos.push(i);
        }
        this.pos.sort(() => (Math.random()>0.5)? 1 :-1);
        //console.log(this.pos);
    }
    create(){
        //this.add.image(0,0,'fondo').setOrigin(0,0);
        this.inicio = this.add.image(130,130,'inicio');
        this.inicio.setScale(0.5);
        
        
        const inicio = this.add.zone(0, 0, 250, 250);
        inicio.setOrigin(0);
        inicio.setInteractive();
        inicio.once('pointerdown', () => this.opcionPulsada('inicio'));
        
        c = this.sound.add('correct',{loop:false});
        w = this.sound.add('wrong',{loop:false});
        
        this.div = document.createElement('h1');
        this.div.style = 'width: 1500px; font-size: 80px; ';
        this.div.innerHTML ='¿Cuántos <img src="./asset/img/'+(this.fig===0 ? 'circulo' : this.fig===1 ? 'triángulo' : 'cuadrado' )+'.png" width="80" height="80">'+
                       ' hay? ';
        
        this.add.dom(960, 100, this.div);
        
        this.fra = new Array();
                       
        for(var i=0;i<this.n;i++){
        //for(var i=0;i<15;i++){
            this.fra.push(this.add.image(500+250*(Math.floor(this.pos[i]%5)),275+200*(Math.floor(this.pos[i]/5)),this.figIma).setOrigin(0.5, 0.5));
        }
        
        for(var i=0;i<this.fra.length;i++){            
            this.fra[i].setScale(200/679*(0.25+Math.random()*0.75));
            this.fra[i].setTint(Colores[Math.floor(Math.random()*4)]);
            this.fra[i].setRotation(Math.random()*6);
        }
        
        var boton = new Array();
        this.element = new Array();
        for(var i=0;i<10;i++){
            boton.push(document.createElement('button'));
            boton[i].setAttribute('type','button');
            boton[i].setAttribute('id',i+1+"");
            this.element.push(this.add.dom(550+i*100, 885, boton[i],null,(i+1)+"")) ; 
            this.element[i].addListener('click');
        }
        
        this.element[0].on('click',() => this.corregir(0));
        this.element[1].on('click',() => this.corregir(1));
        this.element[2].on('click',() => this.corregir(2));
        this.element[3].on('click',() => this.corregir(3));
        this.element[4].on('click',() => this.corregir(4));
        this.element[5].on('click',() => this.corregir(5));
        this.element[6].on('click',() => this.corregir(6));
        this.element[7].on('click',() => this.corregir(7));
        this.element[8].on('click',() => this.corregir(8));
        this.element[9].on('click',() => this.corregir(9));
        
        
        this.input.keyboard.on('keydown-ONE',() => this.corregir(0));
        this.input.keyboard.on('keydown-TWO',() => this.corregir(1));
        this.input.keyboard.on('keydown-THREE',() => this.corregir(2));
        this.input.keyboard.on('keydown-FOUR',() => this.corregir(3));
        this.input.keyboard.on('keydown-FIVE',() => this.corregir(4));
        this.input.keyboard.on('keydown-SIX',() => this.corregir(5));
        this.input.keyboard.on('keydown-SEVEN',() => this.corregir(6));
        this.input.keyboard.on('keydown-EIGHT',() => this.corregir(7));
        this.input.keyboard.on('keydown-NINE',() => this.corregir(8));
        
        
        this.input.keyboard.on('keydown-NUMPAD_ONE',() => this.corregir(0));
        this.input.keyboard.on('keydown-NUMPAD_TWO',() => this.corregir(1));
        this.input.keyboard.on('keydown-NUMPAD_THREE',() => this.corregir(2));
        this.input.keyboard.on('keydown-NUMPAD_FOUR',() => this.corregir(3));
        this.input.keyboard.on('keydown-NUMPAD_FIVE',() => this.corregir(4));
        this.input.keyboard.on('keydown-NUMPAD_SIX',() => this.corregir(5));
        this.input.keyboard.on('keydown-NUMPAD_SEVEN',() => this.corregir(6));
        this.input.keyboard.on('keydown-NUMPAD_EIGHT',() => this.corregir(7));
        this.input.keyboard.on('keydown-NUMPAD_NINE',() => this.corregir(8));
        
        
        this.lienzo  = this.add.graphics();
        this.lienzo2 = this.add.graphics();
        this.lienzo3 = this.add.graphics();
        //this.cursors = this.input.keyboard.createCursorKeys();
        
        
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
         if(b>0){
            b-=0.5*delta/1000;
        }else{
            b=0;
        }
        this.lienzo3.clear();
        this.lienzo3.setAlpha(b);
        this.lienzo3.fillStyle(0x00ff00);
        this.lienzo3.fillRect(0,0,1920,1080);
    }
    
    opcionPulsada(opcion) {
        //console.log(opcion);
        if(opcion === 'otro'){
            this.scene.start(this.scene.key);
        }else{
            this.scene.start('menu');
        }
	
    }
    corregir(i){
        
        if((i+1) === this.n){
                this.lienzo.fillStyle(0x00ff00);
                this.lienzo.fillRect(1300,50,300,100);
                this.opc= this.add.text(1335, 75, '¿OTRO?', { color: 'black', fontFamily: 'Arial', fontSize: '50px '});
                for(var j=0;j<10;j++){
                    this.element[j].visible=false;
                }
                const otro = this.add.zone(1300, 50, 300,100);
                otro.setOrigin(0);
                otro.setInteractive();
                otro.once('pointerdown', () => this.opcionPulsada('otro'));
                
                var h2 = this.add.dom(1100, 500, 'h2', null, 'Ganaste ');
                h2.setClassName('dreams');
                h2.setAngle(-15);
                c.play();
                b=0.75;
        }else{
            this.a=0.75;
            this.cameras.main.shake(200,0.01);
            w.play();
        }
    }
}

class C3 extends Phaser.Scene{
    
    constructor() {
	super('C3');
        
    }
    preload(){
        this.load.audio('correct', './asset/sounds/correct.mp3');
        this.load.audio('wrong', './asset/sounds/wrong.mp3');
        this.load.image('inicio','./asset/img/inicio.png');       
        this.load.image('C','./asset/img/circulo.png');//0
        this.load.image('T','./asset/img/triángulo.png');//1
        this.load.image('Cu','./asset/img/cuadrado.png');//2
        this.n=[Math.floor(Math.random()*10+1),Math.floor(Math.random()*10+1)];
        
        this.n.push(Math.max(Math.min(20-this.n[1]-this.n[0],10),1));
        this.fig=Math.floor(Math.random()*3);
        this.figIma= this.fig===0 ? "C" : this.fig === 1 ? "T" : "Cu";
        console.log(this.n);
        //console.log(this.figIma);
        this.pos =new Array();
        
        for(var i =0;i<21;i++){
            this.pos.push(i);
        }
        this.pos.sort(() => (Math.random()>0.5)? 1 :-1);
        //console.log(this.pos);
    }
    create(){
        //this.add.image(0,0,'fondo').setOrigin(0,0);
        this.inicio = this.add.image(130,130,'inicio');
        this.inicio.setScale(0.5);
        
        
        const inicio = this.add.zone(0, 0, 250, 250);
        inicio.setOrigin(0);
        inicio.setInteractive();
        inicio.once('pointerdown', () => this.opcionPulsada('inicio'));
        
        c = this.sound.add('correct',{loop:false});
        w = this.sound.add('wrong',{loop:false});
        
        this.div = document.createElement('h1');
        this.div.style = 'width: 1500px; font-size: 80px; ';
        this.div.innerHTML ='¿Cuántos <img src="./asset/img/'+(this.fig===0 ? 'circulo' : this.fig===1 ? 'triángulo' : 'cuadrado' )+'.png" width="80" height="80">'+
                       ' hay? ';
        
        this.add.dom(960, 100, this.div);
        
        this.fra = new Array();
                       
        for(var i=0;i<this.n[0];i++){
        //for(var i=0;i<15;i++){
            this.fra.push(this.add.image(270+230*(Math.floor(this.pos[i]%7)),275+200*(Math.floor(this.pos[i]/7)),'C').setOrigin(0.5, 0.5));
        }
        for(var i=this.n[0];i<this.n[0]+this.n[1];i++){
        //for(var i=0;i<15;i++){
            this.fra.push(this.add.image(270+230*(Math.floor(this.pos[i]%7)),275+200*(Math.floor(this.pos[i]/7)),'T').setOrigin(0.5, 0.5));
        }
        for(var i=this.n[0]+this.n[1];i<this.n[0]+this.n[1]+this.n[2];i++){
        //for(var i=0;i<15;i++){
            this.fra.push(this.add.image(270+230*(Math.floor(this.pos[i]%7)),275+200*(Math.floor(this.pos[i]/7)),'Cu').setOrigin(0.5, 0.5));
        }
        
        for(var i=0;i<this.fra.length;i++){            
            this.fra[i].setScale(200/679*(0.25+Math.random()*0.75));
            this.fra[i].setTint(Colores[Math.floor(Math.random()*4)]);
            this.fra[i].setRotation(Math.random()*6);
        }
        
        var boton = new Array();
        this.element = new Array();
        for(var i=0;i<10;i++){
            boton.push(document.createElement('button'));
            boton[i].setAttribute('type','button');
            boton[i].setAttribute('id',i+1+"");
            this.element.push(this.add.dom(550+i*100, 885, boton[i],null,(i+1)+"")) ; 
            this.element[i].addListener('click');
        }
        
        this.element[0].on('click',() => this.corregir(0));
        this.element[1].on('click',() => this.corregir(1));
        this.element[2].on('click',() => this.corregir(2));
        this.element[3].on('click',() => this.corregir(3));
        this.element[4].on('click',() => this.corregir(4));
        this.element[5].on('click',() => this.corregir(5));
        this.element[6].on('click',() => this.corregir(6));
        this.element[7].on('click',() => this.corregir(7));
        this.element[8].on('click',() => this.corregir(8));
        this.element[9].on('click',() => this.corregir(9));
        
        
        this.input.keyboard.on('keydown-ONE',() => this.corregir(0));
        this.input.keyboard.on('keydown-TWO',() => this.corregir(1));
        this.input.keyboard.on('keydown-THREE',() => this.corregir(2));
        this.input.keyboard.on('keydown-FOUR',() => this.corregir(3));
        this.input.keyboard.on('keydown-FIVE',() => this.corregir(4));
        this.input.keyboard.on('keydown-SIX',() => this.corregir(5));
        this.input.keyboard.on('keydown-SEVEN',() => this.corregir(6));
        this.input.keyboard.on('keydown-EIGHT',() => this.corregir(7));
        this.input.keyboard.on('keydown-NINE',() => this.corregir(8));
        
        
        this.input.keyboard.on('keydown-NUMPAD_ONE',() => this.corregir(0));
        this.input.keyboard.on('keydown-NUMPAD_TWO',() => this.corregir(1));
        this.input.keyboard.on('keydown-NUMPAD_THREE',() => this.corregir(2));
        this.input.keyboard.on('keydown-NUMPAD_FOUR',() => this.corregir(3));
        this.input.keyboard.on('keydown-NUMPAD_FIVE',() => this.corregir(4));
        this.input.keyboard.on('keydown-NUMPAD_SIX',() => this.corregir(5));
        this.input.keyboard.on('keydown-NUMPAD_SEVEN',() => this.corregir(6));
        this.input.keyboard.on('keydown-NUMPAD_EIGHT',() => this.corregir(7));
        this.input.keyboard.on('keydown-NUMPAD_NINE',() => this.corregir(8));
        
        
        this.lienzo  = this.add.graphics();
        this.lienzo2 = this.add.graphics();
        this.lienzo3 = this.add.graphics();
        //this.cursors = this.input.keyboard.createCursorKeys();
        
        
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
         if(b>0){
            b-=0.5*delta/1000;
        }else{
            b=0;
        }
        this.lienzo3.clear();
        this.lienzo3.setAlpha(b);
        this.lienzo3.fillStyle(0x00ff00);
        this.lienzo3.fillRect(0,0,1920,1080);
    }
    
    opcionPulsada(opcion) {
        //console.log(opcion);
        if(opcion === 'otro'){
            this.scene.start(this.scene.key);
        }else{
            this.scene.start('menu');
        }
	
    }
    corregir(i){
        
        if((i+1) === this.n[this.fig]){
                this.lienzo.fillStyle(0x00ff00);
                this.lienzo.fillRect(1300,50,300,100);
                this.opc= this.add.text(1335, 75, '¿OTRO?', { color: 'black', fontFamily: 'Arial', fontSize: '50px '});
                for(var j=0;j<10;j++){
                    this.element[j].visible=false;
                }
                const otro = this.add.zone(1300, 50, 300,100);
                otro.setOrigin(0);
                otro.setInteractive();
                otro.once('pointerdown', () => this.opcionPulsada('otro'));
                
                var h2 = this.add.dom(1100, 500, 'h2', null, 'Ganaste ');
                h2.setClassName('dreams');
                h2.setAngle(-15);
                c.play();
                b=0.75;
        }else{
            this.a=0.75;
            this.cameras.main.shake(200,0.01);
            w.play();
        }
    }
}

class D1 extends Phaser.Scene{
    
    constructor() {
	super('D1');
        
    }
    preload(){
        this.load.audio('correct', './asset/sounds/correct.mp3');
        this.load.audio('wrong', './asset/sounds/wrong.mp3');
        this.load.image('inicio','./asset/img/inicio.png');       
        this.load.image('1','./asset/img/dedo1.png');//0
        this.load.image('2','./asset/img/dedo2.png');//1
        this.load.image('3','./asset/img/dedo3.png');//2
        this.load.image('4','./asset/img/dedo4.png');//2
        this.load.image('5','./asset/img/dedo5.png');//2
        this.n=Math.floor(Math.random()*5+1);
        console.log(this.n);
    }
    create(){
        //this.add.image(0,0,'fondo').setOrigin(0,0);
        this.inicio = this.add.image(130,130,'inicio');
        this.inicio.setScale(0.5);
        
        
        const inicio = this.add.zone(0, 0, 250, 250);
        inicio.setOrigin(0);
        inicio.setInteractive();
        inicio.once('pointerdown', () => this.opcionPulsada('inicio'));
        
        c = this.sound.add('correct',{loop:false});
        w = this.sound.add('wrong',{loop:false});
        
        this.div = document.createElement('h1');
        this.div.style = 'width: 1500px; font-size: 80px; ';
        this.div.innerHTML ='¿Cuántos dedos hay? ';
        
        this.add.dom(960, 100, this.div);
        
        
        
        this.fra = new Array();
         this.fra.push(this.add.image(960,560,this.n+'').setOrigin(0.5, 0.5));
        
        
        for(var i=0;i<this.fra.length;i++){            
            this.fra[i].setScale(5);
            //this.fra[i].setTint(Colores[Math.floor(Math.random()*4)]);
            //this.fra[i].setRotation(Math.random()*6);
        }
        
        var boton = new Array();
        this.element = new Array();
        for(var i=0;i<10;i++){
            boton.push(document.createElement('button'));
            boton[i].setAttribute('type','button');
            boton[i].setAttribute('id',i+1+"");
            this.element.push(this.add.dom(550+i*100, 885, boton[i],null,(i+1)+"")) ; 
            this.element[i].addListener('click');
        }
        
        this.element[0].on('click',() => this.corregir(0));
        this.element[1].on('click',() => this.corregir(1));
        this.element[2].on('click',() => this.corregir(2));
        this.element[3].on('click',() => this.corregir(3));
        this.element[4].on('click',() => this.corregir(4));
        this.element[5].on('click',() => this.corregir(5));
        this.element[6].on('click',() => this.corregir(6));
        this.element[7].on('click',() => this.corregir(7));
        this.element[8].on('click',() => this.corregir(8));
        this.element[9].on('click',() => this.corregir(9));
        
        
        this.input.keyboard.on('keydown-ONE',() => this.corregir(0));
        this.input.keyboard.on('keydown-TWO',() => this.corregir(1));
        this.input.keyboard.on('keydown-THREE',() => this.corregir(2));
        this.input.keyboard.on('keydown-FOUR',() => this.corregir(3));
        this.input.keyboard.on('keydown-FIVE',() => this.corregir(4));
        this.input.keyboard.on('keydown-SIX',() => this.corregir(5));
        this.input.keyboard.on('keydown-SEVEN',() => this.corregir(6));
        this.input.keyboard.on('keydown-EIGHT',() => this.corregir(7));
        this.input.keyboard.on('keydown-NINE',() => this.corregir(8));
        
        
        this.input.keyboard.on('keydown-NUMPAD_ONE',() => this.corregir(0));
        this.input.keyboard.on('keydown-NUMPAD_TWO',() => this.corregir(1));
        this.input.keyboard.on('keydown-NUMPAD_THREE',() => this.corregir(2));
        this.input.keyboard.on('keydown-NUMPAD_FOUR',() => this.corregir(3));
        this.input.keyboard.on('keydown-NUMPAD_FIVE',() => this.corregir(4));
        this.input.keyboard.on('keydown-NUMPAD_SIX',() => this.corregir(5));
        this.input.keyboard.on('keydown-NUMPAD_SEVEN',() => this.corregir(6));
        this.input.keyboard.on('keydown-NUMPAD_EIGHT',() => this.corregir(7));
        this.input.keyboard.on('keydown-NUMPAD_NINE',() => this.corregir(8));
        
        
        this.lienzo  = this.add.graphics();
        this.lienzo2 = this.add.graphics();
        this.lienzo3 = this.add.graphics();
        //this.cursors = this.input.keyboard.createCursorKeys();
        
        
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
         if(b>0){
            b-=0.5*delta/1000;
        }else{
            b=0;
        }
        this.lienzo3.clear();
        this.lienzo3.setAlpha(b);
        this.lienzo3.fillStyle(0x00ff00);
        this.lienzo3.fillRect(0,0,1920,1080);
    }
    
    opcionPulsada(opcion) {
        //console.log(opcion);
        if(opcion === 'otro'){
            this.scene.start(this.scene.key);
        }else{
            this.scene.start('menu');
        }
	
    }
    corregir(i){
        
        if((i+1) === this.n){
                this.lienzo.fillStyle(0x00ff00);
                this.lienzo.fillRect(1300,50,300,100);
                this.opc= this.add.text(1335, 75, '¿OTRO?', { color: 'black', fontFamily: 'Arial', fontSize: '50px '});
                for(var j=0;j<10;j++){
                    this.element[j].visible=false;
                }
                const otro = this.add.zone(1300, 50, 300,100);
                otro.setOrigin(0);
                otro.setInteractive();
                otro.once('pointerdown', () => this.opcionPulsada('otro'));
                
                var h2 = this.add.dom(1100, 500, 'h2', null, 'Ganaste ');
                h2.setClassName('dreams');
                h2.setAngle(-15);
                c.play();
                b=0.75;
        }else{
            this.a=0.75;
            this.cameras.main.shake(200,0.01);
            w.play();
        }
    }
}

class D2 extends Phaser.Scene{
    
    constructor() {
	super('D2');
        
    }
    preload(){
        this.load.audio('correct', './asset/sounds/correct.mp3');
        this.load.audio('wrong', './asset/sounds/wrong.mp3');
        this.load.image('inicio','./asset/img/inicio.png');
        this.load.image('0','./asset/img/dedo0.png');//0
        this.load.image('1','./asset/img/dedo1.png');//0
        this.load.image('2','./asset/img/dedo2.png');//1
        this.load.image('3','./asset/img/dedo3.png');//2
        this.load.image('4','./asset/img/dedo4.png');//2
        this.load.image('5','./asset/img/dedo5.png');//2
        this.n=Math.floor(Math.random()*10+1);
        console.log(this.n);
    }
    create(){
        //this.add.image(0,0,'fondo').setOrigin(0,0);
        this.inicio = this.add.image(130,130,'inicio');
        this.inicio.setScale(0.5);
        
        
        const inicio = this.add.zone(0, 0, 250, 250);
        inicio.setOrigin(0);
        inicio.setInteractive();
        inicio.once('pointerdown', () => this.opcionPulsada('inicio'));
        
        c = this.sound.add('correct',{loop:false});
        w = this.sound.add('wrong',{loop:false});
        
        this.div = document.createElement('h1');
        this.div.style = 'width: 1500px; font-size: 80px; ';
        this.div.innerHTML ='¿Cuántos dedos hay? ';
        
        this.add.dom(960, 100, this.div);
        
        
        
        this.fra = new Array();
         this.fra.push(this.add.image(710,560,(this.n>5?this.n-5:0)+'').setOrigin(0.5, 0.5));
        this.fra.push(this.add.image(1210,560,(this.n<5?this.n:5)+'').setOrigin(0.5, 0.5));
        this.fra[1].setFlipX(true);
        console.log(this.fra[1]);
        for(var i=0;i<this.fra.length;i++){            
            this.fra[i].setScale(5);
            //this.fra[i].setTint(Colores[Math.floor(Math.random()*4)]);
            //this.fra[i].setRotation(Math.random()*6);
        }
        
        var boton = new Array();
        this.element = new Array();
        for(var i=0;i<10;i++){
            boton.push(document.createElement('button'));
            boton[i].setAttribute('type','button');
            boton[i].setAttribute('id',i+1+"");
            this.element.push(this.add.dom(550+i*100, 885, boton[i],null,(i+1)+"")) ; 
            this.element[i].addListener('click');
        }
        
        this.element[0].on('click',() => this.corregir(0));
        this.element[1].on('click',() => this.corregir(1));
        this.element[2].on('click',() => this.corregir(2));
        this.element[3].on('click',() => this.corregir(3));
        this.element[4].on('click',() => this.corregir(4));
        this.element[5].on('click',() => this.corregir(5));
        this.element[6].on('click',() => this.corregir(6));
        this.element[7].on('click',() => this.corregir(7));
        this.element[8].on('click',() => this.corregir(8));
        this.element[9].on('click',() => this.corregir(9));
        
        
        this.input.keyboard.on('keydown-ONE',() => this.corregir(0));
        this.input.keyboard.on('keydown-TWO',() => this.corregir(1));
        this.input.keyboard.on('keydown-THREE',() => this.corregir(2));
        this.input.keyboard.on('keydown-FOUR',() => this.corregir(3));
        this.input.keyboard.on('keydown-FIVE',() => this.corregir(4));
        this.input.keyboard.on('keydown-SIX',() => this.corregir(5));
        this.input.keyboard.on('keydown-SEVEN',() => this.corregir(6));
        this.input.keyboard.on('keydown-EIGHT',() => this.corregir(7));
        this.input.keyboard.on('keydown-NINE',() => this.corregir(8));
        
        
        this.input.keyboard.on('keydown-NUMPAD_ONE',() => this.corregir(0));
        this.input.keyboard.on('keydown-NUMPAD_TWO',() => this.corregir(1));
        this.input.keyboard.on('keydown-NUMPAD_THREE',() => this.corregir(2));
        this.input.keyboard.on('keydown-NUMPAD_FOUR',() => this.corregir(3));
        this.input.keyboard.on('keydown-NUMPAD_FIVE',() => this.corregir(4));
        this.input.keyboard.on('keydown-NUMPAD_SIX',() => this.corregir(5));
        this.input.keyboard.on('keydown-NUMPAD_SEVEN',() => this.corregir(6));
        this.input.keyboard.on('keydown-NUMPAD_EIGHT',() => this.corregir(7));
        this.input.keyboard.on('keydown-NUMPAD_NINE',() => this.corregir(8));
        
        
        this.lienzo  = this.add.graphics();
        this.lienzo2 = this.add.graphics();
        this.lienzo3 = this.add.graphics();
        //this.cursors = this.input.keyboard.createCursorKeys();
        
        
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
         if(b>0){
            b-=0.5*delta/1000;
        }else{
            b=0;
        }
        this.lienzo3.clear();
        this.lienzo3.setAlpha(b);
        this.lienzo3.fillStyle(0x00ff00);
        this.lienzo3.fillRect(0,0,1920,1080);
    }
    
    opcionPulsada(opcion) {
        //console.log(opcion);
        if(opcion === 'otro'){
            this.scene.start(this.scene.key);
        }else{
            this.scene.start('menu');
        }
	
    }
    corregir(i){
        
        if((i+1) === this.n){
                this.lienzo.fillStyle(0x00ff00);
                this.lienzo.fillRect(1300,50,300,100);
                this.opc= this.add.text(1335, 75, '¿OTRO?', { color: 'black', fontFamily: 'Arial', fontSize: '50px '});
                for(var j=0;j<10;j++){
                    this.element[j].visible=false;
                }
                const otro = this.add.zone(1300, 50, 300,100);
                otro.setOrigin(0);
                otro.setInteractive();
                otro.once('pointerdown', () => this.opcionPulsada('otro'));
                
                var h2 = this.add.dom(1100, 500, 'h2', null, 'Ganaste ');
                h2.setClassName('dreams');
                h2.setAngle(-15);
                c.play();
                b=0.75;
        }else{
            this.a=0.75;
            this.cameras.main.shake(200,0.01);
            w.play();
        }
    }
}

class D3 extends Phaser.Scene{
    
    constructor() {
	super('D3');
        
    }
    preload(){
        this.load.audio('correct', './asset/sounds/correct.mp3');
        this.load.audio('wrong', './asset/sounds/wrong.mp3');
        this.load.image('inicio','./asset/img/inicio.png');
        this.load.image('0','./asset/img/dedo0.png');//0
        this.load.image('1','./asset/img/dedo1.png');//0
        this.load.image('2','./asset/img/dedo2.png');//1
        this.load.image('3','./asset/img/dedo3.png');//2
        this.load.image('4','./asset/img/dedo4.png');//2
        this.load.image('5','./asset/img/dedo5.png');//2
        this.n=Math.floor(Math.random()*8+2);
        console.log(this.n);
    }
    create(){
        //this.add.image(0,0,'fondo').setOrigin(0,0);
        this.inicio = this.add.image(130,130,'inicio');
        this.inicio.setScale(0.5);
        
        
        const inicio = this.add.zone(0, 0, 250, 250);
        inicio.setOrigin(0);
        inicio.setInteractive();
        inicio.once('pointerdown', () => this.opcionPulsada('inicio'));
        
        c = this.sound.add('correct',{loop:false});
        w = this.sound.add('wrong',{loop:false});
        
        this.div = document.createElement('h1');
        this.div.style = 'width: 1500px; font-size: 80px; ';
        this.div.innerHTML ='¿Cuántos dedos hay? ';
        
        this.add.dom(960, 100, this.div);
        
        
        
        this.fra = new Array();
         this.fra.push(this.add.image(710,560,(this.n%5)+'').setOrigin(0.5, 0.5));
        this.fra.push(this.add.image(1210,560,(5)+'').setOrigin(0.5, 0.5));
        this.fra[1].setFlipX(true);
        console.log(this.fra[1]);
        for(var i=0;i<this.fra.length;i++){            
            this.fra[i].setScale(5);
            //this.fra[i].setTint(Colores[Math.floor(Math.random()*4)]);
            //this.fra[i].setRotation(Math.random()*6);
        }
        
        var boton = new Array();
        this.element = new Array();
        for(var i=0;i<10;i++){
            boton.push(document.createElement('button'));
            boton[i].setAttribute('type','button');
            boton[i].setAttribute('id',i+1+"");
            this.element.push(this.add.dom(550+i*100, 885, boton[i],null,(i+1)+"")) ; 
            this.element[i].addListener('click');
        }
        
        this.element[0].on('click',() => this.corregir(0));
        this.element[1].on('click',() => this.corregir(1));
        this.element[2].on('click',() => this.corregir(2));
        this.element[3].on('click',() => this.corregir(3));
        this.element[4].on('click',() => this.corregir(4));
        this.element[5].on('click',() => this.corregir(5));
        this.element[6].on('click',() => this.corregir(6));
        this.element[7].on('click',() => this.corregir(7));
        this.element[8].on('click',() => this.corregir(8));
        this.element[9].on('click',() => this.corregir(9));
        
        
        this.input.keyboard.on('keydown-ONE',() => this.corregir(0));
        this.input.keyboard.on('keydown-TWO',() => this.corregir(1));
        this.input.keyboard.on('keydown-THREE',() => this.corregir(2));
        this.input.keyboard.on('keydown-FOUR',() => this.corregir(3));
        this.input.keyboard.on('keydown-FIVE',() => this.corregir(4));
        this.input.keyboard.on('keydown-SIX',() => this.corregir(5));
        this.input.keyboard.on('keydown-SEVEN',() => this.corregir(6));
        this.input.keyboard.on('keydown-EIGHT',() => this.corregir(7));
        this.input.keyboard.on('keydown-NINE',() => this.corregir(8));
        
        
        this.input.keyboard.on('keydown-NUMPAD_ONE',() => this.corregir(0));
        this.input.keyboard.on('keydown-NUMPAD_TWO',() => this.corregir(1));
        this.input.keyboard.on('keydown-NUMPAD_THREE',() => this.corregir(2));
        this.input.keyboard.on('keydown-NUMPAD_FOUR',() => this.corregir(3));
        this.input.keyboard.on('keydown-NUMPAD_FIVE',() => this.corregir(4));
        this.input.keyboard.on('keydown-NUMPAD_SIX',() => this.corregir(5));
        this.input.keyboard.on('keydown-NUMPAD_SEVEN',() => this.corregir(6));
        this.input.keyboard.on('keydown-NUMPAD_EIGHT',() => this.corregir(7));
        this.input.keyboard.on('keydown-NUMPAD_NINE',() => this.corregir(8));
        
        
        this.lienzo  = this.add.graphics();
        this.lienzo2 = this.add.graphics();
        this.lienzo3 = this.add.graphics();
        //this.cursors = this.input.keyboard.createCursorKeys();
        
        
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
         if(b>0){
            b-=0.5*delta/1000;
        }else{
            b=0;
        }
        this.lienzo3.clear();
        this.lienzo3.setAlpha(b);
        this.lienzo3.fillStyle(0x00ff00);
        this.lienzo3.fillRect(0,0,1920,1080);
    }
    
    opcionPulsada(opcion) {
        //console.log(opcion);
        if(opcion === 'otro'){
            this.scene.start(this.scene.key);
        }else{
            this.scene.start('menu');
        }
	
    }
    corregir(i){
        
        if((i+1) === (this.n%5+5)){
                this.lienzo.fillStyle(0x00ff00);
                this.lienzo.fillRect(1300,50,300,100);
                this.opc= this.add.text(1335, 75, '¿OTRO?', { color: 'black', fontFamily: 'Arial', fontSize: '50px '});
                for(var j=0;j<10;j++){
                    this.element[j].visible=false;
                }
                const otro = this.add.zone(1300, 50, 300,100);
                otro.setOrigin(0);
                otro.setInteractive();
                otro.once('pointerdown', () => this.opcionPulsada('otro'));
                
                var h2 = this.add.dom(1100, 500, 'h2', null, 'Ganaste ');
                h2.setClassName('dreams');
                h2.setAngle(-15);
                c.play();
                b=0.75;
        }else{
            this.a=0.75;
            this.cameras.main.shake(200,0.01);
            w.play();
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
  scene: [menu,C1,C2,C3,D1,D2,D3],
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

