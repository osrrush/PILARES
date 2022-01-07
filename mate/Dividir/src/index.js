/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
const titulo = 'Divisiones'; //Titulo del juego
const menulabel = [['Repartir (1)', 'Repartir(2)'],
                ['Montones (1)', 'Montones(2)'],
                ['¿Restar?'],
                ['Hacer tablas(1)','Hacer tablas(2)']]; //Opciones menú
                

//const escenas = [Contar, ENG,s1,s2,s3,r1,r2,r3,m1,m2,m3,d1,d2,d3];
const LargoM = 400; //Largo de boton en menú
const Colores = [0xd0598f,0x33a099,0xfdcf20,0x2272b4]; // Colore PILARES
var a=0,b=0; //Alpha a= error b=correcto
var c,w; //Sonido c=correcto w=equivocado
var rc=0 ; //Contadores rc = respuesta correcta
var num;
var n,d,r; //n=numerador d=denominador r=respuesta

function arco2(x1,y1,x2,y2, graph, texto,scene){
    
    graph.lineStyle(4, 0xff0000, 10);

    //  Without this the arc will appear closed when stroked
    graph.beginPath();
    var x =(x1+x2)/2;
    var y =(y1+y2)/2;
    var r =Math.sqrt(Math.pow((x1-x2)/2,2)+Math.pow((y1-y2)/2,2))
    // arc (x, y, radius, startAngle, endAngle, anticlockwise)
    graph.arc(x,y ,r , Phaser.Math.DegToRad(90), Phaser.Math.DegToRad(270), true);
    
    //  Uncomment this to close the path before stroking
    // graphics.closePath();

    graph.strokePath();
    var  div = document.createElement('h1');
        div.style = 'font-size: 70px; ';
        div.innerHTML =texto;
        scene.add.dom(x+r, y-50, div).setOrigin(0,0.5);
    
    
}
function arco(x1,y1,x2,y2, graph, texto,scene){
    
    graph.lineStyle(4, 0xff0000, 10);

    //  Without this the arc will appear closed when stroked
    graph.beginPath();
    var x =(x1+x2)/2;
    var y =(y1+y2)/2
    var r =Math.sqrt(Math.pow((x1-x2)/2,2)+Math.pow((y1-y2)/2,2))
    // arc (x, y, radius, startAngle, endAngle, anticlockwise)
    graph.arc(x,y ,r , Phaser.Math.DegToRad(180), Phaser.Math.DegToRad(0), true);
    
    //  Uncomment this to close the path before stroking
    // graphics.closePath();

    graph.strokePath();
    var  div = document.createElement('h1');
        div.style = 'font-size: 70px; ';
        div.innerHTML =texto;
        scene.add.dom(x, y+r, div);
    
    
}
class menu extends Phaser.Scene{
    constructor() {
		super({key:'menu'}); //, active:'true'
    }
    preload(){
        this.load.image('logo','./asset/img/logo.jpeg');
        
    }
    create(){
        this.add.image(205,82,'logo');
        this.add.dom(960, 125, 'h1', null, titulo);
        
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
        /*opc[7].once('pointerdown', () => this.opcionPulsada(7));
        opc[8].once('pointerdown', () => this.opcionPulsada(8));
        opc[9].once('pointerdown', () => this.opcionPulsada(9));
        opc[10].once('pointerdown', () => this.opcionPulsada(10));
        opc[11].once('pointerdown', () => this.opcionPulsada(11));
        opc[12].once('pointerdown', () => this.opcionPulsada(12));
        opc[13].once('pointerdown', () => this.opcionPulsada(13));
        opc[14].once('pointerdown', () => this.opcionPulsada(14));
        opc[15].once('pointerdown', () => this.opcionPulsada(15));
        opc[16].once('pointerdown', () => this.opcionPulsada(16));
        opc[17].once('pointerdown', () => this.opcionPulsada(17));
        opc[18].once('pointerdown', () => this.opcionPulsada(18));
        opc[19].once('pointerdown', () => this.opcionPulsada(19));
        opc[20].once('pointerdown', () => this.opcionPulsada(20));
        opc[21].once('pointerdown', () => this.opcionPulsada(21));
        */
    }
    opcionPulsada(opcion) {
        console.log("opcionPulsada("+opcion+")");
        opcion +='';
	if (opcion === '0') {
		this.scene.start('Rp1');
	} else if (opcion === '1'){
		this.scene.start('Rp2');
	} else if (opcion === '2'){
            this.scene.start('M1');
        } else if (opcion === '3'){
            this.scene.start('M2');
        } else if (opcion === '4'){
            this.scene.start('R');
            //console.log("eq2");
        } else if (opcion === '5'){
            this.scene.start('HT1');
        } else if (opcion === '6'){
            this.scene.start('HT2');
        } else {
            console.log(opcion);
        }
    }
}

