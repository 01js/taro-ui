import AtComponent from './base'
import { ComponentClass } from 'react'
import { ButtonProps } from '@tarojs/components/types/Button'
import { CommonEventFunction } from '@tarojs/components/types/common'
type TaroButtonProps = Pick<ButtonProps, 'formType' | 'lang'>

export interface AtButtonProps extends AtComponent, TaroButtonProps {
  /**
   * 设置按钮为禁用态（不可点击）
   * @default false
   */
  disabled?: boolean

  /**
   * 按钮的类型
   */
  type?: 'primary' | 'secondary'
  /**
   * 设置按钮圆角
   * @default false
   */
  circle?: boolean
  /**
   * 点击按钮时触发
   */
  onClick?: CommonEventFunction
}
export interface AtButtonState {
  isWEB: boolean
  isWEAPP: boolean
  isALIPAY: boolean
}

declare const AtButton: ComponentClass<AtButtonProps>
export default AtButton
