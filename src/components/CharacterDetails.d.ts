import * as React from 'react';
interface CharacterDetailsProps {
    character: {
        name: string;
        status: string;
        species: string;
        gender: string;
        location: string;
        origin: string;
        image: string;
    };
    show: boolean;
    onHide: () => void;
}
declare const CharacterDetails: React.FC<CharacterDetailsProps>;
export default CharacterDetails;