class Rp1 extends Phaser.Scene{
    
    constructor() {
	super('Rp1');
    }
    preload(){
        this.load.image('inicio','./asset/img/inicio.png');
        this.load.image('1','./asset/img/moneda1.png');
        this.load.image('persona','./asset/img/persona.png');
        this.load.audio('correct', './asset/sounds/correct.mp3');
        this.load.audio('wrong', './asset/sounds/wrong.mp3');
        d=Math.floor(Math.random()*5)+2;
        r=Math.floor(Math.random()*(Math.floor(15/d)-1))+2;
        n=d*r;
        console.log(n+" / "+d+" = "+r);
    }
    create(){
        this.zonas=new Array();
        this.inicio = this.add.image(130,130,'inicio');
        this.inicio.setScale(0.5);
        this.x1=300,this.x2=1600,this.y1=700,this.y2=700; 
        
        
        const inicio = this.add.zone(0, 0, 250, 250);
        inicio.setOrigin(0);
        inicio.setInteractive();
        inicio.once('pointerdown', () => this.opcionPulsada('ini'));
        
        c = this.sound.add('correct',{loop:false});
        w = this.sound.add('wrong',{loop:false});
        
        
        
        this.div = document.createElement('h1');
        this.div.style = 'width: 1300px; font-size: 70px; ';
        this.div.innerHTML ='Reparte '+ n + ' monedas entre '+ d +' personas y que todos tengan la misma cantidad.';
        this.add.dom(960, 100, this.div);
        
        
        this.debug = this.add.graphics();
        this.debug2 = this.add.graphics();
        var x =960-125*(d);
        for(var i=0;i<d;i++){
            this.zonas.push(0);
        }
        for(var i=0;i<d;i++){
            this.debug.fillStyle(Colores[i%Colores.length]);
            this.debug.fillRect(x+250*i+10,250,230,500);
            var zone = this.add.zone(x+250*i+10+115,500,230,500).setRectangleDropZone(230,500).setOrigin(0.5);
            zone.setData({i: i,valores: this.zonas});
            var graphics = this.add.graphics();
            graphics.lineStyle(2, 0x000000);
            graphics.strokeRect(zone.x - zone.input.hitArea.width / 2, zone.y - zone.input.hitArea.height / 2, zone.input.hitArea.width, zone.input.hitArea.height);
            this.add.image(x+250*i+125,375,'persona').setDisplaySize(200, 200);
        }
        x = 960 - 30*(n);
        this.debug2.fillStyle(0x000000);
        this.debug2.fillRect(x,820,n*60,60);
       
        for(var i=0;i<n;i++){
            this.moneda=this.add.image(x+60*i+30,850,'1').setDisplaySize(50, 50).setInteractive();
            this.moneda.setData({x:x+60*i+30,y:850,zona:-1});
            this.input.setDraggable(this.moneda);
            
        }
        
        this.input.on('drag', (pointer, obj, dragX, dragY) => {
        // Arrastrando
            obj.x = dragX;
            obj.y = dragY;
        });
        this.input.on('dragend', (pointer, obj, dropZone) => {
           // Arrastrando
           // Si no soltamos en la zona que este habilitada
           if (!dropZone) {
              obj.x = obj.getData("x");
              obj.y = obj.getData("y");
              if(obj.getData("zona")>=0){
                  this.zonas[obj.getData("zona")]-=1;
                  obj.setData("zona",-1);
              }
              
           } else {
              
           }
           
        });
        this.input.on('drop', (pointer,obj,dropZone)=>{
           //soltamos
           var arreglo = dropZone.getData("valores");
           var indice = dropZone.getData("i");
           arreglo[indice]+=1;
           if(obj.getData("zona")>=0){
               arreglo[obj.getData("zona")]-=1;
           }
           obj.setData("zona",indice);
           console.log(this.zonas);
        });
        
        var boton = document.createElement('button');
        boton.setAttribute('type','button');
        boton.setAttribute('class','corregir');
        this.element = this.add.dom(960, 950, boton,'','Corregir');
        this.element.addListener('click');
        this.element.on('click',() => this.corregir());
        this.input.keyboard.on('keydown-ENTER',() => this.corregir());
        
        //this.cursors = this.input.keyboard.createCursorKeys();
        this.lienzo = this.add.graphics();
        this.lienzo2= this.add.graphics();
        
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
    fin(){
        this.lienzo3 = this.add.graphics();
        this.lienzo3.fillStyle(0x03A9F4);
        this.lienzo3.fillRect(1600,50,300,90);
        this.opc= this.add.text(1750, 95, '¿OTRO?', { color: 'black', fontFamily: 'Arial', fontSize: '50px '}).setOrigin(0.5,0.5);

        const otro = this.add.zone(1600, 50, 300,100);
            otro.setOrigin(0);
            otro.setInteractive();
            otro.on('pointerdown', () => this.opcionPulsada('otro'));
    }
    
    paso2(){
        this.div.innerHTML ="¿Cuánto es "+n+" &divide; "+d+"?";
        this.debug2.clear();
         var respuesta = document.createElement('input');
        respuesta.setAttribute('type'  ,'number');
        respuesta.setAttribute('id','respuesta');
        respuesta.setAttribute('placeholder','Respuesta');
        this.res = this.add.dom(1200, 100, respuesta);
        this.element.off('click');
        this.input.keyboard.off('keydown-ENTER');
        this.element.on('click',() => this.corregir2());
        this.input.keyboard.on('keydown-ENTER',() => this.corregir2());
    }
    
    corregir(){
        var correcto = true;
        //console.log(this.zonas);
        for(var i=0;i<this.zonas.length;i++){
            if(r!==this.zonas[i]){
                correcto = false;
            }
        }
        if(correcto){
            
            this.correcto();
            //this.fin();
            this.paso2();
        }else{
            this.falso();
            
            
        }
    }
    corregir2(){
        var resp = document.getElementById('respuesta').value;
        //console.log(this.zonas);
        
        if(resp===r+""){
            
            this.correcto();
            this.fin();
            
        }else{
            this.falso();
            
            
        }
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
	if(opcion === 'ini'){
            this.scene.start('menu');
        } else if(opcion === 'otro'){
           this.scene.start(this.scene.key);
        }else{
            console.log("A dónde voy?");
        }
    }
}

class Rp2 extends Phaser.Scene{
    
