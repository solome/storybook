import React from 'react'
import { Meta, StoryObj } from "@storybook/react"
import CSS3DCube from '.'



const meta: Meta<typeof CSS3DCube> = {
  title: "css/CSS3DCube",
  component: CSS3DCube,
  args: {}
};

export default meta;

type Story = StoryObj<typeof CSS3DCube>;

export const Primary: Story = {
  args: {},
}

