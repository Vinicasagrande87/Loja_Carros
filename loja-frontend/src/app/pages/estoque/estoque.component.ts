import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { Carro } from '../../app'; // Agora o 'Carro' está exportado corretamente

@Component({
  selector: 'app-estoque',
  standalone: true,
  imports: [CommonModule, DecimalPipe],
  templateUrl: './estoque.component.html',
  styleUrls: ['./estoque.component.css']
})
export class EstoqueComponent {
  @Input() carros: Carro[] = [];
  @Input() isAdmin: boolean = false;
  @Output() verDetalhes = new EventEmitter<Carro>(); 
}