/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
let letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
let words = ['GEL', 'TRAIN', 'SPORT', 'RICH', 'EEL', 'FANS', 'DOME', 'TALL', 'BETTER', 'HIT', 'PEANUT', 'CAKE', 'BITE', 'NOON', 'GUMMY', 'STING', 'RAY', 'DUSK', 'MOPS', 'THANKS', 'DASH', 'SKIN', 'STAR', 'BEGAN', 'GREW', 'FINE', 'DAY', 'UPSET', 'FATHER', 'JAM', 'MUGS', 'FAIR', 'DINNER', 'RATS', 'FED', 'SIR', 'BOOM', 'WAVE', 'TRUNK', 'SLEEPY', 'FULL', 'HUGE', 'BORN', 'JUMPING', 'DAMP', 'FROM', 'HUNCH', 'EACH', 'SHADE', 'RIBS'];
let bv="BV", cz="CZ";
var fx,c,w;
var a=0,b=0;
var rc=0, p=0;
var timedEvent;

class alpha extends Phaser.Scene{
    
    constructor() {
		super({key:'alpha'}); //, active:'true'
    }
    preload(){
        for(var i=0;i<letters.length;i++){
            this.load.audio(letters.charAt(i)+'', './assets/sounds/'+letters.charAt(i)+'.mp3');
            //console.log(letters.charAt(i)+'.mp3');
        }
        this.load.audio('correct', './assets/sounds/correct.mp3');
        this.load.audio('wrong', './assets/sounds/wrong.mp3');
        this.load.image('logo','./assets/img/logo.jpeg');
        this.load.image('play','./assets/img/play.png');
    }
    create(){
        this.add.image(205,82,'logo');
        
        this.graph = this.add.graphics();
        this.graph.fillStyle(0xF1C40F);
        this.graph.fillRect(1600,50,300,90);
        this.add.text(1750, 50, 'Home', { color: 'black', fontFamily: 'Arial', fontSize: '70px '}).setOrigin(0.5,0);
        
        const ini = this.add.zone(1600, 50, 300, 90);
	ini.setOrigin(0);
	ini.setInteractive();
	ini.once('pointerdown', () => this.opcionPulsada('ini'));
	this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(ini);
        
        this.div = document.createElement('h1');
        this.div.style = 'width: 1000px; font-size: 80px; ';
        
        
        this.div.innerHTML ='¿Qué letra suena?';
        this.add.dom(960, 300, this.div);
        
        this.letra =Math.floor(Math.random()*letters.length);
        //console.log(letters.charAt(this.letra));
        fx = this.sound.add(letters.charAt(this.letra)+'',{loop:false});
        c = this.sound.add('correct',{loop:false});
        w = this.sound.add('wrong',{loop:false});
        var sonar = this.add.image(1260,350,'play');
        sonar.setScale(0.1);
        sonar.setInteractive();
        sonar.on('pointerover',function(){
            sonar.setTint(0x07B40D);
        });
        sonar.on('pointerout',function(){
            sonar.clearTint();
        });
        sonar.on('pointerdown',function(){
            fx.play();
        });
        this.scene.bringToTop("alpha");
        
        this.respuesta = document.createElement('input');
        this.respuesta.setAttribute('type'  ,'text');
        this.respuesta.setAttribute('id','respuesta');
        this.respuesta.setAttribute('placeholder','Respuesta');
        this.respuesta.setAttribute('autofocus','autofocus');
        this.respuesta.setAttribute('style','width');
        this.r = this.add.dom(960, 500, this.respuesta);
        
        this.lienzo = this.add.graphics();
        this.lienzo.fillStyle(0xff0000);
        this.lienzo.setAlpha(a);
        this.lienzo.fillRect(0,0,1920,1080);
        
        this.lienzo2 = this.add.graphics();
        this.lienzo2.fillStyle(0x00ff00);
        this.lienzo2.setAlpha(a);
        this.lienzo2.fillRect(0,0,1920,1080);
        
        
    }
    update(time,delta){
        
        var r=document.getElementById('respuesta').value;
        r=r.toUpperCase();
        if(rc){
            this.lienzo3 = this.add.graphics();
            this.lienzo3.fillStyle(0x03A9F4);
            this.lienzo3.fillRect(1300,50,300,100);
            this.opc= this.add.text(1335, 75, '¿OTRO?', { color: 'black', fontFamily: 'Arial', fontSize: '50px '});

            const otro = this.add.zone(1300, 50, 300,100);
            otro.setOrigin(0);
            otro.setInteractive();
            otro.on('pointerdown', () => this.opcionPulsada('otro'));
        }else{
            if(r === letters.charAt(this.letra)){
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
            if(a>0){
                a-=0.5*delta/1000;
                this.lienzo.clear();
                this.lienzo.setAlpha(a);
                this.lienzo.fillStyle(0xff0000);
                this.lienzo.fillRect(0,0,1920,1080);
            }else{
                a=0;

            }
        }
    }
    opcionPulsada(opcion) {
        rc=0;
        if(opcion === 'ini'){
            this.scene.start('menu');
        } else if(opcion === 'otro'){
           this.scene.start('alpha');
        }else{
            console.log("A dónde voy?");
        }
        
    }
}

class borv extends Phaser.Scene{
    
