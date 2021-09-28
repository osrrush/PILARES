/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class Explora extends Phaser.Scene{
    
    constructor() {
	super('Explora');
        var fra;
        var px, limx;
    }
    preload(){
        this.load.image('fondo','./asset/img/logo.jpeg');
        this.load.image('inicio','./asset/img/inicio.png');       
        this.load.image('1','./asset/img/1.png');
        this.load.image('2','./asset/img/12.png');
        this.load.image('3','./asset/img/13.png');
        this.load.image('4','./asset/img/14.png');
        this.load.image('5','./asset/img/15.png');
        this.load.image('6','./asset/img/16.png');
        this.load.image('7','./asset/img/17.png');
        this.load.image('8','./asset/img/18.png');
        this.load.image('9','./asset/img/19.png');
        this.load.image('10','./asset/img/110.png');
    }
    create(){
        this.add.image(0,0,'fondo').setOrigin(0);
                
        this.fra = new Array();
                       
        for(var i=0;i<10;i++){
            for(var j=0;j<=i;j++){
                this.fra.push(this.add.image(330+j*1260/(i+1),275+i*50,''+(i+1)).setOrigin(0, 0));
                
            }
            
        }
        for(var i=0;i<10;i++){
            for(var j=0;j<=i;j++){
                var x = i*(i-1)/2+(j+i) ;
                this.fra[x].depth=i;
                console.log(x);
            }
        }
        
        for(var i=0;i<this.fra.length;i++){            
            this.fra[i].setInteractive();
            this.input.setDraggable(this.fra[i]);            
        }
        
        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
                //console.log(gameObject);
                var x = 1260/gameObject.width;
                //console.log("x = "+x);
                for(var i = 0;i<x;i++){
                    if(330+(i-0.5)*gameObject.width<dragX && dragX<330+(i+0.5)*gameObject.width){
                        gameObject.x=330+i*gameObject.width;
                    }
                }
                for(var i=0;i<22;i++){
                    if(i*50<dragY && i*50+50>dragY){
                        gameObject.y = 25+i*50;
                    }
                }
                //gameObject.depth=x;
            });
        
        this.debug = this.add.graphics();
        //this.cursors = this.input.keyboard.createCursorKeys();
        
    }
    update(){
        
    }
    limites(i,x,x0){
        if(this.limx[i]<x && x<this.limx[i+1]){
            return this.px[i];
        }
        return x0;
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
  scene: [Explora],
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

