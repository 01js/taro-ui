import classNames from 'classnames'
import _isFunction from 'lodash/isFunction'
import PropTypes, { InferProps } from 'prop-types'
import { ZOActionSheetProps, ZOActionSheetState } from 'types/action-sheet'
import { View } from '@tarojs/components'
import { CommonEvent } from '@tarojs/components/types/common'
import Taro from '@tarojs/taro'
import ZOComponent from '../../common/component'
import ZOActionSheetBody from './body/index'
import ZOActionSheetFooter from './footer/index'
import ZOActionSheetHeader from './header/index'

export default class ZOActionSheet extends ZOComponent<
  ZOActionSheetProps,
  ZOActionSheetState
> {
  public static defaultProps: ZOActionSheetProps
  public static propTypes: InferProps<ZOActionSheetProps>

  public constructor(props: ZOActionSheetProps) {
    super(props)
    const { isOpened } = props

    this.state = {
      _isOpened: isOpened
    }
  }

  public componentWillReceiveProps(nextProps: ZOActionSheetProps): void {
    const { isOpened } = nextProps
    if (isOpened !== this.state._isOpened) {
      this.setState({
        _isOpened: isOpened
      })

      !isOpened && this.handleClose()
    }
  }

  private handleClose = (): void => {
    if (_isFunction(this.props.onClose)) {
      this.props.onClose()
    }
  }

  private handleCancel = (): void => {
    if (_isFunction(this.props.onCancel)) {
      return this.props.onCancel()
    }
    this.close()
  }

  private close = (): void => {
    this.setState(
      {
        _isOpened: false
      },
      this.handleClose
    )
  }

  private handleTouchMove = (e: CommonEvent): void => {
    e.stopPropagation()
    e.preventDefault()
  }

  public render(): JSX.Element {
    const { title, cancelText, className } = this.props
    const { _isOpened } = this.state

    const rootClass = classNames(
      'zo-action-sheet',
      {
        'zo-action-sheet--active': _isOpened
      },
      className
    )

    return (
      <View className={rootClass} onTouchMove={this.handleTouchMove}>
        <View onClick={this.close} className='zo-action-sheet__overlay' />
        <View className='zo-action-sheet__container'>
          {title && <ZOActionSheetHeader>{title}</ZOActionSheetHeader>}
          <ZOActionSheetBody>{this.props.children}</ZOActionSheetBody>
          {cancelText && (
            <ZOActionSheetFooter onClick={this.handleCancel}>
              {cancelText}
            </ZOActionSheetFooter>
          )}
        </View>
      </View>
    )
  }
}

ZOActionSheet.defaultProps = {
  title: '',
  cancelText: '',
  isOpened: false
}

ZOActionSheet.propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func,
  onCancel: PropTypes.func,
  isOpened: PropTypes.bool.isRequired,
  cancelText: PropTypes.string
}
