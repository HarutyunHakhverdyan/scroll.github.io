const app = new PIXI.Application({ background: '#1099bb', resizeTo: window });

document.body.appendChild(app.view);
let numRandom=Math.round(26*Math.random())+4
class Rectangle {
    constructor(x, y, width, height, color = '929F2F', borderColor=0xFEEB77) {
        this.width = width;
        this.height = height;
        this.containerRect = new PIXI.Container();
        this.backgroundRect = new PIXI.Graphics();
        this.backgroundRect.beginFill(color); 
        this.backgroundRect.lineStyle(2, borderColor, 1)
        this.backgroundRect.drawRect(0, 0, width, height);
        this.containerRect.y=y
        this.containerRect.x=x
    }

    addChild(child) {
        child.x = this.width / 2;
        child.y = this.height / 2;
        this.containerRect.addChildAt(child)
    }

    getContainer() {
        this.containerRect.addChildAt(this.backgroundRect, 0);
        return this.containerRect
    }
}

let arrRect=[]

for(let i=0;i<numRandom;i++){
    const rect=new Rectangle(i*50+250, 100, 50, 50);
    const text = new PIXI.Text(i+1, {
        fontFamily: 'Arial',
        fontSize: 24,
        fill: 0xff1010,
        align: 'center',
    })
    text.anchor.set(0.5)

    rect.addChild(text)
    app.stage.addChild(rect.getContainer())
    arrRect.push(rect.getContainer())
}

let container1 = new PIXI.Container();
let background1 = new PIXI.Graphics();

      background1.beginFill('#1099bb'); 
      background1.drawRect(0, 0, 250, 60);
      container1.addChildAt(background1);

app.stage.addChild(container1);
      container1.x=0
      container1.y=95

let container2 = new PIXI.Container();
let background2 = new PIXI.Graphics();

     background2.beginFill('#1099bb'); 
     background2.drawRect(0, 0, 3000, 60);
     container2.addChildAt(background2);

app.stage.addChild(container2);
     container2.x=450
     container2.y=95

  if(arrRect.length>4){
           let textureArrow=PIXI.Texture.from('https://static.vecteezy.com/system/resources/previews/009/351/258/non_2x/arrow-icon-arrows-sign-black-arrows-free-png.png')
           let arrowRight= new PIXI.Sprite(textureArrow)
                 arrowRight.anchor.set(0,0)
                 arrowRight.scale.x=0.05
                 arrowRight.scale.y=0.05
                 arrowRight.interactive = true; 
                 arrowRight.buttonMode = true;
                 arrowRight.on('click',onClickRight)
                 container2.addChild(arrowRight)
           let arrowLeft= new PIXI.Sprite(textureArrow)
                arrowLeft.scale.x=0.05
                 arrowLeft.scale.y=0.05
                 arrowLeft.anchor.set(1,0)
                 arrowLeft.x=200
                 arrowLeft.scale.x=-arrowLeft.scale.x
                 container1.addChild(arrowLeft)
                 arrowLeft.interactive = true; 
                 arrowLeft.buttonMode = true;
                 arrowLeft.on('click',onClickLeft)
           let length=0      
           let click
           let num=0 
           let lastX=arrRect[arrRect.length-1].x
           let firstX=arrRect[0].x
           let condRight=true
           let condLeft=true
           function onClickLeft(){
               if(condLeft){
                if(num==0){
                    lastX=arrRect[arrRect.length-1].x 
                     }
             click='onClickLeft'
                if(arrRect[arrRect.length-1].x<=400){
                              condRight=true
                              num=0
                        }else{
                             num=-1 
                        }
                 }  
             }

           function onClickRight(){
  
               if(condRight){
                   if(num==0){
                    firstX=arrRect[0].x
                    }
                click='onClickRight'
                 if(arrRect[0].x>=250){
                     condLeft=true
                     num=0
                  }else{
                     num=1 
                  } 
               }
    
           }
           function rotate(){
                   if(click=='onClickLeft'&&num!=0){
                       if(lastX-arrRect[arrRect.length-1].x<200){
                           if(arrRect[arrRect.length-1].x>400){
                               condRight=false
                           }
                           onClickLeft() 
                         }else{
                           condRight=true
                           firstX=arrRect[0].x
                           num=0
                       }
                   }
                if(click=='onClickRight'&&num!=0){
                   if(arrRect[0].x-firstX<200){
                       onClickRight()
                       if(arrRect[0].x<250){
                            condLeft=false  
                          }
                        }else{
                         lastX=arrRect[arrRect.length-1].x
                        num=0
                        condLeft=true
                       }
                    } 
               for(let i=0;i<arrRect.length;i++){
                   arrRect[i].x+=num
                              k=Math.abs(num)
               }
           }    
           
           
           app.ticker.add(()=>{
               rotate()
           })
     }