    constructor() {
		super({key:'borv'}); //, active:'true'
    }
    preload(){
        for(var i=0;i<bv.length;i++){
            this.load.audio(bv.charAt(i)+'', './assets/sounds/'+bv.charAt(i)+'.mp3');
            //console.log(letters.charAt(i)+'.mp3');
        }
        this.load.audio('correct', './assets/sounds/correct.mp3');
        this.load.audio('wrong', './assets/sounds/wrong.mp3');
        this.load.image('logo','./assets/img/logo.jpeg');
        this.load.image('play','./assets/img/play.png');
    }
    create(){
        this.add.image(205,82,'logo');
        
        this.graph = this.add.graphics();
        this.graph.fillStyle(0xF1C40F);
        this.graph.fillRect(1600,50,300,90);
        this.add.text(1750, 50, 'Home', { color: 'black', fontFamily: 'Arial', fontSize: '70px '}).setOrigin(0.5,0);
        
        const ini = this.add.zone(1600, 50, 300, 90);
	ini.setOrigin(0);
	ini.setInteractive();
	ini.once('pointerdown', () => this.opcionPulsada('ini'));
	this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(ini);
        
        this.div = document.createElement('h1');
        this.div.style = 'width: 1000px; font-size: 80px; ';
        
        
        this.div.innerHTML ='¿Qué letra suena?';
        this.add.dom(960, 300, this.div);
        
        this.letra =Math.floor(Math.random()*bv.length);
        //console.log(letters.charAt(this.letra));
        fx = this.sound.add(bv.charAt(this.letra)+'',{loop:false});
        c = this.sound.add('correct',{loop:false});
        w = this.sound.add('wrong',{loop:false});
        var sonar = this.add.image(1260,350,'play');
        sonar.setScale(0.1);
        sonar.setInteractive();
        sonar.on('pointerover',function(){
            sonar.setTint(0x07B40D);
        });
        sonar.on('pointerout',function(){
            sonar.clearTint();
        });
        sonar.on('pointerdown',function(){
            fx.play();
        });
        this.scene.bringToTop("alpha");
        
        this.respuesta = document.createElement('input');
        this.respuesta.setAttribute('type'  ,'text');
        this.respuesta.setAttribute('id','respuesta');
        this.respuesta.setAttribute('placeholder','Respuesta');
        this.respuesta.setAttribute('autofocus','autofocus');
        this.respuesta.setAttribute('style','width');
        this.r = this.add.dom(960, 500, this.respuesta);
        
        this.lienzo = this.add.graphics();
        this.lienzo.fillStyle(0xff0000);
        this.lienzo.setAlpha(a);
        this.lienzo.fillRect(0,0,1920,1080);
        
        this.lienzo2 = this.add.graphics();
        this.lienzo2.fillStyle(0x00ff00);
        this.lienzo2.setAlpha(a);
        this.lienzo2.fillRect(0,0,1920,1080);
        
        
    }
    update(time,delta){
        
        var r=document.getElementById('respuesta').value;
        r=r.toUpperCase();
        if(rc){
            this.lienzo3 = this.add.graphics();
            this.lienzo3.fillStyle(0x03A9F4);
            this.lienzo3.fillRect(1300,50,300,100);
            this.opc= this.add.text(1335, 75, '¿OTRO?', { color: 'black', fontFamily: 'Arial', fontSize: '50px '});

            const otro = this.add.zone(1300, 50, 300,100);
            otro.setOrigin(0);
            otro.setInteractive();
            otro.on('pointerdown', () => this.opcionPulsada('otro'));
        }else{
            if(r === bv.charAt(this.letra)){
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
            if(a>0){
                a-=0.5*delta/1000;
                this.lienzo.clear();
                this.lienzo.setAlpha(a);
                this.lienzo.fillStyle(0xff0000);
                this.lienzo.fillRect(0,0,1920,1080);
            }else{
                a=0;

            }
        }
    }
    opcionPulsada(opcion) {
        rc=0;
        if(opcion === 'ini'){
            this.scene.start('menu');
        } else if(opcion === 'otro'){
           this.scene.start('borv');
        }else{
            console.log("A dónde voy?");
        }
        
    }
}

class corz extends Phaser.Scene{
    
