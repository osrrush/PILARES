/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
const titulo = 'Aprender las tablas'; //Titulo del juego
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
        this.load.css('80s','./src/fuente.css');
    }
    create(){
        this.add.image(205,82,'logo');
        var h1 = this.add.dom(960, 150, 'h1', null, titulo);
        
        var lienzo =this.add.graphics();
        
        const opc = new Array();
        this.div = document.createElement('div');
        this.div.style = 'font-size: 40px; ';
        
        
       
        
                
       
        for(var i=1;i<11;i++){
            
            this.div.innerHTML +='<input type="checkbox" id="'+i+'" value="'+i+'"> <label for="'+i+'">Tabla del '+i+'</label><br>';
            
        }
        
        //console.log(this.div);
        
        this.add.dom(960, 500, this.div);
        var boton = document.createElement('button');
        boton.setAttribute('type','button');
        this.element = this.add.dom(1630, 750, boton,'','Empezar');
        this.element.addListener('click');
        this.element.on('click',() => this.opcionPulsada(0));
        
        this.add.dom(960, 500, this.div);
        var boton = document.createElement('button');
        boton.setAttribute('type','button');
        this.element = this.add.dom(1630, 550, boton,'','Diagnóstico');
        this.element.addListener('click');
        this.element.on('click',() => this.opcionPulsada(1));
        
        
        this.input.keyboard.on('keyup-ENTER',() => this.opcionPulsada(0));
        
        
        //opc[0].once('pointerdown', () => this.opcionPulsada(0));
        //opc[1].once('pointerdown', () => this.opcionPulsada(1));
        //opc[2].once('pointerdown', () => this.opcionPulsada(2));
        //opc[3].once('pointerdown', () => this.opcionPulsada(3));
        //opc[4].once('pointerdown', () => this.opcionPulsada(4));
        //opc[5].once('pointerdown', () => this.opcionPulsada(5));
        //opc[6].once('pointerdown', () => this.opcionPulsada(6));
        //opc[7].once('pointerdown', () => this.opcionPulsada(7));
        //opc[8].once('pointerdown', () => this.opcionPulsada(8));
        //opc[9].once('pointerdown', () => this.opcionPulsada(9));
        //opc[10].once('pointerdown', () => this.opcionPulsada(10));
        
    }
    opcionPulsada(opcion) {
        //console.log("opcionPulsada("+opcion+")");
        this.tablas = new Array();
        
        for(var i=1;i<11;i++){
            //var ele =document.getElementById(i);
            //console.log("Elemento");
            //console.log(ele);
            if(document.getElementById(i).checked){
                this.tablas.push(i);
            }
        }
        
	if (opcion === 0) {
            if(this.tablas.length>0){
                this.scene.start('Tablas',{tablas: this.tablas});
                
            }else{
                window.alert("Selecciona alguna tabla");
            }
            
	} else {
            if(opcion === 1){
                this.scene.start('Diag');
            }
        }
    }
}

