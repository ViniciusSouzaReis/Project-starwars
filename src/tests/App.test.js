import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { mockData } from './helpers/mockData'

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


// test('mock', () => {
//   render(<App />);
//   getPlanets = jest.fn();
//   setData = jest.fn();

//   getPlanets();
//   setData();
//   expect(setData).toHaveBeenCalled();
//   expect(getPlanets).toHaveBeenCalled();
// })

test('a', async () => {
  jest.spyOn(global, 'fetch');
  global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockData),
  });
  render(<App />);
  expect(global.fetch).toBeCalledWith('https://swapi.dev/api/planets')
})
