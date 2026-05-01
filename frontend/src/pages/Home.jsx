import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { useAuth } from "../context/AuthContext";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";

// Import local images
import abuneImage from "../assets/abune.jpg";
import afarImage from "../assets/afar.jpg";
import demeraImage from "../assets/demera.jpg";
import lalibelaImage from "../assets/lalibela.jpg";
import ethiopiaVideo from "../assets/video.mp4";

import deseImage from "../assets/dese.jpg";
import gonderImage from "../assets/gonder.jpg";
import langanoImage from "../assets/langano.jpg";
import hawassaImage from "../assets/hawassa.jpg";
import eritreaImage from "../assets/eritrea.jpg";
import afarrImage from "../assets/afarr.jpg"

function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const destinations = [
    {
      id: 1,
      name: "Demera (Meskel Festival)",
      location: "Addis Ababa, Ethiopia",
      image: demeraImage,
      description: "Witness the colorful Meskel Festival celebrating the finding of the True Cross. Experience the vibrant culture, traditional music, and the massive bonfire ceremony that marks this UNESCO-recognized event.",
      duration: "4 days",
      reviews: 234,
      amenities: ["Hotel Included", "Free Cancellation", "Meals Included"]
    },
    {
      id: 2,
      name: "Lalibela",
      location: "Lalibela, Ethiopia",
      image: lalibelaImage,
      description: "Explore the famous rock-hewn churches, a UNESCO World Heritage site. These 11 medieval monolithic churches were carved out of rock and are still active places of worship today.",
      duration: "6 days",
      reviews: 456,
      amenities: ["Hotel Included", "Free Cancellation", "Local Guide"]
    },
    {
      id: 3,
      name: "Afar Depression",
      location: "Afar, Ethiopia",
      image: afarImage,
      description: "Experience the otherworldly landscapes of Dallol, Erta Ale volcano, and salt flats. Witness the active lava lake and the colorful hydrothermal fields.",
      duration: "7 days",
      reviews: 189,
      amenities: ["Camping Gear", "Meals Included", "4x4 Transport"]
    },
    {
      id: 4,
      name: "Abune Yemata",
      location: "Tigray, Ethiopia",
      image: abuneImage,
      description: "A breathtaking rock-hewn church perched on a cliff, offering stunning views and ancient religious art. A challenging climb rewards you with incredible frescoes.",
      duration: "5 days",
      reviews: 167,
      amenities: ["Local Guide", "Free Cancellation", "Lunch Included"]
    }
  ];

  const testimonials = [
    {
      name: "Eden Tesfaye",
      country: "Afar, Ethiopia",
      text: "The Danakil Depression was incredible! MakiTravel organized everything perfectly. A once-in-a-lifetime experience!",
      rating: 4,
    },
    {
      name: "Ismael",
      country: "Addis Ababa, Ethiopia",
      text: "This tour showed me hidden gems I never knew existed. The Meskel Festival was magical and well-organized!",
      rating: 4,
    },
    {
      name: "Nathan Haile",
      country: "Gonder, Ethiopia",
      text: "The castles of Gonder and Simien Mountains trek was amazing! Knowledgeable guides and top-notch accommodations.",
      rating: 5,
    },
    {
      name: "Sura",
      country: "United States",
      text: "Traveling from America to Ethiopia was seamless. From Lalibela to the hospitality, everything exceeded expectations!",
      rating: 5,
    }
  ];

  const features = [
    {

      title: t('features.bestPrices'),
      description: t('features.bestPricesDesc')
    },
    {
  
      title: t('features.qualityHotels'),
      description: t('features.qualityHotelsDesc')
    },
    {
     
      title: t('features.support247'),
      description: t('features.support247Desc')
    },
    {

      title: t('features.secureBooking'),
      description: t('features.secureBookingDesc')
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-gray-200 dark:border-slate-800 shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-4">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => navigate("/")}>
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <span className="text-white text-lg sm:text-xl">✈</span>
            </div>
            <span className="font-bold text-lg sm:text-xl bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
              MakiTravel
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            <button onClick={() => document.getElementById('destinations')?.scrollIntoView({ behavior: 'smooth' })} className="text-gray-700 dark:text-gray-300 hover:text-emerald-600 transition-colors font-medium">
              {t('nav.destinations')}
            </button>
            <button onClick={() => document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' })} className="text-gray-700 dark:text-gray-300 hover:text-emerald-600 transition-colors font-medium">
              {t('nav.testimonials')}
            </button>
            <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="text-gray-700 dark:text-gray-300 hover:text-emerald-600 transition-colors font-medium">
              {t('nav.contact')}
            </button>
          </div>

          {/* Desktop Right Section */}
          <div className="hidden md:flex items-center gap-3">
            {!token ? (
              <>
                <Link to="/login">
                  <Button variant="outline" className="rounded-xl text-sm lg:text-base">{t('nav.login')}</Button>
                </Link>
                <Link to="/register">
                  <Button className="rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 text-white hover:shadow-lg transition-all text-sm lg:text-base">
                    {t('nav.register')}
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/destinations">
                  <Button variant="outline" className="rounded-xl text-sm lg:text-base">{t('nav.explore')}</Button>
                </Link>
                <Link to="/dashboard">
                  <Button className="rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 text-white text-sm lg:text-base">
                    {t('nav.dashboard')}
                  </Button>
                </Link>
              </>
            )}
            <LanguageSwitcher />
            <ModeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <LanguageSwitcher />
            <ModeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-slate-800 focus:outline-none"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-slate-950 border-t border-gray-200 dark:border-slate-800 shadow-lg">
            <div className="px-4 py-3 space-y-2">
              <button 
                onClick={() => {
                  document.getElementById('destinations')?.scrollIntoView({ behavior: 'smooth' });
                  setMobileMenuOpen(false);
                }} 
                className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                {t('nav.destinations')}
              </button>
              <button 
                onClick={() => {
                  document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' });
                  setMobileMenuOpen(false);
                }} 
                className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                {t('nav.testimonials')}
              </button>
              <button 
                onClick={() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  setMobileMenuOpen(false);
                }} 
                className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                {t('nav.contact')}
              </button>
              <div className="border-t border-gray-200 dark:border-slate-800 pt-3 mt-2">
                {!token ? (
                  <div className="flex flex-col gap-2">
                    <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="outline" className="w-full rounded-xl">{t('nav.login')}</Button>
                    </Link>
                    <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                      <Button className="w-full rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 text-white">
                        {t('nav.register')}
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Link to="/destinations" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="outline" className="w-full rounded-xl">{t('nav.explore')}</Button>
                    </Link>
                    <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                      <Button className="w-full rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 text-white">
                        {t('nav.dashboard')}
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section with Video Background */}
      <div className="relative h-[500px] sm:h-[600px] flex items-center justify-center overflow-hidden">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1547471080-7cc2caa01e7f"
        >
          <source src={ethiopiaVideo} type="video/mp4" />
        </video>
        
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <div className="animate-fade-in-up">
            <span className="inline-block mb-3 sm:mb-4 px-3 py-1 sm:px-4 sm:py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs sm:text-sm font-semibold">
              {t('hero.badge')}
            </span>
            <h1 className="text-3xl sm:text-xl md:text-7xl font-bold mb-4 sm:mb-6 text-white">
              {t('hero.title')} <span className="text-yellow-300">{t('hero.titleHighlight')}</span>
            </h1>
            <p className="text-base sm:text-xl md:text-2xl mb-6 sm:mb-8 text-gray-200 max-w-3xl mx-auto px-4">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
              <Button 
                onClick={() => navigate("/destinations")}
                className="bg-white text-emerald-600 hover:bg-gray-100 hover:shadow-xl transition-all duration-300 px-6 py-5 sm:px-8 sm:py-6 text-base sm:text-lg font-semibold rounded-xl"
              >
                {t('hero.exploreBtn')}
                <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Button>
              {!token && (
                <Button 
                  onClick={() => navigate("/register")}
                  variant="outline"
                  className=" bg-emerald-600 border-emerald-600  text-white px-6 py-5 sm:px-8 sm:py-6 text-base sm:text-lg font-semibold rounded-xl"
                >
                  {t('hero.getStartedBtn')}
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
            {t('features.title')}
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto mb-4"></div>
          <p className="text-gray-500 dark:text-gray-400 text-base sm:text-lg max-w-2xl mx-auto px-4">
            {t('features.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-4 sm:p-6 bg-white dark:bg-slate-900 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">{feature.icon}</div>
              <h3 className="font-bold text-lg sm:text-xl text-gray-800 dark:text-white mb-2 sm:mb-3">{feature.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Destinations Section */}
      <div id="destinations" className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-900 dark:to-slate-800 py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
              {t('destinations.title')}
            </h2>
            <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto mb-4"></div>
            <p className="text-gray-500 dark:text-gray-400 text-base sm:text-lg max-w-2xl mx-auto px-4">
              {t('destinations.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {destinations.map((dest, index) => (
              <Card key={index} className="group overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl bg-white dark:bg-slate-900 border-0 shadow-lg w-full cursor-pointer"
                onClick={() => navigate(`/destination/${dest.id}`)}>
                <div className="flex flex-col md:flex-row">
                  <div className="relative md:w-2/5 h-64 md:h-auto overflow-hidden bg-gray-200">
                    <img 
                      src={dest.image} 
                      alt={dest.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>

                  <div className="md:w-3/5 flex flex-col">
                    <CardHeader className="pb-2 pt-4 md:pt-6 px-4 md:px-6">
                      <CardTitle className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white group-hover:text-emerald-600 transition-colors">
                        {dest.name}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-1 text-gray-500 dark:text-gray-400 mt-1 text-sm">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {dest.location}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="pb-3 md:pb-4 px-4 md:px-6">
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-3 text-sm md:text-base">
                        {dest.description}
                      </p>
                      
                      <div className="flex items-center gap-3 mt-3 md:mt-4 text-gray-600 text-sm bg-emerald-50 dark:bg-emerald-950/50 p-2 md:p-3 rounded-xl">
                        <svg className="w-4 h-4 md:w-5 md:h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="font-medium text-sm md:text-base">{dest.duration}</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 md:gap-3 mt-3 md:mt-4">
                        {dest.amenities.map((amenity, i) => (
                          <div key={i} className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-slate-800 px-2 py-1 rounded-lg">
                            <svg className="w-2 h-2 md:w-3 md:h-3 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>{amenity}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>

                    <CardFooter className="pt-1 pb-4 md:pt-2 md:pb-6 px-4 md:px-6">
                      <Button 
                        className="w-full bg-gradient-to-r from-emerald-600 to-teal-500 text-white hover:shadow-lg transition-all duration-300 font-semibold py-5 md:py-6 text-sm md:text-base"
                      >
                        {t('destinations.bookNow')}
                        <svg className="w-4 h-4 md:w-5 md:h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </Button>
                    </CardFooter>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div id="testimonials" className="bg-white dark:bg-slate-950 py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
              {t('testimonials.title')}
            </h2>
            <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto mb-4"></div>
            <p className="text-gray-500 dark:text-gray-400 text-base sm:text-lg max-w-2xl mx-auto px-4">
              {t('testimonials.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-900 dark:to-slate-800 p-4 sm:p-5 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-white text-sm sm:text-base">{testimonial.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{testimonial.country}</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-3">
                  {/* {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))} */}
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm leading-relaxed">
                  "{testimonial.text}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery Section - Scrollable */}
      <div id="gallery" className="bg-white dark:bg-slate-950 py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
              Ethiopian Places Gallery
            </h2>
            <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto mb-4"></div>
            <p className="text-gray-500 dark:text-gray-400 text-base sm:text-lg max-w-2xl mx-auto px-4">
              Discover the most breathtaking places across Ethiopia
            </p>
          </div>

          {/* Scrollable Gallery */}
          <div className="relative">
            <div className="flex overflow-x-auto gap-4 pb-4">
              {/* Afar */}
              <div className="flex-shrink-0 w-72 sm:w-80 rounded-2xl overflow-hidden shadow-lg group cursor-pointer">
                <img 
                  src={afarrImage}
                  alt="Afar Depression"
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="p-3 bg-white dark:bg-slate-900">
                  <h3 className="font-semibold text-gray-800 dark:text-white">Afar Depression</h3>
                  <p className="text-xs text-gray-500">Afar, Ethiopia</p>
                </div>
              </div>

              {/* Dese */}
              <div className="flex-shrink-0 w-72 sm:w-80 rounded-2xl overflow-hidden shadow-lg group cursor-pointer">
                <img 
                  src={deseImage}
                  alt="Dese"
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="p-3 bg-white dark:bg-slate-900">
                  <h3 className="font-semibold text-gray-800 dark:text-white">Dese</h3>
                  <p className="text-xs text-gray-500">Dese, Ethiopia</p>
                </div>
              </div>

              {/* Gonder */}
              <div className="flex-shrink-0 w-72 sm:w-80 rounded-2xl overflow-hidden shadow-lg group cursor-pointer">
                <img 
                  src={gonderImage}
                  alt="Gonder Castles"
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="p-3 bg-white dark:bg-slate-900">
                  <h3 className="font-semibold text-gray-800 dark:text-white">Gonder</h3>
                  <p className="text-xs text-gray-500">Gonder, Ethiopia</p>
                </div>
              </div>

              {/* Langano */}
              <div className="flex-shrink-0 w-72 sm:w-80 rounded-2xl overflow-hidden shadow-lg group cursor-pointer">
                <img 
                  src={langanoImage}
                  alt="Lake Langano"
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="p-3 bg-white dark:bg-slate-900">
                  <h3 className="font-semibold text-gray-800 dark:text-white">Lake Langano</h3>
                  <p className="text-xs text-gray-500">Langano, Ethiopia</p>
                </div>
              </div>

              {/* Hawassa */}
              <div className="flex-shrink-0 w-72 sm:w-80 rounded-2xl overflow-hidden shadow-lg group cursor-pointer">
                <img 
                  src={hawassaImage}
                  alt="Hawassa"
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="p-3 bg-white dark:bg-slate-900">
                  <h3 className="font-semibold text-gray-800 dark:text-white">Hawassa</h3>
                  <p className="text-xs text-gray-500">Hawassa, Ethiopia</p>
                </div>
              </div>

              {/* Eritrea */}
              <div className="flex-shrink-0 w-72 sm:w-80 rounded-2xl overflow-hidden shadow-lg group cursor-pointer">
                <img 
                  src={eritreaImage}
                  alt="Eritrea Border"
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="p-3 bg-white dark:bg-slate-900">
                  <h3 className="font-semibold text-gray-800 dark:text-white">Tigray - Eritrea Border</h3>
                  <p className="text-xs text-gray-500">Northern Ethiopia</p>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Hint */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              ← Scroll to see more →
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-500 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
            {t('cta.title')}
          </h2>
          <p className="text-emerald-100 text-base sm:text-lg mb-6 sm:mb-8 px-4">
            {t('cta.subtitle')}
          </p>
          {!token ? (
            <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
              <Button 
                onClick={() => navigate("/register")}
                className="bg-white text-emerald-600 hover:shadow-xl transition-all duration-300 px-6 py-5 sm:px-8 sm:py-6 text-base sm:text-lg font-semibold rounded-xl"
              >
                {t('cta.createAccount')}
              </Button>
              <Button 
                onClick={() => navigate("/login")}
                variant="outline"
                className="bg-emerald-600 border-emerald-600   text-white hover:bg-white px-6 py-5 sm:px-8 sm:py-6 text-base sm:text-lg font-semibold rounded-xl"
              >
                {t('cta.signIn')}
              </Button>
            </div>
          ) : (
            <Button 
              onClick={() => navigate("/destinations")}
              className="bg-white text-emerald-600 hover:bg-gray-100 hover:shadow-xl transition-all duration-300 px-6 py-5 sm:px-8 sm:py-6 text-base sm:text-lg font-semibold rounded-xl"
            >
              {t('cta.exploreNow')}
            </Button>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                  <span className="text-white text-lg sm:text-xl">✈</span>
                </div>
                <span className="font-bold text-lg sm:text-xl">MakiTravel</span>
              </div>
              <p className="text-gray-400 text-xs sm:text-sm">
                {t('footer.tagline')}
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">{t('footer.quickLinks')}</h4>
              <ul className="space-y-2">
                <li><button onClick={() => document.getElementById('destinations')?.scrollIntoView({ behavior: 'smooth' })} className="text-gray-400 hover:text-emerald-400 transition-colors text-sm">{t('nav.destinations')}</button></li>
                <li><Link to="/dashboard" className="text-gray-400 hover:text-emerald-400 transition-colors text-sm">{t('nav.dashboard')}</Link></li>
                <li><Link to="/marketplace" className="text-gray-400 hover:text-emerald-400 transition-colors text-sm">Marketplace</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">{t('footer.support')}</h4>
              <ul className="space-y-2">
                <li><Link to="/faq" className="text-gray-400 hover:text-emerald-400 transition-colors text-sm">{t('footer.faq')}</Link></li>
                <li><Link to="/privacy" className="text-gray-400 hover:text-emerald-400 transition-colors text-sm">{t('footer.privacy')}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">{t('footer.followUs')}</h4>
              <div className="flex gap-3">
                <a 
                  href="https://www.instagram.com/bamak.2003" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-pink-500 hover:to-orange-500 transition-all duration-300"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </a>
                <a 
                  href="mailto:marakiyeshi@gmail.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-500 transition-all duration-300"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                </a>
                <a 
                  href="https://www.tiktok.com/@eldansnhray" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-black transition-all duration-300"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 sm:pt-8 text-center">
            <p className="text-gray-400 text-xs sm:text-sm">
              &copy; {new Date().getFullYear()} MakiTravel. {t('footer.rights')}
            </p>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(10px); }
        }
        .animate-bounce {
          animation: bounce 2s infinite;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}

export default Home;