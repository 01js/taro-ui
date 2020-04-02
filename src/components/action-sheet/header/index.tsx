import classNames from 'classnames'
import { ZOActionSheetHeaderProps } from 'types/action-sheet'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import ZOComponent from '../../../common/component'

export default class ZOActionSheetHeader extends ZOComponent<
  ZOActionSheetHeaderProps
> {
  public render(): JSX.Element {
    const rootClass = classNames(
      'zo-action-sheet__header',
      this.props.className
    )

    return <View className={rootClass}>{this.props.children}</View>
  }
}
