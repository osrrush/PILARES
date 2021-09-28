/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
class menu extends Phaser.Scene{
    constructor() {
		super('menu');
                
	}
    preload(){
        this.load.image('fondo','./asset/img/background.png');
        this.load.image('menu','./asset/img/MENU.png');
        this.load.css('fuente', './src/fuente.css');
    }
    create(){
        //this.add.image(960,540,'fondo');
        this.add.image(960,540,'menu');
        
        var h1 = this.add.dom(960, 250, 'h1', null, 'Recta numérica');
        h1.setClassName('retroshadow');
        
        const pro1 = this.add.zone(800, 480, 320, 90);
	pro1.setOrigin(0);
	pro1.setInteractive();
	pro1.once('pointerdown', () => this.opcionPulsada('pro1'));
	this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(pro1);
        
        const pro2 = this.add.zone(800, 580, 320, 85);
	pro2.setOrigin(0);
	pro2.setInteractive();
	pro2.once('pointerdown', () => this.opcionPulsada('pro2'));
	this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(pro2);
        
    }
    opcionPulsada(opcion) {
	if (opcion === 'pro1'){
		this.scene.start('Prob1');
	} else if (opcion === 'pro2'){
            this.scene.start('Prob2');
        } 
    }
}

class Prob1 extends Phaser.Scene{
    constructor() {
		super('Prob1');
                this.min =-7;
                this.a=0;
	}
    preload(){
        this.load.image('fondo','./asset/img/background.png');
        this.load.image('persona','./asset/img/triangulo.png');
        
        //this.load.html('respuesta','./assets/respuestas.html');
    }
    create(){
        //this.add.image(960,540, 'fondo');
        this.lienzo = this.add.graphics();
        this.lienzo.lineStyle(10, 0x000000, 1);
        
        this.lienzo2 = this.add.graphics();
        this.lienzo2.fillStyle(0xff0000);
        this.lienzo2.setAlpha(this.a);
        this.lienzo2.fillRect(0,0,1920,1080);
        
        //recta
        this.lienzo.lineBetween(160, 300, 1660, 300);
        //marcas 
        for(var i=0;i<15;i++){
            this.lienzo.lineBetween(210+i*100, 275, 210+i*100, 325);
        }
        //numeros
        for(var i=0;i<7;i++){
            this.add.text(185+i*100, 330, ''+(-7+i), { color: 'black', fontFamily: 'Arial', fontSize: '40px '});
        }
        for(var i=7;i<15;i++){
            this.add.text(200+i*100, 330, ''+(-7+i), { color: 'black', fontFamily: 'Arial', fontSize: '40px '});
        }
        //Calculo del problema
        var inicio = Math.floor(Math.random()*15);
        var fin = Math.floor(Math.random()*15);
        this.add.text(210, 540, 'El triángulo inicia en '+(inicio+this.min)+' si se mueve ' +(fin-inicio) +' ¿A qué número llega?.'
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
    }
    update(time,delta){
        if(this.a>0){
            this.a-=0.5*delta/2000;
        }else{
            this.a=0;
        }
        this.lienzo2.clear()
        this.lienzo2.setAlpha(this.a);
        this.lienzo2.fillStyle(0xff0000);
        this.lienzo2.fillRect(0,0,1920,1080);
        
    }
    corregir(inicio,fin,domElement,element){
        var r=document.getElementById('respuesta');
        if((fin+this.min)+'' === r.value){
            domElement.setVisible(false);
            element.setVisible(false);
            this.add.text(200, 640, '¿Qué operación realizamos?', { color: 'black', fontFamily: 'Arial', fontSize: '40px '});
            
            var botones = new Array(); 
            for(var i=0;i<4;i++){
                botones.push(document.createElement('button'));
            }
            for(var i=0;i<botones.length;i++){
                botones[i].setAttribute('type','button');
            }
            
            var etiq = new Array();
            etiq.push("("+(inicio+this.min)+") + ("+(fin+this.min)+")");
            etiq.push("("+(inicio+this.min)+") - ("+(fin+this.min)+")");
            etiq.push("("+(inicio+this.min)+") + ("+(fin-inicio)+")");
            etiq.push("("+(inicio+this.min)+") - ("+(fin-inicio)+")");
            
            etiq.sort( () => .5 - Math.random() );
            var element = new Array;
            for(var i=0;i<botones.length;i++){
                element.push(this.add.dom(400+i*350, 750, botones[i],'',etiq[i]));
                element[i].addListener('click');
            }
            element[0].on('click',() => this.corregir2( etiq[0],"("+(inicio+this.min)+") + ("+(fin-inicio)+")"));
            element[1].on('click',() => this.corregir2( etiq[1],"("+(inicio+this.min)+") + ("+(fin-inicio)+")"));
            element[2].on('click',() => this.corregir2( etiq[2],"("+(inicio+this.min)+") + ("+(fin-inicio)+")"));
            element[3].on('click',() => this.corregir2( etiq[3],"("+(inicio+this.min)+") + ("+(fin-inicio)+")"));
            
        }else{
            this.a=0.75;
        }
    }
    corregir2(etiq,correcta){
        if(etiq === correcta){
            this.scene.start('Ganar');
        }else{
            this.a=0.75;
        }
    }
}

class Prob2 extends Phaser.Scene{
    constructor() {
		super('Prob2');
                this.min =-7;
	}
    preload(){
        this.load.image('fondo','./asset/img/background.png');
        this.load.image('persona','./asset/img/triangulo.png');
        
        //this.load.html('respuesta','./assets/respuestas.html');
    }
    create(){
        //this.add.image(960,540, 'fondo');
        this.lienzo = this.add.graphics();
        this.lienzo.lineStyle(10, 0x000000, 1);
        
        this.lienzo2 = this.add.graphics();
        this.lienzo2.fillStyle(0xff0000);
        this.lienzo2.setAlpha(this.a);
        this.lienzo2.fillRect(0,0,1920,1080);
        //recta
        this.lienzo.lineBetween(160, 300, 1660, 300);
        //marcas 
        for(var i=0;i<15;i++){
            this.lienzo.lineBetween(210+i*100, 275, 210+i*100, 325);
        }
        //numeros
        for(var i=0;i<7;i++){
            this.add.text(185+i*100, 330, ''+(-7+i), { color: 'black', fontFamily: 'Arial', fontSize: '40px '});
        }
        for(var i=7;i<15;i++){
            this.add.text(200+i*100, 330, ''+(-7+i), { color: 'black', fontFamily: 'Arial', fontSize: '40px '});
        }
        //Calculo del problema
        var inicio = Math.floor(Math.random()*15);
        var fin = Math.floor(Math.random()*15);
        this.add.text(210, 540, 'El triángulo termina en '+(fin+this.min)+' si inició en ' +(inicio+this.min) +' ¿Cuánto se movió?.'
        , { color: 'black', fontFamily: 'Arial', fontSize: '40px '});
        
        //triángulo
        this.persona = this.add.image(208+fin*100,225,'persona');
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
    }
    update(time,delta){
        if(this.a>0){
            this.a-=0.5*delta/2000;
        }else{
            this.a=0;
        }
        this.lienzo2.clear()
        this.lienzo2.setAlpha(this.a);
        this.lienzo2.fillStyle(0xff0000);
        this.lienzo2.fillRect(0,0,1920,1080);
        
    }
    corregir(inicio,fin,domElement,element){
        var r=document.getElementById('respuesta');
        if((fin-inicio)+'' === r.value){
            domElement.setVisible(false);
            element.setVisible(false);
            this.add.text(200, 640, '¿Qué operación realizamos?', { color: 'black', fontFamily: 'Arial', fontSize: '40px '});
            
            var botones = new Array(); 
            for(var i=0;i<4;i++){
                botones.push(document.createElement('button'));
            }
            for(var i=0;i<botones.length;i++){
                botones[i].setAttribute('type','button');
            }
            
            var etiq = new Array();
            etiq.push("("+(fin+this.min)+") + ("+(inicio+this.min)+")");
            etiq.push("("+(fin+this.min)+") - ("+(inicio+this.min)+")");
            etiq.push("("+(fin+this.min)+") + ("+(fin-inicio)+")");
            etiq.push("("+(fin+this.min)+") - ("+(fin-inicio)+")");
            
            etiq.sort( () => .5 - Math.random() );
            var element = new Array;
            for(var i=0;i<botones.length;i++){
                element.push(this.add.dom(400+i*350, 750, botones[i],'',etiq[i]));
                element[i].addListener('click');
            }
            element[0].on('click',() => this.corregir2( etiq[0],"("+(fin+this.min)+") - ("+(inicio+this.min)+")"));
            element[1].on('click',() => this.corregir2( etiq[1],"("+(fin+this.min)+") - ("+(inicio+this.min)+")"));
            element[2].on('click',() => this.corregir2( etiq[2],"("+(fin+this.min)+") - ("+(inicio+this.min)+")"));
            element[3].on('click',() => this.corregir2( etiq[3],"("+(fin+this.min)+") - ("+(inicio+this.min)+")"));
            
        }else{
            this.a=0.75;
        }
    }
    corregir2(etiq,correcta){
        if(etiq === correcta){
           this.scene.start('Ganar');
        }else{
            this.a=0.75;
        }
    }
}

class Ganar extends Phaser.Scene{
    constructor() {
		super('Ganar');
	}
    preload(){
        this.load.image('fondo','./asset/img/background.png');
        this.load.image('inicio','./asset/img/inicio.png');
        this.load.css('80s', './src/fuente.css');
        
        
    }
    create(){
        //this.add.image(960,540,'fondo');
        this.inicio = this.add.image(130,130,'inicio');
        this.inicio.setScale(0.5);
        const inicio = this.add.zone(0, 0, 250, 250);
	inicio.setOrigin(0);
	inicio.setInteractive();
	inicio.once('pointerdown', () => this.opcionPulsada('inicio'));
        
        var h1 = this.add.dom(960, 200, 'h1', null, 'Correcto');

        h1.setClassName('chrome');

        var h2 = this.add.dom(1100, 350, 'h2', null, 'Ganaste');

        h2.setClassName('dreams');
        h2.setAngle(-15);

        this.tweens.add({
            targets: [ h1, h2 ],
            y: 800,
            duration: 3000,
            ease: 'Sine.easeInOut',
            loop: -1,
            yoyo: true
        });
    }
    opcionPulsada(opcion) {
        this.scene.start('menu');
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
  scene: [menu, Prob1, Prob2, Ganar],
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