    constructor() {
		super({key:'corz'}); //, active:'true'
    }
    preload(){
        for(var i=0;i<cz.length;i++){
            this.load.audio(cz.charAt(i)+'', './assets/sounds/'+cz.charAt(i)+'.mp3');
            //console.log(letters.charAt(i)+'.mp3');
        }
        this.load.audio('correct', './assets/sounds/correct.mp3');
        this.load.audio('wrong', './assets/sounds/wrong.mp3');
        this.load.image('logo','./assets/img/logo.jpeg');
        this.load.image('play','./assets/img/play.png');
    }
    create(){
        this.add.image(205,82,'logo');
        
        this.graph = this.add.graphics();
        this.graph.fillStyle(0xF1C40F);
        this.graph.fillRect(1600,50,300,90);
        this.add.text(1750, 50, 'Home', { color: 'black', fontFamily: 'Arial', fontSize: '70px '}).setOrigin(0.5,0);
        
        const ini = this.add.zone(1600, 50, 300, 90);
	ini.setOrigin(0);
	ini.setInteractive();
	ini.once('pointerdown', () => this.opcionPulsada('ini'));
	this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(ini);
        
        this.div = document.createElement('h1');
        this.div.style = 'width: 1000px; font-size: 80px; ';
        
        
        this.div.innerHTML ='¿Qué letra suena?';
        this.add.dom(960, 300, this.div);
        
        this.letra =Math.floor(Math.random()*cz.length);
        //console.log(letters.charAt(this.letra));
        fx = this.sound.add(cz.charAt(this.letra)+'',{loop:false});
        c = this.sound.add('correct',{loop:false});
        w = this.sound.add('wrong',{loop:false});
        var sonar = this.add.image(1260,350,'play');
        sonar.setScale(0.1);
        sonar.setInteractive();
        sonar.on('pointerover',function(){
            sonar.setTint(0x07B40D);
        });
        sonar.on('pointerout',function(){
            sonar.clearTint();
        });
        sonar.on('pointerdown',function(){
            fx.play();
        });
        this.scene.bringToTop("alpha");
        
        this.respuesta = document.createElement('input');
        this.respuesta.setAttribute('type'  ,'text');
        this.respuesta.setAttribute('id','respuesta');
        this.respuesta.setAttribute('placeholder','Respuesta');
        this.respuesta.setAttribute('autofocus','autofocus');
        this.respuesta.setAttribute('style','width');
        this.r = this.add.dom(960, 500, this.respuesta);
        
        this.lienzo = this.add.graphics();
        this.lienzo.fillStyle(0xff0000);
        this.lienzo.setAlpha(a);
        this.lienzo.fillRect(0,0,1920,1080);
        
        this.lienzo2 = this.add.graphics();
        this.lienzo2.fillStyle(0x00ff00);
        this.lienzo2.setAlpha(a);
        this.lienzo2.fillRect(0,0,1920,1080);
        
        
    }
    update(time,delta){
        
        var r=document.getElementById('respuesta').value;
        r=r.toUpperCase();
        if(rc){
            this.lienzo3 = this.add.graphics();
            this.lienzo3.fillStyle(0x03A9F4);
            this.lienzo3.fillRect(1300,50,300,100);
            this.opc= this.add.text(1335, 75, '¿OTRO?', { color: 'black', fontFamily: 'Arial', fontSize: '50px '});

            const otro = this.add.zone(1300, 50, 300,100);
            otro.setOrigin(0);
            otro.setInteractive();
            otro.on('pointerdown', () => this.opcionPulsada('otro'));
        }else{
            if(r === cz.charAt(this.letra)){
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
            if(a>0){
                a-=0.5*delta/1000;
                this.lienzo.clear();
                this.lienzo.setAlpha(a);
                this.lienzo.fillStyle(0xff0000);
                this.lienzo.fillRect(0,0,1920,1080);
            }else{
                a=0;

            }
        }
    }
    opcionPulsada(opcion) {
        rc=0;
        if(opcion === 'ini'){
            this.scene.start('menu');
        } else if(opcion === 'otro'){
           this.scene.start('corz');
        }else{
            console.log("A dónde voy?");
        }
    }
}

class bee extends Phaser.Scene{  
    constructor() {
		super({key:'bee'}); //, active:'true'
    }
    preload(){
        for(var i=0;i<letters.length;i++){
            this.load.audio(letters.charAt(i)+'', './assets/sounds/'+letters.charAt(i)+'.mp3');
            //console.log(letters.charAt(i)+'.mp3');
        }
        this.load.audio('correct', './assets/sounds/correct.mp3');
        this.load.audio('wrong', './assets/sounds/wrong.mp3');
        this.load.image('logo','./assets/img/logo.jpeg');
        this.load.image('play','./assets/img/play.png');
        words.sort(() => (Math.random() > 0.5 ? 1 : -1));
        

    }
    create(){
        this.add.image(205,82,'logo');
        this.div = document.createElement('h1');
        this.div.style = 'width: 1000px; font-size: 80px; ';
        
        this.graph = this.add.graphics();
        this.graph.fillStyle(0xF1C40F);
        this.graph.fillRect(1600,50,300,90);
        this.add.text(1750, 50, 'Home', { color: 'black', fontFamily: 'Arial', fontSize: '70px '}).setOrigin(0.5,0);
        
        const ini = this.add.zone(1600, 50, 300, 90);
	ini.setOrigin(0);
	ini.setInteractive();
	ini.once('pointerdown', () => this.opcionPulsada('ini'));
	this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(ini);
        
        
        this.div.innerHTML ='¿Qué letra suena?';
        this.add.dom(960, 300, this.div);
        
        this.letra =Math.floor(Math.random()*cz.length);
        //console.log(letters.charAt(this.letra));
        fx = new Array();
        //console.log(words[p]);
        for(var i=0;i<words[p].length;i++){
            //console.log(words[p].charAt(i));
            fx.push(this.sound.add(words[p].charAt(i),{loop: false, seek:2, delay: i}));
        }
         
        c = this.sound.add('correct',{loop:false});
        w = this.sound.add('wrong',{loop:false});
        var sonar = this.add.image(1260,350,'play');
        sonar.setScale(0.1);
        sonar.setInteractive();
        sonar.on('pointerover',function(){
            sonar.setTint(0x07B40D);
        });
        sonar.on('pointerout',function(){
            sonar.clearTint();
        });
        sonar.on('pointerdown', function(){
            for(var i=0;i<fx.length;i++){
                setTimeout(() => {  
                    fx[i].play();
                    i++;}, 
                i*1000);
            }
            i=0;
        });
        this.scene.bringToTop("alpha");
        
        this.respuesta = document.createElement('input');
        this.respuesta.setAttribute('type'  ,'text');
        this.respuesta.setAttribute('id','respuesta');
        this.respuesta.setAttribute('placeholder','Respuesta');
        this.respuesta.setAttribute('autofocus','autofocus');
        this.respuesta.setAttribute('style','width');
        this.r = this.add.dom(960, 500, this.respuesta);
        
        this.lienzo = this.add.graphics();
        this.lienzo.fillStyle(0xff0000);
        this.lienzo.setAlpha(a);
        this.lienzo.fillRect(0,0,1920,1080);
        
        this.lienzo2 = this.add.graphics();
        this.lienzo2.fillStyle(0x00ff00);
        this.lienzo2.setAlpha(a);
        this.lienzo2.fillRect(0,0,1920,1080);
        
        
    }
    
