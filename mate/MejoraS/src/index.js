/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
const titulo = 'Mejora la suma'; //Titulo del juego

                

//const escenas = [Contar, ENG,s1,s2,s3,r1,r2,r3,m1,m2,m3,d1,d2,d3];
const LargoM = 400; //Largo de boton en menú
const Fondos = [0xd0598f,0x33a099,0xfdcf20,0x2272b4];
const Colores = [0xd0598f,0x33a099,0xfdcf20,0x2272b4]; // Colore PILARES
var a=0,b=0; //Alpha a= error b=correcto
var c,w; //Sonido c=correcto w=equivocado
var level=1;
var s;
var val;
var r=0;
var t=0, t2=0;
var min,max;
var tmax;
var continuar=true;

class menu extends Phaser.Scene {
    constructor() {
        super({key: 'menu'}); // active:'true'
    }
    init(data){
        if(data.l!==undefined){
            level = data.l;
        }
    }
    preload() {
        this.load.image('logo', './asset/img/logo.jpeg');
    }
    create() {
        
        this.graph = this.add.graphics();
        this.graph.fillStyle(Fondos[level-1]);
        this.graph.fillRect(0,0,1920,1080);
        
        this.add.image(205, 82, 'logo');
        
      
        
        
        
        
        for(var i=1;i<=4;i++){
            
                var boton = document.createElement('button');
                boton.setAttribute('type', 'button');
                boton.setAttribute('id', 'l'+i);
                
                this.element = this.add.dom(1050+i*130, 75, boton, '', ""+i);
                this.element.addListener('click');
                this.element.on('click', this.verifica, this);
            
        }
        var max;
        if(level===1){
            max=5;
        }else{
            max=9;
        }
        for(var i=1;i<=max;i++){
            if(level < 4 || i>1){
                var boton = document.createElement('button');
                boton.setAttribute('type', 'button');
                boton.setAttribute('id', i);                
                this.element = this.add.dom(300+i*130, 500, boton, '', ""+i);
                this.element.addListener('click');
                this.element.on('click', this.verifica, this);
            }
            
        }
        
    }
    verifica (i){
        var boton = i.target.id;
        if(boton[0]==='l'){
            this.scene.start('menu',{l: parseInt(boton[1],10)});
        }else{
            if(level===4){
                this.scene.start('suma2',{l: level,s:parseInt(boton,10)});
            }else{
                this.scene.start('suma',{l: level,s:parseInt(boton,10)});
            }
            
        }
    }
}
class suma extends Phaser.Scene {
    constructor() {
        super({key: 'suma'}); // active:'true'
    }
    init(data){
        level = data.l;
        s=data.s;
    }
    preload() {
        this.load.image('inicio', './asset/img/inicio.png');
        val=new Array();
        min=0;
        if(level===1){
            for(var i=0;i<10-s;i++){
                val.push(i);
            }
            max=9;
            tmax=9*2000;
        }else if(level===2){
            for(var i=0;i<10;i++){
                val.push(i);
            }
            max=9+s;
            tmax=9*2000;
        }else{
            for(var i=0;i<20;i++){
                val.push(i);
            }
            max=19+s;
            tmax=19*2000;
        }
        
        val.sort(() => (Math.random() > 0.5 ? 1 : -1));
        
        for(var i=0;val.length<10;i++){
            val.push(i);
        }
        val.sort(() => (Math.random() > 0.5 ? 1 : -1));
        
        this.load.audio('correct', './asset/sounds/correct.mp3');
        this.load.audio('wrong', './asset/sounds/wrong.mp3');
    }
    create() {
        continuar=true;
        this.inicio = this.add.image(130,130,'inicio');
        this.inicio.setScale(0.5);
        
        c = this.sound.add('correct',{loop:false});
        w = this.sound.add('wrong',{loop:false});
        t=0;
        tmax=2000*val.length;
        
        
        
         this.debug = this.add.graphics();
        for(var i=0;i<=max;i++){
            this.debug.fillStyle(0xFF5722);
            this.debug.fillRect(50+i*60,250,60,60);
            const ini = this.add.zone(50+i*60,250,60,60);
            this.add.graphics().lineStyle(2, 0x000000).strokeRectShape(ini);
            this.add.text(80+i*60, 280, i, { color: 'black', fontFamily: 'Arial', fontSize: '50px '}).setOrigin(0.5,0.5);
        }
        
        
        const inicio = this.add.zone(0, 0, 250, 250);
        inicio.setOrigin(0);
        inicio.setInteractive();
        inicio.once('pointerdown', () => this.opcionPulsada('inicio'));
        
        this.div = document.createElement('h1');
        this.div.style = 'font-size: 100px; ';
        this.div.innerHTML = val[r]+"+"+s+"=";
        this.d=this.add.dom(900, 400, this.div).setOrigin(0.5,0.5);
        
        this.respuesta = document.createElement('input');
        this.respuesta.setAttribute('type'  ,'number');
        this.respuesta.setAttribute('id','respuesta');
        this.respuesta.setAttribute('placeholder','?');
        this.respuesta.setAttribute('autofocus','autofocus');
        this.res = this.add.dom(1100, 455, this.respuesta).setOrigin(0.5,0.5);
        
        var boton = document.createElement('button');
        boton.setAttribute('type','button');
        boton.setAttribute('id','corregir');
        this.element = this.add.dom(1350, 455, boton,'','Corregir');
        this.element.addListener('click');
        this.element.on('click',() => this.corregir());
        this.input.keyboard.on('keydown-ENTER',() => this.corregir());
        
        
        this.lienzo = this.add.graphics();
        this.lienzo2= this.add.graphics();
        
        this.crono = this.add.graphics();
        this.crono.fillStyle(0xAB47BC);
        this.crono.fillRect(300,100,1500,60);
        const cronos = this.add.zone(300,100,1500,60);
        this.add.graphics().lineStyle(5, 0x000000).strokeRectShape(cronos);
        t=0;
        t2=0;
        
    }
    corregir(){
        var resp = document.getElementById('respuesta').value;
        console.log("t = "+t);
        console.log("t2 = "+t2);
        console.log("tmax = "+tmax);
        //console.log(this.zonas);
        if(r<val.length){
            if(resp===(val[r%val.length]+s)+""){
                this.correcto();
                document.getElementById('respuesta').value="";
                r++;
                if(r%val.length===0){
                    val.sort(() => (Math.random() > 0.5 ? 1 : -1));
                }
                this.div.innerHTML = val[r%val.length]+"+"+s+"=";
                t-=1000;
            }else{
                this.falso();
                document.getElementById('respuesta').value="";

            }
        }else{
            this.element.setVisible(false);
            this.res.setVisible(false);
            continuar=false;
            this.div.innerHTML = "Terminado en "+Math.round(t2/10)/100+"s";
            this.d.x-=200;
            if(t/1000<val.length){
                this.div.innerHTML += "<p>Pasa al siguiente nivel</p>";
            }else{
                this.div.innerHTML += "<p>Trata de mejorar tu tiempo</p>";
            }
            
        }
        document.getElementById('respuesta').focus();
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
        t2+=delta;
        if(continuar){
            t+=delta;
        }
        if(tmax>t){
            this.crono.clear();
            this.crono.fillStyle(0xAB47BC);
            if(t>0){
                this.crono.fillRect(300,100,1500*(1-t/tmax),60);
            }else{
                this.crono.fillRect(300,100,1500,60);
            }
            
        }else{
            this.crono.clear();
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
        if(opcion==='inicio'){
            r=0;
            this.scene.start('menu',{l:level});
        }
    }
}
class suma2 extends Phaser.Scene {
    constructor() {
        super({key: 'suma2'}); // active:'true'
    }
    init(data){
        level = data.l;
        s=data.s;
    }
    preload() {
        this.load.image('inicio', './asset/img/inicio.png');
        this.n= new Array();
        this.m= new Array();
        this.o= new Array();
        val = new Array();
        min=0;
        max=18;
        this.tam=Math.ceil(s/2);
        for(var i = 0; i<this.tam && i<3;i++){
            val.push([0,1,2,3,4,5,6,7,8,9]);
        }
        for(var i=0;i<val.length;i++){
            val[i].sort(() => (Math.random() > 0.5 ? 1 : -1));
        }
        if(s>=7){
            max=27;
        }
        
        for(var i=0;i<val.length;i++){
            this.n.push(val[i][0]);
        }
        
        for(var i=0;i<s-val.length && i<3;i++){
            
            this.m.push(Math.floor(Math.random()*(9-val[i][0])));
        }
        for(var i=0;i<s-6;i++){
            this.o.push(Math.floor(Math.random()*8)+1);
        }
        tmax=this.n.length*3000+this.o.length*300;
        this.load.audio('correct', './asset/sounds/correct.mp3');
        this.load.audio('wrong', './asset/sounds/wrong.mp3');
    }
    create() {
        continuar=true;
        this.inicio = this.add.image(130,130,'inicio');
        this.inicio.setScale(0.5);
        this.res=new Array();
        c = this.sound.add('correct',{loop:false});
        w = this.sound.add('wrong',{loop:false});
        t=0;
        
         this.debug = this.add.graphics();
         this.debug2 = this.add.graphics();
        for(var i=0;i<=max;i++){
            this.debug.fillStyle(0xFF5722);
            this.debug.fillRect(50+i*60,250,60,60);
            const ini = this.add.zone(50+i*60,250,60,60);
            this.add.graphics().lineStyle(2, 0x000000).strokeRectShape(ini);
            this.add.text(80+i*60, 280, i, { color: 'black', fontFamily: 'Arial', fontSize: '50px '}).setOrigin(0.5,0.5);
        }
        const inicio = this.add.zone(0, 0, 250, 250);
        inicio.setOrigin(0);
        inicio.setInteractive();
        inicio.once('pointerdown', () => this.opcionPulsada('inicio'));
        var imp= false;
        this.d=new Array();
        for(var i=0;i<this.n.length;i++){
            this.div = document.createElement('h1');
            this.div.style = 'font-size: 100px; ';
            if(this.n[i]!==0 || i===(this.n.length-1)){
                imp = imp || true;
            }
            if(imp){
                
                this.div.innerHTML = this.n[i];
                this.d.push(this.add.dom(900+i*70+(3-this.n.length)*70, 400, this.div).setOrigin(0.5,0.5));
                
            
                
               
            }else{
                this.div.innerHTML = " ";
                this.d.push(this.add.dom(875+i*70+(3-this.n.length)*70, 345, this.div).setOrigin(0.5,0.5));
            }
            if(i!==this.n.length-1){
                this.respuesta = document.createElement('input');
                this.respuesta.setAttribute('type'  ,'number');
                this.respuesta.setAttribute('id','acarreo'+i);
                this.respuesta.setAttribute('min','0');
                this.respuesta.setAttribute('min','9');
                this.respuesta.setAttribute('placeholder','0');
                this.res.push(this.add.dom(900+i*70+(3-this.n.length)*70, 400, this.respuesta).setOrigin(0.5,0.5));
            }
                
        }
        var imp= false;
        for(var i=0;i<this.m.length;i++){
            this.div = document.createElement('h1');
            this.div.style = 'font-size: 100px; ';
            
            if(this.m[i]!==0 || i===(this.m.length-1)){
                imp = imp || true;
            }
            if(imp){
                
                this.div.innerHTML = this.m[i];
                this.d.push(this.add.dom(900+i*70+(3-this.m.length)*70, 500, this.div).setOrigin(0.5,0.5));
            }else{
                this.div.innerHTML = " ";
                this.d.push(this.add.dom(875+i*70+(3-this.n.length)*70, 445, this.div).setOrigin(0.5,0.5));
            }
                
        }
        var imp= false;
        for(var i=0;i<this.o.length;i++){
            this.div = document.createElement('h1');
            this.div.style = 'font-size: 100px; ';
            if(this.o[i]!==0 || i===(this.o.length-1)){
                imp = imp || true;
            }
            if(imp){
                this.div.innerHTML = this.o[i];
                this.d.push(this.add.dom(900+i*70+(3-this.o.length)*70, 600, this.div).setOrigin(0.5,0.5));
            }else{
                this.div.innerHTML = " ";
                this.d.push(this.add.dom(875+i*70+(3-this.n.length)*70, 545, this.div).setOrigin(0.5,0.5));
            }
                
        }
        if(this.o.length>0){
            this.debug2.lineStyle(5, 0x000000, 1);
            this.debug2.lineBetween(800, 700, 1100, 700);
        }else{
            this.debug2.lineStyle(5, 0x000000, 1);
            this.debug2.lineBetween(800, 600, 1100, 600);
        }
        
        for(var i=this.n.length;i>=0;i--){
            
                this.respuesta = document.createElement('input');
                this.respuesta.setAttribute('type'  ,'number');
                this.respuesta.setAttribute('id','respuesta'+i);
                this.respuesta.setAttribute('class','resp');
                this.respuesta.setAttribute('min','0');
                this.respuesta.setAttribute('min','9');
                this.respuesta.setAttribute('placeholder','0');
                this.respuesta.setAttribute('autofocus','autofocus');
                this.res.push(this.add.dom(900+i*70+(2-this.n.length)*60, this.o.length>0?780:680, this.respuesta).setOrigin(0.5,0.5));
                
        }
        
        this.div = document.createElement('h1');
                this.div.style = 'font-size: 100px; ';
                this.div.innerHTML = "&plus;";
                this.add.dom(800+(3-this.n.length)*60, this.o.length>0?500:450, this.div).setOrigin(0.5,0.5);
            
        
        
        
        
        var boton = document.createElement('button');
        boton.setAttribute('type','button');
        boton.setAttribute('id','corregir');
        this.element = this.add.dom(1350, 455, boton,'','Corregir');
        this.element.addListener('click');
        this.element.on('click',() => this.corregir());
        this.input.keyboard.on('keydown-ENTER',() => this.corregir());
        
        
        this.lienzo = this.add.graphics();
        this.lienzo2= this.add.graphics();
        
        
        this.crono = this.add.graphics();
        this.crono.fillStyle(0xAB47BC);
        this.crono.fillRect(300,100,1500,60);
        const cronos = this.add.zone(300,100,1500,60);
        this.add.graphics().lineStyle(5, 0x000000).strokeRectShape(cronos);
        
        t=0;
        t2=0;
    }
    corregir(){
        var resp=0;
        for(var i=0;i<=this.n.length;i++){
            
            resp=resp*10+parseInt(0+document.getElementById('respuesta'+i).value);
        }
        console.log(resp);
        var n=0;
        var m=0;
        var o=0;
        for(var i=0;i<this.n.length;i++){
            n=n*10+this.n[i];
        }
        for(var i=0;i<this.m.length;i++){
            m=m*10+this.m[i];
        }
        for(var i=0;i<this.o.length;i++){
            o=o*10+this.o[i];
        }
        console.log('n = '+n);
        console.log('m = '+m);
        console.log('o = '+o);
        
        //console.log(this.zonas);
        if(r<5){
            if(resp===(n+m+o)){
                this.correcto();
                r++;
                for(var i=0;i<this.n.length;i++){
                    this.n[i]=val[i][r];
                    this.d[i].node.innerHTML=val[i][r];
                }
                for(var i=0;i<this.m.length;i++){
                    this.m[i]=Math.floor(Math.random()*(9-val[i][r]));
                    this.d[i+this.n.length].node.innerHTML=this.m[i];
                }
                for(var i=0;i<this.o.length;i++){
                    this.o[i]=Math.floor(Math.random()*(9));
                    this.d[i+6].node.innerHTML=this.o[i];
                }
                t-=2000*this.n.length;
            }else{
                this.falso();
            }
            for(var i=0;i<=this.n.length;i++){
                document.getElementById('respuesta'+i).value="";
            }
            for(var i=0;i<this.n.length-1;i++){
                
                document.getElementById('acarreo'+i).value="";
            }
            document.getElementById('respuesta'+this.n.length).focus();
        }else if(r<val[0].length-1){
            if(resp===(n+m+o)){
                this.correcto();
                r++;
                for(var i=0;i<this.n.length;i++){
                    this.n[i]=val[i][r];
                    this.d[i].node.innerHTML=val[i][r];
                }
                for(var i=0;i<this.m.length;i++){
                    this.m[i]=Math.floor(Math.random()*(9));
                    this.d[i+this.n.length].node.innerHTML=this.m[i];
                }
                for(var i=0;i<this.o.length;i++){
                    this.o[i]=Math.floor(Math.random()*(9));
                    this.d[i+6].node.innerHTML=this.o[i];
                }
                t-=2000*this.n.length;
            }else{
                this.falso();
            }
            for(var i=0;i<=this.n.length;i++){
                document.getElementById('respuesta'+i).value="";
            }
            document.getElementById('respuesta'+this.n.length).focus();
        }else {
            continuar=false;
            this.element.setVisible(false);
            for(var i=0;i<this.d.length;i++){
                this.d[i].setVisible(false);
            }
            for(var i=0;i<this.res.length;i++){
                this.res[i].setVisible(false);
            }
            
            this.debug2.clear();
            this.div.innerHTML = "Terminado en "+Math.round(t2/10)/100+"s";
            this.d.x-=200;
            if(t<tmax){
                this.div.innerHTML += "<p>Pasa al siguiente nivel</p>";
            }else{
                this.div.innerHTML += "<p>Trata de mejorar tu tiempo</p>";
            }
            
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
       
        t2+=delta;
        if(continuar){
            t+=delta;
        }
        if(tmax>t){
            
            this.crono.clear();
            this.crono.fillStyle(0xAB47BC);
            if(t>0){
                this.crono.fillRect(300,100,1500*(1-t/tmax),60);
            }else{
                this.crono.fillRect(300,100,1500,60);
            }
            
        }else{
            this.crono.clear();
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
        if(opcion==='inicio'){
            r=0;
            this.scene.start('menu',{l:level});
        }
    }
}
const config = {
  type: Phaser.AUTO,
  width: 1920,
  height: 1080,
  backgroundColor: '#ffffff',
  parent: 'phaser-example',
  data: {
      l: 1
  },
  dom: {
        createContainer: true
    },
  scene: [menu,suma,suma2],
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

