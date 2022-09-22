import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import mockData  from './helpers/mockData'

beforeEach(() => {
  global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve(mockData)
  }))
})

describe('teste b', () => {
  test('I am your test', async () => {
    render(<App />);

    const planetInput = screen.getByTestId('name-filter');
    const columnInput = screen.getByTestId('column-filter');
    const comparisionInput = screen.getByTestId('comparison-filter');
    const numberInput = screen.getByTestId('value-filter');
    const btnFilter = screen.getByTestId('button-filter');
  
    expect(planetInput).toBeInTheDocument();
    expect(columnInput).toBeInTheDocument();
    expect(comparisionInput).toBeInTheDocument();
    expect(numberInput).toBeInTheDocument();
    expect(btnFilter).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'maior que' }).selected).toBe(true);
    expect(screen.getByRole('option', { name: 'menor que' }).selected).toBe(false)
  
  
    userEvent.selectOptions(
      // Find the select element, like a real user would.
      screen.getByTestId('column-filter'),
      // Find and select the Ireland option, like a real user would.
      screen.getByRole('option', { name: 'diameter' }),
    )
    userEvent.selectOptions(
      // Find the select element, like a real user would.
      screen.getByTestId('comparison-filter'),
      // Find and select the Ireland option, like a real user would.
      screen.getByRole('option', { name: 'maior que' }),
    )
    userEvent.type(numberInput, '8000')
    userEvent.click(btnFilter)
  });
  
  
  test('new tests', () => {
    render(<App />);
    const planetInput = screen.getByTestId('name-filter');
  
    userEvent.click(planetInput)
    userEvent.type(planetInput, 'oo')
  })
})


describe('teste a' , () => {
  test('a', async () => {
    render(<App />);
  
    const endpoint = 'https://swapi.dev/api/planets';
  
    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith(endpoint);
  
    const resultFilter = await screen.findByText(/Endor/i)
    expect(resultFilter).toBeInTheDocument()
  
    const column = screen.getByTestId('column-filter')
    expect(column).toBeInTheDocument()
    userEvent.selectOptions(column, 'diameter')
  
    const comparison1 = screen.getByTestId('comparison-filter')
    expect(comparison1).toBeInTheDocument()
    userEvent.selectOptions(comparison1, 'maior que')
  
    const value = screen.getByTestId('value-filter')
    expect(value).toBeInTheDocument()
    userEvent.selectOptions(comparison1, 'maior que')
  
    const button = screen.getByTestId('button-filter')
    expect(button).toBeInTheDocument()
    userEvent.click(button)
  
    const resultFilter1 = await screen.findByText(/Tatooine/i)
    expect(resultFilter1).toBeInTheDocument();

    userEvent.selectOptions(column, 'rotation_period')
    userEvent.selectOptions(comparison1, 'menor que')
    userEvent.type(value, '24')
    userEvent.click(button)
    
    const resultFilter2 = await screen.findByText(/Endor/i)
    expect(resultFilter2).toBeInTheDocument();
  })
})

// describe('teste b', () => {
//   test('testa operador lógico', async() => {
//     global.fetch = jest.fn(() => Promise.resolve({
//       json: () => Promise.resolve(mockData)
//     }))

//     render(<App />);
  
//     const resultFilter = await screen.findByText(/Alderaan/i)
//     expect(resultFilter).toBeInTheDocument()

//     const column = screen.getByTestId('column-filter')
//     expect(column).toBeInTheDocument();
//     const comparison1 = screen.getByTestId('comparison-filter')
//     expect(comparison1).toBeInTheDocument()
//     const value = screen.getByTestId('value-filter')
//     expect(value).toBeInTheDocument();
//     const button = screen.getByTestId('button-filter')
//     expect(button).toBeInTheDocument()
    

//     userEvent.selectOptions(column, 'diameter')
//     userEvent.selectOptions(comparison1, 'menor que')
//     userEvent.type(value, '10000')
//     userEvent.click(button)

//     const resultFilter1 = await screen.findByText(/Dagobah/i);
//     expect(resultFilter1).not.toBeInTheDocument();

//   })
// })

describe('Testa operadores no componente Table', () => {
  it('Verifica operador "maior que "', async () => {
    render(<App />);
    
    const column = screen.getByTestId('column-filter')
    expect(column).toBeInTheDocument()
    userEvent.selectOptions(column, 'surface_water')
  
    const comparison1 = screen.getByTestId('comparison-filter')
    expect(comparison1).toBeInTheDocument()
    userEvent.selectOptions(comparison1, 'maior que')

    const value = screen.getByTestId('value-filter')
    expect(value).toBeInTheDocument()
    userEvent.type(value, '90')
  
    const button = screen.getByTestId('button-filter')
    expect(button).toBeInTheDocument()
    userEvent.click(button)

    const resultFilter = await screen.findByText(/Kamino/i)
    expect(resultFilter).toBeInTheDocument()
  })

    it('Verifica operador "menor que "', async() => {
      render(<App />);

      const column = screen.getByTestId('column-filter')
      expect(column).toBeInTheDocument()
      userEvent.selectOptions(column, 'surface_water')

      const comparison = screen.getByTestId('comparison-filter')
      expect(comparison).toBeInTheDocument()
      userEvent.selectOptions(comparison, 'menor que')

      const value = screen.getByTestId('value-filter')
      expect(value).toBeInTheDocument()
      userEvent.type(value, '5')
    
      const button = screen.getByTestId('button-filter')
      expect(button).toBeInTheDocument()
      userEvent.click(button)

      const resultFilter = await screen.findByText(/bespin/i)
      expect(resultFilter).toBeInTheDocument()
    })

    it('Verifica operador "igual a "', async () => {
      render(<App />);

      const column = screen.getByTestId('column-filter')
      expect(column).toBeInTheDocument()
      userEvent.selectOptions(column, 'surface_water')

      const comparison = screen.getByTestId('comparison-filter')
      expect(comparison).toBeInTheDocument()
      userEvent.selectOptions(comparison, 'igual a')

      const value = screen.getByTestId('value-filter')
      expect(value).toBeInTheDocument()
      userEvent.type(value, '1')
    
      const button = screen.getByTestId('button-filter')
      expect(button).toBeInTheDocument()
      userEvent.click(button)

      const resultFilter = await screen.findByText(/tatooine/i)
      expect(resultFilter).toBeInTheDocument()
    })
  })