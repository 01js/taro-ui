import { ComponentClass } from 'react'
import { CommonEventFunction } from '@tarojs/components/types/common'

import ZOComponent from './base'

export interface ZOPickerProps extends ZOComponent {
  /**
   * 类型
   */
  mode?: string
}

declare const ZOPicker: ComponentClass<ZOPickerProps>

export default ZOPicker
