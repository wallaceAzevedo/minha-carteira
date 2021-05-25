import React from 'react';
import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';

import {Container} from './styles';

const List: React.FC = () => {
    const options = [
        {value:'wallace', label:'wallace'},
        {value:'maria', label:'maria'},
        {value:'ana', label:'ana'}
    ];
    return (
        <Container>
            <ContentHeader title="Saidas" lineColor="#E44C4E">
               <SelectInput options={options}/>
           </ContentHeader>
        </Container>
    );
}

export default List;