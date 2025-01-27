import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import moment from 'moment';
import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Grid,
  Group,
  Image,
  Skeleton,
  Stack,
  Text,
} from '@mantine/core';
import { appColors } from '@/components/appColors';
import NewsLetter from '@/components/Home/NewsLetter';
import { Layout } from '@/components/Layout';
import AOSInit from '@/components/shared/AOSInit';
import EmptyState from '@/components/shared/EmptyState';
import {
  Article,
  useApiServicesAppBlogSearchApiQuery,
  useApiServicesAppBlogSingleDataApiQuery,
} from '@/components/state/blog';
import { content } from '@/constants';

const ImageWrapper = styled.div`
  position: relative;
  border-radius: 16px 16px 0 0;
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
  AOSInit({ disable: false });
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [blogDetailsData, setblogDetailsData] = useState<Article>();
  const router = useRouter();
  const { slug } = router.query;

  const {
    data: blogDetails,
    isError: isErrorDetails,
    isFetching: isLoadingDetails,
    refetch: refetchDetails,
  } = useApiServicesAppBlogSingleDataApiQuery(
    {
      singleId: slug as string,
    },
    {
      skip: !slug,
    }
  );

  const {
    data: blogList,
    isFetching: isLoadingList,
    isError: isErrorList,
    refetch: refetchList,
  } = useApiServicesAppBlogSearchApiQuery({}, { skip: !slug });

  useEffect(() => {
    if (!isLoadingDetails && !isErrorDetails && blogDetails) {
      setblogDetailsData(blogDetails as Article);

      setIsDataLoading(false);
    } else if (!isLoadingDetails && isErrorDetails) {
      setblogDetailsData(undefined);
      setIsDataLoading(false);
    }
  }, [blogDetails, isLoadingDetails, isErrorDetails]);
  const renderBlogList = () => {
    if (isLoadingList) {
      return <Skeleton height={300} width="100%" />;
    }

    if (isErrorList) {
      return (
        <EmptyState
          emptyStateMessage="An error occurred while fetching blogs."
          buttonText="Try Again"
          resetFunct={() => refetchList()}
        />
      );
    }

    if (!blogList || blogList.length === 0) {
      return (
        <EmptyState
          emptyStateMessage="No blogs found for your query."
          buttonText="Refresh"
          resetFunct={() => refetchList()}
        />
      );
    }

    return (
      <Grid mt={70} gutter={20}>
        {blogList.slice(0, 3).map((blog) => (
          <Grid.Col
            span={{ base: 12, sm: 6, lg: 4 }}
            key={blog.id}
            sx={{ cursor: 'pointer', zIndex: 2 }}
            data-aos="fade-right"
            data-aos-duration="2000"
            onClick={() => (isLoadingList ? null : router.push(`/blog/${blog.id}`))}
          >
            <Skeleton visible={isLoadingList}>
              <ImageWrapper>
                <Image
                  src={blog.cover_image || 'https://via.placeholder.com/300?text=No+Image'}
                  alt={blog.title}
                  height={300}
                  loading="lazy"
                  style={{ objectFit: 'cover', width: '100%' }}
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
                    color: appColors.deepBrown,
                    fontWeight: 600,
                    fontSize: 16,
                  }}
                >
                  {blog.tag_list}
                </Box>
              </ImageWrapper>
            </Skeleton>

            <Flex direction="column" mt={30}>
              <Text fw={600} fz={{ base: 16, md: 20 }} mb={16} lineClamp={1}>
                {blog.title}
              </Text>
              <Text c="#666" lineClamp={2}>
                {blog.description}
              </Text>
            </Flex>

            <Flex align="center" mt={16} justify="space-between">
              <Group c="#666" fw={400}>
                <Text>{moment(blog.published_at).format('Do MMMM, YYYY')}</Text>
                <Divider
                  orientation="vertical"
                  display={{ base: 'none', sm: 'block' }}
                  c="#666"
                  size={2}
                />
                <Text display={{ base: 'none', sm: 'block' }}>
                  {blog.reading_time_minutes} {blog.reading_time_minutes > 1 ? 'mins' : 'min'}
                </Text>
              </Group>
              <Text sx={{ textDecoration: 'underline', zIndex: 2 }} c="#571244" fw={400}>
                View Post
              </Text>
            </Flex>
          </Grid.Col>
        ))}
        <Flex mt={50} justify="center" w="100%">
          <Button
            onClick={() => router.push('/')}
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
            w={156}
          >
            Explore More
          </Button>
        </Flex>
      </Grid>
    );
  };

  const renderContent = () => {
    if (isDataLoading) {
      return (
        <Stack my={50}>
          <Skeleton w="100%" height={200} />
          <Skeleton w="100%" height={400} mt={30} />
        </Stack>
      );
    }

    if (isErrorDetails) {
      return (
        <EmptyState
          emptyStateMessage="An error occurred while fetching blog details."
          buttonText="Try Again"
          resetFunct={() => refetchDetails()}
        />
      );
    }

    if (!blogDetails) {
      return (
        <EmptyState
          emptyStateMessage="No data available."
          buttonText="Refresh"
          resetFunct={() => refetchDetails()}
        />
      );
    }

    return (
      <Box mt={50}>
        <Box
          sx={{
            background: 'rgba(128, 129, 135, 0.3)',
            backdropFilter: 'blur(11px)',
            borderRadius: 3,
            padding: '6px 8px',
            color: appColors.deepBrown,
            fontWeight: 600,
            fontSize: 16,
            width: 'fit-content',
          }}
        >
          {blogDetailsData?.tag_list}
        </Box>
        <Text fz={{ base: 20, md: 42 }} mt={20} fw={700}>
          {blogDetailsData?.title}
        </Text>
        <Text fw={400} c="#6C757D" mt={5}>
          {moment(blogDetailsData?.published_at).format('Do MMMM, YYYY')}
        </Text>
        <Image
          src={blogDetailsData?.cover_image || 'https://via.placeholder.com/300?text=No+Image'}
          alt="Blog Cover"
          height={559}
          my={24}
          h="auto"
          style={{
            borderRadius: 12,
            objectFit: 'contain',
            imageResolution: 'from-image',
            width: '100%',
          }}
        />
        <Text
          dangerouslySetInnerHTML={{ __html: blogDetailsData?.description || content }}
          fw={400}
        />
        <Text mt={80} ta="center" c="#571244" fw={500} fz={{ base: 20, md: 24 }}>
          More articles
        </Text>
        {renderBlogList()}
        <NewsLetter />
      </Box>
    );
  };

  return (
    <Layout pageTitle="Blog Information">
      <Container size="xl">{renderContent()}</Container>
    </Layout>
  );
};

export default BlogDetailPage;
