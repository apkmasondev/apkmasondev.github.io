import { useEffect, useRef } from 'react';

type Point3D = [number, number, number];

const TAU = Math.PI * 2;

function projectPoint(
  [x, y, z]: Point3D,
  width: number,
  height: number,
  rotateX: number,
  rotateY: number,
) {
  const cosY = Math.cos(rotateY);
  const sinY = Math.sin(rotateY);
  const x1 = x * cosY - z * sinY;
  const z1 = x * sinY + z * cosY;
  const cosX = Math.cos(rotateX);
  const sinX = Math.sin(rotateX);
  const y1 = y * cosX - z1 * sinX;
  const z2 = y * sinX + z1 * cosX;
  const perspective = 360 / (360 + z2);

  return {
    x: width / 2 + x1 * perspective,
    y: height / 2 + y1 * perspective,
    depth: z2,
  };
}

function drawPath(
  context: CanvasRenderingContext2D,
  points: Point3D[],
  width: number,
  height: number,
  rotateX: number,
  rotateY: number,
  color: string,
  lineWidth: number,
  close = false,
) {
  context.beginPath();
  points.forEach((point, index) => {
    const projected = projectPoint(point, width, height, rotateX, rotateY);
    if (index === 0) context.moveTo(projected.x, projected.y);
    else context.lineTo(projected.x, projected.y);
  });
  if (close) context.closePath();
  context.strokeStyle = color;
  context.lineWidth = lineWidth;
  context.stroke();
}

function drawArtifact(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  progress: number,
) {
  context.clearRect(0, 0, width, height);

  const glow = context.createRadialGradient(
    width * 0.52,
    height * 0.5,
    0,
    width * 0.52,
    height * 0.5,
    width * 0.42,
  );
  glow.addColorStop(0, 'rgba(255, 77, 46, 0.085)');
  glow.addColorStop(0.42, 'rgba(255, 77, 46, 0.025)');
  glow.addColorStop(1, 'rgba(0, 0, 0, 0)');
  context.fillStyle = glow;
  context.fillRect(0, 0, width, height);

  const scale = Math.min(width, height) / 290;
  const rotateY = -0.72 + progress * TAU;
  const rotateX = 0.08 + Math.sin(progress * TAU) * 0.16;
  const signalProgress = (1 - Math.cos(progress * TAU)) / 2;
  const ringCount = 19;
  const segments = 72;
  const longitudinalCount = 12;

  context.lineCap = 'round';
  context.lineJoin = 'round';

  for (let ring = 0; ring < ringCount; ring += 1) {
    const vertical = ring / (ringCount - 1);
    const y = (vertical - 0.5) * 230 * scale;
    const envelope = Math.pow(Math.sin(vertical * Math.PI), 0.72);
    const radius = (23 + envelope * 88) * scale;
    const twist = vertical * 2.45 + progress * TAU;
    const points: Point3D[] = [];

    for (let segment = 0; segment <= segments; segment += 1) {
      const angle = (segment / segments) * TAU;
      const pulse = 1 + Math.sin(angle * 3 + twist) * 0.055;
      points.push([
        Math.cos(angle + twist) * radius * pulse,
        y + Math.sin(angle * 2 - twist) * 5 * scale * envelope,
        Math.sin(angle + twist) * radius * 0.72 * pulse,
      ]);
    }

    const distanceFromSignal = Math.abs(ring / (ringCount - 1) - signalProgress);
    const isSignal = distanceFromSignal < 0.046;
    drawPath(
      context,
      points,
      width,
      height,
      rotateX,
      rotateY,
      isSignal ? 'rgba(255, 91, 57, 0.95)' : `rgba(223, 218, 208, ${0.08 + envelope * 0.13})`,
      isSignal ? 1.35 : 0.62,
      true,
    );
  }

  for (let line = 0; line < longitudinalCount; line += 1) {
    const angle = (line / longitudinalCount) * TAU;
    const points: Point3D[] = [];

    for (let ring = 0; ring < ringCount; ring += 1) {
      const vertical = ring / (ringCount - 1);
      const y = (vertical - 0.5) * 230 * scale;
      const envelope = Math.pow(Math.sin(vertical * Math.PI), 0.72);
      const radius = (23 + envelope * 88) * scale;
      const twist = vertical * 2.45 + progress * TAU;
      const pulse = 1 + Math.sin(angle * 3 + twist) * 0.055;
      points.push([
        Math.cos(angle + twist) * radius * pulse,
        y + Math.sin(angle * 2 - twist) * 5 * scale * envelope,
        Math.sin(angle + twist) * radius * 0.72 * pulse,
      ]);
    }

    drawPath(
      context,
      points,
      width,
      height,
      rotateX,
      rotateY,
      line === 1 ? 'rgba(255, 77, 46, 0.3)' : 'rgba(223, 218, 208, 0.11)',
      line === 1 ? 0.9 : 0.55,
    );
  }

  const signalAngle = progress * TAU * 2;
  const signalPoint: Point3D = [
    Math.cos(signalAngle) * 74 * scale,
    (signalProgress - 0.5) * 210 * scale,
    Math.sin(signalAngle) * 54 * scale,
  ];
  const projectedSignal = projectPoint(signalPoint, width, height, rotateX, rotateY);
  context.shadowColor = 'rgba(255, 77, 46, 0.8)';
  context.shadowBlur = 12;
  context.beginPath();
  context.arc(projectedSignal.x, projectedSignal.y, 2.2, 0, TAU);
  context.fillStyle = '#ff5b39';
  context.fill();
  context.shadowBlur = 0;
}

export function ForgeArtifact() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let width = 0;
    let height = 0;
    let visible = true;
    let frame = 0;
    let lastFrame = 0;

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      width = bounds.width;
      height = bounds.height;
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      if (reducedMotion) drawArtifact(context, width, height, 0.12);
    };

    const render = (time: number) => {
      frame = window.requestAnimationFrame(render);
      if (!visible || time - lastFrame < 32) return;
      lastFrame = time;
      drawArtifact(context, width, height, (time % 6000) / 6000);
    };

    const resizeObserver = new ResizeObserver(resize);
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });

    resizeObserver.observe(canvas);
    visibilityObserver.observe(canvas);
    resize();
    if (!reducedMotion) frame = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
    };
  }, []);

  return (
    <figure className="forge-artifact" aria-hidden="true">
      <figcaption>
        <span>Generative / Forge signal</span>
        <span>06s loop</span>
      </figcaption>
      <canvas ref={canvasRef} />
      <span className="forge-artifact-axis">Human direction / Machine velocity</span>
    </figure>
  );
}
