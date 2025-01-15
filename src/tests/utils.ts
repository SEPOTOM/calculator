import { ReactNode } from 'react';

import { RenderOptions, render, screen } from '@testing-library/react';
import userEvent, { UserEvent } from '@testing-library/user-event';

import { ExtendedRenderResults } from './types';

export const renderWithUser = (
  ui: ReactNode,
  options?: Omit<RenderOptions, 'queries'>,
): ExtendedRenderResults => {
  const user = userEvent.setup();

  return {
    user,
    ...render(ui, options),
  };
};

export const getDisplay = () => screen.getByRole('alert', { name: /display/i });

export const expectDisplayValueToBe = (expectedValue: string) => {
  expect(getDisplay()).toHaveDisplayValue(expectedValue);
};

export const clickButtons = async (user: UserEvent, sequence: string[]) => {
  for (const buttonName of sequence) {
    await user.click(screen.getByRole('button', { name: buttonName }));
  }
};
