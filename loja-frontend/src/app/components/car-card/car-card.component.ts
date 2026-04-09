import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-car-card',
  standalone: true,
  imports: [CommonModule, DecimalPipe],
  templateUrl: './car-card.component.html',
  styleUrls: ['./car-card.component.css']
})
export class CarCardComponent {
  @Input() carro: any;
  @Input() isAdmin: boolean = false;

  @Output() editar = new EventEmitter<void>();
  @Output() excluir = new EventEmitter<void>();
}