    constructor() {
	super('Rp2');
        
    }
    preload(){
        this.load.image('inicio','./asset/img/inicio.png');
        this.load.image('1','./asset/img/moneda1.png');
        this.load.image('10','./asset/img/moneda10.png');
        this.load.image('persona','./asset/img/persona.png');
        this.load.audio('correct', './asset/sounds/correct.mp3');
        this.load.audio('wrong', './asset/sounds/wrong.mp3');
        d=Math.floor(Math.random()*5)+2;
        r=(Math.floor(Math.random()*(Math.floor(9/d)-1))+1)*10+(Math.floor(Math.random()*(Math.floor(9/d)))+1);
        n=d*r;
        console.log(n+" / "+d+" = "+r);
    }
    create(){
        this.zonas=new Array();
        this.inicio = this.add.image(130,130,'inicio');
        this.inicio.setScale(0.5);
        this.x1=300,this.x2=1600,this.y1=700,this.y2=700; 
        
        
        const inicio = this.add.zone(0, 0, 250, 250);
        inicio.setOrigin(0);
        inicio.setInteractive();
        inicio.once('pointerdown', () => this.opcionPulsada('ini'));
        
        c = this.sound.add('correct',{loop:false});
        w = this.sound.add('wrong',{loop:false});
        
        
        
        this.div = document.createElement('h1');
        this.div.style = 'width: 1300px; font-size: 70px; ';
        this.div.innerHTML ='Reparte '+ n + ' monedas entre '+ d +' personas y que todos tengan la misma cantidad.';
        this.add.dom(960, 100, this.div);
        
        
        this.debug = this.add.graphics();
        this.debug2 = this.add.graphics();
        var x =960-125*(d);
        for(var i=0;i<d;i++){
            this.zonas.push(0);
        }
        for(var i=0;i<d;i++){
            this.debug.fillStyle(Colores[i%Colores.length]);
            this.debug.fillRect(x+250*i+10,250,230,500);
            var zone = this.add.zone(x+250*i+10+115,500,230,500).setRectangleDropZone(230,500).setOrigin(0.5);
            zone.setData({i: i,valores: this.zonas});
            var graphics = this.add.graphics();
            graphics.lineStyle(2, 0x000000);
            graphics.strokeRect(zone.x - zone.input.hitArea.width / 2, zone.y - zone.input.hitArea.height / 2, zone.input.hitArea.width, zone.input.hitArea.height);
            this.add.image(x+250*i+125,375,'persona').setDisplaySize(200, 200);
        }
        x = 960 - 38*(Math.floor(n/10)+n%10);
        this.debug2.fillStyle(0x000000);
        this.debug2.fillRect(x,820,(Math.floor(n/10)+n%10)*75+20,85);
       
        for(var i=0;i<Math.floor(n/10);i++){
            this.moneda=this.add.image(x+75*i+38,862,'10').setDisplaySize(75, 75).setInteractive();
            this.moneda.setData({x:x+60*i+30,y:850,zona:-1,valor:10});
            this.input.setDraggable(this.moneda);
            
        }
        for(var i=0;i<n%10;i++){
            this.moneda=this.add.image(x+75*(i+Math.floor(n/10))+38,862,'1').setDisplaySize(50, 50).setInteractive();
            this.moneda.setData({x:x+60*i+30,y:850,zona:-1,valor:1});
            this.input.setDraggable(this.moneda);
            
        }
        
        this.input.on('drag', (pointer, obj, dragX, dragY) => {
        // Arrastrando
            obj.x = dragX;
            obj.y = dragY;
        });
        this.input.on('dragend', (pointer, obj, dropZone) => {
           // Arrastrando
           // Si no soltamos en la zona que este habilitada
           if (!dropZone) {
              obj.x = obj.getData("x");
              obj.y = obj.getData("y");
              if(obj.getData("zona")>=0){
                  this.zonas[obj.getData("zona")]-=obj.getData("valor");
                  obj.setData("zona",-1);
              }
              
           } else {
              
           }
           
        });
        this.input.on('drop', (pointer,obj,dropZone)=>{
           //soltamos
           var arreglo = dropZone.getData("valores");
           var indice = dropZone.getData("i");
           arreglo[indice]+=obj.getData("valor");
           if(obj.getData("zona")>=0){
               arreglo[obj.getData("zona")]-=obj.getData("valor");
           }
           obj.setData("zona",indice);
           console.log(this.zonas);
        });
        
        var boton = document.createElement('button');
        boton.setAttribute('type','button');
        boton.setAttribute('class','corregir');
        this.element = this.add.dom(960, 950, boton,'','Corregir');
        this.element.addListener('click');
        this.element.on('click',() => this.corregir());
        
        
        //this.cursors = this.input.keyboard.createCursorKeys();
        this.lienzo = this.add.graphics();
        this.lienzo2= this.add.graphics();
        
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
    fin(){
        this.lienzo3 = this.add.graphics();
        this.lienzo3.fillStyle(0x03A9F4);
        this.lienzo3.fillRect(1600,50,300,90);
        this.opc= this.add.text(1750, 95, '¿OTRO?', { color: 'black', fontFamily: 'Arial', fontSize: '50px '}).setOrigin(0.5,0.5);

        const otro = this.add.zone(1600, 50, 300,100);
            otro.setOrigin(0);
            otro.setInteractive();
            otro.on('pointerdown', () => this.opcionPulsada('otro'));
    }
    
    paso2(){
        this.div.innerHTML ="¿Cuánto es "+n+" &divide; "+d+"?";
        this.debug2.clear();
         var respuesta = document.createElement('input');
        respuesta.setAttribute('type'  ,'number');
        respuesta.setAttribute('id','respuesta');
        respuesta.setAttribute('placeholder','Respuesta');
        this.res = this.add.dom(1200, 100, respuesta);
        this.element.off('click');
        this.input.keyboard.off('keydown-ENTER');
        this.element.on('click',() => this.corregir2());
        this.input.keyboard.on('keydown-ENTER',() => this.corregir2());
    }
    
    corregir(){
        var correcto = true;
        //console.log(this.zonas);
        for(var i=0;i<this.zonas.length;i++){
            if(r!==this.zonas[i]){
                correcto = false;
            }
        }
        if(correcto){
            
            this.correcto();
            //this.fin();
            this.paso2();
        }else{
            this.falso();
            
            
        }
    }
    corregir2(){
        var resp = document.getElementById('respuesta').value;
        //console.log(this.zonas);
        
        if(resp===r+""){
            
            this.correcto();
            this.fin();
            
        }else{
            this.falso();
            
            
        }
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
	if(opcion === 'ini'){
            this.scene.start('menu');
        } else if(opcion === 'otro'){
           this.scene.start(this.scene.key);
        }else{
            console.log("A dónde voy?");
        }
    }
}

class M1 extends Phaser.Scene{
    
