import classNames from 'classnames'
import ZOComponent from '../../common/component'
import { View } from '@tarojs/components'

import { ZODefaultPageProps } from 'types/default-page'
export default class ZODefaultPage extends ZOComponent<ZODefaultPageProps> {
	public render(): JSX.Element {
		const rootClass = classNames(
      'zo-default-page',
      this.props.className
    )
		return (
			<View className={rootClass}>
				1112
			</View>
		)
	}
}