const mockAddFavorite = jest.fn()
const mockRemoveFavorite = jest.fn()
const mockClearAllFilters = jest.fn()
const mockSetNameFilter = jest.fn()
const mockSetSpeciesFilter = jest.fn()
const mockSetGenderFilter = jest.fn()
const mockSetStatusFilter = jest.fn()

// Este array simula el estado de `favorites` en el store.
// Lo manipularemos directamente en cada test si es necesario.
const mockFavorites: any[] = []

// Esta es la implementación mockeada del hook `useCharacterStore`.
// `mockImplementation` de Jest permite definir cómo se comporta tu mock.
const useCharacterStore = jest.fn((selector) => {
  // Si no se proporciona un selector (ej. const { action } = useStore()),
  // devolvemos un objeto con las acciones y el estado base.
  if (!selector) {
    return {
      addFavorite: mockAddFavorite,
      removeFavorite: mockRemoveFavorite,
      clearAllFilters: mockClearAllFilters,
      setNameFilter: mockSetNameFilter,
      setSpeciesFilter: mockSetSpeciesFilter,
      setGenderFilter: mockSetGenderFilter,
      setStatusFilter: mockSetStatusFilter,
      favorites: mockFavorites,
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
  }

  return selector({
    favorites: mockFavorites,
    addFavorite: mockAddFavorite,
    removeFavorite: mockRemoveFavorite,
    clearAllFilters: mockClearAllFilters,
    setNameFilter: mockSetNameFilter,
    setSpeciesFilter: mockSetSpeciesFilter,
    setGenderFilter: mockSetGenderFilter,
    setStatusFilter: mockSetStatusFilter,
    characters: [],
    loading: false,
    error: null,
    currentPage: 1,
    totalPages: 1,
    nameFilter: '',
    speciesFilter: '',
    genderFilter: '',
    statusFilter: '',
  })
})

;(useCharacterStore as any).mockAddFavorite = mockAddFavorite
;(useCharacterStore as any).mockRemoveFavorite = mockRemoveFavorite
;(useCharacterStore as any).mockFavorites = mockFavorites
;(useCharacterStore as any).mockClearAllFilters = mockClearAllFilters
;(useCharacterStore as any).mockSetNameFilter = mockSetNameFilter
;(useCharacterStore as any).mockSetSpeciesFilter = mockSetSpeciesFilter
;(useCharacterStore as any).mockSetGenderFilter = mockSetGenderFilter
;(useCharacterStore as any).mockSetStatusFilter = mockSetStatusFilter

export default useCharacterStore
