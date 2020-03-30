import { ComponentClass } from 'react'
import { CommonEventFunction } from '@tarojs/components/types/common'

import ZOComponent from './base'

export interface ZOPickerViewProps extends ZOComponent {
  /**
   * 类型
   */
  mode?: string
}

declare const ZOPickerView: ComponentClass<ZOPickerViewProps>

export default ZOPickerView
