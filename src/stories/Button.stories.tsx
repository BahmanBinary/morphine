import { Button } from "../index";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import Center from "./decorators/Center";

export default {
  title: "Button",
  component: Button,
  decorators: [
    (Story) => (
      <Center>
        <Story />
      </Center>
    ),
  ],
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => (
  <Button {...args}>Button</Button>
);

export const Normal = Template;
