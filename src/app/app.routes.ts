import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SimpleCubeComponent } from './simple.cube/simple.cube.component';
import { LightsComponent } from './lights/lights.component';
import { ParticlesComponent } from './particles/particles.component';
import { OrbitControlComponent } from './orbit-control/orbit-control.component';
import { LookAtComponent } from './look-at/look-at.component';
import { RaycasterComponent } from './raycaster/raycaster.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'simple-cube', component: SimpleCubeComponent },
  { path: 'lights', component: LightsComponent },
  { path: 'particles', component: ParticlesComponent },
  { path: 'orbit-control', component: OrbitControlComponent },
  { path: 'look-at', component: LookAtComponent },
  { path: 'raycaster', component: RaycasterComponent },
];
