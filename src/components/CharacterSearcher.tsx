import * as React from 'react'
import { useCallback, useRef, useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import useCharacterStore from 'rick_morty_host/characterStore'

const CharacterSearcher = () => {
  const { nameFilter, setNameFilter } = useCharacterStore()
  const [inputValue, setInputValue] = useState(nameFilter)
  const debounceTimeoutRef = useRef<number | null>(null)

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const name = event.target.value
      setInputValue(name)

      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current)
      }

      debounceTimeoutRef.current = window.setTimeout(() => {
        setNameFilter(name)
      }, 500)
    },
    [setNameFilter],
  )

  // const handleClearSearch = useCallback(() => {
  //   if (debounceTimeoutRef.current) {
  //     clearTimeout(debounceTimeoutRef.current)
  //   }
  //   setInputValue('')
  //   setNameFilter('')
  // }, [setNameFilter])

  // React.useEffect(() => {
  //   setInputValue(nameFilter)
  // }, [nameFilter])

  return (
    <div className="input-container">
      <BsSearch className="input-icon" />
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        className="character-searcher"
        placeholder="Buscar por nombre de personaje"
      />
    </div>
  )
}

export default CharacterSearcher
