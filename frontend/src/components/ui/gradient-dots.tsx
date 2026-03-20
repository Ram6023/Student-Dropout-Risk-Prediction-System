'use client';

import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

type CinematicBackgroundProps = {
	className?: string;
};

export function GradientDots({ className }: CinematicBackgroundProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const mouseX = useMotionValue(0.5);
	const mouseY = useMotionValue(0.5);
	const smoothX = useSpring(mouseX, { stiffness: 20, damping: 15 });
	const smoothY = useSpring(mouseY, { stiffness: 20, damping: 15 });

	useEffect(() => {
		const handler = (e: MouseEvent) => {
			mouseX.set(e.clientX / window.innerWidth);
			mouseY.set(e.clientY / window.innerHeight);
		};
		window.addEventListener('mousemove', handler);
		return () => window.removeEventListener('mousemove', handler);
	}, [mouseX, mouseY]);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext('2d');
		if (!ctx) return;
		let animationId: number;

		const particles: Array<{
			x: number; y: number; z: number;
			vx: number; vy: number;
			size: number; opacity: number;
			pulse: number; speed: number;
			color: string;
		}> = [];

		const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
		resize();
		window.addEventListener('resize', resize);

		const colors = ['6, 182, 212', '34, 211, 238', '251, 191, 36', '139, 92, 246'];
		for (let i = 0; i < 60; i++) {
			particles.push({
				x: Math.random() * canvas.width,
				y: Math.random() * canvas.height,
				z: Math.random() * 3 + 0.5,
				vx: (Math.random() - 0.5) * 0.15,
				vy: (Math.random() - 0.5) * 0.15,
				size: Math.random() * 2 + 0.5,
				opacity: Math.random() * 0.2 + 0.03,
				pulse: Math.random() * Math.PI * 2,
				speed: Math.random() * 0.006 + 0.002,
				color: colors[Math.floor(Math.random() * colors.length)],
			});
		}

		const draw = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			const mx = smoothX.get();
			const my = smoothY.get();

			// Mouse-reactive grid
			const spacing = 70;
			for (let x = 0; x < canvas.width; x += spacing) {
				for (let y = 0; y < canvas.height; y += spacing) {
					const dx = (x / canvas.width - mx) * 8;
					const dy = (y / canvas.height - my) * 8;
					ctx.beginPath();
					ctx.arc(x + dx, y + dy, 0.5, 0, Math.PI * 2);
					ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
					ctx.fill();
				}
			}

			// Particles with depth-based parallax
			particles.forEach(p => {
				const parallaxFactor = p.z * 0.5;
				const offsetX = (mx - 0.5) * 30 * parallaxFactor;
				const offsetY = (my - 0.5) * 30 * parallaxFactor;
				p.x += p.vx;
				p.y += p.vy;
				p.pulse += p.speed;
				if (p.x < -10) p.x = canvas.width + 10;
				if (p.x > canvas.width + 10) p.x = -10;
				if (p.y < -10) p.y = canvas.height + 10;
				if (p.y > canvas.height + 10) p.y = -10;

				const drawX = p.x + offsetX;
				const drawY = p.y + offsetY;
				const pulseOpacity = p.opacity + Math.sin(p.pulse) * 0.08;
				const drawSize = p.size * (0.8 + p.z * 0.3);

				ctx.beginPath();
				ctx.arc(drawX, drawY, drawSize, 0, Math.PI * 2);
				ctx.fillStyle = `rgba(${p.color}, ${Math.max(0, pulseOpacity)})`;
				ctx.fill();
			});

			// Connections between close particles at same depth
			for (let i = 0; i < particles.length; i++) {
				for (let j = i + 1; j < particles.length; j++) {
					const ddx = particles[i].x - particles[j].x;
					const ddy = particles[i].y - particles[j].y;
					const dist = Math.sqrt(ddx * ddx + ddy * ddy);
					if (dist < 90 && Math.abs(particles[i].z - particles[j].z) < 1) {
						ctx.beginPath();
						ctx.moveTo(particles[i].x, particles[i].y);
						ctx.lineTo(particles[j].x, particles[j].y);
						ctx.strokeStyle = `rgba(6, 182, 212, ${0.025 * (1 - dist / 90)})`;
						ctx.lineWidth = 0.4;
						ctx.stroke();
					}
				}
			}
			animationId = requestAnimationFrame(draw);
		};
		draw();
		return () => { cancelAnimationFrame(animationId); window.removeEventListener('resize', resize); };
	}, [smoothX, smoothY]);

	const orb1X = useTransform(smoothX, [0, 1], [-30, 30]);
	const orb1Y = useTransform(smoothY, [0, 1], [-20, 20]);
	const orb2X = useTransform(smoothX, [0, 1], [25, -25]);
	const orb2Y = useTransform(smoothY, [0, 1], [15, -15]);
	const orb3X = useTransform(smoothX, [0, 1], [-15, 15]);
	const orb3Y = useTransform(smoothY, [0, 1], [-25, 25]);
	const orb1RotX = useTransform(smoothY, [0, 1], [5, -5]);
	const orb1RotY = useTransform(smoothX, [0, 1], [-5, 5]);

	return (
		<div className={`absolute inset-0 overflow-hidden ${className}`} style={{ backgroundColor: '#050810', perspective: '1200px' }}>
			<canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

			{/* 3D Floating Orbs */}
			<motion.div
				style={{ x: orb1X, y: orb1Y, rotateX: orb1RotX, rotateY: orb1RotY, background: 'radial-gradient(circle, rgba(6,182,212,0.07) 0%, transparent 65%)', willChange: 'transform' }}
				animate={{ scale: [1, 1.2, 1] }}
				transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
				className="absolute top-[8%] left-[15%] w-[500px] h-[500px] rounded-full pointer-events-none"
			/>
			<motion.div
				style={{ x: orb2X, y: orb2Y, background: 'radial-gradient(circle, rgba(251,191,36,0.04) 0%, transparent 65%)', willChange: 'transform' }}
				animate={{ scale: [1.1, 0.9, 1.1] }}
				transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
				className="absolute bottom-[10%] right-[10%] w-[450px] h-[450px] rounded-full pointer-events-none"
			/>
			<motion.div
				style={{ x: orb3X, y: orb3Y, background: 'radial-gradient(circle, rgba(139,92,246,0.04) 0%, transparent 60%)', willChange: 'transform' }}
				animate={{ scale: [0.9, 1.15, 0.9] }}
				transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
				className="absolute top-[45%] left-[45%] w-[350px] h-[350px] rounded-full pointer-events-none"
			/>

			{/* Cinematic vignette */}
			<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(5,8,16,0.5)_50%,rgba(5,8,16,0.95)_100%)] pointer-events-none" />
			
			{/* Scanline */}
			<div className="absolute inset-0 opacity-[0.015] pointer-events-none"
				 style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)' }} />
		</div>
	);
}
