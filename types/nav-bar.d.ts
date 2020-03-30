import { MouseEvent, ComponentClass } from 'react'
import { CommonEventFunction } from '@tarojs/components/types/common'

import ZOComponent, { ZOIconBaseProps } from './base'

export interface ZONavBarProps extends ZOComponent {
  /**
   * 标题文字
   */
  title?: string
  /**
   * 是否固定顶部
   * @default false
   */
  fixed?: boolean
  /**
   * 是否显示下划线
   * @since v1.4.0
   * @default true
   */
  border?: boolean
  /**
   * 链接文字跟图标颜色，不包括标题
   * @default #6190E8
   */
  color?: string
  /**
   * 左边图标类型，图标类型请看 ZOIcon 文档
   * @default 'chevron-left'
   */
  leftIconType?: string | ZOIconBaseProps
  /**
   * 左边文字
   */
  leftText?: string
  /**
   * 从右到左，第一个图标类型，图标类型请看 ZOIcon 文档
   */
  rightFirstIconType?: string | ZOIconBaseProps
  /**
   * 从右到左第二个图标类型，图标类型请看 ZOIcon 文档
   */
  rightSecondIconType?: string | ZOIconBaseProps
  /**
   * 左边第一个图标类型点击事件
   */
  onClickLeftIcon?: CommonEventFunction
  /**
   * 从右到左第一个图标类型点击事件
   */
  onClickRgIconSt?: CommonEventFunction
  /**
   * 从右到左第二个图标类型点击事件
   */
  onClickRgIconNd?: CommonEventFunction
}

declare const ZONavBar: ComponentClass<ZONavBarProps>

export default ZONavBar
