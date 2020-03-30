import classNames from 'classnames'
import _isFunction from 'lodash/isFunction'
import PropTypes, { InferProps } from 'prop-types'
import { ZOModelProps, ZOModelState } from 'types/modal'
import { Button, Text, View } from '@tarojs/components'
import { CommonEvent } from '@tarojs/components/types/common'
import Taro from '@tarojs/taro'
import ZOComponent from '../../common/component'
import { handleTouchScroll } from '../../common/utils'
import ZOModelAction from './action/index'
import ZOModelContent from './content/index'
import ZOModelHeader from './header/index'

export default class ZOModel extends ZOComponent<ZOModelProps, ZOModelState> {
  public static defaultProps: ZOModelProps
  public static propTypes: InferProps<ZOModelProps>

  public constructor(props: ZOModelProps) {
    super(props)
    const { isOpened } = props
    this.state = {
      _isOpened: isOpened,
      isWEB: Taro.getEnv() === Taro.ENV_TYPE.WEB
    }
  }

  public componentWillReceiveProps(nextProps: ZOModelProps): void {
    const { isOpened } = nextProps

    if (this.props.isOpened !== isOpened) {
      handleTouchScroll(isOpened)
    }

    if (isOpened !== this.state._isOpened) {
      this.setState({
        _isOpened: isOpened
      })
    }
  }

  private handleClickOverlay = (): void => {
    if (this.props.closeOnClickOverlay) {
      this.setState(
        {
          _isOpened: false
        },
        this.handleClose
      )
    }
  }

  private handleClose = (event?: CommonEvent): void => {
    if (_isFunction(this.props.onClose)) {
      this.props.onClose(event!)
    }
  }

  private handleCancel = (event: CommonEvent): void => {
    if (_isFunction(this.props.onCancel)) {
      this.props.onCancel(event)
    }
  }

  private handleConfirm = (event: CommonEvent): void => {
    if (_isFunction(this.props.onConfirm)) {
      this.props.onConfirm(event)
    }
  }

  private handleTouchMove = (e: CommonEvent): void => {
    e.stopPropagation()
  }

  public render(): JSX.Element {
    const { _isOpened, isWEB } = this.state
    const { title, content, cancelText, confirmText } = this.props
    const rootClass = classNames(
      'zo-modal',
      {
        'zo-modal--active': _isOpened
      },
      this.props.className
    )

    if (content) {
      const isRenderAction = cancelText || confirmText
      return (
        <View className={rootClass}>
          <View
            onClick={this.handleClickOverlay}
            className='zo-modal__overlay'
          />
          <View className='zo-modal__container'>
            {title && (
              <ZOModelHeader>
                <Text>{title}</Text>
              </ZOModelHeader>
            )}
            {content && (
              <ZOModelContent>
                <View className='content-simple'>
                  {isWEB ? (
                    <Text
                      dangerouslySetInnerHTML={{
                        __html: content.replace(/\n/g, '<br/>')
                      }}
                    ></Text>
                  ) : (
                    <Text>{content}</Text>
                  )}
                </View>
              </ZOModelContent>
            )}
            {isRenderAction && (
              <ZOModelAction isSimple>
                {cancelText && (
                  <Button onClick={this.handleCancel}>{cancelText}</Button>
                )}
                {confirmText && (
                  <Button onClick={this.handleConfirm}>{confirmText}</Button>
                )}
              </ZOModelAction>
            )}
          </View>
        </View>
      )
    }

    return (
      <View onTouchMove={this.handleTouchMove} className={rootClass}>
        <View className='zo-modal__overlay' onClick={this.handleClickOverlay} />
        <View className='zo-modal__container'>
          {title && (
            <ZOModelHeader>
              <Text>{title}</Text>
            </ZOModelHeader>
          )}
          <ZOModelContent>
            <View className='content-simple'>
              {this.props.children}
            </View>
          </ZOModelContent>

          {(cancelText || confirmText) && (
            <ZOModelAction isSimple>
              {cancelText && (
                <Button onClick={this.handleCancel}>{cancelText}</Button>
              )}
              {confirmText && (
                <Button onClick={this.handleConfirm}>{confirmText}</Button>
              )}
            </ZOModelAction>
          )}
        </View>
      </View>
    )
  }
}

ZOModel.defaultProps = {
  isOpened: false,
  closeOnClickOverlay: true
}

ZOModel.propTypes = {
  title: PropTypes.string,
  isOpened: PropTypes.bool,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
  onClose: PropTypes.func,
  content: PropTypes.string,
  closeOnClickOverlay: PropTypes.bool,
  cancelText: PropTypes.string,
  confirmText: PropTypes.string
}
