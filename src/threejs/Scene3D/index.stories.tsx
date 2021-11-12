import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Scene3D } from '.'

// import '../stylesheets/stories.css'

export default {
	title: 'three/Scene3D',
	component: Scene3D,
} as ComponentMeta<typeof Scene3D>

const Template: ComponentStory<typeof Scene3D> = () => <Scene3D />

export const css3DRendererTpl = Template.bind({})
css3DRendererTpl.storyName = 'Scene3D'
