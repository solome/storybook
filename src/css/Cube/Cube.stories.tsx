import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Cube from '.'

// import '../stylesheets/stories.css'

export default {
	title: 'css/Cube',
	component: Cube,
} as ComponentMeta<typeof Cube>

const Template: ComponentStory<typeof Cube> = () => <Cube />

export const cubeTpl = Template.bind({})
cubeTpl.storyName = 'Cube'
