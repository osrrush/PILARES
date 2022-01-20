/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
const titulo = 'Unir Verbos'; //Titulo del juego
const niveles = ['Conocer','Traducir','Pasado','Participle'];
const verbs = [['be','catch','choose','come','do','draw','drink','drive','eat','find','fly','get','give','go','have','have got','hit','hold'],
                ['know','make','put','read','ride','run','say','see','sing','sit','sleep','stand','swim','take a photo','tell','throw','understand','wear','write'],
                ['add','answer','ask','bounce','clap','clean','close','color','complete','count','cross','enjoy','jump','kick','learn','like','listen','live','look','love','open','paint','phone','pick up','play','point','show','smile','spell','start','stop','talk','tick','try','walk','want','watch','wave'],
                ['bring','build','buy','fall','feed','get dressed','get undressed','get up','get on','get off','go shopping','grow','hide','hurt','lose','mean','put on','send','take','take off','teach','think','wake','wake up'],
                ['call','carry','change','climb','cook','cry','dance','dream','dress up','drop','dry','email','film','fish','fix','help','hop','invite','laugh','look for','move','need','plant','practice','rain','sail','shop','shout','skate','skip','snow','text','travel','video','wait','wash','water','work'],
                ['begin','break','cut','fall over','feel','find out','forget','get to','go out','hear','keep','leave','let','lie','make sure','meet','sell','send','smell','speak','spend','swing','take','teach'],
                ['act','agree','appear','arrive','believe','borrow','brush','burn','camp','chat','collect','comb','cycle','decide','design','disappear','end','enter','explain','explore','fetch','finish','follow','glue','guess','happen','hate','hope','hurry','improve','invent','join','land','lift','look after','look like','mind','mix','post','prefer','prepare','pull','push','race','remember','repair','repeat','save','score','search','ski','sledge','sound','stay','study','taste','thank','tidy','touch','turn on','turn off','use','visit','whisper','whistle','wish'],
                [],
                [],
                [],
                [],
                []];
const verbos = [['ser/estar','atrapar','elegir','venir','hacer','dibujar','beber','conducir','comer','encontrar','volar','consegir','dar','ir','haber/tener','tener','golpear','sostener'],
                ['saber','hacer/crear','poner','leer','montar','correr','decir','ver','cantar','sentar','dormir','estar de pie','nadar','tomar una foto','decir','lanzar','entender','usar/vestir','escribir'],
                ['agregar','responder','preguntar','rebotar','aplaudir','limpiar','cerrar','colorear','completar','contar','cruzar/atravesar','disfrutar','saltar','patear','aprender','gustar','escuchar','vivir','mirar','amar','abrir','pintar','llamar por telefono','recoger/levantar','jugar','apuntar','mostrar','sonreir','deletrear','empezar','parar','hablar','marcar/palomear','intentar','caminar','querer','observar','ondear'],
                ['traer','construir','comprar','caer','alimentar','vestirse','desvestirse','levantarse de la cama','subirse a algo','bajar / salir','ir de compras','crecer','esconder','herir/dañar','perder','significar','Poner sobre','enviar','tomar','partir','enseñar','pensar','despertar','levantarse de la cama'],
                ['llamar','llevar','cambiar','trepar','cocinar','llorrar','bailar','soñar','disfrazar','tirar','secar','enviar email','filmar','pescar','arreglar','ayudar','saltar','invitar','reir','buscar','mover','necesitar','plantar','practicar','llover','navegar','ir de compras','gritar','patinar','saltar','nevar','enviar mesaje','viajar','filmar','esperar','lavar','regar','trabajar'],
                ['empezar','romper','cortar','bajar','sentir','averiguar','olvidar','tener oportunidad','salir','escuchar','mantener/conservar','dejar','permitir','mentir','asegurarse','reunir/conocer','vender','enviar','oler','hablar','gastar','columpiar','tomar','enseñar'],
                ['actuar','acordar','aparecer','llegar','creer','pedir prestado','cepillar','quemar','acampar','charlar','recoger','peinar','ir en bicicleta','decidir','diseñar','desaparecer','terminar','introducir/entrar','explicar','explorar','traer/alcanzar','terminar','seguir','pegar','suponer','pasar/suceder','odiar','esperar (esperanza)','apresurar','mejorar','inventar','unir','aterrizar','levantar','cuidar','parecerse','cuidar /hacer caso','mezclar','publicar','preferir','preparar','jalar','empujar','competir','recordar','reparar','repetir','guardar','marcar/sacar','buscar','esquiar','ir en trineo','sonar','permanecer','estudiar','probar','agradecer','arreglar/ordenar','tocar','prender/encender','apagar','usar','visitar','susurrar','silbar','desear'],
                ];
