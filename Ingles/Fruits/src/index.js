/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 * 
 * https://wideo.co/text-to-speech/
 */
let animals = ['apple', 'avocado', 'banana', 'cherry', 'coconut', 'cucumber', 
    'grapes', 'kiwi', 'lemon', 'lime', 'mango', 'melon', 'orange', 'papaya', 
    'peach', 'pear', 'pineapple', 'strawberry', 'tangerine', 'tomato', 'watermelon'];

const titulo = 'Fruits'; //Titulo del juego
const menulabel = [['Vocabulary'],
    ['Read and choose'],
    ['Listen and choose'],
    ['Listen and write'],
    ['See and write']]; //Opciones menú
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
var fx,c,w; //Sonido c=correcto w=equivocado
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
        
    }
    opcionPulsada(opcion) {
        console.log("opcionPulsada("+opcion+")");
	if (opcion === 0) {
            this.scene.start('Explorar');
	} else if (opcion === 1) {
            this.scene.start('RC');
	} else if (opcion === 2) {
            this.scene.start('LC');
	} else if (opcion === 3) {
           this.scene.start('LW');
	} else if (opcion === 4) {
           this.scene.start('SW');
	} else {
            console.log(opcion);
        }
    }
}

class Explorar extends Phaser.Scene{
    constructor() {
		super({key:'Explorar'}); //, active:'true'
    }
    preload(){
        this.load.image('logo','./assets/img/logo.jpeg');
        for(var i=0; i < animals.length; i++){
            this.load.image(animals[i],'./assets/img/'+animals[i]+'.png');
        }
        for(var i=0; i < animals.length; i++){
            this.load.audio(animals[i],'./assets/sounds/'+animals[i]+'.mp3');
        }
    }
    create(){
        this.add.image(0,0,'logo').setOrigin(0,0);
        this.div = document.createElement('h1');
        this.div.style = 'width: 1000px; font-size: 80px; ';
        this.div.innerText = 'Elige un animal.';
        this.add.dom(1200, 50, this.div).setOrigin(0.5,0.5);
        
        this.graph = this.add.graphics();
        this.graph.fillStyle(0xF1C40F);
        this.graph.fillRect(1600,50,300,90);
        this.add.text(1750, 50, 'Home', { color: 'black', fontFamily: 'Arial', fontSize: '70px '}).setOrigin(0.5,0);
        
        const ini = this.add.zone(1600, 50, 300, 90);
	ini.setOrigin(0);
	ini.setInteractive();
	ini.once('pointerdown', () => this.opcionPulsada('ini'));
	this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(ini);
        
        //this.lienzo.setAlpha(0.7);
        const opc = new Array();
        fx = new Array();
        for( var i=0 ; i < animals.length ; i++ ){
            
            fx.push(this.sound.add(animals[i],{loop: false}));
            
            var x = 100;
            var y = 300;
            
            
            var image = this.add.image(x+(i%10)*170 , y+170*Math.floor(i/10) , animals[i]).setInteractive();
            
            image.displayWidth = 160;
            image.displayHeight = 160;
            
            image.on('pointerover', this.over, this);
            
            image.on('pointerout', this.out, this);
            
        }
        this.lienzo =this.add.graphics();
        /*        
        opc[0].once('pointerdown', () => this.opcionPulsada(0));
        opc[1].once('pointerdown', () => this.opcionPulsada(1));
        opc[2].once('pointerdown', () => this.opcionPulsada(2));
        opc[3].once('pointerdown', () => this.opcionPulsada(3));
        */
    }
    over(imagen){
        
        var x= Math.floor((imagen.x-20)/170);
        var y= Math.floor((imagen.y-220)/170);
        fx[y*10+x].play();
        
        this.lienzo.fillStyle(0xff0000);
        this.lienzo.setAlpha(0.5);
        this.lienzo.fillRect(20+170*x,220+170*y,170,170);
        this.div.innerText = animals[y*10+x];
    }
    out(){
        this.sound.stopAll();
        this.lienzo.clear();
        this.lienzo.setAlpha(1);
        this.div.innerText = 'Elige una fruta.';
    }
    opcionPulsada(opcion) {
        rc=0;
        if(opcion === 'ini'){
            this.scene.start('menu');
        } else{
            console.log("A dónde voy?");
        }
        
    }
}

