import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import mockData  from './helpers/mockData'

// beforeEach(() => {
//   global.fetch = jest.fn(() => Promise.resolve({
//     json: () => Promise.resolve(mockData)
//   }))
// })

describe('teste b', () => {
  test('I am your test', () => {
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
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockData)
    }))

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

describe('teste b', () => {
  test('testa operador lógico', async() => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockData)
    }))

    render(<App />);
  
    const resultFilter = await screen.findByText(/Alderaan/i)
    expect(resultFilter).toBeInTheDocument()

    const column = screen.getByTestId('column-filter')
    expect(column).toBeInTheDocument();
    const comparison1 = screen.getByTestId('comparison-filter')
    expect(comparison1).toBeInTheDocument()
    const value = screen.getByTestId('value-filter')
    expect(value).toBeInTheDocument();
    const button = screen.getByTestId('button-filter')
    expect(button).toBeInTheDocument()
    

    userEvent.selectOptions(column, 'population')
    userEvent.selectOptions(comparison1, 'menor que')
    userEvent.type(value, '10000')
    userEvent.click(button)

    const resultFilter1 = await screen.findByText(/aaa/i);
    expect(resultFilter1).toBeInTheDocument();

  })
})


