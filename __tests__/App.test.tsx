/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';

import { renderWithProviders } from '../src/utils/renderWithProviders.utility';

jest.useFakeTimers();

it('renders correctly', () => {
  const tree = renderWithProviders(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});
