import classNames from 'classnames'
import { ZOModelContentProps } from 'types/modal'
import { ScrollView } from '@tarojs/components'
import Taro from '@tarojs/taro'
import ZOComponent from '../../../common/component'

export default class ZOModelContent extends ZOComponent<ZOModelContentProps> {
  public render(): JSX.Element {
    const rootClass = classNames('zo-modal__content', this.props.className)
    return (
      <ScrollView scrollY className={rootClass}>
        {this.props.children}
      </ScrollView>
    )
  }
}
