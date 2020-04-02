import classNames from 'classnames'
import { Text, View } from '@tarojs/components'
import { ZOPickerViewProps, ZOPickerViewState } from 'types/picker-view'
import ZOComponent from '../../common/component'

import _isFunction from 'lodash/isFunction'
const LINE_HEIGHT = 56
const MASK_HEIGHT = LINE_HEIGHT * 3
const TOP = 56
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
    return {
      'transform': `translate3d(0, ${this.props.height}px, 0)`,
      '-webkit-transform': `translate3d(0, ${this.props.height}px, 0)`,
      'transition': `transform ${transition}s`,
      '-webkit-transition': `transform ${transition}s`
    }
  }
  private onTouchStart(event): void {
    console.log(event)
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
      console.log(this.props.height)
      let newPos = this.props.height + deltaY

      if (_isFunction(this.props.updateHeight)) {
        this.props.updateHeight(newPos, this.props.columnId)
      }
      event.preventDefault()
    })
  }
  private onTouchEnd(event): void {
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
      console.log(`index--${index}`)
      const relativeHeight = TOP - LINE_HEIGHT * index
      console.log(5, relativeHeight)
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
      return <View className='zo-picker-view__item'>{`${content}${this.props.label}`}</View>
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
