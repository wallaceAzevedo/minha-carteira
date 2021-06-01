import React from 'react';



import {
    Container,
    ToggleLabel,
    ToggleSelector

} from './styles'

interface ItoggleProps {
    labelLeft: string;
    labelRigth:string;
    cheked:boolean;
    onChange():void;
}

const Toggle: React.FC<ItoggleProps> = ({
    labelLeft,
    labelRigth,
    cheked,
    onChange
}) => (
    <Container>
        <ToggleLabel>{labelLeft}</ToggleLabel>
           <ToggleSelector
             checked={cheked}
             uncheckedIcon={false}
             checkedIcon={false}
             onChange={onChange}
           />
        <ToggleLabel>{labelRigth}</ToggleLabel>
    </Container>
)

export default Toggle;