    constructor() {
	super('M1');
    }
    preload(){
        this.load.image('inicio','./asset/img/inicio.png');
        this.load.image('1','./asset/img/moneda1.png');
        this.load.audio('correct', './asset/sounds/correct.mp3');
        this.load.audio('wrong', './asset/sounds/wrong.mp3');
        d=Math.floor(Math.random()*5)+2;
        r=Math.floor(Math.random()*(Math.floor(15/d)-1))+2;
        n=d*r;
        console.log(n+" / "+d+" = "+r);
    }
    create(){
        this.zonas=new Array();
        this.inicio = this.add.image(130,130,'inicio');
        this.inicio.setScale(0.5);
        this.x1=300,this.x2=1600,this.y1=700,this.y2=700; 
        
        
        const inicio = this.add.zone(0, 0, 250, 250);
        inicio.setOrigin(0);
        inicio.setInteractive();
        inicio.once('pointerdown', () => this.opcionPulsada('ini'));
        
        c = this.sound.add('correct',{loop:false});
        w = this.sound.add('wrong',{loop:false});
        
        
        
        this.div = document.createElement('h1');
        this.div.style = 'width: 1300px; font-size: 70px; ';
        this.div.innerHTML ='¿Cuántos montones de '+ d + ' monedas puedes hacer con '+ n +' monedas?';
        this.add.dom(960, 100, this.div);
        
        
        
        this.debug2 = this.add.graphics();
        var x = 960 - 30*(n);
        this.debug2.fillStyle(0x000000);
        this.debug2.fillRect(x,820,n*60,60);
       
        for(var i=0;i<n;i++){
            this.moneda=this.add.image(x+60*i+30,850,'1').setDisplaySize(50, 50).setInteractive();
            this.moneda.setData({x:x+60*i+30,y:850,zona:-1});
            this.input.setDraggable(this.moneda);
            
        }
        
        this.input.on('drag', (pointer, obj, dragX, dragY) => {
        // Arrastrando
            obj.x = dragX;
            obj.y = dragY;
        });
        
        var respuesta = document.createElement('input');
        respuesta.setAttribute('type'  ,'number');
        respuesta.setAttribute('id','respuesta');
        respuesta.setAttribute('placeholder','Respuesta');
        this.res = this.add.dom(700, 300, respuesta);
        
        var boton = document.createElement('button');
        boton.setAttribute('type','button');
        boton.setAttribute('class','corregir');
        this.element = this.add.dom(1200, 300, boton,'','Corregir');
        this.element.addListener('click');
        this.element.on('click',() => this.corregir());
        this.input.keyboard.on('keydown-ENTER',() => this.corregir());
        
        //this.cursors = this.input.keyboard.createCursorKeys();
        this.lienzo = this.add.graphics();
        this.lienzo2= this.add.graphics();
        
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
    fin(){
        this.lienzo3 = this.add.graphics();
        this.lienzo3.fillStyle(0x03A9F4);
        this.lienzo3.fillRect(1600,50,300,90);
        this.opc= this.add.text(1750, 95, '¿OTRO?', { color: 'black', fontFamily: 'Arial', fontSize: '50px '}).setOrigin(0.5,0.5);

        const otro = this.add.zone(1600, 50, 300,100);
            otro.setOrigin(0);
            otro.setInteractive();
            otro.on('pointerdown', () => this.opcionPulsada('otro'));
    }
    
    
    
    corregir(){
        var resp = document.getElementById('respuesta').value;
        //console.log(this.zonas);
        
        if(resp===r+""){
            
            this.correcto();
            this.fin();
            
        }else{
            this.falso();
            
            
        }
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
	if(opcion === 'ini'){
            this.scene.start('menu');
        } else if(opcion === 'otro'){
           this.scene.start(this.scene.key);
        }else{
            console.log("A dónde voy?");
        }
    }
}

class M2 extends Phaser.Scene{
    
