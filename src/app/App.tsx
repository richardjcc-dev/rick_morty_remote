// import { Routes, Route } from 'react-router-dom'
// import { useState } from 'react'
import { useState } from 'react'
import CharacterCard from '../components/CharacterCard'
// import CharacterSearcher from '../components/CharacterSearcher'
import CharacterFilters from '../components/CharactersFilters'
import CharacterDetails from '../components/CharacterDetails'

function App() {
  const [show, setShow] = useState(false)
  // const [selectedCharacter, setSelectedCharacter] = useState({})

  const handleCloseDetails = () => setShow(false)
  const handleShowDetails = () => setShow(true)
  // const handleCharacterClick = (characterData: any) => {
  //   setShow(true)
  //   setSelectedCharacter(characterData)
  // }

  const character = {
    name: 'Rick Sanchez',
    species: 'Human',
    gender: 'Male',
    status: 'Alive',
    location: 'Citadel of Ricks',
    origin: 'Pilot',
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  }

  return (
    <section className="components-container">
      <CharacterFilters />
      <CharacterDetails
        character={character}
        show={show}
        onHide={handleCloseDetails}
      />
      <CharacterCard character={character} onClick={handleShowDetails} />
    </section>
  )
}

export default App
