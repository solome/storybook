import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import SnowEffect from './SnowEffect'

import '../stylesheets/stories.css'

export default {
	title: 'WebGL/SpecialEffect',
	component: SnowEffect,
} as ComponentMeta<typeof SnowEffect>

const style: React.CSSProperties = {
	width: '100%',
	height: '100%',
	minHeight: '320px',
	backgroundColor: 'black',
	position: 'relative',
}

const Template: ComponentStory<typeof SnowEffect> = (args) => (
	<div className="storybook-SnowEffect" style={style}>
		<SnowEffect {...args} />
	</div>
)

export const Snow = Template.bind({})
Snow.args = {
	amount: 180,
	fallSpeen: 2,
}
