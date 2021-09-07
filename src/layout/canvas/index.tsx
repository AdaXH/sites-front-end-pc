import React, { memo, useEffect, useRef } from 'react';
import SineWaves from 'sine-waves';
import styles from './styles.less';

export default memo(() => {
  const ref = useRef();
  useEffect(() => {
    if (ref.current) {
      const wave = new SineWaves({
        // Canvas Element
        el: ref.current,
        running: false,

        // General speed of entire wave system
        speed: 8,

        // How many degress should we rotate all of the waves
        rotate: 0,

        // Ease function from left to right
        ease: 'Linear',

        // Specific how much the width of the canvas the waves should be
        // This can either be a number or a percent
        waveWidth: '200%',

        // An array of wave options
        waves: [
          {
            timeModifier: 0.3, // This is multiplied againse `speed`
            lineWidth: 1, // Stroke width
            amplitude: 150, // How tall is the wave
            wavelength: 100, // How long is the wave
            segmentLength: 20, // How smooth should the line be
            strokeStyle: 'rgba(255, 255, 255, 1)', // Stroke color and opacity
          },
          {
            timeModifier: 0.5,
            lineWidth: 1,
            amplitude: 150,
            wavelength: 150,
            strokeStyle: 'white',
          },
          {
            timeModifier: 1,
            lineWidth: 1,
            amplitude: 150,
            wavelength: 200,
            strokeStyle: 'white',
          },
        ],

        // This function is called whenver the window is resized
        resizeEvent: function () {
          // Here is an example on how to create a gradient stroke
          var gradient = this.ctx.createLinearGradient(0, 0, this.width, 0);
          gradient.addColorStop(0, 'rgba(255, 255, 255, 0.2');
          gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.2)');
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0.2');
          var index = -1;
          var length = this.waves.length;
          while (++index < length) {
            this.waves[index].strokeStyle = gradient;
          }
        },
      });
      wave.running = true;
    }
  }, [ref]);
  return <canvas className={styles.wave} ref={ref} />;
});
