import classNames from 'classnames'
import { Text, View } from '@tarojs/components'
import { ZOPickerViewProps } from 'types/picker-view'
import ZOComponent from '../../common/component'

export default class ZOPickerViewBar extends ZOComponent<ZOPickerViewProps> {

  public render(): JSX.Element {
    const rootClass = classNames(
      'zo-picker',
      this.props.className
    )
    const pickerItem = [1,2, 3].map((item, index) => <div className='picker-item'>{`${item}`}</div>)
    return (
      <View className={rootClass}>
        <View className="picker-mask">
          <View className="picker-indicator"></View>
          <View className="picker-content">
            {pickerItem}
          </View>
        </View>
      </View>
    )
  }
}
