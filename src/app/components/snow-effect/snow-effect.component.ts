import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-snow-effect',
  standalone: false,
  
  templateUrl: './snow-effect.component.html',
  styleUrl: './snow-effect.component.scss'
})
export class SnowEffectComponent implements OnInit {
  emojiCollection = ['❄️', '❄️', '❄️', '❄️', '❄️'];
  particles = 40;
  innerWidth = window.innerWidth
  
  constructor(
    private renderer: Renderer2, public el: ElementRef
  ){}

  ngOnInit(): void {
    this.createParticles();
  }
  
  createParticles() {
    for (let i = 0; i < this.particles; i++) {
      let randomEmoji = this.emojiCollection[Math.floor(Math.random() * this.emojiCollection.length)];
      let emojiLeftPosition = (innerWidth / this.particles) * i;
      
      let span = this.renderer.createElement('span');
      let text = this.renderer.createText(randomEmoji);
      this.renderer.appendChild(span, text);
      this.renderer.addClass(span, 'snowflake');
      this.renderer.setStyle(span, 'left', emojiLeftPosition + 'px');
      this.renderer.setStyle(span, 'animation-duration', (this.randomMinMax(3, 5.0) + 's'));
      this.renderer.setStyle(span, 'animation-delay', this.randomMinMax(0.3, 2.0) + 's');
      this.renderer.appendChild(this.el.nativeElement, span);
    }
  }
  
  randomMinMax(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }
  
}
