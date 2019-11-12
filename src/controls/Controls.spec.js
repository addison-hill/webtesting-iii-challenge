// Test away!
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Controls from './Controls';

test('Controls renders correctly', () => {
    expect(render(<Controls />)).toMatchSnapshot();
});

test('provide buttons to toggle the closed and locked states', () => {
    const provideToggle = jest.fn();

    const { getByText } = render(<Controls toggleLocked={provideToggle} locked={true} closed={true} />);

    fireEvent.click(getByText(/lock gate/i));
    expect(provideToggle).toHaveBeenCalledTimes(1);
});

test('buttons text changes to reflect the state the door will be in if clicked', () => {
    const buttonsText = jest.fn();

    const { getByText } = render(<Controls closed={false} locked={false} toggleClosed={buttonsText} />);

    expect(buttonsText).toHaveBeenCalledTimes(0);
});

test('the closed toggle button is disabled if the gate is locked', () => {
    const closedButton = jest.fn();

    const { getByText } = render(<Controls closed={true} locked={true} toggleClosed={closedButton} />);

    const openGateButton = getByText(/open gate/i);
    fireEvent.click(openGateButton);
    expect(closedButton).not.toHaveBeenCalled();
});

test('locked toggle button is disabled if gate is open', () => {
    const toggleButton = jest.fn();

    const { getByText } = render(<Controls closed={true} locked={true} toggleClosed={toggleButton} />);

    const lockedButton = getByText(/lock gate/i);
    fireEvent.click(lockedButton);
    expect(toggleButton).not.toHaveBeenCalled();
});