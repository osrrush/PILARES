/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
const titulo = 'Multiplicación'; //Titulo del juego
const menulabel = [['Contar'],
    ['Sumar (1)', 'Sumar (2)'],
    ['ab=ba'],
    ['5+1', '5+2','5+3','5+4', '5+4(2)'],
    ['10','10(2)','100'],
    ['Maya','Hindú','Array', 'Tradicional']]; //Opciones menú
/*
const menulabel = [['Contar 1-10','contar 11-20'],
    ['¿Qué número es?'],
    ['Sumar 1 dígito(D)', 'Sumar 2 D','Sumar 3 D'], 
    ['Restar 1 D', 'Restar 2 D','Restar 3 D'], 
    ['multiplicar 1 D', 'multiplicar 2D x 1D', 'multiplicar 2D x 2D'],
    ['Dividir 1D','Dividir 2D parte 1','Dividir 2D parte 2']]; //Opciones menú
 */

const escenas = ['C','S1','S2','ab=ba','5+n','5+n','5+n','5+n','5+4(2)','10','10(2)','100','Maya','Hindu','Array','Trad'];
const LargoM = 350; //Largo de boton en menú
const Colores = [0xd0598f,0x33a099,0xfdcf20,0x2272b4]; // Colore PILARES
const Colores2 = ['#d0598f','#33a099','#fdcf20','#2272b4']; // Colore PILARES
var a=0,b=0; //Alpha a= error b=correcto
var c,w,v; //Sonido c=correcto w=equivocado
var rc=0 ; //Contadores rc = respuesta correcta
var num;


class menu extends Phaser.Scene{
    constructor() {
		super({key:'menu'}); //, active:'true'
    }
    preload(){
        this.load.image('logo','./assets/img/logo.jpeg');
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
        
    }
    opcionPulsada(opcion) {
        console.log("opcionPulsada("+opcion+")");
        
        if(opcion<4 || opcion>8){
            
            this.scene.start(escenas[opcion]);
        }else{
            this.scene.start(escenas[opcion],{num: (opcion+2)});
        }
        
	
    }
}
class C extends Phaser.Scene{ //Cuánto Falta
    constructor(){
        super({key:'C'});
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
        
        this.n = Math.floor(Math.random()*5+1);
        this.m = Math.floor(Math.random()*10+1);
        this.resp=this.n*this.m;
        
        
        this.div = document.createElement('h1');
        this.div.style = 'font-size: 80px; ';
        this.div.innerText = "¿Cuántos cuadros hay?";
        this.add.dom(960, 100, this.div);
        
        var respuesta = document.createElement('input');
        respuesta.setAttribute('type'  ,'number');
        respuesta.setAttribute('id','R');
        respuesta.setAttribute('placeholder','R');
        respuesta.setAttribute('style','width: 100px');
        this.res = this.add.dom(960, 250, respuesta);
        
        var boton = document.createElement('button');
        boton.setAttribute('type','button');
        this.element = this.add.dom(1630, 200, boton,'','Corregir');
        this.element.addListener('click');
        this.element.on('click',() => this.corregir());
        
        this.input.keyboard.on('keydown-ENTER',() => this.corregir());
        
        this.x = 960-this.n/2*60;
        this.y = 650-this.m/2*60;
        
        
        for(var i=0;i<this.n;i++){
            for(var j=0;j<this.m;j++){
                this.add.image(this.x+i*60,this.y+j*60,'1');
            }
        }
        
        
        
        
        
        this.lienzo = this.add.graphics();
        this.lienzo.fillStyle(0xff0000);
        this.lienzo.setAlpha(0);
        this.lienzo.fillRect(0,0,1920,1080);
        
        this.lienzo2 = this.add.graphics();
        this.lienzo2.fillStyle(0x00ff00);
        this.lienzo2.setAlpha(0);
        this.lienzo2.fillRect(0,0,1920,1080);
        
        this.lienzo2.clear();
        b=0;
        this.lienzo3 = this.add.graphics();
    }
    
