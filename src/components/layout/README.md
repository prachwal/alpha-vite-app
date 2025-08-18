# Layout Components

This directory contains layout components for building responsive and flexible layouts.

## Components

### Container

A responsive container component that provides consistent max-width and padding.

```tsx
import { Container } from '@components/layout';

<Container maxWidth="lg" padding="md" centered>
  <div>Your content here</div>
</Container>;
```

### Grid

A CSS Grid component for creating responsive grid layouts.

```tsx
import { Grid, GridItem } from '@components/layout';

<Grid columns={3} gap="md">
  <GridItem span={2}>Main content</GridItem>
  <GridItem span={1}>Sidebar</GridItem>
</Grid>;
```

### Stack

A flexbox-based layout component for vertical or horizontal stacking.

```tsx
import { Stack } from '@components/layout';

<Stack direction="vertical" gap="md" align="center">
  <div>Item 1</div>
  <div>Item 2</div>
</Stack>;
```

### Divider

A horizontal or vertical divider component.

```tsx
import { Divider } from '@components/layout';

<Divider orientation="horizontal" variant="solid" />;
```

### Spacer

A flexible spacer component for creating consistent spacing.

```tsx
import { Spacer } from '@components/layout';

<Spacer size="md" />;
```

## Usage Examples

### Basic Layout

```tsx
<Container maxWidth="lg">
  <Stack direction="vertical" gap="lg">
    <h1>Page Title</h1>
    <Grid columns={2} gap="md">
      <GridItem>
        <Card>Content 1</Card>
      </GridItem>
      <GridItem>
        <Card>Content 2</Card>
      </GridItem>
    </Grid>
  </Stack>
</Container>
```
