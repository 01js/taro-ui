import { ComponentClass } from 'react'
import { CommonEventFunction } from '@tarojs/components/types/common'

import ZOComponent from './base'
import { array } from 'prop-types';

export interface ZOPickerViewState {
  startY: number,
  preY: number,
  hadMove: boolean,
  touchEnd: boolean
}

export interface ZOPickerViewProps extends ZOComponent {
  /**
   * 类型
   */
  mode?: string
  /**
   * 高度
   */
  height?: any
  /**
   * id
   */
  columnId?: number | string
  /**
   * 滑动结束
   */
  touchEnd?: number
  /**
   * 范围
   */
  range: Array<any>
  /**
   * 新位置
   */
  newPos?: object

  /**
   * 更新高度的事件
   */
  updateHeight?: Function
  /**
   * ColumnChange
   */
  onColumnChange?: Function
}

declare const ZOPickerView: ComponentClass<ZOPickerViewProps>

export default ZOPickerView