    update(time,delta){
        
        var r=document.getElementById('respuesta').value;
        r=r.toUpperCase();
        var resp="";
        var ant="";
        for(var i=0;i<=rc-1;i++){
            ant += words[p].charAt(i);
        }
        for(var i=0;i<=rc;i++){
            resp += words[p].charAt(i);
        }
        //console.log(resp);
        if(rc === words[p].length){
            this.lienzo3 = this.add.graphics();
            this.lienzo3.fillStyle(0x03A9F4);
            this.lienzo3.fillRect(1300,50,300,100);
            this.opc= this.add.text(1335, 75, '¿OTRO?', { color: 'black', fontFamily: 'Arial', fontSize: '50px '});

            const otro = this.add.zone(1300, 50, 300,100);
            otro.setOrigin(0);
            otro.setInteractive();
            otro.on('pointerdown', () => this.opcionPulsada('otro'));
        }else{
            if(r === resp){
                //console.log("Correcto");
                b=0.25;
                //c.play();
                rc++;
            }else if(r === ant){
                //console.log("Esperando");
            }else{
                //console.log("Incorrecto");
                document.getElementById('respuesta').value=ant;
                w.play();
                a=0.75;
            }
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
    opcionPulsada(opcion) {
        rc=0;
        if(opcion === 'ini'){
            this.scene.start('menu');
        } else if(opcion === 'otro'){
            p=(p+1)%words.length;
            this.scene.start('bee');
        }else{
            console.log("A dónde voy?");
        }
        
    }
}
class menu extends Phaser.Scene{
    constructor() {
		super({key:'menu'}); //, active:'true'
    }
    preload(){
        this.load.image('logo','./assets/img/logo.jpeg');
    }
    create(){
        this.add.image(205,82,'logo');
        var h1 = this.add.dom(960, 150, 'h1', null, 'Alphabet');
        
        var lienzo =this.add.graphics();
        
        lienzo.fillStyle(0xF1C40F );
        lienzo.fillRect(652,346,616,90);
        this.add.text(960, 350, 'Learn', { color: 'black', fontFamily: 'Arial', fontSize: '70px '}).setOrigin(0.5,0);
        
        const Ex = this.add.zone(652, 346, 616, 90);
	Ex.setOrigin(0);
	Ex.setInteractive();
	Ex.once('pointerdown', () => this.opcionPulsada('Ex'));
	this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(Ex);
        
        lienzo.fillStyle(0x9B59B6 );
        lienzo.fillRect(652,446,616,90);
        this.add.text(960, 450, 'Adivina la letra', { color: 'black', fontFamily: 'Arial', fontSize: '70px '}).setOrigin(0.5,0);
        
        const al = this.add.zone(652, 446, 616, 90);
	al.setOrigin(0);
	al.setInteractive();
	al.once('pointerdown', () => this.opcionPulsada('al'));
	this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(al);
        
        lienzo.fillStyle(0x3498DB );
        lienzo.fillRect(652,546,616,90);
        this.add.text(960, 550, 'B or V', { color: 'black', fontFamily: 'Arial', fontSize: '70px '}).setOrigin(0.5,0);
        
        const bv = this.add.zone(652, 546, 616, 90);
	bv.setOrigin(0);
	bv.setInteractive();
	bv.once('pointerdown', () => this.opcionPulsada('bv'));
	this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(bv);
        
        
        lienzo.fillStyle(0x2ECC71);
        lienzo.fillRect(652,646,616,90);
        this.add.text(960, 650, 'C or Z', { color: 'black', fontFamily: 'Arial', fontSize: '70px '}).setOrigin(0.5,0);
        
        const cz = this.add.zone(652, 646, 616, 90);
	cz.setOrigin(0);
	cz.setInteractive();
	cz.once('pointerdown', () => this.opcionPulsada('cz'));
	this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(cz);
        
        lienzo.fillStyle(0xF1C40F);
        lienzo.fillRect(652,746,616,90);
        this.add.text(960, 750, 'Adivina la palabra', { color: 'black', fontFamily: 'Arial', fontSize: '70px '}).setOrigin(0.5,0);
        
        const ap = this.add.zone(652, 746, 616, 90);
	ap.setOrigin(0);
	ap.setInteractive();
	ap.once('pointerdown', () => this.opcionPulsada('ap'));
	this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(ap);
    }
    opcionPulsada(opcion) {
	if (opcion === 'al') {
		this.scene.start('alpha');
	} else if (opcion === 'bv'){
		this.scene.start('borv');
	} else if (opcion === 'cz'){
            this.scene.start('corz');
        } else if (opcion === 'ap'){
            this.scene.start('bee');
        } else if (opcion === 'Ex'){
            this.scene.start('Explorar');
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
        for(var i=0;i<letters.length;i++){
            this.load.audio(letters.charAt(i)+'', './assets/sounds/'+letters.charAt(i)+'.mp3');
            //console.log(letters.charAt(i)+'.mp3');
        }
        this.load.image('blanco','./assets/img/blanco.png');
        
    }
    create(){
        this.add.image(0,0,'logo').setOrigin(0,0);
        this.div = document.createElement('h1');
        this.div.style = 'width: 1000px; font-size: 80px; ';
        this.div.innerText = 'Touch a Letter.';
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
        for( var i=0 ; i < letters.length ; i++ ){
            
            fx.push(this.sound.add(letters.charAt(i)+"",{loop: false}));
            
            var x = 100;
            var y = 300;
            
            
            var image = this.add.image(x+(i%10)*170 , y+170*Math.floor(i/10) , 'blanco').setInteractive();
            
            this.add.text(x+(i%10)*170 , y+170*Math.floor(i/10), letters.charAt(i), { color: 'black', fontFamily: 'Arial', fontSize: '100px '}).setOrigin(0.5,0.5);
            
            image.displayWidth = 100;
            image.displayHeight = 100;
            
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
        this.div.innerText = letters.charAt(y*10+x);
    }
    out(){
        this.sound.stopAll();
        this.lienzo.clear();
        this.lienzo.setAlpha(1);
        this.div.innerText = 'Choose a Letter.';
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
const config = {
  type: Phaser.AUTO,
  width: 1920,
  height: 1080,
  backgroundColor: '#ffffff',
  parent: 'phaser-example',
  dom: {
        createContainer: true
    },
  scene: [menu,Explorar,bee,corz,borv,alpha ],
  scale: {
      mode: Phaser.Scale.Fit
  },
 fps: {
        target: 30,
        forceSetTimeOut: true
    }
}

var game = new Phaser.Game(config);

