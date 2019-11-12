// Test away
import React from 'react';
import { render } from '@testing-library/react';
import Dashboard from './Dashboard';

test('Dashboard renders correctly', () => {
    expect(render(<Dashboard />)).toMatchSnapshot();
  });

test('contains unlocked and open', () => {
    const { getByText } = render(<Dashboard />);
    getByText(/unlocked/i);
    getByText(/open/i);
});

test('shows controls and display', () => {
    const { queryByText } = render(<Dashboard />);
    queryByText(/display/i);
    queryByText(/controls/i);
})