    constructor() {
	super('M2');
    }
    preload(){
        this.load.image('inicio','./asset/img/inicio.png');
        this.load.image('1','./asset/img/moneda1.png');
        this.load.image('10','./asset/img/moneda10.png');
        this.load.audio('correct', './asset/sounds/correct.mp3');
        this.load.audio('wrong', './asset/sounds/wrong.mp3');
        d=Math.floor(Math.random()*5)+2;
        r=(Math.floor(Math.random()*(Math.floor(9/d)-1))+1)*10+(Math.floor(Math.random()*(Math.floor(9/d)))+1);
        n=d*r;
        console.log(n+" / "+d+" = "+r);
    }
    create(){
        this.zonas=new Array();
        this.inicio = this.add.image(130,130,'inicio');
        this.inicio.setScale(0.5);
        this.x1=300,this.x2=1600,this.y1=700,this.y2=700; 
        
        
        const inicio = this.add.zone(0, 0, 250, 250);
        inicio.setOrigin(0);
        inicio.setInteractive();
        inicio.once('pointerdown', () => this.opcionPulsada('ini'));
        
        c = this.sound.add('correct',{loop:false});
        w = this.sound.add('wrong',{loop:false});
        
        
        
        this.div = document.createElement('h1');
        this.div.style = 'width: 1300px; font-size: 70px; ';
        this.div.innerHTML ='¿Cuántos montones de '+ r + ' monedas puedes hacer con '+ n +' monedas?';
        this.add.dom(960, 100, this.div);
        
        
        
        this.debug2 = this.add.graphics();
        var x = 960 - 38*(Math.floor(n/10)+n%10);
        this.debug2.fillStyle(0x000000);
        this.debug2.fillRect(x,820,(Math.floor(n/10)+n%10)*75+20,85);
       
        for(var i=0;i<Math.floor(n/10);i++){
            this.moneda=this.add.image(x+75*i+38,862,'10').setDisplaySize(75, 75).setInteractive();
            this.moneda.setData({x:x+60*i+30,y:850,zona:-1,valor:10});
            this.input.setDraggable(this.moneda);
            
        }
        for(var i=0;i<n%10;i++){
            this.moneda=this.add.image(x+75*(i+Math.floor(n/10))+38,862,'1').setDisplaySize(50, 50).setInteractive();
            this.moneda.setData({x:x+60*i+30,y:850,zona:-1,valor:1});
            this.input.setDraggable(this.moneda);
            
        }
        
        this.input.on('drag', (pointer, obj, dragX, dragY) => {
        // Arrastrando
            obj.x = dragX;
            obj.y = dragY;
        });
        
        var respuesta = document.createElement('input');
        respuesta.setAttribute('type'  ,'number');
        respuesta.setAttribute('id','respuesta');
        respuesta.setAttribute('placeholder','Respuesta');
        this.res = this.add.dom(700, 300, respuesta);
        
        var boton = document.createElement('button');
        boton.setAttribute('type','button');
        boton.setAttribute('class','corregir');
        this.element = this.add.dom(1200, 300, boton,'','Corregir');
        this.element.addListener('click');
        this.element.on('click',() => this.corregir());
        this.input.keyboard.on('keydown-ENTER',() => this.corregir());
        
        //this.cursors = this.input.keyboard.createCursorKeys();
        this.lienzo = this.add.graphics();
        this.lienzo2= this.add.graphics();
        
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
    fin(){
        this.lienzo3 = this.add.graphics();
        this.lienzo3.fillStyle(0x03A9F4);
        this.lienzo3.fillRect(1600,50,300,90);
        this.opc= this.add.text(1750, 95, '¿OTRO?', { color: 'black', fontFamily: 'Arial', fontSize: '50px '}).setOrigin(0.5,0.5);

        const otro = this.add.zone(1600, 50, 300,100);
            otro.setOrigin(0);
            otro.setInteractive();
            otro.on('pointerdown', () => this.opcionPulsada('otro'));
    }
    
    
    
    corregir(){
        var resp = document.getElementById('respuesta').value;
        //console.log(this.zonas);
        
        if(resp===d+""){
            
            this.correcto();
            this.fin();
            
        }else{
            this.falso();
            
            
        }
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
	if(opcion === 'ini'){
            this.scene.start('menu');
        } else if(opcion === 'otro'){
           this.scene.start(this.scene.key);
        }else{
            console.log("A dónde voy?");
        }
    }
}

class R extends Phaser.Scene{
    
