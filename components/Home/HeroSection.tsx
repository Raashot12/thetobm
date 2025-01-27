import styled from '@emotion/styled';
import { Box, Container, Flex } from '@mantine/core';
import blog from '../images/blog.jpeg';

import 'aos/dist/aos.css';

import { appColors } from '../appColors';
import AOSInit from '../shared/AOSInit';

const text = 'Insights that inspire success: uncover a wealth of knowledge by staying updated';

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
  height: 500px;
  background: rgba(0, 0, 0, 0.7);
  z-index: 1;
  @media (max-width: 48em) {
    height: 241px;
  }
`;
const HeroSection = () => {
  AOSInit({
    disable: false,
  });

  return (
    <ImageWrapper>
      <Flex
        sx={{
          backgroundImage: `url(${blog.src})`,
          backgroundSize: 'cover',
          height: '500px',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          '@media (max-width: 48em)': {
            height: '241px',
          },
        }}
        justify="center"
        align="center"
      >
        <Container size="xl">
          <Box sx={{ position: 'relative', zIndex: 2 }}>
            <Box
              c={appColors.white}
              fw={{ base: 700 }}
              fz={{ base: '20px', md: '48px' }}
              lh={{ base: '25.7px', md: '61.68px' }}
              ta="center"
              maw="100%"
              mx="auto"
              data-aos="fade-right"
              data-aos-duration="2000"
            >
              Stay Ahead Of The Curve: Stay Informed With Our Blog For The Latest Industry Insights
            </Box>

            <Box
              sx={{ fontWeight: 'bold', textAlign: 'center' }}
              fz={{ base: 18 }}
              mt={16}
              c={appColors.white}
              pt={10}
              mb={12}
              data-aos="fade-up"
              data-aos-duration="2000"
            >
              {text}
            </Box>
          </Box>
        </Container>
      </Flex>
      <GradientOverlay />
    </ImageWrapper>
  );
};

export default HeroSection;