const Past = [['was/were','caught','chose','came','did','drew','drank','drove','ate','found','flew','got','gave','went','had','had got','hit','held'],
                ['knew','made','put','read','rode','ran','said','saw','sang','sat','slept','stood','swam','took a photo','told','threw','understood','wore','wrote'],
                ['added','answered','asked','bounced','clapped','cleaned','closed','colored','completed','counted','crossed','enjoyed','jumped','kicked','learned','liked','listened','lived','looked','loved','opened','painted','phoned','picked up','played','pointed','showed','smiled','spelled','started','stopped','talked','ticked','tried','walked','wanted','watched','waved'],
                ['brought','built','bought','fell','fed','got dressed','got undressed','got up','got on','got off','went shopping','grew','hid','hurt','lost','meant','put on','sent','took','took off','taught','thought','woke','woke up'],
                ['called','carried','changed','climbed','cooked','cried','danced','dreamed','dressed up','dropped','dried','emailed','filmed','fished','fixed','helped','hopped','invited','laughed','looked for','moved','needed','planted','practiced','rained','sailed','shopped','shouted','skated','skipped','snowed','texted','travelled','videoed','waited','washed','watered','worked'],
                ['began','broke','cut','fell over','felt','found out','forgot','got to','went out','heard','kept','left','let','lay','made sure','met','sold','sent','smelt','spoke','spent','swung','took','taugh'],
                ['acted','agreed','appeared','arrived','believed','borrowed','brushed','burned','camped','chatted','collected','combed','cycled','decided','designed','disappeared','ended','entered','explained','explored','fetched','finished','followed','glued','guessed','happened','hated','hoped','hurried','improved','invented','joined','landed','lifted','looked after','looked liked','minded','mixed','posted','preferred','prepared','pulled','pushed','raced','remembered','repaired','repeated','saved','scored','searched','skied','sledged','sounded','stayed','studied','tasted','thanked','tidied','touched','turned on','turned off','used','visited','whispered','whistled','wished'],
                ];            
const Participle = [['been','caught','choosen','come','done','drawn','drunk','driven','eaten','found','flown','gotten/got','given','gone','had','had got','hit','held'],
                ['known','made','put','read','ridden','run','said','seen','sung','sat','slept','stood','swum','taken a photo','told','thrown','understood','worn','written'],
                ['added','answered','asked','bounced','clapped','cleaned','closed','colored','completed','counted','crossed','enjoyed','jumped','kicked','learned','liked','listened','lived','looked','loved','opened','painted','phoned','picked up','played','pointed','showed','smiled','spelled','started','stopped','talked','ticked','tried','walked','wanted','watched','waved'],
                ['brought','built','bought','fallen','fed','gotten dressed','gotten undressed','gotten up','gotten on','gotten off','gone shopping','grown','hidden','hurt','lost','meant','put on','sent','taken','taken off','taught','thought','woken','woken up'],
                ['called','carried','changed','climbed','cooked','cried','danced','dreamed','dressed up','dropped','dried','emailed','filmed','fished','fixed','helped','hopped','invited','laughed','looked for','moved','needed','planted','practiced','rained','sailed','shopped','shouted','skated','skipped','snowed','texted','travelled','videoed','waited','washed','watered','worked'],
                ['begun','broken','cut','fallen over','felt','found out','forgotten','got to','gone out','heard','kept','left','let','lain','made sure','met','sold','sent','smelt','spoken','spent','swung','taken','taugh'],
                ['acted','agreed','appeared','arrived','believed','borrowed','brushed','burned','camped','chatted','collected','combed','cycled','decided','designed','disappeared','ended','entered','explained','explored','fetched','finished','followed','glued','guessed','happened','hated','hoped','hurried','improved','invented','joined','landed','lifted','looked after','looked liked','minded','mixed','posted','preferred','prepared','pulled','pushed','raced','remembered','repaired','repeated','saved','scored','searched','skied','sledged','sounded','stayed','studied','tasted','thanked','tidied','touched','turned on','turned off','used','visited','whispered','whistled','wished'],
                ];

