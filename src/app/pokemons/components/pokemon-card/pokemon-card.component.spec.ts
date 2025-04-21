import { ComponentFixture, TestBed } from "@angular/core/testing"
import { PokemonCardComponent } from "./pokemon-card.component"
import { provideRouter } from "@angular/router"
import { SimplePokemon } from "../../interfaces"

const mockPokemon: SimplePokemon = {
  id: '1',
  name: 'bulbasaur'
}

describe('PokemonCardComponent', () => {
  let fixture: ComponentFixture<PokemonCardComponent>
  let compiled: HTMLElement
  let component: PokemonCardComponent

  beforeEach(async ()=> {
    await TestBed.configureTestingModule({
      imports: [PokemonCardComponent],
      providers: [provideRouter([])]
    }).compileComponents()

    fixture = TestBed.createComponent(PokemonCardComponent)
    fixture.componentRef.setInput('pokemon', mockPokemon)

    compiled = fixture.nativeElement as HTMLElement
    component = fixture.componentInstance

    fixture.detectChanges()
  })

  it('should create the app', () => {
    expect(component).toBeTruthy()
  })

  it('should have the SimplePokemon signal inputValue', () => {
    expect(component.pokemon().id).toBeDefined()
    expect(component.pokemon().name).toBeDefined()
  })

  it('should render the pokemon name and image correctly', () => {
    expect(compiled.querySelector("h2")?.textContent?.trim()).toBe(mockPokemon.name)
    expect(compiled.querySelector("img")?.getAttribute("src")).toBe(
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${mockPokemon.id}.png`
    )
  })

  it('should have the proper ng-reflect-router-link', () => {
    const cardDiv = compiled.querySelector("div")!
    const ngReflect = cardDiv.getAttribute("ng-reflect-router-link")
    expect(ngReflect).toBe(`/pokemons,${mockPokemon.name}`);
  })
})
