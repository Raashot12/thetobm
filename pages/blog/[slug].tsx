import React from 'react';
import Image from 'next/image';
import styled from '@emotion/styled';
import { Box, Container, Text } from '@mantine/core';
import { appColors } from '@/components/appColors';
import { Layout } from '@/components/Layout';
import AOSInit from '@/components/shared/AOSInit';

const ImageWrapper = styled.div`
  position: relative;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  overflow: hidden;
`;
const GradientOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.3));
  z-index: 1;
`;
const BlogDetailPage = () => {
  AOSInit({
    disable: false,
  });
  return (
    <Layout pageTitle="Blog Information">
      <Container size="xl">
        {' '}
        <Box
          mt={50}
          sx={{
            background: 'rgba(128, 129, 135, 0.3)',
            backdropFilter: 'blur(11px)',
            borderRadius: 3,
            padding: '6px 8px',
            zIndex: 2,
            color: appColors?.deepBrown,
            fontWeight: 600,
            fontSize: 16,
            width: 'fit-content',
          }}
        >
          Strategic Partnership
        </Box>
        <Text
          fz={{ base: 20, sm: 30, md: 42 }}
          mt={20}
          fw={700}
          lh={{ base: '32px', lg: '67.2px' }}
          data-aos="fade-right"
          data-aos-duration="2000"
        >
          Navigating Strategic Partnerships: Best Practices for Success
        </Text>
        <Text fw={400} c="#6C757D" mt={5}>
          30th March, 2023
        </Text>
        <ImageWrapper>
          <Image
            src=""
            alt=""
            height={559}
            loading="lazy"
            style={{
              borderTopLeftRadius: '16px',
              borderTopRightRadius: '16px',
              objectFit: 'cover',
              width: '100%',
              position: 'relative',
            }}
          />
          <GradientOverlay />
        </ImageWrapper>
      </Container>
    </Layout>
  );
};

export default BlogDetailPage;
