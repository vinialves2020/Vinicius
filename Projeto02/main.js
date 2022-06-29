const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
canvas.height= window.innerHeight ;
canvas.width= window.innerWidth;
let particulasArray;

ctx.shadowColor = "darkgreen";
ctx.shadowBlur = 8;
let mouse={
    x:null,
    y:null,
    radius: 150
}

window.addEventListener("mousemove",
        function(event){
            mouse.x=event.x
            mouse.y=event.y
        })

class particulas{
    constructor(x,y,direX,direY,tamanho,cor){
        this.x=x;
        this.y=y;
        this.direX=direX;
        this.direY=direY;
        this.tamanho=tamanho;
        this.cor=getRandomColor()

    }
    draw(){
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.tamanho,0,Math.PI*2);
        ctx.fillStyle= this.cor
        ctx.fill();
    }
    update(){
        if(this.x> canvas.width || this.x<0){
            this.direX = -this.direX;
        }
        if(this.y> canvas.height || this.y<0){
            this.direY = -this.direY;
        }
        
        let dx = this.x - mouse.x
        let dy = this.y - mouse.y
        let distancia= Math.sqrt(dx*dx + dy*dy)
        /*
        let forcadirx = dx /distancia
        let forcadiry = dy /distancia
        let maxDistancia = mouse.radius
        let forca= (maxDistancia -distancia)/maxDistancia
        let direx = forcadirx * forca
        let diry = forcadiry * forca
        if( distancia < mouse.radius){
            this.x += direx
            this.y += diry
        }
        */
        this.cor="green"
        if(distancia<mouse.radius + this.tamanho){
            if(mouse.x < this.x && this.x < canvas.width - this.tamanho * 10){
                this.x+=5;
                
            }
          
            if(mouse.x > this.x && this.x >  this.tamanho * 10){
                this.x-=5;
                           }
            
            if(mouse.y < this.y && this.y < canvas.height - this.tamanho * 10){
                this.y+=5;
                          }
            
            if(mouse.y > this.y && this.y <  this.tamanho * 10){
                this.y-=5;
                           }
            else{
                this.cor="red"
            }
           
        }
         
        this.x+= this.direX 
        this.y+= this.direY
        this.draw();
    }
    
}
function init(){
    particulasArray =[]
    let numDeParticulas = (canvas.height *canvas.width)/800
    for (let i = 0; i < numDeParticulas; i++) {
        let tam = (Math.random()*5)+3
        let x = (Math.random()*((innerWidth - tam*2)-(tam *2))+tam*2)
        let y = (Math.random()*((innerHeight - tam*2)-(tam *2))+tam*2)
        let dirx = (Math.random()*5) -2.5
        let diry = (Math.random()*5) -2.5
        let color =getRandomColor()

        particulasArray.push(new particulas(x,y,dirx,diry,tam,color))
    }
}
function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,innerWidth,innerHeight)

    for (let i = 0; i < particulasArray.length; i++) {
        particulasArray[i].update();
        
    }
    
}
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
init();
animate();