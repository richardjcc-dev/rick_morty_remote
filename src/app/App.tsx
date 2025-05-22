import { useState } from 'react'
import CharacterCard from '../components/CharacterCard'
import CharacterDetails from '../components/CharacterDetails'
import CharacterFilters from '../components/CharactersFilters'
import type { Character } from '../interfaces/Characters'

function App() {
  const [show, setShow] = useState(false)

  const handleCloseDetails = () => setShow(false)
  const handleShowDetails = () => setShow(true)

  const testCharacter: Character = {
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    origin: {
      name: 'Earth (C-137)',
      url: 'https://rickandmortyapi.com/api/location/1',
    },
    location: {
      name: 'Citadel of Ricks',
      url: 'https://rickandmortyapi.com/api/location/3',
    },
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    episode: ['https://rickandmortyapi.com/api/episode/1'],
    url: 'https://rickandmortyapi.com/api/character/1',
    created: '2017-11-04T18:48:46.250Z',
  }

  return (
    <section className="components-container">
      <CharacterFilters />
      <CharacterDetails
        character={testCharacter}
        show={show}
        onHide={handleCloseDetails}
      />
      <CharacterCard character={testCharacter} onClick={handleShowDetails} />
    </section>
  )
}

export default App
