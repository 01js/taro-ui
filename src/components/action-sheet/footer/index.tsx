import classNames from 'classnames'
import _isFunction from 'lodash/isFunction'
import PropTypes, { InferProps } from 'prop-types'
import { ZOActionSheetFooterProps } from 'types/action-sheet'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import ZOComponent from '../../../common/component'

export default class ZOActionSheetFooter extends ZOComponent<
  ZOActionSheetFooterProps
> {
  public static defaultProps: ZOActionSheetFooterProps
  public static propTypes: InferProps<ZOActionSheetFooterProps>

  private handleClick = (...args: any[]): void => {
    if (_isFunction(this.props.onClick)) {
      this.props.onClick(...args)
    }
  }

  public render(): JSX.Element {
    const rootClass = classNames(
      'zo-action-sheet__footer',
      this.props.className
    )

    return (
      <View onClick={this.handleClick} className={rootClass}>
        {this.props.children}
      </View>
    )
  }
}

ZOActionSheetFooter.defaultProps = {
  onClick: () => {}
}

ZOActionSheetFooter.propTypes = {
  onClick: PropTypes.func
}
