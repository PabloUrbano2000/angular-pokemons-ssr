import { ChangeDetectionStrategy, Component, effect, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop'
import { PokemonListComponent } from "../../pokemons/components/pokemon-list/pokemon-list.component";
import { PokemonListSkeletonComponent } from "../../pokemons/ui/pokemon-list-skeleton/pokemon-list-skeleton.component";
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { SimplePokemon } from '../../pokemons/interfaces';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { map, tap } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'pokemons-page',
  imports: [PokemonListComponent, PokemonListSkeletonComponent, RouterLink],
  templateUrl: './pokemons-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonsPageComponent implements OnInit, OnDestroy {
  // public isLoading = signal(true)

  // private appRef = inject(ApplicationRef)

  // private $appState = this.appRef.isStable.subscribe(isStable => {
  //   console.log({isStable});
  // })

  private pokemonsService = inject(PokemonsService)
  public pokemons = signal<SimplePokemon[]>([])

  private route = inject(ActivatedRoute)
  private router = inject(Router)
  private title = inject(Title)

  public currentPage = toSignal<number>(
    // this.route.queryParamMap.pipe(
    //  map(params => params.get("page") ?? '1'),
    this.route.params.pipe(
      map(params => params["page"] ?? '1'),
      map(page => (isNaN(+page) ? 1 : +page)),
      map(page => Math.max(1, page))
    )
  )

  public loadOnPageChanged = effect(()=> {
    console.log("Página cambió", this.currentPage());
    this.loadPokemons(this.currentPage())
  }, {
    allowSignalWrites: true
  })

  ngOnInit(): void {
    // setTimeout(()=> {
    //   this.isLoading.set(false)
    // },5000)
    this.loadPokemons()
  }

  ngOnDestroy(): void {
    // console.log('destroy');
    // this.$appState.unsubscribe()
  }

  public loadPokemons(page = 0){
    // const pageToLoad = this.currentPage()! + page
    this.pokemonsService.loadPage(page)
    .pipe(
      // tap(() => this.router.navigate([], { queryParams: { page: pageToLoad }})),
      tap(() => this.title.setTitle('Pokémons SSR - Page ' + page.toString()))
    )
    .subscribe(pokemons => {
      this.pokemons.set(pokemons)
    })
  }

  // DOC: https://angular.dev/guide/prerendering
}
