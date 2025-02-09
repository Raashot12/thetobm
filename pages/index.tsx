import { Container } from '@mantine/core';
import HeroSection from '@/components/Home/HeroSection';
import NewsLetter from '@/components/Home/NewsLetter';
import StayUpdated from '@/components/Home/StayUpdated';
import { Layout } from '@/components/Layout';

export default function HomePage() {
  return (
    <Layout pageTitle="Home">
      <HeroSection />
      <StayUpdated />
      <Container size="xl">
        <NewsLetter />
      </Container>
    </Layout>
  );
}
