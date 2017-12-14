import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { HomePage } from '../home/home';
import { SetupPage } from '../setup/setup';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  homeRoot = HomePage;
  aboutRoot = AboutPage;
  setupRoot = SetupPage;

  constructor() {

  }
}
