/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
const titulo = 'Sumar y restar, rápido'; //Titulo del juego
const menulabel = [['Sumar 1', 'Sumar 2', 'Sumar 3','Sumar 4'],
                ['Resta 1','Resta 2','Resta 3', 'Resta 4']
            ]; //Opciones menú
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
                opc[opc.length-1].setInteractive({ cursor: 'pointer' });
                opc[opc.length-1].name = i+"";
                this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(opc[opc.length-1]);
            }
        
            //
            //console.log(opc[i]);
        }
        opc[0].on('pointerover',function(event){
            
           console.log(this); 
        });
        opc[0].once('pointerdown', () => this.opcionPulsada(0));
        opc[1].once('pointerdown', () => this.opcionPulsada(1));
        opc[2].once('pointerdown', () => this.opcionPulsada(2));
        opc[3].once('pointerdown', () => this.opcionPulsada(3));
        opc[4].once('pointerdown', () => this.opcionPulsada(4));
        opc[5].once('pointerdown', () => this.opcionPulsada(5));
        opc[6].once('pointerdown', () => this.opcionPulsada(6));
        opc[7].once('pointerdown', () => this.opcionPulsada(7));/*
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
        console.log("opcionPulsada("+opcion+")");
        opcion +='';
	if (opcion === '0') {
		this.scene.start('S1D');
	} else if (opcion === '1'){
                this.scene.start('S1D2');
	} else if (opcion === '2'){
                this.scene.start('S1D3');
        } else if (opcion === '3'){
                this.scene.start('S1D4');
        } else if (opcion === '4'){
                this.scene.start('R1');
            //console.log("eq2");
        } else if (opcion === '5'){
                this.scene.start('R2');
        } else if (opcion === '6'){
                this.scene.start('R3');
        } else  if (opcion === '7'){
                this.scene.start('R4');
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

class S1D extends Phaser.Scene{ //¿Qué número es?
    constructor(){
        super({key:'S1D'});
        this.resp;
        this.N;
    }
    preload(){
        this.load.audio('correct', './asset/sounds/correct.mp3');
        this.load.audio('wrong', './asset/sounds/wrong.mp3');
        this.load.image('logo','./asset/img/logo.jpeg');
        this.load.image('1','./asset/img/1.png');
        this.load.image('10','./asset/img/10.png');
    }
    create(){
        this.add.image(205,82,'logo');
        
        this.graph = this.add.graphics();
        this.graph.fillStyle(0xF1C40F);
        
        this.graph.fillRect(1600,50,300,90);
        this.add.text(1750, 50, 'INICIO', { color: 'black', fontFamily: 'Arial', fontSize: '70px '}).setOrigin(0.5,0);
        const ini = this.add.zone(1600, 50, 300, 90);
	ini.setOrigin(0);
	ini.setInteractive();
	ini.once('pointerdown', () => this.opcionPulsada('ini'));
	this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(ini);
        
        c = this.sound.add('correct',{loop:false});
        w = this.sound.add('wrong',{loop:false});
        
        this.N=new Array();
        this.N.push(Math.floor(Math.random()*9)+1);
        this.N.push(Math.floor(Math.random()*(9-this.N[0]))+1);
        this.resp=this.N[0]+this.N[1];
        console.log(this.N[0]+" + "+this.N[1]+" = "+this.resp);
        
        this.unos = new Array();
        
        this.r =400;
        this.x=[960-70*this.N[0],960-70*this.N[1] ];
        this.graph.fillRect(Math.min(this.x[0],this.x[1])-50,250,990-Math.min(this.x[0],this.x[1]),200);
                
        for(var j=0;j<2;j++){
            for(var i=0;i<this.N[j];i++){
                this.unos.push(this.add.image(this.x[j]+70*i ,300+j*100,'1'));
                this.unos[this.unos.length-1].setInteractive();
                this.input.setDraggable(this.unos[this.unos.length-1]);
                this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
                    gameObject.x = dragX;
                    gameObject.y = dragY;
                });
            }
        }
        
        this.add.text(1100, 300-35, this.N[0], { color: 'black', fontFamily: 'Arial', fontSize: '70px '}).setOrigin(0.5,0);
        this.add.text(1100, 400-35, this.N[1], { color: 'black', fontFamily: 'Arial', fontSize: '70px '}).setOrigin(0.5,0);
        this.add.text(1000, 350-35, "+", { color: 'black', fontFamily: 'Arial', fontSize: '70px '}).setOrigin(0.5,0);
        
        this.graph.lineStyle(5, 0x000000, 1);
        this.graph.lineBetween(1000, 450, 1200, 450);
        
        
        var respuesta = document.createElement('input');
        respuesta.setAttribute('type'  ,'number');
        respuesta.setAttribute('id','respuesta');
        respuesta.setAttribute('placeholder','Respuesta');
        respuesta.setAttribute('autofocus','autofocus');
        respuesta.setAttribute('max','9');
        respuesta.setAttribute('min','0');
        this.res = this.add.dom(1100, 500, respuesta);
        
        console.log("escena");
        console.log(this.res);
        
        
        var boton = document.createElement('button');
        boton.setAttribute('type','button');
        this.element = this.add.dom(1600, 540, boton,'','Corregir');
        this.element.addListener('click');
        this.element.on('click',() => this.corregir());
        
        this.input.keyboard.on('keydown-ENTER',() => this.corregir());
        
        this.lienzo = this.add.graphics();
        this.lienzo.fillStyle(0xff0000);
        this.lienzo.setAlpha(a);
        this.lienzo.fillRect(0,0,1920,1080);
        
        this.lienzo2 = this.add.graphics();
        this.lienzo2.fillStyle(0x00ff00);
        this.lienzo2.setAlpha(a);
        this.lienzo2.fillRect(0,0,1920,1080);
        
        this.lienzo2.clear();
        b=0;
        this.lienzo3 = this.add.graphics();
    }
    
    corregir(){
        var r = document.getElementById('respuesta').value;
        console.log(r);
        console.log(this.resp);
        if(r===this.resp.toString()){
            console.log("Correcto");
            b=0.5;
            c.play();
            this.element.setVisible(false);
            this.lienzo3 = this.add.graphics();
                this.lienzo3.fillStyle(0x03A9F4);
                this.lienzo3.fillRect(1300,50,300,90);
                this.opc= this.add.text(1450, 95, '¿OTRO?', { color: 'black', fontFamily: 'Arial', fontSize: '50px '}).setOrigin(0.5,0.5);
                this.input.keyboard.off('keydown-ENTER');
                this.input.keyboard.on('keydown-ENTER',() => this.opcionPulsada('otro'));
                this.res.destroy();
                
                const otro = this.add.zone(1300, 50, 300,100);
                    otro.setOrigin(0);
                    otro.setInteractive();
                    otro.on('pointerdown', () => this.opcionPulsada('otro'));
            rc=1;
        }else{
            console.log("Incorrecto");
            a=0.5;
            w.play();
            this.cameras.main.shake(200,0.01);
        }
        
        
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
        rc=0;
        if(opcion === 'ini'){
            this.scene.start('menu');
        } else if(opcion === 'otro'){
           //this.scene.start(this.scene.key);
           this.scene.restart()
        }else{
            console.log("A dónde voy?");
        }
        
    }
}

class S1D2 extends Phaser.Scene{ //¿Qué número es?
    constructor(){
        super({key:'S1D2'});
        this.resp;
        this.N;
    }
    preload(){
        this.load.audio('correct', './asset/sounds/correct.mp3');
        this.load.audio('wrong', './asset/sounds/wrong.mp3');
        this.load.image('logo','./asset/img/logo.jpeg');
        this.load.image('1','./asset/img/1.png');
        this.load.image('10','./asset/img/10.png');
    }
    create(){
        this.add.image(205,82,'logo');
        
        this.graph = this.add.graphics();
        this.graph.fillStyle(0xF1C40F);
        
        this.graph.fillRect(1600,50,300,90);
        this.add.text(1750, 50, 'INICIO', { color: 'black', fontFamily: 'Arial', fontSize: '70px '}).setOrigin(0.5,0);
        const ini = this.add.zone(1600, 50, 300, 90);
	ini.setOrigin(0);
	ini.setInteractive();
	ini.once('pointerdown', () => this.opcionPulsada('ini'));
	this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(ini);
        
        c = this.sound.add('correct',{loop:false});
        w = this.sound.add('wrong',{loop:false});
        
        this.N=new Array();
        this.N.push(Math.floor(Math.random()*10)+1);
        this.N.push((10-this.N[0]));
        this.resp=this.N[0]+this.N[1];
        console.log(this.N[0]+" + "+this.N[1]+" = "+this.resp);
        
        this.unos = new Array();
        
        this.r =400;
        this.x=[960-70*this.N[0],960-70*this.N[1] ];
        this.graph.fillRect(Math.min(this.x[0],this.x[1])-50,250,990-Math.min(this.x[0],this.x[1]),200);
                
        for(var j=0;j<2;j++){
            for(var i=0;i<this.N[j];i++){
                this.unos.push(this.add.image(this.x[j]+70*i ,300+j*100,'1'));
                this.unos[this.unos.length-1].setInteractive();
                this.input.setDraggable(this.unos[this.unos.length-1]);
                this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
                    gameObject.x = dragX;
                    gameObject.y = dragY;
                });
            }
        }
        
        this.add.text(1100, 300-35, this.N[0], { color: 'black', fontFamily: 'Arial', fontSize: '70px '}).setOrigin(0.5,0);
        this.add.text(1100, 400-35, this.N[1], { color: 'black', fontFamily: 'Arial', fontSize: '70px '}).setOrigin(0.5,0);
        this.add.text(1000, 350-35, "+", { color: 'black', fontFamily: 'Arial', fontSize: '70px '}).setOrigin(0.5,0);
        
        this.graph.lineStyle(5, 0x000000, 1);
        this.graph.lineBetween(1000, 450, 1200, 450);
        
        
        var respuesta = document.createElement('input');
        respuesta.setAttribute('type'  ,'number');
        respuesta.setAttribute('id','respuesta');
        respuesta.setAttribute('placeholder','Respuesta');
        respuesta.setAttribute('autofocus','autofocus');
        respuesta.setAttribute('max','9');
        respuesta.setAttribute('min','0');
        this.res = this.add.dom(1100, 500, respuesta);
        
        console.log("escena");
        console.log(this.res);
        
        
        var boton = document.createElement('button');
        boton.setAttribute('type','button');
        this.element = this.add.dom(1600, 540, boton,'','Corregir');
        this.element.addListener('click');
        this.element.on('click',() => this.corregir());
        
        this.input.keyboard.on('keydown-ENTER',() => this.corregir());
        
        this.lienzo = this.add.graphics();
        this.lienzo.fillStyle(0xff0000);
        this.lienzo.setAlpha(a);
        this.lienzo.fillRect(0,0,1920,1080);
        
        this.lienzo2 = this.add.graphics();
        this.lienzo2.fillStyle(0x00ff00);
        this.lienzo2.setAlpha(a);
        this.lienzo2.fillRect(0,0,1920,1080);
        
        this.lienzo2.clear();
        b=0;
        this.lienzo3 = this.add.graphics();
    }
    
    corregir(){
        var r = document.getElementById('respuesta').value;
        console.log(r);
        console.log(this.resp);
        if(r===this.resp.toString()){
            console.log("Correcto");
            b=0.5;
            c.play();
            this.element.setVisible(false);
            this.lienzo3 = this.add.graphics();
                this.lienzo3.fillStyle(0x03A9F4);
                this.lienzo3.fillRect(1300,50,300,90);
                this.opc= this.add.text(1450, 95, '¿OTRO?', { color: 'black', fontFamily: 'Arial', fontSize: '50px '}).setOrigin(0.5,0.5);
                this.input.keyboard.off('keydown-ENTER');
                this.input.keyboard.on('keydown-ENTER',() => this.opcionPulsada('otro'));
                this.res.destroy();
                
                const otro = this.add.zone(1300, 50, 300,100);
                    otro.setOrigin(0);
                    otro.setInteractive();
                    otro.on('pointerdown', () => this.opcionPulsada('otro'));
            rc=1;
        }else{
            console.log("Incorrecto");
            a=0.5;
            w.play();
            this.cameras.main.shake(200,0.01);
        }
        
        
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
        rc=0;
        if(opcion === 'ini'){
            this.scene.start('menu');
        } else if(opcion === 'otro'){
           //this.scene.start(this.scene.key);
           this.scene.restart()
        }else{
            console.log("A dónde voy?");
        }
        
    }
}

class S1D3 extends Phaser.Scene{ //¿Qué número es?
    constructor(){
        super({key:'S1D3'});
        this.resp;
        this.N;
    }
    preload(){
        this.load.audio('correct', './asset/sounds/correct.mp3');
        this.load.audio('wrong', './asset/sounds/wrong.mp3');
        this.load.image('logo','./asset/img/logo.jpeg');
        this.load.image('1','./asset/img/1.png');
        this.load.image('10','./asset/img/10.png');
    }
    create(){
        this.add.image(205,82,'logo');
        
        this.graph = this.add.graphics();
        this.graph.fillStyle(0xF1C40F);
        
        this.graph.fillRect(1600,50,300,90);
        this.add.text(1750, 50, 'INICIO', { color: 'black', fontFamily: 'Arial', fontSize: '70px '}).setOrigin(0.5,0);
        const ini = this.add.zone(1600, 50, 300, 90);
	ini.setOrigin(0);
	ini.setInteractive();
	ini.once('pointerdown', () => this.opcionPulsada('ini'));
	this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(ini);
        
        c = this.sound.add('correct',{loop:false});
        w = this.sound.add('wrong',{loop:false});
        
        this.N=new Array();
        //this.N.push(10);
        this.N.push(Math.floor(Math.random()*8)+2);
        this.N.push(Math.floor(Math.random()*(this.N[0]-2))+11-this.N[0]);
        this.resp=this.N[0]+this.N[1];
        console.log(this.N[0]+" + "+this.N[1]+" = "+this.resp);
        
        this.unos = new Array();
        
        this.graph.lineStyle(5, 0xff0000);
        this.r =400;
        this.x=[995-70*this.N[0],995-70*this.N[1] ];
        for(var i=0;i<10;i++){
            this.graph.fillRect(260+70*i,250,70,70);
            this.graph.strokeRect(260+70*i,250,70,70);
        }
        //this.graph.fillRect(Math.min(this.x[0],this.x[1])-50,250,990-Math.min(this.x[0],this.x[1]),200);
                
        for(var j=0;j<2;j++){
            for(var i=0;i<this.N[j];i++){
                this.unos.push(this.add.image(this.x[j]+70*i ,285+j*100,'1'));
                this.unos[this.unos.length-1].setInteractive();
                this.input.setDraggable(this.unos[this.unos.length-1]);
                this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
                    gameObject.x = dragX;
                    gameObject.y = dragY;
                });
            }
        }
        
        this.add.text(1100, 300-35, this.N[0], { color: 'black', fontFamily: 'Arial', fontSize: '70px '}).setOrigin(0.5,0);
        this.add.text(1100, 400-35, this.N[1], { color: 'black', fontFamily: 'Arial', fontSize: '70px '}).setOrigin(0.5,0);
        this.add.text(1000, 350-35, "+", { color: 'black', fontFamily: 'Arial', fontSize: '70px '}).setOrigin(0.5,0);
        
        this.graph.lineStyle(5, 0x000000, 1);
        this.graph.lineBetween(1000, 450, 1200, 450);
        
        
        var respuesta = document.createElement('input');
        respuesta.setAttribute('type'  ,'number');
        respuesta.setAttribute('id','respuesta');
        respuesta.setAttribute('placeholder','Respuesta');
        respuesta.setAttribute('autofocus','autofocus');
        respuesta.setAttribute('max','9');
        respuesta.setAttribute('min','0');
        this.res = this.add.dom(1100, 500, respuesta);
        
        console.log("escena");
        console.log(this.res);
        
        
        var boton = document.createElement('button');
        boton.setAttribute('type','button');
        this.element = this.add.dom(1600, 540, boton,'','Corregir');
        this.element.addListener('click');
        this.element.on('click',() => this.corregir());
        
        this.input.keyboard.on('keydown-ENTER',() => this.corregir());
        
        this.lienzo = this.add.graphics();
        this.lienzo.fillStyle(0xff0000);
        this.lienzo.setAlpha(a);
        this.lienzo.fillRect(0,0,1920,1080);
        
        this.lienzo2 = this.add.graphics();
        this.lienzo2.fillStyle(0x00ff00);
        this.lienzo2.setAlpha(a);
        this.lienzo2.fillRect(0,0,1920,1080);
        
        this.lienzo2.clear();
        b=0;
        this.lienzo3 = this.add.graphics();
    }
    
    corregir(){
        var r = document.getElementById('respuesta').value;
        console.log(r);
        console.log(this.resp);
        if(r===this.resp.toString()){
            console.log("Correcto");
            b=0.5;
            c.play();
            this.element.setVisible(false);
            this.lienzo3 = this.add.graphics();
                this.lienzo3.fillStyle(0x03A9F4);
                this.lienzo3.fillRect(1300,50,300,90);
                this.opc= this.add.text(1450, 95, '¿OTRO?', { color: 'black', fontFamily: 'Arial', fontSize: '50px '}).setOrigin(0.5,0.5);
                this.input.keyboard.off('keydown-ENTER');
                this.input.keyboard.on('keydown-ENTER',() => this.opcionPulsada('otro'));
                this.res.destroy();
                
                const otro = this.add.zone(1300, 50, 300,100);
                    otro.setOrigin(0);
                    otro.setInteractive();
                    otro.on('pointerdown', () => this.opcionPulsada('otro'));
            rc=1;
        }else{
            console.log("Incorrecto");
            a=0.5;
            w.play();
            this.cameras.main.shake(200,0.01);
        }
        
        
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
        rc=0;
        if(opcion === 'ini'){
            this.scene.start('menu');
        } else if(opcion === 'otro'){
           //this.scene.start(this.scene.key);
           this.scene.restart()
        }else{
            console.log("A dónde voy?");
        }
        
    }
}

class S1D4 extends Phaser.Scene{ //¿Qué número es?
    constructor(){
        super({key:'S1D4'});
        this.resp;
        this.N;
    }
    preload(){
        this.load.audio('correct', './asset/sounds/correct.mp3');
        this.load.audio('wrong', './asset/sounds/wrong.mp3');
        this.load.image('logo','./asset/img/logo.jpeg');
        this.load.image('1','./asset/img/1.png');
        this.load.image('10','./asset/img/10.png');
    }
    create(){
        this.add.image(205,82,'logo');
        
        this.graph = this.add.graphics();
        this.graph.fillStyle(0xF1C40F);
        
        this.graph.fillRect(1600,50,300,90);
        this.add.text(1750, 50, 'INICIO', { color: 'black', fontFamily: 'Arial', fontSize: '70px '}).setOrigin(0.5,0);
        const ini = this.add.zone(1600, 50, 300, 90);
	ini.setOrigin(0);
	ini.setInteractive();
	ini.once('pointerdown', () => this.opcionPulsada('ini'));
	this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(ini);
        
        c = this.sound.add('correct',{loop:false});
        w = this.sound.add('wrong',{loop:false});
        
        this.N=new Array();
        this.N.push(Math.floor(Math.random()*8)+2);
        this.N.push(Math.floor(Math.random()*(this.N[0]-2))+11-this.N[0]);
        this.resp=this.N[0]+this.N[1];
        console.log(this.N[0]+" + "+this.N[1]+" = "+this.resp);
        
        
        /*
        this.unos = new Array();
        
        this.r =400;
        this.x=[960-70*this.N[0],960-70*this.N[1] ];
        this.graph.fillRect(Math.min(this.x[0],this.x[1])-50,250,990-Math.min(this.x[0],this.x[1]),200);
                
        for(var j=0;j<2;j++){
            for(var i=0;i<this.N[j];i++){
                this.unos.push(this.add.image(this.x[j]+70*i ,300+j*100,'1'));
                this.unos[this.unos.length-1].setInteractive();
                this.input.setDraggable(this.unos[this.unos.length-1]);
                this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
                    gameObject.x = dragX;
                    gameObject.y = dragY;
                });
            }
        }
        */
        this.add.text(1100, 300-35, this.N[0], { color: 'black', fontFamily: 'Arial', fontSize: '70px '}).setOrigin(0.5,0);
        this.add.text(1100, 400-35, this.N[1], { color: 'black', fontFamily: 'Arial', fontSize: '70px '}).setOrigin(0.5,0);
        this.add.text(1000, 350-35, "+", { color: 'black', fontFamily: 'Arial', fontSize: '70px '}).setOrigin(0.5,0);
        
        this.graph.lineStyle(5, 0x000000, 1);
        this.graph.lineBetween(1000, 450, 1200, 450);
        
        
        var respuesta = document.createElement('input');
        respuesta.setAttribute('type'  ,'number');
        respuesta.setAttribute('id','respuesta');
        respuesta.setAttribute('placeholder','Respuesta');
        respuesta.setAttribute('autofocus','autofocus');
        respuesta.setAttribute('max','9');
        respuesta.setAttribute('min','0');
        this.res = this.add.dom(1100, 500, respuesta);
        
        console.log("escena");
        console.log(this.res);
        
        
        var boton = document.createElement('button');
        boton.setAttribute('type','button');
        this.element = this.add.dom(1600, 540, boton,'','Corregir');
        this.element.addListener('click');
        this.element.on('click',() => this.corregir());
        
        this.input.keyboard.on('keydown-ENTER',() => this.corregir());
        
        this.lienzo = this.add.graphics();
        this.lienzo.fillStyle(0xff0000);
        this.lienzo.setAlpha(a);
        this.lienzo.fillRect(0,0,1920,1080);
        
        this.lienzo2 = this.add.graphics();
        this.lienzo2.fillStyle(0x00ff00);
        this.lienzo2.setAlpha(a);
        this.lienzo2.fillRect(0,0,1920,1080);
        
        this.lienzo2.clear();
        b=0;
        this.lienzo3 = this.add.graphics();
    }
    
    corregir(){
        var r = document.getElementById('respuesta').value;
        console.log(r);
        console.log(this.resp);
        if(r===this.resp.toString()){
            console.log("Correcto");
            b=0.5;
            c.play();
            this.element.setVisible(false);
            this.lienzo3 = this.add.graphics();
                this.lienzo3.fillStyle(0x03A9F4);
                this.lienzo3.fillRect(1300,50,300,90);
                this.opc= this.add.text(1450, 95, '¿OTRO?', { color: 'black', fontFamily: 'Arial', fontSize: '50px '}).setOrigin(0.5,0.5);
                this.input.keyboard.off('keydown-ENTER');
                this.input.keyboard.on('keydown-ENTER',() => this.opcionPulsada('otro'));
                this.res.destroy();
                
                const otro = this.add.zone(1300, 50, 300,100);
                    otro.setOrigin(0);
                    otro.setInteractive();
                    otro.on('pointerdown', () => this.opcionPulsada('otro'));
            rc=1;
        }else{
            console.log("Incorrecto");
            a=0.5;
            w.play();
            this.cameras.main.shake(200,0.01);
        }
        
        
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
        rc=0;
        if(opcion === 'ini'){
            this.scene.start('menu');
        } else if(opcion === 'otro'){
           //this.scene.start(this.scene.key);
           this.scene.restart()
        }else{
            console.log("A dónde voy?");
        }
        
    }
}

