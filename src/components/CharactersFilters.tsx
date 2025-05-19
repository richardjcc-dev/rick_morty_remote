import { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import { VscSettings } from 'react-icons/vsc'

const CharacterFilters = (props: any) => {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  return (
    <>
      <button
        type="button"
        className="btn btn-outline-secondary filters-btn"
        onClick={handleShow}
      >
        <VscSettings />
      </button>

      <Modal
        show={show}
        onHide={handleClose}
        dialogClassName="filters-modal"
        centered
        {...props}
      >
        <Modal.Header closeButton>
          <Modal.Title>Filtros avanzados</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex flex-column gap-4">
            <div>
              <p>Especie</p>
              <div className="d-flex gap-2">
                <button className="btn btn-outline-secondary rounded-pill">
                  <span>Humano</span>
                </button>
                <button className="btn btn-outline-secondary rounded-pill">
                  <span>Cronenbergs</span>
                </button>
                <button className="btn btn-outline-secondary rounded-pill">
                  <span>Meeseeks</span>
                </button>
                <button className="btn btn-outline-secondary rounded-pill">
                  <span>Arañas gigantes telépatas</span>
                </button>
              </div>
            </div>
            <div>
              <p>Género</p>
              <div className="d-flex gap-2">
                <button className="btn btn-outline-secondary rounded-pill">
                  <span>Masculino</span>
                </button>
                <button className="btn btn-outline-secondary rounded-pill">
                  <span>Femenino</span>
                </button>
                <button className="btn btn-outline-secondary rounded-pill">
                  <span>Desconocido</span>
                </button>
              </div>
            </div>
            <div>
              <p>Estado</p>
              <div className="d-flex gap-2">
                <button
                  type="button"
                  className="btn btn-outline-secondary rounded-pill"
                >
                  <span>Vivo</span>
                </button>
                <button className="btn btn-outline-secondary rounded-pill">
                  <span>Muerto</span>
                </button>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-success apply-filters-btn px-4"
            onClick={handleClose}
          >
            Aplicar filtros
          </button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default CharacterFilters
