import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the public navigation', () => {
  render(<App />);
  expect(screen.getAllByText('Teso Post')).toHaveLength(2);
  expect(screen.getAllByText('About')).toHaveLength(2);
  expect(screen.getAllByText('Contact')).toHaveLength(3);
});
