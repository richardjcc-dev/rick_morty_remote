import { FaRegCircleCheck } from 'react-icons/fa6'

const CharacterCard = () => {
  return (
    <section className="card shadow character-card">
      <div className="row">
        <div className="col col-4 ">
          <img
            src="https://picsum.photos/seed/picsum/200/300"
            alt="character-img"
            className="character-img"
          />
        </div>
        <div className="col col-8 px-3 py-3">
          <div className="row h-100">
            <div className="col col-6 d-flex flex-column justify-content-between">
              <div>
                <h5 className="fw-normal">Name</h5>
                <p className="text-secondary">Human</p>
              </div>
              <div>
                <p className="mb-2 text-secondary">Last known location</p>
                <p className="my-0">Story Train</p>
              </div>
            </div>
            <div className="col col-6 d-flex flex-column justify-content-between">
              <div className="d-flex justify-content-end me-3">
                <span className="badge rounded-pill alive-badge px-3 py-2">
                  <FaRegCircleCheck className="me-1" />
                  <p className="my-0 fs-6 fw-normal">Alive</p>
                </span>
              </div>
              <div>
                <p className="mb-2 text-secondary">First seen in</p>
                <p className="my-0">Never Ricking Morty</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CharacterCard
