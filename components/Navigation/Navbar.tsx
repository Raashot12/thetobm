import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { IconX } from '@tabler/icons-react';
import { Anchor, Box, Button, Container, Drawer, Flex, Group, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { appColors } from '../appColors';
import IconArrowDown from '../Icons/IconArrowDown';
import IconMenu from '../Icons/IconMenu';
import IconProfile from '../Icons/IconProfile';
import Logo from '../Icons/Logo';
import { navMenu } from '@/constants';

const ButtonStyled = styled.button`
  background: ${appColors.textColor};
  font-weight: 500;
  font-size: 16;
  color: ${appColors?.white};
  margin-top: 40px;
  outline: none;
  cursor: pointer;
  z-index: 4;
  border-top: none;
  border-left: none;
  border-right: none;
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 153px;
  @media (max-width: 36em) {
    width: 100%;
  }
  height: 3rem;
  border-radius: 50px;
`;

interface StyledLinkProps {
  nothomePage?: boolean;
}

const CustomLink = styled(Link)<StyledLinkProps>`
  font-weight: 500;
  line-height: 69px;
  font-size: 18px;
  z-index: 2;
  text-decoration: none;
  color: ${appColors?.blackPrimary};
  &.active {
    color: ${({ nothomePage }) => (nothomePage ? appColors.white : appColors.activeColor)};
    font-weight: 600;
  }
`;

const MobileLink = styled(Link)`
  font-weight: 500;
  line-height: 85px;
  font-size: rem(24);
  text-decoration: none;
  color: ${appColors?.blackPrimary};
  &.active {
    color: ${appColors.activeColor};
    font-weight: 700;
    text-decoration: underline;
  }
`;
const Navbar = ({ notHomePage }: { notHomePage?: boolean; type?: string }) => {
  const { push, pathname } = useRouter();
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);

  return (
    <Box sx={{ background: appColors?.white }}>
      <Box sx={{ borderBottom: '1px solid #DDD0DA' }}>
        <Container size="xl">
          <Flex
            justify="space-between"
            align="center"
            sx={{ zIndex: 5, height: 85 }}
            h={{ base: 'auto', sm: '85px' }}
          >
            <Box
              onClick={() => push('/')}
              sx={{ cursor: 'pointer', position: 'relative', zIndex: 2 }}
            >
              <Logo />
            </Box>

            <Group gap={24} display={{ base: 'none', sm: 'flex' }}>
              <Anchor
                target="_blank"
                sx={{
                  color: 'white',
                  display: 'inline-block',
                  textDecoration: 'none',
                  ':hover': {
                    textDecoration: 'none',
                  },
                }}
              >
                <Button
                  sx={{
                    cursor: 'pointer',
                    position: 'relative',
                    zIndex: 2,
                  }}
                  px={16}
                  leftSection={<IconProfile />}
                  rightSection={<IconArrowDown />}
                >
                  Account
                </Button>
              </Anchor>
              <Anchor
                target="_blank"
                sx={{
                  color: 'white',
                  display: 'inline-block',
                  textDecoration: 'none',
                  ':hover': {
                    textDecoration: 'none',
                  },
                }}
              >
                <Button
                  sx={{
                    cursor: 'pointer',
                    position: 'relative',
                    zIndex: 2,
                    '&.mantine-Button-root': {
                      background: appColors?.secondaryColor,
                    },
                  }}
                  px={16}
                >
                  Task Assessment
                </Button>
              </Anchor>
            </Group>
            <Flex
              display={{ base: 'flex', sm: 'none' }}
              align="center"
              onClick={toggleDrawer}
              sx={{ zIndex: 2 }}
            >
              <IconMenu />
            </Flex>
          </Flex>
        </Container>
        <Drawer
          opened={drawerOpened}
          onClose={closeDrawer}
          withCloseButton={false}
          size="100%"
          title={
            <Flex align="center" justify="space-between" w="100%" columnGap={20}>
              <Box onClick={() => push('/')} sx={{ cursor: 'pointer' }}>
                <Logo />
              </Box>
              <Box sx={{ zIndex: 2 }} onClick={() => closeDrawer()}>
                <IconX />
              </Box>
            </Flex>
          }
          hiddenFrom="sm"
          zIndex={10}
          sx={{
            '.mantine-Drawer-content': {
              background: appColors?.white,
            },
            '.mantine-Drawer-body': {
              paddingLeft: 0,
              paddingRight: 0,
            },
            '.mantine-Drawer-header': {
              background: appColors?.white,
              borderBottom: '1px solid #DDD0DA',
              paddingTop: 0,
              paddingBottom: 0,
            },
            '.mantine-Drawer-title': {
              width: '100%',
            },
          }}
        >
          <Stack gap={30} mt={20} sx={{ paddingLeft: 16, paddingRight: 16 }}>
            {navMenu.map((value) => (
              <React.Fragment key={value.id}>
                <Group gap={10}>
                  <MobileLink
                    href={value.route}
                    style={{ lineHeight: '42px', fontSize: 24 }}
                    className={
                      pathname === '/' && value.route === '/'
                        ? 'active'
                        : pathname.includes(value.route) && value.route !== '/'
                          ? 'active'
                          : 'not-active'
                    }
                  >
                    {value.pathName}
                  </MobileLink>
                  {value.icon}
                </Group>
              </React.Fragment>
            ))}
            <Anchor
              target="_blank"
              sx={{
                display: 'inline-block',
                color: '#380020',
                textDecoration: 'none',
                ':hover': {
                  textDecoration: 'none',
                },
                width: '153px',
                '@media (max-width: 36em)': {
                  width: '100%',
                },
              }}
            >
              <ButtonStyled>Download App</ButtonStyled>
            </Anchor>
          </Stack>
        </Drawer>
      </Box>
      <Container size="xl">
        <Group gap={30} display={{ base: 'none', sm: 'flex' }} justify="center">
          {navMenu.map((value) => (
            <React.Fragment key={value.id}>
              <Group gap={10}>
                <CustomLink
                  href={value.route}
                  nothomePage={notHomePage}
                  className={
                    pathname === '/' && value.route === '/'
                      ? 'active'
                      : pathname.includes(value.route) && value.route !== '/'
                        ? 'active'
                        : 'not-active'
                  }
                >
                  {value.pathName}
                </CustomLink>
                {value.icon}
              </Group>
            </React.Fragment>
          ))}
        </Group>
      </Container>
    </Box>
  );
};

export default Navbar;
