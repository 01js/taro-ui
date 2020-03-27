import classNames from 'classnames'
import { AtModalProps, AtModalState } from 'types/modal'
import AtComponent from '../../common/component'
import Taro from '@tarojs/taro'

export default class AtModal extends AtComponent<AtModalProps, AtModalState> {
  public constructor(props: AtModalProps) {
    super(props)
    const { isOpened } = props
    this.state = {
      _isOpened: isOpened,
      isWEB: Taro.getEnv() === Taro.ENV_TYPE.WEB
    }
  }
}
