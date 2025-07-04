import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

@Component({
  selector: 'app-lights',
  imports: [],
  templateUrl: './lights.component.html',
  styleUrl: './lights.component.scss',
})
export class LightsComponent {
  isBrowser = true;
  @ViewChild('canvas') private canvasRef!: ElementRef;

  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  private getAspectRatio() {
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    // to ensure this is client side rendering window object is
    // not accesible in server side
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (!this.isBrowser) return;

    let component: LightsComponent = this;
    component.scene = new THREE.Scene()

    //Responsiveness
    window.addEventListener('resize', () => {
      //new size
      aspect.height = window.innerHeight;
      aspect.width = window.innerWidth;

      //new aspect ratio
      component.camera.aspect = aspect.width / aspect.height;
      component.camera.updateProjectionMatrix();

      //new Render size
      component.renderer.setSize(aspect.width, aspect.height);
    });

    //Mesh
    let geometry = new THREE.TorusGeometry(0.3,0.2,64,64);
    let material = new THREE.MeshStandardMaterial();
    let mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 0, 0);
    component.scene.add(mesh);

    //-Lights
    //-1)AmbientLight--> all directions with same color (no shadow)
    // const ambientLight = new THREE.AmbientLight('#ffffff', 1);
    // component.scene.add(ambientLight);

    //-------------------------------------2)DirectionalLight-------------------------------------
    const directionalLight = new THREE.DirectionalLight("green", 1);
    directionalLight.position.set(0, 2, 0);
    component.scene.add(directionalLight);
    const directionalLight2 = new THREE.DirectionalLight("green", 1);
    directionalLight.position.set(2, 0, 0);
    component.scene.add(directionalLight2);
        const directionalLightHelper = new THREE.DirectionalLightHelper(
      directionalLight
    );
    component.scene.add(directionalLightHelper);
            const directionalLightHelper2 = new THREE.DirectionalLightHelper(
      directionalLight2
    );
    component.scene.add(directionalLightHelper2);
    
    


    //-------------------------------------3)HemisphereLight-----------------------------------------
    // const hemisphereLight = new THREE.HemisphereLight("blue","yellow",1);
    // scene.add(hemisphereLight)
    
    //-------------------------------------HemisphereLightHelper-------------------------------------
    // const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight);
    // scene.add(hemisphereLightHelper);
    
    //-------------------------------------4)PointLight----------------------------------------------
    // const pointLight = new THREE.PointLight("red", 0.8, 3);
    // gui.add(pointLight.position, "x").min(-3).max(3).step(0.01).name("X Point");
    // gui.add(pointLight.position, "y").min(-3).max(3).step(0.01).name("Y Point");
    // gui.add(pointLight.position, "z").min(-3).max(3).step(0.01).name("Z Point");
    // scene.add(pointLight);
    
    //-------------------------------------PointLightHelper-------------------------------------------
    // const pointLightHelper = new THREE.PointLightHelper(pointLight);
    // scene.add(pointLightHelper);
    
    //-------------------------------------5)RectAreaLight---------------------------------------------
    // const rectAreaLight = new THREE.RectAreaLight("#5D3FD3", 3, 2, 2);
    // rectAreaLight.position.z = 0.5;
    // scene.add(rectAreaLight);
    // gui.add(rectAreaLight, "width").min(0).max(7).step(0.01).name("width");
    // gui.add(rectAreaLight, "height").min(0).max(7).step(0.01).name("height");


    // Camera
    let aspect = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    component.camera = new THREE.PerspectiveCamera(
      75,
      aspect.width / aspect.height,
      1,
      2000
    );
    component.camera.position.set(0, 0, 3);
    component.scene.add(component.camera);

    //render
    component.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
    });
    component.renderer.setSize(aspect.width, aspect.height);

    let orbitControl = new OrbitControls(component.camera, this.canvas);
    // orbitControl.autoRotate = true;
    // orbitControl.autoRotateSpeed = 6;
    orbitControl.enableDamping = true;
    // orbitControl.dampingFactor = 0.1;

    let animate = () => {
      component.renderer.render(component.scene, component.camera);
      orbitControl.update();
      window.requestAnimationFrame(animate);
    };
    animate();
  }
}
