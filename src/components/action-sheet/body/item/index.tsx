import classNames from 'classnames'
import _isFunction from 'lodash/isFunction'
import PropTypes, { InferProps } from 'prop-types'
import { ZOActionSheetItemProps } from 'types/action-sheet'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import ZOComponent from '../../../../common/component'

export default class ZOActionSheetItem extends ZOComponent<
  ZOActionSheetItemProps
> {
  public static defaultProps: ZOActionSheetItemProps
  public static propTypes: InferProps<ZOActionSheetItemProps>

  private handleClick = (args: any): void => {
    if (_isFunction(this.props.onClick)) {
      this.props.onClick(args)
    }
  }

  public render(): JSX.Element {
    const rootClass = classNames('zo-action-sheet__item', this.props.className)

    return (
      <View className={rootClass} onClick={this.handleClick}>
        {this.props.children}
      </View>
    )
  }
}

ZOActionSheetItem.defaultProps = {
  onClick: () => {}
}

ZOActionSheetItem.propTypes = {
  onClick: PropTypes.func
}
