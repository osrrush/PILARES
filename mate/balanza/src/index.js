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
    }
    create(){
        this.add.image(960,540,'fondo');
        this.add.image(960,540,'menu');
        const explorar = this.add.zone(800, 346, 320, 90);
	explorar.setOrigin(0);
	explorar.setInteractive();
	explorar.once('pointerdown', () => this.opcionPulsada('explorar'));
	this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(explorar);
        
        const pro1 = this.add.zone(800, 448, 320, 85);
	pro1.setOrigin(0);
	pro1.setInteractive();
	pro1.once('pointerdown', () => this.opcionPulsada('pro1'));
	this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(pro1);
        
        const pro2 = this.add.zone(800, 545, 320, 90);
	pro2.setOrigin(0);
	pro2.setInteractive();
	pro2.once('pointerdown', () => this.opcionPulsada('pro2'));
	this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(pro2);
        
        const pro3 = this.add.zone(800, 645, 320, 90);
	pro3.setOrigin(0);
	pro3.setInteractive();
	pro3.once('pointerdown', () => this.opcionPulsada('pro3'));
	this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(pro3);
    }
    opcionPulsada(opcion) {
	if (opcion === 'explorar') {
		this.scene.start('Explora');
	} else if (opcion === 'pro1'){
		this.scene.start('Pro');
	} else if (opcion === 'pro2'){
            this.scene.start('Prob');
        } else {
            this.scene.start('Probl');
        }
    }
}
class Explora extends Phaser.Scene{
    
