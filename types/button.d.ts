import AtComponent from './base'
import { ComponentClass } from 'react'

export interface AtButtonProps extends AtComponent {
}
export interface AtButtonState {}

declare const AtButton: ComponentClass<AtButtonProps>
export default AtButton
