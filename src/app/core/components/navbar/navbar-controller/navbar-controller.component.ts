import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'core-navbar',
  templateUrl: './navbar-controller.component.html',
  styleUrls: ['./navbar-controller.component.scss']
})
export class NavbarControllerComponent implements OnInit {
    readonly maxMobileSizePx : number = 800;
    isMobile: boolean = false;

    /**
     * Upon initialization, check if the screen is a mobile view
     */
    ngOnInit(): void {
      this.isMobile = this.checkIsMobile();        
    }

    /**
   * When the window is resized, then either show or hide the navbar
   */
    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
      this.isMobile = this.checkIsMobile();
    }

    /**
     * Check if the screen is a mobile view
     * 
     * @returns true if the display is a mobile view
     */
    checkIsMobile(): boolean {
      return window.innerWidth < this.maxMobileSizePx;
    }
}
