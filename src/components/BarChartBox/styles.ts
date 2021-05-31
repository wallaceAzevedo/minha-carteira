import styled from 'styled-components';

interface ILegendProps {
    color: string
}

export const Container = styled.div`
  width: 48%;
  min-height: 260px;
  margin: 10px 0;

  background-color: ${props => props.theme.colors.tertiary};
  color: ${props => props.theme.colors.white};

  border-radius: 7px;

  display: flex;
`;

export const SideLeft = styled.div`
  flex: 1;
  padding: 30px 20px;

  > h2 {
      margin-bottom: 10px;
      padding-left: 16px;
      margin-bottom: 10px;
  }
`;

export const LegendContainer = styled.ul`
  list-style: none;

  height: 175px;
  padding-right: 15px;


`;

export const Legend = styled.li<ILegendProps>`
    display: flex;
    align-items: center;
    
    padding-left: 16px;

    margin-bottom: 7px;
    

   > div {
       background-color: ${props => props.color};

       width: 40px;
       height: 40px;
       border-radius: 5px;

       font-size: 14px;
       line-height: 40px;

       text-align: center;
   }

   > span {
       margin-left: 5px;
   }
`;

export const SideRight = styled.div`
  flex: 1;
  min-height: 150px;

  display: flex;
  padding-top: 35px;
`;