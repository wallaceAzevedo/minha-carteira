import React, {useMemo, useState, useEffect} from 'react';

import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import HistoryFinanceCard from '../../components/HistoryFinanceCard';

import gains from "../../repositories/gains";
import expenses from "../../repositories/expenses";
import formatCurrency from '../../utils/formatCurrency';
import formatDate from '../../utils/formatDate';

import {Container, Content, Filters} from './styles';
import { isTemplateTail } from 'typescript';

interface IRouteParams{
    match: {
        params: {
            type:string;
        }
    }
}

interface IData {
    id: string;
    description: string;
    amountFormatted: string;
    frequency: string;
    dataFormatted: string;
    tagColor: string;
}

const List: React.FC<IRouteParams> = ({ match }) => {

    const [data, setData] = useState<IData[]>([]);

    const { type } = match.params;

    const title = useMemo(() =>{
      return type === 'entry-balance' ? 'Entradas' : 'Saídas'
    },[type]);

    const lineColor = useMemo(() =>{
        return type === 'entry-balance' ? '#F7931B' : '#E44C4E'
      },[type]);

      const listData = useMemo(() =>{
        return type === 'entry-balance' ? gains : expenses;
      },[type]);  

   

    const months = [
        {value:'5', label:'Maio'},
        {value:'6', label:'Junho'},
        {value:'7', label:'Julho'}
    ];

    const years = [
        {value:'2021', label:2021},
        {value:'2020', label:2020},
        {value:'2019', label:2019}
    ];

    useEffect(() => {
        const response = listData.map( item => {  
            return {
                id: String(Math.random () * data.length),
                description: item.description,
                amountFormatted: formatCurrency(Number(item.amount)),
                frequency: item.frequency,
                dataFormatted: formatDate(item.date),
                tagColor: item.frequency === 'recorrente' ? '#4E41F0' : '#E44C4E'
            }
        }) 
       setData(response);
    },[]);
   
    return (
        <Container>
            <ContentHeader title={title} lineColor={lineColor}>
               <SelectInput options={months}/>
               <SelectInput options={years}/>
           </ContentHeader>

           <Filters>
              <button 
              type="button"
              className=" tag-filter tag-filter-Recorrent"
              >
                  Recorrentes
              </button>

              <button 
              type="button"
              className=" tag-filter tag-filter-eventual"
              >
                  Eventuais
              </button>
           </Filters>
            <Content>
               {
                    data.map(item => (
                        <HistoryFinanceCard
                            key={item.id}
                            tagColor={item.tagColor}
                            title={item.description}
                            subtitle={item.dataFormatted}
                            amount={item.amountFormatted}
                        />
                    ))
                }

            </Content>

        </Container>
    );
}

export default List;