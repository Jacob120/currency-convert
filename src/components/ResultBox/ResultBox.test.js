import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ResultBox from './ResultBox';

  describe('Component ResultBox', () => {

    const testCases = [
      { amount: '100', from: 'PLN', to: 'USD' },
      { amount: '20', from: 'USD', to: 'PLN' },
      { amount: '200', from: 'PLN', to: 'USD' },
      { amount: '345', from: 'USD', to: 'PLN' },
    ];

    for (const testObj of testCases) {
      const amountValue = parseInt(testObj.amount)

      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'PLN',
      });

      const amountFormat = formatter.format(amountValue);
      const amountResult = (amountValue / 3.5).toFixed(2);
      const outputResult = (amountFormat +  ' = $' + amountResult).replace(/\u00a0/g, ' ');

      it('should render proper info about conversion when PLN -> USD', () => {
        render(<ResultBox from="PLN" to="USD" amount={amountValue} />);
        const output = screen.getByTestId('output');
        expect(output).toHaveTextContent(outputResult);
      });    
    }
  });