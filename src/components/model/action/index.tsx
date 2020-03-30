import classNames from 'classnames'
import PropTypes, { InferProps } from 'prop-types'
import { ZOModalActionProps } from 'types/modal'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import ZOComponent from '../../../common/component'

export default class ZOModalAction extends ZOComponent<ZOModalActionProps> {
  public static defaultProps: ZOModalActionProps
  public static propTypes: InferProps<ZOModalActionProps>

  public render(): JSX.Element {
    const rootClass = classNames(
      'zo-modal__footer',
      {
        'zo-modal__footer--simple': this.props.isSimple
      },
      this.props.className
    )

    return (
      <View className={rootClass}>
        <View className='zo-modal__action'>{this.props.children}</View>
      </View>
    )
  }
}

ZOModalAction.defaultProps = {
  isSimple: false
}

ZOModalAction.propTypes = {
  isSimple: PropTypes.bool
}
