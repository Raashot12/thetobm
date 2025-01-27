import React from 'react';
import styled from '@emotion/styled';
import { Box, Container } from '@mantine/core';

import 'aos/dist/aos.css';

import { useRouter } from 'next/router';
import { appColors } from '@/components/appColors';
import { Layout } from '@/components/Layout';
import Navbar from '@/components/Navigation/Navbar';
import AOSInit from '@/components/shared/AOSInit';

const ImageWrapper = styled.div`
  position: relative;
  overflow: hidden;
`;
const GradientOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 7px;
  height: 700px;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1;
  @media (max-width: 48em) {
    height: 700px;
  }
`;
const ButtonStyled = styled.button`
  background: ${appColors.deepBrown};
  font-weight: 500;
  font-size: 16;
  margin-top: 40px;
  outline: none;
  cursor: pointer;
  z-index: 4;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 4px solid #1c0010;
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 153px;
  height: 3rem;
  color: 'white';
  border-radius: 50px;
  position: relative;
  z-index: 2;
`;
const FOUR404Page = () => {
  AOSInit({
    disable: false,
  });
  const { push } = useRouter();
  return (
    <Layout pageTitle="404">
      <ImageWrapper>
        <Box
          sx={{
            backgroundImage:
              'url(https://www.seekahost.com/wp-content/uploads/2017/11/404-page-not-found.jpg)',
            backgroundSize: 'cover',
            height: '700px',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            '@media (max-width: 48em)': {
              height: '700px',
            },
          }}
        >
          <Box sx={{ position: 'relative', zIndex: 2, width: '100%', top: 0 }}>
            <Navbar />
          </Box>
          <Container size="xl">
            <Box sx={{ position: 'relative', zIndex: 2 }} mt={{ base: 148 }}>
              <Box
                c={appColors.white}
                fw={600}
                fz={{ base: 38, sm: 40, md: 64 }}
                lh={{ base: '40px', md: '64px' }}
                ta="center"
                w="712px"
                maw="100%"
                mx="auto"
                data-aos="fade-down"
                data-aos-duration="2000"
                sx={{ letterSpacing: '-0.5px' }}
              >
                Looks Like You&apos;re House Hunting in the Wrong Neighborhood!
              </Box>
            </Box>

            <ButtonStyled style={{ marginTop: 30, color: 'white' }} onClick={() => push('/')}>
              Back to home
            </ButtonStyled>
          </Container>
        </Box>
        <GradientOverlay />
      </ImageWrapper>
    </Layout>
  );
};

export default FOUR404Page;
