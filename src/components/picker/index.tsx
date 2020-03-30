import classNames from 'classnames'
import { Text, View } from '@tarojs/components'
import { ZOPickerProps } from 'types/picker'
import ZOComponent from '../../common/component'

export default class ZONavBar extends ZOComponent<ZOPickerProps> {

  public render(): JSX.Element {
    const rootClass = classNames(
      'zo-picker',
      this.props.className
    )
    return (
      <View className={rootClass}>
        
      </View>
    )
  }
}
