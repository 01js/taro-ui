import { ComponentClass } from 'react'
import { CommonEventFunction } from '@tarojs/components/types/common'

import ZOComponent from './base'

export interface ZOPickerState {
  height: any
  index: any
  hidden: boolean
}
export interface ZOPickerProps extends ZOComponent {
  /**
   * 名称
   */
  title?: string
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
  /**
   * ColumnChange
   */
  onCancel?: Function
  onShow?: Function
  showPicker?: boolean
}

declare const ZOPicker: ComponentClass<ZOPickerProps>

export default ZOPicker
