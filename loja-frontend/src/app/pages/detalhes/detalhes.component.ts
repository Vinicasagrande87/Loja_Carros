import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-detalhes',
  standalone: true,
  imports: [CommonModule, DecimalPipe],
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.css']
})
export class DetalhesComponent {
  @Input() carro: any;
  @Output() voltar = new EventEmitter<void>();
  @Output() contato = new EventEmitter<void>();
}