import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: false,
  
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  texts: string[] = [
    'Software',
    'Bot para Discord',
    'Bot para WhatsApp',
    'Websites',
    'APIs'
  ]; // Array de textos
  currentText: string = ''; // Texto atual sendo digitado
  currentIndex: number = 0; // Índice do texto atual
  typingSpeed: number = 150; // Velocidade de digitação (em ms)
  deletingSpeed: number = 100; // Velocidade de apagamento (em ms)

  constructor() {}

  ngOnInit(): void {
    this.typeText();
  }

  typeText(): void {
    let index = 0;
    const currentPhrase = this.texts[this.currentIndex]; // Pega a frase atual

    // Digitação do texto
    const typingInterval = setInterval(() => {
      this.currentText += currentPhrase.charAt(index);
      index++;
      if (index === currentPhrase.length) {
        clearInterval(typingInterval); // Para a digitação
        setTimeout(() => {
          this.deleteText(); // Inicia o apagamento após a pausa
        }, 2000); // Pausa de 1 segundo após digitar a frase
      }
    }, this.typingSpeed);
  }

  deleteText(): void {
    let index = this.currentText.length;
    const deletingInterval = setInterval(() => {
      this.currentText = this.currentText.substring(0, index - 1);
      index--;
      if (index === 0) {
        clearInterval(deletingInterval); // Para o apagamento
        setTimeout(() => {
          this.currentIndex = (this.currentIndex + 1) % this.texts.length; // Muda para a próxima frase
          this.typeText(); // Inicia a digitação da próxima frase
        }, 500); // Pausa de 500ms antes de iniciar a próxima frase
      }
    }, this.deletingSpeed);
  }

}
