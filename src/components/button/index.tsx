import AtComponent from '../../common/component'
import classNames from 'classnames'
import { AtButtonProps, AtButtonState } from 'types/button'
import Taro from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import { CommonEvent } from '@tarojs/components/types/common'

const TYPE_CLASS = {
  primary: 'primary',
  secondary: 'secondary'
}

export default class AtButton extends AtComponent<
  AtButtonProps,
  AtButtonState
> {

  public static defaultProps: AtButtonProps
  public constructor(props: AtButtonProps) {
    super(props)
    this.state = {
      isWEB: Taro.getEnv() === Taro.ENV_TYPE.WEB,
      isWEAPP: Taro.getEnv() === Taro.ENV_TYPE.WEAPP,
      isALIPAY: Taro.getEnv() === Taro.ENV_TYPE.ALIPAY
    }
  }
  private onClick(event: CommonEvent): void {
    if (!this.props.disabled) {
      this.props.onClick && this.props.onClick(event)
    }
  }
  public render(): JSX.Element {
    const {
      disabled,
      lang,
      type = '',
      formType,
      circle
    } = this.props
    const { isWEB } = this.state
    const rootClassName = ['zo-button']
    const classObject = {
      [`zo-button--${type}`]: TYPE_CLASS[type],
      'zo-button--disabled': disabled,
      'zo-button--circle': circle,
    }
    const webButton = (
      <Button
        className='zo-button__wxbutton'
        lang={lang}
        formType={
          formType === 'submit' || formType === 'reset' ? formType : undefined
        }
      ></Button>
    )
    return (
      <View className={classNames(rootClassName, classObject, this.props.className)}
        onClick={this.onClick.bind(this)}
      >
        {isWEB && !disabled && webButton}
        <View className='zo-button__text'>{this.props.children}</View>
      </View>
    )
  }
}

AtButton.defaultProps = {
  onClick: () => {},
  type: undefined,
}
