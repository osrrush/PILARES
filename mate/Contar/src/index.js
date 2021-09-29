/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
const titulo = 'Contar y sumar.'; //Titulo del juego
const menulabel = [['¿Dónde hay más?(1)','¿Dónde hay más?(2)','¿Dónde hay más?(3)'],
    ['Contar 1-10','contar 11-20'],
    ['¿Qué número es?'],
    ['Sumar 1 dígito(D)', 'Sumar 1D (2)'],
    ['Sumar 2D', 'Sumar 2D (2)'],
    ['Siguiente y Anterior']]; //Opciones menú
/*
const menulabel = [['Contar 1-10','contar 11-20'],
    ['¿Qué número es?'],
    ['Sumar 1 dígito(D)', 'Sumar 2 D','Sumar 3 D'], 
    ['Restar 1 D', 'Restar 2 D','Restar 3 D'], 
    ['multiplicar 1 D', 'multiplicar 2D x 1D', 'multiplicar 2D x 2D'],
    ['Dividir 1D','Dividir 2D parte 1','Dividir 2D parte 2']]; //Opciones menú
 */

//const escenas = [Contar, ENG,s1,s2,s3,r1,r2,r3,m1,m2,m3,d1,d2,d3];
const LargoM = 600; //Largo de boton en menú
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
        this.load.image('logo','./assets/img/logo.jpeg');
    }
    create(){
        this.add.image(205,82,'logo');
        var h1 = this.add.dom(960, 150, 'h1', null, titulo);
        
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
                lienzo.fillRect(x+(LargoM+20)*j,346+i*100,LargoM,90);
                
                if(tam <= 1100){
                    this.add.text(x+(LargoM+20)*j+LargoM/2, 346+i*100+45, menulabel[i][j], { color: 'black', fontFamily: 'Arial', fontSize: '80px '}).setOrigin(0.5,0.5);
                } else {
                    var f =Math.floor(80*1100/tam);
                    //console.log("f = "+f);
                    this.add.text(x+(LargoM+20)*j+LargoM/2, 346+i*100+45, menulabel[i][j], { color: 'black', fontFamily: 'Arial', fontSize: f+'px '}).setOrigin(0.5,0.5);
                }
                opc.push(this.add.zone(x+(LargoM+20)*j,346+i*100,LargoM,90));
                
                opc[opc.length-1].setOrigin(0);
                opc[opc.length-1].setInteractive();
                opc[opc.length-1].name = i+"";
                this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(opc[opc.length-1]);
            }
        
            //
            //console.log(opc[i]);
        }
        
        opc[3].once('pointerdown', () => this.opcionPulsada(0));
        opc[4].once('pointerdown', () => this.opcionPulsada(1));
        opc[5].once('pointerdown', () => this.opcionPulsada(2));
        opc[6].once('pointerdown', () => this.opcionPulsada(3));
        opc[7].once('pointerdown', () => this.opcionPulsada(4));
        opc[8].once('pointerdown', () => this.opcionPulsada(5));
        opc[9].once('pointerdown', () => this.opcionPulsada(6));
        opc[10].once('pointerdown', () => this.opcionPulsada(7));
        opc[0].once('pointerdown', () => this.opcionPulsada(8));
        opc[1].once('pointerdown', () => this.opcionPulsada(9));
        opc[2].once('pointerdown', () => this.opcionPulsada(10));
    }
    opcionPulsada(opcion) {
        //console.log("opcionPulsada("+opcion+")");
	if (opcion === 0) {
            this.scene.start('Contar');
	} else if (opcion === 1) {
            this.scene.start('GD10');
	} else if (opcion === 2) {
            this.scene.start('QNE');
	} else if (opcion === 3) {
            this.scene.start('S1D');
	} else if (opcion === 4) {
            this.scene.start('S1D2');
	} else if (opcion === 5) {
            this.scene.start('S2D');
	} else if (opcion === 6) {
            this.scene.start('S2D2');
	} else if (opcion === 7) {
            this.scene.start('SA');
	} else if (opcion === 8) {
            this.scene.start('DHM');
	} else if (opcion === 9) {
            this.scene.start('DHM2');
	} else if (opcion === 10) {
            this.scene.start('DHM3');
	} else {
            console.log(opcion);
        }
    }
}

