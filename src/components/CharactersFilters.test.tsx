// src/components/CharacterFilters.test.tsx

import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CharacterFilters from './CharactersFilters' // Asegúrate de que la ruta sea correcta
import useCharacterStore from 'rick_morty_host/characterStore' // Confirma la ruta

// Variables para nuestras funciones y estados mockeados
let mockSetSpeciesFilter: jest.Mock
let mockSetGenderFilter: jest.Mock
let mockSetStatusFilter: jest.Mock
let mockClearAllFilters: jest.Mock

let mockSpeciesFilter: string
let mockGenderFilter: string
let mockStatusFilter: string
let mockNameFilter: string

jest.mock('rick_morty_host/characterStore')

beforeEach(() => {
  mockSetSpeciesFilter = jest.fn()
  mockSetGenderFilter = jest.fn()
  mockSetStatusFilter = jest.fn()
  mockClearAllFilters = jest.fn()

  mockSpeciesFilter = ''
  mockGenderFilter = ''
  mockStatusFilter = ''
  mockNameFilter = ''
  ;(useCharacterStore as jest.Mock).mockImplementation((selector) => {
    const mockCharacterState = {
      setSpeciesFilter: mockSetSpeciesFilter,
      setGenderFilter: mockSetGenderFilter,
      setStatusFilter: mockSetStatusFilter,
      clearAllFilters: mockClearAllFilters,

      speciesFilter: mockSpeciesFilter,
      genderFilter: mockGenderFilter,
      statusFilter: mockStatusFilter,
      nameFilter: mockNameFilter,

      favorites: [],
      addFavorite: jest.fn(),
      removeFavorite: jest.fn(),
      setNameFilter: jest.fn(),
      characters: [],
      loading: false,
      error: null,
      currentPage: 1,
      totalPages: 1,
    }

    if (selector) {
      return selector(mockCharacterState)
    }
    return mockCharacterState
  })
})

afterEach(() => {
  jest.clearAllMocks()
})

