import React from 'react';
import { Box, Container, Divider, Flex, Grid, Group, Text } from '@mantine/core';
import { footerMenu, solution, whatwedo } from '@/constants';
import { appColors } from '../appColors';
import FooterLogo from '../Icons/FooterLogo';
import IconEmail from '../Icons/IconEmail';
import IconFacebook from '../Icons/IconFacebook';
import IconLinkedIn from '../Icons/IconLinkedIn';
import IconPhoneNumber from '../Icons/IconPhoneNumber';
import IconTwitter from '../Icons/IconTwitter';

const FooterSection = () => (
  <Box sx={{ background: '#11040E' }} py={72}>
    <Container size="xl">
      <Grid gutter={50}>
        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
          <Box sx={{ cursor: 'pointer' }}>
            <FooterLogo />
          </Box>

          <Text fw={400} c={appColors?.white} fz={{ base: 14, md: 16 }}>
            Tobams Group is an innovative consultancy firm reshaping the future of tech talent
            development in Africa, specializing in talent acquisition, internships, and skill
            development with a global perspective.
          </Text>
          <Group pos="relative" sx={{ zIndex: 2, cursor: 'pointer' }} mt={35}>
            <IconLinkedIn />
            <IconFacebook />
            <IconTwitter />
          </Group>
        </Grid.Col>

        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
          <Text fw={700} fz={{ base: 18, md: 20 }} c={appColors?.white}>
            What We Do
          </Text>
          <Flex
            direction="column"
            rowGap={9}
            c={appColors?.white}
            mt={14}
            fz={{ base: 14, md: 16 }}
            sx={{ cursor: 'pointer' }}
          >
            {whatwedo?.map((value, index) => <Box key={index}>{value}</Box>)}
          </Flex>
        </Grid.Col>

        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
          <Text fw={700} fz={{ base: 18, md: 20 }} c={appColors?.white}>
            Company
          </Text>
          <Flex
            direction="column"
            rowGap={9}
            c={appColors?.white}
            mt={14}
            fz={{ base: 14, md: 16 }}
            sx={{ cursor: 'pointer' }}
          >
            {footerMenu?.map((value, index) => <Box key={index}>{value?.pathName}</Box>)}
          </Flex>
        </Grid.Col>

        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
          <Text fw={700} fz={{ base: 18, md: 20 }} c={appColors?.white}>
            Solution
          </Text>
          <Flex
            direction="column"
            rowGap={9}
            c={appColors?.white}
            mt={14}
            fz={{ base: 14, md: 16 }}
            sx={{ cursor: 'pointer' }}
          >
            {solution?.map((value, index) => <Box key={index}>{value}</Box>)}
          </Flex>
        </Grid.Col>
      </Grid>

      <Flex
        sx={{
          background: 'rgba(255, 255, 255, 0.06)',
          borderRadius: 8,
        }}
        p={{ base: 16, sm: 24 }}
        mt={40}
        wrap={{ base: 'wrap', sm: 'nowrap' }}
        columnGap={20}
        rowGap={20}
      >
        <Box>
          <Text fw={700} fz={{ base: 18, md: 20 }} c={appColors?.white}>
            Registered Offices
          </Text>
          <Box mt={5}>
            <Text sx={{ color: 'rgba(239, 67, 83, 1)' }} fw={400} fz={{ base: 16 }}>
              United Kingdom
            </Text>
            <Text fz={{ base: 14, md: 16 }} fw={400} c={appColors?.white}>
              07451196 (Registered by Company House) Vine Cottages, 215 North Street, Romford,
              Essex, United Kingdom, RM1 4QA
            </Text>
          </Box>
        </Box>
        <Divider orientation="vertical" c="#362A33" display={{ base: 'none', sm: 'block' }} />
        <Box display={{ base: 'none', sm: 'block' }}>
          <Text
            fw={700}
            sx={{ visibility: 'hidden' }}
            fz={{ base: 18, md: 20 }}
            c={appColors?.white}
          >
            Registered Offices
          </Text>
          <Box mt={5}>
            <Text sx={{ color: 'rgba(239, 67, 83, 1)' }} fw={400} fz={{ base: 16 }}>
              Nigeria
            </Text>
            <Text fz={{ base: 14, md: 16 }} fw={400} c={appColors?.white}>
              RC 1048722 (Registered by the Corporate Affairs Commission)4, Muaz Close, Angwar-Rimi
            </Text>
          </Box>
        </Box>
        <Divider orientation="vertical" c="#362A33" display={{ base: 'none', sm: 'block' }} />
        <Box>
          <Text fw={700} fz={{ base: 18, md: 20 }} c={appColors?.white}>
            Contact Information
          </Text>
          <Box>
            <Text
              sx={{ visibility: 'hidden' }}
              display={{ base: 'none', md: 'block' }}
              fw={400}
              fz={{ base: 16 }}
            >
              Nigeria
            </Text>
            <Group wrap="nowrap" gap={10}>
              <IconEmail />
              <Text fz={{ base: 14, md: 16 }} fw={400} c={appColors?.white}>
                theteam@tobamsgroup.com
              </Text>
            </Group>
            <Group wrap="nowrap" gap={10} mt={10}>
              <IconPhoneNumber />
              <Text fz={{ base: 14, md: 16 }} fw={400} c={appColors?.white}>
                +447886600748
              </Text>
            </Group>
          </Box>
        </Box>
        <Box display={{ base: 'block', sm: 'none' }}>
          <Box>
            <Text sx={{ color: 'rgba(239, 67, 83, 1)' }} fw={400} fz={{ base: 16 }}>
              Nigeria
            </Text>
            <Text fz={{ base: 14, md: 16 }} fw={400} c={appColors?.white}>
              RC 1048722 (Registered by the Corporate Affairs Commission)4, Muaz Close, Angwar-Rimi
            </Text>
          </Box>
        </Box>
      </Flex>
      <Box mt={50} h={1} bg="#291c26" w="100%"></Box>
      <Flex
        mt={{ base: 16, sm: 24 }}
        c={appColors?.white}
        justify="space-between"
        fw={300}
        fz={{ base: 14, sm: 16 }}
        flex="wrap"
        gap={20}
        direction={{ base: 'column-reverse', md: 'row' }}
        align={{ base: 'center', md: '' }}
      >
        <Text>Copyright ⓒ Tobams Group, 2024. All rights reserved.</Text>
        <Group>
          <Text td="underline">Terms and Conditions</Text>
          <Text td="underline">Privacy Policy</Text>
          <Text td="underline">Cookies Policy</Text>
        </Group>
      </Flex>
    </Container>
  </Box>
);

export default FooterSection;
