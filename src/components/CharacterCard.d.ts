import * as React from 'react';
import type { Character } from '../interfaces/Characters';
interface CharacterCardProps {
    character: Character;
    onClick: (characterData: Character) => void;
}
declare const CharacterCard: React.FC<CharacterCardProps>;
export default CharacterCard;
