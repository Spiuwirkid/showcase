import { useEffect } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import HotTemplates from '../components/HotTemplates';
import Features from '../components/Features';
import Testimonials from '../components/Testimonials';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';

const Index = () => {
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
    
    // Set page title
    document.title = 'TemplateHub - Template Premium Indonesia';
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main>
        <Hero />
        <HotTemplates />
        <Features />
        <Testimonials />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
