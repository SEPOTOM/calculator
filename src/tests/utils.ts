import { ReactNode } from 'react';

import { RenderOptions, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

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