class Tablas extends Phaser.Scene{ //Cuánto Falta
    constructor(){
        super({key:'Tablas'});
        this.resp;
        this.respuestas;
    }
    init(data){
        //console.log(data);
        this.tablas = data.tablas;
        //console.log("tablas =" +this.tablas);
    }
    preload(){
        this.load.audio('correct', './assets/sounds/correct.mp3');
        this.load.audio('wrong', './assets/sounds/wrong.mp3');
        this.load.image('logo','./assets/img/logo.jpeg');
        this.numeros = [1,2,3,4,5,6,7,8,9,10];
        this.numeros.sort( () => .5 - Math.random() );
        this.indicenum=0;
        this.aprendiendo = new Array();
        for(var i=0;i<3;i++){
            this.aprendiendo.push(this.numeros[this.indicenum]);
        }
        
        this.indiceaprend=0;
    }
    create(){
        this.add.image(205,82,'logo');
        
        this.graph = this.add.graphics();
        
        this.graph.fillStyle(0xcfcfcf);
         this.graph.fillRect(500,50,1000,50);
        
        this.graph.fillStyle(0xF1C40F);
        this.faltantes = this.add.graphics();
        this.faltantes.fillStyle(0xF1C40F);
        
        this.nivel=document.createElement('h1');
        this.nivel.style = 'font-size: 40px; ';
        this.nivel.innerHTML = "Nivel 1";
        this.add.dom(960, 50, this.nivel);
        
        this.graph.fillRect(1600,50,300,90);
        this.add.text(1750, 50, 'INICIO', { color: 'black', fontFamily: 'Arial', fontSize: '70px '}).setOrigin(0.5,0);
        const ini = this.add.zone(1600, 50, 300, 90);
	ini.setOrigin(0);
	ini.setInteractive();
	ini.once('pointerdown', () => this.opcionPulsada('ini'));
	this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(ini);
        
        
        c = this.sound.add('correct',{loop:false});
        w = this.sound.add('wrong',{loop:false});
        
        this.t = this.tablas[Math.floor(Math.random()*this.tablas.length)];
        this.x = this.aprendiendo[this.indiceaprend];
        
        this.div = document.createElement('h1');
        this.div.style = 'font-size: 80px; ';
        this.div.innerHTML = this.t+"&times;"+this.x+"=";
        this.add.dom(960, 200, this.div);
        
        var respuesta = document.createElement('input');
        respuesta.setAttribute('type'  ,'number');
        respuesta.setAttribute('id','R');
        respuesta.setAttribute('placeholder','R');
        respuesta.setAttribute('style','width: 80px');
        this.res = this.add.dom(1100, 250, respuesta);
        
        var boton = document.createElement('button');
        boton.setAttribute('type','button');
        this.element = this.add.dom(1630, 250, boton,'','Corregir');
        this.element.addListener('click');
        this.element.on('click',() => this.corregir());
        
        this.input.keyboard.on('keyup-ENTER',() => this.corregir());
        
        var boton = document.createElement('button');
        boton.setAttribute('type','button');
        this.element = this.add.dom(1630, 500, boton,'','Ayuda');
        this.element.addListener('click');
        this.element.on('click',() => this.Ayuda(this.t,this.x));
        
        
        this.r = document.createElement('h2');
        this.r.style = 'font-size: 60px; ';
        this.r.innerHTML = "Respuestas";
        this.add.dom(960, 300, this.r);
        
        this.respuestas = new Array();
        
        
        
        
        
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
        if(resp === this.t*this.x+""){
                this.indiceaprend++;
                if(this.indiceaprend===this.aprendiendo.length){
                    this.indiceaprend=0;
                    this.indicenum++;
                    if(this.indicenum<10){
                        for(var i=0;i<3;i++){
                            this.aprendiendo.push(this.numeros[this.indicenum]);
                        }
                        this.aprendiendo.sort( () => .5 - Math.random() );
                    }
                    this.faltantes.clear();
                }
                //this.indicenum=10;
            if(this.indicenum<10){
                this.respuestas.unshift(this.t+"&times;"+this.x+"="+(this.x*this.t)+"<br>");
                if(this.respuestas.length>5){
                    this.respuestas.pop();
                }
                this.r.innerHTML = "Respuestas<br>";
                for(var i=0;i<this.respuestas.length;i++){
                    this.r.innerHTML += this.respuestas[i];
                }
                this.nivel.innerHTML="Nivel "+(this.indicenum+1);
                this.t = this.tablas[Math.floor(Math.random()*this.tablas.length)];
                this.x = this.aprendiendo[this.indiceaprend];
                this.div.innerHTML = this.t+"&times;"+this.x+"=";
                document.getElementById("R").value="";
                this.correcto();
                console.log("correcto");
                this.faltantes.fillRect(500,50,1000*this.indiceaprend/this.aprendiendo.length,50);
            }else{
                Swal.fire('Por hoy es suficiente de la tabla del '+this.tablas[0],
                    '¡Llama a tu profesor!','success');
                    
            }
        }else{
            
            
            this.indiceaprend=0;
            this.falso();
            console.log("incorrecto");
            this.faltantes.clear();
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
    Ayuda(t,x){ //t=tabla;  x=número
        let timerInterval
        Swal.fire({
          title: t+'x'+x+"="+(t*x),
          html: 'Tienes <b></b>.',
          timer: 3000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            const b = Swal.getHtmlContainer().querySelector('b');
            timerInterval = setInterval(() => {
              b.textContent = Math.floor(Swal.getTimerLeft()/1000)+1
            }, 100);
          },
          willClose: () => {
            clearInterval(timerInterval)
          }
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            //console.log('I was closed by the timer')
          }
        });
        this.indiceaprend=0;
        this.aprendiendo.sort( () => .5 - Math.random() );
        this.r.innerHTML = "Respuestas<br>";
        this.t = this.tablas[Math.floor(Math.random()*this.tablas.length)];
        this.x = this.aprendiendo[this.indiceaprend];
        this.div.innerHTML = this.t+"&times;"+this.x+"=";
        document.getElementById("R").value="";
        this.respuestas=new Array();
        this.faltantes.clear();
    }
}

class Diag extends Phaser.Scene{ //Diagnóstico
    constructor(){
        super({key:'Diag'});
        this.resp;
        this.respuestas;
    }
    
