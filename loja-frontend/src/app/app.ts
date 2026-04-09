import { Component, OnInit } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { ContatosComponent } from './pages/contatos/contatos.component';
import { AdminComponent } from './pages/admin/admin.component';
import { EstoqueComponent } from './pages/estoque/estoque.component';
import { HomeComponent } from './pages/home/home.component';
import { DetalhesComponent } from './pages/detalhes/detalhes.component';

export interface Carro {
  marca: string;
  modelo: string;
  categoria: string;
  preco: number;
  descricao: string;
  foto: string;
  ano_fabricacao: number;
  ano_modelo: number;
  quilometragem: number;
  cor: string;
  combustivel: string;
  transmissao: string;
  status: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, FormsModule, DecimalPipe, 
    FooterComponent, HeaderComponent, ContatosComponent, 
    AdminComponent, EstoqueComponent, HomeComponent, DetalhesComponent
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent implements OnInit {
  view: string = 'home';
  isAdmin: boolean = false;
  
  // 1. Alterado para vazio para mostrar tudo no início
  categoriaSelecionada: string = ''; 
  carroSelecionado: Carro | null = null;
  
  private readonly TOKEN_SISTEMA = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzY0Njk4OTE2LCJleHAiOjE3NjUzMDM3MTZ9.h7NqR__ufGA7huy-11HoslOj_0yHgVABZnkhF2J04ao';

  listaCarros: Carro[] = [
    { 
      marca: 'TOYOTA', modelo: 'Hilux SRX', categoria: 'caminhonete', preco: 280000, 
      descricao: 'Diesel 4x4, único dono, todas revisões na concessionária.', foto: 'assets/hilux.png',
      ano_fabricacao: 2023, ano_modelo: 2024, quilometragem: 15000, cor: 'Branco',
      combustivel: 'Diesel', transmissao: 'Automática', status: 'Destaque'
    },
    { 
      marca: 'JEEP', modelo: 'Compass Longitude', categoria: 'suv', preco: 155000, 
      descricao: 'T270 Flex, teto panorâmico, som premium.', foto: 'assets/compass.png',
      ano_fabricacao: 2022, ano_modelo: 2023, quilometragem: 28000, cor: 'Cinza',
      combustivel: 'Flex', transmissao: 'Automática', status: 'Disponível'
    },
    { 
      marca: 'BMW', modelo: '320i M Sport', categoria: 'sedan', preco: 220000, 
      descricao: 'Interior conhaque, teto solar, GPS ativo.', foto: 'assets/320i.png',
      ano_fabricacao: 2022, ano_modelo: 2022, quilometragem: 22000, cor: 'Azul Portimao',
      combustivel: 'Flex', transmissao: 'Automática', status: 'Disponível'
    },
    { 
      marca: 'VW', modelo: 'Golf GTI', categoria: 'hatch', preco: 195000, 
      descricao: 'Pacote Exclusive, som Fender, teto solar.', foto: 'assets/golf.png',
      ano_fabricacao: 2019, ano_modelo: 2019, quilometragem: 45000, cor: 'Preto',
      combustivel: 'Gasolina', transmissao: 'DSG', status: 'Vendido'
    }
  ];

  ngOnInit() {}

  // 2. Lógica ajustada: Se categoriaSelecionada for vazia, mostra todos.
  get carrosExibidos() {
    if (!this.categoriaSelecionada) {
      return this.listaCarros;
    }
    return this.listaCarros.filter(c => c.categoria === this.categoriaSelecionada);
  }

  onNavigate(page: string) {
    this.view = page;
    // Reseta o filtro ao navegar para garantir que mostre tudo ao voltar ao estoque
    if (page === 'estoque') this.categoriaSelecionada = ''; 
    this.carroSelecionado = null;
    window.scrollTo(0, 0);
  }

  onFilter(cat: string) {
    this.categoriaSelecionada = cat;
    this.view = 'estoque';
    this.carroSelecionado = null;
    window.scrollTo(0, 0);
  }

  abrirDetalhes(carro: Carro) {
    this.carroSelecionado = carro;
    this.view = 'detalhes';
    window.scrollTo(0, 0);
  }

  acessoAdmin() {
    const token = prompt("Insira o Token de Acesso:");
    if (token === this.TOKEN_SISTEMA) { 
      this.isAdmin = true; 
      this.onNavigate('admin'); 
    } else {
      alert("Token Inválido!");
    }
  }
}