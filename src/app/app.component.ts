import { Component } from '@angular/core';
import { SimpleCubeComponent } from './simple.cube/simple.cube.component';
import { LookAtComponent } from './look-at/look-at.component';
import { OrbitControlComponent } from './orbit-control/orbit-control.component';
import { LightsComponent } from './lights/lights.component';
import { ParticlesComponent } from './particles/particles.component';
import { RaycasterComponent } from './raycaster/raycaster.component';

@Component({
  //standalone:true,
  selector: 'app-root',
  imports: [RaycasterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {}
