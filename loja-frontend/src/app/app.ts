import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { VeiculoService } from './services/veiculo';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent implements OnInit {
  // 1. Declarar a lista que o *ngFor usa
  carros: any[] = [];

  // 2. Declarar o objeto que o [(ngModel)] usa
  novoCarro = { 
    marca: '', 
    modelo: '', 
    preco: 0, 
    cor: '', 
    descricao: '' 
  };

  constructor(private veiculoService: VeiculoService) {}

  ngOnInit() {
    this.carregarEstoque();
  }

  carregarEstoque() {
    this.veiculoService.listar().subscribe({
      next: (dados) => {
        this.carros = dados;
        console.log('DOM atualizado com sucesso!', dados);
      },
      error: (err) => console.error('Erro ao buscar dados:', err)
    });
  }

  // 3. Declarar a função que o (submit) usa
  adicionar() {
    console.log('Enviando para o banco:', this.novoCarro);
    // Por enquanto apenas um feedback visual
    alert(`Veículo ${this.novoCarro.modelo} pronto para cadastro!`);
  }
}