class R1 extends Phaser.Scene{ //0-9 Quitar 0-9 
    constructor(){
        super({key:'R1'});
        this.resp;
    }
    preload(){
        this.load.audio('correct', './asset/sounds/correct.mp3');
        this.load.audio('wrong', './asset/sounds/wrong.mp3');
        this.load.image('logo','./asset/img/logo.jpeg');
        this.load.image('p','./asset/img/1.png');
    }
    create(){
        this.add.image(205,82,'logo');
        
        this.graph = this.add.graphics();
        this.graph.fillStyle(0xF1C40F);
        
        this.graph.fillRect(1600,50,300,90);
        this.add.text(1750, 50, 'INICIO', { color: 'black', fontFamily: 'Arial', fontSize: '70px '}).setOrigin(0.5,0);
        const ini = this.add.zone(1600, 50, 300, 90);
	ini.setOrigin(0);
	ini.setInteractive();
	ini.once('pointerdown', () => this.opcionPulsada('ini'));
	this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(ini);
        
        c = this.sound.add('correct',{loop:false});
        w = this.sound.add('wrong',{loop:false});
        
        this.N = new Array();
        this.N.push(Math.floor(Math.random()*8+2));
        this.N.push(Math.floor(Math.random()*this.N[0]+1));
                
        
        
        //console.log(this.N);
        this.unos = new Array();
        this.r =400;
        this.x=960-70*this.N[0];
        
        this.graph.fillRect(this.x-60,400-60,70*this.N[0]+60,130);
        
        for(var i=0;i<this.N[0];i++){
            var cuad;
            this.unos.push(this.add.image(this.x+70*i ,400,'p'));
            cuad =this.unos[i];
            cuad.setInteractive();
            cuad.setData({name: i, tocado:0});
            
            this.input.setDraggable(this.unos[i]);
            this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
                gameObject.x = dragX;
                gameObject.y = dragY;
            });
            
        }
        
        this.add.text(1100, 400-35, this.N[0], { color: 'black', fontFamily: 'Arial', fontSize: '70px '}).setOrigin(0.5,0);
        this.add.text(1100, 500-35, this.N[1], { color: 'black', fontFamily: 'Arial', fontSize: '70px '}).setOrigin(0.5,0);
        this.add.text(1000, 450-35, "-", { color: 'black', fontFamily: 'Arial', fontSize: '70px '}).setOrigin(0.5,0);
        
        this.graph.lineStyle(5, 0x000000, 1);
        this.graph.lineBetween(1000, 550, 1200, 550);
        
        
        var respuesta = document.createElement('input');
        respuesta.setAttribute('type'  ,'number');
        respuesta.setAttribute('id','respuesta');
        respuesta.setAttribute('placeholder','Respuesta');
        respuesta.setAttribute('max','9');
        respuesta.setAttribute('min','0');
        respuesta.setAttribute('autofocus','autofocus');
        this.res = this.add.dom(1100, 600, respuesta);
        
        
        this.input.on('gameobjectup', function (pointer, gameObject)
        {
            gameObject.emit('clicked', gameObject);
        }, this);
        
        
        this.resp =this.N[0]-this.N[1];
        
        
        var boton = document.createElement('button');
        boton.setAttribute('type','button');
        this.element = this.add.dom(1600, 540, boton,'','Corregir');
        this.element.addListener('click');
        this.element.on('click',() => this.corregir());
        
        this.input.keyboard.on('keydown-ENTER',() => this.corregir());
        
        this.lienzo = this.add.graphics();
        this.lienzo.fillStyle(0xff0000);
        this.lienzo.setAlpha(a);
        this.lienzo.fillRect(0,0,1920,1080);
        
        this.lienzo2 = this.add.graphics();
        this.lienzo2.fillStyle(0x00ff00);
        this.lienzo2.setAlpha(a);
        this.lienzo2.fillRect(0,0,1920,1080);
        
        this.lienzo2.clear();
        b=0;
        this.lienzo3 = this.add.graphics();
    }
    
    corregir(){
        
        var r = document.getElementById('respuesta').value;
        if(r===this.resp.toString()){
            
            b=0.5;
            c.play();
            this.element.setVisible(false);
            this.lienzo3 = this.add.graphics();
                this.lienzo3.fillStyle(0x03A9F4);
                this.lienzo3.fillRect(1300,50,300,90);
                this.opc= this.add.text(1450, 95, '¿OTRO?', { color: 'black', fontFamily: 'Arial', fontSize: '50px '}).setOrigin(0.5,0.5);
                
                this.input.keyboard.off('keydown-ENTER');
                this.input.keyboard.on('keydown-ENTER',() => this.opcionPulsada('otro'));
                this.res.destroy();
                const otro = this.add.zone(1300, 50, 300,100);
                    otro.setOrigin(0);
                    otro.setInteractive();
                    otro.on('pointerdown', () => this.opcionPulsada('otro'));
            rc=1;
            
        }else{
            
            a=0.5;
            w.play();
            this.cameras.main.shake(200,0.01);
        }
        
        
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
        rc=0;
        if(opcion === 'ini'){
            this.scene.start('menu');
        } else if(opcion === 'otro'){
           this.scene.start(this.scene.key);
        }else{
            console.log("A dónde voy?");
        }
        
    }
}

