import { Grid, GridItem } from '../index';

export default {
  title: 'Layout/Grid',
  component: Grid,
  argTypes: {
    columns: {
      control: { type: 'number', min: 1, max: 12 },
    },
    gap: {
      control: { type: 'select' },
      options: ['none', 'sm', 'md', 'lg', 'xl'],
    },
  },
};

export const Default = {
  args: {
    columns: 12,
    gap: 'md',
  },
  render: (args: any) => (
    <Grid {...args}>
      <GridItem span={4}>
        <div className="bg-primary/10 p-4 rounded">Item 1</div>
      </GridItem>
      <GridItem span={4}>
        <div className="bg-secondary/10 p-4 rounded">Item 2</div>
      </GridItem>
      <GridItem span={4}>
        <div className="bg-accent/10 p-4 rounded">Item 3</div>
      </GridItem>
    </Grid>
  ),
};

export const Responsive = () => (
  <Grid columns={4} gap="md">
    <GridItem>
      <div className="bg-primary/10 p-4 rounded">Responsive 1</div>
    </GridItem>
    <GridItem>
      <div className="bg-secondary/10 p-4 rounded">Responsive 2</div>
    </GridItem>
    <GridItem>
      <div className="bg-accent/10 p-4 rounded">Responsive 3</div>
    </GridItem>
    <GridItem>
      <div className="bg-success/10 p-4 rounded">Responsive 4</div>
    </GridItem>
  </Grid>
);

export const ComplexLayout = () => (
  <Grid columns={12} gap="lg">
    <GridItem span={12}>
      <div className="bg-primary/10 p-4 rounded">Header</div>
    </GridItem>
    <GridItem span={3}>
      <div className="bg-secondary/10 p-4 rounded">Sidebar</div>
    </GridItem>
    <GridItem span={9}>
      <div className="bg-accent/10 p-4 rounded">Main Content</div>
    </GridItem>
    <GridItem span={12}>
      <div className="bg-success/10 p-4 rounded">Footer</div>
    </GridItem>
  </Grid>
);
