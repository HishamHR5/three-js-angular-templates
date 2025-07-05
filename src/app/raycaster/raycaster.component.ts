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
  selector: 'app-raycaster',
  imports: [],
  templateUrl: './raycaster.component.html',
  styleUrl: './raycaster.component.scss',
})
export class RaycasterComponent {
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

    let component: RaycasterComponent = this;
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
    let material = new THREE.MeshBasicMaterial({ color: 'purple' });
    let mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = 1;
    component.scene.add(mesh);

    let geometry2 = new THREE.BoxGeometry(1, 1, 1);
    let material2 = new THREE.MeshBasicMaterial({ color: 'purple' });
    let mesh2 = new THREE.Mesh(geometry2, material2);
    mesh2.position.x = -1;
    component.scene.add(mesh2);

    //Raycaster
    const ray = new THREE.Raycaster();
    const point = new THREE.Vector2();
    window.addEventListener('mousemove', (event) => {
      point.x = (event.clientX / window.innerWidth) * 2 - 1;
      point.y = (event.clientY / window.innerHeight) * 2 - 1;
      ray.setFromCamera(point, component.camera);
      const intersect = ray.intersectObjects([mesh, mesh2]);
      console.log(intersect);
      for (let i = 0; i < intersect.length; i++) {
        const intersected = intersect[i].object;
        if (
          intersected instanceof THREE.Mesh &&
          intersected.material instanceof THREE.MeshBasicMaterial
        ) {
          intersected.material.color.set('green');
        }
      }
    });

    // Camera
    let aspect = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    component.camera = new THREE.PerspectiveCamera(
      75,
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
