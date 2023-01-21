

export class Pokemon {

    id;
    nombre;
    imagen;
    tipo;
    vida;
    ataque;
    defensa;
    habilidades= [];
    victorias = 0;
    derrotas = 0;
    pokedex = [];
    slot;

    constructor(id) {
        this.id = id;
        this.url = `https://pokeapi.co/api/v2/pokemon/${this.id}`;
      }
    
      async montaPokemon() {
        try {
          const response = await fetch(this.url);
          const pokemon = await response.json();
          this.nombre = pokemon.name;
          this.imagen = pokemon.sprites.front_default;
          this.tipo = pokemon.types[0].type.name;    
          this.vida = pokemon.stats[0].base_stat;      
          this.ataque = pokemon.stats[1].base_stat;      
          this.defensa = pokemon.stats[2].base_stat;       
          this.habilidades = pokemon.abilities;
          
         for (let i = 0; i < pokemon.abilities.length; i++) {
            this.slot = this.habilidades[i].ability.slot;
         }
        this.pokedex = [];
        } catch (error) {
          console.error(error);
        }
      }
 
    addListaPokedex(nuevoPokemon) {

        this.pokedex.push(nuevoPokemon);
    }
    //Muestra por pantalla los pokemons que se añaden a la pokedex se muestran mediante botones para que el usuario pueda seleccionar cada uno de ellos
    pintaPokedex() {

        let pokemons = document.getElementById('seleccion');
        for (let i = 0; i < this.pokedex.length; i++) {
            let item = document.getElementById(`btn${[i]}`);
            item.innerHTML = this.pokedex[i].nombre;
            pokemons.appendChild(item);
            item.className = 'btn-warning';
                }

    }
    //dibuja el pokemon en la pantalla
    pintaJugador() {
        //visualizar el div qu está oculto para cuando el jugador seleccione un pokemon de la pokedex
        document.getElementById('pokemon1').style.display = 'block';
        let tipo = document.getElementById('tipo');
        let lista = document.getElementById('select');
        let pokemon = document.getElementById('pokemon');
        let img = document.getElementById('sprite');

        img.src = this.imagen;
        pokemon.innerHTML = '';

        let nombre = document.createElement('h2');
        nombre.innerHTML = this.nombre;
        nombre.style.textTransform = 'uppercase';
        nombre.style.fontWeight = '700';
        pokemon.appendChild(nombre);

        
        tipo.innerHTML = this.tipo;
        pokemon.appendChild(tipo);
        
        for (let i = 0; i < this.habilidades.length; i++) {
            let item = document.createElement('option');
            item.innerHTML = this.habilidades[i].ability.name;
            lista.appendChild(item);
        }

        let vida = document.getElementById('vida');
        vida.innerText = `Vida: ${this.vida}`;
        let ataque = document.getElementById('ataque');
        ataque.innerText = `Ataque: ${this.vida}`;
        let defensa = document.getElementById('defensa');
        defensa.innerText = `Defensa: ${this.defensa}`;
        let victorias = document.getElementById('victorias');
        victorias.innerText = `Victorias: ${this.victorias}`;
        let derrotas = document.getElementById('derrotas');
        derrotas.innerText = `derrotas: ${this.derrotas}`;

    }

    //dibuja el enemigo
    pintaEnemigo() {
        
        document.getElementById('pokemon2').style.display = 'block';
        let enemigo = document.getElementById('enemigo');
        let img = document.getElementById('sprite2');
        let tipo2 = document.getElementById('tipo2');
        let lista = document.getElementById('select2');

        img.src = this.imagen;
        enemigo.innerHTML = '';

        let nombre = document.createElement('h2');
        nombre.innerHTML = this.nombre;
        nombre.style.textTransform = 'uppercase';
        nombre.style.fontWeight = '700';
        enemigo.appendChild(nombre);
        
        tipo2.innerHTML = this.tipo2;
        enemigo.appendChild(tipo2);
        
        for (let i = 0; i < this.habilidades.length; i++) {
            let item2 = document.createElement('option');
            item2.innerHTML = this.habilidades[i].ability.name;
            lista.appendChild(item2);
        }


    }
}