describe('<CharacterFilters />', () => {
  it('Renderiza el botón de abrir filtros', () => {
    render(<CharacterFilters />)
    expect(
      screen.getByRole('button', { name: /open-filters/i }),
    ).toBeInTheDocument()
  })

  it('Abre el modal de filtros al hacer clic en el botón de settings', async () => {
    render(<CharacterFilters />)
    const settingsButton = screen.getByRole('button', { name: /open-filters/i })
    await userEvent.click(settingsButton)

    await waitFor(() => {
      expect(
        screen.getByRole('dialog', { name: /filtros avanzados/i }),
      ).toBeInTheDocument()
    })
  })

  it('Cierra el modal al hacer clic en el botón de cerrar', async () => {
    render(<CharacterFilters />)
    const settingsButton = screen.getByRole('button', { name: /open-filters/i })
    await userEvent.click(settingsButton)

    const closeButton = screen.getByRole('button', { name: /close/i }) // El botón de cerrar del modal de Bootstrap
    await userEvent.click(closeButton)

    await waitFor(() => {
      expect(
        screen.queryByRole('dialog', { name: /filtros avanzados/i }),
      ).not.toBeInTheDocument()
    })
  })

  // Test 4: Selecciona un filtro de especie y el estado local se actualiza
  it('Selecciona un filtro de especie y el estado local se actualiza', async () => {
    render(<CharacterFilters />)
    await userEvent.click(screen.getByRole('button', { name: /open-filters/i })) // Abre el modal

    const humanButton = screen.getByRole('button', { name: /humano/i })
    await userEvent.click(humanButton)

    // Verifica que el botón ahora tiene la clase 'btn-secondary' (activo)
    // Esto es una aserción sobre el estado visual del componente, no del store aún.
    expect(humanButton).toHaveClass('btn-secondary')
    expect(humanButton).not.toHaveClass('btn-outline-secondary')

    // Verifica que el mock del store NO ha sido llamado aún (porque no se ha aplicado)
    expect(mockSetSpeciesFilter).not.toHaveBeenCalled()
  })

  // Test 5: Selecciona un filtro de género y el estado local se actualiza
  it('Selecciona un filtro de género y el estado local se actualiza', async () => {
    render(<CharacterFilters />)
    await userEvent.click(screen.getByRole('button', { name: /open-filters/i })) // Abre el modal

    const maleButton = screen.getByRole('button', { name: /masculino/i })
    await userEvent.click(maleButton)

    expect(maleButton).toHaveClass('btn-secondary')
    expect(mockSetGenderFilter).not.toHaveBeenCalled()
  })

  // Test 6: Selecciona un filtro de estado y el estado local se actualiza
  it('Selecciona un filtro de estado y el estado local se actualiza', async () => {
    render(<CharacterFilters />)
    await userEvent.click(screen.getByRole('button', { name: /open-filters/i })) // Abre el modal

    const aliveButton = screen.getByRole('button', { name: /vivo/i })
    await userEvent.click(aliveButton)

    expect(aliveButton).toHaveClass('btn-secondary')
    expect(mockSetStatusFilter).not.toHaveBeenCalled()
  })

  // Test 7: Aplica los filtros seleccionados al store global
  it('Aplica los filtros seleccionados al store global', async () => {
    render(<CharacterFilters />)
    await userEvent.click(screen.getByRole('button', { name: /open-filters/i })) // Abre el modal

    // Selecciona algunos filtros
    await userEvent.click(screen.getByRole('button', { name: /humano/i }))
    await userEvent.click(screen.getByRole('button', { name: /masculino/i }))
    await userEvent.click(screen.getByRole('button', { name: /vivo/i }))

    // Haz clic en el botón "Aplicar filtros"
    const applyButton = screen.getByRole('button', { name: /aplicar filtros/i })
    await userEvent.click(applyButton)

    // Verifica que las acciones del store fueron llamadas con los valores correctos
    expect(mockSetSpeciesFilter).toHaveBeenCalledTimes(1)
    expect(mockSetSpeciesFilter).toHaveBeenCalledWith('Human')

    expect(mockSetGenderFilter).toHaveBeenCalledTimes(1)
    expect(mockSetGenderFilter).toHaveBeenCalledWith('Male')

    expect(mockSetStatusFilter).toHaveBeenCalledTimes(1)
    expect(mockSetStatusFilter).toHaveBeenCalledWith('Alive')

    // Verifica que el modal se cierra
    await waitFor(() => {
      expect(
        screen.queryByRole('dialog', { name: /filtros avanzados/i }),
      ).not.toBeInTheDocument()
    })
  })

  // Test 8: Limpia todos los filtros (locales y globales)
  it('Limpia todos los filtros (locales y globales)', async () => {
    // Inicializa el store con algunos filtros aplicados para este test
    mockSpeciesFilter = 'Human'
    mockGenderFilter = 'Male'
    mockStatusFilter = 'Alive'

    render(<CharacterFilters />)
    await userEvent.click(screen.getByRole('button', { name: /open-filters/i })) // Abre el modal

    // Verifica que los botones están inicialmente activos
    expect(screen.getByRole('button', { name: /humano/i })).toHaveClass(
      'btn-secondary',
    )
    expect(screen.getByRole('button', { name: /masculino/i })).toHaveClass(
      'btn-secondary',
    )
    expect(screen.getByRole('button', { name: /vivo/i })).toHaveClass(
      'btn-secondary',
    )

    // Haz clic en el botón "Limpiar filtros"
    const clearButton = screen.getByRole('button', { name: /limpiar filtros/i })
    await userEvent.click(clearButton)

    // Verifica que clearAllFilters del store fue llamado
    expect(mockClearAllFilters).toHaveBeenCalledTimes(1)

    // Verifica que el modal se cierra
    await waitFor(() => {
      expect(
        screen.queryByRole('dialog', { name: /filtros avanzados/i }),
      ).not.toBeInTheDocument()
    })

    // Re-abre el modal para verificar que el estado local se limpió
    await userEvent.click(screen.getByRole('button', { name: /open-filters/i }))
    expect(screen.getByRole('button', { name: /humano/i })).toHaveClass(
      'btn rounded-pill btn-secondary',
    )
    expect(screen.getByRole('button', { name: /masculino/i })).toHaveClass(
      'btn rounded-pill btn-secondary',
    )
    expect(screen.getByRole('button', { name: /vivo/i })).toHaveClass(
      'btn rounded-pill btn-secondary',
    )
  })

  // Test 9: Deseleccionar un filtro (alternar)
  it('Deseleccionar un filtro (alternar)', async () => {
    // Inicializa el store con un filtro activo
    mockSpeciesFilter = 'Human'
    render(<CharacterFilters />)
    await userEvent.click(screen.getByRole('button', { name: /open-filters/i })) // Abre el modal

    const humanButton = screen.getByRole('button', { name: /humano/i })
    expect(humanButton).toHaveClass('btn-secondary') // Debe estar activo inicialmente

    await userEvent.click(humanButton) // Haz clic de nuevo para deseleccionar

    expect(humanButton).toHaveClass('btn-outline-secondary') // Debe estar inactivo ahora
    expect(mockSetSpeciesFilter).not.toHaveBeenCalled() // Aún no se aplica al store
  })
})
