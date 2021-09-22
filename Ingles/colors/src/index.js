/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
const titulo = 'Colors / Colours'; //Titulo del juego
const menulabel = ['Adivina el color' ]; //Opciones menú
const LargoM = 840; //Largo de boton en menú
const Colores = [0xd0598f,0x33a099,0xfdcf20,0x2272b4]; // Colore PILARES
var a=0,b=0; //Alpha a= error b=correcto
var c,w; //Sonido c=correcto w=equivocado
var rc=0 ; //Contadores rc = respuesta correcta
var num;
const respuestas = ['red','orange','yellow','green','blue','purple','pink',
                    'white','gray/grey','brown','black'];
const colors =[0xFF0000,0xFF5722,0xFFEB3B,0x4CAF50,0x2196F3,0x9C27B0,0xE91E63,
    0xFFFFFF,0x90A4AE,0x795548,0x000000];



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
            lienzo.fillStyle(Colores[i%4]);
            lienzo.fillRect(960-LargoM/2,346+i*100,LargoM,90);
            this.add.text(960, 350+i*100, menulabel[i], { color: 'black', fontFamily: 'Arial', fontSize: '70px '}).setOrigin(0.5,0);
            opc.push(this.add.zone(960-LargoM/2, 346+i*100, LargoM, 90));
            opc[i].setOrigin(0);
            opc[i].setInteractive();
            opc[i].name = i+"";
            //
            //console.log(opc[i]);
        }
        opc[0].once('pointerdown', () => this.opcionPulsada(opc[0].name));
        
        
        
    }
    opcionPulsada(opcion) {
	if (opcion === "0") {
                this.scene.start('AC');
	} else {
            console.log(opcion);
        }
    }
}

class AC extends Phaser.Scene{ //Escribe el número con Letra
    
    constructor() {
		super({key:'AC'}); //, active:'true'
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
        
        c = this.sound.add('correct',{loop:false});
        w = this.sound.add('wrong',{loop:false});
        
        this.div = document.createElement('h1');
        this.div.style = 'width: 1000px; font-size: 80px; ';
        
        
        num =Math.floor(Math.random()*colors.length);
        
        
        
        this.div.innerHTML ='Escribe el color ';
        this.add.dom(960, 300, this.div);
        this.graph.fillStyle(0x000000);
        this.graph.fillRect(1197, 297,156,156);
        this.graph.fillStyle(colors[num]);
        this.graph.fillRect(1200, 300,150,150);
        //console.log(respuestas[num].split("/"));
        
        
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
        
    }
    update(time,delta){
        
        var r=document.getElementById('respuesta').value;
        r=r.toLowerCase();
        document.getElementById('respuesta').value=r;
        if(rc){
            this.lienzo3 = this.add.graphics();
            this.lienzo3.fillStyle(0x03A9F4);
            this.lienzo3.fillRect(1300,50,300,100);
            this.opc= this.add.text(1335, 75, '¿OTRO?', { color: 'black', fontFamily: 'Arial', fontSize: '50px '});

            const otro = this.add.zone(1300, 50, 300,100);
            otro.setOrigin(0);
            otro.setInteractive();
            otro.on('pointerdown', () => this.opcionPulsada('otro'));
        }
        /*
        else{
            if(r === respuestas[P].charAt(this.letra)){
                //console.log("Correcto");
                this.lienzo.clear();
                this.lienzo2.clear();
                this.lienzo2.fillStyle(0x00ff00);
                this.lienzo2.setAlpha(0.25);
                this.lienzo2.fillRect(0,0,1920,1080);
                c.play();
                rc=1;
            }else if(r === ""){
                //console.log("Esperando");
            }else{
                //console.log("Incorrecto");
                document.getElementById('respuesta').value="";
                w.play();
                a=0.75;
            }
         */
            if(a>0){
                b=0;
                a-=0.5*delta/1000;
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
            //   b-=0.5*delta/1000;
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
    corregir(){
        
        var r=document.getElementById('respuesta').value;
        var resp = respuestas[num];
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
                rc=1;
                c.play();
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
  scene: [menu,AC ],
  scale: {
      mode: Phaser.Scale.Fit
  },
 fps: {
        target: 30,
        forceSetTimeOut: true
    }
}

var game = new Phaser.Game(config);