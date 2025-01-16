import { FC } from 'react';

import { DisplayProps } from '@/components/Display/types';

const Display: FC<DisplayProps> = ({ value }) => (
  <input
    role="alert"
    type="text"
    value={value}
    readOnly
    aria-label="Calculator display"
    className="outline-focus mb-6 w-full max-w-full rounded-sm bg-main px-2 py-3 text-right font-mono text-5xl tracking-wider text-secondary sm:mb-9"
  />
);

export default Display;
