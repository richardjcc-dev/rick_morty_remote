import * as React from 'react'
interface CharacterCardProps {
  character: {
    name: string
    status: string
    species: string
    gender: string
    location: string
    origin: string
    image: string
  }
  onClick: (characterData: any) => void
}
declare const CharacterCard: React.FC<CharacterCardProps>
export default CharacterCard
