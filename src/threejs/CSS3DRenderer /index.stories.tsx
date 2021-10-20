import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { CSS3DRendererView } from '.'

// import '../stylesheets/stories.css'

export default {
	title: 'three/CSS3DRenderer',
	component: CSS3DRendererView,
} as ComponentMeta<typeof CSS3DRendererView>

const Template: ComponentStory<typeof CSS3DRendererView> = () => <CSS3DRendererView />

export const css3DRendererTpl = Template.bind({})
css3DRendererTpl.storyName = 'CSS3DRenderer'
