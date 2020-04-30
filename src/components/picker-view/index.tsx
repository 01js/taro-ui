import classNames from 'classnames'
import { Text, View } from '@tarojs/components'
import { ZOPickerViewProps, ZOPickerViewState } from 'types/picker-view'
import ZOComponent from '../../common/component'

import _isFunction from 'lodash/isFunction'

export default class ZOPickerView extends ZOComponent<ZOPickerViewProps, ZOPickerViewState> {

  public constructor(props: ZOPickerViewProps) {
    super(props)
    this.state = {
      startY: 0,
      preY: 0,
      hadMove: false,
      touchEnd: false
    }
  }
  private getPosition () {
    const transition = this.props.touchEnd ? 0.3 : 0
    if (Taro.getEnv() === Taro.ENV_TYPE.WEB) {
      let num = Number(document.getElementsByTagName('html')[0].style.fontSize.split('px')[0])
      console.log(3333, num)
      return {
        'transform': `translate3d(0, ${(this.props.height/num).toFixed(3)}rem, 0)`,
        '-webkit-transform': `translate3d(0, ${(this.props.height/num).toFixed(3)}rem, 0)`,
        'transition': `transform ${transition}s`,
        '-webkit-transition': `transform ${transition}s`
      }
    } else {
      return {
        'transform': `translate3d(0, ${this.props.height}px, 0)`,
        '-webkit-transform': `translate3d(0, ${this.props.height}px, 0)`,
        'transition': `transform ${transition}s`,
        '-webkit-transition': `transform ${transition}s`
      }
    }
  }
  private onTouchStart(event): void {
    this.setState(() => ({
      startY: event.changedTouches[0].clientY,
      preY: event.changedTouches[0].clientY,
      hadMove: false
    }))

  }
  private onTouchMove(event): void {
    const y = event.changedTouches[0].clientY
    const deltaY = y - this.state.preY
    this.setState(() => ({
      preY: y,
      touchEnd: false
    }), () => {
      if (Math.abs(y - this.state.startY) > 10) {
        this.setState(() => ({
          hadMove: true
        }))
      }
      let newPos = this.props.height + deltaY

      if (_isFunction(this.props.updateHeight)) {
        this.props.updateHeight(newPos, this.props.columnId)
      }
      event.preventDefault()
    })
  }
  private onTouchEnd(event): void {
    const LINE_HEIGHT = Taro.getEnv() === Taro.ENV_TYPE.WEB ? document.getElementsByClassName('zo-picker-view__item')[0].offsetHeight : 56
    const MASK_HEIGHT = LINE_HEIGHT * 3
    const TOP = Taro.getEnv() === Taro.ENV_TYPE.WEB ? document.getElementsByClassName('zo-picker-view__item')[0].offsetHeight : 56
    const {
      range,
      height,
      updateHeight,
      onColumnChange,
      columnId
    } = this.props
    const max = 0
    const min = -LINE_HEIGHT * (range.length - 1)
    const endY = event.changedTouches[0].clientY

    this.setState(() => ({
      touchEnd: true
    }), () => {
      let absoluteHeight
      if (!this.state.hadMove) {
        const windowHeight = window.innerHeight
        const relativeY = windowHeight - MASK_HEIGHT / 2
        absoluteHeight = height - TOP - (endY - relativeY)
      } else {
        /** 滚动 */
        absoluteHeight = height - TOP
      }
      // 边界情况处理
      if (absoluteHeight > max) absoluteHeight = 0
      if (absoluteHeight < min) absoluteHeight = min

      // 先按公式算出 index, 再用此 index 算出一个整数高度
      const index = Math.round(absoluteHeight / -LINE_HEIGHT)
      const relativeHeight = TOP - LINE_HEIGHT * index
      updateHeight && updateHeight(relativeHeight, columnId)
      onColumnChange && onColumnChange(relativeHeight, columnId, event)
    })
  }

  public render(): JSX.Element {
    const rootClass = classNames(
      'zo-picker-view',
      this.props.className
    )
    const range = this.props.range || []
    const pickerItem = range.map(item => {
      const content = item
      return <View className='zo-picker-view__item'>{`${content}`}<Text className='zo-picker-view__item__label'>{`${this.props.label ? this.props.label : ''}`}</Text></View>
    })
    return (
      <View className={rootClass} onTouchStart={this.onTouchStart.bind(this)}
      onTouchMove={this.onTouchMove.bind(this)}
      onTouchEnd={this.onTouchEnd.bind(this)}>
        <View className="zo-picker-view__mask">
        </View>
        <View className="zo-picker-view__indicator"></View>
          <View style={this.getPosition()} className="zo-picker-view__content">
            {pickerItem}
          </View>
      </View>
    )
  }
}
