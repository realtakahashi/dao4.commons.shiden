import { Container, Group, ActionIcon, Text } from '@mantine/core';
import { Twitter, Youtube, Instagram } from 'react-feather';


export function MDfCFooter() {

  return (
    <div>
      <Container className='bg-white flex justify-between items-center pt-3 pb-3'>
        <Text color="dimmed" size="sm">
          © 2023 realtakahashi.inc All rights reserved.
        </Text>
        <Group spacing={0}  position="right" noWrap>
          <ActionIcon size="lg">
            <Twitter size={25} />
          </ActionIcon>
          <ActionIcon size="lg">
            <Youtube size={25} />
          </ActionIcon>
          <ActionIcon size="lg" >
            <Instagram size={25} />
          </ActionIcon>
        </Group>
      </Container>
    </div>
  );
}