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
  selector: 'app-particles',
  imports: [],
  templateUrl: './particles.component.html',
  styleUrl: './particles.component.scss'
})
export class ParticlesComponent {
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

    let component: ParticlesComponent = this;
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
    let geometry = new THREE.SphereGeometry(1);
    const verticalAmt =1000;
    const posArray = new Float32Array(verticalAmt *3);
    for(let i=0;i<verticalAmt*3;i++){
      posArray[i]=Math.random()-0.5;
    }
    geometry.setAttribute("position",new THREE.BufferAttribute(posArray,3))
    const material =new THREE.PointsMaterial({color:'grey'});
    material.size = 0.02;
    const points =new THREE.Points(geometry,material);
    component.scene.add(points);

    // Camera
    let aspect = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    component.camera = new THREE.PerspectiveCamera(
      10,
      aspect.width / aspect.height,
      0.1,
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
    //orbitControl.autoRotate = true;
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
