import { ComponentClass } from 'react'

import ZOComponent from './base'

export interface ZODefaultPageProps extends ZOComponent {
  /**
   * 图片
   */
  pic?: string
  /**
   * 图片
   */
  height?: string
  /**
   * 图片
   */
  w?: string
}

declare const ZODefaultPage: ComponentClass<ZODefaultPageProps>

export default ZODefaultPage
