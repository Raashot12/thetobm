import React from 'react';
import { IconArticle, IconRefreshDot } from '@tabler/icons-react';
import { Box, Button, Center, Flex, Text } from '@mantine/core';
import { appColors } from '../appColors';

const EmptyState = ({
  resetFunct,
  emptyStateMessage,
  buttonText,
}: {
  resetFunct?: () => void;
  emptyStateMessage?: string;
  buttonText?: string;
}) => (
  <Center h={330} py={12}>
    <Box>
      <Flex align="center" justify="center">
        <Flex
          bg="#fffff"
          w={120}
          h={120}
          justify="center"
          align="center"
          mb={48}
          sx={{ borderRadius: '50%' }}
        >
          <IconArticle />
        </Flex>
      </Flex>
      <Text fz={16} fw={500} c={appColors.blackText} ta="center">
        No article found
      </Text>
      <Text mt={8} color={appColors.blackText} fw={500} ta="center">
        {emptyStateMessage}
      </Text>
      {buttonText && (
        <Flex align="center" justify="center" mt={32}>
          <Button
            h={32}
            sx={{ borderRadius: '4px', zIndex: 2 }}
            pos="relative"
            onClick={resetFunct}
            rightSection={<IconRefreshDot fill={appColors.white} />}
          >
            {buttonText}
          </Button>
        </Flex>
      )}
    </Box>
  </Center>
);

export default EmptyState;
