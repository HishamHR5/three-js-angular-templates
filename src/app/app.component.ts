import { Component } from '@angular/core';
import { SimpleCubeComponent } from './simple.cube/simple.cube.component';
import { LookAtComponent } from './look-at/look-at.component';
import { OrbitControlComponent } from './orbit-control/orbit-control.component';

@Component({
  //standalone:true,
  selector: 'app-root',
  imports: [OrbitControlComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {}
