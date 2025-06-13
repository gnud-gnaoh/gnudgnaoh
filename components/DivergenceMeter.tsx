'use client';

import {useEffect, useRef} from 'react';


export default function DivergenceMeter() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = '../lib/jquery-3.7.1.min.js';
    script.onload = () => {
      const $ = (window as any).$;
      const TWIDTH = 400;
      let shiftH = 0;
      let shiftW = 0;

      const c = canvasRef.current;
      if (!c) return;

      const cxt = c.getContext('2d');
      if (!cxt) return;

      const img = new Image();
      img.src = '../images/numbers.png';

      let arr: number[] = [];

      function createArr(): number[] {
        const numList: number[] = [];
        for (let i = 0; i < 8; i++) {
          numList.push(Math.floor(Math.random() * 10));
        }
        numList[1] = 10;
        return numList;
      }

      function drawTubes(arr: number[], isHighlighted: boolean): HTMLCanvasElement {
        const nCanvas = document.createElement('canvas');
        nCanvas.width = TWIDTH;
        nCanvas.height = 135;
        const nCxt = nCanvas.getContext('2d');
        if (!nCxt) return nCanvas;

        const line = isHighlighted ? 1 : 0;
        for (let i = 0; i < arr.length; i++) {
          nCxt.drawImage(
            img,
            45 * arr[i],
            135 * line,
            45,
            135,
            (TWIDTH / 8) * i,
            0,
            45,
            135
          );
        }

        return nCanvas;
      }

      function blink(greyCVS: HTMLCanvasElement, shinyCVS: HTMLCanvasElement) {
        let factor = 0;
        const TIME = 20;
        let intUp: NodeJS.Timeout;
        let intDown: NodeJS.Timeout;

        const createImage = () => {
          const sc2 = document.createElement('canvas');
          sc2.width = TWIDTH;
          sc2.height = 135;
          const scxt2 = sc2.getContext('2d');
          if (!scxt2) return;

          factor += 0.02;
          cxt.clearRect(0, 0, sc2.width, sc2.height);
          cxt.drawImage(greyCVS, shiftW, shiftH);
          scxt2.globalAlpha = factor;
          scxt2.drawImage(shinyCVS, 0, 0);
          cxt.drawImage(sc2, shiftW, shiftH);

          if (factor >= 2) {
            clearInterval(intUp);
            intDown = setInterval(createImage2, TIME);
          }
        };

        const createImage2 = () => {
          const sc2 = document.createElement('canvas');
          sc2.width = TWIDTH;
          sc2.height = 135;
          const scxt2 = sc2.getContext('2d');
          if (!scxt2) return;

          factor -= 0.02;
          cxt.clearRect(0, 0, sc2.width, sc2.height);
          cxt.drawImage(greyCVS, shiftW, shiftH);
          scxt2.globalAlpha = factor;
          scxt2.drawImage(shinyCVS, 0, 0);
          cxt.drawImage(sc2, shiftW, shiftH);

          if (factor <= 0) {
            clearInterval(intDown);
            cxt.clearRect(0, 0, sc2.width, sc2.height);
            cxt.drawImage(greyCVS, shiftW, shiftH);
          }
        };

        intUp = setInterval(createImage, TIME);
      }

      let loop0: NodeJS.Timeout;
      let blink0: NodeJS.Timeout;

      function loop() {
        arr = createArr();
        cxt.drawImage(drawTubes(arr, false), shiftW, shiftH);
      }

      function stopLoop() {
        clearInterval(loop0);
        blink(drawTubes(arr, false), drawTubes(arr, true));
      }

      function changeWorldLine() {
        try {
          clearInterval(loop0);
          clearTimeout(blink0);
        } catch (err) {}
        loop0 = setInterval(loop, 50);
        blink0 = setTimeout(stopLoop, 3000);
      }

      img.onload = () => {
        changeWorldLine();
      };

      $('#cwl').click(() => {
        changeWorldLine();
      });
    };

    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <div>
        <canvas ref={canvasRef} id="myCanvas" width={400} height={135}>
        </canvas>
      </div>
      <div>
        <button type="button" id="cwl">
          send D-Mail!
        </button>
      </div>
    </div>
  );
}