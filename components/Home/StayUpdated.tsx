import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import {
  Box,
  Button,
  Collapse,
  Container,
  Divider,
  Flex,
  Grid,
  Group,
  Image,
  Select,
  Text,
  TextInput,
} from '@mantine/core';
import { appColors } from '../appColors';
import IconSearch from '../Icons/IconSearch';
import InputArrow from '../Icons/InputArrow';
import AOSInit from '../shared/AOSInit';

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
const blogData = [
  {
    id: 1,
    title: 'Navigating the Digital Talent Landscape: Trends and Strategies',
    tag: 'IT Services',
    description:
      'In the ever-evolving digital landscape, staying ahead in the talent game is crucial for businesses striving for growth and success.',
    date: '30th March, 2023',
    readTime: '3 mins read',
    link: '/blog/navigating-digital-talent-landscape',
    image:
      'https://res.cloudinary.com/dhdkql4bu/image/upload/v1737960278/897b1b5871f1c6cf57313b443a0278ec_qdx5sw.jpg',
  },
  {
    id: 2,
    title: 'Mastering Leadership Excellence: A Gateway to Professional Growth',
    tag: 'Training and Development',
    description:
      'Mastering leadership skills is a crucial gateway to maximizing unparalleled success and achieving professional excellence.',
    date: '30th March, 2023',
    readTime: '3 mins read',
    link: '/blog/mastering-leadership-excellence',
    image:
      'https://res.cloudinary.com/dhdkql4bu/image/upload/v1737960769/edd520339919d90e1e3b041882218f7a_hhcrdt.jpg',
  },
  {
    id: 3,
    title: 'A Key Trend Shaping the Future of Digital Marketing',
    tag: 'IT Services',
    description:
      'One key trend emerges as a game-changer, redefining the landscape of digital marketing, Digital transformation.',
    date: '30th March, 2023',
    readTime: '3 mins read',
    link: '/blog/key-trend-digital-marketing',
    image:
      'https://res.cloudinary.com/dhdkql4bu/image/upload/v1737960769/2848a1ec8e14de7f25e39fa0ea813790_iiyy9q.jpg',
  },
  {
    id: 4,
    title: 'The Power of Strategic Partnerships: Driving Growth and Innovation',
    tag: 'Strategic Partnership',
    description:
      'Strategic partnerships allow organizations to leverage each other’s expertise, resources, and networks for mutual growth.',
    date: '30th March, 2023',
    readTime: '3 mins read',
    link: '/blog/power-of-strategic-partnerships',
    image:
      'https://res.cloudinary.com/dhdkql4bu/image/upload/v1737960770/65b562ac0b615e5276927e6b8594e742_ufpz8j.jpg',
  },
  {
    id: 5,
    title: 'Navigating Strategic Partnerships: Best Practices for Success',
    tag: 'Strategic Partnership',
    description:
      'Strategic partnerships hold immense potential for driving growth and creating value, but navigating them effectively is key.',
    date: '30th March, 2023',
    readTime: '3 mins read',
    link: '/blog/navigating-strategic-partnerships',
    image:
      'https://res.cloudinary.com/dhdkql4bu/image/upload/v1737960769/f7991ff6a2e8af51ac9dbf3f48ebc9f3_btuqc3.jpg',
  },
  {
    id: 6,
    title: 'Navigating Career Transitions: Tips for a Smooth Professional Journey',
    tag: 'Career Tips',
    description:
      'Career transitions are inevitable in today’s dynamic job market. Whether you’re switching industries or roles, here’s how to make it seamless.',
    date: '30th March, 2023',
    readTime: '3 mins read',
    link: '/blog/navigating-career-transitions',
    image:
      'https://res.cloudinary.com/dhdkql4bu/image/upload/v1737960769/f6e834a5474d3a477977364feee73948_m5v0uy.jpg',
  },
];

