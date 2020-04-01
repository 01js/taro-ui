import { ComponentClass } from 'react'

import ZOComponent from './base'

export interface ZODefaultPageProps extends ZOComponent {
  /**
   * 图片
   */
  pic?: string
}

declare const ZODefaultPage: ComponentClass<ZODefaultPageProps>

export default ZODefaultPage
