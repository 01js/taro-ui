import { CSSProperties } from 'react'

export interface ZOComponent {
  className?: string

  customStyle?: string | CSSProperties
}

export interface ZOIconBaseProps2 extends ZOComponent {
  value: string

  color?: string
}

export interface ZOIconBaseProps extends ZOComponent {
  value: string

  color?: string

  prefixClass?: string

  size?: number | string
}

export default ZOComponent