    constructor() {
	super('R');
    }
    preload(){
        this.load.image('inicio','./asset/img/inicio.png');
        this.load.image('1','./asset/img/moneda1.png');
        this.load.image('persona','./asset/img/persona.png');
        this.load.audio('correct', './asset/sounds/correct.mp3');
        this.load.audio('wrong', './asset/sounds/wrong.mp3');
        d=Math.floor(Math.random()*5)+3;
        r=Math.floor(Math.random()*(Math.floor(15/d)-1))+2;
        n=d*r+Math.floor(Math.random()*d);
        console.log(n+" / "+d+" = "+r);
    }
    create(){
        this.zonas=new Array();
        this.inicio = this.add.image(130,130,'inicio');
        this.inicio.setScale(0.5);
        this.x1=300, this.x2=1600, this.y1=700, this.y2=700; 
        
        
        const inicio = this.add.zone(0, 0, 250, 250);
        inicio.setOrigin(0);
        inicio.setInteractive();
        inicio.once('pointerdown', () => this.opcionPulsada('ini'));
        
        c = this.sound.add('correct',{loop:false});
        w = this.sound.add('wrong',{loop:false});
        
        
        
        this.div = document.createElement('h1');
        this.div.style = 'width: 1300px; font-size: 70px; ';
        this.div.innerHTML ='¿Cuántas veces le puedo restar '+d+" a "+n+"?";
        this.add.dom(960, 100, this.div);
        
        
        this.debug = this.add.graphics();
        this.debug2 = this.add.graphics();
        var x =400;
        var m= r+Math.floor(Math.random()*3)+1;
        for(var i=0;i<m;i++){
            var respuesta = document.createElement('input');
            respuesta.setAttribute('type'  ,'number');
            respuesta.setAttribute('id','resta');
            respuesta.setAttribute('placeholder','?');
            this.res = this.add.dom(x+150*(i+1), 300, respuesta);
            arco(x+150*(i),350,x+150*(i+1),350,this.debug,"-"+d,this);
        }
        var div = document.createElement('h1');
        div.style = 'font-size: 50px; ';
        div.innerHTML =n;
        this.add.dom(x, 270, div);
        
        
        this.div = document.createElement('h1');
        this.div.style = 'width: 1300px; font-size: 70px; ';
        this.div.innerHTML ='<pre>Podemos restarlo       veces</pre>';
        this.add.dom(960, 600, this.div);
        
        var respuesta = document.createElement('input');
        respuesta.setAttribute('type'  ,'number');
        respuesta.setAttribute('id','respuesta');
        respuesta.setAttribute('placeholder','Respuesta');
        this.res = this.add.dom(1050, 650, respuesta);
        
        
        var boton = document.createElement('button');
        boton.setAttribute('type','button');
        boton.setAttribute('class','corregir');
        this.element = this.add.dom(960, 950, boton,'','Corregir');
        this.element.addListener('click');
        this.element.on('click',() => this.corregir());
        this.input.keyboard.on('keydown-ENTER',() => this.corregir());
        
        //this.cursors = this.input.keyboard.createCursorKeys();
        this.lienzo = this.add.graphics();
        this.lienzo2= this.add.graphics();
        
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
    fin(){
        this.lienzo3 = this.add.graphics();
        this.lienzo3.fillStyle(0x03A9F4);
        this.lienzo3.fillRect(1600,50,300,90);
        this.opc= this.add.text(1750, 95, '¿OTRO?', { color: 'black', fontFamily: 'Arial', fontSize: '50px '}).setOrigin(0.5,0.5);

        const otro = this.add.zone(1600, 50, 300,100);
            otro.setOrigin(0);
            otro.setInteractive();
            otro.on('pointerdown', () => this.opcionPulsada('otro'));
    }
    
       
    corregir(){
        var correcto = true;
        //console.log(this.zonas);
        for(var i=0;i<this.zonas.length;i++){
            if(r!==this.zonas[i]){
                correcto = false;
            }
        }
        if(correcto){
            
            this.correcto();
            this.fin();
            
        }else{
            this.falso();
            
            
        }
    }
    corregir2(){
        var resp = document.getElementById('respuesta').value;
        //console.log(this.zonas);
        
        if(resp===r+""){
            
            this.correcto();
            this.fin();
            
        }else{
            this.falso();
            
            
        }
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
	if(opcion === 'ini'){
            this.scene.start('menu');
        } else if(opcion === 'otro'){
           this.scene.start(this.scene.key);
        }else{
            console.log("A dónde voy?");
        }
    }
    
}

class HT1 extends Phaser.Scene{
    