class RC extends Phaser.Scene{
    constructor() {
		super({key:'RC'}); //, active:'true'
    }
    preload(){
        this.load.image('logo','./assets/img/logo.jpeg');
        for(var i=0; i < animals.length; i++){
            this.load.image(animals[i],'./assets/img/'+animals[i]+'.png');
        }
        this.animals2=animals.slice();
        this.animals2.sort(() => (Math.random() > 0.5 ? 1 : -1));
        
        this.load.audio('correct','./assets/sounds/'+'correct'+'.mp3');
        this.load.audio('wrong','./assets/sounds/'+'wrong'+'.mp3');
    }
    create(){
        
        console.log(animals);
        console.log(this.animals2);
        this.add.image(0,0,'logo').setOrigin(0,0);
        this.div = document.createElement('h1');
        this.div.style = 'width: 1000px; font-size: 80px; ';
        this.div.innerText = 'click on '+this.animals2[rc];
        this.add.dom(1200, 50, this.div).setOrigin(0.5,0.5);
        
        this.graph = this.add.graphics();
        this.graph.fillStyle(0xF1C40F);
        this.graph.fillRect(1600,50,300,90);
        this.add.text(1750, 50, 'Home', { color: 'black', fontFamily: 'Arial', fontSize: '70px '}).setOrigin(0.5,0);
        
        const ini = this.add.zone(1600, 50, 300, 90);
	ini.setOrigin(0);
	ini.setInteractive();
	ini.once('pointerdown', () => this.opcionPulsada('ini'));
	this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(ini);
        
        c = this.sound.add('correct',{loop:false});
        w = this.sound.add('wrong',{loop:false});
        
        //this.lienzo.setAlpha(0.7);
        const opc = new Array();
        fx = new Array();
        for( var i=0 ; i < animals.length ; i++ ){
            
            
            
            var x = 100;
            var y = 300;
            
            
            var image = this.add.image(x+(i%10)*170 , y+170*Math.floor(i/10) , animals[i]).setInteractive();
            
            image.displayWidth = 160;
            image.displayHeight = 160;
            
            image.on('pointerover', this.over, this);
            
            image.on('pointerout', this.out, this);
            
            image.on('pointerdown', this.clic, this);
            
        }
        this.lienzo =this.add.graphics();
        
        
        this.lienzo = this.add.graphics();
        this.lienzo.fillStyle(0xff0000);
        this.lienzo.setAlpha(a);
        this.lienzo.fillRect(0,0,1920,1080);
        
        this.lienzo2 = this.add.graphics();
        this.lienzo2.fillStyle(0x00ff00);
        this.lienzo2.setAlpha(a);
        this.lienzo2.fillRect(0,0,1920,1080);
    }
    over(imagen){
        
        var x= Math.floor((imagen.x-20)/170);
        var y= Math.floor((imagen.y-220)/170);
        
        
        this.lienzo.fillStyle(0xff0000);
        this.lienzo.setAlpha(0.5);
        this.lienzo.fillRect(20+170*x,220+170*y,170,170);
        //this.div.innerText = animals[y*10+x];
    }
    out(){
        
        this.lienzo.clear();
        this.lienzo.setAlpha(1);
        //this.div.innerText = 'Elige una fruta.';
    }
    clic(imagen){
        this.sound.stopAll();
        var x= Math.floor((imagen.x-20)/170);
        var y= Math.floor((imagen.y-220)/170);
        if(animals[10*y+x]===this.animals2[rc]){
            b=0.5;
            c.play();
            rc++;
            rc=rc%animals.length;
            this.div.innerText = this.animals2[rc];
        }else{
            a=0.5;
            this.cameras.main.shake(200,0.01);
            w.play();
        }
        
    }
    opcionPulsada(opcion) {
        rc=0;
        if(opcion === 'ini'){
            this.scene.start('menu');
        } else{
            console.log("A dónde voy?");
        }
        
    }
    update(time,delta){
        if(a>0){
            a-=0.5*delta/1000;
            b-=0.5*delta/1000;
            this.lienzo.clear();
            this.lienzo.setAlpha(a);
            this.lienzo.fillStyle(0xff0000);
            this.lienzo.fillRect(0,0,1920,1080);

        }else{
            a=0;

        }
        if(b>0){

            b-=0.5*delta/1000;
            this.lienzo.clear();
            this.lienzo.setAlpha(b);
            this.lienzo.fillStyle(0x00ff00);
            this.lienzo.fillRect(0,0,1920,1080);

        }else{
            b=0;

        }
        
    }
}
class LC extends Phaser.Scene{
    constructor() {
		super({key:'LC'}); //, active:'true'
    }
    preload(){
        this.load.image('logo','./assets/img/logo.jpeg');
        this.load.image('play','./assets/img/play.png');
        for(var i=0; i < animals.length; i++){
            this.load.image(animals[i],'./assets/img/'+animals[i]+'.png');
        }
        for(var i=0; i < animals.length; i++){
            this.load.audio(animals[i],'./assets/sounds/'+animals[i]+'.mp3');
        }
        this.animals2=animals.slice();
        this.animals2.sort(() => (Math.random() > 0.5 ? 1 : -1));
        
        this.load.audio('correct','./assets/sounds/'+'correct'+'.mp3');
        this.load.audio('wrong','./assets/sounds/'+'wrong'+'.mp3');
    }
    create(){
        this.add.image(0,0,'logo').setOrigin(0,0);
        
        
        this.graph = this.add.graphics();
        this.graph.fillStyle(0xF1C40F);
        this.graph.fillRect(1600,50,300,90);
        this.add.text(1750, 50, 'Home', { color: 'black', fontFamily: 'Arial', fontSize: '70px '}).setOrigin(0.5,0);
        
        const ini = this.add.zone(1600, 50, 300, 90);
	ini.setOrigin(0);
	ini.setInteractive();
	ini.once('pointerdown', () => this.opcionPulsada('ini'));
	this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(ini);
        
        c = this.sound.add('correct',{loop:false});
        w = this.sound.add('wrong',{loop:false});
        
        //this.lienzo.setAlpha(0.7);
        const opc = new Array();
        fx = new Array();
        for( var i=0 ; i < animals.length ; i++ ){
            
            fx.push(this.sound.add(this.animals2[i],{loop: false}));
            
            var x = 100;
            var y = 300;
            
            
            var image = this.add.image(x+(i%10)*170 , y+170*Math.floor(i/10) , animals[i]).setInteractive();
            
            image.displayWidth = 160;
            image.displayHeight = 160;
            
            image.on('pointerover', this.over, this);
            
            image.on('pointerout', this.out, this);
            
            image.on('pointerdown', this.clic, this);
            
        }
        
        var sonar = this.add.image(1200,75,'play').setOrigin(0.5,0.5);
        sonar.setScale(0.1);
        sonar.setInteractive();
        sonar.on('pointerover',function(){
            sonar.setTint(0x07B40D);
        });
        sonar.on('pointerout',function(){
            sonar.clearTint();
        });
        sonar.on('pointerdown',this.reproducir,this);
        
        
        this.lienzo =this.add.graphics();
        
        
        this.lienzo = this.add.graphics();
        this.lienzo.fillStyle(0xff0000);
        this.lienzo.setAlpha(a);
        this.lienzo.fillRect(0,0,1920,1080);
        
        this.lienzo2 = this.add.graphics();
        this.lienzo2.fillStyle(0x00ff00);
        this.lienzo2.setAlpha(a);
        this.lienzo2.fillRect(0,0,1920,1080);
    }
    reproducir(){
        this.sound.stopAll();
            fx[rc].play();
    }
    over(imagen){
        
        var x= Math.floor((imagen.x-20)/170);
        var y= Math.floor((imagen.y-220)/170);
        
        
        this.lienzo.fillStyle(0xff0000);
        this.lienzo.setAlpha(0.5);
        this.lienzo.fillRect(20+170*x,220+170*y,170,170);
        //this.div.innerText = animals[y*10+x];
    }
    out(){
        
        this.lienzo.clear();
        this.lienzo.setAlpha(1);
        //this.div.innerText = 'Elige un fruit.';
    }
    clic(imagen){
        this.sound.stopAll();
        var x= Math.floor((imagen.x-20)/170);
        var y= Math.floor((imagen.y-220)/170);
        if(animals[10*y+x]===this.animals2[rc]){
            b=0.5;
            c.play();
            rc++;
            rc=rc%animals.length;
        }else{
            a=0.5;
            this.cameras.main.shake(200,0.01);
            w.play();
        }
        
    }
    opcionPulsada(opcion) {
        rc=0;
        if(opcion === 'ini'){
            this.scene.start('menu');
        } else{
            console.log("A dónde voy?");
        }
        
    }
    update(time,delta){
        if(a>0){
            a-=0.5*delta/1000;
            b-=0.5*delta/1000;
            this.lienzo.clear();
            this.lienzo.setAlpha(a);
            this.lienzo.fillStyle(0xff0000);
            this.lienzo.fillRect(0,0,1920,1080);

        }else{
            a=0;

        }
        if(b>0){

            b-=0.5*delta/1000;
            this.lienzo.clear();
            this.lienzo.setAlpha(b);
            this.lienzo.fillStyle(0x00ff00);
            this.lienzo.fillRect(0,0,1920,1080);

        }else{
            b=0;

        }
        
    }
}
class LW extends Phaser.Scene{
    constructor() {
		super({key:'LW'}); //, active:'true'
    }
    preload(){
        this.load.image('logo','./assets/img/logo.jpeg');
        this.load.image('play','./assets/img/play.png');
        
        for(var i=0; i < animals.length; i++){
            this.load.audio(animals[i],'./assets/sounds/'+animals[i]+'.mp3');
        }
        this.animals2=animals.slice();
        this.animals2.sort(() => (Math.random() > 0.5 ? 1 : -1));
        
        this.load.audio('correct','./assets/sounds/'+'correct'+'.mp3');
        this.load.audio('wrong','./assets/sounds/'+'wrong'+'.mp3');
    }
    create(){
        this.add.image(0,0,'logo').setOrigin(0,0);
        
        
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
        
        //this.lienzo.setAlpha(0.7);
        const opc = new Array();
        fx = new Array();
        for( var i=0 ; i < animals.length ; i++ ){
            
            fx.push(this.sound.add(this.animals2[i],{loop: false}));
            
            var x = 100;
            var y = 300;
            
        }
        
        var sonar = this.add.image(1200,300,'play').setOrigin(0.5,0.5);
        sonar.setScale(0.15);
        sonar.setInteractive();
        sonar.on('pointerover',function(){
            sonar.setTint(0x07B40D);
        });
        sonar.on('pointerout',function(){
            sonar.clearTint();
        });
        sonar.on('pointerdown',this.reproducir,this);
        
        this.respuesta = document.createElement('input');
        this.respuesta.setAttribute('type'  ,'text');
        this.respuesta.setAttribute('id','respuesta');
        this.respuesta.setAttribute('placeholder','Respuesta');
        this.respuesta.setAttribute('autofocus','autofocus');
        this.respuesta.setAttribute('style','width');
        this.r = this.add.dom(960, 500, this.respuesta);
        
        var boton = document.createElement('button');
        boton.setAttribute('type','button');
        this.element = this.add.dom(1300, 500, boton,'','Corregir');
        this.element.addListener('click');
        this.element.on('click',() => this.corregir());
        
        this.input.keyboard.on('keydown-ENTER',() => this.corregir());
        
        this.lienzo =this.add.graphics();
        
        
        this.lienzo = this.add.graphics();
        this.lienzo.fillStyle(0xff0000);
        this.lienzo.setAlpha(a);
        this.lienzo.fillRect(0,0,1920,1080);
        
        this.lienzo2 = this.add.graphics();
        this.lienzo2.fillStyle(0x00ff00);
        this.lienzo2.setAlpha(a);
        this.lienzo2.fillRect(0,0,1920,1080);
    }
    reproducir(){
        this.sound.stopAll();
        fx[rc].play();
    }
    
