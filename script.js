import { Pokemon } from "./models/Pokemon.js";

let nombre = prompt("Escribe tu nombre");
if (nombre != null || nombre != "") {
  localStorage.setItem("nombre", nombre);
}

//Se crean dos pokemons cuya información se extrae d ela api mediante dos números aleatorios
let n = Math.floor(Math.random() * 890 + 1);
let n2 = Math.floor(Math.random() * 890 + 1);
let pokemonInicio = new Pokemon(n);
let pokemonEnemigo = new Pokemon(n2);
pokemonInicio.montaPokemon();
pokemonEnemigo.montaPokemon();

//Se crean dos pokemons cuya información será el enemigo extraido de la api y el del jugador el que haya ganado
let n3 = Math.floor(Math.random() * 890 + 1);
let pokemon2 = pokemonEnemigo;
let pokemonEnemigo2 = new Pokemon(n3);
pokemon2.montaPokemon();
pokemonEnemigo2.montaPokemon();

//Se crean dos pokemons cuya información será el enemigo extraido de la api y el del jugador el que haya ganado
let n4 = Math.floor(Math.random() * 890 + 1);
let pokemon3 = pokemonEnemigo2;
let pokemonEnemigo3 = new Pokemon(n4);
pokemon3.montaPokemon();
pokemonEnemigo3.montaPokemon();

//variables globales
let audio = new Audio("media/pokemon-battle.mp3");
let pokemons = document.getElementById("seleccion");
let img = document.getElementById("sprite");
const comienza = document.getElementById("inicio");
const ataca = document.getElementById("ataca");
const combate1 = document.getElementById("combate1");
const combate2 = document.getElementById("combate2");
const combate3 = document.getElementById("combate3");
const reinicia = document.getElementById("reinicia");

//funcion que prepara la partida, añade el pokemon del jugador a un array dinámico, dibuja la pokedex
// que son los botones donde apareceran los pokemos del jugador para poder seleccionarlos
function preparativos() {
  pokemons.style.display = "block";
  pokemonInicio.addListaPokedex(pokemonInicio);
  pokemonInicio.pintaPokedex();
  pokemonInicio.pintaJugador();
  pokemonEnemigo.pintaEnemigo();
  comienza.style.display = "none";
  combate1.style.display = "block";
}
//funcion para detener el audio y reiniciarlo
let reiniciaAudio = () => {
  audio.pause();
  audio.currentTime = 0;
};

//mecánica del primer combate
function primerCombate() {
  reinicia.style.display = "block";
  audio.play();
  //oculta el boton de inicio de partida para sustituirlo por el boton de la batalla siguiente
  comienza.style.display = "none";
  //no he conseguido sacar el valor de daño ya que la propiedad slot me daba undefined así que comento las lineas donde
  // trabajaba con el valor de la habilidad y lo substituyo por una resta entre ataque y defensa

  //calculo del daño

  //let damage = pokemonEnemigo.defensa - pokemonInicio.ataque  * Math.floor(Math.random() * valorSlot pokemonInicio.slot;
  //console.log(pokemonInicio.habilidades[0].ability.slot);
  //pasa el nombre del pokemon a mayúsculas
  alert(
    `${pokemonEnemigo.nombre.toUpperCase()} recibe ${pokemonInicio.ataque} daño`
  );

  if (pokemonEnemigo.ataque > pokemonEnemigo.defensa) {
    alert(
      `Has ganado!  ${pokemonEnemigo.nombre.toUpperCase()} se añadirá a tu Pokedex`
    );
    pokemonEnemigo.vida = pokemonEnemigo.vida - pokemonInicio.ataque;
    pokemonInicio.addListaPokedex(pokemonEnemigo);
    pokemonInicio.pintaPokedex(pokemonEnemigo);
    pokemonInicio.victorias++;
    reiniciaAudio();
  } else {
    alert(`Ups! perdiste contra ${pokemonEnemigo.nombre.toUpperCase()}`);
    pokemonInicio.vida = pokemonInicio.vida - pokemonEnemigo.ataque;
    pokemonInicio.derrotas++;
    reiniciaAudio();
  }
  combate1.style.display = "none";
  combate2.style.display = "block";
  pokemon2.pintaJugador();
  pokemonEnemigo2.pintaEnemigo();
}

//en principio funciona, no como requería la rúbrica ya que no he llegado qa que el juugador seleccione un pokemon
//se le asigna el capturado y al enemigo un nuevo random, el pokemon enemigo cambia pero no se visualiza en pantalla y no he llegado a averiguar porque

function segundoCombate() {
  combate1.style.display = "none";
  audio.play();

  combate2.style.display = "none";
  alert(
    `${pokemonEnemigo2.nombre.toUpperCase()} recibe ${pokemon2.ataque} daño`
  );

  if (pokemon2.ataque > pokemonEnemigo2.defensa) {
    alert(
      `Has ganado!  ${pokemonEnemigo2.nombre.toUpperCase()} se añadirá a tu Pokedex`
    );
    pokemonEnemigo2.vida = pokemonEnemigo2.vida - pokemon2.ataque;
    pokemon2.addListaPokedex(pokemonEnemigo2);
    pokemon2.pintaPokedex();
    console.log(pokemon2.pokedex);
    reiniciaAudio();
  } else {
    alert(`Ups! perdiste contra ${pokemonEnemigo2.nombre.toUpperCase()}`);
    pokemon2.vida = pokemon2.vida - pokemonEnemigo2.ataque;

    reiniciaAudio();
  }
  combate3.style.display = "block";
  combate2.style.display = "none";
}

function tercerCombate() {
  audio.play();

  combate2.style.display = "none";
  alert(
    `${pokemonEnemigo3.nombre.toUpperCase()} recibe ${pokemon3.ataque} daño`
  );

  if (pokemon2.ataque > pokemonEnemigo2.defensa) {
    alert(
      `Has ganado!  ${pokemonEnemigo3.nombre.toUpperCase()} se añadirá a tu Pokedex`
    );
    pokemonEnemigo3.vida = pokemonEnemigo3.vida - pokemon3.ataque;
    pokemon3.addListaPokedex(pokemonEnemigo3);
    pokemon3.pintaPokedex();
    console.log(pokemon3.pokedex);
    reiniciaAudio();
  } else {
    alert(`Ups! perdiste contra ${pokemonEnemigo3.nombre.toUpperCase()}`);
    pokemon3.vida = pokemon3.vida - pokemonEnemigo3.ataque;

    reiniciaAudio();
  }

  reinicia.style.display = "block";
  combate3.style.display = "none";
}

function reinicioPartida() {
  pokemonInicio.pokedex = [];

  reinicia.style.display = "none";
  comienza.style.display = "block";
  combate2.style.display = "none";
  combate3.style.display = "none";
}
//empieza el combate cuando el usuario haga clic en el botón 'Empiza partida', así
// no necesitamos la función setTimkeOut para esperar a recibir los datos de la api
comienza.addEventListener("click", preparativos);

//cuando el usuario hace clic en el botón de batalla se inician las mecanicas del juego
combate1.addEventListener("click", primerCombate);
combate2.addEventListener("click", segundoCombate);
combate3.addEventListener("click", tercerCombate);
//cuando el usuario hace clic en el botón segunda batalla se inicia la mecanica de combate

reinicia.addEventListener("click", reinicioPartida);
