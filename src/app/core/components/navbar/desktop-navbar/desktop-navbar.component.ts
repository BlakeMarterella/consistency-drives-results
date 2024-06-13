import { Component, HostListener, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import navbarItems from '../navbar-item';
import { environment } from '@environments/environment';

@Component({
  selector: 'desktop-navbar',
  templateUrl: './desktop-navbar.component.html',
  styleUrls: ['./desktop-navbar.component.scss']
})
export class DesktopNavbarComponent implements OnInit {
  navbarItems = navbarItems;

  // The minimum distance from the top of the page to show the navbar
  // The higher the number, the further the user has to scroll before the navbar is shown
  // Minimum value is 0
  readonly minDistanceToTop: number = 80;
  // The users current y location
  yPosition = 0;

  // Use these colors when modifying the css
  readonly docsnapBlue: string = "rgba(25, 87, 137)";
  readonly docsnapGreen: string = "rgba(151, 195, 60)"; 
  readonly lightCanvas: string = "rgba(255, 255, 255)";
  readonly darkCanvas: string = "rgba(34, 34, 34)";
  
  // HTML Elements
  navbar;
  centeredElements;
  rightElements;
  box;
  

  
  constructor(private elementRef: ElementRef, private router: Router, private viewportScroller: ViewportScroller) { }
  
  ngOnInit(): void {
    // Grab the elements by id
    this.navbar = this.elementRef.nativeElement.querySelector('#navbar');
    this.centeredElements = this.elementRef.nativeElement.querySelector('#centered-elements');
    // this.rightElements = this.elementRef.nativeElement.querySelector('#right-elements');
    // this.box = this.elementRef.nativeElement.querySelector('#box');
  
    this.makeNavbarTransparent();
  }
  
  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Check the current position on the page
    const curYPosition = window.scrollY || document.documentElement.scrollTop;

    let isScrollingUp = (curYPosition < this.yPosition);
    let isTopOfPage = window.scrollY < this.minDistanceToTop;

    this.toggleNavbar(isTopOfPage, isScrollingUp);

    this.yPosition = curYPosition;
  }

  /**
   * Show or Hide the navbar based on the user's position on the page and the direction they are scrolling.
   * 
   * @param isTopOfPage true if the user is at the top of the page
   * @param isScrollingUp true if the user is scrolling up
   */
  toggleNavbar(isTopOfPage: boolean, isScrollingUp: boolean) {
        
        // Show navbar on top of page
        if (isTopOfPage) {
          this.makeNavbarTransparent();
        }
        // Show navbar on scroll up
        else if (isScrollingUp) {
          this.navbar.style.top = '0';
          // this.themeService.isDarkTheme() ? this.makeNavbarDark() : this.makeNavbarLight();
          this.makeNavbarLight();
        }
        // Hide navbar
        else {
          this.makeNavbarHidden();
        }
  }

  /**
   * Change the navbar to a white backgrund with docsnap blue text
   */
  makeNavbarLight() {
    this.navbar.style.background = 'white';
    this.navbar.style.boxShadow = '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)';
    this.centeredElements.style.color = `${this.docsnapBlue}`;
    // this.rightElements.style.color = `${this.docsnapBlue}`;
    // this.box.style.color = `white`;
    // this.box.style.backgroundColor = `${this.docsnapBlue}`;
    // this.box.style.border = `1px solid ${this.docsnapBlue}`;
  }

  /**
   * Change the navbar to a dark background with white text
   */
  makeNavbarDark() {
    this.navbar.style.background = `${this.darkCanvas}`;
    this.centeredElements.style.color = 'white';
    this.rightElements.style.color = 'white';
    this.box.style.color = 'white';
    this.box.style.border = '1px solid white';
  }

  /**
   * Change the navbar to a transparent background with white text
   */
  makeNavbarTransparent() {
    this.navbar.style.top = '0';
    this.navbar.style.background = 'rgba(255, 255, 255, 0.0)';
    this.navbar.style.boxShadow = 'none';
    this.centeredElements.style.color = 'white';
    // this.rightElements.style.color = 'white';
    // this.box.style.backgroundColor = 'transparent';
    // this.box.style.color = 'white';
    // this.box.style.border = '1px solid white';
  }

  /**
   * Hide the navbar
   */
  makeNavbarHidden() {
    this.navbar.style.top = '-90px';
    this.navbar.style.boxShadow = 'none';
  }
}
