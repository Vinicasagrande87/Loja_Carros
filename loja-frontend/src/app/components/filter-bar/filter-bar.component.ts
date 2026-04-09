import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filter-bar',
  standalone: true,
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.css']
})
export class FilterBarComponent {
  @Output() filtrar = new EventEmitter<string>();

  onFilter(cat: string) {
    this.filtrar.emit(cat);
  }
}