class Contar extends Phaser.Scene{ //Contar hasta 10
    constructor(){
        super({key:'Contar'});
        this.resp;
    }
    preload(){
        this.load.audio('correct', './assets/sounds/correct.mp3');
        this.load.audio('wrong', './assets/sounds/wrong.mp3');
        this.load.image('logo','./assets/img/logo.jpeg');
        this.load.image('1','./assets/img/1.png');
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
        
        this.unos = new Array();
        this.r =400;
        for(var i=0;i<10;i++){
            this.unos.push(this.add.image(960 + this.r*Math.cos(2*Math.PI/10*i),540+ this.r*Math.sin(2*Math.PI/10*i),'1'));
            this.unos[i].setInteractive();
            this.input.setDraggable(this.unos[i]);
            this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
                gameObject.x = dragX;
                gameObject.y = dragY;
            });
        }
        this.graph.fillStyle(0x000000);
        this.graph.fillRect(960-this.r/2,540-this.r/2,this.r,this.r);
        this.graph.fillStyle(Colores[1]);
        this.graph.fillRect(960-this.r/2+5,540-this.r/2+5,this.r-10,this.r-10);
        
        this.resp =Math.floor(Math.random()*10);
        this.add.text(960, 540, this.resp, { color: 'black', fontFamily: 'Arial', fontSize: '100px '}).setOrigin(0.5,0.5);
        
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
        var dentro = 0;
        for(var i=0;i<10;i++){
            if(this.unos[i].x>960-this.r/2 && this.unos[i].x<960+this.r/2){
                if(this.unos[i].y>540-this.r/2 && this.unos[i].y<540+this.r/2){
                    dentro++;
                }
            }
        }
        if(dentro === this.resp){
            console.log("Correcto");
            b=0.5;
            c.play();
            this.lienzo3 = this.add.graphics();
            this.lienzo3.fillStyle(0x03A9F4);
            this.lienzo3.fillRect(1300,50,300,90);
            this.opc= this.add.text(1450, 95, '¿OTRO?', { color: 'black', fontFamily: 'Arial', fontSize: '50px '}).setOrigin(0.5,0.5);

            const otro = this.add.zone(1300, 50, 300,100);
            otro.setOrigin(0);
            otro.setInteractive();
            otro.on('pointerdown', () => this.opcionPulsada('otro'));
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
           this.scene.start(this.scene.key);
        }else{
            console.log("A dónde voy?");
        }
        
    }
}
class GD10 extends Phaser.Scene{ //Grupos de 10
    constructor(){
        super({key:'GD10'});
        this.resp;
    }
    preload(){
        this.load.audio('correct', './assets/sounds/correct.mp3');
        this.load.audio('wrong', './assets/sounds/wrong.mp3');
        this.load.image('logo','./assets/img/logo.jpeg');
        this.load.image('1','./assets/img/1.png');
        this.load.image('10','./assets/img/10.png');
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
        this.resp = Math.floor(Math.random()*10+1)+10;
        
        this.unos = new Array();
        this.diez = new Array();
        this.r =400;
        for(var i=0;i<this.resp;i++){
            this.unos.push(this.add.image(960 + this.r*Math.cos(2*Math.PI/this.resp*i),540+ this.r*Math.sin(2*Math.PI/this.resp*i),'1'));
            this.unos[i].setInteractive();
            this.input.setDraggable(this.unos[i]);
            this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
                gameObject.x = dragX;
                gameObject.y = dragY;
            });
        }
        this.graph.fillStyle(0x000000);
        this.c1 = this.graph.fillRect(960-this.r/2,540-this.r/2,this.r,this.r);
        this.graph.fillStyle(Colores[1]);
        this.c2 = this.graph.fillRect(960-this.r/2+5,540-this.r/2+5,this.r-10,this.r-10);
        
        
        this.t=this.add.text(960, 540, '  Unir\ngrupos\n de 10', { color: 'black', fontFamily: 'Arial', fontSize: '100px '}).setOrigin(0.5,0.5);
        
        var boton = document.createElement('button');
        boton.setAttribute('type','button');
        this.element = this.add.dom(1600, 540, boton,'','Juntar');
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
        var dentro = 0;
        var aux;
        var unosd = new Array();
        for(var i=0;i<this.unos.length;i++){
            if(this.unos[i].x>960-this.r/2 && this.unos[i].x<960+this.r/2){
                if(this.unos[i].y>540-this.r/2 && this.unos[i].y<540+this.r/2){
                    dentro++;
                }
            }
        }
        if(dentro === 10){
            b=0.5;
            c.play();
            
            
            
             for(var i=0;i<this.unos.length;i++){
                if(this.unos[i].x>960-this.r/2 && this.unos[i].x<960+this.r/2){
                    if(this.unos[i].y>540-this.r/2 && this.unos[i].y<540+this.r/2){
                        aux = this.unos[i];
                        unosd.push(aux);
                        this.unos.splice(i,1);
                        i--;
                    }
                }
            }
            console.log("Unos que sobreviven");
            console.log(this.unos);
            console.log("Unos que eliminados");
            console.log(unosd);
            for(var i=9; i>=0;i--){
                unosd[i].destroy();
            }
            this.diez.push(this.add.image(960-this.r*1.5+100*this.diez.length ,540,'10'));
            this.diez[this.diez.length-1].setInteractive();
            this.input.setDraggable(this.diez[this.diez.length-1]);
            this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
                gameObject.x = dragX;
                gameObject.y = dragY;
            });
        }else{
            console.log("Incorrecto");
            a=0.5;
            w.play();
            this.cameras.main.shake(200,0.01);
        }
        if(this.unos.length<10){
            this.graph.clear();
            this.graph.fillStyle(0xF1C40F);
            this.graph.fillRect(1600,50,300,90);
            
            
            this.t.setVisible(false);
            this.element.setVisible(false);
            rc=1;
            this.vel =new Array();
            for(var i=0;i<this.unos.length;i++){
                this.vel.push([960-this.r-this.unos[i].x ,300+60*i-this.unos[i].y]);
            }
        }
    /*   
     *  this.lienzo3 = this.add.graphics();
            this.lienzo3.fillStyle(0x03A9F4);
            this.lienzo3.fillRect(1300,50,300,90);
            this.opc= this.add.text(1450, 95, '¿OTRO?', { color: 'black', fontFamily: 'Arial', fontSize: '50px '}).setOrigin(0.5,0.5);
        
     *   const otro = this.add.zone(1300, 50, 300,100);
            otro.setOrigin(0);
            otro.setInteractive();
            otro.on('pointerdown', () => this.opcionPulsada('otro'));
    */    
    }
    update(time,delta){
            if(rc === 1){
                console.log("rc = "+rc);
                for(var i=0;i<this.unos.length;i++){
                    this.unos[i].x+=this.vel[i][0]*delta/1000;
                    this.unos[i].y+=this.vel[i][1]*delta/1000;
                    if(this.unos[i].x <= 960-this.r){
                        this.vel[i][0]=0;
                        this.vel[i][1]=0;
                        rc=2;
                    }
                }
            }else if(rc === 2){
                console.log("rc = "+rc);
                this.add.text(960, 540, '= '+(this.diez.length*10+this.unos.length), { color: 'black', fontFamily: 'Arial', fontSize: '100px '}).setOrigin(0.5,0.5);
                rc++;
            }else if(rc === 3){
                console.log("rc = "+rc);
                this.lienzo3 = this.add.graphics();
                this.lienzo3.fillStyle(0x03A9F4);
                this.lienzo3.fillRect(1300,50,300,90);
                this.opc= this.add.text(1450, 95, '¿OTRO?', { color: 'black', fontFamily: 'Arial', fontSize: '50px '}).setOrigin(0.5,0.5);

                const otro = this.add.zone(1300, 50, 300,100);
                    otro.setOrigin(0);
                    otro.setInteractive();
                    otro.on('pointerdown', () => this.opcionPulsada('otro'));
                rc++;
            }else{
                console.log("rc = "+rc);
            }
        
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
class QNE extends Phaser.Scene{ //¿Qué número es?
    constructor(){
        super({key:'QNE'});
        this.resp;
    }
    preload(){
        this.load.audio('correct', './assets/sounds/correct.mp3');
        this.load.audio('wrong', './assets/sounds/wrong.mp3');
        this.load.image('logo','./assets/img/logo.jpeg');
        this.load.image('1','./assets/img/1.png');
        this.load.image('10','./assets/img/10.png');
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
        this.resp = Math.floor(Math.random()*100);
        
        this.unos = new Array();
        this.diez = new Array();
        this.r =400;
        this.x =960-70*this.resp/10;
        for(var i=0;i<this.resp%10;i++){
            this.unos.push(this.add.image(960+70 ,300+i*60,'1'));
            this.unos[i].setInteractive();
            this.input.setDraggable(this.unos[i]);
            this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
                gameObject.x = dragX;
                gameObject.y = dragY;
            });
        }
        for(var i=1;i<=this.resp/10;i++){
            this.diez.push(this.add.image(this.x+70*i,540,'10'));
            this.diez[i-1].setInteractive();
            this.input.setDraggable(this.diez[i-1]);
            this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
                gameObject.x = dragX;
                gameObject.y = dragY;
            });
        }
        
        var respuesta = document.createElement('input');
        respuesta.setAttribute('type'  ,'number');
        respuesta.setAttribute('id','respuesta');
        respuesta.setAttribute('placeholder','Respuesta');
        respuesta.setAttribute('max','99');
        respuesta.setAttribute('min','0');
        this.res = this.add.dom(1300, 540, respuesta);
        
        var boton = document.createElement('button');
        boton.setAttribute('type','button');
        this.element = this.add.dom(1600, 540, boton,'','Juntar');
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

                const otro = this.add.zone(1300, 50, 300,100);
                    otro.setOrigin(0);
                    otro.setInteractive();
                    otro.on('pointerdown', () => this.opcionPulsada('otro'));
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
           this.scene.start(this.scene.key);
        }else{
            console.log("A dónde voy?");
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
        this.load.audio('correct', './assets/sounds/correct.mp3');
        this.load.audio('wrong', './assets/sounds/wrong.mp3');
        this.load.image('logo','./assets/img/logo.jpeg');
        this.load.image('1','./assets/img/1.png');
        this.load.image('10','./assets/img/10.png');
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
        this.N.push(Math.floor(Math.random()*10));
        this.N.push(Math.floor(Math.random()*(10-this.N[0])));
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
        respuesta.setAttribute('max','9');
        respuesta.setAttribute('min','0');
        this.res = this.add.dom(1100, 500, respuesta);
        
        
        
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
           this.scene.start(this.scene.key);
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
        this.vel;
    }
    preload(){
        this.load.audio('correct', './assets/sounds/correct.mp3');
        this.load.audio('wrong', './assets/sounds/wrong.mp3');
        this.load.image('logo','./assets/img/logo.jpeg');
        this.load.image('1','./assets/img/1.png');
        this.load.image('10','./assets/img/10.png');
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
        this.N.push(Math.floor(Math.random()*10));
        this.N.push(Math.floor(Math.random()*5)+5);
        this.resp=this.N[0]+this.N[1];
        console.log(this.N[0]+" + "+this.N[1]+" = "+this.resp);
        
        this.unos = new Array();
        this.vel = new Array();
        
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
        for(var i=0;i<this.unos.length;i++){
            this.vel.push([750-this.unos[i].x+80*Math.floor(i/10),450-this.unos[i].y+60*(i%10)]);
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
        respuesta.setAttribute('max','19');
        respuesta.setAttribute('min','0');
        this.res = this.add.dom(1100, 500, respuesta);
        
        
        
        var boton = document.createElement('button');
        boton.setAttribute('type','button');
        this.element = this.add.dom(1600, 540, boton,'','Corregir');
        this.element.addListener('click');
        this.element.on('click',() => this.corregir());
        
        var boton = document.createElement('button');
        boton.setAttribute('type','button');
        this.elementA = this.add.dom(1600, 440, boton,'','Ayuda');
        this.elementA.addListener('click');
        this.elementA.on('click', function(){
            rc=1;
        });
        
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

                const otro = this.add.zone(1300, 50, 300,100);
                    otro.setOrigin(0);
                    otro.setInteractive();
                    otro.on('pointerdown', () => this.opcionPulsada('otro'));
            this.element.off('click');
            this.input.keyboard.off('keydown-ENTER');
            rc++;
            console.log(this.vel);
        }else{
            console.log("Incorrecto");
            a=0.5;
            w.play();
            this.cameras.main.shake(200,0.01);
        }
        
        
    }
    update(time,delta){
        if(rc === 1){
            this.elementA.off('click');
            for(var i=0;i<this.unos.length;i++){
                    this.unos[i].x+=this.vel[i][0]*delta/1000;
                    this.unos[i].y+=this.vel[i][1]*delta/1000;
                    if(this.unos[0].y > 450){
                        this.vel[i][0]=0;
                        this.vel[i][1]=0;
                        rc=2;
                    }
                }
            
        }else if(rc === 2){
            if(this.resp>9){
                var aux=this.unos.splice(0,10);
                for(var i=aux.length-1;i>=0;i--){
                    aux[i].destroy();
                }
                this.add.image(720 ,420,'10').setOrigin(0,0);
                console.log(aux);
            }
            console.log(this.unos);
            rc=3;
        }
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
class S2D extends Phaser.Scene{ //¿Qué número es?
    constructor(){
        super({key:'S2D'});
        this.resp;
        this.N;
    }
    preload(){
        this.load.audio('correct', './assets/sounds/correct.mp3');
        this.load.audio('wrong', './assets/sounds/wrong.mp3');
        this.load.image('logo','./assets/img/logo.jpeg');
        this.load.image('1','./assets/img/1.png');
        this.load.image('10','./assets/img/10.png');
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
        this.N.push([Math.floor(Math.random()*9+1),Math.floor(Math.random()*10)]);
       
        this.N.push([Math.floor(Math.random()*(8-this.N[0][0])+1),Math.floor(Math.random()*(10-this.N[0][1]))]);
        this.resp=(this.N[0][0]+this.N[1][0])*10+this.N[0][1]+this.N[1][1];
        //console.log((this.N[0][0]*10+this.N[0][1])+" + "+(this.N[1][0]*10+this.N[1][1])+" = "+this.resp);
        
        this.unos = new Array();
        this.diez = new Array();
        
        this.r =400;
        this.x=[10+40,70*(this.N[0][0]+2)+40];
        //this.graph.fillRect(Math.min(this.x[0],this.x[1])-50,250,990-Math.min(this.x[0],this.x[1]),200);
        this.graph.fillStyle(Colores[2]);
        this.graph.fillRect(10,200,70*(this.N[0][0]+1)+10,600);
        this.graph.fillRect(1050,300-35,150,80);
        this.graph.fillStyle(Colores[0]);
        this.graph.fillRect(70*(this.N[0][0]+2),200,70*(this.N[1][0]+1)+10,600);
        this.graph.fillRect(1050,400-35,150,80);
        this.graph.fillStyle((Colores[0]+Colores[2])/2);
        this.graph.fillRect(1050,500-38,150,80);
        
        for(var j=0;j<2;j++){
            for(var i=0;i<this.N[j][0];i++){
                this.diez.push(this.add.image(this.x[j]+70*i ,500,'10'));
                this.diez[this.diez.length-1].setInteractive();
                this.input.setDraggable(this.diez[this.diez.length-1]);
                this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
                    gameObject.x = dragX;
                    gameObject.y = dragY;
                });
            }
        }
        this.x=[70*(this.N[0][0])+50,70*(this.N[0][0]+2)+70*(this.N[1][0])+40];
        
        for(var j=0;j<2;j++){
            for(var i=0;i<this.N[j][1];i++){
                this.unos.push(this.add.image(this.x[j] ,248+i*63,'1'));
                this.unos[this.unos.length-1].setInteractive();
                this.input.setDraggable(this.unos[this.unos.length-1]);
                this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
                    gameObject.x = dragX;
                    gameObject.y = dragY;
                });
            }
        }
        
        this.add.text(1100, 300-35, this.N[0][0], { color: 'black', fontFamily: 'Arial', fontSize: '70px '}).setOrigin(0.5,0);
        this.add.text(1150, 300-35, this.N[0][1], { color: 'black', fontFamily: 'Arial', fontSize: '70px '}).setOrigin(0.5,0);
        this.add.text(1100, 400-35, this.N[1][0], { color: 'black', fontFamily: 'Arial', fontSize: '70px '}).setOrigin(0.5,0);
        this.add.text(1150, 400-35, this.N[1][1], { color: 'black', fontFamily: 'Arial', fontSize: '70px '}).setOrigin(0.5,0);
        this.add.text(1000, 350-35, "+", { color: 'black', fontFamily: 'Arial', fontSize: '70px '}).setOrigin(0.5,0);
        
        this.graph.lineStyle(5, 0x000000, 1);
        this.graph.lineBetween(1000, 450, 1200, 450);
        
        var respuesta = document.createElement('input');
        respuesta.setAttribute('type'  ,'number');
        respuesta.setAttribute('id','respuestaD');
        respuesta.setAttribute('style', 'width: 50px; text-align: rigth; background-color: #04b3f3 ;');
        respuesta.setAttribute('max','9');
        respuesta.setAttribute('min','0');
        this.resD = this.add.dom(1090, 500, respuesta);
        var respuesta = document.createElement('input');
        respuesta.setAttribute('type'  ,'number');
        respuesta.setAttribute('id','respuestaU');
        respuesta.setAttribute('style', 'width: 50px; text-align: rigth;');
        respuesta.setAttribute('max','9');
        respuesta.setAttribute('min','0');
        this.resU = this.add.dom(1150, 500, respuesta);
        
        this.velD = new Array();
        this.velU = new Array();
        
        var boton = document.createElement('button');
        boton.setAttribute('type','button');
        this.element = this.add.dom(1600, 540, boton,'','Corregir');
        this.element.addListener('click');
        this.element.on('click',() => this.corregir());
        
        this.input.keyboard.on('keydown-ENTER',() => this.corregir());
        
        var boton = document.createElement('button');
        boton.setAttribute('type','button');
        this.elementA = this.add.dom(1600, 440, boton,'','Ayuda');
        this.elementA.addListener('click');
        this.elementA.on('click', function(){
            rc++;
        });
        
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
        var r = (document.getElementById('respuestaD').value+document.getElementById('respuestaU').value);
        //console.log(rc);

        if(r===this.resp.toString()){
            //console.log("Correcto");
            b=0.5;
            c.play();
            this.element.setVisible(false);
            this.lienzo3 = this.add.graphics();
                this.lienzo3.fillStyle(0x03A9F4);
                this.lienzo3.fillRect(1300,50,300,90);
                this.opc= this.add.text(1450, 95, '¿OTRO?', { color: 'black', fontFamily: 'Arial', fontSize: '50px '}).setOrigin(0.5,0.5);

                const otro = this.add.zone(1300, 50, 300,100);
                    otro.setOrigin(0);
                    otro.setInteractive();
                    otro.on('pointerdown', () => this.opcionPulsada('otro'));
            
            this.element.off('click');
            this.input.keyboard.off('keydown-ENTER');
            rc++;
        }else{
            //console.log("Incorrecto");
            a=0.5;
            w.play();
            this.cameras.main.shake(200,0.01);
        }
        
        
    }
    update(time,delta){
        if(rc === 1){
                       
            for(var i=0;i<this.diez.length;i++){
                this.velD.push([50+i*70-this.diez[i].x,550-this.diez[i].y]);
            }
            for(var i=0;i<this.unos.length;i++){
                this.velU.push([50+this.diez.length*70-this.unos[i].x,296+i*60-this.unos[i].y]);
            }
            this.elementA.off('click');
            this.elementA.setVisible(false);
            
            rc++;
        }else if(rc === 2){
            for(var i=0;i<this.diez.length;i++){
                this.diez[i].x+=this.velD[i][0]*delta/1000;
                this.diez[i].y+=this.velD[i][1]*delta/1000;
                if(this.diez[this.diez.length-1].x < (50+(this.diez.length-1)*70) ){
                    this.velD[i][0]=0;
                    this.velD[i][1]=0;
                    rc=3;
                }
            }
            for(var i=0;i<this.unos.length;i++){ 
                this.unos[i].x+=this.velU[i][0]*delta/1000;
                this.unos[i].y+=this.velU[i][1]*delta/1000;
            }
        }else if(rc === 3){
            
            
            for(var i=0;i<this.diez.length;i++){
                this.diez[i].x=50+i*70;
                this.diez[i].y=550;
                
            }
            for(var i=0;i<this.unos.length;i++){ 
                this.unos[i].x=50+this.diez.length*70;
                this.unos[i].y=296+i*60;
            }
            
            rc++;
        }
        
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
class S2D2 extends Phaser.Scene{ //¿Qué número es?
    constructor(){
        super({key:'S2D2'});
        this.resp;
        this.N;
    }
    preload(){
        this.load.audio('correct', './assets/sounds/correct.mp3');
        this.load.audio('wrong', './assets/sounds/wrong.mp3');
        this.load.image('logo','./assets/img/logo.jpeg');
        this.load.image('1','./assets/img/1.png');
        this.load.image('10','./assets/img/10.png');
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
        this.N.push([Math.floor(Math.random()*9+1),Math.floor(Math.random()*10)]);
       
        this.N.push([Math.floor(Math.random()*(8-this.N[0][0])+1),Math.floor(Math.random()*(5)+5)]);
        this.resp=(this.N[0][0]+this.N[1][0])*10+this.N[0][1]+this.N[1][1];
        //console.log((this.N[0][0]*10+this.N[0][1])+" + "+(this.N[1][0]*10+this.N[1][1])+" = "+this.resp);
        
        this.unos = new Array();
        this.diez = new Array();
        
        this.r =400;
        this.x=[10+40,70*(this.N[0][0]+2)+40];
        //this.graph.fillRect(Math.min(this.x[0],this.x[1])-50,250,990-Math.min(this.x[0],this.x[1]),200);
        this.graph.fillStyle(Colores[2]);
        this.graph.fillRect(10,200,70*(this.N[0][0]+1)+10,600);
        this.graph.fillRect(1050,300-35,150,80);
        this.graph.fillStyle(Colores[0]);
        this.graph.fillRect(70*(this.N[0][0]+2),200,70*(this.N[1][0]+1)+10,600);
        this.graph.fillRect(1050,400-35,150,80);
        this.graph.fillStyle((Colores[0]+Colores[2])/2);
        this.graph.fillRect(1050,500-38,150,80);
        
        for(var j=0;j<2;j++){
            for(var i=0;i<this.N[j][0];i++){
                this.diez.push(this.add.image(this.x[j]+70*i ,500,'10'));
                this.diez[this.diez.length-1].setInteractive();
                this.input.setDraggable(this.diez[this.diez.length-1]);
                this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
                    gameObject.x = dragX;
                    gameObject.y = dragY;
                });
            }
        }
        this.x=[70*(this.N[0][0])+50,70*(this.N[0][0]+2)+70*(this.N[1][0])+40];
        
        for(var j=0;j<2;j++){
            for(var i=0;i<this.N[j][1];i++){
                this.unos.push(this.add.image(this.x[j] ,248+i*63,'1'));
                this.unos[this.unos.length-1].setInteractive();
                this.input.setDraggable(this.unos[this.unos.length-1]);
                this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
                    gameObject.x = dragX;
                    gameObject.y = dragY;
                });
            }
        }
        
        this.add.text(1100, 300-35, this.N[0][0], { color: 'black', fontFamily: 'Arial', fontSize: '70px '}).setOrigin(0.5,0);
        this.add.text(1150, 300-35, this.N[0][1], { color: 'black', fontFamily: 'Arial', fontSize: '70px '}).setOrigin(0.5,0);
        this.add.text(1100, 400-35, this.N[1][0], { color: 'black', fontFamily: 'Arial', fontSize: '70px '}).setOrigin(0.5,0);
        this.add.text(1150, 400-35, this.N[1][1], { color: 'black', fontFamily: 'Arial', fontSize: '70px '}).setOrigin(0.5,0);
        this.add.text(1000, 350-35, "+", { color: 'black', fontFamily: 'Arial', fontSize: '70px '}).setOrigin(0.5,0);
        
        this.graph.lineStyle(5, 0x000000, 1);
        this.graph.lineBetween(1000, 450, 1200, 450);
        
        var respuesta = document.createElement('input');
        respuesta.setAttribute('type'  ,'number');
        respuesta.setAttribute('id','respuestaD');
        respuesta.setAttribute('style', 'width: 50px; text-align: rigth; background-color: #04b3f3 ;');
        respuesta.setAttribute('max','9');
        respuesta.setAttribute('min','0');
        this.resD = this.add.dom(1090, 500, respuesta);
        var respuesta = document.createElement('input');
        respuesta.setAttribute('type'  ,'number');
        respuesta.setAttribute('id','respuestaU');
        respuesta.setAttribute('style', 'width: 50px; text-align: rigth;');
        respuesta.setAttribute('max','9');
        respuesta.setAttribute('min','0');
        this.resU = this.add.dom(1150, 500, respuesta);
        
        this.velD = new Array();
        this.velU = new Array();
        
        var boton = document.createElement('button');
        boton.setAttribute('type','button');
        this.element = this.add.dom(1600, 540, boton,'','Corregir');
        this.element.addListener('click');
        this.element.on('click',() => this.corregir());
        
        this.input.keyboard.on('keydown-ENTER',() => this.corregir());
        
        var boton = document.createElement('button');
        boton.setAttribute('type','button');
        this.elementA = this.add.dom(1600, 440, boton,'','Ayuda');
        this.elementA.addListener('click');
        this.elementA.on('click', function(){
            rc++;
        });
        
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
        var r = (document.getElementById('respuestaD').value+document.getElementById('respuestaU').value);
        //console.log(rc);

        if(r===this.resp.toString()){
            //console.log("Correcto");
            b=0.5;
            c.play();
            this.element.setVisible(false);
            this.lienzo3 = this.add.graphics();
                this.lienzo3.fillStyle(0x03A9F4);
                this.lienzo3.fillRect(1300,50,300,90);
                this.opc= this.add.text(1450, 95, '¿OTRO?', { color: 'black', fontFamily: 'Arial', fontSize: '50px '}).setOrigin(0.5,0.5);

                const otro = this.add.zone(1300, 50, 300,100);
                    otro.setOrigin(0);
                    otro.setInteractive();
                    otro.on('pointerdown', () => this.opcionPulsada('otro'));
            
            this.element.off('click');
            this.input.keyboard.off('keydown-ENTER');
            rc++;
        }else{
            //console.log("Incorrecto");
            a=0.5;
            w.play();
            this.cameras.main.shake(200,0.01);
        }
        
        
    }
    update(time,delta){
        if(rc === 1){
                       
            for(var i=0;i<this.diez.length;i++){
                this.velD.push([50+i*70-this.diez[i].x,550-this.diez[i].y]);
            }
            for(var i=0;i<this.unos.length;i++){
                this.velU.push([50+this.diez.length*70+70*Math.floor(i/10)-this.unos[i].x,296+(i%10)*57-this.unos[i].y]);
            }
            this.elementA.off('click');
            this.elementA.setVisible(false);
            
            rc++;
        }else if(rc === 2){
            for(var i=0;i<this.diez.length;i++){
                this.diez[i].x+=this.velD[i][0]*delta/1000;
                this.diez[i].y+=this.velD[i][1]*delta/1000;
                if(this.diez[this.diez.length-1].x < (50+(this.diez.length-1)*70) ){
                    this.velD[i][0]=0;
                    this.velD[i][1]=0;
                    rc=3;
                }
            }
            for(var i=0;i<this.unos.length;i++){ 
                this.unos[i].x+=this.velU[i][0]*delta/1000;
                this.unos[i].y+=this.velU[i][1]*delta/1000;
            }
        }else if(rc === 3){
            
            
            for(var i=0;i<this.diez.length;i++){
                this.diez[i].x=50+i*70;
                this.diez[i].y=550;
                
            }
            for(var i=0;i<this.unos.length;i++){ 
                this.unos[i].x=50+this.diez.length*70+70*Math.floor(i/10);
                this.unos[i].y=294+(i%10)*57;
            }
            
            rc++;
        }
        
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
class SA extends Phaser.Scene{ //¿Qué número es?
    constructor(){
        super({key:'SA'});
        this.resp;
        this.N;
    }
    preload(){
        this.load.audio('correct', './assets/sounds/correct.mp3');
        this.load.audio('wrong', './assets/sounds/wrong.mp3');
        this.load.image('logo','./assets/img/logo.jpeg');
        this.load.image('1','./assets/img/1.png');
        this.load.image('10','./assets/img/10.png');
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
        
        this.N.push(Math.floor(Math.random()*9+1)*10+9);
        this.N.push(Math.floor(Math.random()*10)*10+Math.floor(Math.random()*8+1));
        this.N.push(Math.floor(Math.random()*9+1)*10);
        
        this.resp = new Array();
        this.resp.push(this.N[0]-1);
        this.resp.push(this.N[0]+1);
        this.resp.push(this.N[1]-1);
        this.resp.push(this.N[1]+1);
        this.resp.push(this.N[2]-1);
        this.resp.push(this.N[2]+1);
        console.log(this.resp);
        //console.log((this.N[0][0]*10+this.N[0][1])+" + "+(this.N[1][0]*10+this.N[1][1])+" = "+this.resp);
        console.log(this.N);
        
        
        
        this.add.text(960, 300-35, this.N[0], { color: 'black', fontFamily: 'Arial', fontSize: '70px '}).setOrigin(0.5,0);
        this.add.text(960, 400-35, this.N[1], { color: 'black', fontFamily: 'Arial', fontSize: '70px '}).setOrigin(0.5,0);
        this.add.text(960, 500-35, this.N[2], { color: 'black', fontFamily: 'Arial', fontSize: '70px '}).setOrigin(0.5,0);
        
        var data = [ 0,50, 75,50, 50,25, 75,50, 50,75, 75,50];
        var r3 = this.add.polygon(1050, 275, data);
        r3.setStrokeStyle(5, 0x000000);
        
        r3 = this.add.polygon(1050, 375, data);
         r3.setStrokeStyle(5, 0x000000);

        r3 = this.add.polygon(1050, 475, data);
         r3.setStrokeStyle(5, 0x000000);
         
        r3 = this.add.polygon(850, 275, data);
         r3.setStrokeStyle(5, 0x000000);
        
        r3 = this.add.polygon(850, 375, data);
         r3.setStrokeStyle(5, 0x000000);
        
        r3 = this.add.polygon(850, 475, data);
         r3.setStrokeStyle(5, 0x000000);
        
        
        var respuesta = document.createElement('input');
        respuesta.setAttribute('type'  ,'number');
        respuesta.setAttribute('id','respuestaA1');
        //respuesta.setAttribute('style', 'width: 50px; text-align: rigth; background-color: #04b3f3 ;');
        respuesta.setAttribute('max','100');
        respuesta.setAttribute('min','0');
        this.add.dom(650, 300, respuesta);
        
        var respuesta = document.createElement('input');
        respuesta.setAttribute('type'  ,'number');
        respuesta.setAttribute('id','respuestaS1');
        //respuesta.setAttribute('style', 'width: 50px; text-align: rigth;');
        respuesta.setAttribute('max','100');
        respuesta.setAttribute('min','0');
        this.add.dom(1250, 300, respuesta);
        
        var respuesta = document.createElement('input');
        respuesta.setAttribute('type'  ,'number');
        respuesta.setAttribute('id','respuestaA2');
        //respuesta.setAttribute('style', 'width: 50px; text-align: rigth; background-color: #04b3f3 ;');
        respuesta.setAttribute('max','100');
        respuesta.setAttribute('min','0');
        this.add.dom(650, 400, respuesta);
        
        var respuesta = document.createElement('input');
        respuesta.setAttribute('type'  ,'number');
        respuesta.setAttribute('id','respuestaS2');
        //respuesta.setAttribute('style', 'width: 50px; text-align: rigth;');
        respuesta.setAttribute('max','100');
        respuesta.setAttribute('min','0');
        this.add.dom(1250, 400, respuesta);
        
        var respuesta = document.createElement('input');
        respuesta.setAttribute('type'  ,'number');
        respuesta.setAttribute('id','respuestaA3');
        //respuesta.setAttribute('style', 'width: 50px; text-align: rigth; background-color: #04b3f3 ;');
        respuesta.setAttribute('max','100');
        respuesta.setAttribute('min','0');
        this.add.dom(650, 500, respuesta);
        
        var respuesta = document.createElement('input');
        respuesta.setAttribute('type'  ,'number');
        respuesta.setAttribute('id','respuestaS3');
        //respuesta.setAttribute('style', 'width: 50px; text-align: rigth;');
        respuesta.setAttribute('max','100');
        respuesta.setAttribute('min','0');
        this.add.dom(1250, 500, respuesta);
        
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
        var r = new Array();
        r.push(document.getElementById('respuestaA1').value);
        r.push(document.getElementById('respuestaS1').value);
        r.push(document.getElementById('respuestaA2').value);
        r.push(document.getElementById('respuestaS2').value);
        r.push(document.getElementById('respuestaA3').value);
        r.push(document.getElementById('respuestaS3').value);
        //console.log(rc);
        console.log(r);
        var evaluate = true;
        for(var i=0; i<r.length;i++){
            evaluate =evaluate && (r[i]===this.resp[i].toString());
        }
        if(evaluate){
            //console.log("Correcto");
            b=0.5;
            c.play();
            this.element.setVisible(false);
            this.lienzo3 = this.add.graphics();
                this.lienzo3.fillStyle(0x03A9F4);
                this.lienzo3.fillRect(1300,50,300,90);
                this.opc= this.add.text(1450, 95, '¿OTRO?', { color: 'black', fontFamily: 'Arial', fontSize: '50px '}).setOrigin(0.5,0.5);

                const otro = this.add.zone(1300, 50, 300,100);
                    otro.setOrigin(0);
                    otro.setInteractive();
                    otro.on('pointerdown', () => this.opcionPulsada('otro'));
            
            this.element.off('click');
            this.input.keyboard.off('keydown-ENTER');
            rc++;
        }else{
            //console.log("Incorrecto");
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
class DHM extends Phaser.Scene{ //¿Qué número es?
    constructor(){
        super({key:'DHM'});
        this.resp;
        this.N;
    }
    preload(){
        this.load.audio('correct', './assets/sounds/correct.mp3');
        this.load.audio('wrong', './assets/sounds/wrong.mp3');
        this.load.image('logo','./assets/img/logo.jpeg');
        this.load.image('p','./assets/img/P.png');
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
        
        this.N.push(Math.floor(Math.random()*5+1));
        this.N.push(Math.floor(Math.random()*5+1));
        
        if(this.N[0]>this.N[1]){
            this.resp=1;
        }else if(this.N[1]>this.N[0]){
            this.resp=2;
        }else{
            this.resp=0;
        }
        
        //console.log(this.resp);
        //console.log((this.N[0][0]*10+this.N[0][1])+" + "+(this.N[1][0]*10+this.N[1][1])+" = "+this.resp);
        //console.log(this.N);
        /*
        this.graph.fillStyle(0x000000);
        this.graph.fillRect(1295,197-27,60,60);
        */
        this.graph.fillStyle(0xF1C40F);
        this.graph.fillRect(1298,200-27,54,54);
        const r3 = this.add.zone(1298,200-27,54,54);
	r3.setOrigin(0);
	r3.setInteractive();
	r3.on('pointerdown', () => this.corregir(0));
	this.add.graphics().lineStyle(4, 0x000000).strokeRectShape(r3);
        
        this.add.text(960, 200-35, '¿Qué hay más      o      o = ?', { color: 'black', fontFamily: 'Arial', fontSize: '70px '}).setOrigin(0.5,0);
        var r1=this.add.image(1035,200,'p').setTint(0xff0000);
        var r2=this.add.image(1205,200,'p').setTint(0x0000ff);
        r1.setInteractive();
        r2.setInteractive();
        r1.on('pointerdown', () => this.corregir(1));
        r2.on('pointerdown', () => this.corregir(2));
        
        
        this.unos = [new Array(),new Array()];
        //console.log(this.unos);
        this.r=150;
        
        
        for(var j=0;j<2;j++){
            for(var i=0;i<this.N[j];i++){
                this.unos[j].push(this.add.image(710+500*j + this.r*Math.cos(2*Math.PI/this.N[j]*i),540+ this.r*Math.sin(2*Math.PI/this.N[j]*i),'p').setTint((0xff0000)*(1-j)+(0x0000ff)*j));
                this.unos[j][i].setInteractive();
                this.input.setDraggable(this.unos[j][i]);
                this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
                    gameObject.x = dragX;
                    gameObject.y = dragY;
                });
            }
        }
       
        
        
        
        
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
    
    corregir(r){
        //console.log(r);
        if(r === this.resp){
            //console.log("Correcto");
            b=0.5;
            c.play();
            this.lienzo3 = this.add.graphics();
                this.lienzo3.fillStyle(0x03A9F4);
                this.lienzo3.fillRect(1300,50,300,90);
                this.opc= this.add.text(1450, 95, '¿OTRO?', { color: 'black', fontFamily: 'Arial', fontSize: '50px '}).setOrigin(0.5,0.5);

                const otro = this.add.zone(1300, 50, 300,100);
                    otro.setOrigin(0);
                    otro.setInteractive();
                    otro.on('pointerdown', () => this.opcionPulsada('otro'));
            a=0;
            
            rc++;
        }else{
            //console.log("Incorrecto");
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
class DHM2 extends Phaser.Scene{ //¿Qué número es?
    constructor(){
        super({key:'DHM2'});
        this.resp;
        this.N;
    }
    preload(){
        this.load.audio('correct', './assets/sounds/correct.mp3');
        this.load.audio('wrong', './assets/sounds/wrong.mp3');
        this.load.image('logo','./assets/img/logo.jpeg');
        this.load.image('p','./assets/img/P.png');
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
        
        this.N.push(Math.floor(Math.random()*5+10));
        this.N.push(Math.floor(Math.random()*5+10));
        
        if(this.N[0]>this.N[1]){
            this.resp=1;
        }else if(this.N[1]>this.N[0]){
            this.resp=2;
        }else{
            this.resp=0;
        }
        
        //console.log(this.resp);
        //console.log((this.N[0][0]*10+this.N[0][1])+" + "+(this.N[1][0]*10+this.N[1][1])+" = "+this.resp);
        //console.log(this.N);
        /*
        this.graph.fillStyle(0x000000);
        this.graph.fillRect(1295,197-27,60,60);
        */
        this.graph.fillStyle(0xF1C40F);
        this.graph.fillRect(1298,200-27,54,54);
        const r3 = this.add.zone(1298,200-27,54,54);
	r3.setOrigin(0);
	r3.setInteractive();
	r3.on('pointerdown', () => this.corregir(0));
	this.add.graphics().lineStyle(4, 0x000000).strokeRectShape(r3);
        
        this.add.text(960, 200-35, '¿Qué hay más      o      o = ?', { color: 'black', fontFamily: 'Arial', fontSize: '70px '}).setOrigin(0.5,0);
        var r1=this.add.image(1035,200,'p').setTint(0xff0000);
        var r2=this.add.image(1205,200,'p').setTint(0x0000ff);
        r1.setInteractive();
        r2.setInteractive();
        r1.on('pointerdown', () => this.corregir(1));
        r2.on('pointerdown', () => this.corregir(2));
        
        
        this.unos = [new Array(),new Array()];
        //console.log(this.unos);
        this.r=200;
        
        
        for(var j=0;j<2;j++){
            for(var i=0;i<this.N[j];i++){
                this.unos[j].push(this.add.image(960-2*this.r+4*this.r*j + this.r*Math.cos(2*Math.PI/this.N[j]*i),540+ this.r*Math.sin(2*Math.PI/this.N[j]*i),'p').setTint((0xff0000)*(1-j)+(0x0000ff)*j));
                this.unos[j][i].setInteractive();
                this.input.setDraggable(this.unos[j][i]);
                this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
                    gameObject.x = dragX;
                    gameObject.y = dragY;
                });
            }
        }
       
        
        
        
        
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
    
    corregir(r){
        //console.log(r);
        if(r === this.resp){
            //console.log("Correcto");
            b=0.5;
            c.play();
            this.lienzo3 = this.add.graphics();
                this.lienzo3.fillStyle(0x03A9F4);
                this.lienzo3.fillRect(1300,50,300,90);
                this.opc= this.add.text(1450, 95, '¿OTRO?', { color: 'black', fontFamily: 'Arial', fontSize: '50px '}).setOrigin(0.5,0.5);

                const otro = this.add.zone(1300, 50, 300,100);
                    otro.setOrigin(0);
                    otro.setInteractive();
                    otro.on('pointerdown', () => this.opcionPulsada('otro'));
            a=0;
            
            rc++;
        }else{
            //console.log("Incorrecto");
            a=0.5;
            w.play();
            this.cameras.main.shake(200,0.01);
        }
        
    }
    update(time,delta){
        if(rc === 1){ //Calcula velocidades
            this.vel=[new Array(),new Array()];
            for(var i=0;i<this.unos.length;i++){
                for(var j=0;j<this.unos[i].length;j++){
                    this.vel[i].push([210+j*100-this.unos[i][j].x,300+i*100-this.unos[i][j].y]);
                }
            }
            //console.log(this.vel);
            rc++;
        }else if(rc === 2 ){// Mover
            for(var i=0;i<this.unos.length;i++){
                for(var j=0; j<this.unos[i].length;j++){
                    this.unos[i][j].x+=this.vel[i][j][0]*delta/1000;
                    this.unos[i][j].y+=this.vel[i][j][1]*delta/1000;
                    if(this.unos[i][0].x<210){
                        rc=3;
                    }
                }
            }
            
        }else if(rc === 3){//Posición final
            for(var i=0;i<this.unos.length;i++){
                for(var j=0;j<this.unos[i].length;j++){
                    this.unos[i][j].x=210+j*100;
                    this.unos[i][j].y=300+i*100;
                    
                }
            }
            rc++;
        }
        
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
class DHM3 extends Phaser.Scene{ //¿Qué número es?
    constructor(){
        super({key:'DHM3'});
        this.resp;
        this.N;
    }
    preload(){
        this.load.audio('correct', './assets/sounds/correct.mp3');
        this.load.audio('wrong', './assets/sounds/wrong.mp3');
        this.load.image('logo','./assets/img/logo.jpeg');
        this.load.image('p','./assets/img/P.png');
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
        
        this.N.push(Math.floor(Math.random()*5+10));
        this.N.push(Math.floor(Math.random()*5+10));
        this.N.push(Math.floor(Math.random()*5+10));
        
        if(this.N[0]>this.N[1]){
            if(this.N[0]>this.N[2]){
                this.resp=1;
            }else{
                if(this.N[0]===this.N[2]){
                    this.N[0]++;
                    this.resp=1;
                }else{
                    this.resp=3;
                }
            }
            
        }else if(this.N[0]===this.N[1]){
            if(this.N[2]>this.N[0]){
                this.resp=3;
            }else if(this.N[2] === this.N[0]){
                this.resp=0;
            }else {
                this.N[0]++;
                this.resp=1;
            }
        }else {
            if(this.N[1] > this.N[2]){
                this.resp =2;
            }else if(this.N[1] === this.N[2]){
                this.N[2]++;
                this.resp =3;
            }else{
                this.resp =3;
            }           
        }
        
        //console.log(this.resp);
        //console.log((this.N[0][0]*10+this.N[0][1])+" + "+(this.N[1][0]*10+this.N[1][1])+" = "+this.resp);
        //console.log(this.N);
        /*
        this.graph.fillStyle(0x000000);
        this.graph.fillRect(1295,197-27,60,60);
        */
        this.graph.fillStyle(0xF1C40F);
        this.graph.fillRect(1378,200-27,54,54);
        const r4 = this.add.zone(1376,200-27,54,54);
	r4.setOrigin(0);
	r4.setInteractive();
	r4.on('pointerdown', () => this.corregir(0));
	this.add.graphics().lineStyle(4, 0x000000).strokeRectShape(r4);
        
        this.add.text(960, 200-35, '¿Qué hay más      o      o      o = ?', { color: 'black', fontFamily: 'Arial', fontSize: '70px '}).setOrigin(0.5,0);
        var r1=this.add.image(950,200,'p').setTint(0xff0000);
        var r2=this.add.image(1120,200,'p').setTint(0x0000ff);
        var r3=this.add.image(1270,200,'p').setTint(0x00ff00);
        r1.setInteractive();
        r2.setInteractive();
        r3.setInteractive();
        r1.on('pointerdown', () => this.corregir(1));
        r2.on('pointerdown', () => this.corregir(2));
        r3.on('pointerdown', () => this.corregir(3));
        
        this.unos = [new Array(),new Array(),new Array()];
        //console.log(this.unos);
        this.r=200;
        
        
        for(var j=0;j<this.N.length;j++){
            for(var i=0;i<this.N[j];i++){
                this.unos[j].push(this.add.image(960-3*this.r+3*this.r*j + this.r*Math.cos(2*Math.PI/this.N[j]*i),540+ this.r*Math.sin(2*Math.PI/this.N[j]*i),'p').setTint((0xff0000)*(1-j)*(2-j)/2+(0x0000ff)*j*(2-j)+(0x00ff00)*j*(j-1)/2));
                this.unos[j][i].setInteractive();
                this.input.setDraggable(this.unos[j][i]);
                this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
                    gameObject.x = dragX;
                    gameObject.y = dragY;
                });
            }
        }
       
        
        
        
        
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
    
    corregir(r){
        //console.log(r);
        if(r === this.resp){
            //console.log("Correcto");
            b=0.5;
            c.play();
            this.lienzo3 = this.add.graphics();
                this.lienzo3.fillStyle(0x03A9F4);
                this.lienzo3.fillRect(1300,50,300,90);
                this.opc= this.add.text(1450, 95, '¿OTRO?', { color: 'black', fontFamily: 'Arial', fontSize: '50px '}).setOrigin(0.5,0.5);

                const otro = this.add.zone(1300, 50, 300,100);
                    otro.setOrigin(0);
                    otro.setInteractive();
                    otro.on('pointerdown', () => this.opcionPulsada('otro'));
            a=0;
            
            rc++;
        }else{
            //console.log("Incorrecto");
            a=0.5;
            w.play();
            this.cameras.main.shake(200,0.01);
        }
        
    }
    update(time,delta){
        if(rc === 1){ //Calcula velocidades
            this.vel=[new Array(),new Array(),new Array()];
            for(var i=0;i<this.unos.length;i++){
                for(var j=0;j<this.unos[i].length;j++){
                    this.vel[i].push([210+j*100-this.unos[i][j].x,300+i*100-this.unos[i][j].y]);
                }
            }
            //console.log(this.vel);
            rc++;
        }else if(rc === 2 ){// Mover
            for(var i=0;i<this.unos.length;i++){
                for(var j=0; j<this.unos[i].length;j++){
                    this.unos[i][j].x+=this.vel[i][j][0]*delta/1000;
                    this.unos[i][j].y+=this.vel[i][j][1]*delta/1000;
                    if(this.unos[i][0].x<210){
                        rc=3;
                    }
                }
            }
            
        }else if(rc === 3){//Posición final
            for(var i=0;i<this.unos.length;i++){
                for(var j=0;j<this.unos[i].length;j++){
                    this.unos[i][j].x=210+j*100;
                    this.unos[i][j].y=300+i*100;
                    
                }
            }
            rc++;
        }
        
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
  scene: [menu,DHM3,DHM2,DHM,SA,S2D2,S2D,S1D2,Contar,GD10,QNE,S1D ],//
  scale: {
      mode: Phaser.Scale.Fit
  },
 fps: {
        target: 30,
        forceSetTimeOut: true
    }
}

var game = new Phaser.Game(config);