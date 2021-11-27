/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 * 
 * https://wideo.co/text-to-speech/
 */
let vocabulary = ['a','doctor','fat','girl','pretty','red','flower','happy','my',
    'pencils','book','teacher','brown','dog','seven','lazy','old','man','toys',
    'mother','this'];

let vocabularyS =['un/una','doctor','gordo','niña','linda','rojo','flor','feliz','mi',
    'lápices','libro','maestro','café','perro','siete','flojo', 'viejo','hombre','juguetes',
    'madre','este/esta'];
let opciones = [['am not',"'m not"],['are not',"'re not","aren't"],["is not","'s not","isn't"]];

let rellenar = ['He _ a doctor', 'You _ fat', 'I _ a girl',
    'She _ a pretty','It _ a red flower','We _ happy',
    'They _ my pencils', 'This _ a red book','I _ a teacher',
    'It _ a brown dog','We _ seven years old', 'You _ lazy',
    'He _ an old man','They _ my toys','She _ my mother'];

let respuestas = [2,1,0,2,2,1,1,2,0,2,1,1,2,1,2];

let phrases = ['He is not a doctor', 'You are not fat', 'I am not a girl',
    'She is not a pretty','It is not a red flower','We are not happy',
    'They are not my pencils', 'This is not a red book','I am not a teacher',
    'It is not a brown dog','We are not seven years old', 'You are not lazy',
    'He is not an old man','They are not my toys','She is not my mother'];

let phrasesS = [['Él no es un doctor','No es un doctor'],['Tú no eres gordo',
        'No eres gordo','Ustedes no son gordos','No son gordos'],['Yo no soy una chica',
        'No soy una chica'],['Ella no es linda','No es linda'],['Eso no es una flo roja',
        'No es una flor roja'],['Nosotros no somos felices','No somos felices'],
        ['Esos no son mis lápices','No son mis lápices'],['Este no es un libro rojo'],
        ['Yo no soy un maestro','No soy un maestro'],['No es un perro café'],
        ['Nosotros no tenemos siete años','Nosotros no tenemos 7 años',
        'No tenemos siete años','No tenemos 7 años'],['Tú no eres flojo','No eres flojo',
        'Ustedes no son flojos','No son flojos'],['Él no es un hombre viejo',
        'No es un hombre viejo'],['Esos no son mi juguetes','No son mi juguetes'],
        ['Ella no es mi madre','No es mi madre']];

const titulo = 'Verb to be'; //Titulo del juego
const subtitulo = 'Negative form';

const menulabel = [['Vocabulary'],
    ['Read and translate'],
    ['Listen and write'],
    ['Listen and translate'],
    ['Choose the correct form']]; //Opciones menú

const Exp='Escoge la palabra.';



const LargoM = 600; //Largo de boton en menú
const Colores = [0xd0598f,0x33a099,0xfdcf20,0x2272b4]; // Colore PILARES
var a=0,b=0; //Alpha a= error b=correcto
var fx,c,w; //Sonido c=correcto w=equivocado
var rc=0 ; //Contadores rc = respuesta correcta
var num;
var indices;

