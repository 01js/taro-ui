import classNames from 'classnames'
import ZOComponent from '../../common/component'
import { View, Image } from '@tarojs/components'

import { ZODefaultPageProps } from 'types/default-page'
export default class ZODefaultPage extends ZOComponent<ZODefaultPageProps> {
	public render(): JSX.Element {
		const {
			pic
		} = this.props
		const rootClass = classNames(
      'zo-default-page',
      this.props.className
    )
		return (
			<View className={rootClass}>
				{pic && <Image src={pic}/>}
			</View>
		)
	}
}