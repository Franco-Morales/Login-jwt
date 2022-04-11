import { Component, Input } from '@angular/core';

import { NavigationService } from 'src/app/services/navigation.service';


@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent {
  constructor(private navSvc: NavigationService) { }

  public back() :void {
    this.navSvc.back();
  }
}