class R2 extends Phaser.Scene{ //0-9 Quitar 0-9 
    constructor(){
        super({key:'R2'});
        this.resp;
    }
    preload(){
        this.load.audio('correct', './asset/sounds/correct.mp3');
        this.load.audio('wrong', './asset/sounds/wrong.mp3');
        this.load.image('logo','./asset/img/logo.jpeg');
        this.load.image('p','./asset/img/1.png');
    }
    create(){
        this.add.image(205,82,'logo');
        
        this.graph = this.add.graphics();
        this.graph.fillStyle(0xF1C40F);
        
        this.graph.fillRect(1600,50,300,90);
        this.add.text(1750, 50, 'INICIO', { color: 'black', fontFamily: 'Arial', fontSize: '70px '}).setOrigin(0.5,0);
        const ini = this.add.zone(1600, 50, 300, 90);
	ini.setOrigin(0);
	ini.setInteractive();
	ini.once('pointerdown', () => this.opcionPulsada('ini'));
	this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(ini);
        
        c = this.sound.add('correct',{loop:false});
        w = this.sound.add('wrong',{loop:false});
        
        this.N = new Array();
        this.N.push(10);
        this.N.push(Math.floor(Math.random()*this.N[0]+1));
                
        
        
        //console.log(this.N);
        this.unos = new Array();
        this.r =400;
        this.x=960-70*this.N[0];
        
        this.graph.fillRect(this.x-60,400-60,70*this.N[0]+60,130);
        
        for(var i=0;i<this.N[0];i++){
            var cuad;
            this.unos.push(this.add.image(this.x+70*i ,400,'p'));
            cuad =this.unos[i];
            cuad.setInteractive();
            cuad.setData({name: i, tocado:0});
            
            this.input.setDraggable(this.unos[i]);
            this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
                gameObject.x = dragX;
                gameObject.y = dragY;
            });
            
        }
        
        this.add.text(1100, 400-35, this.N[0], { color: 'black', fontFamily: 'Arial', fontSize: '70px '}).setOrigin(0.5,0);
        this.add.text(1100, 500-35, this.N[1], { color: 'black', fontFamily: 'Arial', fontSize: '70px '}).setOrigin(0.5,0);
        this.add.text(1000, 450-35, "-", { color: 'black', fontFamily: 'Arial', fontSize: '70px '}).setOrigin(0.5,0);
        
        this.graph.lineStyle(5, 0x000000, 1);
        this.graph.lineBetween(1000, 550, 1200, 550);
        
        
        var respuesta = document.createElement('input');
        respuesta.setAttribute('type'  ,'number');
        respuesta.setAttribute('id','respuesta');
        respuesta.setAttribute('placeholder','Respuesta');
        respuesta.setAttribute('max','9');
        respuesta.setAttribute('min','0');
        respuesta.setAttribute('autofocus','autofocus');
        this.res = this.add.dom(1100, 600, respuesta);
        
        
        this.input.on('gameobjectup', function (pointer, gameObject)
        {
            gameObject.emit('clicked', gameObject);
        }, this);
        
        
        this.resp =this.N[0]-this.N[1];
        
        
        var boton = document.createElement('button');
        boton.setAttribute('type','button');
        this.element = this.add.dom(1600, 540, boton,'','Corregir');
        this.element.addListener('click');
        this.element.on('click',() => this.corregir());
        
        this.input.keyboard.on('keydown-ENTER',() => this.corregir());
        
        this.lienzo = this.add.graphics();
        this.lienzo.fillStyle(0xff0000);
        this.lienzo.setAlpha(a);
        this.lienzo.fillRect(0,0,1920,1080);
        
        this.lienzo2 = this.add.graphics();
        this.lienzo2.fillStyle(0x00ff00);
        this.lienzo2.setAlpha(a);
        this.lienzo2.fillRect(0,0,1920,1080);
        
        this.lienzo2.clear();
        b=0;
        this.lienzo3 = this.add.graphics();
    }
    
    corregir(){
        
        var r = document.getElementById('respuesta').value;
        if(r===this.resp.toString()){
            
            b=0.5;
            c.play();
            this.element.setVisible(false);
            this.lienzo3 = this.add.graphics();
                this.lienzo3.fillStyle(0x03A9F4);
                this.lienzo3.fillRect(1300,50,300,90);
                this.opc= this.add.text(1450, 95, '¿OTRO?', { color: 'black', fontFamily: 'Arial', fontSize: '50px '}).setOrigin(0.5,0.5);
                
                this.input.keyboard.off('keydown-ENTER');
                this.input.keyboard.on('keydown-ENTER',() => this.opcionPulsada('otro'));
                this.res.destroy();
                const otro = this.add.zone(1300, 50, 300,100);
                    otro.setOrigin(0);
                    otro.setInteractive();
                    otro.on('pointerdown', () => this.opcionPulsada('otro'));
            rc=1;
            
        }else{
            
            a=0.5;
            w.play();
            this.cameras.main.shake(200,0.01);
        }
        
        
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
        rc=0;
        if(opcion === 'ini'){
            this.scene.start('menu');
        } else if(opcion === 'otro'){
           this.scene.start(this.scene.key);
        }else{
            console.log("A dónde voy?");
        }
        
    }
}

