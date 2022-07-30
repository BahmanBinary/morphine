import { Button } from "../index";
import { ComponentMeta, ComponentStory } from "@storybook/react";

export default {
  title: "Button",
  component: Button,
} as ComponentMeta<typeof Button>;

export const Normal: ComponentStory<typeof Button> = () => (
  <Button>Normal Button</Button>
);

export const SmallSize: ComponentStory<typeof Button> = () => (
  <Button size="sm">Small Size Button</Button>
);

export const MediumSize: ComponentStory<typeof Button> = () => (
  <Button size="md">Medium Size Button</Button>
);

export const LargeSize: ComponentStory<typeof Button> = () => (
  <Button size="lg">Large Size Button</Button>
);

export const Primary: ComponentStory<typeof Button> = () => (
  <Button buttonType="primary">Primary Button</Button>
);

export const Secondary: ComponentStory<typeof Button> = () => (
  <Button buttonType="secondary">Secondary Button</Button>
);

export const Success: ComponentStory<typeof Button> = () => (
  <Button buttonType="success">Success Button</Button>
);

export const Warning: ComponentStory<typeof Button> = () => (
  <Button buttonType="warning">Warning Button</Button>
);

export const Error: ComponentStory<typeof Button> = () => (
  <Button buttonType="error">Error Button</Button>
);

export const Info: ComponentStory<typeof Button> = () => (
  <Button buttonType="info">Info Button</Button>
);
