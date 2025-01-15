import { FC } from 'react';

import clsx from 'clsx';

import { ButtonProps } from './types';

const Button: FC<ButtonProps> = ({
  children,
  variant,
  className,
  ...props
}) => (
  <button
    {...props}
    type="button"
    className={clsx(
      'h-16 rounded-md font-mono text-3xl',
      {
        'bg-main text-secondary': variant === 'fill',
        'border-4 border-main font-black text-main': variant === 'border',
      },
      className,
    )}
  >
    {children}
  </button>
);

export default Button;
