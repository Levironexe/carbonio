'use client'
import createGlobe from "cobe";
import { useEffect, useRef } from "react";

function Globe({ selectedCountry, marker }) {
  const canvasRef = useRef()
  const locationToAngles = (lat, long) => {
    return [Math.PI - ((long * Math.PI) / 180 - Math.PI / 2), (lat * Math.PI) / 180]
  }

  useEffect(() => {
    if (marker && Array.isArray(marker) && marker.length === 2) {
      focusRef.current = locationToAngles(marker[0], marker[1]);
    }
  }, [marker]);

  const focusRef = useRef([0, 0])
  useEffect(() => {
    let width = 0;
    let currentPhi = 0;
    let currentTheta = 0;
    const doublePi = Math.PI * 2;
    const onResize = () => canvasRef.current && (width = canvasRef.current.offsetWidth)
    window.addEventListener('resize', onResize)
    onResize()
    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.3,
      dark: 1,
      diffuse: 3,
      mapSamples: 32000,
      mapBrightness: 1.2,
      baseColor: [1, 1, 1],
      markerColor: [126 / 255, 34 / 255, 206 / 255], // purple-700      
      glowColor: [203 / 255, 147 / 255, 255 / 255],
      markers: marker ? [{ location: marker, size: 0.1 }] : [],
      onRender: (state) => {
        state.phi = currentPhi
        state.theta = currentTheta
        const [focusPhi, focusTheta] = focusRef.current
        const distPositive = (focusPhi - currentPhi + doublePi) % doublePi
        const distNegative = (currentPhi - focusPhi + doublePi) % doublePi
        // Control the speed
        if (distPositive < distNegative) {
          currentPhi += distPositive * 0.08
        } else {
          currentPhi -= distNegative * 0.08
        }
        currentTheta = currentTheta * 0.92 + focusTheta * 0.08
        state.width = width * 2
        state.height = width * 2
      }
    })
    setTimeout(() => canvasRef.current.style.opacity = '1')
    return () => { 
      globe.destroy();
      window.removeEventListener('resize', onResize);
    }
  }, [marker])
  return <div style={{
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
        opacity: 0,
        transition: 'opacity 1s ease',
      }}
    />
    <div className="flex flex-col md:flex-row justify-center items-center control-buttons text-white" style={{ gap: '.5rem' }}>
      {
    selectedCountry === "US" 
      ? focusRef.current = locationToAngles(37.78, -122.412) 
      : selectedCountry === "CN" 
        ? focusRef.current = locationToAngles(39.9042, 116.4074) // Beijing
        : selectedCountry === "IN" 
          ? focusRef.current = locationToAngles(28.6139, 77.2090) // New Delhi
          : selectedCountry === "RU" 
            ? focusRef.current = locationToAngles(55.7558, 37.6173) // Moscow
            : selectedCountry === "JP" 
              ? focusRef.current = locationToAngles(35.6762, 139.6503) // Tokyo
              : focusRef.current = locationToAngles(0, 0) // Default to center
  } 
    </div>
  </div>
  // const countryCoordinates = {
  //   'US': [37.0902, -95.7129],  // United States
  //   'CN': [35.8617, 104.1954],  // China
  //   'IN': [20.5937, 78.9629],   // India
  //   'RU': [61.5240, 105.3188],  // Russia
  //   'JP': [36.2048, 138.2529],  // Japan
  //   'DE': [51.1657, 10.4515],   // Germany
  //   'GB': [55.3781, -3.4360],   // United Kingdom
  //   'FR': [46.2276, 2.2137],    // France
  //   'BR': [-14.2350, -51.9253], // Brazil
  //   'CA': [56.1304, -106.3468], // Canada
  // };
}

export default Globe