//const escenas = [Contar, ENG,s1,s2,s3,r1,r2,r3,m1,m2,m3,d1,d2,d3];
const LargoM = 400; //Largo de boton en menú
const Fondos = [0xd0598f,0x33a099,0xfdcf20,0x2272b4];
const Colores = [0xd0598f,0x33a099,0xfdcf20,0x2272b4]; // Colore PILARES
var a=0,b=0; //Alpha a= error b=correcto
var c,w; //Sonido c=correcto w=equivocado
var level=2;
var s;
var val,pos;
var r=0;
var t=0, t2=0;
var min,max;
var correcto;
var continuar=true;
var alto=60, ancho=300;

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
        
      
        
        
        
        
        for(var i=1;i<4;i++){
            
                var boton = document.createElement('button');
                boton.setAttribute('type', 'button');
                boton.setAttribute('id', 'l'+(i+1));
                
                this.element = this.add.dom(650+i*250, 75, boton, '', niveles[i]);
                this.element.addListener('click');
                this.element.on('click', this.verifica, this);
            
        }
        var max=7;
        
        for(var i=1;i<=max;i++){
            
                var boton = document.createElement('button');
                boton.setAttribute('type', 'button');
                boton.setAttribute('id', i);                
                this.element = this.add.dom(100+i*130, 500, boton, '', ""+i);
                this.element.addListener('click');
                this.element.on('click', this.verifica, this);
            
            
        }
        
    }
    verifica (i){
        var boton = i.target.id;
        if(boton[0]==='l'){
            this.scene.start('menu',{l: parseInt(boton[1],10)});
        }else{
            if(level===1){
                this.scene.start('suma2',{l: level,s:parseInt(boton,10)});
            }else if(level===2){
                this.scene.start('L2',{l: level,s:parseInt(boton,10)});
            }else if(level===3){
                this.scene.start('L3',{l: level,s:parseInt(boton,10)});
            }else if(level===4){
                this.scene.start('L4',{l: level,s:parseInt(boton,10)});
            }
            
        }
    }
}
class L2 extends Phaser.Scene {
    constructor() {
        super({key: 'L2'}); // active:'true'
    }
    init(data){
        level = data.l;
        s=data.s-1;
    }
    preload() {
        this.load.image('inicio', './asset/img/inicio.png');
        val=new Array();
        pos=new Array();
        r=0;
        max=Math.floor(verbos[s].length/10);
        for(var i=0;i<10;i++){
            val.push(i);
        }
        for(var i=0;i<verbos[s].length;i++){
            pos.push(i);
        }
        val.sort(() => (Math.random() > 0.5 ? 1 : -1));
        pos.sort(() => (Math.random() > 0.5 ? 1 : -1));
        this.load.audio('correct', './asset/sounds/correct.mp3');
        this.load.audio('wrong', './asset/sounds/wrong.mp3');
        this.load.css('80s', './src/fuente.css');
    }
    create() {
        correcto=0;
        
        this.inicio = this.add.image(130,130,'inicio');
        this.inicio.setScale(0.5);
        const inicio = this.add.zone(0, 0, 250, 250);
        inicio.setOrigin(0);
        inicio.setInteractive();
        inicio.once('pointerdown', () => this.opcionPulsada('inicio'));
        
        
        c = this.sound.add('correct',{loop:false});
        w = this.sound.add('wrong',{loop:false});
               
        
        this.contenedor = new Array();
        for(var i=10*r;i<10*(r+1)&& i<verbs[s].length;i++){
            this.rectangulo = this.add.rectangle(0,0,ancho,alto, 0x2ECC71).setStrokeStyle(2, 0x000000);
            
            this.contenedor.push( this.add.container(0,0));
            
            this.text =this.add.text(0,0, verbs[s][pos[i]], { color: 'black', fontFamily: 'Arial', fontSize: '40px '}).setOrigin(0.5,0.5);

            this.contenedor[this.contenedor.length-1].add([this.rectangulo ,this.text]);
            this.contenedor[this.contenedor.length-1].setSize(ancho,alto);
            this.contenedor[this.contenedor.length-1].setInteractive();
            this.input.setDraggable(this.contenedor[i%10]);
            
            //console.log(verbs[s][i]);
            
            
            this.contenedor[this.contenedor.length-1].setData({x:150+360*(i%5),y:300+100*(i%10>=5?1:0),z:i});
            this.contenedor[this.contenedor.length-1].x=150+360*(i%5);
            this.contenedor[this.contenedor.length-1].y=300+100*(i%10>=5?1:0);
            this.contenedor[this.contenedor.length-1].depth=0;
            
        }
        
        for(var i=10*r;i<10*(r+1)&& i<verbs[s].length;i++){
            this.rectangulo = this.add.rectangle(0,0,ancho,alto, 0xCC2E89).setStrokeStyle(2, 0x000000);
           
            this.contenedor.push( this.add.container(0,0));
           
            this.text =this.add.text(0,0, verbos[s][pos[i]], { color: 'black', fontFamily: 'Arial', fontSize: '40px '}).setOrigin(0.5,0.5);

            this.contenedor[this.contenedor.length-1].add([this.rectangulo,this.text]);
            this.contenedor[this.contenedor.length-1].setSize(ancho,alto);
            this.contenedor[this.contenedor.length-1].setInteractive();
            this.input.setDraggable(this.contenedor[this.contenedor.length-1]);
            
            //console.log(verbs[s][i]);
            
            this.contenedor[this.contenedor.length-1].setData({x:150+360*(val[i%10]%5),y:500+100*(val[i%10]>=5?1:0),z:i});
            this.contenedor[this.contenedor.length-1].x=150+360*(val[i%10]%5);
            this.contenedor[this.contenedor.length-1].y=500+100*(val[i%10]>=5?1:0);
            this.contenedor[this.contenedor.length-1].depth=0;
            
            //this.physics.add.collider(this.contenedor[i%10+10].list[0], t
            //.his.contenedor[i%10].list[0], this.tocar,null,this);
        }
        //console.log((this.contenedor[0].list));
        //console.log(Phaser.Geom.Intersects.RectangleToRectangle(this.contenedor[0].getBounds(),this.contenedor[10].getBounds()));
        this.input.on('drag',  (pointer, gameObject, dragX, dragY) =>{
                gameObject.x = dragX;
                gameObject.y = dragY;
                gameObject.depth = 1;
                
                
                
        });
            
        this.input.on('dragend', (pointer, obj, dropZone) => {
       // Arrastrando
       // Si no soltamos en la zona que este habilitada
            var i=obj.getData("z");
            //console.log(i);
            var mod=this.contenedor.length/2;
            //console.log("pos1 = "+ (obj.getData("z")%10)+ " pos2 = "+(obj.getData("z")%10+mod));
            var int1= Phaser.Geom.Intersects.RectangleToRectangle(obj.getBounds(),this.contenedor[obj.getData("z")%10].getBounds());
            var int2= Phaser.Geom.Intersects.RectangleToRectangle(obj.getBounds(),this.contenedor[obj.getData("z")%10+mod].getBounds());
            //console.log(int1);
            //console.log(int2);
            if (!(int1&&int2)) {
                obj.x = obj.getData("x");
                obj.y = obj.getData("y");  
                obj.depth = 0;
                this.falso();
            }else{
                this.contenedor[i%10].setVisible(false);
                this.contenedor[i%10+mod].setVisible(false);
                this.correcto();
                correcto++;
                if(correcto===mod){
                    this.input.off('dragend');
                    correcto=0;
                    r++;
                    if(r<=max){
                        b=0;
                        this.lienzo.clear();
                        this.lienzo2.clear();
                        this.create();
                    }else{
                        this.fin();
                        console.log("FIN");
                    }
                    
                }
            }     

              //console.log(obj);

        });
        
        
        
        
        
        
        this.lienzo = this.add.graphics();
        this.lienzo2= this.add.graphics();
        
        
        
    }
    fin(){
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
    tocar(){
        console.log("Se tocaron");
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
        
        
       //console.log(this.game.loop.actualFps);
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
class L3 extends Phaser.Scene {
    constructor() {
        super({key: 'L3'}); // active:'true'
    }
    init(data){
        level = data.l;
        s=data.s-1;
    }
    preload() {
        this.load.image('inicio', './asset/img/inicio.png');
        val=new Array();
        pos=new Array();
        r=0;
        max=Math.floor(verbos[s].length/10);
        for(var i=0;i<10;i++){
            val.push(i);
        }
        for(var i=0;i<verbos[s].length;i++){
            pos.push(i);
        }
        val.sort(() => (Math.random() > 0.5 ? 1 : -1));
        pos.sort(() => (Math.random() > 0.5 ? 1 : -1));
        this.load.audio('correct', './asset/sounds/correct.mp3');
        this.load.audio('wrong', './asset/sounds/wrong.mp3');
        this.load.css('80s', './src/fuente.css');
    }
    create() {
        correcto=0;
        
        this.inicio = this.add.image(130,130,'inicio');
        this.inicio.setScale(0.5);
        const inicio = this.add.zone(0, 0, 250, 250);
        inicio.setOrigin(0);
        inicio.setInteractive();
        inicio.once('pointerdown', () => this.opcionPulsada('inicio'));
        
        
        c = this.sound.add('correct',{loop:false});
        w = this.sound.add('wrong',{loop:false});
               
        
        this.contenedor = new Array();
        for(var i=10*r;i<10*(r+1)&& i<verbs[s].length;i++){
            this.rectangulo = this.add.rectangle(0,0,ancho,alto, 0x2ECC71).setStrokeStyle(2, 0x000000);
            
            this.contenedor.push( this.add.container(0,0));
            
            this.text =this.add.text(0,0, verbs[s][pos[i]], { color: 'black', fontFamily: 'Arial', fontSize: '40px '}).setOrigin(0.5,0.5);

            this.contenedor[this.contenedor.length-1].add([this.rectangulo ,this.text]);
            this.contenedor[this.contenedor.length-1].setSize(ancho,alto);
            this.contenedor[this.contenedor.length-1].setInteractive();
            this.input.setDraggable(this.contenedor[i%10]);
            
            //console.log(verbs[s][i]);
            
            
            this.contenedor[this.contenedor.length-1].setData({x:150+360*(i%5),y:300+100*(i%10>=5?1:0),z:i});
            this.contenedor[this.contenedor.length-1].x=150+360*(i%5);
            this.contenedor[this.contenedor.length-1].y=300+100*(i%10>=5?1:0);
            this.contenedor[this.contenedor.length-1].depth=0;
            
        }
        
        for(var i=10*r;i<10*(r+1)&& i<verbs[s].length;i++){
            this.rectangulo = this.add.rectangle(0,0,ancho,alto, 0xCC2E89).setStrokeStyle(2, 0x000000);
           
            this.contenedor.push( this.add.container(0,0));
           
            this.text =this.add.text(0,0, Past[s][pos[i]], { color: 'black', fontFamily: 'Arial', fontSize: '40px '}).setOrigin(0.5,0.5);

            this.contenedor[this.contenedor.length-1].add([this.rectangulo,this.text]);
            this.contenedor[this.contenedor.length-1].setSize(ancho,alto);
            this.contenedor[this.contenedor.length-1].setInteractive();
            this.input.setDraggable(this.contenedor[this.contenedor.length-1]);
            
            //console.log(verbs[s][i]);
            
            this.contenedor[this.contenedor.length-1].setData({x:150+360*(val[i%10]%5),y:500+100*(val[i%10]>=5?1:0),z:i});
            this.contenedor[this.contenedor.length-1].x=150+360*(val[i%10]%5);
            this.contenedor[this.contenedor.length-1].y=500+100*(val[i%10]>=5?1:0);
            this.contenedor[this.contenedor.length-1].depth=0;
            
            //this.physics.add.collider(this.contenedor[i%10+10].list[0], t
            //.his.contenedor[i%10].list[0], this.tocar,null,this);
        }
        //console.log((this.contenedor[0].list));
        //console.log(Phaser.Geom.Intersects.RectangleToRectangle(this.contenedor[0].getBounds(),this.contenedor[10].getBounds()));
        this.input.on('drag',  (pointer, gameObject, dragX, dragY) =>{
                gameObject.x = dragX;
                gameObject.y = dragY;
                gameObject.depth = 1;
                
                
                
        });
            
        this.input.on('dragend', (pointer, obj, dropZone) => {
       // Arrastrando
       // Si no soltamos en la zona que este habilitada
            var i=obj.getData("z");
            //console.log(i);
            var mod=this.contenedor.length/2;
            //console.log("pos1 = "+ (obj.getData("z")%10)+ " pos2 = "+(obj.getData("z")%10+mod));
            var int1= Phaser.Geom.Intersects.RectangleToRectangle(obj.getBounds(),this.contenedor[obj.getData("z")%10].getBounds());
            var int2= Phaser.Geom.Intersects.RectangleToRectangle(obj.getBounds(),this.contenedor[obj.getData("z")%10+mod].getBounds());
            //console.log(int1);
            //console.log(int2);
            if (!(int1&&int2)) {
                obj.x = obj.getData("x");
                obj.y = obj.getData("y");  
                obj.depth = 0;
                this.falso();
            }else{
                this.contenedor[i%10].setVisible(false);
                this.contenedor[i%10+mod].setVisible(false);
                this.correcto();
                correcto++;
                if(correcto===mod){
                    this.input.off('dragend');
                    correcto=0;
                    r++;
                    if(r<=max){
                        b=0;
                        this.lienzo.clear();
                        this.lienzo2.clear();
                        this.create();
                    }else{
                        this.fin();
                        console.log("FIN");
                    }
                    
                }
            }     

              //console.log(obj);

        });
        
        
        
        
        
        
        this.lienzo = this.add.graphics();
        this.lienzo2= this.add.graphics();
        
        
        
    }
    fin(){
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
    tocar(){
        console.log("Se tocaron");
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
        
        
       //console.log(this.game.loop.actualFps);
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
class L4 extends Phaser.Scene {
    constructor() {
        super({key: 'L4'}); // active:'true'
    }
    init(data){
        level = data.l;
        s=data.s-1;
    }
    preload() {
        this.load.image('inicio', './asset/img/inicio.png');
        val=new Array();
        pos=new Array();
        r=0;
        max=Math.floor(verbos[s].length/10);
        for(var i=0;i<10;i++){
            val.push(i);
        }
        for(var i=0;i<verbos[s].length;i++){
            pos.push(i);
        }
        val.sort(() => (Math.random() > 0.5 ? 1 : -1));
        pos.sort(() => (Math.random() > 0.5 ? 1 : -1));
        this.load.audio('correct', './asset/sounds/correct.mp3');
        this.load.audio('wrong', './asset/sounds/wrong.mp3');
        this.load.css('80s', './src/fuente.css');
    }
    create() {
        correcto=0;
        
        this.inicio = this.add.image(130,130,'inicio');
        this.inicio.setScale(0.5);
        const inicio = this.add.zone(0, 0, 250, 250);
        inicio.setOrigin(0);
        inicio.setInteractive();
        inicio.once('pointerdown', () => this.opcionPulsada('inicio'));
        
        
        c = this.sound.add('correct',{loop:false});
        w = this.sound.add('wrong',{loop:false});
               
        
        this.contenedor = new Array();
        for(var i=10*r;i<10*(r+1)&& i<verbs[s].length;i++){
            this.rectangulo = this.add.rectangle(0,0,ancho,alto, 0x2ECC71).setStrokeStyle(2, 0x000000);
            
            this.contenedor.push( this.add.container(0,0));
            
            this.text =this.add.text(0,0, verbs[s][pos[i]], { color: 'black', fontFamily: 'Arial', fontSize: '40px '}).setOrigin(0.5,0.5);

            this.contenedor[this.contenedor.length-1].add([this.rectangulo ,this.text]);
            this.contenedor[this.contenedor.length-1].setSize(ancho,alto);
            this.contenedor[this.contenedor.length-1].setInteractive();
            this.input.setDraggable(this.contenedor[i%10]);
            
            //console.log(verbs[s][i]);
            
            
            this.contenedor[this.contenedor.length-1].setData({x:150+360*(i%5),y:300+100*(i%10>=5?1:0),z:i});
            this.contenedor[this.contenedor.length-1].x=150+360*(i%5);
            this.contenedor[this.contenedor.length-1].y=300+100*(i%10>=5?1:0);
            this.contenedor[this.contenedor.length-1].depth=0;
            
        }
        
        for(var i=10*r;i<10*(r+1)&& i<verbs[s].length;i++){
            this.rectangulo = this.add.rectangle(0,0,ancho,alto, 0xCC2E89).setStrokeStyle(2, 0x000000);
           
            this.contenedor.push( this.add.container(0,0));
           
            this.text =this.add.text(0,0, Participle[s][pos[i]], { color: 'black', fontFamily: 'Arial', fontSize: '40px '}).setOrigin(0.5,0.5);

            this.contenedor[this.contenedor.length-1].add([this.rectangulo,this.text]);
            this.contenedor[this.contenedor.length-1].setSize(ancho,alto);
            this.contenedor[this.contenedor.length-1].setInteractive();
            this.input.setDraggable(this.contenedor[this.contenedor.length-1]);
            
            //console.log(verbs[s][i]);
            
            this.contenedor[this.contenedor.length-1].setData({x:150+360*(val[i%10]%5),y:500+100*(val[i%10]>=5?1:0),z:i});
            this.contenedor[this.contenedor.length-1].x=150+360*(val[i%10]%5);
            this.contenedor[this.contenedor.length-1].y=500+100*(val[i%10]>=5?1:0);
            this.contenedor[this.contenedor.length-1].depth=0;
            
            //this.physics.add.collider(this.contenedor[i%10+10].list[0], t
            //.his.contenedor[i%10].list[0], this.tocar,null,this);
        }
        //console.log((this.contenedor[0].list));
        //console.log(Phaser.Geom.Intersects.RectangleToRectangle(this.contenedor[0].getBounds(),this.contenedor[10].getBounds()));
        this.input.on('drag',  (pointer, gameObject, dragX, dragY) =>{
                gameObject.x = dragX;
                gameObject.y = dragY;
                gameObject.depth = 1;
                
                
                
        });
            
        this.input.on('dragend', (pointer, obj, dropZone) => {
       // Arrastrando
       // Si no soltamos en la zona que este habilitada
            var i=obj.getData("z");
            //console.log(i);
            var mod=this.contenedor.length/2;
            //console.log("pos1 = "+ (obj.getData("z")%10)+ " pos2 = "+(obj.getData("z")%10+mod));
            var int1= Phaser.Geom.Intersects.RectangleToRectangle(obj.getBounds(),this.contenedor[obj.getData("z")%10].getBounds());
            var int2= Phaser.Geom.Intersects.RectangleToRectangle(obj.getBounds(),this.contenedor[obj.getData("z")%10+mod].getBounds());
            //console.log(int1);
            //console.log(int2);
            if (!(int1&&int2)) {
                obj.x = obj.getData("x");
                obj.y = obj.getData("y");  
                obj.depth = 0;
                this.falso();
            }else{
                this.contenedor[i%10].setVisible(false);
                this.contenedor[i%10+mod].setVisible(false);
                this.correcto();
                correcto++;
                if(correcto===mod){
                    this.input.off('dragend');
                    correcto=0;
                    r++;
                    if(r<=max){
                        b=0;
                        this.lienzo.clear();
                        this.lienzo2.clear();
                        this.create();
                    }else{
                        this.fin();
                        console.log("FIN");
                    }
                    
                }
            }     

              //console.log(obj);

        });
        
        
        
        
        
        
        this.lienzo = this.add.graphics();
        this.lienzo2= this.add.graphics();
        
        
        
    }
    fin(){
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
    tocar(){
        console.log("Se tocaron");
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
        
        
       //console.log(this.game.loop.actualFps);
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
  scene: [menu,L2,L3,L4],
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

