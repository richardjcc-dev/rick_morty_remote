import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import CharacterSearcher from './CharacterSearcher'
import useCharacterStore from 'rick_morty_host/characterStore'

let mockSetNameFilter: jest.Mock
let mockNameFilter: string

jest.mock('rick_morty_host/characterStore')

beforeEach(() => {
  mockSetNameFilter = jest.fn()
  mockNameFilter = ''
  ;(useCharacterStore as jest.Mock).mockImplementation((selector) => {
    const mockCharacterState = {
      nameFilter: mockNameFilter,
      setNameFilter: mockSetNameFilter,

      favorites: [],
      addFavorite: jest.fn(),
      removeFavorite: jest.fn(),
      clearAllFilters: jest.fn(),
      setSpeciesFilter: jest.fn(),
      setGenderFilter: jest.fn(),
      setStatusFilter: jest.fn(),
      characters: [],
      loading: false,
      error: null,
      currentPage: 1,
      totalPages: 1,
      speciesFIlter: '',
      genderFilter: '',
      statusFilter: '',
    }
    return selector ? selector(mockCharacterState) : mockCharacterState
  })
  jest.useFakeTimers()
})

afterEach(() => {
  jest.runOnlyPendingTimers()
  jest.useRealTimers()
  jest.clearAllMocks()
})

describe('<CharacterSearcher />', () => {
  it('Renderiza el input de búsqueda', () => {
    render(<CharacterSearcher />)
    expect(
      screen.getByRole('textbox', { name: 'search-character' }),
    ).toBeInTheDocument()
  })

  // --- NUEVO TEST DE DIAGNÓSTICO ---
  it('DIAGNÓSTICO: handleInputChange is called by fireEvent.change', async () => {
    render(<CharacterSearcher />)
    const searchInput = screen.getByRole('textbox', {
      name: 'search-character',
    }) as HTMLInputElement

    // Dispara el evento 'change' directamente
    fireEvent.change(searchInput, { target: { value: 'Rick' } })

    // Verifica si el valor del input se actualizó (esto implica que setInputValue se llamó)
    expect(searchInput.value).toBe('Rick')

    // Ahora, ejecuta los temporizadores para que el debounce se active
    jest.runAllTimers()

    // Espera la aserción final para asegurar que setNameFilter se llamó
    await waitFor(() => {
      expect(mockSetNameFilter).toHaveBeenCalledTimes(1)
    })
    expect(mockSetNameFilter).toHaveBeenCalledWith('Rick')
  })

  it('calls setNameFilter with the typed value after debounce (using fireEvent)', async () => {
    render(<CharacterSearcher />)
    const searchInput = screen.getByRole('textbox', {
      name: 'search-character',
    }) as HTMLInputElement

    // Simula el cambio del valor del input directamente con fireEvent
    fireEvent.change(searchInput, { target: { value: 'Rick' } })

    // Verifica que el input se actualizó
    expect(searchInput.value).toBe('Rick')
    // Verifica que setNameFilter aún no ha sido llamado
    expect(mockSetNameFilter).not.toHaveBeenCalled()

    // Ejecuta todos los temporizadores pendientes (incluido el debounce)
    jest.runAllTimers()

    // Espera la aserción final
    await waitFor(() => {
      expect(mockSetNameFilter).toHaveBeenCalledTimes(1)
    })
    expect(mockSetNameFilter).toHaveBeenCalledWith('Rick')
  })

  it('Muestra el filtro de nombre actual de la store', () => {
    mockNameFilter = 'Morty'
    render(<CharacterSearcher />)
    const searchInput = screen.getByRole('textbox', {
      name: /search-character/i,
    })
    expect(searchInput).toHaveValue('Morty')
  })

  it('Limpia el input cuando el filtro de nombre de la store se vacía', async () => {
    mockNameFilter = 'Test'

    const { rerender } = render(<CharacterSearcher />)
    const searchInput = screen.getByRole('textbox', {
      name: 'search-character',
    })
    expect(searchInput).toHaveValue('Test')

    mockNameFilter = ''

    rerender(<CharacterSearcher />)

    await waitFor(() => {
      expect(searchInput).toHaveValue('')
    })
  })
})
