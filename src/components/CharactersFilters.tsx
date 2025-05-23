import { useCallback, useMemo, useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import { VscSettings } from 'react-icons/vsc'
import useCharacterStore from 'rick_morty_host/characterStore'

interface FilterOption {
  value: string
  label: string
}

const CharacterFilters = (props: any) => {
  const [show, setShow] = useState(false)
  const handleClose = useCallback(() => setShow(false), [])
  const handleShow = useCallback(() => setShow(true), [])
  const {
    speciesFilter,
    genderFilter,
    statusFilter,
    setSpeciesFilter,
    setGenderFilter,
    setStatusFilter,
    clearAllFilters,
  } = useCharacterStore()

  const [pendingSpecies, setPendingSpecies] = useState<string>(speciesFilter)
  const [pendingGender, setPendingGender] = useState<string>(genderFilter)
  const [pendingStatus, setPendingStatus] = useState<string>(statusFilter)

  useEffect(() => {
    if (show) {
      setPendingSpecies(speciesFilter)
      setPendingGender(genderFilter)
      setPendingStatus(statusFilter)
    }
  }, [show, speciesFilter, genderFilter, statusFilter])

  const pendingFilterMap = useMemo(
    () => ({
      species: {
        state: pendingSpecies,
        setter: setPendingSpecies,
      },
      gender: {
        state: pendingGender,
        setter: setPendingGender,
      },
      status: {
        state: pendingStatus,
        setter: setPendingStatus,
      },
    }),
    [
      pendingSpecies,
      pendingGender,
      pendingStatus,
      setPendingSpecies,
      setPendingGender,
      setPendingStatus,
    ],
  )

  const handleFilterClick = useCallback(
    (type: 'species' | 'gender' | 'status', value: string) => {
      const { state, setter } = pendingFilterMap[type]
      setter(state === value ? '' : value)
    },
    [pendingFilterMap],
  )

  const isFilterActive = useCallback(
    (type: 'species' | 'gender' | 'status', value: string) => {
      return pendingFilterMap[type].state === value
    },
    [pendingFilterMap],
  )

  const handleApplyFilters = useCallback(() => {
    if (pendingSpecies !== speciesFilter) setSpeciesFilter(pendingSpecies)
    if (pendingGender !== genderFilter) setGenderFilter(pendingGender)
    if (pendingStatus !== statusFilter) setStatusFilter(pendingStatus)

    handleClose()
  }, [
    pendingSpecies,
    pendingGender,
    pendingStatus,
    speciesFilter,
    genderFilter,
    statusFilter,
    setSpeciesFilter,
    setGenderFilter,
    setStatusFilter,
    handleClose,
  ])

  const handleClearAllFilters = useCallback(() => {
    setPendingSpecies('')
    setPendingGender('')
    setPendingStatus('')

    clearAllFilters()

    handleClose()
  }, [clearAllFilters, handleClose])

  const speciesOptions: FilterOption[] = [
    { value: 'Human', label: 'Humano' },
    { value: 'Cronenberg', label: 'Cronenberg' },
    { value: 'Animal', label: 'Animal' },
    { value: 'Mythological Creature', label: 'Criatura Mitológica' },
  ]

  const genderOptions: FilterOption[] = [
    { value: 'Male', label: 'Masculino' },
    { value: 'Female', label: 'Femenino' },
    { value: 'unknown', label: 'Desconocido' },
  ]

  const statusOptions: FilterOption[] = [
    { value: 'Alive', label: 'Vivo' },
    { value: 'Dead', label: 'Muerto' },
  ]

  const modalTitleId = 'character-filters-modal-title'

  return (
    <>
      <button
        type="button"
        className="btn btn-outline-secondary filters-btn"
        onClick={handleShow}
        aria-label="open-filters"
      >
        <VscSettings className="fs-5" />
      </button>

      <Modal
        show={show}
        onHide={handleClose}
        dialogClassName="filters-modal"
        centered
        {...props}
        aria-labelledby={modalTitleId}
      >
        <Modal.Header closeButton>
          <Modal.Title id={modalTitleId}>Filtros avanzados</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex flex-column gap-4">
            <div>
              <p>Especie</p>
              <div className="d-flex gap-2">
                {speciesOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    className={`btn rounded-pill ${isFilterActive('species', option.value) ? 'btn-secondary' : 'btn-outline-secondary'}`}
                    onClick={() => handleFilterClick('species', option.value)}
                  >
                    <span>{option.label}</span>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p>Género</p>
              <div className="d-flex gap-2">
                {genderOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    className={`btn rounded-pill ${isFilterActive('gender', option.value) ? 'btn-secondary' : 'btn-outline-secondary'}`}
                    onClick={() => handleFilterClick('gender', option.value)}
                  >
                    <span>{option.label}</span>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p>Estado</p>
              <div className="d-flex gap-2">
                {statusOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    className={`btn rounded-pill ${isFilterActive('status', option.value) ? 'btn-secondary' : 'btn-outline-secondary'}`}
                    onClick={() => handleFilterClick('status', option.value)}
                  >
                    <span>{option.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-secondary clear-filters-btn px-4"
            onClick={handleClearAllFilters}
          >
            Limpiar filtros
          </button>
          <button
            type="button"
            className="btn btn-success apply-filters-btn px-4"
            onClick={handleApplyFilters}
          >
            Aplicar filtros
          </button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default CharacterFilters
