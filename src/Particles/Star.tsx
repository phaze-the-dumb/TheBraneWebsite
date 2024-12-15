import { Particle } from "./Particle";

export class Star extends Particle{
  x: number;
  y: number;
  radius: number;
  speed: number;
  colour: string;

  constructor( canvas: HTMLCanvasElement ){
    super();

    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.radius = Math.random() * 2;
    this.speed = Math.random() * 0.25;
    this.colour = 'rgb(150, 200, 255)';
  }
  draw( ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement ){
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.colour;
    ctx.fill();
    ctx.closePath();

    this.y += this.speed;
    if(this.y > canvas.height){
      this.x = Math.random() * canvas.width;
      this.y = 0;
    }
  }
}