import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  @Input() novoCarro: any;
  @Input() isEditando: boolean = false;
  
  @Output() salvar = new EventEmitter<void>();
  @Output() cancelar = new EventEmitter<void>();

  onSalvar() {
    this.salvar.emit();
  }

  onCancelar() {
    this.cancelar.emit();
  }
}