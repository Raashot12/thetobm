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
        {blogList
          ?.filter((value) => value?.id !== Number(slug))
          ?.slice(0, 3)
          ?.map((blog) => (
            <Grid.Col
              span={{ base: 12, sm: 6, lg: 4 }}
              key={blog.id}
              sx={{ cursor: 'pointer', zIndex: 2 }}
              data-aos="fade-right"
              data-aos-duration="2000"
            >
              <Skeleton visible={isLoadingList}>
                <ImageWrapper>
                  <Image
                    src={blog.cover_image ?? 'https://via.placeholder.com/300?text=No+Image'}
                    alt={blog.title}
                    height={300}
                    loading="lazy"
                    style={{ objectFit: 'cover', width: '100%' }}
                  />
                  <GradientOverlay />
                  <Text
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
                      textAlign: 'center',
                      width: 150,
                    }}
                    truncate="end"
                  >
                    {blog.tag_list}
                  </Text>
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
                    {blog.reading_time_minutes} {blog.reading_time_minutes > 1 ? 'mins' : 'min'}{' '}
                    read
                  </Text>
                </Group>
                <Text
                  sx={{ textDecoration: 'underline', zIndex: 2 }}
                  c="#571244"
                  fw={400}
                  onClick={() => (isLoadingList ? null : router.push(`/blog/${blog.id}`))}
                >
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
          src={
            blogDetailsData?.cover_image
              ? blogDetailsData?.cover_image
              : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAATUAAACjCAMAAADciXncAAAAPFBMVEX29va2trb5+fmzs7PFxcXQ0NDq6uq4uLjk5OTw8PDBwcG+vr7y8vL19fXg4OC7u7vW1tbR0dHJycna2tpbkRd1AAAEqUlEQVR4nO2d7ZqjIAxGNSh+oNXq/d/r2pmd2VYRNC1K1vf8nXna9DwIGkJMEgAAAAAAAAAAAAAAPgQllZZDNcUbAXQzShLmFoO2QaWyUMPZyhLKpUmbtOVnjzYtT9qkTZ8rTeJQO3+wUXa2AQ4qgzUGsMYB1jjAGgdY4wBrHOKydvYzpoN4rZkyXky01k4OxgXVEQUKa6xgYI0TDKxxgoE1TjCwxgkG1jjBwBonGFjjBANrnGBgjRMMrHGCgTVOMLDGCQbWOMHwrNEXQSObf6N0a5ToW3+/9zfdHmdOtjWicih+s9LD7ahqMtHWqDQvKXzVjUeEKdoaNctiN1VXR/wEudZIF9YKpCOKF8Vao9Km7DHcxvA/Qqw1vSJt0lYG/xVSrbXdqrU0DV68KNSas6pS1aF/hlBr7gJeFXpFkGmNMncBbwdrFipP1XPoBUGkNep91gZY8/yfjaING6hEa03hsxb45IRIa75pLfgqKtEalX5rYR+rJFpLNljrYW0OxtpLMBut+Y/2wdqSxm+tDBuoRGuJSX1UYQOVaI2857zrwIGKtOZbDgIvoTKtJeR5OFBhL1Cp1kZ3fi3ww7tQa+4EeOi1QKw158wWelYTa82VYjugL4lUa+t3H8qEza19fblUa2vNeVTdHBCoXGvWhVTlhwQq11pCup55U134ffevbxZsbaKs/x2nVqob22N+gHBrCVXjYKYnhcJkvT6sWFK6tUe9ZNJMHFhf+j9Y+8gXE7XVd8PDbcXAsEakx9/qXpOXG4p7L2+Nqt48N+iY1pS+8a7e17ZGekiXxb2Fb9fh0taoGpT9AcNo9+Pcda1Rky/H2S/OzfvrWqPSXkP+M9xc6aarWrMdVphpuztyyde0tnZYYeNou6Y1z77Dj7bVue2a1jb2zVZrK+kVrbWeWuh/rJVcXs8aNWZzB+i1LcLLWaOq29E2e2Vqu5y1XdKma9S6C3E1a80+aSut0S9mba+0lZKRa1lr59szG6zZFgTZ1mhnU4r90uxHFwRbo/a7J8V40802dayXwtheXyDWGum8+22VXJi89G7qsd/UsRxsQq2Rzl7ziZO5oXQOOLY0y8wm0po9zfPI+K/3pfCe83NoW9yzSbS2nk9U6aDtW0x0579IZ5kyEmjNmeZRyoyWLab33j5kFh8nzpp31DwaFjUvUxxVnFuOp0+cn/kQZ23LpTYtDVmvm+TvzVx1f0dZalkPpFnbPD9N9yNdnQ1DVnf23bs9zPNswqxtS10/u3tX2PfHzBJGsqxtOE8bhPklKsua/8B7KGaBSrJG7y2FbzBrECLJ2t5J7YPMkpOSrK03DwvP642uIGvnXZ8PqtdQnv8UszW6nSnt9d5DjrX2tPXzwevEJsbaO0mLT2BEWquOlbTkOckmxlpbnczzo6gYa1EBaxxgjQOscYA1DrDGAdY4wBoHWOMAaxxgjUPU1uIlXmtpES9pvNakAGscYI0DrHGANQ6wxgHWOJxtbThbAIfgfWZ91k7dXucS/O1XXrYfE44GtagQP5zK3zAiMlQRuqXxFm2ZkkV2yGtefZDuczn07i5QB3J2FmgfZ9sCAAAAAAAAAAAAiJQ/LJxiswMZp2kAAAAASUVORK5CYII='
          }
          alt="Blog Cover"
          my={24}
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
