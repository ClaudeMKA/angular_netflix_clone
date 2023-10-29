import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isScrolled = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Vérifiez la position de défilement ici
    this.isScrolled = window.scrollY > 50;  // Par exemple, changez la valeur 50 selon vos besoins
  }
}
