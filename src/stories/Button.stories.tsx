import { Button } from "../index";
import { ComponentMeta, ComponentStory } from "@storybook/react";

export default {
  title: "Button",
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => (
  <Button {...args}>Button</Button>
);

export const Normal = Template;