    constructor() {
	super('Explora');
        var x1,x2,y1,y2;
        var kg, xkg;
        
    }
    preload(){
        this.load.image('fondo','./asset/img/background.png');
        this.load.image('1kg','./asset/img/1kg.png');
        this.load.image('inicio','./asset/img/inicio.png');
        this.load.image('xkg','./asset/img/xkg.png');
        this.load.image('piso','./asset/img/piso.png');
        this.load.image('platillo','./asset/img/platillo.png');
        this.load.image('base','./asset/img/triangulo.png');
        
    }
    create(){
        this.add.image(960,540,'fondo');
        this.inicio = this.add.image(130,130,'inicio');
        this.inicio.setScale(0.5);
        this.add.image(960,720,'base');
        this.x1=300,this.x2=1600,this.y1=700,this.y2=700; 
        /*this.x1=300;
        this.x2=1600;
        this.y1=700;
        this.y2=700;*/
        //var graphics = this.add.graphics();
        //graphics.lineStyle(5, 0x000000, 1);
        //graphics.lineBetween(x1, y1, x2, y2);
        
        var piso = this.physics.add.image(1000,981,'piso').setImmovable();
        piso.body.allowGravity = false;
        this.b1 = this.physics.add.image(this.x1,this.y1,'platillo').setImmovable();
        this.b1.body.allowGravity = false;
        this.b2 = this.physics.add.image(this.x2,this.y2,'platillo').setImmovable();
        this.b2.body.allowGravity = false;
        this.kg = new Array();
        const inicio = this.add.zone(0, 0, 250, 250);
        inicio.setOrigin(0);
        inicio.setInteractive();
        inicio.once('pointerdown', () => this.opcionPulsada('inicio'));
        for(var i=0;i<10;i++){
            
            this.kg.push(this.physics.add.image(1000,900,'1kg'));
            //xkg.push(this.physics.add.image(807,900,'xkg'));
            
            
            //this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(inicio);
            //drag 1kg
            this.kg[i].setInteractive();
            this.input.setDraggable(this.kg[i]);
            
            this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
                gameObject.x = dragX;
                gameObject.y = dragY;
            });
            //drag xkg
            //xkg[i].setInteractive();
           // this.input.setDraggable(xkg[i]);
            this.physics.add.collider(this.kg[i],piso);
            this.physics.add.collider(this.kg[i],this.b1);
            this.physics.add.collider(this.kg[i],this.b2);
           // this.physics.add.collider(xkg[i],piso);
            
        }
        
        this.debug = this.add.graphics();
        //this.cursors = this.input.keyboard.createCursorKeys();
        
    }
    update(){
        this.debug.clear();
        //console.log("Update");
        var pesoI=0, pesoD=0;
        for(var i=0;i<10;i++){
            var y = this.kg[i].y;
            var x = this.kg[i].x;
            //console.log("kg["+i+"].x = "+x);
            //console.log("kg["+i+"].y = "+y);
            if(y>(this.y1-100)&& y<(this.y1+10) && x<610){
                pesoI++;
                this.kg[i].y=this.y1-80;
            }
            if(y>(this.y2-100)&& y<(this.y2+10) && x>1300){
                pesoD++;
                 this.kg[i].y=this.y2-80 ;
            }
            //console.log("pesoI = "+pesoI+" pesoD = "+pesoD);
        }
        this.debug.lineStyle(5, 0x000000, 1);
        this.debug.lineBetween(this.x1, this.y1, this.x2, this.y2);
        this.debug.fillStyle(0x7E5109);
        
        this.b1.setY(this.y1);
        this.b2.setY(this.y2);
        for(var i=0;i<10;i++){
             this.physics.add.collider(this.kg[i],this.b1);
             this.physics.add.collider(this.kg[i],this.b2);
        }
        
        if (pesoI>pesoD) {
            //console.log("y1 = "+this.y1);
            if(this.y1<780){
                this.y1+=10;
                this.y2-=10;
                //console.log("Izq");
            }
        }
        else if (pesoI<pesoD){
            //console.log("y2 = "+this.y2);
            if( this.y1>620){
                this.y1-=10;
                this.y2+=10;
                //console.log("Der");
            }
        }
        else {
            if(this.y1<this.y2){
                this.y1+=10;
                this.y2-=10;
            }else if(this.y1>this.y2){
                this.y1-=10;
                this.y2+=10;
            }
        }
        
    }
    opcionPulsada(opcion) {
	this.scene.start('menu');
    }
}
class Pro extends Phaser.Scene{
    constructor() {
        super('Pro');
        var x1,x2,y1,y2;
        var kg, xkg;
        var xkg_val, kg_cant;
    }
    preload(){
        this.load.image('fondo','./asset/img/background.png');
        this.load.image('pregunta','./asset/img/pregunta 1.png');
        this.load.image('1kg','./asset/img/1kg.png');
        this.load.image('inicio','./asset/img/inicio.png');
        this.load.image('xkg','./asset/img/xkg.png');
        this.load.image('piso','./asset/img/piso.png');
        this.load.image('platillo','./asset/img/platillo.png');
        this.load.image('base','./asset/img/triangulo.png');
    }
    create(){
        this.add.image(960,540,'fondo');
        this.pregunta = this.add.image(960,260,'pregunta');
        this.pregunta.setScale(0.5);
        this.inicio = this.add.image(130,130,'inicio');
        this.inicio.setScale(0.5);
        this.add.image(960,720,'base');
        this.x1=300,this.x2=1600,this.y1=700,this.y2=700;
        const inicio = this.add.zone(0, 0, 250, 250);
        inicio.setOrigin(0);
        inicio.setInteractive();
        inicio.once('pointerdown', () => this.opcionPulsada('inicio'));
        
        
        const kg0 = this.add.zone(585, 250, 160, 97);
        kg0.setOrigin(0);
        kg0.setInteractive();
        kg0.once('pointerdown', () => this.opcionPulsada('0'));
        this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(kg0);
        
        const kg1 = this.add.zone(787, 243, 160, 97);
        kg1.setOrigin(0);
        kg1.setInteractive();
        kg1.once('pointerdown', () => this.opcionPulsada('1'));
        this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(kg1);
        
        const kg2 = this.add.zone(987, 233, 160, 97);
        kg2.setOrigin(0);
        kg2.setInteractive();
        kg2.once('pointerdown', () => this.opcionPulsada('2'));
        this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(kg2);
        
        const kg3 = this.add.zone(1187, 225, 160, 97);
        kg3.setOrigin(0);
        kg3.setInteractive();
        kg3.once('pointerdown', () => this.opcionPulsada('3'));
        this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(kg3);
        /*this.x1=300;
        this.x2=1600;
        this.y1=700;
        this.y2=700;*/
        //var graphics = this.add.graphics();
        //graphics.lineStyle(5, 0x000000, 1);
        //graphics.lineBetween(x1, y1, x2, y2);
        
        var piso = this.physics.add.image(1000,981,'piso').setImmovable();
        piso.body.allowGravity = false;
        this.b1 = this.physics.add.image(this.x1,this.y1,'platillo').setImmovable();
        this.b1.body.allowGravity = false;
        this.b2 = this.physics.add.image(this.x2,this.y2,'platillo').setImmovable();
        this.b2.body.allowGravity = false;
        
        
        this.kg = new Array();
        this.xkg_val = Math.floor(Math.random()*4);
        console.log("x = "+ this.xkg_val);
        this.kg_cant = Math.floor(Math.random()*(4-this.xkg_val))+1;
        console.log(this.xkg_val+" + "+this.kg_cant+" = "+ (this.xkg_val+ this.kg_cant));
        this.xkg = this.physics.add.image(this.x1-200,this.y1-100,'xkg');
        
        this.physics.add.collider(this.xkg,piso);
        this.physics.add.collider(this.xkg,this.b1);
        this.physics.add.collider(this.xkg,this.b2);
        this.xkg.setInteractive();
        this.input.setDraggable(this.xkg);
        this.kg = new Array();
        for(var i=0;i<this.kg_cant;i++){
            
            this.kg.push(this.physics.add.image(this.x1-85 + (i*115),this.y1-100,'1kg'));
            //xkg.push(this.physics.add.image(807,900,'xkg'));
            
            
            //this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(inicio);
            //drag 1kg
            this.kg[i].setInteractive();
            this.input.setDraggable(this.kg[i]);  
            //drag xkg
            //xkg[i].setInteractive();
           // this.input.setDraggable(xkg[i]);
            this.physics.add.collider(this.kg[i],piso);
            this.physics.add.collider(this.kg[i],this.b1);
            this.physics.add.collider(this.kg[i],this.b2);
           // this.physics.add.collider(xkg[i],piso);
            
        }
        for(var i=0;i<this.kg_cant+this.xkg_val;i++){
            
            this.kg.push(this.physics.add.image(this.x2-200 + (i*115),this.y2-100,'1kg'));
            //xkg.push(this.physics.add.image(807,900,'xkg'));
            //this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(inicio);
            //drag 1kg
            this.kg[i+this.kg_cant].setInteractive();
            this.input.setDraggable(this.kg[i+this.kg_cant]);  
            //drag xkg
            //xkg[i].setInteractive();
           // this.input.setDraggable(xkg[i]);
            this.physics.add.collider(this.kg[i+this.kg_cant],piso);
            this.physics.add.collider(this.kg[i+this.kg_cant],this.b1);
            this.physics.add.collider(this.kg[i+this.kg_cant],this.b2);
           // this.physics.add.collider(xkg[i],piso);
            
        }
        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });
        this.debug = this.add.graphics();
        //this.cursors = this.input.keyboard.createCursorKeys();
        //console.log("Longitud: "+this.kg.length);
        //console.log("2*this.kg_cant+2*this.xkg_val = "+(2*this.kg_cant+this.xkg_val))
    }
    update(time, delta){
        this.debug.clear();
        //console.log("Update");
        var pesoI=0, pesoD=0;
        for(var i=0;i<2*this.kg_cant+this.xkg_val;i++){
            var y = this.kg[i].y;
            var x = this.kg[i].x;
            //console.log("kg["+i+"].x = "+x);
            //console.log("kg["+i+"].y = "+y);
            if(y>(this.y1-100)&& y<(this.y1+10) && x<610){
                pesoI++;
                this.kg[i].y=this.kg[i].y-2*delta/1000;
                
            }
            if(y>(this.y2-100)&& y<(this.y2+10) && x>1300){
                pesoD++;
                 this.kg[i].y=this.kg[i].y-2*delta/1000 ;
            }
            //console.log("pesoI = "+pesoI+" pesoD = "+pesoD);
        }
        var y = this.xkg.y;
        var x = this.xkg.x;
        if(y>(this.y1-100)&& y<(this.y1+10) && x<610){
                pesoI+=this.xkg_val;
                this.xkg.y=this.xkg.y-2*delta/1000;
            }
            if(y>(this.y2-100)&& y<(this.y2+10) && x>1300){
                pesoD+=this.xkg_val;
                 this.xkg.y=this.xkg.y-2*delta/1000 ;
            }
        this.debug.lineStyle(5, 0x000000, 1);
        this.debug.lineBetween(this.x1, this.y1, this.x2, this.y2);
        this.debug.fillStyle(0x7E5109);
        this.b1.setY(this.y1);
        this.b2.setY(this.y2);
        for(var i=0;i<this.kg_cant+this.xkg_val;i++){
             this.physics.add.collider(this.kg[i],this.b1);
             this.physics.add.collider(this.kg[i],this.b2);
        }
        
        if (pesoI>pesoD) {
            //console.log("y1 = "+this.y1);
            if(this.y1<780){
                this.y1+=50*delta/1000;
                this.y2-=50*delta/1000;
                //console.log("Izq");
            }
        }
        else if (pesoI<pesoD){
            //console.log("y2 = "+this.y2);
            if( this.y1>620){
                this.y1-=50*delta/1000;
                this.y2+=50*delta/1000;
                //console.log("Der");
            }
        }
        else {
            if(this.y1<this.y2){
                this.y1+=50*delta/1000;
                this.y2-=50*delta/1000;
            }else if(this.y1>this.y2){
                this.y1-=50*delta/1000;
                this.y2+=50*delta/1000;
            }
        }
    }
    opcionPulsada(opcion) {
        if(opcion === "inicio"){
            this.scene.start('menu');
        }else if(opcion === ""+this.xkg_val){
            this.scene.start('Ganar');
        }else{
            this.scene.start('Perder');
        }
    }
}
class Prob extends Phaser.Scene{
    constructor() {
        super('Prob');
        var x1,x2,y1,y2;
        var kg, xkg;
        var xkg_val, kg_cant, xkg_cant;
    }
    preload(){
        this.load.image('fondo','./asset/img/background.png');
        this.load.image('pregunta','./asset/img/pregunta 1.png');
        this.load.image('1kg','./asset/img/1kg.png');
        this.load.image('inicio','./asset/img/inicio.png');
        this.load.image('xkg','./asset/img/xkg.png');
        this.load.image('piso','./asset/img/piso.png');
        this.load.image('platillo','./asset/img/platillo.png');
        this.load.image('base','./asset/img/triangulo.png');
    }
    create(){
        this.add.image(960,540,'fondo');
        this.pregunta = this.add.image(960,260,'pregunta');
        this.pregunta.setScale(0.5);
        this.inicio = this.add.image(130,130,'inicio');
        this.inicio.setScale(0.5);
        this.add.image(960,720,'base');
        this.x1=300,this.x2=1600,this.y1=700,this.y2=700;
        const inicio = this.add.zone(0, 0, 250, 250);
        inicio.setOrigin(0);
        inicio.setInteractive();
        inicio.once('pointerdown', () => this.opcionPulsada('inicio'));
        
        
        const kg0 = this.add.zone(585, 250, 160, 97);
        kg0.setOrigin(0);
        kg0.setInteractive();
        kg0.once('pointerdown', () => this.opcionPulsada('0'));
        this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(kg0);
        
        const kg1 = this.add.zone(787, 243, 160, 97);
        kg1.setOrigin(0);
        kg1.setInteractive();
        kg1.once('pointerdown', () => this.opcionPulsada('1'));
        this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(kg1);
        
        const kg2 = this.add.zone(987, 233, 160, 97);
        kg2.setOrigin(0);
        kg2.setInteractive();
        kg2.once('pointerdown', () => this.opcionPulsada('2'));
        this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(kg2);
        
        const kg3 = this.add.zone(1187, 225, 160, 97);
        kg3.setOrigin(0);
        kg3.setInteractive();
        kg3.once('pointerdown', () => this.opcionPulsada('3'));
        this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(kg3);
        /*this.x1=300;
        this.x2=1600;
        this.y1=700;
        this.y2=700;*/
        //var graphics = this.add.graphics();
        //graphics.lineStyle(5, 0x000000, 1);
        //graphics.lineBetween(x1, y1, x2, y2);
        
        var piso = this.physics.add.image(1000,981,'piso').setImmovable();
        piso.body.allowGravity = false;
        this.b1 = this.physics.add.image(this.x1,this.y1,'platillo').setImmovable();
        this.b1.body.allowGravity = false;
        this.b2 = this.physics.add.image(this.x2,this.y2,'platillo').setImmovable();
        this.b2.body.allowGravity = false;
        
        
        this.kg = new Array();
        this.xkg_val = Math.floor(Math.random()*4);
        console.log("x = "+ this.xkg_val);
        this.xkg_cant = Math.floor(Math.random()*(4-this.xkg_val))+2;
        this.kg_cant = this.xkg_val*this.xkg_cant;
        console.log(this.xkg_val+" * "+this.xkg_cant+" = "+ this.kg_cant);
        this.xkg = new Array();
        for(var i=0;i<this.xkg_cant;i++){
            this.xkg.push(this.physics.add.image(this.x1-200 + (i*115),this.y1-100,'xkg'));
            this.physics.add.collider(this.xkg[i],piso);
            this.physics.add.collider(this.xkg[i],this.b1);
            this.physics.add.collider(this.xkg[i],this.b2);
            this.xkg[i].setInteractive();
            this.input.setDraggable(this.xkg[i]);
        }
        
        
        this.kg = new Array();
        
        for(var i=0;i<this.kg_cant;i++){
            
            this.kg.push(this.physics.add.image(this.x2-230 + ((i%4)*115),this.y2-350-200*(Math.floor(i/4))-10*i,'1kg'));
            //xkg.push(this.physics.add.image(807,900,'xkg'));
            //this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(inicio);
            //drag 1kg
            this.kg[i].setInteractive();
            this.input.setDraggable(this.kg[i]);  
            //drag xkg
            //xkg[i].setInteractive();
           // this.input.setDraggable(xkg[i]);
            this.physics.add.collider(this.kg[i],piso);
            this.physics.add.collider(this.kg[i],this.b1);
            this.physics.add.collider(this.kg[i],this.b2);
           // this.physics.add.collider(xkg[i],piso);
           for(var j=0;j<this.xkg.length;j++){
               this.physics.add.collider(this.kg[i],this.xkg[j]);
           }
            for(var j=0;j<i+this.kg_cant;j++){
               this.physics.add.collider(this.kg[i],this.kg[j]);
           }
            
        }
        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });
        this.debug = this.add.graphics();
        //this.cursors = this.input.keyboard.createCursorKeys();
        //console.log("Longitud: "+this.kg.length);
        //console.log("2*this.kg_cant+2*this.xkg_val = "+(2*this.kg_cant+this.xkg_val))
    }
    update(time, delta){
        console.log("delta = "+delta);
        this.debug.clear();
        //console.log("Update");
        var pesoI=0, pesoD=0;
        for(var i=0;i<this.kg_cant;i++){
            var y = this.kg[i].y;
            var x = this.kg[i].x;
            //console.log("kg["+i+"].x = "+x);
            //console.log("kg["+i+"].y = "+y);
            if( y<(this.y1+10) && x<610){
                pesoI++;
                this.kg[i].y=this.kg[i].y-2*delta/1000;
            }
            if( y<(this.y2+10) && x>1300){
                pesoD++;
                 this.kg[i].y=this.kg[i].y-2*delta/1000 ;
            }
            //console.log("pesoI = "+pesoI+" pesoD = "+pesoD);
        }
        for(var i=0;i<this.xkg_cant;i++){
            var y = this.xkg[i].y;
            var x = this.xkg[i].x;
            if(y>(this.y1-100)&& y<(this.y1+10) && x<610){
                pesoI+=this.xkg_val;
                this.xkg[i].y=this.y1-80;
            }
            if(y>(this.y2-100)&& y<(this.y2+10) && x>1300){
                pesoD+=this.xkg_val;
                this.xkg[i].y=this.y2-80 ;
            }
        }
        this.debug.lineStyle(5, 0x000000, 1);
        this.debug.lineBetween(this.x1, this.y1, this.x2, this.y2);
        this.debug.fillStyle(0x7E5109);
        this.b1.setY(this.y1);
        this.b2.setY(this.y2);
        for(var i=0;i<this.kg_cant;i++){
             this.physics.add.collider(this.kg[i],this.b1);
             this.physics.add.collider(this.kg[i],this.b2);
        }
        
        if (pesoI>pesoD) {
            //console.log("y1 = "+this.y1);
            if(this.y1<780){
                this.y1+=50*delta/1000;
                this.y2-=50*delta/1000;
                //console.log("Izq");
            }
        }
        else if (pesoI<pesoD){
            //console.log("y2 = "+this.y2);
            if( this.y1>620){
                this.y1-=50*delta/1000;
                this.y2+=50*delta/1000;
                //console.log("Der");
            }
        }
        else {
            if(this.y1<this.y2){
                this.y1+=50*delta/1000;
                this.y2-=50*delta/1000;
            }else if(this.y1>this.y2){
                this.y1-=50*delta/1000;
                this.y2+=50*delta/1000;
            }
        }
    }
    opcionPulsada(opcion) {
        if(opcion === "inicio"){
            this.scene.start('menu');
        }else if(opcion === ""+this.xkg_val){
            this.scene.start('Ganar');
        }else{
            this.scene.start('Perder');
        }
    }
}
class Probl extends Phaser.Scene{
    constructor() {
            super('Probl');
            var x1,x2,y1,y2;
            var kg, xkg;
            var xkg_val, kg_cant, xkg_cant;
	}
    preload(){
        this.load.image('fondo','./asset/img/background.png');
        this.load.image('pregunta','./asset/img/pregunta 1.png');
        this.load.image('1kg','./asset/img/1kg.png');
        this.load.image('inicio','./asset/img/inicio.png');
        this.load.image('xkg','./asset/img/xkg.png');
        this.load.image('piso','./asset/img/piso.png');
        this.load.image('platillo','./asset/img/platillo.png');
        this.load.image('base','./asset/img/triangulo.png');
    }
    create(){
        this.add.image(960,540,'fondo');
        this.pregunta = this.add.image(960,260,'pregunta');
        this.pregunta.setScale(0.5);
        this.inicio = this.add.image(130,130,'inicio');
        this.inicio.setScale(0.5);
        this.add.image(960,720,'base');
        this.x1=300,this.x2=1600,this.y1=700,this.y2=700;
        const inicio = this.add.zone(0, 0, 250, 250);
        inicio.setOrigin(0);
        inicio.setInteractive();
        inicio.once('pointerdown', () => this.opcionPulsada('inicio'));
        
        const kg0 = this.add.zone(585, 250, 160, 97);
        kg0.setOrigin(0);
        kg0.setInteractive();
        kg0.once('pointerdown', () => this.opcionPulsada('0'));
        this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(kg0);
        
        const kg1 = this.add.zone(787, 243, 160, 97);
        kg1.setOrigin(0);
        kg1.setInteractive();
        kg1.once('pointerdown', () => this.opcionPulsada('1'));
        this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(kg1);
        
        const kg2 = this.add.zone(987, 233, 160, 97);
        kg2.setOrigin(0);
        kg2.setInteractive();
        kg2.once('pointerdown', () => this.opcionPulsada('2'));
        this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(kg2);
        
        const kg3 = this.add.zone(1187, 225, 160, 97);
        kg3.setOrigin(0);
        kg3.setInteractive();
        kg3.once('pointerdown', () => this.opcionPulsada('3'));
        this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(kg3);
        /*this.x1=300;
        this.x2=1600;
        this.y1=700;
        this.y2=700;*/
        //var graphics = this.add.graphics();
        //graphics.lineStyle(5, 0x000000, 1);
        //graphics.lineBetween(x1, y1, x2, y2);
        
        var piso = this.physics.add.image(1000,981,'piso').setImmovable();

        piso.body.allowGravity = false;
        this.b1 = this.physics.add.image(this.x1,this.y1,'platillo').setImmovable();
        this.b1.body.allowGravity = false;
        this.b2 = this.physics.add.image(this.x2,this.y2,'platillo').setImmovable();
        this.b2.body.allowGravity = false;
        
        this.xkg_cant=[0,0];
        this.kg = new Array();
        this.xkg_val = Math.floor(Math.random()*4);
        console.log("x = "+ this.xkg_val);
        this.xkg_cant[0]= Math.floor(Math.random()*3)+1;
        this.xkg_cant[1]= Math.floor(Math.random()*this.xkg_cant[0]);
        
        this.kg_cant = Math.floor(Math.random()*(4-this.xkg_cant[0]))+1;
        console.log(this.xkg_cant[0]+"*("+this.xkg_val+") + "+this.kg_cant+" = "+this.xkg_cant[1]+"*("+this.xkg_val+")+"+(this.xkg_val*(this.xkg_cant[0]-this.xkg_cant[1])+this.kg_cant) );
        this.xkg = new Array();
        
        /*this.physics.add.collider(this.xkg,piso);
        this.physics.add.collider(this.xkg,this.b1);
        this.physics.add.collider(this.xkg,this.b2);
        */
        for(var i=0;i<this.xkg_cant[0];i++){
            this.xkg.push(this.physics.add.image(this.x1-200 + (i*115),this.y1-100,'xkg'));
        }
        for(var i=0;i<this.xkg_cant[1];i++){
            this.xkg.push(this.physics.add.image(this.x2-200 + (i*115),this.y2-100,'xkg'));
        }
        for(var i=0;i<this.xkg.length;i++){
            this.physics.add.collider(this.xkg[i],piso);
            this.physics.add.collider(this.xkg[i],this.b1);
            this.physics.add.collider(this.xkg[i],this.b2);
            this.xkg[i].setInteractive();
            this.input.setDraggable(this.xkg[i]);
            for(var j=0;j<i;j++){
                this.physics.add.collider(this.xkg[i],this.xkg[j]);
            }
        }
        for(var i=0;i<this.kg_cant;i++){
            
            this.kg.push(this.physics.add.image(this.x1-200 + (i*115),this.y1-300-10*i,'1kg'));
            //xkg.push(this.physics.add.image(807,900,'xkg'));
            
            
            //this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(inicio);
            //drag 1kg
            this.kg[i].setInteractive();
            this.input.setDraggable(this.kg[i]);  
            //drag xkg
            //xkg[i].setInteractive();
           // this.input.setDraggable(xkg[i]);
            this.physics.add.collider(this.kg[i],piso);
            this.physics.add.collider(this.kg[i],this.b1);
            this.physics.add.collider(this.kg[i],this.b2);
           // this.physics.add.collider(xkg[i],piso);
            for(var j=0;j<this.xkg.length;j++){
                this.physics.add.collider(this.kg[i],this.xkg[j]);
            }
              
        }
        for(var i=0;i<(this.xkg_val*(this.xkg_cant[0]-this.xkg_cant[1])+this.kg_cant);i++){
            
            this.kg.push(this.physics.add.image(this.x2-230 + ((i%4)*115),this.y2-350-200*(Math.floor(i/4))-10*i,'1kg'));
            //xkg.push(this.physics.add.image(807,900,'xkg'));
            //this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(inicio);
            //drag 1kg
            this.kg[i+this.kg_cant].setInteractive();
            this.input.setDraggable(this.kg[i+this.kg_cant]);  
            //drag xkg
            //xkg[i].setInteractive();
           // this.input.setDraggable(xkg[i]);
            this.physics.add.collider(this.kg[i+this.kg_cant],piso);
            this.physics.add.collider(this.kg[i+this.kg_cant],this.b1);
            this.physics.add.collider(this.kg[i+this.kg_cant],this.b2);
           // this.physics.add.collider(xkg[i],piso);
           for(var j=0;j<this.xkg.length;j++){
               this.physics.add.collider(this.kg[i+this.kg_cant],this.xkg[j]);
           }
            for(var j=0;j<i+this.kg_cant;j++){
               this.physics.add.collider(this.kg[i+this.kg_cant],this.kg[j]);
           }
            
        }

        //this.cursors = this.input.keyboard.createCursorKeys();
        //console.log("Longitud: "+this.kg.length);
        //console.log("2*this.kg_cant+2*this.xkg_val = "+(2*this.kg_cant+this.xkg_val))
        this.debug = this.add.graphics();
        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });
        
        
    }
    update(time,delta){
        this.debug.clear();
        //console.log("Update");
        var pesoI=0, pesoD=0;
        for(var i=0;i<this.kg.length;i++){
            var y = this.kg[i].y;
            var x = this.kg[i].x;
            //console.log("kg["+i+"].x = "+x);
            //console.log("kg["+i+"].y = "+y);
            //y>(this.y1-100)&&
            if(y<780 &&  x<610){
                pesoI++;
                this.kg[i].y=y-2*delta/1000;
                //this.kg[i].y=this.y1-80;
            }
            //y>(this.y2-100)&&
            if(y<780 && x>1300){
                pesoD++;
                // this.kg[i].y=this.y2-80 ;
                this.kg[i].y=y-2*delta/1000;
            }
            //console.log("pesoI = "+pesoI+" pesoD = "+pesoD);
        }
        for(var i=0;i<this.xkg.length;i++){
            var y = this.xkg[i].y;
            var x = this.xkg[i].x;
            if(y<780 && x<610){
                    pesoI+=this.xkg_val;
                    //this.xkg.y=this.y1-80;
                    this.xkg[i].y=y-5*delta/1000;
                }
            if(y<780 &&  x>1300){
                pesoD+=this.xkg_val;
                this.xkg[i].y=y-5*delta/1000;
                //this.xkg.y=this.y2-80 ;
            }
        }
        this.debug.lineStyle(5, 0x000000, 1);
        this.debug.lineBetween(this.x1, this.y1, this.x2, this.y2);
        this.debug.fillStyle(0x7E5109);
        this.b1.setY(this.y1);
        this.b2.setY(this.y2);
        if (pesoI>pesoD) {
            //console.log("y1 = "+this.y1);
            if(this.y1<780){
                this.y1+=50*delta/1000;
                this.y2-=50*delta/1000;
                //console.log("Izq");
            }
        }
        else if (pesoI<pesoD){
            //console.log("y2 = "+this.y2);
            if( this.y1>620){
                this.y1-=50*delta/1000;
                this.y2+=50*delta/1000;
                //console.log("Der");
            }
        }
        else {
            if(this.y1<this.y2){
                this.y1+=50*delta/1000;
                this.y2-=50*delta/1000;
            }else if(this.y1>this.y2){
                this.y1-=50*delta/1000;
                this.y2+=50*delta/1000;
            }
        }
    }
    opcionPulsada(opcion) {
        if(opcion === "inicio"){
            this.scene.start('menu');
        }else if(opcion === ""+this.xkg_val){
            this.scene.start('Ganar');
        }else{
            this.scene.start('Perder');
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
class Perder extends Phaser.Scene{
    constructor() {
		super('Perder');
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
        
        var h1 = this.add.dom(960, 500, 'h1', null, 'Perdiste');

        h1.setClassName('chrome');

        var h2 = this.add.dom(1100, 650, 'h2', null, 'Sigue intentando');

        h2.setClassName('dreams');
        h2.setAngle(-15);
    }
    opcionPulsada(opcion) {
        this.scene.start('menu');
    }
    
}


const config = {
  type: Phaser.AUTO,
  width: 1920,
  height: 1080,
  backgroundColor: '#080808',
  parent: 'phaser-example',
  dom: {
        createContainer: true
    },
  scene: [menu,Explora,Pro,Prob,Probl,Ganar, Perder],
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

