import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, cleanup } from '@testing-library/react';
import MainPage from '../components/mainPage.js'

afterEach( () => {
  cleanup();
  console.error.mockClear();
});

console.error = jest.fn();

describe('MainPage tests', () => {
  it('link should work properly', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>);
    expect(console.error).not.toHaveBeenCalled();
    expect(getByTestId('table-link').getAttribute('href')).toBe('/table/');
   });
});
