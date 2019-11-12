// Test away!
import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';

import Display from './Display';

afterEach(cleanup);

test('Display renders correctly', () => {
    expect(render(<Display />)).toMatchSnapshot();
});

test('Displays if gate is open and unlocked', () => {
    const { getByText } = render(<Display locked={false} />);
    getByText(/unlocked/i);
    getByText(/open/i);
});

test('Displays if gate is closed and locked', () => {
    const { getByText } = render(<Display closed={true} />);
    getByText(/locked/i);
    getByText(/closed/i);
});

test('Displays closed if the closed prop is true', () => {
    const closedGate = jest.fn();

    const { getByText } = render(<Display closed={true} />);

    fireEvent.click(getByText(/closed/i));
    expect(closedGate).toHaveBeenCalledTimes(0);
});

test('Displays locked if the locked prop is true', () => {
    const lockedGate = jest.fn();

    const { getByText } = render(<Display locked={true} />);

    fireEvent.click(getByText(/locked/i));
    expect(lockedGate).toHaveBeenCalledTimes(0);
});

test('When locked or closed use the red-led class', () => {
    const lockedOrClosed = jest.fn();

    const { container } = render(<Display closed={true} />);

    expect(container.firstChild.classList.contains(/red-led/i));
});

test('When unlocked or open use the green-led class', () => {
    const unlockedOrOpen = jest.fn();

    const { container } = render(<Display locked={false} />);

    expect(container.firstChild.classList.contains(/green-led/i));
});