class R3 extends Phaser.Scene{ //0-9 Quitar 0-9 
    constructor(){
        super({key:'R3'});
        this.resp;
    }
    preload(){
        this.load.audio('correct', './asset/sounds/correct.mp3');
        this.load.audio('wrong', './asset/sounds/wrong.mp3');
        this.load.image('logo','./asset/img/logo.jpeg');
        this.load.image('p','./asset/img/1.png');
    }
    create(){
        this.add.image(205,82,'logo');
        
        this.graph = this.add.graphics();
        this.graph.fillStyle(0xF1C40F);
        
        this.graph.fillRect(1600,50,300,90);
        this.add.text(1750, 50, 'INICIO', { color: 'black', fontFamily: 'Arial', fontSize: '70px '}).setOrigin(0.5,0);
        const ini = this.add.zone(1600, 50, 300, 90);
	ini.setOrigin(0);
	ini.setInteractive();
	ini.once('pointerdown', () => this.opcionPulsada('ini'));
	this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(ini);
        
        c = this.sound.add('correct',{loop:false});
        w = this.sound.add('wrong',{loop:false});
        
        this.N = new Array();
        this.N.push(Math.floor(Math.random()*7+12));
        this.N.push(Math.floor(Math.random()*(19-this.N[0])+this.N[0]-9));
                
        
        
        //console.log(this.N);
        this.unos = new Array();
        this.r =400;
        this.x=960-70*this.N[0];
        
        
        
        for(var i=0;i<this.N[0];i++){
            this.graph.fillRect(260+70*(i%10),250+(70*(i/10>>0)),70,70);
            this.graph.strokeRect(260+70*(i%10),250+70*(i/10>>0),70,70);
        }
        
        for(var i=0;i<this.N[0];i++){
            var cuad;
            this.unos.push(this.add.image(295+70*(i%10) ,285+70*(i/10>>0),'p'));
            cuad =this.unos[i];
            cuad.setInteractive();
            cuad.setData({name: i, tocado:0});
            
            this.input.setDraggable(this.unos[i]);
            this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
                gameObject.x = dragX;
                gameObject.y = dragY;
            });
            
        }
        
        this.add.text(1100, 400-35, this.N[0], { color: 'black', fontFamily: 'Arial', fontSize: '70px '}).setOrigin(0.5,0);
        this.add.text(1100, 500-35, this.N[1], { color: 'black', fontFamily: 'Arial', fontSize: '70px '}).setOrigin(0.5,0);
        this.add.text(1000, 450-35, "-", { color: 'black', fontFamily: 'Arial', fontSize: '70px '}).setOrigin(0.5,0);
        
        this.graph.lineStyle(5, 0x000000, 1);
        this.graph.lineBetween(1000, 550, 1200, 550);
        
        
        var respuesta = document.createElement('input');
        respuesta.setAttribute('type'  ,'number');
        respuesta.setAttribute('id','respuesta');
        respuesta.setAttribute('placeholder','Respuesta');
        respuesta.setAttribute('max','9');
        respuesta.setAttribute('min','0');
        respuesta.setAttribute('autofocus','autofocus');
        this.res = this.add.dom(1100, 600, respuesta);
        
        
        this.input.on('gameobjectup', function (pointer, gameObject)
        {
            gameObject.emit('clicked', gameObject);
        }, this);
        
        
        this.resp =this.N[0]-this.N[1];
        
        
        var boton = document.createElement('button');
        boton.setAttribute('type','button');
        this.element = this.add.dom(1600, 540, boton,'','Corregir');
        this.element.addListener('click');
        this.element.on('click',() => this.corregir());
        
        this.input.keyboard.on('keydown-ENTER',() => this.corregir());
        
        this.lienzo = this.add.graphics();
        this.lienzo.fillStyle(0xff0000);
        this.lienzo.setAlpha(a);
        this.lienzo.fillRect(0,0,1920,1080);
        
        this.lienzo2 = this.add.graphics();
        this.lienzo2.fillStyle(0x00ff00);
        this.lienzo2.setAlpha(a);
        this.lienzo2.fillRect(0,0,1920,1080);
        
        this.lienzo2.clear();
        b=0;
        this.lienzo3 = this.add.graphics();
    }
    
    corregir(){
        
        var r = document.getElementById('respuesta').value;
        if(r===this.resp.toString()){
            
            b=0.5;
            c.play();
            this.element.setVisible(false);
            this.lienzo3 = this.add.graphics();
                this.lienzo3.fillStyle(0x03A9F4);
                this.lienzo3.fillRect(1300,50,300,90);
                this.opc= this.add.text(1450, 95, '¿OTRO?', { color: 'black', fontFamily: 'Arial', fontSize: '50px '}).setOrigin(0.5,0.5);
                
                this.input.keyboard.off('keydown-ENTER');
                this.input.keyboard.on('keydown-ENTER',() => this.opcionPulsada('otro'));
                this.res.destroy();
                const otro = this.add.zone(1300, 50, 300,100);
                    otro.setOrigin(0);
                    otro.setInteractive();
                    otro.on('pointerdown', () => this.opcionPulsada('otro'));
            rc=1;
            
        }else{
            
            a=0.5;
            w.play();
            this.cameras.main.shake(200,0.01);
        }
        
        
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
        rc=0;
        if(opcion === 'ini'){
            this.scene.start('menu');
        } else if(opcion === 'otro'){
           this.scene.start(this.scene.key);
        }else{
            console.log("A dónde voy?");
        }
        
    }
}

