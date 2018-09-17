import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title: string = 'Angular Lifecyle Demonstration';
  company: string = 'Wipro';
  location: string = 'Bangalore';
  hasChild: boolean = true;

  toggleChild() {
    this.hasChild = !this.hasChild;
  }
}
