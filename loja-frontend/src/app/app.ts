import { Component, OnInit } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet, RouterLink, Router } from '@angular/router';

interface Carro {
  marca: string;
  modelo: string;
  categoria: string;
  preco: number;
  descricao: string;
  foto: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet, RouterLink, DecimalPipe],
  templateUrl: './app.html', // Nome conforme sua pasta
  styleUrls: ['./app.css']    // Nome conforme sua pasta
})
export class AppComponent implements OnInit {
  view: string = 'home';
  isAdmin: boolean = false;
  isEditando: boolean = false;
  indexEditando: number | null = null;
  
  // Seu Token JWT preservado
  private readonly TOKEN_SISTEMA = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzY0Njk4OTE2LCJleHAiOjE3NjUzMDM3MTZ9.h7NqR__ufGA7huy-11HoslOj_0yHgVABZnkhF2J04ao';

  // Propriedade listaCarros para o HTML
  listaCarros: Carro[] = [
    { marca: 'TOYOTA', modelo: 'Hilux SRX', categoria: 'caminhonete', preco: 280000, descricao: 'Diesel 4x4, único dono.', foto: 'assets/hilux.png' },
    { marca: 'JEEP', modelo: 'Compass', categoria: 'suv', preco: 150000, descricao: 'T270 Flex, teto panorâmico.', foto: 'assets/compass.png' },
    { marca: 'BMW', modelo: '320i', categoria: 'esportivo', preco: 220000, descricao: 'M Sport, interior conhaque.', foto: 'assets/320i.png' },
    { marca: 'VW', modelo: 'Golf GTI', categoria: 'esportivo', preco: 190000, descricao: 'Pacote Exclusive, som Fender.', foto: 'assets/golf.png' }
  ];

  novoCarro: Carro = this.limparForm();

  constructor(public router: Router) {}

  ngOnInit() {
    console.log("Casagrande Motors: Dashboard Ativo");
  }

  setPage(page: string) {
    this.view = page;
    window.scrollTo(0, 0);
  }

  limparForm() {
    return { marca: '', modelo: '', categoria: '', preco: 0, descricao: '', foto: '' };
  }

  acessoAdmin() {
    const token = prompt("Token de Segurança:");
    if (token === this.TOKEN_SISTEMA) {
      this.isAdmin = true;
      this.setPage('admin');
    }
  }

  salvar() {
    if (this.isEditando && this.indexEditando !== null) {
      this.listaCarros[this.indexEditando] = { ...this.novoCarro };
    } else {
      this.listaCarros.push({ ...this.novoCarro });
    }
    this.cancelar();
    this.setPage('estoque');
  }

  editar(carro: Carro, i: number) {
    this.isEditando = true;
    this.indexEditando = i;
    this.novoCarro = { ...carro };
    this.setPage('admin');
  }

  excluir(i: number) {
    if (confirm("Remover do estoque?")) {
      this.listaCarros.splice(i, 1);
    }
  }

  cancelar() {
    this.isEditando = false;
    this.indexEditando = null;
    this.novoCarro = this.limparForm();
  }
}