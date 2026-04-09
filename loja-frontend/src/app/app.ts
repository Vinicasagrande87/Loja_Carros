import { Component, OnInit } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Importações corrigidas para 'components' (com N)
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { ContatosComponent } from './pages/contatos/contatos.component';
import { AdminComponent } from './pages/admin/admin.component';
import { EstoqueComponent } from './pages/estoque/estoque.component';
import { HomeComponent } from './pages/home/home.component';

// Importação dos novos sub-componentes (para o Angular reconhecê-los)
import { FilterBarComponent } from './components/filter-bar/filter-bar.component';
import { CarCardComponent } from './components/car-card/car-card.component';

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
  imports: [
    CommonModule, 
    FormsModule, 
    DecimalPipe, 
    FooterComponent,
    HeaderComponent,
    ContatosComponent,
    AdminComponent,
    EstoqueComponent,
    HomeComponent,
    FilterBarComponent, // Adicionado aqui
    CarCardComponent    // Adicionado aqui
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent implements OnInit {
  view: string = 'home';
  isAdmin: boolean = false;
  isEditando: boolean = false;
  indexEditando: number | null = null;
  categoriaSelecionada: string = 'todos';
  
  private readonly TOKEN_SISTEMA = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzY0Njk4OTE2LCJleHAiOjE3NjUzMDM3MTZ9.h7NqR__ufGA7huy-11HoslOj_0yHgVABZnkhF2J04ao';

  listaCarros: Carro[] = [
    { marca: 'TOYOTA', modelo: 'Hilux SRX', categoria: 'caminhonete', preco: 280000, descricao: 'Diesel 4x4, único dono.', foto: 'hilux.png' },
    { marca: 'JEEP', modelo: 'Compass', categoria: 'suv', preco: 150000, descricao: 'T270 Flex, teto panorâmico.', foto: 'compass.png' },
    { marca: 'BMW', modelo: '320i', categoria: 'sedan', preco: 220000, descricao: 'M Sport, interior conhaque.', foto: '320i.png' },
    { marca: 'VW', modelo: 'Golf GTI', categoria: 'hatch', preco: 190000, descricao: 'Pacote Exclusive, som Fender.', foto: 'golf.png' }
  ];

  novoCarro: Carro = this.limparForm();

  ngOnInit() {
    console.log("Casagrande Motors: Sistema iniciado com sucesso.");
  }

  get carrosExibidos() {
    if (this.categoriaSelecionada === 'todos') return this.listaCarros;
    return this.listaCarros.filter(c => c.categoria === this.categoriaSelecionada);
  }

  onNavigate(page: string) {
    this.view = page;
    this.categoriaSelecionada = 'todos';
    window.scrollTo(0, 0);
  }

  onFilter(cat: string) {
    this.categoriaSelecionada = cat;
    this.view = 'estoque';
  }

  limparForm() {
    return { marca: '', modelo: '', categoria: '', preco: 0, descricao: '', foto: '' };
  }

  acessoAdmin() {
    const token = prompt("Insira o Token de Acesso:");
    if (token === this.TOKEN_SISTEMA) {
      this.isAdmin = true;
      this.onNavigate('admin');
    }
  }

  salvar() {
    if (this.isEditando && this.indexEditando !== null) {
      this.listaCarros[this.indexEditando] = { ...this.novoCarro };
    } else {
      this.listaCarros.push({ ...this.novoCarro });
    }
    this.cancelar();
    this.onNavigate('estoque');
  }

  editar(event: {carro: Carro, index: number}) {
    this.isEditando = true;
    this.indexEditando = event.index;
    this.novoCarro = { ...event.carro };
    this.onNavigate('admin');
  }

  excluir(i: number) {
    if (confirm("Deseja excluir este veículo?")) {
      this.listaCarros.splice(i, 1);
    }
  }

  cancelar() {
    this.isEditando = false;
    this.indexEditando = null;
    this.novoCarro = this.limparForm();
    this.onNavigate('estoque');
  }
}