const useCharacterStore = jest.fn(() => ({
  favorites: [],
  addFavorite: jest.fn(),
  removeFavorite: jest.fn(),
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
}))

export default useCharacterStore
