import * as React from 'react'
import { FaRegCircleCheck } from 'react-icons/fa6'
import type { Character } from '../interfaces/Characters'
import { BsStar, BsStarFill } from 'react-icons/bs'
import useCharacterStore from 'rick_morty_host/characterStore'

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

  const { addFavorite, removeFavorite } = useCharacterStore()
  const isCharacterFavorite = useCharacterStore((state: any) => {
    return state.favorites?.some((fav: any) => fav.id === character.id) || false
  })

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (isCharacterFavorite) {
      removeFavorite(character.id)
    } else {
      addFavorite(character)
    }
  }

  return (
    <section className="card shadow character-card" onClick={handleClick}>
      <div className="row d-flex flex-wrap">
        <div
          className="col col-md-4 col-lg-4 col-xl-4"
          style={{ position: 'relative' }}
        >
          <img
            src={character.image}
            alt={character.name}
            className="character-img"
          />
          <button
            className="favorite-icon"
            aria-label="favorites-button"
            type="button"
            onClick={handleFavoriteClick}
          >
            {isCharacterFavorite ? (
              <BsStarFill size={20} color="gold" />
            ) : (
              <BsStar size={20} />
            )}
          </button>
        </div>
        <div className="col col-md-8 col-lg-8 col-xl-8 px-3 py-3">
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
