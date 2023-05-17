import { Component, EnvironmentInjector, inject } from '@angular/core';
import {IonicModule, Platform} from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class AppComponent {
  public environmentInjector = inject(EnvironmentInjector);

  constructor(private platform:Platform) {
    this.showSplash()
  }

  private async showSplash(){
      this.platform.ready()
  }
}
