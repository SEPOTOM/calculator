import { HTMLAttributes, ReactNode } from 'react';

export interface ButtonProps
  extends Omit<HTMLAttributes<HTMLButtonElement>, 'type'> {
  variant: 'fill' | 'border';
  children: ReactNode;
}
