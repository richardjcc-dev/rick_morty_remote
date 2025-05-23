import * as React from 'react';
import type { Character } from '../interfaces/Characters';
interface CharacterDetailsProps {
    character: Character;
    show: boolean;
    onHide: () => void;
}
declare const CharacterDetails: React.FC<CharacterDetailsProps>;
export default CharacterDetails;
