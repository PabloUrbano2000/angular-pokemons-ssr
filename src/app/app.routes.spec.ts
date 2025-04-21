import { TestBed } from "@angular/core/testing";
import { routes } from "./app.routes";
import { provideRouter, Router } from "@angular/router";
import { Location } from "@angular/common";

describe('App Routes', () => {
  let router: Router
  let location: Location

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter(routes)
      ]
    })

    router = TestBed.inject(Router)
    location = TestBed.inject(Location)
  })

  it('should navigate to "about" redirects to "/about"', async () => {
    await router.navigate(['/about'])

    expect(location.path()).toBe("/about");
  })

  it('should navigate to "pokemons/page/1" redirects to "/pokemons/page/1"', async () => {
    await router.navigate(['pokemons/page/1'])

    expect(location.path()).toBe("/pokemons/page/1");
  })

  it('should navigate to "unknown-page" redirects to "/about"', async () => {
    await router.navigate(['unknown-page'])

    expect(location.path()).toBe("/about");
  })

  it('should load the proper component', async () => {
    const aboutRoute = routes.find((route) => route.path === 'about')!
    expect(aboutRoute).toBeDefined()
    const aboutComponent = await aboutRoute.loadComponent!() as any
    expect(aboutComponent.default.name).toBe('AboutPageComponent');

    const pokemonsPageRoute = routes.find((route) => route.path === 'pokemons/page/:page')!
    expect(pokemonsPageRoute).toBeDefined()
    const pokemonPageComponent = await pokemonsPageRoute.loadComponent!() as any
    expect(pokemonPageComponent.default.name).toBe('PokemonsPageComponent');
  })
})
