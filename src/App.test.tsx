import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App/>);
  const linkElement = screen.getByText(/Edit/i);
  const linkElement2 = screen.getByText(/reloads/i);

  expect(linkElement).toBeInTheDocument();
  expect(linkElement2).toBeInTheDocument();

});
