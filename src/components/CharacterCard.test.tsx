import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CharacterCard from './CharacterCard'
import useCharacterStore from 'rick_morty_host/characterStore'

let mockAddFavorite: jest.Mock
let mockRemoveFavorite: jest.Mock
let mockFavorites: any[]

jest.mock('rick_morty_host/characterStore')

beforeEach(() => {
  mockAddFavorite = jest.fn()
  mockRemoveFavorite = jest.fn()
  mockFavorites = []
  ;(useCharacterStore as jest.Mock).mockImplementation((selector) => {
    const mockCharacterState = {
      favorites: mockFavorites,
      addFavorite: mockAddFavorite,
      removeFavorite: mockRemoveFavorite,

      clearAllFilters: jest.fn(),
      setNameFilter: jest.fn(),
      setSpeciesFilter: jest.fn(),
      setGenderFilter: jest.fn(),
      setStatusFilter: jest.fn(),
      characters: [],
      loading: false,
      error: null,
      currentPage: 1,
      totalPages: 1,
      nameFilter: '',
      speciesFilter: '',
      genderFilter: '',
      statusFilter: '',
    }

    if (selector) {
      return selector(mockCharacterState)
    }

    return mockCharacterState
  })
})

describe('<CharacterCard />', () => {
  const character = {
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    gender: 'Male',
    origin: { name: 'Earth (C-137)', url: '' },
    location: { name: 'Citadel of Ricks', url: '' },
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    episode: [],
    url: '',
    created: '',
    type: '',
  }

  const onClickMock = jest.fn()

  it('renders character details correctly', () => {
    render(<CharacterCard character={character} onClick={onClickMock} />)
    expect(
      screen.getByRole('heading', { name: /rick sanchez/i }),
    ).toBeInTheDocument()
    expect(screen.getByText('Alive')).toBeInTheDocument()
    expect(screen.getByText('Human')).toBeInTheDocument()
    expect(screen.getByAltText('Rick Sanchez')).toBeInTheDocument()
  })

  it('calls onClick prop when card is clicked', async () => {
    render(<CharacterCard character={character} onClick={onClickMock} />)
    const cardElement = screen.getByText('Rick Sanchez').closest('.card')
    await userEvent.click(cardElement!)
    expect(onClickMock).toHaveBeenCalledTimes(1)
    expect(onClickMock).toHaveBeenCalledWith(character)
  })

  it('shows empty star if character is not a favorite', () => {
    render(<CharacterCard character={character} onClick={onClickMock} />)
    const starButton = screen.getByRole('button', { name: /favorites-button/i })
    expect(starButton).toBeInTheDocument()
  })

  it('shows filled star if character is a favorite', () => {
    mockFavorites.push(character)
    render(<CharacterCard character={character} onClick={onClickMock} />)
    const starButton = screen.getByRole('button', { name: /favorites-button/i })
    expect(starButton).toBeInTheDocument()
  })

  it('calls addFavorite when empty star is clicked', async () => {
    render(<CharacterCard character={character} onClick={onClickMock} />)
    const starButton = screen.getByRole('button', { name: /favorites-button/i })
    await userEvent.click(starButton)

    expect(mockAddFavorite).toHaveBeenCalledTimes(1)
    expect(mockAddFavorite).toHaveBeenCalledWith(character)
    expect(mockRemoveFavorite).not.toHaveBeenCalled()
  })

  it('calls removeFavorite when filled star is clicked', async () => {
    mockFavorites.push(character)
    render(<CharacterCard character={character} onClick={onClickMock} />)
    const starButton = screen.getByRole('button', { name: /favorites-button/i })
    await userEvent.click(starButton)

    expect(mockRemoveFavorite).toHaveBeenCalledTimes(1)
    expect(mockRemoveFavorite).toHaveBeenCalledWith(character.id)
    expect(mockAddFavorite).not.toHaveBeenCalled()
  })
})
