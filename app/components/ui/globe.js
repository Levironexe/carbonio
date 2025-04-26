'use client'
import createGlobe from "cobe";
import { useEffect, useRef } from "react";

function Globe({ selectedCountry, marker }) {
  const canvasRef = useRef();
  const focusRef = useRef([0, 0]);
  const phiRef = useRef(0);
  const thetaRef = useRef(0.3);
  
  // Convert latitude and longitude to angles
  const locationToAngles = (lat, long) => {
    return [Math.PI - ((long * Math.PI) / 180 - Math.PI / 2), (lat * Math.PI) / 180];
  };

  // Set initial focus based on marker
  useEffect(() => {
    if (marker && Array.isArray(marker) && marker.length === 2) {
      focusRef.current = locationToAngles(marker[0], marker[1]);
    }
  }, [marker]);
  
  // Initialize and manage the globe - recreate when markers change
  useEffect(() => {
    let width = 0;
    let currentPhi = phiRef.current;
    let currentTheta = thetaRef.current;
    const doublePi = Math.PI * 2;
    
    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth;
      }
    };
    
    window.addEventListener('resize', onResize);
    onResize();
    
    // Set focus based on marker
    if (marker && Array.isArray(marker) && marker.length === 2) {
      focusRef.current = locationToAngles(marker[0], marker[1]);
    }
    
    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: currentPhi,
      theta: currentTheta,
      dark: 1,
      diffuse: 3,
      mapSamples: 32000,
      mapBrightness: 1.2,
      baseColor: [1, 1, 1],
      markerColor: [126 / 255, 34 / 255, 206 / 255], // purple-700      
      glowColor: [203 / 255, 147 / 255, 255 / 255],
      markers: marker ? [{ location: marker, size: 0.1 }] : [],
      onRender: (state) => {
        // Save current position for recreation
        phiRef.current = currentPhi;
        thetaRef.current = currentTheta;
        
        // Update state with current position
        state.phi = currentPhi;
        state.theta = currentTheta;
        
        // Get target position
        const [focusPhi, focusTheta] = focusRef.current;
        
        // Calculate the shortest path for phi (longitude)
        const distPositive = (focusPhi - currentPhi + doublePi) % doublePi;
        const distNegative = (currentPhi - focusPhi + doublePi) % doublePi;
        
        // Control the rotation speed (smoother with smaller increments)
        if (distPositive < distNegative) {
          currentPhi += distPositive * 0.05;
        } else {
          currentPhi -= distNegative * 0.05;
        }
        
        // Smooth interpolation for theta (latitude)
        currentTheta = currentTheta * 0.95 + focusTheta * 0.05;
        
        // Update dimensions on each render
        state.width = width * 2;
        state.height = width * 2;
      }
    });
    
    // Make visible with a slight delay
    if (canvasRef.current) {
      canvasRef.current.style.opacity = '1';
    }
    
    return () => { 
      globe.destroy();
      window.removeEventListener('resize', onResize);
    };
  }, [marker]); // Recreate globe when marker changes
  
  return (
    <div style={{
      width: '100%',
      maxWidth: 600,
      aspectRatio: 1,
      margin: 'auto',
      position: 'relative',
    }}>
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          contain: 'layout paint size',
          opacity: 1, // Start visible to prevent flicker
          transition: 'opacity 0.5s ease',
        }}
      />
    </div>
  );
}

export default Globe;