const StayUpdated = () => {
  const [openSelect, setOpenSelect] = useState(false);
  AOSInit({
    disable: false,
  });
  const router = useRouter();
  return (
    <Box sx={{ background: appColors?.white }} py={{ base: 40, md: 85 }}>
      <Container size="xl">
        <Text
          ta="center"
          sx={{ color: appColors?.textColor }}
          fw={600}
          fz={{ base: 20, md: 40 }}
          lh={{ base: '30px', md: '52px' }}
          maw="100%"
          mx="auto"
          display="block"
          data-aos="fade-right"
          data-aos-duration="2000"
        >
          Stay Updated with the Latest trends in Tobams Group
        </Text>
        <Flex mt={{ base: 25, md: 50 }} align="center" justify="center" gap={30} flex="wrap">
          <TextInput
            placeholder="Search"
            pos="relative"
            sx={{
              zIndex: 2,
              '::placeholder': {
                color: appColors?.placeholderColor,
              },
            }}
            rightSection={
              <Box sx={{ cursor: 'pointer' }}>
                <IconSearch />
              </Box>
            }
            w={635}
            maw="100%"
          />
          <Box display={{ base: 'none', sm: 'block' }}>
            <Select
              placeholder="Search"
              pos="relative"
              defaultSearchValue="All posts"
              data={['All posts']}
              sx={{
                zIndex: 2,
                '::placeholder': {
                  color: appColors?.placeholderColor,
                },
              }}
              rightSection={<InputArrow />}
              maw="100%"
            />
          </Box>
          <Flex
            align="center"
            justify="center"
            w={48}
            display={{ base: 'flex', sm: 'none' }}
            sx={{
              cursor: 'pointer',
              flexShrink: 0,
              zIndex: 2,
              height: '40px',
              borderRadius: 4,
              backgroundColor: appColors?.white,
              border: '0.5px solid rgba(21, 21, 21, 0.06)',
            }}
            pos="relative"
            onClick={() => setOpenSelect(!openSelect)}
          >
            <InputArrow />
          </Flex>
        </Flex>
        <Collapse in={openSelect} mt={10} maw="100%" display={{ base: 'block', sm: 'none' }}>
          <Select
            placeholder="Search"
            pos="relative"
            defaultSearchValue="All posts"
            data={['All posts']}
            sx={{
              input: {
                width: '100%',
              },
              zIndex: 2,
              '::placeholder': {
                color: appColors?.placeholderColor,
              },
            }}
            rightSection={<InputArrow />}
            maw="100%"
          />
        </Collapse>
        <Grid mt={70} gutter={20}>
          {blogData?.map(({ title, tag, readTime, description, image, date, id }) => (
            <Grid.Col
              span={{ base: 12, sm: 6, lg: 4 }}
              key={id}
              sx={{ cursor: 'pointer' }}
              data-aos="fade-right"
              data-aos-duration="2000"
              onClick={() => router.push(`blog/${id}`)}
            >
              <ImageWrapper>
                <Image
                  src={image}
                  alt={title}
                  height={300}
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
                <Box
                  sx={{
                    position: 'absolute',
                    top: 12,
                    left: 12,
                    background: 'rgba(128, 129, 135, 0.3)',
                    backdropFilter: 'blur(11px)',
                    borderRadius: 3,
                    padding: '6px 8px',
                    zIndex: 2,
                    color: appColors?.deepBrown,
                    fontWeight: 600,
                    fontSize: 16,
                  }}
                >
                  {tag}
                </Box>
              </ImageWrapper>
              <Flex direction="column" align="flex-start" mt={30}>
                <Text
                  fw={600}
                  fz={{ base: 16, md: 20 }}
                  mb={16}
                  sx={{ color: appColors?.blackPrimary }}
                >
                  {title}
                </Text>
                <Text ta="left" lineClamp={2} c={appColors?.placeholderColor}>
                  {description}
                </Text>
              </Flex>
              <Flex align="center" mt={16} justify="space-between">
                <Group c={appColors?.placeholderColor} fw={400}>
                  <Text ta="left">{date}</Text>
                  <Divider orientation="vertical" c={appColors?.placeholderColor} size={2} />
                  <Text ta="left">{readTime}</Text>
                </Group>
                <Text sx={{ textDecoration: 'underline', zIndex: 2 }} c="#571244" fw={400}>
                  View Post
                </Text>
              </Flex>
            </Grid.Col>
          ))}
          <Flex mt={50} justify="center" w="100%">
            <Button
              sx={{
                cursor: 'pointer',
                position: 'relative',
                zIndex: 2,
                '&.mantine-Button-root': {
                  background: appColors?.white,
                  color: appColors?.activeColor,
                  border: '1px solid #571244',
                },
              }}
              w={136}
            >
              Load More
            </Button>
          </Flex>
        </Grid>
      </Container>
    </Box>
  );
};

export default StayUpdated;
