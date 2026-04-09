import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  // Controle de acesso
  isAdmin = false;
  
  // O token que você definiu previamente
  private readonly TOKEN_MESTRE = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzY0Njk4OTE2LCJleHAiOjE3NjUzMDM3MTZ9.h7NqR__ufGA7huy-11HoslOj_0yHgVABZnkhF2J04ao';

  carros = [
    { marca: 'Toyota', modelo: 'Hilux SRX', descricao: 'Diesel 4x4, único dono, todas as revisões na concessionária.' },
    { marca: 'Jeep', modelo: 'Compass Longitude', descricao: 'T270 Flex, bancos em couro, teto solar panorâmico.' },
    { marca: 'BMW', modelo: '320i M Sport', descricao: 'Interior conhaque, grade ativa, estado de zero km.' },
    { marca: 'VW', modelo: 'Golf GTI', descricao: 'Pacote Exclusive, som Fender, pneus novos.' }
  ];

  novoCarro = { marca: '', modelo: '', preco: 0, cor: '', descricao: '' };

  // Função para liberar o painel
  liberarAdmin() {
    const senha = prompt("Digite o token de acesso:");
    if (senha === this.TOKEN_MESTRE) {
      this.isAdmin = true;
      alert("Acesso administrativo liberado!");
    } else {
      alert("Token inválido.");
    }
  }

  adicionar() {
    if (this.isAdmin) {
      this.carros.push({ ...this.novoCarro });
      this.novoCarro = { marca: '', modelo: '', preco: 0, cor: '', descricao: '' };
    }
  }
}