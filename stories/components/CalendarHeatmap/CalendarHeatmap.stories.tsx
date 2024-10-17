import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { CalendarHeatmap } from '.'

import { data } from './__data__'


const meta: Meta<typeof CalendarHeatmap> = {
  title: 'Components/CalendarHeatmap',
  component: CalendarHeatmap,
};

export default meta;

type Story = StoryObj<typeof CalendarHeatmap>;

export const Demo1: Story = {
  args: {
    data: data,
    year: 2023,
  }
}

