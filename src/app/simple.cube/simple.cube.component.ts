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

@Component({
  selector: 'app-simple-cube',
  imports: [],
  templateUrl: './simple.cube.component.html',
  styleUrl: './simple.cube.component.scss'
})
export class SimpleCubeComponent implements AfterViewInit{
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

    let component: SimpleCubeComponent = this;
    component.scene = new THREE.Scene();

    //Mesh
    let geometry = new THREE.BoxGeometry(1, 1, 1);
    let material = new THREE.MeshBasicMaterial({ color: 'purple' });
    let mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(1, 1, 3);
    component.scene.add(mesh);

    // Axis Helper
    let axis = new THREE.AxesHelper(5);
    component.scene.add(axis);

    // Camera
    let width = window.innerWidth;
    let height = window.innerHeight;
    component.camera = new THREE.PerspectiveCamera(75, width / height, 1, 2000);
    component.camera.position.set(3, 2, 7);
    component.scene.add(component.camera);
    
    //render 
    component.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
    });

    component.renderer.setSize(width, height);
    

    let animate =()=>{
      mesh.rotation.x +=0.01;
      mesh.rotation.y +=0.01;
      mesh.rotation.z +=0.01;
      component.renderer.render(component.scene, component.camera);
      window.requestAnimationFrame(animate);
    }
    animate();
  }
}