    corregir(){
        var resp=document.getElementById("R").value;
        if(resp === this.resp+""){
            
            this.correcto();
            console.log("correcto");
        }else{
            this.falso();
            console.log("incorrecto");
        }
    }
    correcto(){
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
    }
    falso(){
        a=0.5;
        w.play();
        this.cameras.main.shake(200,0.01);
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
class S1 extends Phaser.Scene{ //Cuánto Falta
    constructor(){
        super({key:'S1'});
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
        
        this.n = Math.floor(Math.random()*5+1);
        this.m = Math.floor(Math.random()*9+1);
        this.resp=this.n*this.m;
        
        
        this.div = document.createElement('h1');
        this.div.style = 'font-size: 80px; ';
        this.div.innerText = "¿Cuántos cuadros hay?";
        this.add.dom(960, 100, this.div);
        
        var respuesta = document.createElement('input');
        respuesta.setAttribute('type'  ,'number');
        respuesta.setAttribute('id','R');
        respuesta.setAttribute('placeholder','R');
        respuesta.setAttribute('style','width: 100px');
        this.res = this.add.dom(960, 250, respuesta);
        
        var boton = document.createElement('button');
        boton.setAttribute('type','button');
        this.element = this.add.dom(1630, 200, boton,'','Corregir');
        this.element.addListener('click');
        this.element.on('click',() => this.corregir());
        
        this.input.keyboard.on('keydown-ENTER',() => this.corregir());
        
        this.x = 100;
        this.y = 250;
        
        
        for(var i=0;i<this.m;i++){
            for(var j=0;j<this.n;j++){
                this.add.image(this.x+j*60,this.y+i*80,'1');
            }
            var data = [ 0,50, 75,50, 50,25, 75,50, 50,75, 75,50];
            var r3 = this.add.polygon(this.x+this.n*60+20, this.y+i*80-25, data);
            r3.setStrokeStyle(5, 0x000000);
            var respuesta = document.createElement('input');
            respuesta.setAttribute('type'  ,'number');
            respuesta.setAttribute('placeholder','Fila');
            respuesta.setAttribute('style','width: 100px');
            this.res = this.add.dom(this.x+this.n*60+20+150, this.y+i*80, respuesta);
        }
        
        this.div = document.createElement('h1');
        this.div.style = 'font-size: 80px; ';
        this.div.innerHTML = "&plus;";
        this.add.dom(this.x+this.n*60+20+70, this.y+this.m*40-90, this.div);
        
        
        
        this.lienzo = this.add.graphics();
        this.lienzo.fillStyle(0xff0000);
        this.lienzo.setAlpha(0);
        this.lienzo.fillRect(0,0,1920,1080);
        
        this.lienzo2 = this.add.graphics();
        this.lienzo2.fillStyle(0x00ff00);
        this.lienzo2.setAlpha(0);
        this.lienzo2.fillRect(0,0,1920,1080);
        
        this.lienzo2.clear();
        b=0;
        this.lienzo3 = this.add.graphics();
    }
    
    corregir(){
        var resp=document.getElementById("R").value;
        if(resp === this.resp+""){
            
            this.correcto();
            console.log("correcto");
        }else{
            this.falso();
            console.log("incorrecto");
        }
    }
    correcto(){
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
    }
    falso(){
        a=0.5;
        w.play();
        this.cameras.main.shake(200,0.01);
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
class S2 extends Phaser.Scene{ //Cuánto Falta
    constructor(){
        super({key:'S2'});
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
        
        this.n = Math.floor(Math.random()*5+1);
        this.m = Math.floor(Math.random()*8+2);
        this.resp=this.n*this.m;
        
        
        
        this.div = document.createElement('h1');
        this.div.style = 'font-size: 80px; ';
        this.div.innerText = "¿Cuánto es?";
        this.add.dom(960, 100, this.div);
        
        
        
        var boton = document.createElement('button');
        boton.setAttribute('type','button');
        this.element = this.add.dom(1630, 200, boton,'','Corregir');
        this.element.addListener('click');
        this.element.on('click',() => this.corregir());
        
        this.input.keyboard.on('keydown-ENTER',() => this.corregir());
        
        this.x = 960;
        this.y = 440;
        
        this.div = document.createElement('h1');
        this.div.style = 'font-size: 80px; ';
        this.div.innerHTML = this.m+"&times;"+this.n+"=";
        this.add.dom(this.x-65*this.m-80, this.y, this.div);
        
        this.div = document.createElement('h1');
        this.div.style = 'font-size: 80px; ';
        this.div.innerHTML = this.n;
        this.add.dom(this.x-65*this.m+40, this.y, this.div);
        
        for(var i=1;i<this.m;i++){
            this.div = document.createElement('h1');
            this.div.style = 'font-size: 80px; ';
            this.div.innerHTML = "&plus; "+ this.n;
            this.add.dom(this.x-65*this.m+140+130*(i-1), this.y, this.div);
        }
        this.div = document.createElement('h1');
        this.div.style = 'font-size: 80px; ';
        this.div.innerHTML = "=";
        this.add.dom(this.x+65*this.m-30, this.y, this.div);
        
        var data = [ 0,0, 25,25, 65*this.m-30-25,25, 65*this.m-30,50, 
            65*this.m-30+25,25, 130*this.m-86,25,  130*this.m-60,0, 
            130*this.m-86,25, 65*this.m-30+25,25, 65*this.m-30,50, 
            65*this.m-30-25,25, 25,25, 0,0];
        
        var r3 = this.add.polygon(this.x-20, this.y+110, data);
        r3.setStrokeStyle(5, 0x000000);
        
        this.div = document.createElement('h1');
        this.div.style = 'font-size: 80px; ';
        this.div.innerHTML = this.m+" veces";
        this.add.dom(this.x, this.y+120, this.div);
        
        
        var respuesta = document.createElement('input');
        respuesta.setAttribute('type'  ,'number');
        respuesta.setAttribute('id','R');
        respuesta.setAttribute('placeholder','R');
        respuesta.setAttribute('autofocus','autofocus');
        respuesta.setAttribute('style','width: 100px');
        this.res = this.add.dom(960+65*this.m +50, this.y+50, respuesta);
        
        
        this.lienzo = this.add.graphics();
        this.lienzo.fillStyle(0xff0000);
        this.lienzo.setAlpha(0);
        this.lienzo.fillRect(0,0,1920,1080);
        
        this.lienzo2 = this.add.graphics();
        this.lienzo2.fillStyle(0x00ff00);
        this.lienzo2.setAlpha(0);
        this.lienzo2.fillRect(0,0,1920,1080);
        
        this.lienzo2.clear();
        b=0;
        this.lienzo3 = this.add.graphics();
    }
    
    corregir(){
        var resp=document.getElementById("R").value;
        if(resp === this.resp+""){
            
            this.correcto();
            console.log("correcto");
        }else{
            this.falso();
            console.log("incorrecto");
        }
    }
    correcto(){
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
    }
    falso(){
        a=0.5;
        w.play();
        this.cameras.main.shake(200,0.01);
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
class ab extends Phaser.Scene{ //Cuánto Falta
    constructor(){
        super({key:'ab=ba'});
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
        
        this.n = Math.floor(Math.random()*4+2);
        this.m = Math.floor(Math.random()*4+2);
        this.resp=this.n*this.m;
        
        
        this.div = document.createElement('h1');
        this.div.style = 'font-size: 80px; ';
        this.div.innerText = "¿Cuántos cuadros hay?";
        this.add.dom(960, 100, this.div);
        
        
        
        var boton = document.createElement('button');
        boton.setAttribute('type','button');
        this.element = this.add.dom(1630, 200, boton,'','Corregir');
        this.element.addListener('click');
        this.element.on('click',() => this.corregir());
        
        this.input.keyboard.on('keydown-ENTER',() => this.corregir());
        
        this.x = 300;
        this.y = 350;
        
        
        for(var i=0;i<this.n;i++){
            for(var j=0;j<this.m;j++){
                this.add.image(this.x+i*80,this.y+j*80,'1');
            }
            
        }
        var data = [ 0,50, 75,50, 50,25, 75,50, 50,75, 75,50];
        for(var j=0;j<this.m;j++){
            
            var r3 = this.add.polygon(this.x+this.n*80+20, this.y+j*80-25, data);
            r3.setStrokeStyle(5, 0x000000);
            this.div = document.createElement('h1');
            this.div.style = 'font-size: 80px; ';
            this.div.innerText = this.n;
            this.add.dom(this.x+this.n*80+150, this.y+j*80-60, this.div);
        }
        this.div = document.createElement('h1');
            this.div.style = 'font-size: 80px; ';
            this.div.innerHTML = "&plus;";
            this.add.dom(this.x+this.n*80+100, this.y+this.m*40-100, this.div);
        var data = [ 0,0, 150,0];
            var r3 = this.add.polygon(this.x+this.n*80+150, this.y+this.m*80-40, data);
            r3.setStrokeStyle(5, 0x000000);
            
        var data = [ 0,0, 25,25, 25,this.m*40-25, 50,this.m*40, 25,this.m*40+25, 
                    25,this.m*80-25, 0,this.m*80, 25,this.m*80-25, 
                    25,this.m*40+25, 50,this.m*40, 25,this.m*40-25, 25,25,  0,0];
            var r3 = this.add.polygon(this.x+this.n*80+190, this.y+this.m*40-46, data);
            r3.setStrokeStyle(5, 0x000000);
        this.div = document.createElement('h1');
            this.div.style = 'font-size: 80px; ';
            this.div.innerHTML = this.m+"&times;"+this.n;
            this.add.dom(this.x+this.n*80+300, this.y+this.m*40-100, this.div);
        
        
        var data = [ 50,0, 50,75, 25,50, 50,75, 75,50, 50,75];
        for(var i=0;i<this.n;i++){
            var r3 = this.add.polygon(this.x+i*80-25,this.y+this.m*80, data);
            r3.setStrokeStyle(5, 0x000000);
            this.div = document.createElement('h1');
            this.div.style = 'font-size: 80px; ';
            this.div.innerText = this.m;
            this.add.dom(this.x+i*80,this.y+this.m*80+20, this.div);
            this.div = document.createElement('h1');
            this.div.style = 'font-size: 50px; ';
            if(i<this.n-1){
                this.div.innerText = "+";
            }else{
                this.div.innerText = "=";
            }
            
            this.add.dom(this.x+i*80+40,this.y+this.m*80+40, this.div);
        }
        
        var data = [ 0,0, 25,25, 38*this.n-25,25, 38*this.n,50, 
            38*this.n+25,25, 76*this.n-25,25,  76*this.n,0, 
            76*this.n-25,25, 38*this.n+25,25, 38*this.n,50, 
            38*this.n-25,25, 25,25, 0,0];
        
        var r3 = this.add.polygon(this.x+38*this.n-30,this.y+this.m*80+120, data);
        r3.setStrokeStyle(5, 0x000000);
        
         this.div = document.createElement('h1');
            this.div.style = 'font-size: 80px; ';
            this.div.innerHTML = this.n+"&times;"+this.m;
            this.add.dom(this.x+38*this.n-30,this.y+this.m*80+120, this.div);
        
        var respuesta = document.createElement('input');
        respuesta.setAttribute('type'  ,'number');
        respuesta.setAttribute('id','R');
        respuesta.setAttribute('placeholder','R');
        respuesta.setAttribute('style','width: 100px');
        this.res = this.add.dom(this.x+this.n*80+150, this.y+this.m*80+60, respuesta);
        
        this.lienzo = this.add.graphics();
        this.lienzo.fillStyle(0xff0000);
        this.lienzo.setAlpha(0);
        this.lienzo.fillRect(0,0,1920,1080);
        
        this.lienzo2 = this.add.graphics();
        this.lienzo2.fillStyle(0x00ff00);
        this.lienzo2.setAlpha(0);
        this.lienzo2.fillRect(0,0,1920,1080);
        
        this.lienzo2.clear();
        b=0;
        this.lienzo3 = this.add.graphics();
    }
    
    corregir(){
        var resp=document.getElementById("R").value;
        if(resp === this.resp+""){
            
            this.correcto();
            console.log("correcto");
        }else{
            this.falso();
            console.log("incorrecto");
        }
    }
    correcto(){
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
    }
    falso(){
        a=0.5;
        w.play();
        this.cameras.main.shake(200,0.01);
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
class N5 extends Phaser.Scene{ //Cuánto Falta
    constructor(){
        super({key:'5+n'});
        this.resp;
        
    }
    init(data){
        this.n=data.num;
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
        
        //this.n = 6;
        this.m = Math.floor(Math.random()*10+1);
        //this.m = 10;
        this.resp=this.n*this.m;
        
        
        this.div = document.createElement('h1');
        this.div.style = 'font-size: 80px; ';
        this.div.innerText = "¿Cuántos cuadros hay?";
        this.add.dom(960, 100, this.div);
        
        var respuesta = document.createElement('input');
        respuesta.setAttribute('type'  ,'number');
        respuesta.setAttribute('id','R');
        respuesta.setAttribute('placeholder','R');
        respuesta.setAttribute('style','width: 100px');
        this.res = this.add.dom(960, 250, respuesta);
        
        var boton = document.createElement('button');
        boton.setAttribute('type','button');
        this.element = this.add.dom(1630, 200, boton,'','Corregir');
        this.element.addListener('click');
        this.element.on('click',() => this.corregir());
        
        this.input.keyboard.on('keydown-ENTER',() => this.corregir());
        
        this.x = 100;
        this.y = 350;
        
        
        for(var i=0;i<this.n;i++){
            for(var j=0;j<this.m;j++){
                this.add.image(this.x+i*60+60*Math.floor(i/5),this.y+j*60,'1');
            }
        }
        this.graph.fillStyle(Colores[2]);
        this.graph.fillRect(this.x-60, this.y-60, 5*60+60, this.m*60+60);
        this.graph.fillStyle(Colores[3]);
        this.graph.fillRect(this.x+5*60, this.y-60, 60+60*(this.n-5), this.m*60+60);
        this.add.text(this.x+(30*5-30+60*5+60)/2, this.y-130, this.n+'x'+this.m, { color: 'black', fontFamily: 'Arial', fontSize: '70px '}).setOrigin(0.5,0);
        this.add.text(this.x+30*5-30, this.y+this.m*60, '5x'+this.m, { color: Colores2[2], fontFamily: 'Arial', fontSize: '70px '}).setOrigin(0.5,0);
        this.add.text(this.x+60*5+60, this.y+this.m*60, (this.n-5)+'x'+this.m, { color: Colores2[3], fontFamily: 'Arial', fontSize: '70px '}).setOrigin(0.5,0);
        
        this.div = document.createElement('div');
        this.div.style = 'font-size: 80px; ';
        this.div.innerHTML = this.n+"&times;"+this.m+"=(<span style='color: "+Colores2[2]+"'>5</span >&plus;<span style='color: "+Colores2[3]+"'>"+(this.n-5)+"</span>)&times"+this.m+"=<span style='color: "+Colores2[2]+"'>5&times;"+this.m+"</span>&plus;<span style='color: "+Colores2[3]+"'>"+(this.n-5)+"&times;"+this.m+"</span>";
        this.add.dom(1100, 400, this.div);
        
        this.div = document.createElement('div');
        this.div.style = 'font-size: 100px; ';
        this.div.innerHTML = "<span style='color: "+Colores2[2]+"'>5&times;"+this.m+"</span>=";
        this.add.dom(1100, 500, this.div);
        
        this.div = document.createElement('div');
        this.div.style = 'font-size: 100px; ';
        this.div.innerHTML = "<span style='color: "+Colores2[3]+"'>"+(this.n-5)+"&times;"+this.m+"</span>=";
        this.add.dom(1100, 600, this.div);
        
        var respuesta = document.createElement('input');
        respuesta.setAttribute('type'  ,'number');
        respuesta.setAttribute('placeholder','R');
        respuesta.setAttribute('style','width: 100px');
        this.res = this.add.dom(1300, 500, respuesta);
        
        var respuesta = document.createElement('input');
        respuesta.setAttribute('type'  ,'number');
        respuesta.setAttribute('placeholder','R');
        respuesta.setAttribute('style','width: 100px');
        this.res = this.add.dom(1300, 600, respuesta);
        
        this.lienzo = this.add.graphics();
        this.lienzo.fillStyle(0xff0000);
        this.lienzo.setAlpha(0);
        this.lienzo.fillRect(0,0,1920,1080);
        
        this.lienzo2 = this.add.graphics();
        this.lienzo2.fillStyle(0x00ff00);
        this.lienzo2.setAlpha(0);
        this.lienzo2.fillRect(0,0,1920,1080);
        
        this.lienzo2.clear();
        b=0;
        this.lienzo3 = this.add.graphics();
    }
    
    corregir(){
        var resp=document.getElementById("R").value;
        if(resp === this.resp+""){
            
            this.correcto();
            console.log("correcto");
        }else{
            this.falso();
            console.log("incorrecto");
        }
    }
    correcto(){
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
    }
    falso(){
        a=0.5;
        w.play();
        this.cameras.main.shake(200,0.01);
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
class nueve extends Phaser.Scene{ //Cuánto Falta
    constructor(){
        super({key:'5+4(2)'});
        this.resp;
        
    }
    
    preload(){
        this.load.audio('correct', './assets/sounds/correct.mp3');
        this.load.audio('wrong', './assets/sounds/wrong.mp3');
        this.load.image('logo','./assets/img/logo.jpeg');
        this.load.image('P','./assets/img/P.png');
        
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
        
        this.n = 9;
        this.m = Math.floor(Math.random()*10+1);
        this.resp=this.n*this.m;
        
        
        this.div = document.createElement('h1');
        this.div.style = 'font-size: 80px; ';
        this.div.innerHTML = "¿Cuánto es "+this.n+"&times;"+this.m+"?";
        this.add.dom(960, 100, this.div);
        
        var respuesta = document.createElement('input');
        respuesta.setAttribute('type'  ,'number');
        respuesta.setAttribute('id','R');
        respuesta.setAttribute('placeholder','R');
        respuesta.setAttribute('style','width: 100px');
        this.res = this.add.dom(960, 250, respuesta);
        
        var boton = document.createElement('button');
        boton.setAttribute('type','button');
        this.element = this.add.dom(1630, 200, boton,'','Corregir');
        this.element.addListener('click');
        this.element.on('click',() => this.corregir());
        
        this.input.keyboard.on('keydown-ENTER',() => this.corregir());
        
        this.x = 960-10/2*100;
        this.y = 550;
        
        
        for(var i=0;i<10;i++){
            var p = this.add.image(this.x+i*100,this.y,'P');
            if(i<this.m-1){
                p.setTint(0x0000ff);
            }else if(i === this.m-1){
                p.setTint(0xff00ff);
            }
        }
        
        this.lienzo = this.add.graphics();
        this.lienzo.fillStyle(0xff0000);
        this.lienzo.setAlpha(0);
        this.lienzo.fillRect(0,0,1920,1080);
        
        this.lienzo2 = this.add.graphics();
        this.lienzo2.fillStyle(0x00ff00);
        this.lienzo2.setAlpha(0);
        this.lienzo2.fillRect(0,0,1920,1080);
        
        this.lienzo2.clear();
        b=0;
        this.lienzo3 = this.add.graphics();
    }
    
    corregir(){
        var resp=document.getElementById("R").value;
        if(resp === this.resp+""){
            
            this.correcto();
            console.log("correcto");
        }else{
            this.falso();
            console.log("incorrecto");
        }
    }
    correcto(){
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
    }
    falso(){
        a=0.5;
        w.play();
        this.cameras.main.shake(200,0.01);
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
class D extends Phaser.Scene{ //Cuánto Falta
    constructor(){
        super({key:'10'});
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
        
        this.n = 10;
        this.m = Math.floor(Math.random()*10+1);
        
        this.resp=this.n*this.m;
        
        
        this.div = document.createElement('h1');
        this.div.style = 'font-size: 80px; ';
        this.div.innerHTML = "¿Cuánto es "+this.n+"&times;"+this.m+"?";
        this.add.dom(960, 100, this.div);
        
        var respuesta = document.createElement('input');
        respuesta.setAttribute('type'  ,'number');
        respuesta.setAttribute('id','R');
        respuesta.setAttribute('placeholder','R');
        respuesta.setAttribute('style','width: 100px');
        this.res = this.add.dom(960, 250, respuesta);
        
        var boton = document.createElement('button');
        boton.setAttribute('type','button');
        this.element = this.add.dom(1630, 200, boton,'','Corregir');
        this.element.addListener('click');
        this.element.on('click',() => this.corregir());
        
        this.input.keyboard.on('keydown-ENTER',() => this.corregir());
        
        this.x = 960-10/2*100;
        this.y = 350;
        
        
        for(var i=0;i<this.m;i++){
            for(var j=0;j<10;j++){
                this.add.image(this.x+i*100,this.y+60*j,'1');
            }
            this.graph.fillStyle(Colores[3]);
            this.graph.fillRect(this.x+i*100-40,this.y-40,80,620);
        }
        
        this.lienzo = this.add.graphics();
        this.lienzo.fillStyle(0xff0000);
        this.lienzo.setAlpha(0);
        this.lienzo.fillRect(0,0,1920,1080);
        
        this.lienzo2 = this.add.graphics();
        this.lienzo2.fillStyle(0x00ff00);
        this.lienzo2.setAlpha(0);
        this.lienzo2.fillRect(0,0,1920,1080);
        
        this.lienzo2.clear();
        b=0;
        this.lienzo3 = this.add.graphics();
    }
    
    corregir(){
        var resp=document.getElementById("R").value;
        if(resp === this.resp+""){
            
            this.correcto();
            console.log("correcto");
        }else{
            this.falso();
            console.log("incorrecto");
        }
    }
    correcto(){
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
    }
    falso(){
        a=0.5;
        w.play();
        this.cameras.main.shake(200,0.01);
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
class D2 extends Phaser.Scene{ //Cuánto Falta
    constructor(){
        super({key:'10(2)'});
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
        
        this.n = 10;
        this.m = Math.floor(Math.random()*100+1);
        
        this.resp=this.n*this.m;
        
        
        this.div = document.createElement('h1');
        this.div.style = 'font-size: 80px; ';
        this.div.innerHTML = "¿Cuánto es "+this.n+"&times;"+this.m+"?";
        this.add.dom(960, 100, this.div);
        
        var respuesta = document.createElement('input');
        respuesta.setAttribute('type'  ,'number');
        respuesta.setAttribute('id','R');
        respuesta.setAttribute('placeholder','R');
        respuesta.setAttribute('style','width: 100px');
        this.res = this.add.dom(960, 250, respuesta);
        
        var boton = document.createElement('button');
        boton.setAttribute('type','button');
        this.element = this.add.dom(1630, 200, boton,'','Corregir');
        this.element.addListener('click');
        this.element.on('click',() => this.corregir());
        
        this.input.keyboard.on('keydown-ENTER',() => this.corregir());
        
        this.x = 960-10/2*100;
        this.y = 350;
        
        this.lienzo = this.add.graphics();
        this.lienzo.fillStyle(0xff0000);
        this.lienzo.setAlpha(0);
        this.lienzo.fillRect(0,0,1920,1080);
        
        this.lienzo2 = this.add.graphics();
        this.lienzo2.fillStyle(0x00ff00);
        this.lienzo2.setAlpha(0);
        this.lienzo2.fillRect(0,0,1920,1080);
        
        this.lienzo2.clear();
        b=0;
        this.lienzo3 = this.add.graphics();
    }
    
    corregir(){
        var resp=document.getElementById("R").value;
        if(resp === this.resp+""){
            
            this.correcto();
            console.log("correcto");
        }else{
            this.falso();
            console.log("incorrecto");
        }
    }
    correcto(){
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
    }
    falso(){
        a=0.5;
        w.play();
        this.cameras.main.shake(200,0.01);
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
class CIEN extends Phaser.Scene{ //Cuánto Falta
    constructor(){
        super({key:'100'});
        this.resp;
        
    }
    
    preload(){
        this.load.audio('correct', './assets/sounds/correct.mp3');
        this.load.audio('wrong', './assets/sounds/wrong.mp3');
        this.load.image('logo','./assets/img/logo.jpeg');
       
        
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
        
        v = this.sound.add('correct',{loop:false});
        w = this.sound.add('wrong',{loop:false});
        
        
        
        this.n = 100;
        this.m =  Math.floor(Math.random()*100+1);
        
        
        this.resp=this.n*this.m;
        
        
        
        this.div = document.createElement('h1');
        this.div.style = 'font-size: 80px; ';
        this.div.innerHTML = "¿Cuánto es "+this.n+"&times;"+this.m+"?";
        this.add.dom(960, 100, this.div);
        
        var respuesta = document.createElement('input');
        respuesta.setAttribute('type'  ,'number');
        respuesta.setAttribute('id','R');
        respuesta.setAttribute('placeholder','R');
        respuesta.setAttribute('style','width: 150px');
        this.res = this.add.dom(960, 250, respuesta);
        
        var boton = document.createElement('button');
        boton.setAttribute('type','button');
        this.element = this.add.dom(1630, 200, boton,'','Corregir');
        this.element.addListener('click');
        this.element.on('click',() => this.corregir());
        
        this.input.keyboard.on('keydown-ENTER',() => this.corregir());
        
        this.x = 960;
        this.y = 300;
        
        this.div = document.createElement('h1');
        this.div.style = 'font-size: 80px; ';
        this.div.innerHTML = this.m+" &times; 100=";
        this.add.dom(960, 300, this.div);
        
        this.div = document.createElement('h1');
        this.div.style = 'font-size: 80px; ';
        this.div.innerHTML = this.m+" &times; 10 &times; 10 =";
        this.add.dom(960, 400, this.div);
        
        this.div = document.createElement('h1');
        this.div.style = 'font-size: 80px; ';
        this.div.innerHTML = "  &times; 10 =";
        this.add.dom(1100, 500, this.div);
        
        var respuesta = document.createElement('input');
        respuesta.setAttribute('type'  ,'number');
        respuesta.setAttribute('placeholder',this.m+'x10');
        respuesta.setAttribute('style','width: 150px');
        this.add.dom(900, 550, respuesta);
        
        
        this.lienzo = this.add.graphics();
        this.lienzo.fillStyle(0xff0000);
        this.lienzo.setAlpha(0);
        this.lienzo.fillRect(0,0,1920,1080);
        
        this.lienzo2 = this.add.graphics();
        this.lienzo2.fillStyle(0x00ff00);
        this.lienzo2.setAlpha(0);
        this.lienzo2.fillRect(0,0,1920,1080);
        
        this.lienzo2.clear();
        b=0;
        this.lienzo3 = this.add.graphics();
    }
    
    corregir(){
        var resp=document.getElementById("R").value;
        if(resp === this.resp+""){
            
            this.correcto();
            console.log("correcto");
        }else{
            this.falso();
            console.log("incorrecto");
        }
    }
    correcto(){
        b=0.5;
        v.play();
        this.lienzo3 = this.add.graphics();
            this.lienzo3.fillStyle(0x03A9F4);
            this.lienzo3.fillRect(1300,50,300,90);
            this.opc= this.add.text(1450, 95, '¿OTRO?', { color: 'black', fontFamily: 'Arial', fontSize: '50px '}).setOrigin(0.5,0.5);

            const otro = this.add.zone(1300, 50, 300,100);
            otro.setOrigin(0);
            otro.setInteractive();
            otro.on('pointerdown', () => this.opcionPulsada('otro'));
    }
    falso(){
        a=0.5;
        w.play();
        this.cameras.main.shake(200,0.01);
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
class maya extends Phaser.Scene{ //Cuánto Falta
    constructor(){
        super({key:'Maya'});
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
        
        v = this.sound.add('correct',{loop:false});
        w = this.sound.add('wrong',{loop:false});
        
        var a = Math.floor(Math.random()*5+1);
        var b = Math.floor(Math.random()*4+1);
        var c = Math.floor(Math.random()*(10/b-1)+1);
        
        this.n = a*10+b;
        
        var aux = Math.min((10/b),((10-b*c)/a));
        
        var d = Math.floor(Math.random()*(aux-1)+1);
        this.m =  c*10+d;
        console.log("10/b = "+(10/b));
        console.log("(10-b*c)/a = "+((10-b*c)/a));
        console.log("aux = "+aux);
        
        //a = b = c = d =1;
        
        this.resp=this.n*this.m;
        
        
        
        this.div = document.createElement('h1');
        this.div.style = 'font-size: 80px; ';
        this.div.innerHTML = "¿Cuánto es "+this.n+"&times;"+this.m+"?";
        this.add.dom(960, 100, this.div);
        
        var respuesta = document.createElement('input');
        respuesta.setAttribute('type'  ,'number');
        respuesta.setAttribute('id','R');
        respuesta.setAttribute('placeholder','R');
        respuesta.setAttribute('style','width: 150px');
        this.res = this.add.dom(960, 250, respuesta);
        
        var boton = document.createElement('button');
        boton.setAttribute('type','button');
        this.element = this.add.dom(1630, 200, boton,'','Corregir');
        this.element.addListener('click');
        this.element.on('click',() => this.corregir());
        
        this.input.keyboard.on('keydown-ENTER',() => this.corregir());
        
        
        this.y = 300;
        var tam=35*11;
        this.x = 860-tam;
        
        this.graph.lineStyle(7, Colores[3], 1);
        for(var i=0; i<a;i++){
            this.graph.lineBetween(this.x+10+30*i, this.y+30*i, this.x+10+30*i-tam, this.y+30*i+tam);
        }
        for(var i=0; i<c;i++){
            this.graph.lineBetween(this.x-10-30*i, this.y+30*i, this.x-10-30*i+tam, this.y+30*i+tam);
        }
        this.graph.lineStyle(8, 0x000000, 1);
        
        for(var i=0; i<b;i++){
            this.graph.lineBetween(this.x+tam-30*i-10, this.y+tam-30*i-20, this.x-30*i-10, this.y+2*tam-30*i-20);
        }
        for(var i=0; i<d;i++){
            this.graph.lineBetween(this.x+30*i-tam+10, this.y+tam-30*i-20, this.x+30*i+10, this.y+2*tam-30*i-20);
        }
        
        this.div = document.createElement('h1');
        this.div.style = 'font-size: 80px;  ';
        this.div.innerHTML = "10&times;10";
        this.add.dom(1150, 400, this.div);
        
        this.graph.lineStyle(5, Colores[3], 1);
        this.graph.lineBetween(1325, 425, 1375, 475);
        this.graph.lineBetween(1375, 425, 1325, 475);
        
        var respuesta = document.createElement('input');
        respuesta.setAttribute('type'  ,'number');
        respuesta.setAttribute('placeholder',"100's");
        respuesta.setAttribute('style','width: 150px; text-align: rigth;');
        this.add.dom(1500, 450, respuesta);
        
        this.div = document.createElement('h1');
        this.div.style = 'font-size: 80px; ';
        this.div.innerHTML = "10&times;1";
        this.add.dom(1150, 500, this.div);
        
        this.graph.lineBetween(1325, 525, 1375, 575);
        this.graph.lineStyle(5, 0x000000, 1);
        this.graph.lineBetween(1375, 525, 1325, 575);
        
        var respuesta = document.createElement('input');
        respuesta.setAttribute('type'  ,'number');
        respuesta.setAttribute('placeholder',"10's");
        respuesta.setAttribute('style','width: 150px; text-align: rigth;');
        this.add.dom(1500, 550, respuesta);
        
        
        this.div = document.createElement('h1');
        this.div.style = 'font-size: 80px; ';
        this.div.innerHTML = "1&times;1";
        this.add.dom(1150, 600, this.div);
        
        this.graph.lineBetween(1325, 625, 1375, 675);
        this.graph.lineBetween(1375, 625, 1325, 675);
        
        var respuesta = document.createElement('input');
        respuesta.setAttribute('type'  ,'number');
        respuesta.setAttribute('placeholder',"1's");
        respuesta.setAttribute('style','width: 150px; text-align: rigth;');
        this.add.dom(1500, 650, respuesta);
        
        
        
        this.lienzo = this.add.graphics();
        this.lienzo.fillStyle(0xff0000);
        this.lienzo.setAlpha(0);
        this.lienzo.fillRect(0,0,1920,1080);
        
        this.lienzo2 = this.add.graphics();
        this.lienzo2.fillStyle(0x00ff00);
        this.lienzo2.setAlpha(0);
        this.lienzo2.fillRect(0,0,1920,1080);
        
        this.lienzo2.clear();
        b=0;
        this.lienzo3 = this.add.graphics();
    }
    
    corregir(){
        var resp=document.getElementById("R").value;
        if(resp === this.resp+""){
            
            this.correcto();
            console.log("correcto");
        }else{
            this.falso();
            console.log("incorrecto");
        }
    }
    correcto(){
        b=0.5;
        v.play();
        this.lienzo3 = this.add.graphics();
            this.lienzo3.fillStyle(0x03A9F4);
            this.lienzo3.fillRect(1300,50,300,90);
            this.opc= this.add.text(1450, 95, '¿OTRO?', { color: 'black', fontFamily: 'Arial', fontSize: '50px '}).setOrigin(0.5,0.5);

            const otro = this.add.zone(1300, 50, 300,100);
            otro.setOrigin(0);
            otro.setInteractive();
            otro.on('pointerdown', () => this.opcionPulsada('otro'));
    }
    falso(){
        a=0.5;
        w.play();
        this.cameras.main.shake(200,0.01);
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
class hindu extends Phaser.Scene{ //Cuánto Falta
    constructor(){
        super({key:'Hindu'});
        this.resp;
        
    }
    
    preload(){
        this.load.audio('correct', './assets/sounds/correct.mp3');
        this.load.audio('wrong', './assets/sounds/wrong.mp3');
        this.load.image('logo','./assets/img/logo.jpeg');
        this.load.image('P','./assets/img/P.png');
        
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
        
        v = this.sound.add('correct',{loop:false});
        w = this.sound.add('wrong',{loop:false});
        
        var a = Math.floor(Math.random()*9+1);
        var b = Math.floor(Math.random()*9+1);
        var c = Math.floor(Math.random()*9+1);
        
        this.n = a*10+b;
        
               
        var d = Math.floor(Math.random()*9+1);
        this.m =  c*10+d;
        
        
        //a = b = c = d =1;
        
        this.resp=this.n*this.m;
        
        
        
        this.div = document.createElement('h1');
        this.div.style = 'font-size: 80px; ';
        this.div.innerHTML = "¿Cuánto es "+this.n+"&times;"+this.m+"?";
        this.add.dom(960, 100, this.div);
        
        var respuesta = document.createElement('input');
        respuesta.setAttribute('type'  ,'number');
        respuesta.setAttribute('id','R');
        respuesta.setAttribute('placeholder','R');
        respuesta.setAttribute('style','width: 150px');
        this.res = this.add.dom(960, 250, respuesta);
        
        var boton = document.createElement('button');
        boton.setAttribute('type','button');
        this.element = this.add.dom(1630, 200, boton,'','Corregir');
        this.element.addListener('click');
        this.element.on('click',() => this.corregir());
        
        this.input.keyboard.on('keydown-ENTER',() => this.corregir());
        
        
        this.y = 400;
        var tam=120;
        this.x = 960-3*tam/2;
        
        for(var i=1;i<4;i++){
            for(var j=0;j<3;j++){
                if(!(i===0 && j===0) && !(i===3 && j===3) && !(i===0 && j===3) &&!(i===3 && j===0)){
                    var imagen = this.add.image(this.x+i*tam,this.y+j*tam,'P');
                    imagen.displayWidth = tam;
                    imagen.displayHeight = tam;
                }
            }
            
        }
         var respuesta = document.createElement('input');
        respuesta.setAttribute('type'  ,'number');
        respuesta.setAttribute('style','width: 20px; font-size: 30px;');
        this.add.dom(this.x+3*tam/4, this.y+3*tam/4, respuesta);
        
         var respuesta = document.createElement('input');
        respuesta.setAttribute('type'  ,'number');
        respuesta.setAttribute('style','width: 20px; font-size: 30px;');
        this.add.dom(this.x+3*tam/4+tam, this.y+3*tam/4, respuesta);
        
         var respuesta = document.createElement('input');
        respuesta.setAttribute('type'  ,'number');
        respuesta.setAttribute('style','width: 20px; font-size: 30px;');
        this.add.dom(this.x+3*tam/4, this.y+3*tam/4+tam, respuesta);
        
         var respuesta = document.createElement('input');
        respuesta.setAttribute('type'  ,'number');
        respuesta.setAttribute('style','width: 20px; font-size: 30px;');
        this.add.dom(this.x+3*tam/4+tam, this.y+3*tam/4+tam, respuesta);
        
        
        //abajo
         var respuesta = document.createElement('input');
        respuesta.setAttribute('type'  ,'number');
        respuesta.setAttribute('style','width: 20px; font-size: 30px;');
        this.add.dom(this.x+3*tam/4+tam/2, this.y+3*tam/4+tam/2, respuesta);
        
         var respuesta = document.createElement('input');
        respuesta.setAttribute('type'  ,'number');
        respuesta.setAttribute('style','width: 20px; font-size: 30px;');
        this.add.dom(this.x+3*tam/4+tam+tam/2, this.y+3*tam/4+tam/2, respuesta);
        
         var respuesta = document.createElement('input');
        respuesta.setAttribute('type'  ,'number');
        respuesta.setAttribute('style','width: 20px; font-size: 30px;');
        this.add.dom(this.x+3*tam/4+tam/2, this.y+3*tam/4+tam+tam/2, respuesta);
        
         var respuesta = document.createElement('input');
        respuesta.setAttribute('type'  ,'number');
        respuesta.setAttribute('style','width: 20px; font-size: 30px;');
        this.add.dom(this.x+3*tam/4+tam+tam/2, this.y+3*tam/4+tam+tam/2, respuesta);
        
        
         var respuesta = document.createElement('input');
        respuesta.setAttribute('type'  ,'number');
        respuesta.setAttribute('style','width: 50px;');
        this.add.dom(this.x, this.y+tam, respuesta);
         var respuesta = document.createElement('input');
        respuesta.setAttribute('type'  ,'number');
        respuesta.setAttribute('style','width: 50px;');
        this.add.dom(this.x, this.y+2*tam, respuesta);
        
        var respuesta = document.createElement('input');
        respuesta.setAttribute('type'  ,'number');
        respuesta.setAttribute('style','width: 50px;');
        this.add.dom(this.x+tam, this.y+3*tam, respuesta);
        var respuesta = document.createElement('input');
        respuesta.setAttribute('type'  ,'number');
        respuesta.setAttribute('style','width: 50px;');
        this.add.dom(this.x+2*tam, this.y+3*tam, respuesta);
        
        
        this.div = document.createElement('h1');
        this.div.style = 'font-size: 80px;  ';
        this.div.innerHTML = a;
        this.add.dom(this.x+tam, this.y-tam/2, this.div);
        
        this.div = document.createElement('h1');
        this.div.style = 'font-size: 80px;  ';
        this.div.innerHTML = b;
        this.add.dom(this.x+2*tam, this.y-tam/2, this.div);
        
        this.div = document.createElement('h1');
        this.div.style = 'font-size: 80px;  ';
        this.div.innerHTML = "X";
        this.add.dom(this.x+3*tam, this.y-tam/2, this.div);
        
        this.div = document.createElement('h1');
        this.div.style = 'font-size: 80px;  ';
        this.div.innerHTML = c;
        this.add.dom(this.x+3*tam, this.y-tam/2+tam, this.div);
        
        this.div = document.createElement('h1');
        this.div.style = 'font-size: 80px;  ';
        this.div.innerHTML = d;
        this.add.dom(this.x+3*tam, this.y-tam/2+2*tam, this.div);
        
        this.lineas = this.add.graphics();
        this.lineas.lineStyle(5, 0x000000, 1);
        this.lineas.lineBetween(this.x +tam/2+tam,this.y+tam/2 , this.x+tam/2,this.y+tam/2+tam );
        this.lineas.lineBetween(this.x +tam/2+2*tam,this.y+tam/2 , this.x+tam/2,this.y+tam/2+2*tam );
        this.lineas.lineBetween(this.x +tam/2+2*tam,this.y+tam/2+tam , this.x+3*tam/2,this.y+tam/2+2*tam );
        this.lienzo = this.add.graphics();
        this.lienzo.fillStyle(0xff0000);
        this.lienzo.setAlpha(0);
        this.lienzo.fillRect(0,0,1920,1080);
        
        this.lienzo2 = this.add.graphics();
        this.lienzo2.fillStyle(0x00ff00);
        this.lienzo2.setAlpha(0);
        this.lienzo2.fillRect(0,0,1920,1080);
        
        this.lienzo2.clear();
        b=0;
        this.lienzo3 = this.add.graphics();
        
        console.log(this);
    }
    
    corregir(){
        var resp=document.getElementById("R").value;
        if(resp === this.resp+""){
            
            this.correcto();
            console.log("correcto");
        }else{
            this.falso();
            console.log("incorrecto");
        }
    }
    correcto(){
        b=0.5;
        v.play();
        this.lienzo3 = this.add.graphics();
            this.lienzo3.fillStyle(0x03A9F4);
            this.lienzo3.fillRect(1300,50,300,90);
            this.opc= this.add.text(1450, 95, '¿OTRO?', { color: 'black', fontFamily: 'Arial', fontSize: '50px '}).setOrigin(0.5,0.5);

            const otro = this.add.zone(1300, 50, 300,100);
            otro.setOrigin(0);
            otro.setInteractive();
            otro.on('pointerdown', () => this.opcionPulsada('otro'));
    }
    falso(){
        a=0.5;
        w.play();
        this.cameras.main.shake(200,0.01);
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
class array extends Phaser.Scene{ //Cuánto Falta
    constructor(){
        super({key:'Array'});
        this.resp;
        
    }
    
    preload(){
        this.load.audio('correct', './assets/sounds/correct.mp3');
        this.load.audio('wrong', './assets/sounds/wrong.mp3');
        this.load.image('logo','./assets/img/logo.jpeg');
        this.load.image('P','./assets/img/P.png');
        
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
        
        v = this.sound.add('correct',{loop:false});
        w = this.sound.add('wrong',{loop:false});
        
        var a = Math.floor(Math.random()*9+1);
        var b = Math.floor(Math.random()*9+1);
        var c = Math.floor(Math.random()*9+1);
        
        this.n = a*10+b;
        
               
        var d = Math.floor(Math.random()*9+1);
        this.m =  c*10+d;
        
        
        //a = b = c = d =1;
        
        this.resp=this.n*this.m;
        
        
        
        this.div = document.createElement('h1');
        this.div.style = 'font-size: 80px; ';
        this.div.innerHTML = "¿Cuánto es "+this.n+"&times;"+this.m+"?";
        this.add.dom(960, 100, this.div);
        
        var respuesta = document.createElement('input');
        respuesta.setAttribute('type'  ,'number');
        respuesta.setAttribute('id','R');
        respuesta.setAttribute('placeholder','R');
        respuesta.setAttribute('style','width: 150px');
        this.res = this.add.dom(960, 250, respuesta);
        
        var boton = document.createElement('button');
        boton.setAttribute('type','button');
        this.element = this.add.dom(1630, 200, boton,'','Corregir');
        this.element.addListener('click');
        this.element.on('click',() => this.corregir());
        
        this.input.keyboard.on('keydown-ENTER',() => this.corregir());
        
        
        this.y = 400;
        var tam=120;
        this.x = 960-3*tam/2;
        
        for(var i=1;i<4;i++){
            for(var j=0;j<3;j++){
                if(!(i===0 && j===0) && !(i===3 && j===3) && !(i===0 && j===3) &&!(i===3 && j===0)){
                    var imagen = this.add.image(this.x+i*tam,this.y+j*tam,'P');
                    imagen.displayWidth = tam;
                    imagen.displayHeight = tam;
                }
            }
            
        }
         var respuesta = document.createElement('input');
        respuesta.setAttribute('type'  ,'number');
        respuesta.setAttribute('style','width: 100px; font-size: 40px;');
        this.add.dom(this.x+tam, this.y+tam, respuesta);
        
         var respuesta = document.createElement('input');
        respuesta.setAttribute('type'  ,'number');
        respuesta.setAttribute('style','width: 100px; font-size: 40px;');
        this.add.dom(this.x+2*tam, this.y+tam, respuesta);
        
         var respuesta = document.createElement('input');
        respuesta.setAttribute('type'  ,'number');
        respuesta.setAttribute('style','width: 100px; font-size: 40px;');
        this.add.dom(this.x+tam, this.y+2*tam, respuesta);
        
         var respuesta = document.createElement('input');
        respuesta.setAttribute('type'  ,'number');
        respuesta.setAttribute('style','width: 100px; font-size: 40px;');
        this.add.dom(this.x+2*tam, this.y+2*tam, respuesta);
        
        
        
        
        
         
        var respuesta = document.createElement('input');
        respuesta.setAttribute('type'  ,'number');
        respuesta.setAttribute('style','width: 100px;');
        this.add.dom(this.x+tam, this.y+3*tam, respuesta);
        var respuesta = document.createElement('input');
        respuesta.setAttribute('type'  ,'number');
        respuesta.setAttribute('style','width: 100px;');
        this.add.dom(this.x+2*tam, this.y+3*tam, respuesta);
        
        
        this.div = document.createElement('h1');
        this.div.style = 'font-size: 80px;  ';
        this.div.innerHTML = a*10;
        this.add.dom(this.x+tam, this.y-tam/2, this.div);
        
        this.div = document.createElement('h1');
        this.div.style = 'font-size: 80px;  ';
        this.div.innerHTML = b;
        this.add.dom(this.x+2*tam, this.y-tam/2, this.div);
        
        this.div = document.createElement('h1');
        this.div.style = 'font-size: 80px;  ';
        this.div.innerHTML = "X";
        this.add.dom(this.x+3*tam, this.y-tam/2, this.div);
        
        this.div = document.createElement('h1');
        this.div.style = 'font-size: 80px;  ';
        this.div.innerHTML = c*10;
        this.add.dom(this.x+3*tam, this.y-tam/2+tam, this.div);
        
        this.div = document.createElement('h1');
        this.div.style = 'font-size: 80px;  ';
        this.div.innerHTML = d;
        this.add.dom(this.x+3*tam, this.y-tam/2+2*tam, this.div);
        
        this.lienzo = this.add.graphics();
        
        this.lienzo2 = this.add.graphics();
        this.lienzo2.fillStyle(0x00ff00);
        this.lienzo2.setAlpha(0);
        this.lienzo2.fillRect(0,0,1920,1080);
        
        this.lienzo2.clear();
        b=0;
        this.lienzo3 = this.add.graphics();
        
        console.log(this);
    }
    
    corregir(){
        var resp=document.getElementById("R").value;
        if(resp === this.resp+""){
            
            this.correcto();
            console.log("correcto");
        }else{
            this.falso();
            console.log("incorrecto");
        }
    }
    correcto(){
        b=0.5;
        v.play();
        this.lienzo3 = this.add.graphics();
            this.lienzo3.fillStyle(0x03A9F4);
            this.lienzo3.fillRect(1300,50,300,90);
            this.opc= this.add.text(1450, 95, '¿OTRO?', { color: 'black', fontFamily: 'Arial', fontSize: '50px '}).setOrigin(0.5,0.5);

            const otro = this.add.zone(1300, 50, 300,100);
            otro.setOrigin(0);
            otro.setInteractive();
            otro.on('pointerdown', () => this.opcionPulsada('otro'));
    }
    falso(){
        a=0.5;
        w.play();
        this.cameras.main.shake(200,0.01);
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
class trad extends Phaser.Scene{ //Cuánto Falta
    constructor(){
        super({key:'Trad'});
        this.resp;
        
    }
    
    preload(){
        this.load.audio('correct', './assets/sounds/correct.mp3');
        this.load.audio('wrong', './assets/sounds/wrong.mp3');
        this.load.image('logo','./assets/img/logo.jpeg');
        this.load.image('P','./assets/img/P.png');
        
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
        
        v = this.sound.add('correct',{loop:false});
        w = this.sound.add('wrong',{loop:false});
        
              
        this.n = Math.floor(Math.random()*89+11);
        this.m = Math.floor(Math.random()*89+11);
        
        
        //a = b = c = d =1;
        
        this.resp=this.n*this.m;
        
        
        
        this.div = document.createElement('h1');
        this.div.style = 'font-size: 80px; ';
        this.div.innerHTML = "¿Cuánto es "+this.n+"&times;"+this.m+"?";
        this.add.dom(960, 100, this.div);
        
        var respuesta = document.createElement('input');
        respuesta.setAttribute('type'  ,'number');
        respuesta.setAttribute('id','R');
        respuesta.setAttribute('placeholder','R');
        respuesta.setAttribute('style','width: 150px');
        this.res = this.add.dom(960, 250, respuesta);
        
        var boton = document.createElement('button');
        boton.setAttribute('type','button');
        this.element = this.add.dom(1630, 200, boton,'','Corregir');
        this.element.addListener('click');
        this.element.on('click',() => this.corregir());
        
        this.input.keyboard.on('keydown-ENTER',() => this.corregir());
        
        
        this.y = 400;
        var tam=120;
        this.x = 960-3*tam/2;
        
        this.div = document.createElement('h1');
        this.div.style = 'font-size: 80px; ';
        this.div.innerHTML = this.n;
        this.add.dom(960, 450, this.div).setOrigin(1,1);
        this.div = document.createElement('h1');
        this.div.style = 'font-size: 80px; ';
        this.div.innerHTML = "&times "+this.m;
        this.add.dom(960, 550, this.div).setOrigin(1,1);
        
        this.lineas = this.add.graphics();
        this.lineas.lineStyle(5, 0x000000, 1);
        this.lineas.lineBetween(760,600,980,600 );
        
         var respuesta = document.createElement('input');
        respuesta.setAttribute('type'  ,'number');
        respuesta.setAttribute('style','width: 40px; font-size: 40px;');
        this.add.dom(960, 650, respuesta).setOrigin(1,1);
        
         var respuesta = document.createElement('input');
        respuesta.setAttribute('type'  ,'number');
        respuesta.setAttribute('style','width: 40px; font-size: 40px;');
        this.add.dom(910, 650, respuesta).setOrigin(1,1);
        
         var respuesta = document.createElement('input');
        respuesta.setAttribute('type'  ,'number');
        respuesta.setAttribute('style','width: 40px; font-size: 40px;');
        this.add.dom(860, 650, respuesta).setOrigin(1,1);
        
         var respuesta = document.createElement('input');
        respuesta.setAttribute('type'  ,'number');
        respuesta.setAttribute('style','width: 40px; font-size: 40px;');
        this.add.dom(910, 710, respuesta).setOrigin(1,1);
        
         var respuesta = document.createElement('input');
        respuesta.setAttribute('type'  ,'number');
        respuesta.setAttribute('style','width: 40px; font-size: 40px;');
        this.add.dom(860, 710, respuesta).setOrigin(1,1);
        
         var respuesta = document.createElement('input');
        respuesta.setAttribute('type'  ,'number');
        respuesta.setAttribute('style','width: 40px; font-size: 40px;');
        this.add.dom(810, 710, respuesta).setOrigin(1,1);
        
         
        this.div = document.createElement('h1');
        this.div.style = 'font-size: 50px; ';
        this.div.innerHTML = "0";
        this.add.dom(955, 685, this.div).setOrigin(1,1);
        this.lineas.lineStyle(5, 0x000000, 1);
        this.lineas.lineBetween(760,730,980,730 );
        
         var respuesta = document.createElement('input');
        respuesta.setAttribute('type'  ,'number');
        respuesta.setAttribute('style','width: 40px; font-size: 40px;');
        this.add.dom(960, 780, respuesta).setOrigin(1,1);
        
        var respuesta = document.createElement('input');
        respuesta.setAttribute('type'  ,'number');
        respuesta.setAttribute('style','width: 40px; font-size: 40px;');
        this.add.dom(910, 780, respuesta).setOrigin(1,1);
        
         var respuesta = document.createElement('input');
        respuesta.setAttribute('type'  ,'number');
        respuesta.setAttribute('style','width: 40px; font-size: 40px;');
        this.add.dom(860, 780, respuesta).setOrigin(1,1);
        
         var respuesta = document.createElement('input');
        respuesta.setAttribute('type'  ,'number');
        respuesta.setAttribute('style','width: 40px; font-size: 40px;');
        this.add.dom(810, 780, respuesta).setOrigin(1,1);
        
        this.div = document.createElement('h1');
        this.div.style = 'font-size: 80px; ';
        this.div.innerHTML = "&plus;";
        this.add.dom(730, 600, this.div);
        
        
        this.lienzo = this.add.graphics();
        
        this.lienzo2 = this.add.graphics();
        this.lienzo2.fillStyle(0x00ff00);
        this.lienzo2.setAlpha(0);
        this.lienzo2.fillRect(0,0,1920,1080);
        
        this.lienzo2.clear();
        b=0;
        this.lienzo3 = this.add.graphics();
        
        console.log(this);
    }
    
    corregir(){
        var resp=document.getElementById("R").value;
        if(resp === this.resp+""){
            
            this.correcto();
            console.log("correcto");
        }else{
            this.falso();
            console.log("incorrecto");
        }
    }
    correcto(){
        b=0.5;
        v.play();
        this.lienzo3 = this.add.graphics();
            this.lienzo3.fillStyle(0x03A9F4);
            this.lienzo3.fillRect(1300,50,300,90);
            this.opc= this.add.text(1450, 95, '¿OTRO?', { color: 'black', fontFamily: 'Arial', fontSize: '50px '}).setOrigin(0.5,0.5);

            const otro = this.add.zone(1300, 50, 300,100);
            otro.setOrigin(0);
            otro.setInteractive();
            otro.on('pointerdown', () => this.opcionPulsada('otro'));
    }
    falso(){
        a=0.5;
        w.play();
        this.cameras.main.shake(200,0.01);
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
  scene: [menu,trad,array,hindu,maya,CIEN,D2,D,nueve,N5,ab,S2,S1,C ],//
  scale: {
      mode: Phaser.Scale.Fit
  },
 fps: {
        target: 30,
        forceSetTimeOut: true
    }
}

var game = new Phaser.Game(config);