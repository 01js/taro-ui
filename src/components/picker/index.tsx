import classNames from 'classnames'
import { Text, View } from '@tarojs/components'
import { ZOPickerProps, ZOPickerState } from 'types/picker'
import ZOComponent from '../../common/component'
import ZOPickerView from '../picker-view'
import ZOActionSheet from '../action-sheet'
const LINE_HEIGHT = 56
const TOP = 56
export default class ZOPickerBar extends ZOComponent<ZOPickerProps, ZOPickerState> {

  public constructor(props) {
    super(props)
    this.handlePrpos()
    this.state = {
      height: [],
      index: [],
      hidden: true,
    }
  }
  private handlePrpos = (nextProps = this.props):void => {
    let { value, mode } = nextProps
    if (mode === 'alarmClock' || mode === 'countDown') {
      let str = value ? value[0] : '01:01'
      const time = str.split(':').map(n => +n)
      this.setState(() => ({
        index: time
      }), () => {
        this.initHeight()
      })
    } else if (mode === 'delay') {
      let str = value ? value[0] : '01:01:01'
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
  onCancel (e) {
    const eventObj = this.getEventObj(e, 'cancel', {})
    this.props.onCancel && this.props.onCancel(eventObj)
    this.setState({ hidden: true })
  }
  updateHeight (height, columnId) {
    this.setState(prevState => {
      prevState.height[columnId] = height
      return { height: prevState.height }
    })
  }
  getEventObj (e, type, detail) {
    Object.defineProperties(e, {
      detail: {
        value: detail,
        enumerable: true
      },
      type: {
        value: type,
        enumerable: true
      }
    })
    return e
  }
  delayChange(height, columnId, e) {
    if (this.props.mode === 'alarmClock' || this.props.mode === 'delay') {
      setTimeout(() => {
        this.onColumnChange(height, columnId, e)
      }, 100)
    }
  }
  onChange (e) {
    this.setState({ hidden: true })
    let index = this.state.height.map(h => (TOP - h) / LINE_HEIGHT)

    const eventObj = this.getEventObj(e, 'change', {
      value: index.length > 1 ? index : index[0]
    })
    if (this.props.mode === 'alarmClock' || this.props.mode === 'delay' || this.props.mode === 'countDown') {
      const range = [
        [
          ...this.getTimeRange(0, 23),
        ],
        [
          ...this.getTimeRange(0, 59),
        ],
        [
          ...this.getTimeRange(0, 59),
        ]
      ]
      eventObj.detail.value = index.map((n, i) => range[i][n]).join(':')

      this.props.onChange && this.props.onChange(eventObj)
    }
  }
  onColumnChange (height, columnId, e) {
    this.onChange(e)
  }
  private showPicker () {
    this.setState({
      hidden: false
    })
  }
  public render(): JSX.Element {
    // 闹钟
    const getAlarmClockOrCountDown = (label = ['','']) => {
      const hourRange = [
        ...this.getTimeRange(0, 23),
      ]
      const minRange = [
        ...this.getTimeRange(0, 59),
      ]
      return ([
        <ZOPickerView
          label={label[0]}
          onColumnChange={ this.delayChange.bind(this) }
          range={hourRange}
          height={this.state.height[0]}
          updateHeight={this.updateHeight.bind(this)}
          columnId='0'
        >
        </ZOPickerView>,
        <ZOPickerView
          label={label[1]}
          onColumnChange={ this.delayChange.bind(this) }
          range={minRange}
          height={this.state.height[1]}
          updateHeight={this.updateHeight.bind(this)}
          columnId='1'
        >
        </ZOPickerView>
      ])
    }
    const getDelay = (label = ['时','分', '秒']) => {
      const hourRange = [
        ...this.getTimeRange(0, 23)
      ]
      const minRange = [
        ...this.getTimeRange(0, 59)
      ]
      return ([
        <ZOPickerView
          label={label[0]}
          onColumnChange={ this.delayChange.bind(this) }
          range={hourRange}
          height={this.state.height[0]}
          updateHeight={this.updateHeight.bind(this)}
          columnId='0'
        >
        </ZOPickerView>,
        <ZOPickerView
          label={label[1]}
          onColumnChange={ this.delayChange.bind(this) }
          range={minRange}
          height={this.state.height[1]}
          updateHeight={this.updateHeight.bind(this)}
          columnId='1'
        >
        </ZOPickerView>,
        <ZOPickerView
          label={label[2]}
          onColumnChange={ this.delayChange.bind(this) }
          range={minRange}
          height={this.state.height[2]}
          updateHeight={this.updateHeight.bind(this)}
          columnId='2'
        >
        </ZOPickerView>
      ])
    }
    let pickerView
    switch (this.props.mode) {
      case 'alarmClock':
        pickerView = getAlarmClockOrCountDown(['', ''])
        break
      case 'delay':
        pickerView = getDelay()
        break
      case 'countDown':
        pickerView = getAlarmClockOrCountDown(['小时', '分钟'])
        break
      default:
        pickerView = getAlarmClockOrCountDown(['', ''])
    }

    const rootClass = classNames(
      'zo-picker',
      this.props.className
    )

    if (this.props.mode === 'alarmClock' || this.props.mode === 'delay' ) {
      return (
        <View className='zo-picker__bd'>
          {
            pickerView
          }
          {this.props.mode === 'alarmClock' && <View className="zo-picker__bd__desc">:</View>}
        </View>
      )
    } else {
      return (
        <View className={ rootClass }>
          <View onClick={this.showPicker.bind(this)}>
            {this.props.children}
          </View>
          {
            <ZOActionSheet onClose={() => {this.setState({hidden: true})}} isOpened={!this.state.hidden}>
              <View className="zo-picker__hd">
                <View onClick={ this.onCancel.bind(this)} className="zo-picker__hd__action">取消</View>
                <View className="zo-picker__title">
                {
                  this.props.title
                }
                </View>
                <View onClick={ this.onChange.bind(this)} className="zo-picker__hd__action">确定</View>
              </View>
              <View className='zo-picker__bd'>
                {
                  pickerView
                }
                {this.props.mode === 'alarmClock' && <View className="zo-picker__bd__desc">:</View>}
              </View>
            </ZOActionSheet>
          }
        </View>
      )
    }

  }
}
