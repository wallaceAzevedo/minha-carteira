import React, {useState, useMemo, useCallback} from 'react';


import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import Walletbox from '../../components/Walletbox';
import MessageBox from '../../components/MensageBox'
import PieChartBox from '../../components/PieChartBox';
import HistoryBox from '../../components/HistoryBox';
import BarChartBox from "../../components/BarChartBox";

import expenses from '../../repositories/expenses';
import gains from '../../repositories/gains';
import listOfMonths from '../../utils/months';

import happyImg from '../../assets/happy.svg';
import sadImg from '../../assets/sad.svg';
import grinningImg from '../../assets/grinning.svg';
import opsImg from '../../assets/ops.svg';


import {
    Container,
    Content,
} from './styles';

const Dashboard: React.FC = () => {

    const [monthSelected, setMonthSelected] = useState<number>(new Date().getMonth() + 1);
    const [yearSelected, setYearSelected] = useState<number>(new Date().getFullYear());


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
        }else if(totalGais === 0 && totalExpenses === 0) {
            return{
                title:"Op's!",
                description:"Nesse mês, não há registros de entradas ou saídas.",
                footerText:"Parece que você não fez nenhum registro no mês e ano selecionado.",
                icon: opsImg
            }
        }
        else if(totalBalance === 0){
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
    },[totalBalance, totalGais, totalBalance]);

    const relationExpensesVersusGains = useMemo(() =>{
        const total = totalGais + totalExpenses;
       
        const percentGains = Number(((totalGais / total) * 100).toFixed(1));
        const percentExpenses = Number(((totalExpenses / total) * 100).toFixed(1));

        const data =[
        {
            name: "Entradas",
            value: totalGais,
            percent: percentGains ? percentGains : 0,
            color:'#E44C4E'
        },

        {
            name: "Saídas",
            value: totalExpenses,
            percent: percentExpenses ? percentExpenses : 0,
            color: '#F7931B'
        },
    ]

    return data;

    },[totalGais, totalExpenses]);

    const historyData = useMemo(() => {
        return listOfMonths.map((_, month)=>{

            let amountEntry = 0;
            gains.forEach(gain => {
            const date = new Date(gain.date);
            const gainMonth = date.getMonth();
            const gainYear = date.getFullYear();

            if(gainMonth === month && gainYear === yearSelected){
                try{
                amountEntry += Number(gain.amount); 
                }catch{
                throw new Error('amountEntry is invalid. amountEntry must be valid number')
                }
            }
            });

            let amountOutPut = 0;
            expenses.forEach(expense => {
            const date = new Date(expense.date);
            const expenseMonth = date.getMonth();
            const expenseYear = date.getFullYear();

            if(expenseMonth === month && expenseYear === yearSelected){
                try{
                    amountOutPut += Number(expense.amount); 
                }catch{
                throw new Error('amountOutPut is invalid. amountOutPut must be valid number')
                }
            }
            });

            return {
                monthNumber:month,
                month:listOfMonths[month].substr(0, 3),
                amountEntry,
                amountOutPut
            }
        })
        .filter(item =>{
            const currentMonth = new Date().getMonth();
            const currentYear = new Date().getFullYear();

            return(yearSelected === currentYear && item.monthNumber <= currentMonth) || (yearSelected < currentYear)
        })
    },[yearSelected]);

    const relationExpensesRecurrentVersusEventual = useMemo(() => {
      let amountRecurrent = 0;
      let amountEventual = 0;

        expenses
         .filter((expenses) =>{
          const date = new Date(expenses.date);
          const year = date.getFullYear();
          const month = date.getMonth() +1;

          return month === monthSelected && year === yearSelected;
        })
        .forEach((expense) => {
            if(expense.frequency === 'recorrente'){
                return amountRecurrent +=Number(expense.amount);
            }
           
            if(expense.frequency === 'eventual'){
                    return amountEventual +=Number(expense.amount);
            }
        });

        const total = amountRecurrent + amountEventual;

        const percentRecurrent = Number(((amountRecurrent/ total) *100).toFixed(1));
        const percentEventual= Number(((amountEventual/ total) *100).toFixed(1));

        return [
            {
              name:'Recorrentes',
              amount: amountRecurrent,
              percent: percentRecurrent ? percentRecurrent : 0 ,
              color:"#F7931B"
            },
            {
                name:'Eventual',
                amount: amountEventual,
                percent: percentEventual ? percentEventual : 0 ,
                color:"#E44C4E"
              }
        ];
    },[monthSelected, yearSelected]);

    const relationGaisRecurrentVersusEventual = useMemo(() => {
        let amountRecurrent = 0;
        let amountEventual = 0;
  
          gains
           .filter((gain) =>{
            const date = new Date(gain.date);
            const year = date.getFullYear();
            const month = date.getMonth() +1;
  
            return month === monthSelected && year === yearSelected;
          })
          .forEach((gain) => {
              if(gain.frequency === 'recorrente'){
                  return amountRecurrent +=Number(gain.amount);
              }
             
              if(gain.frequency === 'eventual'){
                      return amountEventual +=Number(gain.amount);
              }
          });
  
          const total = amountRecurrent + amountEventual;

          const recurrentPercent = Number(((amountRecurrent/ total) *100).toFixed(1));
          const eventualPercent = Number(((amountEventual/ total) *100).toFixed(1));
  
          return [
              {
                name:'Recorrentes',
                amount: amountRecurrent,
                percent: recurrentPercent ? recurrentPercent : 0,
                color:"#F7931B"
              },
              {
                  name:'Eventual',
                  amount: amountEventual,
                  percent:eventualPercent ? eventualPercent : 0,
                  color:"#E44C4E"
                }
          ];
      },[monthSelected, yearSelected]);

    const handleMonthSelected = useCallback((month: string) => {
        try {
            const parseMonth = Number(month);
            setMonthSelected(parseMonth);
        }catch{
         throw new Error('invalid month value. Is accept 0 - 24.')
        }
    },[]);

    const handleYearSelected = useCallback((year: string) => {
        try {
            const parseYear = Number(year);
            setYearSelected(parseYear);
        }catch{
         throw new Error('invalid year value. Is accept integer numbers')
        }
    },[]);

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

               <PieChartBox data={relationExpensesVersusGains}/>
               <HistoryBox
                 data={historyData}
                 lineColorAmountEntry="#F7931B"
                 lineColorAmountOutPut="#E44C4E"
               />
               <BarChartBox 
               title="Saídas"
               data={relationExpensesRecurrentVersusEventual}
               />
               <BarChartBox 
               title="Entradas"
               data={relationGaisRecurrentVersusEventual}
               />
           </Content>
        </Container>
    );
}  

export default Dashboard;