class menu extends Phaser.Scene{
    constructor() {
		super({key:'menu'}); //, active:'true'
    }
    preload(){
        this.load.image('logo','./assets/img/logo.jpeg');
        this.load.audio('titulo','./assets/sounds/label/'+titulo+'.mp3');
    }
    create(){
        this.add.image(205,82,'logo');
        this.add.dom(960, 150, 'h1', null, titulo);
        this.add.dom(960, 230, 'h2', null, subtitulo);
        this.add.dom(960, 430, 'h1', null, 'Context');
        var lienzo =this.add.graphics();
        
        const opc = new Array();
        fx=this.sound.add('titulo',{loop: false});
        fx.play();
        for(var i=0;i<menulabel.length;i++){
            //console.log("i = "+i);
            var x = 960 -menulabel[i].length/2*LargoM-10*(menulabel[i].length-1);
            //console.log("x = "+x);
            for(var j=0; j<menulabel[i].length;j++){
                //console.log("j = "+j);
                var tam = 80*menulabel[i][j].length;
                //console.log("tam = "+tam);
                lienzo.fillStyle(Colores[i%4]);
                if(i>0){
                    lienzo.fillRect(x+(LargoM+20)*j,346+i*100+100,LargoM,90);
                }else{
                    lienzo.fillRect(x+(LargoM+20)*j,346+i*100,LargoM,90);
                }
                
                
                if(tam <= 1100){
                    if(i>0){
                        this.add.text(x+(LargoM+20)*j+LargoM/2, 346+i*100+45+100, menulabel[i][j], { color: 'black', fontFamily: 'Arial', fontSize: '80px '}).setOrigin(0.5,0.5);
                    }else{
                        this.add.text(x+(LargoM+20)*j+LargoM/2, 346+i*100+45, menulabel[i][j], { color: 'black', fontFamily: 'Arial', fontSize: '80px '}).setOrigin(0.5,0.5);
                    }
                    
                } else {
                    var f =Math.floor(80*1100/tam);
                    //console.log("f = "+f);
                    if(i>0){
                        this.add.text(x+(LargoM+20)*j+LargoM/2, 346+i*100+45+100, menulabel[i][j], { color: 'black', fontFamily: 'Arial', fontSize: f+'px '}).setOrigin(0.5,0.5);
                    }else{
                        this.add.text(x+(LargoM+20)*j+LargoM/2, 346+i*100+45, menulabel[i][j], { color: 'black', fontFamily: 'Arial', fontSize: f+'px '}).setOrigin(0.5,0.5);
                    }
                    
                }
                if(i>0){
                    opc.push(this.add.zone(x+(LargoM+20)*j,346+i*100+100,LargoM,90));
                }else{
                    opc.push(this.add.zone(x+(LargoM+20)*j,346+i*100,LargoM,90));
                }
                
                
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
        
	if (opcion === 0) {
            this.scene.start('Explorar');
	} else if (opcion === 1) {
            this.scene.start('RC');
	} else if (opcion === 2) {
            this.scene.start('LC');
	} else if (opcion === 3) {
           this.scene.start('LW');
	} else if (opcion === 4) {
           this.scene.start('CF');
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
        this.load.image('Blanco','./assets/img/blanco.png');
        this.load.image('Blanco 2','./assets/img/blanco2.png');
        for(var i=0; i < vocabulary.length; i++){
            this.load.audio(vocabulary[i],'./assets/sounds/vocabulary/'+vocabulary[i]+'.mp3');
        }
        
    }
    create(){
        this.add.image(0,0,'logo').setOrigin(0,0);
        this.div = document.createElement('h1');
        this.div.style = 'width: 1000px; font-size: 80px; ';
        this.div.innerText = Exp;
        this.add.dom(1200, 50, this.div).setOrigin(0.5,0.5);
        
        this.graph = this.add.graphics();
        this.graph.fillStyle(0xF1C40F);
        this.graph.fillRect(1600,50,300,90);
        this.add.text(1750, 50, 'INICIO', { color: 'black', fontFamily: 'Arial', fontSize: '70px '}).setOrigin(0.5,0);
        
        const ini = this.add.zone(1600, 50, 300, 90);
	ini.setOrigin(0);
	ini.setInteractive();
	ini.once('pointerdown', () => this.opcionPulsada('ini'));
	this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(ini);
        
        //this.lienzo.setAlpha(0.7);
        const opc = new Array();
        fx = new Array();
        for( var i=0 ; i < vocabulary.length ; i++ ){
            
            fx.push(this.sound.add(vocabulary[i],{loop: false}));
            
            var x =  50;
            var y = 260;
            
            
            var image = this.add.image(x+(i%5)*364 , y+110*Math.floor(i/5) , 'Blanco 2').setOrigin(0,0).setInteractive();
            this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(image);
            var tam = (vocabulary[i].length*80)/2;
            //console.log("Tam = "+tam);
            
            if (tam>310){
                var f = 290*80/tam;
                console.log(f);
                this.add.text(x+(i%5)*364+364/2 , y+110*Math.floor(i/5)+100/2, vocabulary[i], { color: 'black', fontFamily: 'Arial', fontSize: f+'px '}).setOrigin(0.5,0.5);
            }else{
                this.add.text(x+(i%5)*364+364/2 , y+110*Math.floor(i/5)+100/2, vocabulary[i], { color: 'black', fontFamily: 'Arial', fontSize: '80px '}).setOrigin(0.5,0.5);
            }
            
            
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
        
        var x= Math.floor((imagen.x-50)/364);
        var y= Math.floor((imagen.y-260)/110);
        fx[y*5+x].play();
        
        this.lienzo.fillStyle(0xff0000);
        this.lienzo.setAlpha(0.5);
        this.lienzo.fillRect(50+364*x-5,260+110*y-5,364,110);
        this.div.innerText = vocabularyS[y*5+x];
    }
    out(){
        this.sound.stopAll();
        this.lienzo.clear();
        this.lienzo.setAlpha(1);
        this.div.innerText = Exp;
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
        this.load.image('Blanco 2','./assets/img/blanco2.png');
        
        this.indices = new Array();
        
        for(var i=0;i<phrases.length;i++){
            this.indices.push(i);
        }
        this.indices.sort(() => (Math.random() > 0.5 ? 1 : -1));
        
        for(var i=0; i < phrases.length; i++){
            this.load.audio('s'+i,'./assets/sounds/vocabulary/'+phrases[i]+'.mp3');
            
        }
        
        this.load.audio('correct','./assets/sounds/'+'correct'+'.mp3');
        this.load.audio('wrong','./assets/sounds/'+'wrong'+'.mp3');
    }
    create(){
        this.sound.stopAll();
        
        this.add.image(0,0,'logo').setOrigin(0,0);
        this.div = document.createElement('h1');
        this.div.style = 'width: 1000px; font-size: 80px; ';
        this.div.innerText = 'Traduce: '+phrases[this.indices[rc]];
        this.add.dom(1000, 50, this.div).setOrigin(0.5,0.5);
        
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
        for( var i=0 ; i < phrases.length ; i++ ){
            
            fx.push(this.sound.add('s'+i,{loop: false}));
            
        }
        
        this.respuesta = document.createElement('input');
        this.respuesta.setAttribute('type'  ,'text');
        this.respuesta.setAttribute('id','respuesta');
        this.respuesta.setAttribute('placeholder','Respuesta');
        this.respuesta.setAttribute('autofocus','autofocus');
        this.respuesta.setAttribute('style','width: 1000px');
        this.r = this.add.dom(960, 400, this.respuesta);
        
        var boton = document.createElement('button');
        boton.setAttribute('type','button');
        this.element = this.add.dom(1300, 500, boton,'','Corregir');
        this.element.addListener('click');
        this.element.on('click',() => this.corregir());
        
        this.input.keyboard.on('keydown-ENTER',() => this.corregir());
        
        fx[this.indices[rc]].play();
        
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
    
    corregir(){
        var r=document.getElementById('respuesta').value;
        
        
        
        //console.log(rempl);
        //console.log(resp);
        for(var i=0;i<phrasesS[this.indices[rc]].length;i++){
            if(r === phrasesS[this.indices[rc]][i]){
                //console.log("Correcto");
                b=0.25;
                rc++;
                c.play();
                if(rc===phrases.length){
                    rc=0;
                    this.indices.sort(() => (Math.random() > 0.5 ? 1 : -1));
                }
                rc=rc%vocabulary.length;
                document.getElementById('respuesta').value="";
                this.div.innerText = 'Traduce: '+phrases[this.indices[rc]];
                this.sound.stopAll();
                fx[this.indices[rc]].play();
                break;
            }else{
                if(i=== phrasesS[this.indices[rc]].length-1){
                    w.play();
                    a=0.5;
                    
                    
                }
            }
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
        
        this.indices = new Array();
        
        for(var i=0;i<phrases.length;i++){
            this.indices.push(i);
        }
        this.indices.sort(() => (Math.random() > 0.5 ? 1 : -1));
        
        for(var i=0; i < phrases.length; i++){
            this.load.audio('s'+i,'./assets/sounds/vocabulary/'+phrases[i]+'.mp3');
        }
        
        
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
        for( var i=0 ; i < phrases.length ; i++ ){
            
            fx.push(this.sound.add('s'+i,{loop: false}));
            
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
        
        
        this.respuesta = document.createElement('input');
        this.respuesta.setAttribute('type'  ,'text');
        this.respuesta.setAttribute('id','respuesta');
        this.respuesta.setAttribute('placeholder','Respuesta');
        this.respuesta.setAttribute('autofocus','autofocus');
        this.respuesta.setAttribute('style','width: 1000px');
        this.r = this.add.dom(960, 400, this.respuesta);
        
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
            fx[this.indices[rc]].play();
    }
    corregir(){
        var r=document.getElementById('respuesta').value;
        
        
        
        
        for(var i=0;i<phrases[this.indices[rc]].length;i++){
            if(r === phrases[this.indices[rc]]){
                
                b=0.25;
                rc++;
                c.play();
                if(rc===phrases.length){
                    rc=0;
                    this.indices.sort(() => (Math.random() > 0.5 ? 1 : -1));
                }
                rc=rc%vocabulary.length;
                document.getElementById('respuesta').value="";
                
                this.sound.stopAll();
                fx[this.indices[rc]].play();
                break;
            }else{
                if(i=== phrasesS[this.indices[rc]].length-1){
                    w.play();
                    a=0.5;
                    
                    
                }
            }
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
        
        this.indices = new Array();
        
        for(var i=0;i<phrases.length;i++){
            this.indices.push(i);
        }
        this.indices.sort(() => (Math.random() > 0.5 ? 1 : -1));
        
        for(var i=0; i < phrases.length; i++){
            this.load.audio('s'+i,'./assets/sounds/vocabulary/'+phrases[i]+'.mp3');
        }
        
        
        this.load.audio('correct','./assets/sounds/'+'correct'+'.mp3');
        this.load.audio('wrong','./assets/sounds/'+'wrong'+'.mp3');
    }
    create(){
        this.add.image(0,0,'logo').setOrigin(0,0);
        
        this.div = document.createElement('h1');
        this.div.style = 'width: 1000px; font-size: 80px; ';
        this.div.innerText = 'Traduce: ';
        this.add.dom(1000, 50, this.div).setOrigin(0.5,0.5);
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
        for( var i=0 ; i < phrases.length ; i++ ){
            
            fx.push(this.sound.add('s'+i,{loop: false}));
            
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
        
        
        this.respuesta = document.createElement('input');
        this.respuesta.setAttribute('type'  ,'text');
        this.respuesta.setAttribute('id','respuesta');
        this.respuesta.setAttribute('placeholder','Respuesta');
        this.respuesta.setAttribute('autofocus','autofocus');
        this.respuesta.setAttribute('style','width: 1000px');
        this.r = this.add.dom(960, 400, this.respuesta);
        
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
            fx[this.indices[rc]].play();
    }
    corregir(){
        var r=document.getElementById('respuesta').value;
        
        
        
        //console.log(rempl);
        //console.log(resp);
        for(var i=0;i<phrasesS[this.indices[rc]].length;i++){
            if(r === phrasesS[this.indices[rc]][i]){
                //console.log("Correcto");
                b=0.25;
                rc++;
                c.play();
                if(rc===phrases.length){
                    rc=0;
                    this.indices.sort(() => (Math.random() > 0.5 ? 1 : -1));
                }
                rc=rc%vocabulary.length;
                document.getElementById('respuesta').value="";
                this.div.innerText = 'Traduce: ';
                this.sound.stopAll();
                fx[this.indices[rc]].play();
                break;
            }else{
                if(i=== phrasesS[this.indices[rc]].length-1){
                    w.play();
                    a=0.5;
                    
                    
                }
            }
        }
        
    }
    reproducir(){
        this.sound.stopAll();
        fx[this.indices[rc]].play();
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
class SW extends Phaser.Scene{
    constructor() {
		super({key:'SW'}); //, active:'true'
    }
    preload(){
        this.load.image('logo','./assets/img/logo.jpeg');
        
        
        for(var i=0; i < vocabulary.length; i++){
            this.load.image(vocabulary[i],'./assets/img/'+vocabulary[i]+'.png');
        }
        this.vocabulary2=vocabulary.slice();
        this.vocabulary2.sort(() => (Math.random() > 0.5 ? 1 : -1));
        
        this.load.audio('correct','./assets/sounds/'+'correct'+'.mp3');
        this.load.audio('wrong','./assets/sounds/'+'wrong'+'.mp3');
        rc=0;
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
        this.image= this.add.image(1200,300, this.vocabulary2[rc]);
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
        var resp = this.vocabulary2[rc%vocabulary.length];
        var rempl = resp.split('/');
        var resp = resp.split('/');
        
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
                this.image= this.add.image(1200,300, this.vocabulary2[rc%vocabulary.length]);
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
class CF extends Phaser.Scene{
    constructor() {
		super({key:'CF'}); //, active:'true'
    }
    preload(){
        this.load.image('logo','./assets/img/logo.jpeg');
        indices = new Array();
        for(var i=0;i<rellenar.length;i++){
            indices.push(i);
        }
        this.opcI = [0,1,2]
        indices.sort(() => (Math.random() > 0.5 ? 1 : -1));
        this.opcI.sort(() => (Math.random() > 0.5 ? 1 : -1));
        console.log(this.opcI);
        this.load.image('Blanco','./assets/img/blanco.png');
        this.load.image('Blanco 2','./assets/img/blanco2.png');
        this.load.audio('inst','./assets/sounds/label/Choose the correct answer.mp3');
        
        this.load.audio('correct','./assets/sounds/'+'correct'+'.mp3');
        this.load.audio('wrong','./assets/sounds/'+'wrong'+'.mp3');
        rc=0;
    }
    create(){
        this.add.image(0,0,'logo').setOrigin(0,0);
        
        var inst = this.sound.add('inst',{loop:false});
        
        inst.play();
        
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
        
        this.imagen = new Array();
        this.textos = new Array();
        
        this.add.dom(960, 70, 'h2', null, "Choose the correct answer");
        this.texto = rellenar[indices[rc]].split("_");
        this.textoB = new Array();
        for(var i=0;i<opciones.length;i++){
            var j=Math.floor(Math.random()*opciones[i].length);
            this.textoB.push(opciones[i][j]);
        }
        this.div = document.createElement('h1');
        this.div.innerText = this.texto[0]+"____"+this.texto[1];
        this.add.dom(960, 250, this.div).setOrigin(0.5,0.5);
        
        
        
        //console.log(this.texto);
        //console.log(this.textoB);
        this.element = new Array();
        for(var i=0;i<3;i++){
            var boton = document.createElement('button');
            boton.setAttribute('type','button');
            boton.setAttribute('name',''+i);
            this.element.push(this.add.dom(600+350*i, 450, boton,'',this.textoB[this.opcI[i]]));
            this.element[i].addListener('click');
            
        }
        this.element[0].on('click',() => this.corregir(this.opcI[0]));
        this.element[1].on('click',() => this.corregir(this.opcI[1]));
        this.element[2].on('click',() => this.corregir(this.opcI[2]));
        
        this.lienzo = this.add.graphics();
        this.lienzo.fillStyle(0xff0000);
        this.lienzo.setAlpha(a);
        this.lienzo.fillRect(0,0,1920,1080);
    }
    opcionPulsada(opcion) {
        rc=0;
        if(opcion === 'ini'){
            this.scene.start('menu');
        } else{
            console.log("A dónde voy?");
        }
        
    }
    corregir(opc){
        //console.log("opc = "+opc);
        //console.log("correcto = "+respuestas[indices[rc]]);
        //console.log(indices);
        if(opc === respuestas[indices[rc]] ){
                //console.log("Correcto");
                b=0.25;
                rc++;
                this.sound.stopAll();
                c.play();
                if(rc===respuestas.length){
                    rc=0;
                    this.indices.sort(() => (Math.random() > 0.5 ? 1 : -1));
                }
                this.texto = rellenar[indices[rc]].split("_");
                //console.log(this.div);
               
                this.div.innerText = this.texto[0]+"____"+this.texto[1];
                this.textoB = new Array();
                for(var i=0;i<opciones.length;i++){
                    this.element[i].destroy();
                }
                this.element = new Array();
                for(var i=0;i<opciones.length;i++){
                    
                    var j=Math.floor(Math.random()*opciones[i].length);
                    this.textoB.push(opciones[i][j]);
                    console.log(this.element);
                    document.getElementsByName(""+i).value=this.textoB[i];
                }
                this.opcI.sort(() => (Math.random() > 0.5 ? 1 : -1));
                for(var i=0;i<3;i++){
                    var boton = document.createElement('button');
                    boton.setAttribute('type','button');
                    boton.setAttribute('name',''+this.opcI[0]);
                    this.element.push(this.add.dom(600+350*i, 450, boton,'',this.textoB[this.opcI[i]]));
                    this.element[i].addListener('click');

                }
                
                console.log(this.textoB);
                this.element[0].on('click',() => this.corregir(this.opcI[0]));
                this.element[1].on('click',() => this.corregir(this.opcI[1]));
                this.element[2].on('click',() => this.corregir(this.opcI[2]));
                
            }else{
                
                    w.play();
                    a=0.5;

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

const config = {
  type: Phaser.AUTO,
  width: 1920,
  height: 1080,
  backgroundColor: '#ffffff',
  parent: 'phaser-example',
  dom: {
        createContainer: true
    },
  scene: [menu,CF,SW,LW,LC,RC,Explorar ],
  scale: {
      mode: Phaser.Scale.Fit
  },
 fps: {
        target: 30,
        forceSetTimeOut: true
    }
}

var game = new Phaser.Game(config);