    opcionPulsada(opcion) {
        rc=0;
        if(opcion === 'ini'){
            this.scene.start('menu');
        } else{
            console.log("A dónde voy?");
        }
        
    }
    corregir(){
        
        var r=document.getElementById('respuesta').value;
        var resp = this.animals2[rc];
        var rempl = resp.split('/');
        var resp = resp.split('/')
        
        for(var i=0;i<rempl.length;i++){
            rempl[i] = "";
        }
        //console.log(rempl);
        //console.log(resp);
        for(var i=0;i<resp.length;i++){
            if(r === resp[i]){
                //console.log("Correcto");
                b=0.25;
                rc++;
                c.play();
                rc=rc%animals.length;
                document.getElementById('respuesta').value="";
                break;
            }else{
                if(i=== resp.length-1){
                    w.play();
                    a=0.5;
                    
                    var aux = rempl[0];
                    for(var k=0; k<rempl.length;k++){
                        for(var j=0;j<r.length && j<resp[i].length;j++){
                            //console.log(k+':  ' +r.charAt(j)+' === '+ resp[k].charAt(j));
                            if(r.charAt(j) === resp[k].charAt(j)){
                             
                                rempl[k] += r.charAt(j);
                                //console.log(rempl[k]);
                            }else{
                                break;
                            }
                        }
                        if( rempl[k].length>aux.length){
                            aux=rempl[k];
                        }
                    }
                    document.getElementById('respuesta').value=aux;
                }
            }
        }
    }
    update(time,delta){
        var r=document.getElementById('respuesta').value;
        r=r.toLowerCase();
        document.getElementById('respuesta').value=r;
        
        if(a>0){
            a-=0.5*delta/1000;
            b-=0.5*delta/1000;
            this.lienzo.clear();
            this.lienzo.setAlpha(a);
            this.lienzo.fillStyle(0xff0000);
            this.lienzo.fillRect(0,0,1920,1080);

        }else{
            a=0;

        }
        if(b>0){

            b-=0.5*delta/1000;
            this.lienzo.clear();
            this.lienzo.setAlpha(b);
            this.lienzo.fillStyle(0x00ff00);
            this.lienzo.fillRect(0,0,1920,1080);

        }else{
            b=0;

        }
        
    }
}
class SW extends Phaser.Scene{
    constructor() {
		super({key:'SW'}); //, active:'true'
    }
    preload(){
        this.load.image('logo','./assets/img/logo.jpeg');
        
        
        for(var i=0; i < animals.length; i++){
            this.load.image(animals[i],'./assets/img/'+animals[i]+'.png');
        }
        this.animals2=animals.slice();
        this.animals2.sort(() => (Math.random() > 0.5 ? 1 : -1));
        
        this.load.audio('correct','./assets/sounds/'+'correct'+'.mp3');
        this.load.audio('wrong','./assets/sounds/'+'wrong'+'.mp3');
        rc=0;
    }
    create(){
        this.add.image(0,0,'logo').setOrigin(0,0);
        
        
        this.graph = this.add.graphics();
        this.graph.fillStyle(0xF1C40F);
        this.graph.fillRect(1600,50,300,90);
        this.add.text(1750, 50, 'Home', { color: 'black', fontFamily: 'Arial', fontSize: '70px '}).setOrigin(0.5,0);
        
        const ini = this.add.zone(1600, 50, 300, 90);
	ini.setOrigin(0);
	ini.setInteractive();
	ini.once('pointerdown', () => this.opcionPulsada('ini'));
	this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(ini);
        
        c = this.sound.add('correct',{loop:false});
        w = this.sound.add('wrong',{loop:false});
        
        //this.lienzo.setAlpha(0.7);
        const opc = new Array();
        fx = new Array();
        this.image= this.add.image(1200,300, this.animals2[rc]);
        this.image.displayWidth = 160;
            this.image.displayHeight = 160;
        
        
        
        this.respuesta = document.createElement('input');
        this.respuesta.setAttribute('type'  ,'text');
        this.respuesta.setAttribute('id','respuesta');
        this.respuesta.setAttribute('placeholder','Respuesta');
        this.respuesta.setAttribute('autofocus','autofocus');
        this.respuesta.setAttribute('style','width');
        this.r = this.add.dom(960, 500, this.respuesta);
        
        var boton = document.createElement('button');
        boton.setAttribute('type','button');
        this.element = this.add.dom(1300, 500, boton,'','Corregir');
        this.element.addListener('click');
        this.element.on('click',() => this.corregir());
        
        this.input.keyboard.on('keydown-ENTER',() => this.corregir());
        
        this.lienzo =this.add.graphics();
        
        
        this.lienzo = this.add.graphics();
        this.lienzo.fillStyle(0xff0000);
        this.lienzo.setAlpha(a);
        this.lienzo.fillRect(0,0,1920,1080);
        
        this.lienzo2 = this.add.graphics();
        this.lienzo2.fillStyle(0x00ff00);
        this.lienzo2.setAlpha(a);
        this.lienzo2.fillRect(0,0,1920,1080);
    }
    reproducir(){
        this.sound.stopAll();
        fx[rc].play();
    }
    
