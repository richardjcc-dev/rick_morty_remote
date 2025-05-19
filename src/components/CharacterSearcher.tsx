import { BsSearch } from 'react-icons/bs'

const CharacterSearcher = (props: any) => {
  const { value, onChange } = props
  return (
    <div className="input-container">
      <BsSearch className="input-icon" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="character-searcher"
        placeholder="Buscar por nombre de personaje"
      />
    </div>
  )
}

export default CharacterSearcher
