import classNames from 'classnames'
import PropTypes, { InferProps } from 'prop-types'
import { ZOModelActionProps } from 'types/modal'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import ZOComponent from '../../../common/component'

export default class ZOModelAction extends ZOComponent<ZOModelActionProps> {
  public static defaultProps: ZOModelActionProps
  public static propTypes: InferProps<ZOModelActionProps>

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

ZOModelAction.defaultProps = {
  isSimple: false
}

ZOModelAction.propTypes = {
  isSimple: PropTypes.bool
}