class R4 extends Phaser.Scene{ //0-9 Quitar 0-9 
    constructor(){
        super({key:'R4'});
        this.resp;
    }
    preload(){
        this.load.audio('correct', './asset/sounds/correct.mp3');
        this.load.audio('wrong', './asset/sounds/wrong.mp3');
        this.load.image('logo','./asset/img/logo.jpeg');
        this.load.image('p','./asset/img/1.png');
    }
    create(){
        this.add.image(205,82,'logo');
        
        this.graph = this.add.graphics();
        this.graph.fillStyle(0xF1C40F);
        
        this.graph.fillRect(1600,50,300,90);
        this.add.text(1750, 50, 'INICIO', { color: 'black', fontFamily: 'Arial', fontSize: '70px '}).setOrigin(0.5,0);
        const ini = this.add.zone(1600, 50, 300, 90);
	ini.setOrigin(0);
	ini.setInteractive();
	ini.once('pointerdown', () => this.opcionPulsada('ini'));
	this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(ini);
        
        c = this.sound.add('correct',{loop:false});
        w = this.sound.add('wrong',{loop:false});
        
        this.N = new Array();
        this.N.push(Math.floor(Math.random()*7+12));
        this.N.push(Math.floor(Math.random()*(19-this.N[0])+this.N[0]-9));
                
        
        
        //console.log(this.N);
        this.unos = new Array();
        this.r =400;
        this.x=960-70*this.N[0];
        
        
        
        
        
        this.add.text(1100, 400-35, this.N[0], { color: 'black', fontFamily: 'Arial', fontSize: '70px '}).setOrigin(0.5,0);
        this.add.text(1100, 500-35, this.N[1], { color: 'black', fontFamily: 'Arial', fontSize: '70px '}).setOrigin(0.5,0);
        this.add.text(1000, 450-35, "-", { color: 'black', fontFamily: 'Arial', fontSize: '70px '}).setOrigin(0.5,0);
        
        this.graph.lineStyle(5, 0x000000, 1);
        this.graph.lineBetween(1000, 550, 1200, 550);
        
        
        var respuesta = document.createElement('input');
        respuesta.setAttribute('type'  ,'number');
        respuesta.setAttribute('id','respuesta');
        respuesta.setAttribute('placeholder','Respuesta');
        respuesta.setAttribute('max','9');
        respuesta.setAttribute('min','0');
        respuesta.setAttribute('autofocus','autofocus');
        this.res = this.add.dom(1100, 600, respuesta);
        
        
        this.input.on('gameobjectup', function (pointer, gameObject)
        {
            gameObject.emit('clicked', gameObject);
        }, this);
        
        
        this.resp =this.N[0]-this.N[1];
        
        
        var boton = document.createElement('button');
        boton.setAttribute('type','button');
        this.element = this.add.dom(1600, 540, boton,'','Corregir');
        this.element.addListener('click');
        this.element.on('click',() => this.corregir());
        
        this.input.keyboard.on('keydown-ENTER',() => this.corregir());
        
        this.lienzo = this.add.graphics();
        this.lienzo.fillStyle(0xff0000);
        this.lienzo.setAlpha(a);
        this.lienzo.fillRect(0,0,1920,1080);
        
        this.lienzo2 = this.add.graphics();
        this.lienzo2.fillStyle(0x00ff00);
        this.lienzo2.setAlpha(a);
        this.lienzo2.fillRect(0,0,1920,1080);
        
        this.lienzo2.clear();
        b=0;
        this.lienzo3 = this.add.graphics();
    }
    
