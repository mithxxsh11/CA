import React, { useEffect, useRef, useState, useCallback } from 'react'
import * as THREE from 'three'

interface StudioMic3DProps {
  className?: string
}

const INSPIRATIONAL_QUOTES = [
  'Where Excellence Meets Expression! ✨',
  'Speak with Clarity & Confidence! 🎤',
  'Your Voice Has Power! 🎙️',
  'Unleash Your True Potential! 🌟',
  "Welcome to Chandni's Academy! 👋",
  'Confidence Looks Good On You! 💫',
  'Step into the Spotlight! 🚀',
  'Lead with Purpose & Impact! 🎯',
]

/**
 * Procedural metallic mesh texture for the condenser microphone grille
 */
function createGrilleTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 128
  canvas.height = 128
  const ctx = canvas.getContext('2d')
  if (!ctx) return new THREE.CanvasTexture(canvas)

  // Dark acoustic foam backdrop
  ctx.fillStyle = '#0c1017'
  ctx.fillRect(0, 0, 128, 128)

  // Metallic woven wire mesh criss-cross pattern
  ctx.strokeStyle = '#d8c29b'
  ctx.lineWidth = 1.6
  ctx.globalAlpha = 0.85

  for (let i = -128; i <= 256; i += 6) {
    ctx.beginPath()
    ctx.moveTo(i, 0)
    ctx.lineTo(i + 128, 128)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(i, 128)
    ctx.lineTo(i + 128, 0)
    ctx.stroke()
  }

  // Cross-wire specular highlights
  ctx.strokeStyle = '#ffffff'
  ctx.lineWidth = 0.8
  ctx.globalAlpha = 0.4
  for (let i = -128; i <= 256; i += 12) {
    ctx.beginPath()
    ctx.moveTo(i, 0)
    ctx.lineTo(i + 128, 128)
    ctx.stroke()
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(8, 8)
  return texture
}

