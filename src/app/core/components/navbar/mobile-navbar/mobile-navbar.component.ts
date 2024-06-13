import { ViewChild, Component, ElementRef, Renderer2 } from '@angular/core';
import navbarItems from '../navbar-item';
import { environment } from '@environments/environment';

@Component({
  selector: 'mobile-navbar',
  templateUrl: './mobile-navbar.component.html',
  styleUrls: ['./mobile-navbar.component.scss']
})
export class MobileNavbarComponent {
  showMenu: boolean = false;
  showMenuItems: boolean = false;
  navbarItems = navbarItems;
  @ViewChild('menuIcon') menuIcon: ElementRef;

  constructor(private renderer: Renderer2) { }

  toggleMenu() {
    this.toggleMenuIcon();
    if (this.showMenu) {
      this.showMenu = false;
      // Slight delay to menu to close smoothly
      setTimeout(() => {
        this.showMenuItems = false;
      }, 200);
    }
    else {
      this.showMenu = true;
      this.showMenuItems = true;
    }
  }

  toggleMenuIcon() {
    const menuIconElement = this.menuIcon.nativeElement;
    if (this.renderer) {
      if (menuIconElement.classList.contains('opened')) {
        this.renderer.removeClass(menuIconElement, 'opened');
      } else {
        this.renderer.addClass(menuIconElement, 'opened');
      }
    }
  }
}
