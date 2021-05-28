import React, {useState, useMemo} from 'react';


import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import Walletbox from '../../components/Walletbox';
import MessageBox from '../../components/MensageBox'

import expenses from '../../repositories/expenses';
import gains from '../../repositories/gains';
import listOfMonths from '../../utils/months';

import happyImg from '../../assets/happy.svg';
import sadImg from '../../assets/sad.svg';
import grinningImg from '../../assets/grinning.svg';


import {
    Container,
    Content,
} from './styles';

const Dashboard: React.FC = () => {

    const [monthSelected, setMonthSelected] = useState<number>(new Date().getMonth() + 1);
    const [yearSelected, setYearSelected] = useState<number>(new Date().getFullYear());

    const options = [
        {value:'wallace', label:'wallace'},
        {value:'maria', label:'maria'},
        {value:'ana', label:'ana'}
    ];

    const years = useMemo(() =>{
        let uniqueYears: number[] = [];

        [...expenses, ...gains].forEach(item => {
            const date = new Date(item.date);
            const year = date.getFullYear();

            if(!uniqueYears.includes(year)){
                uniqueYears.push(year)
            }
        });

        return uniqueYears.map(year => {
            return {
            value: year,
            label: year,
            }
        
        });

    },[]);


    const months  = useMemo(() => {
        return listOfMonths.map((month, index) => {
            return {
                value: index + 1,
                label: month,
            }
        });         
    },[]);

    
    const totalExpenses = useMemo(() =>{
        let total: number = 0;

        expenses.forEach(item => {
          const date = new Date(item.date);
          const year = date.getFullYear();
          const month = date.getMonth() +1;

          if(month === monthSelected && year === yearSelected){
              try{
                  total += Number(item.amount)
              }catch{
                  throw new Error('invalid amount! Amount must be number.')
              }
          }
        });
        return total;
    },[monthSelected, yearSelected]);


    const totalGais = useMemo(() =>{
        let total: number = 0;

        gains.forEach(item => {
          const date = new Date(item.date);
          const year = date.getFullYear();
          const month = date.getMonth() +1;

          if(month === monthSelected && year === yearSelected){
              try{
                  total += Number(item.amount)
              }catch{
                  throw new Error('invalid amount! Amount must be number.')
              }
          }
        });
        return total;
    },[monthSelected, yearSelected]);


    const totalBalance = useMemo(() =>{
        return totalGais - totalExpenses;
    },[totalGais, totalExpenses]);

    const message = useMemo(() =>{
        if(totalBalance < 0){
            return {
                title:"Que triste!",
                description:"Nesse mês, você gastou mais do que deveria.",
                footerText:"Verifique seus gastos e tente cortar algumas coisas desnecesssáiras.",
                icon: sadImg
            }
        }else if(totalBalance == 0){
            return{
                title:"Ufaa!",
                description:"Nesse mês, você gastou gastou exatamente o que ganhou.",
                footerText:"Tenha cuidado. no próximo mês tente poupar o seu dinheiro",
                icon: grinningImg
            }
        }else {
            return{
                title:"Muito bem!",
                 description:"Sua carteira está positiva",
                 footerText:"Contunue assim. Considere investir o seu saldo.",
                 icon: happyImg               
            }
        }
    },[totalBalance]);

    const handleMonthSelected = (month: string) => {
        try {
            const parseMonth = Number(month);
            setMonthSelected(parseMonth);
        }catch{
         throw new Error('invalid month value. Is accept 0 - 24.')
        }
    }

    const handleYearSelected = (year: string) => {
        try {
            const parseYear = Number(year);
            setYearSelected(parseYear);
        }catch{
         throw new Error('invalid year value. Is accept integer numbers')
        }
    }

    return (
        <Container>
           <ContentHeader title="Dashboard" lineColor="#F7931B">
            <SelectInput options={months} onChange={(e) => handleMonthSelected(e.target.value)} defaultValue={monthSelected}/>
                <SelectInput options={years} onChange={(e) => handleYearSelected(e.target.value)} defaultValue={yearSelected}/>
           </ContentHeader>
           <Content>
               <Walletbox
               title="saldo"
               amount={totalBalance}
               color="#4E41F0"
               footerlabel= "atualizado com base nas entradas e saidas"
               icon="dolar"
               
               />
               <Walletbox
               title="entradas"
               amount={totalGais}
               color="#F7931B"
               footerlabel= "atualizado com base nas entradas e saidas"
               icon="arrowUp"
               
               />
               <Walletbox
               title="saídas"
               amount={totalExpenses}
               color="#E44C4E"
               footerlabel= "atualizado com base nas entradas e saidas"
               icon="arrowDown"
               
               />

               <MessageBox
                 title={message.title}
                 description={message.description}
                 footerText={message.footerText}
                 icon={message.icon}
               />
           </Content>
        </Container>
    );
}

export default Dashboard;