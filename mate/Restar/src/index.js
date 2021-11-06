/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
const titulo = 'Restar.'; //Titulo del juego
const menulabel = [['¿Cuánto falta?(1)','¿Cuánto falta?(2)'],
    ['Quitar (1)','Quitar (2)'],
    ['Recta numérica (1)', 'Recta numérica (2)'],
    ['Restar (1)', 'Restar (2)']]; //Opciones menú
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
        opc[0].once('pointerdown', () => this.opcionPulsada(0));
        opc[1].once('pointerdown', () => this.opcionPulsada(1));
        opc[2].once('pointerdown', () => this.opcionPulsada(2));
        opc[3].once('pointerdown', () => this.opcionPulsada(3));
        opc[4].once('pointerdown', () => this.opcionPulsada(4));
        opc[5].once('pointerdown', () => this.opcionPulsada(5));
        opc[6].once('pointerdown', () => this.opcionPulsada(6));
        opc[7].once('pointerdown', () => this.opcionPulsada(7));
        //opc[8].once('pointerdown', () => this.opcionPulsada(8));
        //opc[9].once('pointerdown', () => this.opcionPulsada(9));
        //opc[10].once('pointerdown', () => this.opcionPulsada(10));
        
    }
    opcionPulsada(opcion) {
        console.log("opcionPulsada("+opcion+")");
	if (opcion === 0) {
            this.scene.start('CF');
	} else if (opcion === 1) {
            this.scene.start('CF2');
	} else if (opcion === 2) {
            this.scene.start('Q');
	} else if (opcion === 3) {
            this.scene.start('Q2');
	} else if (opcion === 4) {
            this.scene.start('RN');
	} else if (opcion === 5) {
            this.scene.start('RN2');
	} else if (opcion === 6) {
            this.scene.start('R');
	} else if (opcion === 7) {
            //this.scene.start('SA');
	} else if (opcion === 8) {
            //this.scene.start('DHM');
	} else if (opcion === 9) {
            //this.scene.start('DHM2');
	} else if (opcion === 10) {
            //this.scene.start('DHM3');
	} else {
            console.log(opcion);
        }
    }
}

