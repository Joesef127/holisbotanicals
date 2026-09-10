import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import FormField from '../../components/prostanone/FormField';

describe('FormField component', () => {
  it('renders the label text and associates htmlFor with controlId', () => {
    render(
      <FormField label="Phone Number" controlId="phone-input">
        <input id="phone-input" />
      </FormField>,
    );
    const label = screen.getByText('Phone Number');
    expect(label).toBeInTheDocument();
    expect(label).toHaveAttribute('for', 'phone-input');
  });

  it('shows an asterisk (*) when required=true', () => {
    render(
      <FormField label="First Name" controlId="first-name" required>
        <input id="first-name" />
      </FormField>,
    );
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('does NOT show an asterisk when required is omitted', () => {
    render(
      <FormField label="Alt Phone" controlId="alt-phone">
        <input id="alt-phone" />
      </FormField>,
    );
    expect(screen.queryByText('*')).not.toBeInTheDocument();
  });

  it('renders children inside the field wrapper', () => {
    render(
      <FormField label="Address" controlId="address">
        <textarea id="address" data-testid="addr-input" />
      </FormField>,
    );
    expect(screen.getByTestId('addr-input')).toBeInTheDocument();
  });

  it('shows an error message when error prop is provided', () => {
    render(
      <FormField label="Phone Number" controlId="phone" error="Enter a valid Nigerian number">
        <input id="phone" />
      </FormField>,
    );
    expect(screen.getByText('Enter a valid Nigerian number')).toBeInTheDocument();
  });

  it('does NOT render an error element when error is undefined', () => {
    render(
      <FormField label="Phone Number" controlId="phone">
        <input id="phone" />
      </FormField>,
    );
    // No <p> with error class should exist
    expect(screen.queryByRole('paragraph')).not.toBeInTheDocument();
  });
});
