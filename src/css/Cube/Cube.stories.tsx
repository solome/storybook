import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Cube from '.'

export default {
	title: 'css/CSS3DCube',
	component: Cube,
} as ComponentMeta<typeof Cube>

const Template: ComponentStory<typeof Cube> = () => <Cube />

export const cubeTpl = Template.bind({})
cubeTpl.storyName = 'CSS3DCube'
