import { MouseEvent, ComponentClass } from 'react'
import { CommonEvent } from '@tarojs/components/types/common'

import ZOComponent from './base'

export interface ZOActionSheetProps extends ZOComponent {
  /**
   * 是否展示元素
   * @default false
   */
  isOpened: boolean
  /**
   * 元素的标题
   */
  title?: string
  /**
   * 取消按钮的内容
   */
  cancelText?: string
  /**
   * 元素被关闭触发的事件
   */
  onClose?: (event?: CommonEvent) => void
  /**
   * 点击了底部取消按钮触发的事件
   */
  onCancel?: (event?: CommonEvent) => void
}

export interface ZOActionSheetState {
  _isOpened: boolean
}

export interface ZOActionSheetHeaderProps extends ZOComponent {}

export interface ZOActionSheetFooterProps extends ZOComponent {
  onClick?: Function
}

export interface ZOActionSheetBodyProps extends ZOComponent {}

export interface ZOActionSheetItemProps extends ZOComponent {
  /**
   * 点击 Item 触发的事件
   */
  onClick?: (event?: CommonEvent) => void
}

declare const ZOActionSheetItem: ComponentClass<ZOActionSheetItemProps>

declare const ZOActionSheet: ComponentClass<ZOActionSheetProps>

export default ZOActionSheet

export { ZOActionSheetItem }
