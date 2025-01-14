import { RenderResult } from '@testing-library/react';
import { UserEvent } from '@testing-library/user-event';

export interface ExtendedRenderResults extends RenderResult {
  user: UserEvent;
}
