import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { useRobot } from '../lib/robot'

/* Check WebGL capability */
function hasWebGL(): boolean {
  if (typeof window === 'undefined') return false
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl') || c.getContext('experimental-webgl'))
  } catch {
    return false
  }
}

export function Robot3D() {
  const { state } = useRobot()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [supported, setSupported] = useState(true)

  const robotRef = useRef<{
    renderer: THREE.WebGLRenderer
    scene: THREE.Scene
    camera: THREE.PerspectiveCamera
    robotGroup: THREE.Group
    headGroup: THREE.Group
    leftEye: THREE.Mesh
    rightEye: THREE.Mesh
    chestEmblem: THREE.Mesh
    soundRings: THREE.Mesh[]
    orbitLines: THREE.Line[]
    speechSprite: THREE.Sprite
    screenMat: THREE.MeshStandardMaterial
    eyeMat: THREE.MeshStandardMaterial
    rafId: number
    mouse: { x: number; y: number }
    targetRotation: { x: number; y: number }
  } | null>(null)

  useEffect(() => {
    if (!hasWebGL()) {
      setSupported(false)
      return
    }

    const canvas = canvasRef.current
    if (!canvas) return

    let isDisposed = false

    // 1. Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(canvas.clientWidth, canvas.clientHeight)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.15
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap

    // 2. Scene
    const scene = new THREE.Scene()

    // 3. Camera
    const camera = new THREE.PerspectiveCamera(
      36,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      100
    )
    camera.position.set(0, 1.1, 5.2)

    // 4. Lighting
    const hemiLight = new THREE.HemisphereLight(0xfff7ed, 0x101d35, 1.2)
    scene.add(hemiLight)

    const keyLight = new THREE.DirectionalLight(0xfff5e4, 2.4)
    keyLight.position.set(3.5, 5, 4.5)
    keyLight.castShadow = true
    keyLight.shadow.mapSize.width = 1024
    keyLight.shadow.mapSize.height = 1024
    keyLight.shadow.bias = -0.0005
    scene.add(keyLight)

    const fillLight = new THREE.DirectionalLight(0xdbe6f7, 0.7)
    fillLight.position.set(-3.5, -0.5, 3)
    scene.add(fillLight)

    const rimLight = new THREE.DirectionalLight(0xf06b83, 0.9)
    rimLight.position.set(0, 4, -4)
    scene.add(rimLight)

    // Face point light (warm champagne glow)
    const faceLight = new THREE.PointLight(0xd8c29b, 1.8, 4)
    faceLight.position.set(0, 2.2, 1.6)
    scene.add(faceLight)

    // 5. Materials
    // Ceramic white glossy shell
    const ceramicMat = new THREE.MeshPhysicalMaterial({
      color: 0xf6f4ee,
      metalness: 0.05,
      roughness: 0.22,
      clearcoat: 0.85,
      clearcoatRoughness: 0.12,
      reflectivity: 0.8,
    })

    // Dark charcoal joint/pedestal material
    const jointMat = new THREE.MeshStandardMaterial({
      color: 0x1c1e22,
      metalness: 0.75,
      roughness: 0.35,
    })

    // Face visor screen
    const screenMat = new THREE.MeshStandardMaterial({
      color: 0x090a0d,
      roughness: 0.15,
      metalness: 0.8,
    })

    // Glowing champagne eyes
    const eyeMat = new THREE.MeshStandardMaterial({
      color: 0xd8c29b,
      emissive: 0xd8c29b,
      emissiveIntensity: 1.6,
      roughness: 0.2,
    })

    // Coral / champagne accent material
    const accentMat = new THREE.MeshStandardMaterial({
      color: 0xf06b83,
      emissive: 0xf06b83,
      emissiveIntensity: 0.6,
      roughness: 0.3,
    })

    // 6. Character Structure
    const robotGroup = new THREE.Group()
    scene.add(robotGroup)

    // Pedestal
    const pedestalGeo = new THREE.CylinderGeometry(0.85, 0.95, 0.18, 36)
    const pedestal = new THREE.Mesh(pedestalGeo, jointMat)
    pedestal.position.set(0, -1.05, 0)
    pedestal.receiveShadow = true
    robotGroup.add(pedestal)

    // Pedestal gold accent ring
    const pedRingGeo = new THREE.TorusGeometry(0.86, 0.015, 12, 48)
    const pedRing = new THREE.Mesh(pedRingGeo, eyeMat)
    pedRing.rotation.x = Math.PI / 2
    pedRing.position.set(0, -0.96, 0)
    robotGroup.add(pedRing)

    // Legs
    const legLeft = new THREE.Group()
    const legRight = new THREE.Group()

    const thighGeo = new THREE.CylinderGeometry(0.12, 0.1, 0.45, 16)
    const kneeGeo = new THREE.SphereGeometry(0.09, 14, 14)
    const shinGeo = new THREE.CylinderGeometry(0.09, 0.08, 0.42, 16)
    const footGeo = new THREE.BoxGeometry(0.15, 0.08, 0.26)

    // Left leg
    const thighL = new THREE.Mesh(thighGeo, ceramicMat)
    thighL.position.set(-0.25, -0.15, 0)
    const kneeL = new THREE.Mesh(kneeGeo, jointMat)
    kneeL.position.set(-0.25, -0.4, 0)
    const shinL = new THREE.Mesh(shinGeo, ceramicMat)
    shinL.position.set(-0.25, -0.63, 0)
    const footL = new THREE.Mesh(footGeo, jointMat)
    footL.position.set(-0.25, -0.88, 0.04)
    legLeft.add(thighL, kneeL, shinL, footL)

    // Right leg
    const thighR = new THREE.Mesh(thighGeo, ceramicMat)
    thighR.position.set(0.25, -0.15, 0)
    const kneeR = new THREE.Mesh(kneeGeo, jointMat)
    kneeR.position.set(0.25, -0.4, 0)
    const shinR = new THREE.Mesh(shinGeo, ceramicMat)
    shinR.position.set(0.25, -0.63, 0)
    const footR = new THREE.Mesh(footGeo, jointMat)
    footR.position.set(0.25, -0.88, 0.04)
    legRight.add(thighR, kneeR, shinR, footR)

    robotGroup.add(legLeft, legRight)

    // Pelvis / Hip Joint
    const pelvisGeo = new THREE.CylinderGeometry(0.3, 0.24, 0.16, 18)
    const pelvis = new THREE.Mesh(pelvisGeo, jointMat)
    pelvis.position.set(0, 0.08, 0)
    robotGroup.add(pelvis)

    // Torso Group
    const torsoGroup = new THREE.Group()
    robotGroup.add(torsoGroup)

    const torsoGeo = new THREE.BoxGeometry(0.72, 0.85, 0.48)
    const torso = new THREE.Mesh(torsoGeo, ceramicMat)
    torso.position.set(0, 0.58, 0)
    torso.castShadow = true
    torsoGroup.add(torso)

    // Chest Speech Emblem
    const chestGeo = new THREE.BoxGeometry(0.24, 0.07, 0.02)
    const chestEmblem = new THREE.Mesh(chestGeo, eyeMat)
    chestEmblem.position.set(0, 0.65, 0.25)
    torsoGroup.add(chestEmblem)

    // Subtle side accents
    const sideBarGeo = new THREE.BoxGeometry(0.03, 0.35, 0.1)
    const sideL = new THREE.Mesh(sideBarGeo, accentMat)
    sideL.position.set(-0.37, 0.58, 0)
    const sideR = new THREE.Mesh(sideBarGeo, accentMat)
    sideR.position.set(0.37, 0.58, 0)
    torsoGroup.add(sideL, sideR)

    // Shoulders & Arms
    const shoulderGeo = new THREE.SphereGeometry(0.12, 16, 16)
    const armGeo = new THREE.CylinderGeometry(0.09, 0.08, 0.4, 16)
    const elbowGeo = new THREE.SphereGeometry(0.08, 14, 14)
    const handGeo = new THREE.SphereGeometry(0.075, 12, 12)

    // Left arm
    const shL = new THREE.Mesh(shoulderGeo, jointMat)
    shL.position.set(-0.48, 0.88, 0)
    const armL = new THREE.Mesh(armGeo, ceramicMat)
    armL.position.set(-0.52, 0.62, 0)
    const elbL = new THREE.Mesh(elbowGeo, jointMat)
    elbL.position.set(-0.52, 0.38, 0)
    const handL = new THREE.Mesh(handGeo, jointMat)
    handL.position.set(-0.5, 0.15, 0.06)
    torsoGroup.add(shL, armL, elbL, handL)

    // Right arm
    const shR = new THREE.Mesh(shoulderGeo, jointMat)
    shR.position.set(0.48, 0.88, 0)
    const armR = new THREE.Mesh(armGeo, ceramicMat)
    armR.position.set(0.52, 0.62, 0)
    const elbR = new THREE.Mesh(elbowGeo, jointMat)
    elbR.position.set(0.52, 0.38, 0)
    const handR = new THREE.Mesh(handGeo, jointMat)
    handR.position.set(0.5, 0.15, 0.06)
    torsoGroup.add(shR, armR, elbR, handR)

    // Neck
    const neckGeo = new THREE.CylinderGeometry(0.13, 0.15, 0.18, 18)
    const neck = new THREE.Mesh(neckGeo, jointMat)
    neck.position.set(0, 1.08, 0)
    torsoGroup.add(neck)

    // Head Group
    const headGroup = new THREE.Group()
    headGroup.position.set(0, 1.5, 0)
    robotGroup.add(headGroup)

    // Head main rounded block
    const headGeo = new THREE.BoxGeometry(0.85, 0.76, 0.64)
    const headMesh = new THREE.Mesh(headGeo, ceramicMat)
    headMesh.castShadow = true
    headGroup.add(headMesh)

    // Visor screen
    const visorGeo = new THREE.BoxGeometry(0.68, 0.44, 0.02)
    const visor = new THREE.Mesh(visorGeo, screenMat)
    visor.position.set(0, 0.04, 0.33)
    headGroup.add(visor)

    // Visor frame border
    const frameGeo = new THREE.BoxGeometry(0.72, 0.48, 0.01)
    const frame = new THREE.Mesh(frameGeo, accentMat)
    frame.position.set(0, 0.04, 0.32)
    headGroup.add(frame)

    // Glowing Eyes
    const eyeGeo = new THREE.CapsuleGeometry(0.045, 0.06, 12, 16)
    const leftEye = new THREE.Mesh(eyeGeo, eyeMat)
    leftEye.rotation.z = Math.PI / 2
    leftEye.position.set(-0.16, 0.05, 0.35)

    const rightEye = new THREE.Mesh(eyeGeo, eyeMat)
    rightEye.rotation.z = Math.PI / 2
    rightEye.position.set(0.16, 0.05, 0.35)

    headGroup.add(leftEye, rightEye)

    // Sound-wave rings around the head (activated in Communicate pillar)
    const soundRings: THREE.Mesh[] = []
    ;[0.72, 0.95, 1.18].forEach((r) => {
      const ringGeo = new THREE.TorusGeometry(r, 0.012, 12, 64)
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xd8c29b,
        transparent: true,
        opacity: 0,
      })
      const ring = new THREE.Mesh(ringGeo, ringMat)
      ring.rotation.x = Math.PI / 2
      ring.position.set(0, 0.05, 0)
      headGroup.add(ring)
      soundRings.push(ring)
    })

    // Lead connection orbital lines
    const orbitLines: THREE.Line[] = []
    ;[1.3, 1.7].forEach((r, idx) => {
      const curve = new THREE.EllipseCurve(0, 0, r, r * 0.4, 0, 2 * Math.PI, false, 0)
      const points = curve.getPoints(64)
      const geo = new THREE.BufferGeometry().setFromPoints(
        points.map((p) => new THREE.Vector3(p.x, idx === 0 ? 0.3 : -0.2, p.y))
      )
      const mat = new THREE.LineBasicMaterial({
        color: 0xd8c29b,
        transparent: true,
        opacity: 0,
      })
      const line = new THREE.Line(geo, mat)
      line.rotation.x = Math.PI / 5
      robotGroup.add(line)
      orbitLines.push(line)
    })

    // Speech bubble sprite (renders "READY TO FIND YOUR VOICE?")
    const bubbleCanvas = document.createElement('canvas')
    bubbleCanvas.width = 380
    bubbleCanvas.height = 120
    const bctx = bubbleCanvas.getContext('2d')
    if (bctx) {
      bctx.fillStyle = '#FFFFFF'
      bctx.strokeStyle = '#D8C29B'
      bctx.lineWidth = 3
      bctx.beginPath()
      bctx.roundRect(10, 10, 360, 90, 12)
      bctx.fill()
      bctx.stroke()

      bctx.fillStyle = '#141414'
      bctx.font = 'bold 20px monospace'
      bctx.textAlign = 'center'
      bctx.fillText('READY TO FIND YOUR VOICE?', 190, 62)
    }
    const bubbleTex = new THREE.CanvasTexture(bubbleCanvas)
    const bubbleMat = new THREE.SpriteMaterial({
      map: bubbleTex,
      transparent: true,
      opacity: 0,
    })
    const speechSprite = new THREE.Sprite(bubbleMat)
    speechSprite.scale.set(1.5, 0.48, 1)
    speechSprite.position.set(0.65, 2.35, 0.2)
    scene.add(speechSprite)

    // Save references
    const stateObj = {
      renderer,
      scene,
      camera,
      robotGroup,
      headGroup,
      leftEye,
      rightEye,
      chestEmblem,
      soundRings,
      orbitLines,
      speechSprite,
      screenMat,
      eyeMat,
      rafId: 0,
      mouse: { x: 0, y: 0 },
      targetRotation: { x: 0, y: 0 },
    }
    robotRef.current = stateObj

    // 7. Mouse Parallax
    const onPointerMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2
      const ny = (e.clientY / window.innerHeight - 0.5) * 2
      stateObj.targetRotation.y = nx * 0.25
      stateObj.targetRotation.x = ny * 0.15
    }
    window.addEventListener('pointermove', onPointerMove, { passive: true })

    // 8. Resize Handler
    const onResize = () => {
      if (!canvas) return
      const w = window.innerWidth
      const h = window.innerHeight
      renderer.setSize(w, h)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    window.addEventListener('resize', onResize)
    onResize()

    // 9. Animation Loop
    let time = 0
    let blinkTimer = 0
    let isBlinking = false

    const animate = () => {
      if (isDisposed) return
      stateObj.rafId = requestAnimationFrame(animate)

      time += 0.016

      // Idle breathing float
      robotGroup.position.y = Math.sin(time * 1.8) * 0.04
      headGroup.rotation.z = Math.sin(time * 1.2) * 0.02

      // Smooth mouse follow
      robotGroup.rotation.y += (stateObj.targetRotation.y - robotGroup.rotation.y) * 0.06
      robotGroup.rotation.x += (stateObj.targetRotation.x - robotGroup.rotation.x) * 0.06

      // Eye blinking
      blinkTimer += 0.016
      if (blinkTimer > 3.4 && !isBlinking) {
        isBlinking = true
        leftEye.scale.y = 0.1
        rightEye.scale.y = 0.1
        setTimeout(() => {
          leftEye.scale.y = 1
          rightEye.scale.y = 1
          isBlinking = false
          blinkTimer = 0
        }, 120)
      }

      // Rotate orbital lines slowly
      orbitLines.forEach((line, idx) => {
        line.rotation.z += idx === 0 ? 0.005 : -0.007
      })

      renderer.render(scene, camera)
    }

    animate()

    // Pause on hidden
    const onVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(stateObj.rafId)
      } else {
        animate()
      }
    }
    document.addEventListener('visibilitychange', onVisibilityChange)

    return () => {
      isDisposed = true
      cancelAnimationFrame(stateObj.rafId)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      renderer.dispose()
      robotRef.current = null
    }
  }, [])

  // React to Chapter & Pillar State
  useEffect(() => {
    const r = robotRef.current
    if (!r) return

    const { chapter, activePillar, transformStage, showBubble } = state

    // 1. Camera & Position choreography per chapter
    const targetCam = { x: 0, y: 1.1, z: 5.2 }
    const targetRobotX = 0

    if (chapter === 1) {
      // Centered on pedestal, looking toward user and typing interface
      targetCam.x = 0.1
      targetCam.y = 1.05
      targetCam.z = 5.0
      r.headGroup.rotation.y = -0.12 // tilt toward left typing box
    } else if (chapter === 2) {
      // Moves slightly to the right to frame pillars on the left
      targetCam.x = -0.35
      targetCam.y = 0.95
      targetCam.z = 5.4
      r.headGroup.rotation.y = 0.05
    } else if (chapter === 3) {
      // Transformation: progressively more confident
      targetCam.x = 0.25
      targetCam.y = 0.85 + transformStage * 0.08
      targetCam.z = 4.8
      r.headGroup.rotation.y = -0.05
    } else if (chapter === 4) {
      // Beyond Words: close-up, dramatic
      targetCam.x = 0
      targetCam.y = 1.45
      targetCam.z = 3.9
      r.headGroup.rotation.y = 0
    } else if (chapter === 5) {
      // Connect: friendly, pulling back
      targetCam.x = 0
      targetCam.y = 1.05
      targetCam.z = 5.2
      r.headGroup.rotation.y = 0
    }

    // Smoothly set camera position
    r.camera.position.set(targetCam.x, targetCam.y, targetCam.z)
    r.robotGroup.position.x = targetRobotX

    // 2. Sound-waves on Communicate
    r.soundRings.forEach((ring) => {
      const mat = ring.material as THREE.MeshBasicMaterial
      mat.opacity = activePillar === 'communicate' ? 0.65 : 0
    })

    // 3. Orbit lines on Lead
    r.orbitLines.forEach((line) => {
      const mat = line.material as THREE.LineBasicMaterial
      mat.opacity = activePillar === 'lead' ? 0.6 : 0
    })

    // 4. Eyes & Visor color shift on Chapter 4 (Beyond Words)
    if (chapter === 4) {
      r.eyeMat.color.setHex(0xf06b83)
      r.eyeMat.emissive.setHex(0xf06b83)
      r.screenMat.color.setHex(0x101d35)
    } else {
      r.eyeMat.color.setHex(0xd8c29b)
      r.eyeMat.emissive.setHex(0xd8c29b)
      r.screenMat.color.setHex(0x090a0d)
    }

    // 5. Speech Bubble Visibility
    r.speechSprite.material.opacity = showBubble ? 0.95 : 0
  }, [state])

  if (!supported) {
    return (
      <div
        aria-hidden
        className="fixed inset-0 z-0 pointer-events-none flex items-center justify-center opacity-20"
      >
        <svg viewBox="0 0 200 300" className="w-64 h-96">
          <rect x="50" y="40" width="100" height="90" rx="16" fill="#D8C29B" />
          <rect x="65" y="60" width="70" height="40" rx="6" fill="#141414" />
          <circle cx="85" cy="80" r="5" fill="#D8C29B" />
          <circle cx="115" cy="80" r="5" fill="#D8C29B" />
          <rect x="60" y="145" width="80" height="95" rx="12" fill="#D8C29B" />
        </svg>
      </div>
    )
  }

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="fixed inset-0 z-0 pointer-events-none select-none h-full w-full"
    />
  )
}
