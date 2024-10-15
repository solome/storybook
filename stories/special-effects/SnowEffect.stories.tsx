import React from "react"
import { Meta, StoryObj } from "@storybook/react"
import SnowEffect from "./SnowEffect"

import "../stylesheets/stories.css";

const meta: Meta<typeof SnowEffect> = {
  title: "WebGL/SpecialEffect/SnowEffect",
  component: SnowEffect,
};

export default meta;

type Story = StoryObj<typeof SnowEffect>;

export const Primary: Story = {
  args: {
    amount: 180,
    fallSpeed: 2,
  },

  render: (args) => {
    return (
      <div className="storybook-SnowEffect" style={style}>
        <SnowEffect {...args} />
      </div>
    );
  },
};

const style: React.CSSProperties = {
  width: "100%",
  height: "100%",
  minHeight: "320px",
  backgroundColor: "rgba(79, 89, 102, 0.88)",
  position: "relative",
};

