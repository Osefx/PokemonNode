const express = require('express')
const morgan = require('morgan')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const { success } = require('./helper.js')
const { loggerURL } = require('./logger.js')
let pokemons = require('./mock-pokemon')
const appPoke = express()
const port = 4200

appPoke
    //.use(loggerURL)
    .use(favicon(__dirname + '/icone.ico'))
    .use(morgan('dev'))
    .use(bodyParser.json());

appPoke.get('/', (req, res) => 
    res.send('hello express 2 !')
);

appPoke.get('/app/pokemons/:id/', (req, res) => {
    const id = parseInt(req.params.id)
    const pokemon = pokemons.find(pokemon => pokemon.id === id)
    const message = 'Pokemon found'
    res.json(success(message, pokemon))
    // res.send(`pokemon numero ${id}, nom : ${pokemon.name}, image : ${pokemon.picture}`)
});

appPoke.get('/app/pokemons', (req, res) => {
    const pokemon = pokemons.length
    const message = 'Get ALL POKEMONS in the DB'
    res.json(success(message,pokemons))
});

appPoke.get('/pokemonscount', (req, res) => {
    const pokemon = pokemons.length
    res.send(`total de pokemon ${pokemon}`)
});

// ajout d un pokemon
appPoke.post('/app/pokemons', (req, res) => {
    // const jsonParser = bodyParser.json()
    const id = pokemons.length + 1
    const pokemonCreate = { ...req.body, ...{id: id, created: new Date()}} 
    //const jsonPokemonCreate = jsonParser.pokemonCreate
    pokemons.push(pokemonCreate)
    const message = `Le pokemon ${pokemonCreate.name} a bien été créé`
    res.json(success(message, pokemonCreate))
});
// update pokemon
appPoke.put('/app/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const pokemonUpdate = { ...req.body, id: id }
    pokemons = pokemons.map(pokemon => {
        return pokemon.id === id ? pokemonUpdate : pokemon
    })
    const message = `Le pokémon ${pokemonUpdate.name} a bien été modifié.`
    res.json(success(message, pokemonUpdate))
});
// delete pokemon
appPoke.delete('/app/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const pokemonDelete = pokemons.find(pokemon => 
        pokemon.id === id)
    pokemons = pokemons.filter(pokemon => 
        pokemon.id !== id)
    const message = `Le pokémon ${pokemonDelete.name} a bien été supprimé.`
    res.json(success(message, pokemonDelete))
});

appPoke.listen(port, () => 
    console.log(`listening on port : ${port}`)
    );