    opcionPulsada(opcion) {
        rc=0;
        if(opcion === 'ini'){
            this.scene.start('menu');
        } else{
            console.log("A dónde voy?");
        }
        
    }
    corregir(){
        
        var r=document.getElementById('respuesta').value;
        var resp = this.animals2[rc%animals.length];
        var rempl = resp.split('/');
        var resp = resp.split('/')
        
        for(var i=0;i<rempl.length;i++){
            rempl[i] = "";
        }
        //console.log(rempl);
        //console.log(resp);
        for(var i=0;i<resp.length;i++){
            if(r === resp[i]){
                //console.log("Correcto");
                b=0.25;
                rc++;
                c.play();
                this.image.destroy();
                this.image= this.add.image(1200,300, this.animals2[rc%animals.length]);
                this.image.displayWidth = 160;
                this.image.displayHeight = 160;
                document.getElementById('respuesta').value="";
                break;
                
            }else{
                if(i=== resp.length-1){
                    w.play();
                    a=0.5;
                    
                    var aux = rempl[0];
                    for(var k=0; k<rempl.length;k++){
                        for(var j=0;j<r.length && j<resp[i].length;j++){
                            //console.log(k+':  ' +r.charAt(j)+' === '+ resp[k].charAt(j));
                            if(r.charAt(j) === resp[k].charAt(j)){
                             
                                rempl[k] += r.charAt(j);
                                //console.log(rempl[k]);
                            }else{
                                break;
                            }
                        }
                        if( rempl[k].length>aux.length){
                            aux=rempl[k];
                        }
                    }
                    document.getElementById('respuesta').value=aux;
                }
            }
        }
    }
    update(time,delta){
        var r=document.getElementById('respuesta').value;
        r=r.toLowerCase();
        document.getElementById('respuesta').value=r;
        
        if(a>0){
            a-=0.5*delta/1000;
            b-=0.5*delta/1000;
            this.lienzo.clear();
            this.lienzo.setAlpha(a);
            this.lienzo.fillStyle(0xff0000);
            this.lienzo.fillRect(0,0,1920,1080);

        }else{
            a=0;

        }
        if(b>0){

            b-=0.5*delta/1000;
            this.lienzo.clear();
            this.lienzo.setAlpha(b);
            this.lienzo.fillStyle(0x00ff00);
            this.lienzo.fillRect(0,0,1920,1080);

        }else{
            b=0;

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
  scene: [menu,SW,LW,LC,RC,Explorar ],
  scale: {
      mode: Phaser.Scale.Fit
  },
 fps: {
        target: 30,
        forceSetTimeOut: true
    }
}

var game = new Phaser.Game(config);
