import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalStateService {
  private modalOpen = false;
  private openClasses: string[] = [];
  private scrollPosition = 0; // Nouvelle variable pour stocker la position du scroll

  isModalOpen(): boolean {
    return this.modalOpen;
  }

  toggleModal() {
    this.modalOpen = !this.modalOpen;
  }

  addOpenClass(className: string) {
    if (!this.openClasses.includes(className)) {
      this.openClasses.push(className);
    }
  }

  removeOpenClass(className: string) {
    const index = this.openClasses.indexOf(className);
    if (index !== -1) {
      this.openClasses.splice(index, 1);
    }
  }

  getOpenClasses(): string[] {
    return this.openClasses;
  }

  // Méthode pour stocker la position du scroll
  setScrollPosition(position: number) {
    this.scrollPosition = position;
  }

  // Méthode pour récupérer la position du scroll
  getScrollPosition(): number {
    return this.scrollPosition;
  }
}
