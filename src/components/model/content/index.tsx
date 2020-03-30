import classNames from 'classnames'
import { ZOModalContentProps } from 'types/modal'
import { ScrollView } from '@tarojs/components'
import Taro from '@tarojs/taro'
import ZOComponent from '../../../common/component'

export default class ZOModalContent extends ZOComponent<ZOModalContentProps> {
  public render(): JSX.Element {
    const rootClass = classNames('zo-modal__content', this.props.className)
    return (
      <ScrollView scrollY className={rootClass}>
        {this.props.children}
      </ScrollView>
    )
  }
}