class CF extends Phaser.Scene{ //Cuánto Falta
    constructor(){
        super({key:'CF'});
        this.resp;
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
        
        this.add.dom(960, 240, 'h2', null, "Intenta apretar las imágenes");
        this.N =[Math.floor(Math.random()*9+1),Math.floor(Math.random()*9+1)];
        this.N.sort(function(a,b){return b - a;});
        this.add.dom(960, 150, 'h1', null, "¿Cuánto le falta a "+this.N[1]+" para llegar a "+this.N[0]);
        //console.log(this.N);
        this.unos = new Array();
        this.r =400;
        this.x=960-70*this.N[0];
        for(var j=0;j<this.N.length;j++){
            for(var i=0;i<this.N[j];i++){
                var cuad;
                this.unos.push(this.add.image(this.x+70*i ,400+j*100,'p'));
                cuad =this.unos[i];
                cuad.setInteractive();
                cuad.setData({name: i, tocado:0});
                cuad.on('clicked', this.down, this);
            }
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
    down(image){
        
        if(image.getData('tocado') === 0){
            image.setTint(0x00ff00);
        }else{
            image.clearTint();
        }
        image.setData('tocado',1-image.getData('tocado'));
        
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

                const otro = this.add.zone(1300, 50, 300,100);
                    otro.setOrigin(0);
                    otro.setInteractive();
                    otro.on('pointerdown', () => this.opcionPulsada('otro'));
            rc=1;
            for(var i=this.N[1];i<this.N[0];i++){
                if(this.unos[i].getData('tocado') === 0){
                    this.unos[i].setTint(0x00ff00);
                }
                this.unos[i].setData('tocado',1-this.unos[i].getData('tocado'));
            }
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

class CF2 extends Phaser.Scene{ //Cuánto Falta 10-14, 5-9
    constructor(){
        super({key:'CF2'});
        this.resp;
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
        
        this.add.dom(960, 240, 'h2', null, "Intenta apretar las imágenes");
        this.N =[Math.floor(Math.random()*5+10),Math.floor(Math.random()*5+5)];
        this.N.sort(function(a,b){return b - a;});
        this.add.dom(960, 150, 'h1', null, "¿Cuánto le falta a "+this.N[1]+" para llegar a "+this.N[0]);
        //console.log(this.N);
        this.unos = new Array();
        this.r =400;
        this.x=960-65*this.N[0];
        for(var j=0;j<this.N.length;j++){
            for(var i=0;i<this.N[j];i++){
                var cuad;
                this.unos.push(this.add.image(this.x+65*i ,400+j*100,'p'));
                cuad =this.unos[i];
                cuad.setInteractive();
                cuad.setData({name: i, tocado:0});
                cuad.on('clicked', this.down, this);
            }
        }
        this.add.text(1100, 400-35, Math.floor(this.N[0]/10), { color: 'black', fontFamily: 'Arial', fontSize: '70px '}).setOrigin(0.5,0);
        this.add.text(1150, 400-35, this.N[0]%10, { color: 'black', fontFamily: 'Arial', fontSize: '70px '}).setOrigin(0.5,0);
        this.add.text(1150, 500-35, this.N[1], { color: 'black', fontFamily: 'Arial', fontSize: '70px '}).setOrigin(0.5,0);
        this.add.text(1000, 450-35, "-", { color: 'black', fontFamily: 'Arial', fontSize: '70px '}).setOrigin(0.5,0);
        
        this.graph.lineStyle(5, 0x000000, 1);
        this.graph.lineBetween(1000, 550, 1200, 550);
        
        
        var respuesta = document.createElement('input');
        respuesta.setAttribute('type'  ,'number');
        respuesta.setAttribute('id','respuesta');
        respuesta.setAttribute('placeholder','Respuesta');
        respuesta.setAttribute('max','9');
        respuesta.setAttribute('min','0');
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
    down(image){
        
        if(image.getData('tocado') === 0){
            image.setTint(0x00ff00);
        }else{
            image.clearTint()
        }
        image.setData('tocado',1-image.getData('tocado'));
        
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

                const otro = this.add.zone(1300, 50, 300,100);
                    otro.setOrigin(0);
                    otro.setInteractive();
                    otro.on('pointerdown', () => this.opcionPulsada('otro'));
            rc=1;
            for(var i=this.N[1];i<this.N[0];i++){
                if(this.unos[i].getData('tocado') === 0){
                    this.unos[i].setTint(0x00ff00);
                }
                this.unos[i].setData('tocado',1-this.unos[i].getData('tocado'));
            }
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

class Q extends Phaser.Scene{ //0-9 Quitar 0-9 
    constructor(){
        super({key:'Q'});
        this.resp;
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
        
        this.add.dom(960, 240, 'h2', null, "Intenta mover las imágenes");
        this.N =[Math.floor(Math.random()*9+1),Math.floor(Math.random()*9+1)];
        this.N.sort(function(a,b){return b - a;});
        this.add.dom(960, 150, 'h1', null, "¿Cuánto es si a "+this.N[0]+" le quitamos "+this.N[1]+"?");
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

class Q2 extends Phaser.Scene{ //10-4 Quitar 5-9 
    constructor(){
        super({key:'Q2'});
        this.resp;
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
        
        this.add.dom(960, 240, 'h2', null, "Intenta mover las imágenes");
        this.N =[Math.floor(Math.random()*5+10),Math.floor(Math.random()*5+5)];
        this.N.sort(function(a,b){return b - a;});
        this.add.dom(960, 150, 'h1', null, "¿Cuánto es si a "+this.N[0]+" le quitamos "+this.N[1]+"?");
        //console.log(this.N);
        this.unos = new Array();
        this.r =400;
        this.x=960-65*this.N[0];
        
        this.graph.fillRect(this.x-60,400-60,65*this.N[0]+60,130);
        
        for(var i=0;i<this.N[0];i++){
            var cuad;
            this.unos.push(this.add.image(this.x+65*i ,400,'p'));
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

class RN extends Phaser.Scene{//Recta numérica
    constructor() {
		super('RN');
                this.min =0;
                this.a=0;
	}
    preload(){
        this.load.image('logo','./assets/img/logo.jpeg');
        this.load.image('persona','./assets/img/triangulo.png');
        this.load.audio('correct', './assets/sounds/correct.mp3');
        this.load.audio('wrong', './assets/sounds/wrong.mp3');
        //this.load.html('respuesta','./assets/respuestas.html');
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
        
        this.lienzo = this.add.graphics();
        this.lienzo.lineStyle(10, 0x000000, 1);
        
        
        this.lienzo2 = this.add.graphics();
        this.lienzo2.fillStyle(0xff0000);
        this.lienzo2.setAlpha(a);
        this.lienzo2.fillRect(0,0,1920,1080);
        
        this.lienzo3 = this.add.graphics();
        this.lienzo3.fillStyle(0x00ff00);
        this.lienzo3.setAlpha(b);
        this.lienzo3.fillRect(0,0,1920,1080);
        
        c = this.sound.add('correct',{loop:false});
        w = this.sound.add('wrong',{loop:false});
        
        //recta
        this.lienzo.lineBetween(160, 300, 1660, 300);
        //marcas 
        for(var i=0;i<15;i++){
            this.lienzo.lineBetween(210+i*100, 275, 210+i*100, 325);
        }
        //numeros
        for(var i=0;i<7;i++){
            this.add.text(185+i*100, 330, ''+(i), { color: 'black', fontFamily: 'Arial', fontSize: '40px '});
        }
        for(var i=7;i<15;i++){
            this.add.text(200+i*100, 330, ''+(i), { color: 'black', fontFamily: 'Arial', fontSize: '40px '});
        }
        //Calculo del problema
        var inicio = Math.floor(Math.random()*15);
        var fin = Math.floor(Math.random()*(15-inicio)+inicio);
        this.add.text(210, 540, 'El triángulo inicia en '+(inicio+this.min)+' si se mueve ' +(fin-inicio) +' a la derecha ¿A qué número llega?.'
        , { color: 'black', fontFamily: 'Arial', fontSize: '40px '});
        
        //triángulo
        this.persona = this.add.image(208+inicio*100,225,'persona');
        this.persona.setScale(1.5);
        this.persona.setInteractive();
        this.input.setDraggable(this.persona);
        
        
        
        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            for(var i=0;i<15;i++){
                if(dragX>((208+i*100)-50) && dragX<((208+i*100)+50)){
                    gameObject.x=208+i*100;
                }
            }
        });
        
        //respuesta
        //var respuesta = this.add.dom(960, 640, 'input');
        var respuesta = document.createElement('input');
        respuesta.setAttribute('type'  ,'number');
        respuesta.setAttribute('min'  ,this.min.toString());
        respuesta.setAttribute('max'  ,(14+this.min).toString());
        respuesta.setAttribute('placeholder' ,'Respuesta');
        respuesta.setAttribute('id','respuesta');
        
        var domElement = this.add.dom(960, 640, respuesta);
        
        var boton = document.createElement('button');
        boton.setAttribute('type','button');
        var element = this.add.dom(1260, 640, boton,'','Corregir');
        element.addListener('click');
        element.on('click',() => this.corregir(inicio,fin,domElement,element));
        this.input.keyboard.on('keydown-ENTER',() => this.corregir(inicio,fin,domElement,element));
    }
    update(time,delta){
        if(a>0){
                b=0;
                a-=0.3*delta/1000;
                this.lienzo3.clear();
                this.lienzo3.setAlpha(a);
                this.lienzo3.fillStyle(0xff0000);
                this.lienzo3.fillRect(0,0,1920,1080);
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
                this.lienzo3.clear();
                this.lienzo3.setAlpha(a);
                this.lienzo3.fillStyle(0xff0000);
                this.lienzo3.fillRect(0,0,1920,1080);
                this.lienzo2.clear();
                this.lienzo2.setAlpha(b);
                this.lienzo2.fillStyle(0x00ff00);
                this.lienzo2.fillRect(0,0,1920,1080);  
            }else{
                b=0;

            }
        
    }
    corregir(inicio,fin,domElement,element){
        var r=document.getElementById('respuesta');
        if((fin+this.min)+'' === r.value){
            b=0.5;
            c.play();
            domElement.setVisible(false);
            element.setVisible(false);
            this.add.text(200, 640, '¿Qué operación realizamos?', { color: 'black', fontFamily: 'Arial', fontSize: '40px '});
            
            var botones = new Array(); 
            for(var i=0;i<2;i++){
                botones.push(document.createElement('button'));
            }
            for(var i=0;i<botones.length;i++){
                botones[i].setAttribute('type','button');
            }
            
            var etiq = new Array();
            etiq.push((inicio+this.min)+" + "+(fin-inicio));
            etiq.push((inicio+this.min)+" - "+(fin-inicio));
            
            etiq.sort( () => .5 - Math.random() );
            this.element = new Array;
            for(var i=0;i<botones.length;i++){
                this.element.push(this.add.dom(750+i*350, 750, botones[i],'',etiq[i]));
                this.element[i].addListener('click');
            }
            
            this.element[0].on('click',() => this.corregir2( etiq[0],(inicio+this.min)+" + "+(fin-inicio)));
            this.element[1].on('click',() => this.corregir2( etiq[1],(inicio+this.min)+" + "+(fin-inicio)));
            
        }else{
            a=0.75;
            w.play();
            this.cameras.main.shake(200,0.01);
        }
    }
    corregir2(etiq,correcta){
        if(etiq === correcta){
            b=0.5;
            c.play();
            this.graph.fillStyle(0x03A9F4);
                this.graph.fillRect(1300,50,300,90);
                this.opc= this.add.text(1450, 95, '¿OTRO?', { color: 'black', fontFamily: 'Arial', fontSize: '50px '}).setOrigin(0.5,0.5);

                const otro = this.add.zone(1300, 50, 300,100);
                    otro.setOrigin(0);
                    otro.setInteractive();
                    otro.on('pointerdown', () => this.opcionPulsada('otro'));
            this.element[0].destroy();
            this.element[1].destroy();
        }else{
            a=0.75;
            w.play();
            this.cameras.main.shake(200,0.01);
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

class RN2 extends Phaser.Scene{//Recta numérica
    constructor() {
		super('RN2');
                this.min =0;
                this.a=0;
	}
    preload(){
        this.load.image('logo','./assets/img/logo.jpeg');
        this.load.image('persona','./assets/img/triangulo.png');
        this.load.audio('correct', './assets/sounds/correct.mp3');
        this.load.audio('wrong', './assets/sounds/wrong.mp3');
        //this.load.html('respuesta','./assets/respuestas.html');
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
        
        this.lienzo = this.add.graphics();
        this.lienzo.lineStyle(10, 0x000000, 1);
        
        
        this.lienzo2 = this.add.graphics();
        this.lienzo2.fillStyle(0xff0000);
        this.lienzo2.setAlpha(a);
        this.lienzo2.fillRect(0,0,1920,1080);
        
        this.lienzo3 = this.add.graphics();
        this.lienzo3.fillStyle(0x00ff00);
        this.lienzo3.setAlpha(b);
        this.lienzo3.fillRect(0,0,1920,1080);
        
        c = this.sound.add('correct',{loop:false});
        w = this.sound.add('wrong',{loop:false});
        
        //recta
        this.lienzo.lineBetween(160, 300, 1660, 300);
        //marcas 
        for(var i=0;i<15;i++){
            this.lienzo.lineBetween(210+i*100, 275, 210+i*100, 325);
        }
        //numeros
        for(var i=0;i<7;i++){
            this.add.text(185+i*100, 330, ''+(i), { color: 'black', fontFamily: 'Arial', fontSize: '40px '});
        }
        for(var i=7;i<15;i++){
            this.add.text(200+i*100, 330, ''+(i), { color: 'black', fontFamily: 'Arial', fontSize: '40px '});
        }
        //Calculo del problema
        var inicio = Math.floor(Math.random()*13+2);
        var fin = Math.floor(Math.random()*(inicio));
        this.add.text(210, 540, 'El triángulo inicia en '+(inicio+this.min)+' si se mueve ' +(inicio-fin) +' a la izquierda ¿A qué número llega?.'
        , { color: 'black', fontFamily: 'Arial', fontSize: '40px '});
        
        //triángulo
        this.persona = this.add.image(208+inicio*100,225,'persona');
        this.persona.setScale(1.5);
        this.persona.setInteractive();
        this.input.setDraggable(this.persona);
        
        
        
        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            for(var i=0;i<15;i++){
                if(dragX>((208+i*100)-50) && dragX<((208+i*100)+50)){
                    gameObject.x=208+i*100;
                }
            }
        });
        
        //respuesta
        //var respuesta = this.add.dom(960, 640, 'input');
        var respuesta = document.createElement('input');
        respuesta.setAttribute('type'  ,'number');
        respuesta.setAttribute('min'  ,this.min.toString());
        respuesta.setAttribute('max'  ,(14+this.min).toString());
        respuesta.setAttribute('placeholder' ,'Respuesta');
        respuesta.setAttribute('id','respuesta');
        
        var domElement = this.add.dom(960, 640, respuesta);
        
        var boton = document.createElement('button');
        boton.setAttribute('type','button');
        var element = this.add.dom(1260, 640, boton,'','Corregir');
        element.addListener('click');
        element.on('click',() => this.corregir(inicio,fin,domElement,element));
        this.input.keyboard.on('keydown-ENTER',() => this.corregir(inicio,fin,domElement,element));
    }
    update(time,delta){
        if(a>0){
                b=0;
                a-=0.3*delta/1000;
                this.lienzo3.clear();
                this.lienzo3.setAlpha(a);
                this.lienzo3.fillStyle(0xff0000);
                this.lienzo3.fillRect(0,0,1920,1080);
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
                this.lienzo3.clear();
                this.lienzo3.setAlpha(a);
                this.lienzo3.fillStyle(0xff0000);
                this.lienzo3.fillRect(0,0,1920,1080);
                this.lienzo2.clear();
                this.lienzo2.setAlpha(b);
                this.lienzo2.fillStyle(0x00ff00);
                this.lienzo2.fillRect(0,0,1920,1080);  
            }else{
                b=0;

            }
        
    }
    corregir(inicio,fin,domElement,element){
        var r=document.getElementById('respuesta');
        if((fin+this.min)+'' === r.value){
            b=0.5;
            c.play();
            domElement.setVisible(false);
            element.setVisible(false);
            this.add.text(200, 640, '¿Qué operación realizamos?', { color: 'black', fontFamily: 'Arial', fontSize: '40px '});
            
            var botones = new Array(); 
            for(var i=0;i<2;i++){
                botones.push(document.createElement('button'));
            }
            for(var i=0;i<botones.length;i++){
                botones[i].setAttribute('type','button');
            }
            
            var etiq = new Array();
            etiq.push((inicio+this.min)+" + "+(inicio-fin));
            etiq.push((inicio+this.min)+" - "+(inicio-fin));
            
            etiq.sort( () => .5 - Math.random() );
            this.element = new Array;
            for(var i=0;i<botones.length;i++){
                this.element.push(this.add.dom(750+i*350, 750, botones[i],'',etiq[i]));
                this.element[i].addListener('click');
            }
            
            this.element[0].on('click',() => this.corregir2( etiq[0],(inicio+this.min)+" - "+(inicio-fin)));
            this.element[1].on('click',() => this.corregir2( etiq[1],(inicio+this.min)+" - "+(inicio-fin)));
            
        }else{
            a=0.75;
            w.play();
            this.cameras.main.shake(200,0.01);
        }
    }
    corregir2(etiq,correcta){
        if(etiq === correcta){
            b=0.5;
            c.play();
            this.graph.fillStyle(0x03A9F4);
                this.graph.fillRect(1300,50,300,90);
                this.opc= this.add.text(1450, 95, '¿OTRO?', { color: 'black', fontFamily: 'Arial', fontSize: '50px '}).setOrigin(0.5,0.5);

                const otro = this.add.zone(1300, 50, 300,100);
                    otro.setOrigin(0);
                    otro.setInteractive();
                    otro.on('pointerdown', () => this.opcionPulsada('otro'));
            this.element[0].destroy();
            this.element[1].destroy();
        }else{
            a=0.75;
            w.play();
            this.cameras.main.shake(200,0.01);
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

class R extends Phaser.Scene{ //Restar
    constructor(){
        super({key:'R'});
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
        this.N.push([Math.floor(Math.random()*8+2),Math.floor(Math.random()*10)]);
       
        this.N.push([Math.floor(Math.random()*(this.N[0][0])+1),Math.floor(Math.random()*(this.N[0][1]))]);
        this.add.dom(960, 140, 'h2', null, "Intenta mover las imágenes");
        
        this.resp=(this.N[0][0]-this.N[1][0])*10+this.N[0][1]-this.N[1][1];
        //console.log((this.N[0][0]*10+this.N[0][1])+" + "+(this.N[1][0]*10+this.N[1][1])+" = "+this.resp);
        
        this.unos = new Array();
        this.diez = new Array();
        
        this.r =400;
        this.x=[10+40,70*(this.N[0][0]+2)+40];
        //this.graph.fillRect(Math.min(this.x[0],this.x[1])-50,250,990-Math.min(this.x[0],this.x[1]),200);
        this.graph.fillStyle(Colores[2]);
        this.graph.fillRect(10,200,70*(this.N[0][0]+1)+10,600);
        this.graph.fillRect(1550,300-35,150,80);
        this.graph.fillStyle(Colores[0]);
        this.graph.fillRect(70*(this.N[0][0]+2),200,70*(this.N[1][0]+1)+10,600);
        this.graph.fillRect(1550,400-35,150,80);
        this.graph.fillStyle(Colores[0]-(Colores[2]/2));
        this.graph.fillRect(1550,500-38,150,80);
        
        
            for(var i=0;i<this.N[0][0];i++){
                this.diez.push(this.add.image(this.x[0]+70*i ,500,'10'));
                this.diez[this.diez.length-1].setInteractive();
                this.input.setDraggable(this.diez[this.diez.length-1]);
                this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
                    gameObject.x = dragX;
                    gameObject.y = dragY;
                });
            }
        
        this.x=[70*(this.N[0][0])+50,70*(this.N[0][0]+2)+70*(this.N[1][0])+40];
        
       
            for(var i=0;i<this.N[0][1];i++){
                this.unos.push(this.add.image(this.x[0] ,248+i*63,'1'));
                this.unos[this.unos.length-1].setInteractive();
                this.input.setDraggable(this.unos[this.unos.length-1]);
                this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
                    gameObject.x = dragX;
                    gameObject.y = dragY;
                });
            }
        
        
        this.add.text(1600, 300-35, this.N[0][0], { color: 'black', fontFamily: 'Arial', fontSize: '70px '}).setOrigin(0.5,0);
        this.add.text(1650, 300-35, this.N[0][1], { color: 'black', fontFamily: 'Arial', fontSize: '70px '}).setOrigin(0.5,0);
        this.add.text(1600, 400-35, this.N[1][0], { color: 'black', fontFamily: 'Arial', fontSize: '70px '}).setOrigin(0.5,0);
        this.add.text(1650, 400-35, this.N[1][1], { color: 'black', fontFamily: 'Arial', fontSize: '70px '}).setOrigin(0.5,0);
        this.add.text(1500, 350-35, "-", { color: 'black', fontFamily: 'Arial', fontSize: '70px '}).setOrigin(0.5,0);
        
        this.graph.lineStyle(5, 0x000000, 1);
        this.graph.lineBetween(1500, 450, 1700, 450);
        
        var respuesta = document.createElement('input');
        respuesta.setAttribute('type'  ,'number');
        respuesta.setAttribute('id','respuestaD');
        respuesta.setAttribute('style', 'width: 50px; text-align: rigth; background-color: #04b3f3 ;');
        respuesta.setAttribute('max','9');
        respuesta.setAttribute('min','0');
        this.resD = this.add.dom(1590, 500, respuesta);
        var respuesta = document.createElement('input');
        respuesta.setAttribute('type'  ,'number');
        respuesta.setAttribute('id','respuestaU');
        respuesta.setAttribute('style', 'width: 50px; text-align: rigth;');
        respuesta.setAttribute('max','9');
        respuesta.setAttribute('min','0');
        this.resU = this.add.dom(1650, 500, respuesta);
        
        this.velD = new Array();
        this.velU = new Array();
        
        var boton = document.createElement('button');
        boton.setAttribute('type','button');
        this.element = this.add.dom(1600, 640, boton,'','Corregir');
        this.element.addListener('click');
        this.element.on('click',() => this.corregir());
        
        this.input.keyboard.on('keydown-ENTER',() => this.corregir());
        
        var boton = document.createElement('button');
        boton.setAttribute('type','button');
        this.elementA = this.add.dom(1600, 740, boton,'','Ayuda');
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
        console.log("Corregir");
        var r = (document.getElementById('respuestaD').value+document.getElementById('respuestaU').value);
        //console.log(rc);

        if(r===this.resp.toString()  || r==="0"+this.resp.toString()  ){
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
                if(i<this.N[0][0]){
                    this.velD.push([50+i*70-this.diez[i].x,550-this.diez[i].y]);
                }
                this.velD.push([50+i*70-this.diez[i].x,550-this.diez[i].y]);
            }
            for(var i=0;i<this.unos.length;i++){
                this.velU.push([50+this.diez.length*70-this.unos[i].x,296+i*60-this.unos[i].y]);
            }
            this.elementA.off('click');
            this.elementA.setVisible(false);
            
            rc++;
        }else if(rc === 2){
            rc=3;
            for(var i=0;i<this.diez.length;i++){
                this.diez[i].x+=this.velD[i][0]*delta/1000;
                this.diez[i].y+=this.velD[i][1]*delta/1000;
                if(this.diez[i].x <= (50+(i)*70) ){
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
            
            console.log("rc = "+rc);
            for(var i=0;i<this.diez.length;i++){
                console.log("N[0][0] = "+(this.N[0][0]-this.N[1][0]));
                if(i<(this.N[0][0]-this.N[1][0])){
                    this.diez[i].x=50+i*70;
                    this.diez[i].y=500;
                }else{
                    console.log("x="+this.x[1]+(i-this.N[0][0])*70);
                    this.diez[i].x=this.x[1]+(i-this.N[0][0])*70;
                    this.diez[i].y=500;
                }
                
                
            }
            for(var i=0;i<this.unos.length;i++){
                if(i<(this.N[0][1]-this.N[1][1])){
                    this.unos[i].x=50+this.diez.length*70;
                    this.unos[i].y=248+i*60;
                }else{
                    console.log("x="+(this.N[0][1]-this.N[1][1]));
                    this.unos[i].x=this.x[1];
                    this.unos[i].y=248+(i-this.N[0][1]+this.N[1][1])*60;
               //     this.diez[i].x=this.x[1]+(i-this.N[0][0])*70;
               //     this.diez[i].y=500;
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

class R2 extends Phaser.Scene{ //Restar
    constructor(){
        super({key:'R2'});
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
        this.N.push([Math.floor(Math.random()*8+2),Math.floor(Math.random()*5)]);
       
        this.N.push([Math.floor(Math.random()*(this.N[0][0]-1)+1),Math.floor(Math.random()*(5)+5)]);
        this.add.dom(960, 140, 'h2', null, "Intenta mover las imágenes");
        
        this.resp=(this.N[0][0]-this.N[1][0])*10+this.N[0][1]-this.N[1][1];
        //console.log((this.N[0][0]*10+this.N[0][1])+" + "+(this.N[1][0]*10+this.N[1][1])+" = "+this.resp);
        
        this.unos = new Array();
        this.diez = new Array();
        
        this.r =400;
        this.x=[10+40,70*(this.N[0][0]+2)+40];
        //this.graph.fillRect(Math.min(this.x[0],this.x[1])-50,250,990-Math.min(this.x[0],this.x[1]),200);
        this.graph.fillStyle(Colores[2]);
        this.graph.fillRect(10,200,70*(this.N[0][0]+1)+10,600);
        this.graph.fillRect(1550,300-35,150,80);
        this.graph.fillStyle(Colores[0]);
        this.graph.fillRect(70*(this.N[0][0]+2),200,70*(this.N[1][0]+1)+10,600);
        this.graph.fillRect(1550,400-35,150,80);
        this.graph.fillStyle(Colores[0]-(Colores[2]/2));
        this.graph.fillRect(1550,500-38,150,80);
        
        
            for(var i=0;i<this.N[0][0];i++){
                this.diez.push(this.add.image(this.x[0]+70*i ,500,'10'));
                this.diez[this.diez.length-1].setInteractive();
                this.input.setDraggable(this.diez[this.diez.length-1]);
                this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
                    gameObject.x = dragX;
                    gameObject.y = dragY;
                });
            }
        
        this.x=[70*(this.N[0][0])+50,70*(this.N[0][0]+2)+70*(this.N[1][0])+40];
        
       
            for(var i=0;i<this.N[0][1];i++){
                this.unos.push(this.add.image(this.x[0] ,248+i*63,'1'));
                this.unos[this.unos.length-1].setInteractive();
                this.input.setDraggable(this.unos[this.unos.length-1]);
                this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
                    gameObject.x = dragX;
                    gameObject.y = dragY;
                });
            }
        
        
        this.add.text(1600, 300-35, this.N[0][0], { color: 'black', fontFamily: 'Arial', fontSize: '70px '}).setOrigin(0.5,0);
        this.add.text(1650, 300-35, this.N[0][1], { color: 'black', fontFamily: 'Arial', fontSize: '70px '}).setOrigin(0.5,0);
        this.add.text(1600, 400-35, this.N[1][0], { color: 'black', fontFamily: 'Arial', fontSize: '70px '}).setOrigin(0.5,0);
        this.add.text(1650, 400-35, this.N[1][1], { color: 'black', fontFamily: 'Arial', fontSize: '70px '}).setOrigin(0.5,0);
        this.add.text(1500, 350-35, "-", { color: 'black', fontFamily: 'Arial', fontSize: '70px '}).setOrigin(0.5,0);
        
        this.graph.lineStyle(5, 0x000000, 1);
        this.graph.lineBetween(1500, 450, 1700, 450);
        
        var respuesta = document.createElement('input');
        respuesta.setAttribute('type'  ,'number');
        respuesta.setAttribute('id','respuestaD');
        respuesta.setAttribute('style', 'width: 50px; text-align: rigth; background-color: #04b3f3 ;');
        respuesta.setAttribute('max','9');
        respuesta.setAttribute('min','0');
        this.resD = this.add.dom(1590, 500, respuesta);
        var respuesta = document.createElement('input');
        respuesta.setAttribute('type'  ,'number');
        respuesta.setAttribute('id','respuestaU');
        respuesta.setAttribute('style', 'width: 50px; text-align: rigth;');
        respuesta.setAttribute('max','9');
        respuesta.setAttribute('min','0');
        this.resU = this.add.dom(1650, 500, respuesta);
        
        var respuesta = document.createElement('input');
        respuesta.setAttribute('type'  ,'number');
        respuesta.setAttribute('id','auxD');
        respuesta.setAttribute('style', 'width: 50px; text-align: rigth; background-color: #04b3f3 ;');
        respuesta.setAttribute('max','9');
        respuesta.setAttribute('min','0');
        this.add.dom(1590, 200, respuesta);
        
        var respuesta = document.createElement('input');
        respuesta.setAttribute('type'  ,'number');
        respuesta.setAttribute('id','auxU');
        respuesta.setAttribute('style', 'width: 70px; text-align: rigth;');
        respuesta.setAttribute('max','19');
        respuesta.setAttribute('min','0');
        this.add.dom(1670, 200, respuesta);
        
        this.velD = new Array();
        this.velU = new Array();
        
        var boton = document.createElement('button');
        boton.setAttribute('type','button');
        this.element = this.add.dom(1600, 640, boton,'','Corregir');
        this.element.addListener('click');
        this.element.on('click',() => this.corregir());
        
        this.input.keyboard.on('keydown-ENTER',() => this.corregir());
        
        var boton = document.createElement('button');
        boton.setAttribute('type','button');
        this.elementA = this.add.dom(1600, 740, boton,'','Ayuda');
        this.elementA.addListener('click');
        this.elementA.on('click', () => this.ayuda());
        
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
    ayuda(){
        rc++;
        document.getElementById('auxU').value=(this.N[0][1]+10);
        document.getElementById('auxD').value=(this.N[0][0]-1);
    }
    corregir(){
        console.log("Corregir");
        var r = (document.getElementById('respuestaD').value+document.getElementById('respuestaU').value);
        //console.log(rc);

        if(r===this.resp.toString()  || r==="0"+this.resp.toString()  ){
            //console.log("Correcto");
            b=0.5;
            c.play();
            this.element.setVisible(false);
            this.elementA.setVisible(false);
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
            
            this.elementA.off('click');
            this.input.keyboard.off('keydown-ENTER');
            
            rc=3;
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
                if(i<this.N[0][0]){
                    this.velD.push([50+i*70-this.diez[i].x,550-this.diez[i].y]);
                }
                this.velD.push([50+i*70-this.diez[i].x,550-this.diez[i].y]);
            }
            for(var i=0;i<this.unos.length;i++){
                this.velU.push([50+this.diez.length*70-this.unos[i].x,296+i*60-this.unos[i].y]);
            }
            this.elementA.off('click');
            this.elementA.setVisible(false);
            
            rc++;
        }else if(rc === 2){
            
            for(var i=0;i<10;i++){
                this.unos.push(this.add.image(this.x[0]-70 ,245+i*57,'1'));
                this.unos[this.unos.length-1].setInteractive();
                this.input.setDraggable(this.unos[this.unos.length-1]);
                this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
                    gameObject.x = dragX;
                    gameObject.y = dragY;
                });
            }
            console.log(this.diez[this.diez.length-1]);
            this.diez[this.diez.length-1].visible=false;
            this.diez.pop();
            console.log(this.diez);
            
            rc=0;
            /*
            for(var i=0;i<this.diez.length;i++){
                this.diez[i].x+=this.velD[i][0]*delta/1000;
                this.diez[i].y+=this.velD[i][1]*delta/1000;
                if(this.diez[i].x <= (50+(i)*70) ){
                    this.velD[i][0]=0;
                    this.velD[i][1]=0;
                    rc=3;
                }
            }
            for(var i=0;i<this.unos.length;i++){ 
                this.unos[i].x+=this.velU[i][0]*delta/1000;
                this.unos[i].y+=this.velU[i][1]*delta/1000;
            }*/
        }else if(rc === 3){
            console.log("largo unos = "+ this.unos.length);
            console.log("this.N[0][1] = "+ this.N[0][1]);
            if(this.unos.length===(this.N[0][1])){
                for(var i=0;i<10;i++){
                    this.unos.push(this.add.image(this.x[0]-70 ,245+i*57,'1'));
                    this.unos[this.unos.length-1].setInteractive();
                    this.input.setDraggable(this.unos[this.unos.length-1]);
                    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
                        gameObject.x = dragX;
                        gameObject.y = dragY;
                    });
                }
                console.log(this.diez[this.diez.length-1]);
                this.diez[this.diez.length-1].visible=false;
                this.diez.pop();
                console.log(this.diez);
            }
            
            console.log("rc = "+rc);
            for(var i=0;i<this.diez.length;i++){
                console.log("N[0][0] = "+(this.N[0][0]-this.N[1][0]));
                if(i<(this.N[0][0]-this.N[1][0]-1)){
                    this.diez[i].x=50+i*70;
                    this.diez[i].y=500;
                }else{
                    //console.log("x="+this.x[1]+(i-this.N[0][0])*70);
                    this.diez[i].x=130+this.x[0]+(i-(this.N[0][0]-this.N[1][0]-1))*70;
                    this.diez[i].y=500;
                }
                
                
            }
            for(var i=0;i<this.unos.length;i++){
                
                if(i<(this.N[0][1]-this.N[1][1]+10)){
                    this.unos[i].x=50+this.diez.length*70;
                    this.unos[i].y=248+i*60;
                }else{
                    console.log("x="+(this.N[0][1]-this.N[1][1]));
                    this.unos[i].x=this.x[1];
                    this.unos[i].y=248+(i-(this.N[0][1]-this.N[1][1]+10))*60;
               //     this.diez[i].x=this.x[1]+(i-this.N[0][0])*70;
               //     this.diez[i].y=500;
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
  scene: [menu,R2,R,RN2,RN,Q2,Q,CF2,CF ],//
  scale: {
      mode: Phaser.Scale.Fit
  },
 fps: {
        target: 30,
        forceSetTimeOut: true
    }
}

var game = new Phaser.Game(config);
