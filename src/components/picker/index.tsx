import classNames from 'classnames'
import { Text, View } from '@tarojs/components'
import { ZOPickerProps } from 'types/picker'
import ZOComponent from '../../common/component'

export default class ZOPickerBar extends ZOComponent<ZOPickerProps> {

  public render(): JSX.Element {
    const rootClass = classNames(
      'zo-picker',
      this.props.className
    )
    return (
      <View className={rootClass}>
        111
      </View>
    )
  }
}
