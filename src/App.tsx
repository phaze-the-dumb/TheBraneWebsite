import { onMount } from 'solid-js';
import { Particle } from './Particles/Particle';
import Lenis from 'lenis';

import './App.css'
import { Star } from './Particles/Star';
import { ShootingStar } from './Particles/ShootingStar';

let particles: Array<Particle> = [];

let App = () => {
  let canvas: HTMLCanvasElement;

  onMount(() => {
    // TODO: This background does not fit, need to find something else to use instead
    let ctx = canvas!.getContext("2d")!;
    let lenis = new Lenis();

    canvas!.width = window.innerWidth;
    canvas!.height = window.innerHeight;

    let grd = ctx.createRadialGradient(canvas!.width / 2, canvas!.height, canvas!.width / 5.5, canvas!.width / 2, canvas!.height, canvas!.width);
    grd.addColorStop(0, '#000836');
    grd.addColorStop(1, '#000612');

    window.onresize = () => {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;

      grd = ctx.createRadialGradient(canvas!.width / 2, canvas!.height, canvas!.width / 5.5, canvas!.width / 2, canvas!.height, canvas!.width);
      grd.addColorStop(0, '#000836');
      grd.addColorStop(1, '#000612');
    }

    for (let index = 0; index < 100; index++)
      particles.push(new Star(canvas!));
    
    for (let index = 0; index < 2; index++)
      particles.push(new ShootingStar(canvas!));


    let render = ( time: number ) => {
      ctx.clearRect(0, 0, canvas!.width, canvas!.height);

      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, canvas!.width, canvas!.height);

      lenis.raf(time);

      particles.forEach(p => p.draw(ctx, canvas!));
      requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
  })

  return (
    <>
      <canvas ref={canvas!}></canvas>

      <div class="landing">
        <div class="branelogo"></div>

        <h1 style={{ color: 'white', "text-align": 'center' }}>Brane Engine</h1>
        <p style={{ color: 'white', "text-align": 'center' }}>The framework for building self-hosted multiplayer VR platforms</p>
      </div>

      <div class="video-embed">
        <iframe width="1280" height="720" src="https://www.youtube.com/embed/mX-Uf3_XEAQ" title="My Plan To Save VR" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      </div>
    </>
  )
}

export default App