    preload(){
        this.load.audio('correct', './assets/sounds/correct.mp3');
        this.load.audio('wrong', './assets/sounds/wrong.mp3');
        this.load.image('logo','./assets/img/logo.jpeg');
        this.tablas = [[2,2],[2,3],[2,4],[2,5],[2,6],[2,7],[2,8],[2,9],
                        [3,3],[3,4],[3,5],[3,6],[3,7],[3,8],[3,9],
                        [4,4],[4,5],[4,6],[4,7],[4,8],[4,9],
                        [5,5],[5,6],[5,7],[5,8],[5,9],
                        [6,6],[6,7],[6,8],[6,9],
                        [7,7],[7,8],[7,9],
                        [8,8],[8,9],
                        [9,9]];
        this.tablas.sort( () => .5 - Math.random() );
        this.aprendiendo = [0,0,0,0,0,0,0,0];
        console.log(this.tablas);
        
        this.indiceaprend=0;
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
        
        this.t = this.tablas[this.indiceaprend][0];
        this.x = this.tablas[this.indiceaprend][1];
        
        this.div = document.createElement('h1');
        this.div.style = 'font-size: 80px; ';
        this.div.innerHTML = this.t+"&times;"+this.x+"=";
        this.add.dom(960, 200, this.div);
        
        var respuesta = document.createElement('input');
        respuesta.setAttribute('type'  ,'number');
        respuesta.setAttribute('id','R');
        respuesta.setAttribute('placeholder','R');
        respuesta.setAttribute('style','width: 80px');
        this.res = this.add.dom(1100, 250, respuesta);
        
        var boton = document.createElement('button');
        boton.setAttribute('type','button');
        this.element = this.add.dom(1630, 250, boton,'','Corregir');
        this.element.addListener('click');
        this.element.on('click',() => this.corregir());
        
        this.input.keyboard.on('keyup-ENTER',() => this.corregir());
        
        var boton = document.createElement('button');
        boton.setAttribute('type','button');
        this.element = this.add.dom(1630, 500, boton,'','Ayuda');
        this.element.addListener('click');
        this.element.on('click',() => this.Ayuda(this.t,this.x));
        
        
        this.r = document.createElement('h2');
        this.r.style = 'font-size: 60px; ';
        this.r.innerHTML = "Respuestas";
        this.add.dom(960, 300, this.r);
        
        this.respuestas = new Array();
        
        
        
        
        
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
        if(this.indiceaprend<36){
            if(resp === this.t*this.x+""){
                this.indiceaprend++;
                console.log("correcto");

            }else{

                this.aprendiendo[this.tablas[this.indiceaprend][0]-2]++;
                this.aprendiendo[this.tablas[this.indiceaprend][1]-2]++;
                this.indiceaprend++;
                console.log("incorrecto");
            }
        }
        if(this.indiceaprend>=36){
            var max=0;
            var practicar;
            for(var i=0;i<this.aprendiendo.length;i++){
                if(this.aprendiendo[i]>max){
                    max=this.aprendiendo[i];
                }
            }
            for(var i=0;i<this.aprendiendo.length;i++){
                if(this.aprendiendo[i]===max){
                    practicar=i+2;
                    break;
                }
            }
            if(max>0){
                Swal.fire('Diagnóstico listo ¡Llama a tu profesor! ',
                    'Deberías practicar la tabla del '+practicar,'success');
            }else{
                Swal.fire('Diagnóstico listo ¡Llama a tu profesor! ',
                    'Parece que te sabes todas las tablas ','success');
            }
                
                //this.correcto();
                
        }else{
            this.t = this.tablas[this.indiceaprend][0];
            this.x = this.tablas[this.indiceaprend][1];
            this.div.innerHTML = this.t+"&times;"+this.x+"=";
            document.getElementById("R").value="";
            console.log(this.tablas[this.indiceaprend]);
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
    Ayuda(t,x){ //t=tabla;  x=número
        let timerInterval
        Swal.fire({
          title: t+'x'+x+"="+(t*x),
          html: 'Tienes <b></b>.',
          timer: 3000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            const b = Swal.getHtmlContainer().querySelector('b');
            timerInterval = setInterval(() => {
              b.textContent = Math.floor(Swal.getTimerLeft()/1000)+1
            }, 100);
          },
          willClose: () => {
            clearInterval(timerInterval)
          }
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            //console.log('I was closed by the timer')
          }
        });
        this.indiceaprend=0;
        this.aprendiendo.sort( () => .5 - Math.random() );
        this.r.innerHTML = "Respuestas<br>";
        this.t = this.tablas[Math.floor(Math.random()*this.tablas.length)];
        this.x = this.aprendiendo[this.indiceaprend];
        this.div.innerHTML = this.t+"&times;"+this.x+"=";
        document.getElementById("R").value="";
        this.respuestas=new Array();
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
  scene: [menu, Tablas, Diag ],//
  scale: {
      mode: Phaser.Scale.Fit
  },
 fps: {
        target: 30,
        forceSetTimeOut: true
    }
}

var game = new Phaser.Game(config);