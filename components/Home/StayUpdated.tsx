import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import moment from 'moment';
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
  Skeleton,
  Text,
  TextInput,
} from '@mantine/core';
import { articleStatic } from '@/constants';
import { appColors } from '../appColors';
import IconSearch from '../Icons/IconSearch';
import InputArrow from '../Icons/InputArrow';
import AOSInit from '../shared/AOSInit';
import EmptyState from '../shared/EmptyState';
import { Article, useApiServicesAppBlogSearchApiQuery } from '../state/blog';
import { articles } from '../util';

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

const StayUpdated = () => {
  const [blogDataList, setBlogDataList] = useState<Article[]>(articleStatic);
  const [visibleImages, setVisibleImages] = useState<Article[]>([]);
  const [showMore, setShowMore] = useState(false);
  const [alltimeFilter, setAlltimeFilter] = useState<string>('All posts');
  const [openSelect, setOpenSelect] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  AOSInit({
    disable: false,
  });

  const { data, isFetching, isError, refetch } = useApiServicesAppBlogSearchApiQuery({});

  useEffect(() => {
    if (!isFetching && !isError && data) {
      setBlogDataList(data as Article[]);
      setVisibleImages((data as Article[]).slice(0, 6));
      setIsDataLoading(false);
    } else if (!isFetching && isError) {
      setBlogDataList([]);
      setVisibleImages([]);
      setIsDataLoading(false);
    }
  }, [data, isFetching, isError]);

  const handleShowMore = () => {
    const newVisibleImages = blogDataList.slice(0, visibleImages.length + 6);
    setVisibleImages(newVisibleImages);

    if (newVisibleImages.length >= blogDataList.length) {
      setShowMore(true);
    }
  };

  const handleShowLess = () => {
    setVisibleImages(blogDataList.slice(0, 6));
    setShowMore(false);
    window.scrollTo({ top: 359, left: 0, behavior: 'smooth' });
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredBlogs = useMemo(
    () =>
      visibleImages.filter((blog) => blog.title.toLowerCase().includes(searchQuery.toLowerCase())),
    [searchQuery, visibleImages]
  );

  const handleTimeChange = (arg: string) => {
    const currentDate = new Date();
    let filteredData: Article[] = [];

    if (arg === 'All posts') {
      filteredData = data || [];
    } else {
      const dateRanges: Record<string, number> = {
        Today: 1,
        'Last 7 days': 7,
        'Last 30 days': 30,
        'Last 90 days': 90,
      };

      const selectedDays = dateRanges[arg];
      const filterDate = new Date();
      filterDate.setDate(currentDate.getDate() - selectedDays);

      filteredData =
        data?.filter((item) => {
          const itemDate = new Date(item?.published_timestamp || '');
          return itemDate >= filterDate && itemDate <= currentDate;
        }) || [];
    }

    setBlogDataList(filteredData);
    setVisibleImages(filteredData.slice(0, 6));
    setShowMore(false);
  };

  const renderContent = useMemo(() => {
    if (isDataLoading) {
      return (
        <Grid mt={70} gutter={20}>
          {articles.map(
            ({
              title,
              tag_list,
              readable_publish_date,
              reading_time_minutes,
              description,
              cover_image,
              id,
            }) => (
              <Grid.Col
                span={{ base: 12, sm: 6, lg: 4 }}
                key={id}
                sx={{ cursor: 'pointer', zIndex: 2 }}
                pos="relative"
              >
                <Skeleton visible={isDataLoading}>
                  <ImageWrapper>
                    <Image
                      src={cover_image}
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
                      {tag_list}
                    </Box>
                  </ImageWrapper>
                </Skeleton>

                <Flex direction="column" align="flex-start" mt={30}>
                  <Skeleton visible={isDataLoading} mb={5}>
                    <Text
                      fw={600}
                      fz={{ base: 16, md: 20 }}
                      mb={16}
                      sx={{ color: appColors?.blackPrimary }}
                      lineClamp={1}
                    >
                      {title}
                    </Text>
                  </Skeleton>
                  <Skeleton visible={isDataLoading} mb={5}>
                    <Text ta="left" lineClamp={2} c={appColors?.placeholderColor}>
                      {description}
                    </Text>
                  </Skeleton>
                </Flex>
                <Skeleton visible={isDataLoading}>
                  <Flex align="center" mt={16} justify="space-between">
                    <Group c={appColors?.placeholderColor} fw={400}>
                      <Text ta="left">{readable_publish_date}</Text>

                      <Divider
                        orientation="vertical"
                        display={{ base: 'none', sm: 'block' }}
                        c={appColors?.placeholderColor}
                        size={2}
                      />

                      <Text ta="left" display={{ base: 'none', sm: 'block' }}>
                        {reading_time_minutes}
                        {reading_time_minutes > 1 ? 'mins' : 'min'}
                      </Text>
                    </Group>

                    <Text sx={{ textDecoration: 'underline', zIndex: 2 }} c="#571244" fw={400}>
                      View Post
                    </Text>
                  </Flex>
                </Skeleton>
              </Grid.Col>
            )
          )}
        </Grid>
      );
    }
    if (isError) {
      return (
        <EmptyState
          emptyStateMessage="An error occurred while fetching blogs."
          buttonText="Try Again"
          resetFunct={() => refetch()}
        />
      );
    }
    if (filteredBlogs.length === 0 && !isFetching) {
      return (
        <EmptyState
          emptyStateMessage="No blog found for your query"
          buttonText="Refresh"
          resetFunct={() => {
            if (!isFetching && !isError && data) {
              setAlltimeFilter('All posts');
              handleTimeChange('All posts');
            }
          }}
        />
      );
    }

    return (
      <Grid mt={70} gutter={30}>
        {filteredBlogs.map(
          ({
            title,
            tag_list,
            published_at,
            reading_time_minutes,
            description,
            cover_image,
            id,
          }) => (
            <Grid.Col
              span={{ base: 12, sm: 6, lg: 4 }}
              key={id}
              sx={{ cursor: 'pointer', zIndex: 2 }}
              data-aos="fade-right"
              data-aos-duration="2000"
              pos="relative"
            >
              <Skeleton visible={isDataLoading}>
                <ImageWrapper>
                  <Image
                    src={
                      cover_image ||
                      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAATUAAACjCAMAAADciXncAAAAPFBMVEX29va2trb5+fmzs7PFxcXQ0NDq6uq4uLjk5OTw8PDBwcG+vr7y8vL19fXg4OC7u7vW1tbR0dHJycna2tpbkRd1AAAEqUlEQVR4nO2d7ZqjIAxGNSh+oNXq/d/r2pmd2VYRNC1K1vf8nXna9DwIGkJMEgAAAAAAAAAAAAAAPgQllZZDNcUbAXQzShLmFoO2QaWyUMPZyhLKpUmbtOVnjzYtT9qkTZ8rTeJQO3+wUXa2AQ4qgzUGsMYB1jjAGgdY4wBrHOKydvYzpoN4rZkyXky01k4OxgXVEQUKa6xgYI0TDKxxgoE1TjCwxgkG1jjBwBonGFjjBANrnGBgjRMMrHGCgTVOMLDGCQbWOMHwrNEXQSObf6N0a5ToW3+/9zfdHmdOtjWicih+s9LD7ahqMtHWqDQvKXzVjUeEKdoaNctiN1VXR/wEudZIF9YKpCOKF8Vao9Km7DHcxvA/Qqw1vSJt0lYG/xVSrbXdqrU0DV68KNSas6pS1aF/hlBr7gJeFXpFkGmNMncBbwdrFipP1XPoBUGkNep91gZY8/yfjaING6hEa03hsxb45IRIa75pLfgqKtEalX5rYR+rJFpLNljrYW0OxtpLMBut+Y/2wdqSxm+tDBuoRGuJSX1UYQOVaI2857zrwIGKtOZbDgIvoTKtJeR5OFBhL1Cp1kZ3fi3ww7tQa+4EeOi1QKw158wWelYTa82VYjugL4lUa+t3H8qEza19fblUa2vNeVTdHBCoXGvWhVTlhwQq11pCup55U134ffevbxZsbaKs/x2nVqob22N+gHBrCVXjYKYnhcJkvT6sWFK6tUe9ZNJMHFhf+j9Y+8gXE7XVd8PDbcXAsEakx9/qXpOXG4p7L2+Nqt48N+iY1pS+8a7e17ZGekiXxb2Fb9fh0taoGpT9AcNo9+Pcda1Rky/H2S/OzfvrWqPSXkP+M9xc6aarWrMdVphpuztyyde0tnZYYeNou6Y1z77Dj7bVue2a1jb2zVZrK+kVrbWeWuh/rJVcXs8aNWZzB+i1LcLLWaOq29E2e2Vqu5y1XdKma9S6C3E1a80+aSut0S9mba+0lZKRa1lr59szG6zZFgTZ1mhnU4r90uxHFwRbo/a7J8V40802dayXwtheXyDWGum8+22VXJi89G7qsd/UsRxsQq2Rzl7ziZO5oXQOOLY0y8wm0po9zfPI+K/3pfCe83NoW9yzSbS2nk9U6aDtW0x0579IZ5kyEmjNmeZRyoyWLab33j5kFh8nzpp31DwaFjUvUxxVnFuOp0+cn/kQZ23LpTYtDVmvm+TvzVx1f0dZalkPpFnbPD9N9yNdnQ1DVnf23bs9zPNswqxtS10/u3tX2PfHzBJGsqxtOE8bhPklKsua/8B7KGaBSrJG7y2FbzBrECLJ2t5J7YPMkpOSrK03DwvP642uIGvnXZ8PqtdQnv8UszW6nSnt9d5DjrX2tPXzwevEJsbaO0mLT2BEWquOlbTkOckmxlpbnczzo6gYa1EBaxxgjQOscYA1DrDGAdY4wBoHWOMAaxxgjUPU1uIlXmtpES9pvNakAGscYI0DrHGANQ6wxgHWOJxtbThbAIfgfWZ91k7dXucS/O1XXrYfE44GtagQP5zK3zAiMlQRuqXxFm2ZkkV2yGtefZDuczn07i5QB3J2FmgfZ9sCAAAAAAAAAAAAiJQ/LJxiswMZp2kAAAAASUVORK5CYII='
                    }
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
                    {tag_list}
                  </Text>
                </ImageWrapper>
              </Skeleton>

              <Flex direction="column" align="flex-start" mt={30}>
                <Skeleton visible={isDataLoading}>
                  <Text
                    fw={600}
                    fz={{ base: 16, md: 20 }}
                    mb={16}
                    sx={{ color: appColors?.blackPrimary }}
                    lineClamp={1}
                  >
                    {title}
                  </Text>
                </Skeleton>
                <Skeleton visible={isDataLoading}>
                  <Text ta="left" lineClamp={2} c={appColors?.placeholderColor}>
                    {description}
                  </Text>
                </Skeleton>
              </Flex>
              <Skeleton visible={isDataLoading}>
                <Flex align="center" mt={16} justify="space-between">
                  <Group c={appColors?.placeholderColor} fw={400}>
                    <Text ta="left">{moment(published_at).format('Do MMMM, YYYY')}</Text>

                    <Divider
                      orientation="vertical"
                      display={{ base: 'none', sm: 'block' }}
                      c={appColors?.placeholderColor}
                      size={2}
                    />

                    <Text ta="left" display={{ base: 'none', sm: 'block' }}>
                      {reading_time_minutes}
                      {reading_time_minutes > 1 ? 'mins' : 'min'} read
                    </Text>
                  </Group>

                  <Text
                    sx={{ textDecoration: 'underline', zIndex: 2 }}
                    c="#571244"
                    fw={400}
                    onClick={() => (isDataLoading ? null : router.push(`/blog/${id}`))}
                  >
                    View Post
                  </Text>
                </Flex>
              </Skeleton>
            </Grid.Col>
          )
        )}
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
            onClick={!showMore ? handleShowMore : handleShowLess}
          >
            {!showMore ? 'Load More' : 'Show Less'}
          </Button>
        </Flex>
      </Grid>
    );
  }, [isDataLoading, filteredBlogs]);

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
            value={searchQuery}
            onChange={handleSearchChange}
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
              placeholder="Select filter"
              pos="relative"
              value={alltimeFilter}
              defaultSearchValue="All posts"
              onChange={(arg) => {
                setAlltimeFilter(arg as string);
                handleTimeChange(arg as string);
              }}
              data={['All posts', 'Today', 'Last 7 days', 'Last 30 days', 'Last 90 days']}
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
            value={alltimeFilter}
            defaultSearchValue="All posts"
            onChange={(arg) => {
              setAlltimeFilter(arg as string);
              handleTimeChange(arg as string);
            }}
            data={['All posts', 'Today', 'Last 7 days', 'Last 30 days', 'Last 90 days']}
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
        {renderContent}
      </Container>
    </Box>
  );
};

export default StayUpdated;
