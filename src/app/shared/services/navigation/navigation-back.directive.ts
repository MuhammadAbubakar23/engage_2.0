import { Directive, HostListener } from '@angular/core';
import { NavigationService } from './navigation.service';
import { Location } from "@angular/common";
@Directive({
  selector: '[navigationBack]',
  exportAs: 'navigationBack',
  // standalone: true
})
export class NavigationBackDirective {
  constructor(private navigation: NavigationService, private location:Location) {}
  @HostListener("click")
  onClick(): void {
    this.navigation.back();
    //this.location.back();
  }
}
