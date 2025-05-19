// import { Routes, Route } from 'react-router-dom'
// import { useState } from 'react'
import CharacterCard from '../components/CharacterCard'
// import CharacterSearcher from '../components/CharacterSearcher'
import CharacterFilters from '../components/CharactersFilters'

function App() {
  return (
    <section className="components-container">
      <CharacterFilters />
      {/* <CharacterSearcher /> */}
      <CharacterCard />
    </section>
  )
}

export default App
