const express = require('express')
const {success} = require('./helper.js')
let pokemons = require('./mock-pokemon')
const appPoke = express()
const port = 4200

appPoke.get('/', (req, res) => res.send('hello express 2 !'))

appPoke.get('/pokemons/:id/', (req, res) => {
    const id = parseInt(req.params.id)
    const pokemon = pokemons.find(pokemon => pokemon.id === id)
    const message = 'Pokemon found'
    res.json(success(message, pokemon))
    // res.send(`pokemon numero ${id}, nom : ${pokemon.name}, image : ${pokemon.picture}`)
})

appPoke.get('/pokemons', (req, res) => {
    const pokemon = pokemons.length
    const message = 'Get ALL POKEMONS in the DB'
    res.json(success(message,pokemons))
})

appPoke.get('/pokemonscount', (req, res) => {
    const pokemon = pokemons.length
    res.send(`total de pokemon ${pokemon}`)
})




appPoke.listen(port, () => console.log(`listening on port : ${port}`))