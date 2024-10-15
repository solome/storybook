import React from 'react'
import { Meta, StoryObj } from "@storybook/react"
import { CSS3DRendererView } from '.'

const meta: Meta<typeof CSS3DRendererView> = {
  title: "three/CSS3DRenderer",
  component: CSS3DRendererView,
  args: {}
};

export default meta;

type Story = StoryObj<typeof CSS3DRendererView>;

export const Primary: Story = {
  args: {
   
  },
}