    constructor() {
	super('HT1');
    }
    preload(){
        this.load.image('inicio','./asset/img/inicio.png');
        this.load.audio('correct', './asset/sounds/correct.mp3');
        this.load.audio('wrong', './asset/sounds/wrong.mp3');
        d=Math.floor(Math.random()*8)+2;
    }
    create(){
        this.zonas=new Array();
        this.inicio = this.add.image(130,130,'inicio');
        this.inicio.setScale(0.5);
        this.x1=300, this.x2=1600, this.y1=700, this.y2=700; 
        
        
        const inicio = this.add.zone(0, 0, 250, 250);
        inicio.setOrigin(0);
        inicio.setInteractive();
        inicio.once('pointerdown', () => this.opcionPulsada('ini'));
        
        c = this.sound.add('correct',{loop:false});
        w = this.sound.add('wrong',{loop:false});
        
        
        
        this.div = document.createElement('h1');
        this.div.style = 'font-size: 70px; ';
        this.div.innerHTML ='¡Haz la tabla del '+d+"!";
        this.add.dom(960, 100, this.div);
        
        
        this.debug = this.add.graphics();
        this.debug2 = this.add.graphics();
        var x =800;
        
        for(var i=1;i<10;i++){
            var div = document.createElement('h1');
            div.style = 'font-size: 70px; ';
            div.innerHTML = i+" &times; "+ d+" =";
            this.add.dom(x, 150+70*i, div);
            
            var respuesta = document.createElement('input');
            respuesta.setAttribute('type'  ,'number');
            respuesta.setAttribute('id',''+i);
            respuesta.setAttribute('placeholder','Respuesta');
            respuesta.setAttribute('style',' text-align: center');
            this.res = this.add.dom(1020, 190+70*i, respuesta);
            if(i>1){
                arco2(1130,190+70*(i-1),1130,190+70*(i),this.debug,"+"+d,this);
            }
            
        }
        
               
        
        
        
        
        var boton = document.createElement('button');
        boton.setAttribute('type','button');
        boton.setAttribute('class','corregir');
        this.element = this.add.dom(960, 950, boton,'','Corregir');
        this.element.addListener('click');
        this.element.on('click',() => this.corregir());
        this.input.keyboard.on('keydown-ENTER',() => this.corregir());
        
        //this.cursors = this.input.keyboard.createCursorKeys();
        this.lienzo = this.add.graphics();
        this.lienzo2= this.add.graphics();
        
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
    fin(){
        this.lienzo3 = this.add.graphics();
        this.lienzo3.fillStyle(0x03A9F4);
        this.lienzo3.fillRect(1600,50,300,90);
        this.opc= this.add.text(1750, 95, '¿OTRO?', { color: 'black', fontFamily: 'Arial', fontSize: '50px '}).setOrigin(0.5,0.5);

        const otro = this.add.zone(1600, 50, 300,100);
            otro.setOrigin(0);
            otro.setInteractive();
            otro.on('pointerdown', () => this.opcionPulsada('otro'));
    }
    
       
    corregir(){
        var correcto = true;
        //console.log(this.zonas);
        console.log(document);
        for(var i=1;i<10;i++){
            
            
            if(i*d+"" !== document.getElementById(''+i).value){
                correcto = false;
                document.getElementById(''+i).style.background = 'rgba(255, 0, 0, 0.5)';
            }else{
                document.getElementById(''+i).style.background = 'rgba(0, 255, 0, 0.5)';
            }
        }
        if(correcto){
            
            this.correcto();
            this.fin();
            
        }else{
            this.falso();
            
            
        }
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
	if(opcion === 'ini'){
            this.scene.start('menu');
        } else if(opcion === 'otro'){
           this.scene.start(this.scene.key);
        }else{
            console.log("A dónde voy?");
        }
    }
    
}

class HT2 extends Phaser.Scene{
    
