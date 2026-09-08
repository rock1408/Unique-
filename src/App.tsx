import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Stats } from './components/Stats';
import { About } from './components/About';
import { Programs } from './components/Programs';
import { MeetWorkout3D } from './3d/MeetWorkout3D';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Trainers } from './components/Trainers';
import { Journey } from './components/Journey';
import { Gallery } from './components/Gallery';
import { Reviews } from './components/Reviews';
import { LocationSection } from './components/LocationSection';
import { ContactSection } from './components/ContactSection';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { MobileBottomNav } from './components/MobileBottomNav';

export default function App() {
  return (
    <div className="min-h-screen bg-[#070709] text-[#f4f4f6] flex flex-col relative selection:bg-[#ccff00] selection:text-black">
      {/* Sticky Header Navigation */}
      <Navbar />

      <main className="flex-1">
        {/* 1. Hero Section with 3D Dumbbell */}
        <Hero />

        {/* 2. Trust / Stats Counters */}
        <Stats />

        {/* 3. About Unique Fitness */}
        <About />

        {/* 4. Programs & Services */}
        <Programs />

        {/* 5. 3D Fitness Experience ("MEET YOUR WORKOUT") */}
        <MeetWorkout3D />

        {/* 6. Why Choose Unique Fitness */}
        <WhyChooseUs />

        {/* 7. Expert Trainers */}
        <Trainers />

        {/* 8. Fitness Journey Timeline */}
        <Journey />

        {/* 9. Masonry Gallery with Lightbox */}
        <Gallery />

        {/* 10. Verified Customer Reviews */}
        <Reviews />

        {/* 11. Location, Map & Dynamic Opening Hours */}
        <LocationSection />

        {/* 12. Contact / Lead Generation Form */}
        <ContactSection />

        {/* 13. Full-width Final Call to Action */}
        <FinalCTA />
      </main>

      {/* Dark Luxury Footer */}
      <Footer />

      {/* Floating Bottom-Right WhatsApp Button */}
      <FloatingWhatsApp />

      {/* Mobile Sticky Bottom CTA Bar */}
      <MobileBottomNav />
    </div>
  );
}
