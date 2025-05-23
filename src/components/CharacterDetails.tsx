import * as React from 'react'
import Modal from 'react-bootstrap/Modal'
import type { Character } from '../interfaces/Characters'
import { FaRegCircleCheck } from 'react-icons/fa6'
import { IoClose } from 'react-icons/io5'

interface CharacterDetailsProps {
  character: Character
  show: boolean
  onHide: () => void
}

const CharacterDetails: React.FC<CharacterDetailsProps> = ({
  character,
  show,
  onHide,
}) => {
  const modalTitleId = `character-details-modal-title-${character.id}`
  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        dialogClassName="details-modal-container"
        centered
        animation={false}
        backdrop="static"
        enforceFocus={false}
        aria-labelledby={modalTitleId}
      >
        <div className="details-modal-content card">
          <Modal.Header className="character-details-header mt-0 mx-0">
            <div className="d-flex justify-content-end w-100">
              <button
                type="button"
                className="btn btn-light close-btn"
                onClick={onHide}
                aria-label="close-details"
              >
                <IoClose className="fs-4 text-secondary" />
              </button>
            </div>
          </Modal.Header>
          <div className="card-body pt-0">
            <Modal.Body>
              <div className="d-flex gap-3">
                <div>
                  <img
                    src={character.image}
                    alt={`${character.name} image`}
                    className="character-details-img"
                  />
                </div>
                <div>
                  <Modal.Title id={modalTitleId} className="fw-bold">
                    <h4 role="heading">{character.name}</h4>
                  </Modal.Title>
                  <p>{character.species}</p>
                </div>
              </div>
              <div className="row d-flex ms-1 gap-3">
                <div className="card shadow col col-3">
                  <div className="card-body px-1">
                    <h5 className="mb-3">Información</h5>
                    <div className="d-flex flex-column gap-2">
                      <span className="fw-normal text-secondary">Género</span>
                      <span>{character.gender}</span>

                      <span className="fw-normal text-secondary">Origen</span>
                      <span>{character.origin.name}</span>

                      <span className="fw-normal text-secondary">Estado</span>
                      <span className="badge rounded-pill alive-badge w-75 px-3 py-2">
                        <FaRegCircleCheck className="me-1" />
                        <p className="my-0 fs-6 fw-normal">
                          {character.status}
                        </p>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="card shadow col col-8">
                  <div className="card-body">
                    <h5 className="mb-3">Episodios</h5>
                    <div className="row">
                      <div className="d-flex flex-column col col-3">
                        <span className="text-secondary">S01 E06</span>
                        <span className="text-secondary">S01 E06</span>
                        <span className="text-secondary">S01 E06</span>
                        <span className="text-secondary">S01 E06</span>
                        <span className="text-secondary">S01 E06</span>
                      </div>
                      <div className="d-flex flex-column col col-9">
                        <span>Piloto</span>
                        <span>Rick potion</span>
                        <span>M.Night Shaym-Aliens</span>
                        <span>Piloto</span>
                        <span>Rick potion</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mt-3 ms-1">
                <div className="col col-6">
                  <p className="mb-2 text-secondary">First seen in</p>
                  <p className="my-0">{character.origin.name}</p>
                </div>
                <div className="col col-6">
                  <p className="mb-2 text-secondary">Last known location</p>
                  <p className="my-0">{character.location.name}</p>
                </div>
              </div>
            </Modal.Body>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default CharacterDetails