export const StudioMic3D: React.FC<StudioMic3DProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const [speechQuote, setSpeechQuote] = useState<string | null>(null)
  const [isTapRippling, setIsTapRippling] = useState(false)
  const quoteTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Animation & tracking state refs
  const mousePosRef = useRef({ x: 0, y: 0 })
  const isInteractingRef = useRef(false)
  const lastMoveTimeRef = useRef(Date.now())
  const tapNodRef = useRef(0)
  const tapVelocityRef = useRef(0)

  // Handle tap / click
  const handleInteraction = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation()

    // Trigger physical tap nod
    tapVelocityRef.current = -0.35
    setIsTapRippling(true)
    setTimeout(() => setIsTapRippling(false), 1200)

    // Show inspirational speech bubble
    const quote =
      INSPIRATIONAL_QUOTES[
        Math.floor(Math.random() * INSPIRATIONAL_QUOTES.length)
      ]
    setSpeechQuote(quote)

    if (quoteTimerRef.current) clearTimeout(quoteTimerRef.current)
    quoteTimerRef.current = setTimeout(() => {
      setSpeechQuote(null)
    }, 2800)
  }, [])

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return

    // 1. Scene setup
    const scene = new THREE.Scene()

    // 2. Camera setup with realistic perspective
    const width = container.clientWidth || 380
    const height = container.clientHeight || 380
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100)
    camera.position.set(0, 0.3, 7.8)

    // 3. High-performance WebGL Renderer with antialiasing and alpha
    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      })
    } catch {
      return
    }

    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.15

    // 4. Studio Lighting System (Key, Fill, Rim, Ambient)
    const ambientLight = new THREE.AmbientLight(0xf7efe6, 0.95)
    scene.add(ambientLight)

    // Primary Key Light (soft white from top-right)
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2)
    keyLight.position.set(5, 7, 6)
    scene.add(keyLight)

    // Warm Fill Light (champagne/gold from lower-left)
    const fillLight = new THREE.DirectionalLight(0xd8c29b, 1.2)
    fillLight.position.set(-5, 2, 4)
    scene.add(fillLight)

    // Rim Light (sharp specular edge from behind to pop against dark podium)
    const rimLight = new THREE.PointLight(0xffffff, 3.5, 20)
    rimLight.position.set(0, 4, -4)
    scene.add(rimLight)

    // Subtle Front Bottom Accent
    const accentLight = new THREE.PointLight(0xf3a12b, 0.8, 10)
    accentLight.position.set(0, -3, 3)
    scene.add(accentLight)

    // 5. Materials
    const grilleTexture = createGrilleTexture()

    // Brushed Metallic Body Material (Deep Graphite / Obsidian)
    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: 0x121a29,
      metalness: 0.88,
      roughness: 0.24,
    })

    // Champagne Gold Accent Rings / Details
    const goldAccentMaterial = new THREE.MeshStandardMaterial({
      color: 0xd8c29b,
      metalness: 0.94,
      roughness: 0.18,
    })

    // Chrome Highlights / Screws
    const chromeMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.98,
      roughness: 0.12,
    })

    // Metallic Grille Mesh Material
    const grilleMaterial = new THREE.MeshStandardMaterial({
      color: 0xd8c29b,
      metalness: 0.92,
      roughness: 0.28,
      bumpMap: grilleTexture,
      bumpScale: 0.05,
    })

    // Inner Dark Acoustic Shield
    const innerFoamMaterial = new THREE.MeshStandardMaterial({
      color: 0x070b12,
      roughness: 0.9,
      metalness: 0.1,
    })

    // Cast Iron Stand Base Material
    const standMaterial = new THREE.MeshStandardMaterial({
      color: 0x0f1724,
      metalness: 0.85,
      roughness: 0.32,
    })

    // Active Live Red LED indicator
    const ledMaterial = new THREE.MeshBasicMaterial({
      color: 0xea384c,
    })

    // 6. 3D Model Hierarchy
    // Root group
    const rootGroup = new THREE.Group()
    scene.add(rootGroup)
    rootGroup.position.set(0, -0.15, 0)

    // Base & Stand Group (Anchored in place)
    const baseGroup = new THREE.Group()
    rootGroup.add(baseGroup)

    // Weighted Round Studio Base Plate
    const basePlateGeo = new THREE.CylinderGeometry(1.5, 1.65, 0.22, 48)
    const basePlate = new THREE.Mesh(basePlateGeo, standMaterial)
    basePlate.position.y = -2.6
    baseGroup.add(basePlate)

    // Base Chamfer Gold Ring
    const baseRingGeo = new THREE.TorusGeometry(1.52, 0.04, 16, 48)
    const baseRing = new THREE.Mesh(baseRingGeo, goldAccentMaterial)
    baseRing.rotation.x = Math.PI / 2
    baseRing.position.y = -2.5
    baseGroup.add(baseRing)

    // Heavy Lower Stand Stem Collar
    const collarGeo = new THREE.CylinderGeometry(0.35, 0.45, 0.28, 32)
    const collar = new THREE.Mesh(collarGeo, goldAccentMaterial)
    collar.position.y = -2.38
    baseGroup.add(collar)

    // Vertical Stand Telescopic Riser
    const stemGeo = new THREE.CylinderGeometry(0.14, 0.14, 1.8, 32)
    const stem = new THREE.Mesh(stemGeo, bodyMaterial)
    stem.position.y = -1.45
    baseGroup.add(stem)

    // Clutch Adjustment Ring
    const clutchGeo = new THREE.CylinderGeometry(0.22, 0.22, 0.22, 24)
    const clutch = new THREE.Mesh(clutchGeo, goldAccentMaterial)
    clutch.position.y = -1.35
    baseGroup.add(clutch)

    // Swivel Joint Base / Yoke Mount Collar
    const yokeBaseGeo = new THREE.CylinderGeometry(0.24, 0.2, 0.35, 24)
    const yokeBase = new THREE.Mesh(yokeBaseGeo, standMaterial)
    yokeBase.position.y = -0.45
    baseGroup.add(yokeBase)

    // Professional U-Shaped Shockmount Cradle (held stationary on the stand)
    const cradleGroup = new THREE.Group()
    cradleGroup.position.y = 0.05
    baseGroup.add(cradleGroup)

    const cradleRingGeo = new THREE.TorusGeometry(1.05, 0.06, 16, 48)
    const cradleRing = new THREE.Mesh(cradleRingGeo, goldAccentMaterial)
    cradleRing.rotation.x = Math.PI / 2
    cradleGroup.add(cradleRing)

    // Swivel Knurled Thumbscrews on sides
    const screwGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.2, 16)
    const screwL = new THREE.Mesh(screwGeo, chromeMaterial)
    screwL.rotation.z = Math.PI / 2
    screwL.position.set(-1.08, 0, 0)
    cradleGroup.add(screwL)

    const screwR = new THREE.Mesh(screwGeo, chromeMaterial)
    screwR.rotation.z = Math.PI / 2
    screwR.position.set(1.08, 0, 0)
    cradleGroup.add(screwR)

    // 7. MICROPHONE PIVOT GROUP (The actual rotating 3D microphone capsule!)
    // This pivots horizontally (yaw) and vertically (tilt) towards the cursor!
    const micPivotGroup = new THREE.Group()
    micPivotGroup.position.set(0, 0.05, 0)
    rootGroup.add(micPivotGroup)

    // Microphone Capsule Assembly
    const capsuleAssembly = new THREE.Group()
    micPivotGroup.add(capsuleAssembly)

    // Lower Cylindrical Body
    const micBodyGeo = new THREE.CylinderGeometry(0.68, 0.65, 1.35, 36)
    const micBody = new THREE.Mesh(micBodyGeo, bodyMaterial)
    micBody.position.y = -0.45
    capsuleAssembly.add(micBody)

    // Lower Taper to XLR Connector
    const taperGeo = new THREE.CylinderGeometry(0.65, 0.42, 0.38, 32)
    const taper = new THREE.Mesh(taperGeo, goldAccentMaterial)
    taper.position.y = -1.25
    capsuleAssembly.add(taper)

    // XLR Plug Base
    const xlrGeo = new THREE.CylinderGeometry(0.32, 0.32, 0.25, 24)
    const xlr = new THREE.Mesh(xlrGeo, standMaterial)
    xlr.position.y = -1.5
    capsuleAssembly.add(xlr)

    // Front Brand Badge / Emblem Plate ("CHANDNI'S ACADEMY" studio badge)
    const badgeGeo = new THREE.CylinderGeometry(0.7, 0.7, 0.32, 32, 1, false, -0.6, 1.2)
    const badge = new THREE.Mesh(badgeGeo, goldAccentMaterial)
    badge.position.y = -0.42
    capsuleAssembly.add(badge)

    // Tiny Broadcast Studio LED (glowing red dot on badge)
    const ledGeo = new THREE.SphereGeometry(0.045, 16, 16)
    const led = new THREE.Mesh(ledGeo, ledMaterial)
    led.position.set(0, -0.32, 0.71)
    capsuleAssembly.add(led)

    // Center Gold Accent Ring between body and grille
    const midRingGeo = new THREE.CylinderGeometry(0.72, 0.72, 0.1, 36)
    const midRing = new THREE.Mesh(midRingGeo, goldAccentMaterial)
    midRing.position.y = 0.25
    capsuleAssembly.add(midRing)

    // Internal Acoustic Diaphragm Core
    const innerCoreGeo = new THREE.CylinderGeometry(0.48, 0.48, 1.25, 24)
    const innerCore = new THREE.Mesh(innerCoreGeo, innerFoamMaterial)
    innerCore.position.y = 0.95
    capsuleAssembly.add(innerCore)

    // Cylindrical Grille Mesh Section
    const grilleCylinderGeo = new THREE.CylinderGeometry(0.68, 0.68, 1.15, 36)
    const grilleCylinder = new THREE.Mesh(grilleCylinderGeo, grilleMaterial)
    grilleCylinder.position.y = 0.88
    capsuleAssembly.add(grilleCylinder)

    // Top Grille Dome (Hemispherical Cap)
    const grilleDomeGeo = new THREE.SphereGeometry(
      0.68,
      36,
      24,
      0,
      Math.PI * 2,
      0,
      Math.PI / 2
    )
    const grilleDome = new THREE.Mesh(grilleDomeGeo, grilleMaterial)
    grilleDome.position.y = 1.45
    capsuleAssembly.add(grilleDome)

    // Grille Metallic Rib Arch (Front to Back)
    const archRibGeo = new THREE.TorusGeometry(0.69, 0.035, 16, 36, Math.PI)
    const archRib = new THREE.Mesh(archRibGeo, goldAccentMaterial)
    archRib.position.y = 1.45
    archRib.rotation.y = Math.PI / 2
    capsuleAssembly.add(archRib)

    // Grille Metallic Rib Arch (Left to Right)
    const archRib2 = new THREE.Mesh(archRibGeo, goldAccentMaterial)
    archRib2.position.y = 1.45
    capsuleAssembly.add(archRib2)

    // Vertical Front Spine Rib
    const spineGeo = new THREE.CylinderGeometry(0.035, 0.035, 1.15, 16)
    const spineFront = new THREE.Mesh(spineGeo, chromeMaterial)
    spineFront.position.set(0, 0.88, 0.69)
    capsuleAssembly.add(spineFront)

    const spineBack = new THREE.Mesh(spineGeo, chromeMaterial)
    spineBack.position.set(0, 0.88, -0.69)
    capsuleAssembly.add(spineBack)

    // 8. Event Listeners for Cursor and Touch Tracking
    const updatePointer = (clientX: number, clientY: number) => {
      const rect = container.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      // Normalized coordinates relative to the microphone center
      // Range: -1 to +1 (with extended reach across the viewport)
      const maxSpanX = window.innerWidth * 0.55
      const maxSpanY = window.innerHeight * 0.55

      const normX = Math.max(-1.3, Math.min(1.3, (clientX - centerX) / maxSpanX))
      const normY = Math.max(-1.3, Math.min(1.3, (clientY - centerY) / maxSpanY))

      mousePosRef.current = { x: normX, y: normY }
      isInteractingRef.current = true
      lastMoveTimeRef.current = Date.now()
    }

    const onMouseMove = (e: MouseEvent) => {
      updatePointer(e.clientX, e.clientY)
    }

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        updatePointer(e.touches[0].clientX, e.touches[0].clientY)
      }
    }

    const onPointerLeave = () => {
      isInteractingRef.current = false
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    window.addEventListener('touchstart', onTouchMove, { passive: true })
    document.addEventListener('mouseleave', onPointerLeave)

    // 9. Resize Observer for fluid responsiveness
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = entry.contentRect.width
        const h = entry.contentRect.height
        if (w > 0 && h > 0) {
          camera.aspect = w / h
          camera.updateProjectionMatrix()
          renderer.setSize(w, h)
        }
      }
    })
    resizeObserver.observe(container)

    // 10. High-Precision Render Loop with Delta-Time Physics
    const clock = new THREE.Clock()
    let currentYaw = 0
    let currentPitch = 0
    let currentRoll = 0
    let animId: number

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    const renderLoop = () => {
      animId = requestAnimationFrame(renderLoop)

      const delta = Math.min(clock.getDelta(), 0.1)
      const elapsedTime = clock.getElapsedTime()

      // Physical tap spring damping
      tapVelocityRef.current += -tapNodRef.current * 32.0 * delta
      tapVelocityRef.current *= Math.pow(0.85, delta * 60)
      tapNodRef.current += tapVelocityRef.current * delta

      // Target calculations
      let targetYaw = 0
      let targetPitch = 0
      let targetRoll = 0

      const idleDuration = Date.now() - lastMoveTimeRef.current
      const isIdle = idleDuration > 2200 || !isInteractingRef.current

      if (prefersReducedMotion) {
        targetYaw = 0
        targetPitch = 0
      } else if (!isIdle) {
        // Active cursor tracking:
        // Left/Right: Yaw (Y-axis) rotates left/right
        // Maximum rotation: +/- 52 degrees (+/- 0.90 rad)
        targetYaw = mousePosRef.current.x * 0.9

        // Up/Down: Pitch (X-axis) tilts up/down
        // When cursor is above, mic tilts UP (negative X in Three.js); when below, tilts DOWN (positive X)
        // Limits: -0.45 rad (up) to +0.55 rad (down)
        targetPitch = mousePosRef.current.y * 0.65

        // Subtle organic banking roll on horizontal sweep
        targetRoll = -mousePosRef.current.x * 0.12
      } else {
        // Organic studio idle breathing: subtle poise waiting for speaker
        const idleWave = Math.sin(elapsedTime * 0.9)
        const idleWave2 = Math.cos(elapsedTime * 0.65)
        targetYaw = idleWave * 0.05
        targetPitch = idleWave2 * 0.035
        targetRoll = idleWave * 0.015
      }

      // Smooth delta-time damping (eases smoothly into position without snapping)
      const dampingFactor = Math.min(1.0, delta * 7.5)
      currentYaw += (targetYaw - currentYaw) * dampingFactor
      currentPitch += (targetPitch - currentPitch) * dampingFactor
      currentRoll += (targetRoll - currentRoll) * dampingFactor

      // Apply rotations to microphone head & capsule
      // Incorporate physical tap bounce on pitch
      micPivotGroup.rotation.y = currentYaw
      micPivotGroup.rotation.x = currentPitch + tapNodRef.current
      micPivotGroup.rotation.z = currentRoll

      // Subtle base reaction (slight micro-flex giving realistic mechanical groundedness)
      baseGroup.rotation.y = currentYaw * 0.08
      baseGroup.rotation.x = currentPitch * 0.04

      // Gentle LED pulse
      ledMaterial.color.setRGB(
        0.9 + Math.sin(elapsedTime * 3) * 0.1,
        0.1,
        0.15
      )

      renderer.render(scene, camera)
    }

    renderLoop()

    // 11. Comprehensive Memory & Resource Cleanup
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchstart', onTouchMove)
      document.removeEventListener('mouseleave', onPointerLeave)
      resizeObserver.disconnect()

      if (quoteTimerRef.current) clearTimeout(quoteTimerRef.current)

      // Dispose geometries
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose()
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose())
          } else {
            obj.material.dispose()
          }
        }
      })

      grilleTexture.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 select-none w-52 h-52 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 ${className}`}
    >
      {/* Floating Motivational Quote Bubble on Tap */}
      {speechQuote && (
        <div className="absolute -top-12 sm:-top-16 left-1/2 -translate-x-1/2 z-30 pointer-events-none whitespace-nowrap transition-all duration-300">
          <div className="bg-[#101d35] text-[#d8c29b] border-2 border-[#d8c29b] font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider px-3.5 sm:px-4 py-1.5 rounded-full shadow-2xl flex items-center gap-2 animate-bounce">
            <span className="w-2 h-2 rounded-full bg-[#ea384c] animate-pulse" />
            <span>{speechQuote}</span>
          </div>
          <div className="w-2.5 h-2.5 bg-[#101d35] border-r-2 border-b-2 border-[#d8c29b] rotate-45 mx-auto -mt-1.5" />
        </div>
      )}

      {/* Acoustic Stage Podium Outer Container */}
      <div
        ref={containerRef}
        onClick={handleInteraction}
        className="relative w-full h-full rounded-full cursor-pointer overflow-hidden bg-[#101d35] border-4 border-[#d8c29b]/40 shadow-[0_25px_70px_-15px_rgba(16,29,53,0.7)] group transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]"
        role="button"
        tabIndex={0}
        aria-label="Interactive 3D Studio Microphone. Move cursor to direct the mic, tap for feedback."
      >
        {/* Acoustic Studio Radial Backdrop */}
        <div className="absolute inset-0 pointer-events-none rounded-full bg-[radial-gradient(circle_at_center,rgba(216,194,155,0.22)_0,rgba(16,29,53,0.96)_70%)]" />

        {/* Concentric Gold Soundwave Stage Markings */}
        <div className="absolute inset-4 rounded-full border border-dashed border-[#d8c29b]/25 pointer-events-none" />
        <div className="absolute inset-10 rounded-full border border-[#d8c29b]/15 pointer-events-none" />

        {/* Glass Reflection Sheen */}
        <div className="absolute inset-0 pointer-events-none rounded-full bg-gradient-to-tr from-white/0 via-white/5 to-white/18 mix-blend-overlay" />

        {/* "ON AIR" Live Studio Indicator Badge at Top */}
        <div className="absolute top-3 sm:top-5 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/50 border border-white/15 backdrop-blur-md pointer-events-none shadow-lg">
          <span className="w-2 h-2 rounded-full bg-[#ea384c] animate-pulse shadow-[0_0_8px_#ea384c]" />
          <span className="font-mono text-[8px] sm:text-[9.5px] uppercase tracking-[0.22em] font-bold text-[#d8c29b]">
            ON AIR • STUDIO 1
          </span>
        </div>

        {/* Dynamic Soundwave Tap Ripples */}
        {isTapRippling && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <span className="w-28 h-28 rounded-full border-2 border-[#d8c29b] animate-ping opacity-75" />
            <span className="w-44 h-44 rounded-full border border-[#bfff0a] animate-pulse opacity-50" />
          </div>
        )}

        {/* Primary Three.js 3D WebGL Canvas */}
        <canvas
          ref={canvasRef}
          className="w-full h-full block relative z-0 touch-none"
        />

        {/* Bottom Interactive Cursor Indicator */}
        <div className="absolute bottom-2.5 sm:bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 font-mono text-[8px] sm:text-[9px] tracking-widest uppercase text-[#d8c29b]/80 pointer-events-none">
          <span className="text-[#bfff0a]">●</span>
          <span>FOLLOWING CURSOR</span>
        </div>
      </div>
    </div>
  )
}
