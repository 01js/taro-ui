import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Picker } from '@tarojs/components'

// components
import { default as ZOPickerView } from '../../components/picker-view'

import { connect } from '@tarojs/redux'

import { add, minus, asyncAdd } from '../../actions/counter'

import './index.scss'

const LINE_HEIGHT = 56
const TOP = 56
// #region 书写注意
//
// 目前 typescript 版本还无法在装饰器模式下将 Props 注入到 Taro.Component 中的 props 属性
// 需要显示声明 connect 的参数类型并通过 interface 的方式指定 Taro.Component 子类的 props
// 这样才能完成类型检查和 IDE 的自动提示
// 使用函数模式则无此限制
// ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20796
//
// #endregion

type PageStateProps = {
  counter: {
    num: number
  }
}

type PageDispatchProps = {
  add: () => void
  dec: () => void
  asyncAdd: () => any
}

type PageOwnProps = {}

type PageState = {
  height: Array<any>,
  selector: Array<any>,
  selectorChecked: string,
  index: Array<any>,
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Index {
  props: IProps;
}

@connect(({ counter }) => ({
  counter
}), (dispatch) => ({
  add () {
    dispatch(add())
  },
  dec () {
    dispatch(minus())
  },
  asyncAdd () {
    dispatch(asyncAdd())
  }
}))
class Index extends Component {

    /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '首页'
  }
  constructor (props) {
    super(props)
    this.handlePrpos()
    this.state = {
      height: [],
      selector: ['美国', '中国', '巴西', '日本'],
      selectorChecked: '美国',
      timeSel: '12:01',
      index: []
    }
  }

  handlePrpos (nextProps = this.props) {
    this.setState(() =>({
      index: [0]
    }))
  }
  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () {
    const height = this.state.index.map((i, idx) => {
      let factor = 0

      return TOP - LINE_HEIGHT * i - factor
    })

    this.setState({
      hidden: false,
      height
    })
  }

  componentDidHide () { }
  updateHeight (height, columnId) {
    console.log(height, columnId)
    this.setState(prevState => {
      prevState.height[columnId] = height
      return { height: prevState.height }
    })
  }
  onChange = e => {
    this.setState({
      timeSel: e.detail.value
    })
  }
  render () {
    return (
      <View className='index'>
        <View className='page-section'>
          <Text>地区选择器</Text>
          <View>
            <Picker mode='time' value="11:21" onChange={this.onChange}>
              <View className='picker'>
                当前选择：{this.state.timeSel}
              </View>
            </Picker>
          </View>
        </View>
        <View className="picker-view-wrap">
          <ZOPickerView height={this.state.height[0]} columnId={0} updateHeight={ this.updateHeight.bind(this) } range={[1, 2, 3, 4, 5, 6, 2, 3, 4, 5, 6, 2, 3, 4, 5, 6, 2, 3, 4, 5, 6, 2, 3, 4, 5, 6, 2, 3, 4, 5, 6, 2, 3, 4, 5, 6, 2, 3, 4, 5, 6, 2, 3, 4, 5, 6, 2, 3, 4, 5, 6, 2, 3, 4, 5, 6, 2, 3, 4, 5, 6]}>
          </ZOPickerView>
        </View>

      </View>
    )
  }
}

// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion

export default Index as ComponentClass<PageOwnProps, PageState>
