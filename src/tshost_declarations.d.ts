declare module 'rick_morty_host/characterStore'

// declare module 'rick_morty_remote/store/characterStore' {
//   import { StoreApi } from 'zustand'
//   import { Character } from 'rick_morty_remote/Character'

//   type CharacterSpecies = string
//   type CharacterGender = 'Male' | 'Female' | 'Genderless' | 'unknown' | ''
//   type CharacterStatus = 'Alive' | 'Dead' | 'unknown' | ''

//   interface CharacterState {
//     characters: Character[]

//     loading: boolean
//     error: string | null

//     currentPage: number
//     totalPages: number

//     nameFilter: string
//     speciesFilter: CharacterSpecies
//     genderFilter: CharacterGender
//     statusFilter: CharacterStatus

//     fetchCharacters: (page?: number) => Promise<void>

//     setNameFilter: (name: string) => void
//     setSpeciesFilter: (species: CharacterSpecies) => void
//     setGenderFilter: (gender: CharacterGender) => void
//     setStatusFilter: (status: CharacterStatus) => void
//     clearAllFilters: () => void
//   }

//   const useCharacterStore: (() => CharacterState) & StoreApi<CharacterState>
//   export default useCharacterStore
// }
