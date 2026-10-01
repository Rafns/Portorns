import React, { useEffect, useRef, useState } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  baseAlpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
  color: string;
  depth: number;
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  alpha: number;
  maxAlpha: number;
  active: boolean;
}

export const StarrySkyBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const starsRef = useRef<Star[]>([]);
  const shootingStarsRef = useRef<ShootingStar[]>([]);
  const animFrameIdRef = useRef<number | null>(null);
  const lastShootingStarTimeRef = useRef<number>(Date.now());
  const [opacity, setOpacity] = useState<number>(0);

  // Monitor scroll position to ensure stars are only visible on Page 2 and onwards
  useEffect(() => {
    const handleScroll = () => {
      const heroEl = document.getElementById('beranda');
      const heroHeight = heroEl ? heroEl.offsetHeight : window.innerHeight;
      const scrollY = window.scrollY;

      // Start fading in as Hero begins exiting (e.g. past 25% of hero)
      const fadeStart = heroHeight * 0.25;
      const fadeEnd = heroHeight * 0.85;

      if (scrollY <= fadeStart) {
        setOpacity(0);
      } else if (scrollY >= fadeEnd) {
        setOpacity(1);
      } else {
        const factor = (scrollY - fadeStart) / (fadeEnd - fadeStart);
        setOpacity(Math.min(1, Math.max(0, factor)));
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // Initialize and animate starry sky canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const initCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      // Generate stars distribution matching reference image (image.png)
      // Star count proportionally scaled to screen dimensions
      const count = Math.round((width * height) / 5500);
      const starColors = [
        '#FFFFFF', // Pure crisp white (primary)
        '#FFFFFF',
        '#FFFFFF',
        '#F0FDF4', // Very soft mint/cyan tinge
        '#E0F2FE', // Ice blue tinge
        '#FEF9C3', // Warm golden star
      ];

      const newStars: Star[] = [];
      for (let i = 0; i < count; i++) {
        // Star size distribution: majority tiny pinpoint, few prominent
        const sizeRand = Math.random();
        let size = 0.8;
        if (sizeRand > 0.94) {
          size = 2.4 + Math.random() * 0.9; // Large glistening star
        } else if (sizeRand > 0.80) {
          size = 1.6 + Math.random() * 0.6; // Medium star
        } else if (sizeRand > 0.50) {
          size = 1.1 + Math.random() * 0.4;
        } else {
          size = 0.7 + Math.random() * 0.4; // Fine stardust pinpoint
        }

        newStars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size,
          baseAlpha: 0.35 + Math.random() * 0.6,
          twinkleSpeed: 0.008 + Math.random() * 0.025,
          twinklePhase: Math.random() * Math.PI * 2,
          color: starColors[Math.floor(Math.random() * starColors.length)],
          depth: 0.5 + Math.random() * 0.8,
        });
      }

      starsRef.current = newStars;
      shootingStarsRef.current = [];
    };

    initCanvas();

    const spawnShootingStar = () => {
      const angle = (Math.PI / 4) + (Math.random() * 0.3 - 0.15); // Diagonally downward
      shootingStarsRef.current.push({
        x: Math.random() * (width * 0.8),
        y: Math.random() * (height * 0.4),
        length: 70 + Math.random() * 70,
        speed: 9 + Math.random() * 6,
        angle,
        alpha: 0,
        maxAlpha: 0.7 + Math.random() * 0.3,
        active: true,
      });
    };

    let lastScrollY = window.scrollY;

    const render = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;

      // Draw all stars
      const stars = starsRef.current;
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        // Subtle parallax displacement based on scroll delta
        star.y -= scrollDelta * 0.06 * star.depth;
        // Wrap vertically if drifted outside
        if (star.y < 0) star.y += height;
        if (star.y > height) star.y -= height;

        // Twinkle calculation
        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinklePhase);
        const currentAlpha = Math.max(
          0.15,
          Math.min(1, star.baseAlpha * (0.65 + 0.35 * twinkle))
        );

        ctx.fillStyle = star.color;
        ctx.globalAlpha = currentAlpha;

        // Draw star core
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        // Prominent stars get a soft glowing corona
        if (star.size > 2.0 && currentAlpha > 0.5) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 2.4, 0, Math.PI * 2);
          ctx.fillStyle = star.color;
          ctx.globalAlpha = currentAlpha * 0.18;
          ctx.fill();
        }
      }

      // Randomly spawn gentle shooting stars every 7 to 14 seconds
      const now = Date.now();
      if (now - lastShootingStarTimeRef.current > 7500 + Math.random() * 6500) {
        lastShootingStarTimeRef.current = now;
        if (Math.random() > 0.3) {
          spawnShootingStar();
        }
      }

      // Render active shooting stars
      const shootingStars = shootingStarsRef.current;
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const ss = shootingStars[i];
        if (!ss.active) continue;

        ss.x += Math.cos(ss.angle) * ss.speed;
        ss.y += Math.sin(ss.angle) * ss.speed;
        ss.alpha += 0.05;

        if (ss.alpha >= ss.maxAlpha) {
          ss.maxAlpha -= 0.03;
          ss.alpha = ss.maxAlpha;
        }

        if (ss.maxAlpha <= 0 || ss.x > width + 100 || ss.y > height + 100) {
          shootingStars.splice(i, 1);
          continue;
        }

        const tailX = ss.x - Math.cos(ss.angle) * ss.length;
        const tailY = ss.y - Math.sin(ss.angle) * ss.length;

        const grad = ctx.createLinearGradient(tailX, tailY, ss.x, ss.y);
        grad.addColorStop(0, 'rgba(255, 255, 255, 0)');
        grad.addColorStop(0.7, `rgba(224, 242, 254, ${ss.alpha * 0.5})`);
        grad.addColorStop(1, `rgba(255, 255, 255, ${ss.alpha})`);

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.6;
        ctx.lineCap = 'round';
        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(ss.x, ss.y);
        ctx.stroke();

        // Shooting star head spark
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(ss.x, ss.y, 1.8, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      animFrameIdRef.current = requestAnimationFrame(render);
    };

    animFrameIdRef.current = requestAnimationFrame(render);

    const handleResize = () => {
      initCanvas();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (animFrameIdRef.current !== null) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      id="starry-sky-cosmos-container"
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-700 ease-out"
      style={{
        opacity,
        visibility: opacity > 0.01 ? 'visible' : 'hidden',
      }}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        id="starfield-canvas"
        className="w-full h-full block"
      />
    </div>
  );
};
