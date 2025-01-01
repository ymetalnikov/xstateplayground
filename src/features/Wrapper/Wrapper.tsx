import { ReactNode } from 'react'

import cm from './styles.module.css'

export type WrapperProps = { children: ReactNode }

export function Wrapper({ children }: WrapperProps) {
    return <div className={cm.wrapper}>{children}</div>
}