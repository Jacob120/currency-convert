import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ResultBox from './ResultBox';

  describe('Component ResultBox', () => {

    const testCases = [
      { amount: '100'},
      { amount: '20'},
      { amount: '200'},
      { amount: '345'},
    ];

    const formatterPLN = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'PLN'
    });

    const formatterUSD = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    });
    

    for (const testObj of testCases) {

      const formatFromPLN = formatterPLN.format(testObj.amount).replace(/\u00a0/g, ' ');
      const formatToUSD = (formatterUSD.format(testObj.amount / 3.5)).replace(/\u00a0/g, ' ');

      const formatFromUSD = formatterUSD.format(testObj.amount).replace(/\u00a0/g, ' ');
      const formatToPLN = (formatterPLN.format(testObj.amount * 3.5)).replace(/\u00a0/g, ' ');

      it('should render proper info about conversion when PLN -> USD', () => {
        render(<ResultBox from="PLN" to="USD" amount={parseInt(testObj.amount)} />);
        const output = screen.getByTestId('output');
        expect(output).toHaveTextContent(`${formatFromPLN} = ${formatToUSD}`);
      });       

      it('should render proper info about conversion when USD -> PLN', () => {
        render(<ResultBox from="USD" to="PLN" amount={parseInt(testObj.amount)} />);
        const output = screen.getByTestId('output');
        expect(output).toHaveTextContent(`${formatFromUSD} = ${formatToPLN}`);
      });   

      it('should render proper info about conversion when PLN -> PLN', () => {
        render(<ResultBox from="PLN" to="PLN" amount={parseInt(testObj.amount)} />);
        const output = screen.getByTestId('output');
        expect(output).toHaveTextContent(`${formatFromPLN} = ${formatFromPLN}`);
      }); 

      it('should render proper info about conversion when USD -> USD', () => {
        render(<ResultBox from="USD" to="USD" amount={parseInt(testObj.amount)} />);
        const output = screen.getByTestId('output');
        expect(output).toHaveTextContent(`${formatFromUSD} = ${formatFromUSD}`);
      }); 
    }
  });