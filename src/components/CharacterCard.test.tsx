import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CharacterCard from './CharacterCard'
import useCharacterStore from 'rick_morty_host/characterStore'

jest.mock('rick_morty_host/characterStore')

const mockStore = useCharacterStore as jest.MockedFunction<
  typeof useCharacterStore
> & {
  mockAddFavorite: jest.Mock
  mockRemoveFavorite: jest.Mock
  mockFavorites: any[]
}

beforeEach(() => {
  mockStore.mockAddFavorite.mockClear()
  mockStore.mockRemoveFavorite.mockClear()
  mockStore.mockFavorites.length = 0
})

describe('<CharacterCard />', () => {
  const character = {
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    origin: { name: 'Earth (C-137)', url: '' },
    location: { name: 'Citadel of Ricks', url: '' },
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    episode: [],
    url: '',
    created: '',
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
    mockStore.mockFavorites.length = 0

    render(<CharacterCard character={character} onClick={onClickMock} />)
    const starButton = screen.getByLabelText('Añadir a favoritos')
    expect(starButton).toBeInTheDocument()
    expect(
      starButton.querySelector('svg[data-icon="star"]'),
    ).toBeInTheDocument()
  })

  it('shows filled star if character is a favorite', () => {
    mockStore.mockFavorites.push(character)

    render(<CharacterCard character={character} onClick={onClickMock} />)
    const starButton = screen.getByLabelText('Eliminar de favoritos')
    expect(starButton).toBeInTheDocument()
    expect(
      starButton.querySelector('svg[data-icon="star-fill"]'),
    ).toBeInTheDocument()
  })

  it('calls addFavorite when empty star is clicked', async () => {
    mockStore.mockFavorites.length = 0
    render(<CharacterCard character={character} onClick={onClickMock} />)

    const starButton = screen.getByLabelText('Añadir a favoritos')
    await userEvent.click(starButton)

    expect(mockStore.mockAddFavorite).toHaveBeenCalledTimes(1)
    expect(mockStore.mockAddFavorite).toHaveBeenCalledWith(character)
    expect(mockStore.mockRemoveFavorite).not.toHaveBeenCalled()
  })

  it('calls removeFavorite when filled star is clicked', async () => {
    mockStore.mockFavorites.push(character)
    render(<CharacterCard character={character} onClick={onClickMock} />)

    const starButton = screen.getByLabelText('Eliminar de favoritos')
    await userEvent.click(starButton)

    expect(mockStore.mockRemoveFavorite).toHaveBeenCalledTimes(1)
    expect(mockStore.mockRemoveFavorite).toHaveBeenCalledWith(character.id)
    expect(mockStore.mockAddFavorite).not.toHaveBeenCalled()
  })
})
