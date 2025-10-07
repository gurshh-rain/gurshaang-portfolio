import * as THREE from "three";
import { vertexShader, fluidShader, displayShader } from "./shaders";

export default function runFluid(container) {
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

  // Render targets (ping-pong)
  let rt1 = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight);
  let rt2 = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight);

  // Uniforms
  const fluidUniforms = {
    iTime: { value: 0 },
    iResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    iMouse: { value: new THREE.Vector4(0, 0, 0, 0) },
    iFrame: { value: 0 },
    iPreviousFrame: { value: rt1.texture },
    uBrushSize: { value: 0.06 },
    uBrushStrength: { value: 25 },
    uFluidDecay: { value: 1 },
    uTrailLength: { value: 0.7 },
    uStopDecay: { value: 0.9 }
  };

  const displayUniforms = {
    iTime: { value: 0 },
    iResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    iFluid: { value: rt1.texture },
    uDistortionAmount: { value: 0.7 },
    uColor1: { value: new THREE.Color("#000000") }, // black
uColor2: { value: new THREE.Color("#555555") }, // dark gray
uColor3: { value: new THREE.Color("#aaaaaa") }, // light gray
uColor4: { value: new THREE.Color("#ffffff") }, // white
    uColorIntensity: { value: 1 },
    uSoftness: { value: 0.5 }
  };

  // Materials
  const fluidMaterial = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader: fluidShader,
    uniforms: fluidUniforms
  });

  const displayMaterial = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader: displayShader,
    uniforms: displayUniforms
  });

  const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), displayMaterial);
  scene.add(quad);

  // Mouse tracking
  const mouse = new THREE.Vector2();
  const prevMouse = new THREE.Vector2();
  let mouseDown = false;

  function updateMouse(e) {
    prevMouse.copy(mouse);
    mouse.set(e.clientX, window.innerHeight - e.clientY);
    fluidUniforms.iMouse.value.set(mouse.x, mouse.y, prevMouse.x, prevMouse.y);
  }

  window.addEventListener("mousemove", updateMouse);
  window.addEventListener("mousedown", (e) => {
    mouseDown = true;
    updateMouse(e);
  });
  window.addEventListener("mouseup", () => {
    mouseDown = false;
    fluidUniforms.iMouse.value.z = 0;
    fluidUniforms.iMouse.value.w = 0;
  });

  // Resize
  window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    rt1.setSize(window.innerWidth, window.innerHeight);
    rt2.setSize(window.innerWidth, window.innerHeight);
    fluidUniforms.iResolution.value.set(window.innerWidth, window.innerHeight);
    displayUniforms.iResolution.value.set(window.innerWidth, window.innerHeight);
  });

  // Render loop
  function animate(t) {
    requestAnimationFrame(animate);

    fluidUniforms.iTime.value = t * 0.001;
    displayUniforms.iTime.value = t * 0.001;
    fluidUniforms.iFrame.value++;

    // Step simulation into rt2
    quad.material = fluidMaterial;
    fluidUniforms.iPreviousFrame.value = rt1.texture;
    renderer.setRenderTarget(rt2);
    renderer.render(scene, camera);

    // Swap buffers
    let tmp = rt1;
    rt1 = rt2;
    rt2 = tmp;

    // Render display pass
    quad.material = displayMaterial;
    displayUniforms.iFluid.value = rt1.texture;
    renderer.setRenderTarget(null);
    renderer.render(scene, camera);
  }

  animate();
}
