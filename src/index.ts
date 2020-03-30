import Taro from '@tarojs/taro'
import './style/index.scss'

Taro.initPxTransform({ designWidth: 750, deviceRatio: {} })

export { default as ZOButton } from './components/button'
export { default as ZOModel } from './components/model'
export { default as ZONavBar } from './components/nav-bar'
