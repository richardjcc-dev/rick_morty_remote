// src/components/CharacterDetails.test.tsx

import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CharacterDetails from './CharacterDetails'

const mockCharacter = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  type: '',
  gender: 'Male',
  origin: {
    name: 'Earth (C-137)',
    url: 'https://rickandmortyapi.com/api/location/1',
  },
  location: {
    name: 'Citadel of Ricks',
    url: 'https://rickandmortyapi.com/api/location/3',
  },
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  episode: [
    'https://rickandmortyapi.com/api/episode/1',
    'https://rickandmortyapi.com/api/episode/2',
    'https://rickandmortyapi.com/api/episode/3',
  ],
  url: 'https://rickandmortyapi.com/api/character/1',
  created: '2017-11-04T18:48:46.250Z',
}

describe('<CharacterDetails />', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })
  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
    document.body.innerHTML = ''
  })

  it('El modal no se renderiza cuando show es false', () => {
    const onHideMock = jest.fn()
    render(
      <CharacterDetails
        character={mockCharacter}
        show={false}
        onHide={onHideMock}
      />,
    )
    expect(
      screen.queryByRole('dialog', { name: mockCharacter.name }),
    ).not.toBeInTheDocument()
  })

  it('El modal se renderiza y muestra la información básica del personaje cuando show es true', async () => {
    const onHideMock = jest.fn()
    render(
      <CharacterDetails
        character={mockCharacter}
        show={true}
        onHide={onHideMock}
      />,
    )

    await waitFor(() => {
      expect(
        screen.getByRole('heading', { name: mockCharacter.name }),
      ).toBeInTheDocument()
    })

    expect(
      screen.getByRole('dialog', { name: mockCharacter.name }),
    ).toBeInTheDocument()

    expect(screen.getByText(mockCharacter.species)).toBeInTheDocument()
    expect(screen.getByAltText(`${mockCharacter.name} image`)).toHaveAttribute(
      'src',
      mockCharacter.image,
    )
  })

  it('Muestra la información detallada (Género, Origen, Estado, Ubicación)', async () => {
    const onHideMock = jest.fn()
    render(
      <CharacterDetails
        character={mockCharacter}
        show={true}
        onHide={onHideMock}
      />,
    )

    await waitFor(() => {
      expect(
        screen.getByRole('dialog', { name: mockCharacter.name }),
      ).toBeInTheDocument()
    })

    expect(screen.getByText('Género')).toBeInTheDocument()
    expect(screen.getByText(mockCharacter.gender)).toBeInTheDocument()

    expect(screen.getByText('Origen')).toBeInTheDocument()
    expect(screen.getAllByText(mockCharacter.origin.name)).toBeInTheDocument()

    expect(screen.getByText('Estado')).toBeInTheDocument()
    expect(
      screen.getByText(mockCharacter.status, { selector: 'p' }),
    ).toBeInTheDocument()

    expect(screen.getAllByText('First seen in')).toBeInTheDocument()
    expect(
      screen.getByText(mockCharacter.origin.name, { selector: 'p' }),
    ).toBeInTheDocument()
    expect(screen.getByText('Last known location')).toBeInTheDocument()
    expect(
      screen.getAllByText(mockCharacter.location.name, { selector: 'p' }),
    ).toBeInTheDocument()
  })

  it('Muestra la sección de episodios', async () => {
    const onHideMock = jest.fn()
    render(
      <CharacterDetails
        character={mockCharacter}
        show={true}
        onHide={onHideMock}
      />,
    )

    await waitFor(() => {
      expect(
        screen.getByRole('dialog', { name: mockCharacter.name }),
      ).toBeInTheDocument()
    })

    expect(
      screen.getByRole('heading', { name: 'Episodios' }),
    ).toBeInTheDocument()
    expect(screen.getAllByText('S01 E06').length).toBe(5)
    expect(screen.getAllByText('Piloto')).toBeInTheDocument()
    expect(screen.getAllByText('Rick potion')).toBeInTheDocument()
    expect(screen.getAllByText('M.Night Shaym-Aliens')).toBeInTheDocument()
  })

  it('Llama a onHide cuando se hace clic en el botón de cerrar', async () => {
    const onHideMock = jest.fn()
    render(
      <CharacterDetails
        character={mockCharacter}
        show={true}
        onHide={onHideMock}
      />,
    )

    await waitFor(() => {
      expect(
        screen.getByRole('dialog', { name: mockCharacter.name }),
      ).toBeInTheDocument()
    })

    const closeButton = screen.getByRole('button', {
      name: /close-details/i,
    })
    fireEvent.click(closeButton)

    expect(onHideMock).toHaveBeenCalledTimes(1)
    // jest.runAllTimers()
    jest.runOnlyPendingTimers()

    await waitFor(() => {
      expect(
        screen.queryByRole('dialog', { name: mockCharacter.name }),
      ).not.toBeInTheDocument()
    })
  })

  // // Test 6: El modal se cierra al hacer clic fuera de él (interacción por defecto de Modal de React-Bootstrap)
  // it('calls onHide when clicking outside the modal (backdrop)', async () => {
  //   const onHideMock = jest.fn()
  //   render(
  //     <CharacterDetails
  //       character={mockCharacter}
  //       show={true}
  //       onHide={onHideMock}
  //     />,
  //   )

  //   await waitFor(() => {
  //     expect(
  //       screen.getByRole('dialog', { name: mockCharacter.name }),
  //     ).toBeInTheDocument()
  //   })

  //   // Usar fireEvent.click en lugar de userEvent.click
  //   // El backdrop suele tener role="presentation"
  //   fireEvent.click(screen.getByRole('dialog')) // <--- CAMBIO A FIREVENT

  //   expect(onHideMock).toHaveBeenCalledTimes(1)

  //   // --- NUEVA LÍNEA CLAVE ---
  //   // Avanza los timers para simular que la animación de cierre ha terminado.
  //   jest.runAllTimers() // O jest.runOnlyPendingTimers();

  //   await waitFor(() => {
  //     expect(
  //       screen.queryByRole('dialog', { name: mockCharacter.name }),
  //     ).not.toBeInTheDocument()
  //   })
  // })
})
