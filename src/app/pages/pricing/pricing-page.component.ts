import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'pricing-page',
  imports: [],
  templateUrl: './pricing-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PricingPageComponent implements OnInit {
  private title = inject(Title)
  private meta = inject(Meta)
  private platform = inject(PLATFORM_ID)

  ngOnInit(): void {
    // console.log(this.platform, isPlatformServer(this.platform));
    // if(isPlatformBrowser(this.platform)){
    //   document.title = 'Pricing Page'
    // }
    this.title.setTitle('Pricing Page')
    this.meta.updateTag({ name: 'description', content: 'Este es mi pricing page' })
    this.meta.updateTag({ name: 'og:title', content: 'Este es mi pricing page' })
    this.meta.updateTag({ name: 'keywords', content: 'Pablito,perro,pokemons' })
  }
}