    corregir(){
        
        var r = document.getElementById('respuesta').value;
        if(r===this.resp.toString()){
            
            b=0.5;
            c.play();
            this.element.setVisible(false);
            this.lienzo3 = this.add.graphics();
                this.lienzo3.fillStyle(0x03A9F4);
                this.lienzo3.fillRect(1300,50,300,90);
                this.opc= this.add.text(1450, 95, '¿OTRO?', { color: 'black', fontFamily: 'Arial', fontSize: '50px '}).setOrigin(0.5,0.5);
                
                this.input.keyboard.off('keydown-ENTER');
                this.input.keyboard.on('keydown-ENTER',() => this.opcionPulsada('otro'));
                this.res.destroy();
                const otro = this.add.zone(1300, 50, 300,100);
                    otro.setOrigin(0);
                    otro.setInteractive();
                    otro.on('pointerdown', () => this.opcionPulsada('otro'));
            rc=1;
            
        }else{
            
            a=0.5;
            w.play();
            this.cameras.main.shake(200,0.01);
        }
        
        
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
        rc=0;
        if(opcion === 'ini'){
            this.scene.start('menu');
        } else if(opcion === 'otro'){
           this.scene.start(this.scene.key);
        }else{
            console.log("A dónde voy?");
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
  scene: [menu,S1D,S1D2,S1D4,S1D3,R1,R2, R3,R4],
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

