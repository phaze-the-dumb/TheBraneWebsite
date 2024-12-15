import { Particle } from "./Particle";

export class ShootingStar extends Particle{
  x: number;
  y: number;
  radius: number;
  xVel: number;
  yVel: number;
  trail: any[];
  colour: string;
  queued: boolean

  constructor( canvas: HTMLCanvasElement ){
    super();

    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.trail = [];
    this.xVel = 0;
    this.yVel = 0;
    this.colour = 'rgb(150, 200, 255)';
    this.radius = (Math.random() * 0.5) + 0.5;
    this.queued = false;

    let sideChoice = Math.floor(Math.random() * 4);

    if(sideChoice === 0){
      this.x = 0;
      this.yVel = (Math.random() * 40) - 20;
      this.xVel = (Math.random() * 20) - 0;
    } else if(sideChoice === 1){
      this.x = canvas.width;
      this.yVel = (Math.random() * 40) - 20;
      this.xVel = (Math.random() * 20) - 20;
    } else if(sideChoice === 2){
      this.y = 0;
      this.yVel = (Math.random() * 20) - 0;
      this.xVel = (Math.random() * 40) - 20;
    } else{
      this.y = canvas.height;
      this.yVel = (Math.random() * 20) - 20;
      this.xVel = (Math.random() * 40) - 20;
    }
  }
  draw( ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement ){
    ctx.fillStyle = this.colour;
    ctx.strokeStyle = this.colour;

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.closePath();

    let lpos = [ this.x, this.y ];

    this.trail.forEach((pos, i) => {
      ctx.lineWidth = (this.radius * 2) - (i / 10);
      if(ctx.lineWidth > 0.5){
        ctx.beginPath();
        ctx.moveTo(lpos[0], lpos[1]);
        ctx.lineTo(pos[0], pos[1]);
        ctx.stroke();
        ctx.closePath();

        lpos = pos;
      } else
          return;
    })

    this.trail.splice(0, 0, [ this.x, this.y ]);

    this.x += this.xVel;
    this.y += this.yVel;

    if((this.x > canvas.width || this.y > canvas.height || this.x < 0 || this.y < 0) && !this.queued){
      this.queued = true;
      setTimeout(() => {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.trail = [];
        this.xVel = 0;
        this.yVel = 0;
        this.colour = '#fff';
        this.radius = (Math.random() * 0.5) + 0.5;
        this.queued = false;

        let sideChoice = Math.floor(Math.random() * 4);

        if(sideChoice === 0){
          this.x = 0;
          this.yVel = (Math.random() * 40) - 20;
          this.xVel = (Math.random() * 20) - 0;
        } else if(sideChoice === 1){
          this.x = canvas.width;
          this.yVel = (Math.random() * 40) - 20;
          this.xVel = (Math.random() * 20) - 20;
        } else if(sideChoice === 2){
          this.y = 0;
          this.yVel = (Math.random() * 20) - 0;
          this.xVel = (Math.random() * 40) - 20;
        } else{
          this.y = canvas.height;
          this.yVel = (Math.random() * 20) - 20;
          this.xVel = (Math.random() * 40) - 20;
        }
      }, 500 + (Math.random() * 1000));
    }
  }
}