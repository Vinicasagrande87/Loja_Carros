import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-estoque',
  standalone: true,
  imports: [CommonModule, DecimalPipe],
  templateUrl: './estoque.component.html',
  styleUrls: ['./estoque.component.css']
})
export class EstoqueComponent {
  @Input() carros: any[] = [];
  @Input() isAdmin: boolean = false;
  
  @Output() filtrar = new EventEmitter<string>();
  @Output() editarCarro = new EventEmitter<{carro: any, index: number}>();
  @Output() excluirCarro = new EventEmitter<number>();

  onFilter(categoria: string) {
    this.filtrar.emit(categoria);
  }

  onEditar(carro: any, index: number) {
    this.editarCarro.emit({ carro, index });
  }

  onExcluir(index: number) {
    this.excluirCarro.emit(index);
  }
}