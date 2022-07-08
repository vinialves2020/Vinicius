const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
canvas.height= window.innerHeight ;
canvas.width= window.innerWidth;
particulasArray=[]
particulasArray2=[]
hue = 0;

let mouse={
    x:0,
    y:0,
}

window.addEventListener('click',function(event){
            mouse.x=event.x
            mouse.y=event.y
            console.log("click")
            
        })
window.addEventListener('mousemove',function(event){
            mouse.x=event.x
            mouse.y=event.y
            for (let i = 0; i < 5; i++) {
                particulasArray.push(new particulas());
            }
            
        })
class particulas{
    constructor(){
        this.x= mouse.x
        this.y= mouse.y
        this.dirx= Math.random() *3 - 1,5;
        this.diry=Math.random() *3 - 1,5;
        this.tam=Math.random() *5 + 4;
        this.cor='hsl('+hue+',100%,50%)';
    }
    update(){
        this.x+= this.dirx;
        this.y+= this.diry;
        if(this.tam > 0.2) {
            this.tam-= 0.1;
        }
    }

    draw(){
        ctx.fillStyle=this.cor
        ctx.beginPath()
        ctx.arc(this.x,this.y,this.tam,0,Math.PI*2)
        ctx.fill();
    }
}
class particulas2{
    constructor(x=0,y=0){
        this.x= x
        this.y= y
        this.dirx= Math.random() *2 - 1,5;
        this.diry=Math.random() *2 - 1,5;
        this.tam=Math.random() *5 + 0.5;
        this.cor='hsl('+hue+',100%,50%)';
    }
    update(){
        this.x+= this.dirx;
        this.y+= this.diry;
        if(this.tam > 0.2) {
            this.tam-= 0.1;
        }
    }

    draw(){
        ctx.fillStyle=this.cor
        ctx.beginPath()
        ctx.arc(this.x,this.y,this.tam,0,Math.PI*2)
        ctx.fill();
    }
}
function handleParticles(){
    for (let i = 0; i < particulasArray.length; i++) {
        particulasArray[i].update();
        particulasArray[i].draw();
        if(particulasArray[i].tam<= 0.3){
            tempx = particulasArray[i].x
            tempy = particulasArray[i].y
            if(tempx!=undefined && tempy != undefined){
                for (let i = 0; i < 10; i++) {
                particulasArray2.push(new particulas2(tempx,tempy));
            }}
            particulasArray.splice(i,1);
            i--;
        }
        
    }
    for (let i = 0; i < particulasArray2.length; i++) {
        particulasArray2[i].update();
        particulasArray2[i].draw();
        if(particulasArray2[i].tam<= 0.3){
            particulasArray2.splice(i,1);
            i--;
        }
        
    }
}
function animate(){
    hue+=2
    ctx.clearRect(0,0,innerWidth,innerHeight)
    handleParticles();
    requestAnimationFrame(animate);
    
}
animate();