import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  @Output() verEstoque = new EventEmitter<void>();

  irParaEstoque() {
    this.verEstoque.emit();
  }
}