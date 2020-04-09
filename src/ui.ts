import Taro from '@tarojs/taro'
import './style/index.scss'

Taro.initPxTransform({ designWidth: 750, deviceRatio: {} })

export { default as ZOButton } from './components/button'
export { default as ZOModal } from './components/modal'
export { default as ZONavBar } from './components/nav-bar'
export { default as ZODefaultPage } from './components/default-page'
export { default as ZOActionSheet } from './components/action-sheet'
export { default as ZOPicker } from './components/picker'
export { default as ZOPickerView } from './components/picker-view'