    constructor() {
	super('HT2');
    }
    preload(){
        this.load.image('inicio','./asset/img/inicio.png');
        this.load.audio('correct', './asset/sounds/correct.mp3');
        this.load.audio('wrong', './asset/sounds/wrong.mp3');
        d=Math.floor(Math.random()*9)+11;
    }
    create(){
        this.zonas=new Array();
        this.inicio = this.add.image(130,130,'inicio');
        this.inicio.setScale(0.5);
        this.x1=300, this.x2=1600, this.y1=700, this.y2=700; 
        
        
        const inicio = this.add.zone(0, 0, 250, 250);
        inicio.setOrigin(0);
        inicio.setInteractive();
        inicio.once('pointerdown', () => this.opcionPulsada('ini'));
        
        c = this.sound.add('correct',{loop:false});
        w = this.sound.add('wrong',{loop:false});
        
        
        
        this.div = document.createElement('h1');
        this.div.style = 'font-size: 70px; ';
        this.div.innerHTML ='¡Haz la tabla del '+d+"!";
        this.add.dom(960, 100, this.div);
        
        
        this.debug = this.add.graphics();
        this.debug2 = this.add.graphics();
        var x =800;
        
        for(var i=1;i<10;i++){
            var div = document.createElement('h1');
            div.style = 'font-size: 70px; ';
            div.innerHTML = i+" &times; "+ d+" =";
            this.add.dom(x, 150+70*i, div);
            
            var respuesta = document.createElement('input');
            respuesta.setAttribute('type'  ,'number');
            respuesta.setAttribute('id',''+i);
            respuesta.setAttribute('placeholder','Respuesta');
            respuesta.setAttribute('style',' text-align: center');
            this.res = this.add.dom(1050, 190+70*i, respuesta);
            if(i>1){
                arco2(1160,190+70*(i-1),1160,190+70*(i),this.debug,"+"+d,this);
            }
            
        }
        
               
        
        
        
        
        var boton = document.createElement('button');
        boton.setAttribute('type','button');
        boton.setAttribute('class','corregir');
        this.element = this.add.dom(960, 950, boton,'','Corregir');
        this.element.addListener('click');
        this.element.on('click',() => this.corregir());
        this.input.keyboard.on('keydown-ENTER',() => this.corregir());
        
        //this.cursors = this.input.keyboard.createCursorKeys();
        this.lienzo = this.add.graphics();
        this.lienzo2= this.add.graphics();
        
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
    fin(){
        this.lienzo3 = this.add.graphics();
        this.lienzo3.fillStyle(0x03A9F4);
        this.lienzo3.fillRect(1600,50,300,90);
        this.opc= this.add.text(1750, 95, '¿OTRO?', { color: 'black', fontFamily: 'Arial', fontSize: '50px '}).setOrigin(0.5,0.5);

        const otro = this.add.zone(1600, 50, 300,100);
            otro.setOrigin(0);
            otro.setInteractive();
            otro.on('pointerdown', () => this.opcionPulsada('otro'));
    }
    
    corregir(){
        var correcto = true;
        //console.log(this.zonas);
        console.log(document);
        for(var i=1;i<10;i++){
            
            
            if(i*d+"" !== document.getElementById(''+i).value){
                correcto = false;
                document.getElementById(''+i).style.background = 'rgba(255, 0, 0, 0.5)';
            }else{
                document.getElementById(''+i).style.background = 'rgba(0, 255, 0, 0.5)';
            }
        }
        if(correcto){
            
            this.correcto();
            this.fin();
            
        }else{
            this.falso();
            
            
        }
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
  scene: [menu,HT2,HT1,R,M2,M1,Rp2,Rp1],
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

