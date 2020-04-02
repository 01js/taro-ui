import { ComponentClass } from 'react'
import { CommonEventFunction } from '@tarojs/components/types/common'

import ZOComponent from './base'

export interface ZOPickerState {
  height: any
  index: any
  hidden: boolean
  fadeOut: boolean
}
export interface ZOPickerProps extends ZOComponent {
  /**
   * 类型
   */
  mode?: string
  /**
   * 值
   */
  value?: Array<any>
  /**
   * ColumnChange
   */
  onChange?: Function
}

declare const ZOPicker: ComponentClass<ZOPickerProps>

export default ZOPicker
