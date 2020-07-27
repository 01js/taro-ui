import classNames from 'classnames'
import isObject from 'lodash/isObject'
import PropTypes, { InferProps } from 'prop-types'
import { ZONavBarProps } from 'types/nav-bar'
import { Text, View, Image } from '@tarojs/components'
import { ITouchEvent } from '@tarojs/components/types/common'
import Taro from '@tarojs/taro'
import ZOComponent from '../../common/component'
import { initTestEnv } from '../../common/utils'

initTestEnv()
export default class ZONavBar extends ZOComponent<ZONavBarProps> {
  public static defaultProps: ZONavBarProps
  public static propTypes: InferProps<ZONavBarProps>

  private handleClickLeftView(event: ITouchEvent): void {
    this.props.onClickLeftIcon && this.props.onClickLeftIcon(event)
  }

  private handleClickSt(event: ITouchEvent): void {
    this.props.onClickRgIconSt && this.props.onClickRgIconSt(event)
  }

  private handleClickNd(event: ITouchEvent): void {
    this.props.onClickRgIconNd && this.props.onClickRgIconNd(event)
  }

  private handleClickAvatar (event: ITouchEvent): void {
    this.props.avatar && this.props.handleClickAvatar(event)
  }

  public render(): JSX.Element {
    const {
      customStyle,
      className,
      color,
      fixed,
      border,
      leftIconType,
      leftText,
      title,
      rightFirstIconType,
      rightSecondIconType
    } = this.props
    const linkStyle = { color }

    const defaultIconInfo = {
      customStyle: '',
      className: '',
      prefixClass: 'zo-icon',
      value: '',
      color: '',
      size: 24
    }

    const leftIconInfo = isObject(leftIconType)
      ? { ...defaultIconInfo, ...leftIconType }
      : { ...defaultIconInfo, value: leftIconType }
    const leftIconClass = classNames(
      leftIconInfo.prefixClass,
      {
        [`${leftIconInfo.prefixClass}-${leftIconInfo.value}`]: leftIconInfo.value
      },
      leftIconInfo.className
    )

    const rightFirstIconInfo = isObject(rightFirstIconType)
      ? { ...defaultIconInfo, ...rightFirstIconType }
      : { ...defaultIconInfo, value: rightFirstIconType }
    const rightFirstIconClass = classNames(
      rightFirstIconInfo.prefixClass,
      {
        [`${rightFirstIconInfo.prefixClass}-${rightFirstIconInfo.value}`]: rightFirstIconInfo.value
      },
      rightFirstIconInfo.className
    )

    const rightSecondIconInfo = isObject(rightSecondIconType)
      ? { ...defaultIconInfo, ...rightSecondIconType }
      : { ...defaultIconInfo, value: rightSecondIconType }
    const rightSecondIconClass = classNames(
      rightSecondIconInfo.prefixClass,
      {
        [`${rightSecondIconInfo.prefixClass}-${rightSecondIconInfo.value}`]: rightSecondIconInfo.value
      },
      rightSecondIconInfo.className
    )

    return (
      <View
        className={classNames(
          {
            'zo-nav-bar': true,
            'zo-nav-bar--fixed': fixed,
            'zo-nav-bar--no-border': !border
          },
          className
        )}
        style={
          {
            ...customStyle,
            'padding-top': Taro.getEnv() === Taro.ENV_TYPE.WEAPP ? Number(Taro.$navBarMarginTop ? Taro.$navBarMarginTop : 0 )  + 'rpx' : ''
          }
        }
      >
        <View
          className='zo-nav-bar__left-view'
          onClick={this.handleClickLeftView.bind(this)}
          style={linkStyle}
        >
          {leftIconType && (
            <Text
              className={leftIconClass}
              style={this.mergeStyle(
                {
                  color: leftIconInfo.color,
                  fontSize: `${Taro.pxTransform(
                    parseInt(leftIconInfo.size.toString()) * 2
                  )}`
                },
                leftIconInfo.customStyle
              )}
            ></Text>
          )}
          <Text className='zo-nav-bar__text'>{leftText}</Text>
        </View>
        <View className='zo-nav-bar__title'>
          {title || this.props.children}
        </View>
        {
          this.props.avatar ? <View onClick={ this.handleClickAvatar.bind(this) } className='zo-nav-bar__right-view'>
            <View className="zo-nav-bar__avatar-wrap">
              <Image src={this.props.avatar}/>
            </View>
          </View> :
          <View className='zo-nav-bar__right-view'>
            <View
              className={classNames({
                'zo-nav-bar__container': true,
                'zo-nav-bar__container--hide': !rightSecondIconType
              })}
              style={linkStyle}
              onClick={this.handleClickNd.bind(this)}
            >
              {rightSecondIconType && (
                <Text
                  className={rightSecondIconClass}
                  style={this.mergeStyle(
                    {
                      color: rightSecondIconInfo.color,
                      fontSize: `${Taro.pxTransform(
                        parseInt(rightSecondIconInfo.size.toString()) * 2
                      )}`
                    },
                    rightSecondIconInfo.customStyle
                  )}
                ></Text>
              )}
            </View>
            <View
              className={classNames({
                'zo-nav-bar__container': true,
                'zo-nav-bar__container--hide': !rightFirstIconType
              })}
              style={linkStyle}
              onClick={this.handleClickSt.bind(this)}
            >
              {rightFirstIconType && (
                <Text
                  className={rightFirstIconClass}
                  style={this.mergeStyle(
                    {
                      color: rightFirstIconInfo.color,
                      fontSize: `${Taro.pxTransform(
                        parseInt(rightFirstIconInfo.size.toString()) * 2
                      )}`
                    },
                    rightFirstIconInfo.customStyle
                  )}
                ></Text>
              )}
            </View>
          </View>
        }

      </View>
    )
  }
}

ZONavBar.defaultProps = {
  customStyle: '',
  className: '',
  fixed: false,
  border: false,
  color: '',
  leftIconType: '',
  leftText: '',
  title: '',
  rightFirstIconType: '',
  rightSecondIconType: '',
  onClickLeftIcon: () => {},
  onClickRgIconSt: () => {},
  onClickRgIconNd: () => {},
  handleClickAvatar: () => {},
}

ZONavBar.propTypes = {
  avatar: PropTypes.string,
  customStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  className: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  fixed: PropTypes.bool,
  border: PropTypes.bool,
  color: PropTypes.string,
  leftIconType: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  leftText: PropTypes.string,
  title: PropTypes.string,
  rightFirstIconType: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  rightSecondIconType: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  onClickLeftIcon: PropTypes.func,
  onClickRgIconSt: PropTypes.func,
  onClickRgIconNd: PropTypes.func,
  handleClickAvatar: PropTypes.func
}
