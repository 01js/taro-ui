import classNames from 'classnames'
import { ZOModalHeaderProps } from 'types/modal'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import ZOComponent from '../../../common/component'

export default class ZOModalHeader extends ZOComponent<ZOModalHeaderProps> {
  public render(): JSX.Element {
    const rootClass = classNames('zo-modal__header', this.props.className)
    return <View className={rootClass}>{this.props.children}</View>
  }
}
