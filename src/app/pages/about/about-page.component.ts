import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'about-page',
  imports: [],
  templateUrl: './about-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AboutPageComponent implements OnInit{
  private title = inject(Title)
  private meta = inject(Meta)

  ngOnInit(): void {
    this.title.setTitle('About Page')
    this.meta.updateTag({ name: 'description', content: 'Este es mi about page' })
    this.meta.updateTag({ name: 'og:title', content: 'Este es mi about page' })
    this.meta.updateTag({ name: 'keywords', content: 'Pablito,perro,pokemons' })
  }
}
