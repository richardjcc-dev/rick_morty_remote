import * as React from 'react'
import { FaRegCircleCheck } from 'react-icons/fa6'
import type { Character } from '../interfaces/Characters'
interface CharacterCardProps {
  character: Character
  onClick: (characterData: Character) => void
}

const CharacterCard: React.FC<CharacterCardProps> = ({
  character,
  onClick,
}) => {
  const handleClick = () => {
    onClick(character)
  }

  return (
    <section className="card shadow character-card" onClick={handleClick}>
      <div className="row">
        <div className="col col-4 ">
          <img
            src={character.image}
            alt={character.name}
            className="character-img"
          />
        </div>
        <div className="col col-8 px-3 py-3">
          <div className="row h-100">
            <div className="col col-6 d-flex flex-column justify-content-between">
              <div>
                <h5 className="fw-normal text-truncate">{character.name}</h5>
                <p className="text-secondary text-truncate">
                  {character.species}
                </p>
              </div>
              <div>
                <p className="mb-2 text-secondary text-truncate">
                  Last known location
                </p>
                <p className="my-0 text-truncate">{character.location.name}</p>
              </div>
            </div>
            <div className="col col-6 d-flex flex-column justify-content-between">
              <div className="d-flex justify-content-end me-3">
                <span className="badge rounded-pill alive-badge px-3 py-2">
                  <FaRegCircleCheck className="me-1" />
                  <p className="my-0 fs-6 fw-normal">{character.status}</p>
                </span>
              </div>
              <div>
                <p className="mb-2 text-secondary">First seen in</p>
                <p className="my-0 text-truncate">{character.origin.name}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CharacterCard
