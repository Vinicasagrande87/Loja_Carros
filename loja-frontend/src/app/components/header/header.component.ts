import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() view: string = 'home';
  @Input() isAdmin: boolean = false;
  @Output() navigate = new EventEmitter<string>();

  setPage(page: string) {
    this.navigate.emit(page);
  }
}