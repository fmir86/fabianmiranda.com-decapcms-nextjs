import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import styles from './NetworkBackground.module.scss';

const NetworkBackground = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Scene Setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        
        const container = containerRef.current;
        const containerWidth = container.clientWidth || window.innerWidth;
        const containerHeight = container.clientHeight || window.innerHeight;

        renderer.setSize(containerWidth, containerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        // Particles
        const particlesCount = 350; // Increased count for depth (was 150)
        const positions = new Float32Array(particlesCount * 3);
        const velocities = new Float32Array(particlesCount * 3);
        const sizes = new Float32Array(particlesCount); // New attribute for variable sizes
        const opacities = new Float32Array(particlesCount); // New attribute for depth-based opacity
        // Store base colors per particle so they persist
        const baseColors = new Float32Array(particlesCount * 3);
        const introDelays = new Float32Array(particlesCount); // Delay before appearing
        const currentOpacities = new Float32Array(particlesCount); // Current fade-in state (0 to 1)

        const spawnAreaX = 14; // Wider spread
        const spawnAreaY = 10;
        const spawnAreaZ = 12; // Much deeper field (was 4 or constrained)

        const colorCyan = new THREE.Color(0x26d6fc);
        const colorMagenta = new THREE.Color(0xd648d0);

        for (let i = 0; i < particlesCount; i++) {
            const i3 = i * 3;
            // Spawn in a deeper volume
            // Z ranges from roughly -6 to +6 (camera at +5)
            // But we want "deep" to mean negative Z (further away)
            positions[i3] = (Math.random() - 0.5) * spawnAreaX;
            positions[i3+1] = (Math.random() - 0.5) * spawnAreaY;
            positions[i3+2] = (Math.random() - 0.5) * spawnAreaZ - 2; // Shifted back slightly

            velocities[i3] = (Math.random() - 0.5) * 0.01;
            velocities[i3+1] = (Math.random() - 0.5) * 0.01;
            velocities[i3+2] = (Math.random() - 0.5) * 0.01;
            
            // Randomly assign Cyan or Magenta
            // 20% Magenta
            const isMagenta = Math.random() > 0.8;
            const color = isMagenta ? colorMagenta : colorCyan;
            
            baseColors[i3] = color.r;
            baseColors[i3+1] = color.g;
            baseColors[i3+2] = color.b;
            
            // Calculate depth factor (0 to 1)
            // Near camera (~5) vs Far (-10)
            // Let's normalize Z for sizing logic
            const z = positions[i3+2];
            // Normalize Z between -8 and 4 roughly
            // Higher Z (closer to camera) -> Larger size, higher opacity
            // Lower Z (far away) -> Smaller size, lower opacity
            
            // Simple depth cue:
            // If z is close to 4 (front), size = 1.0
            // If z is -8 (back), size = 0.3
            const depthFactor = (z + 8) / 12; // Normalize roughly 0..1
            const clampedDepth = Math.max(0.2, Math.min(1.0, depthFactor));
            
            sizes[i] = clampedDepth; // We'll use this in a custom shader or size attribute
            opacities[i] = clampedDepth * 0.8 + 0.2; // Base opacity never below 0.2

            // Intro Animation Setup
            introDelays[i] = Math.random() * 2000; // Random delay between 0ms and 2000ms
            currentOpacities[i] = 0.0; // Start invisible
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        // We need to pass size/opacity to the material. 
        // Standard PointsMaterial size is uniform. To vary size per particle, we need a custom shader or a clever hack.
        // Hack: The standard PointsMaterial DOES attenuate size by distance if sizeAttenuation is true (default).
        // So distant particles automatically look smaller.
        // BUT for opacity fading, we need vertex colors or a custom shader.
        
        // Let's use vertexColors to handle opacity fade for particles too.
        // We'll bake opacity into the alpha channel of the color attribute (if supported) or darken the color.
        const colors = new Float32Array(particlesCount * 3);
        
        for(let i=0; i<particlesCount; i++) {
            const opacity = opacities[i];
            const i3 = i * 3;
            // Apply base color tinted by opacity/depth
            // White texture * Vertex Color = Tinted Output
            // So if baseColors[i] is Cyan, output is Cyan.
            // If we darken it (multiply by opacity), it fades.
            
            colors[i3] = baseColors[i3] * opacity;     // R
            colors[i3+1] = baseColors[i3+1] * opacity;   // G
            colors[i3+2] = baseColors[i3+2] * opacity;   // B
        }
        
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        // Create a WHITE soft glowing circle texture
        // This allows us to tint it with vertexColors (Cyan or Magenta)
        const getGlowTexture = () => {
            const canvas = document.createElement('canvas');
            const size = 64;
            canvas.width = size;
            canvas.height = size;
            const ctx = canvas.getContext('2d');
            const center = size / 2;
            const gradient = ctx.createRadialGradient(center, center, 0, center, center, center);
            
            // Core (bright white)
            gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
            // Glow (white - tintable)
            gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.8)');
            // Fade out
            gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.2)');
            gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
            
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, size, size);
            
            return new THREE.CanvasTexture(canvas);
        };

        const material = new THREE.PointsMaterial({
            size: 0.35, // Base size
            map: getGlowTexture(),
            transparent: true,
            opacity: 1.0, 
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            depthTest: false, // Keep them on top of lines
            vertexColors: true // Enable vertex colors for TINTING + depth fading
        });

        const points = new THREE.Points(geometry, material);
        scene.add(points);

        // Lines Logic
        const lineGeometry = new THREE.BufferGeometry();
        const lineMaterial = new THREE.LineBasicMaterial({
            color: 0xffffff, // Use white base so vertex colors control the tint
            transparent: true,
            opacity: 0.4, // Maximum opacity
            blending: THREE.AdditiveBlending,
            vertexColors: true // Enable vertex colors for distance fade AND color mixing
        });
        const lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
        
        // Render Order: Lines first (0), then Points (1) so points are always on top
        lineMesh.renderOrder = 0;
        points.renderOrder = 1;
        
        scene.add(lineMesh); // Add lines
        // scene.add(points); // Points already added above, just ensuring order logic

        camera.position.z = 5;

        // Mouse interaction
        let mouseX = 0;
        let mouseY = 0;
        const handleMouseMove = (event) => {
            mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
            mouseY = -(event.clientY / window.innerHeight - 0.5) * 2;
        };
        window.addEventListener('mousemove', handleMouseMove);

        // Animation
        const startTime = performance.now();
        
        const animate = () => {
            requestAnimationFrame(animate);

            const currentTime = performance.now();
            const elapsed = currentTime - startTime;

            const posArray = geometry.attributes.position.array;
            const colorArray = geometry.attributes.color.array; // Access colors for update
            const linePositions = [];
            const lineColors = []; 
            const connectionsCount = new Int8Array(particlesCount); // Track connections per node

            for (let i = 0; i < particlesCount; i++) {
                const i3 = i * 3;

                // Handle Intro Fade-In
                // If delay passed, increment opacity
                if (elapsed > introDelays[i]) {
                    if (currentOpacities[i] < 1.0) {
                        currentOpacities[i] += 0.02; // Fade speed (approx 50 frames to full opacity)
                        if (currentOpacities[i] > 1.0) currentOpacities[i] = 1.0;
                    }
                }
                
                // If still invisible, skip movement processing to save some cycles? 
                // No, keep moving so they don't "pop" into existence frozen.
                
                // Gentle wandering
                velocities[i3] += (Math.random() - 0.5) * 0.0002;
                velocities[i3+1] += (Math.random() - 0.5) * 0.0002;
                velocities[i3+2] += (Math.random() - 0.5) * 0.0002;

                const maxSpeed = 0.005;
                const speed = Math.sqrt(velocities[i3]**2 + velocities[i3+1]**2 + velocities[i3+2]**2);
                if (speed > maxSpeed) {
                    const ratio = maxSpeed / speed;
                    velocities[i3] *= ratio;
                    velocities[i3+1] *= ratio;
                    velocities[i3+2] *= ratio;
                }

                posArray[i3] += velocities[i3];
                posArray[i3+1] += velocities[i3+1];
                posArray[i3+2] += velocities[i3+2];

                // Update Depth-based Opacity
                const z = posArray[i3+2];
                let depthFactor = (z + 8) / 12; 
                depthFactor = Math.max(0.2, Math.min(1.0, depthFactor)); // Clamp
                
                // Final Opacity = Depth Factor * Intro Fade Factor
                const finalOpacity = depthFactor * currentOpacities[i];

                // Update vertex color
                colorArray[i3] = baseColors[i3] * finalOpacity;     // R
                colorArray[i3+1] = baseColors[i3+1] * finalOpacity;   // G
                colorArray[i3+2] = baseColors[i3+2] * finalOpacity;   // B

                // Bounce off boundaries
                const rangeX = 14; 
                const rangeY = 10;
                const rangeZ = 6;  

                if (posArray[i3] > rangeX) velocities[i3] -= 0.001;
                else if (posArray[i3] < -rangeX) velocities[i3] += 0.001;
                
                if (posArray[i3+1] > rangeY) velocities[i3+1] -= 0.001;
                else if (posArray[i3+1] < -rangeY) velocities[i3+1] += 0.001;

                if (posArray[i3+2] > rangeZ) velocities[i3+2] -= 0.001;
                else if (posArray[i3+2] < -rangeZ) velocities[i3+2] += 0.001;

                // Line connection logic
                // Only process lines if this particle is visible enough
                if (currentOpacities[i] > 0.1) {
                    for (let j = i + 1; j < particlesCount; j++) {
                        // Skip if neighbor is not visible yet
                        if (currentOpacities[j] < 0.1) continue;

                        const j3 = j * 3;
                        const dx = posArray[i3] - posArray[j3];
                        const dy = posArray[i3+1] - posArray[j3+1];
                        const dz = posArray[i3+2] - posArray[j3+2];
                        const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);
                        
                        // Check connection limits
                        const maxConnections = 4;
                        // if (connectionsCount[i] >= maxConnections || connectionsCount[j] >= maxConnections) continue; // MOVED DOWN

                        const connectionDistance = 2.0; // DEFINED HERE NOW

                        if (dist < connectionDistance) {
                            // Check limits ONLY if within distance
                            // BUT... if we limit connections abruptly, they will pop in/out when a new "closer" node appears.
                            // To do this smoothly, we need to sort connections by distance and only draw the closest N.
                            // However, sorting 350*350 connections per frame is expensive.
                            
                            // Alternative: Simply reduce the connection distance slightly to naturally limit count?
                            // Or accept more connections but make distant ones much fainter.
                            
                            // Let's remove the hard limit for now to fix the popping issue,
                            // and instead rely on distance-based fade to keep it clean.
                            // The popping happens because a node moves slightly, becomes the "4th" connection,
                            // and instantly kicks out the previous 4th connection which disappears.
                            
                            // If we really want a limit, we have to fade out the excess connections, which is complex state.
                            // Let's REVERT the hard limit for smoothness.
                            
                            // if (connectionsCount[i] >= maxConnections || connectionsCount[j] >= maxConnections) continue;

                            // Use the already-calculated color intensity (which includes intro opacity)
                            // We can approximate intensity by checking one channel relative to base, 
                            // or just use our calculated finalOpacity vars if we stored them.
                            // Let's re-calculate or infer.
                            // Better: use the ratio of current color to base color? No, simpler:
                            
                            // Re-calculate neighbor's final opacity
                            const zJ = posArray[j3+2];
                            let depthFactorJ = (zJ + 8) / 12;
                            depthFactorJ = Math.max(0.2, Math.min(1.0, depthFactorJ));
                            const finalOpacityJ = depthFactorJ * currentOpacities[j];
                            
                            const combinedOpacity = Math.min(finalOpacity, finalOpacityJ);
                            
                            if (combinedOpacity > 0.2) { 
                                linePositions.push(posArray[i3], posArray[i3+1], posArray[i3+2]);
                                linePositions.push(posArray[j3], posArray[j3+1], posArray[j3+2]);
                                
                                const distAlpha = 1.0 - (dist / connectionDistance);
                                const finalAlpha = distAlpha * combinedOpacity;
                                const curvedAlpha = Math.pow(finalAlpha, 1.5); 

                                lineColors.push(baseColors[i3] * curvedAlpha, baseColors[i3+1] * curvedAlpha, baseColors[i3+2] * curvedAlpha);
                                lineColors.push(baseColors[j3] * curvedAlpha, baseColors[j3+1] * curvedAlpha, baseColors[j3+2] * curvedAlpha);
                                
                                // Increment counters
                                connectionsCount[i]++;
                                connectionsCount[j]++;
                            }
                        }
                    }
                }
            }

            geometry.attributes.position.needsUpdate = true;
            geometry.attributes.color.needsUpdate = true; // IMPORTANT: Tell Three.js colors changed
            
            lineGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(linePositions), 3));
            lineGeometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(lineColors), 3));

            // Subtle camera movement
            camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05;
            camera.position.y += (mouseY * 0.5 - camera.position.y) * 0.05;
            camera.lookAt(scene.position);

            renderer.render(scene, camera);
        };

        animate();

        // Resize handler
        const handleResize = () => {
            const w = container.clientWidth || window.innerWidth;
            const h = container.clientHeight || window.innerHeight;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
        };
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            if (containerRef.current) {
                containerRef.current.removeChild(renderer.domElement);
            }
            geometry.dispose();
            material.dispose();
            lineMaterial.dispose();
        };
    }, []);

    return <div ref={containerRef} className={styles.canvasContainer} />;
};

export default NetworkBackground;
