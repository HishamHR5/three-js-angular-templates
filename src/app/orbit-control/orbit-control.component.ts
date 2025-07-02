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
  selector: 'app-orbit-control',
  imports: [],
  templateUrl: './orbit-control.component.html',
  styleUrl: './orbit-control.component.scss',
})
export class OrbitControlComponent implements AfterViewInit{
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

    let component: OrbitControlComponent = this;
    component.scene = new THREE.Scene();



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
    let geometry = new THREE.BoxGeometry(1, 1, 1);
    let material = new THREE.MeshBasicMaterial({ color: 'green' });
    let mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 0, 0);
    component.scene.add(mesh);

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
    orbitControl.autoRotate =true;
    orbitControl.autoRotateSpeed =6;
    orbitControl.enableDamping =true;
    orbitControl.dampingFactor =0.1
    
    let animate = () => {
      component.renderer.render(component.scene, component.camera);
      orbitControl.update();
      window.requestAnimationFrame(animate);
    };
    animate();
  }
}
