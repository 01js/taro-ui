import Taro from '@tarojs/taro'
import './style/index.scss'

Taro.initPxTransform({ designWidth: 750, deviceRatio: {} })

export { default as ZOButton } from './components/button'
