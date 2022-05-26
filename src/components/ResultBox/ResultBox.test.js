import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ResultBox from './ResultBox';

  describe('Component ResultBox', () => {

    const testCases = [
      {amount: '100'},
      {amount: '59'},
      {amount: '1111'},
    ]

    for (const testObj of testCases) {
      const amountValue = parseInt(testObj.amount)

      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'PLN',
      });

      const amountToString = formatter.format(amountValue);
      const amountResultToString = (amountValue / 3.5).toFixed(2);
      const test = (amountToString +  ' = $' + amountResultToString).toString();

      it('should render proper info about conversion when PLN -> USD', () => {
        render(<ResultBox from="PLN" to="USD" amount={amountValue} />);
        const output = screen.getByTestId('output');
        expect(output).toHaveTextContent(test);
      });    
    }
  });