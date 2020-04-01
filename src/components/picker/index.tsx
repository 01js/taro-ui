import classNames from 'classnames'
import { Text, View } from '@tarojs/components'
import { ZOPickerProps, ZOPickerState } from 'types/picker'
import ZOComponent from '../../common/component'
import ZOPickerView from '../picker-view'
const LINE_HEIGHT = 56
const TOP = 56
export default class ZOPickerBar extends ZOComponent<ZOPickerProps, ZOPickerState> {

  public constructor(props) {
    super(props)
    this.handlePrpos()
    this.state = {
      height: [],
      index: []
    }
  }
  private handlePrpos = (nextProps = this.props):void => {
    let { value, mode } = nextProps
    if (mode === 'alarmClock') {
      let str = value ? value[0] : ':'
      const time = str.split(':').map(n => +n)
      this.setState(() => ({
        index: time
      }), () => {
        this.initHeight()
      })
    }
  }
  private initHeight = ():void => {
    const height = this.state.index.map((i) => {
      let factor = 0
      return TOP - LINE_HEIGHT * i - factor
    })
    this.setState({
      height
    })
  }
  private getTimeRange = (begin, end): Array<string> => {
    const range: Array<string> = []
    for (let i = begin; i <= end; i++) {
      range.push(`${i < 10 ? '0' : ''}${i}`)
    }
    return range
  }
  updateHeight (height, columnId) {
    console.log(height, columnId)
    this.setState(prevState => {
      prevState.height[columnId] = height
      return { height: prevState.height }
    })
  }

  onColumnChange (height, columnId, e) {
    if (this.props.mode === 'alarmClock') {
      this.props.onChange && this.props.onChange(e)
    }
  }
  public render(): JSX.Element {
    // 闹钟
    const getAlarmClock = () => {
      const hourRange = [
        ...this.getTimeRange(0, 23),
      ]
      const minRange = [
        ...this.getTimeRange(0, 59),
      ]
      return ([
        <ZOPickerView
          onColumnChange={ this.onColumnChange.bind(this) }
          range={hourRange}
          height={this.state.height[0]}
          updateHeight={this.updateHeight.bind(this)}
          columnId='0'
        >
        </ZOPickerView>,
        <ZOPickerView
          onColumnChange={ this.onColumnChange.bind(this) }
          range={minRange}
          height={this.state.height[1]}
          updateHeight={this.updateHeight.bind(this)}
          columnId='1'
        >
        </ZOPickerView>,
      ])
    }
    let pickerView
    switch (this.props.mode) {
      case 'alarmClock':
        pickerView = getAlarmClock()
      default:
        pickerView = getAlarmClock()
    }

    const rootClass = classNames(
      'zo-picker',
      this.props.className
    )
    if (this.props.mode === 'alarmClock') {
      return (
        <View className='zo-picker__bd'>
          {
            pickerView
          }
          <View className="zo-picker__bd__desc">:</View>
        </View>
      )
    } else {
      return (
        <View className={rootClass}>
          {
            pickerView
          }
        </View>
      )
    }

  }
}
