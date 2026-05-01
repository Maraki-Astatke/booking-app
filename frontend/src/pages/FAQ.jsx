import { useState } from "react";
import { Link } from "react-router-dom";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How do I book a trip?",
      answer: "Simply browse our destinations, click on your desired destination, select your travel dates and number of travelers, then click 'Book Now'. You'll need to be logged in to complete your booking."
    },
    {
      question: "Can I cancel my booking?",
      answer: "Yes, you can cancel your booking from your Dashboard. Go to 'My Booked Trips' and click the 'Cancel' button on the booking you wish to cancel. Cancellations are free up to 7 days before your travel date."
    },
    {
      question: "How do I save a destination to favorites?",
      answer: "When viewing a destination detail page, click the 'Save to Favorites' button. You can view all your saved favorites in your Dashboard under the 'Favorites' section."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept Visa, Mastercard, American Express, PayPal, and bank transfers. All payments are processed securely through our encrypted payment system."
    },
    {
      question: "Is travel insurance included?",
      answer: "Basic travel insurance is included with all our packages. This covers medical emergencies, trip cancellations, and lost luggage. For additional coverage, you can purchase extended insurance during checkout."
    },
    {
      question: "Can I change my booking dates?",
      answer: "Yes, you can modify your booking dates up to 14 days before your trip. Contact our customer support team at support@makitravel.com or call +251 11 123 4567 to make changes."
    },
    {
      question: "Do you offer group discounts?",
      answer: "Yes! Groups of 5 or more receive a 10% discount. Groups of 10 or more receive a 15% discount. Contact us directly for group booking arrangements."
    },
    {
      question: "What happens if my flight is delayed?",
      answer: "Our 24/7 customer support team will assist you with rebooking and accommodation arrangements. We recommend having travel insurance for extended coverage."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-gray-200 dark:border-slate-800 shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => window.location.href = "/"}>
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <span className="text-white text-xl">✈</span>
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
              MakiTravel
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-emerald-600 transition-colors font-medium">
              Home
            </Link>
            <Link to="/destinations" className="text-gray-700 dark:text-gray-300 hover:text-emerald-600 transition-colors font-medium">
              Destinations
            </Link>
            <Link to="/faq" className="text-emerald-600 font-medium">
              FAQ
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <ModeToggle />
            <Link to="/">
              <Button variant="outline" className="rounded-xl">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl mb-4">
            <span className="text-4xl">❓</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
            Frequently Asked Questions
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto mb-4"></div>
          <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Find answers to common questions about booking, payments, and travel with MakiTravel
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Card 
              key={index} 
              className="rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900 overflow-hidden cursor-pointer hover:shadow-md transition-all"
              onClick={() => toggleFAQ(index)}
            >
              <div className="p-5 flex justify-between items-center">
                <h3 className="font-semibold text-lg text-gray-800 dark:text-white pr-4">
                  {faq.question}
                </h3>
                <span className={`text-emerald-500 text-2xl transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </div>
              {openIndex === index && (
                <CardContent className="pt-0 pb-5 px-5">
                  <div className="border-t border-gray-200 dark:border-slate-800 pt-4">
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-12 p-6 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl text-white text-center">
          <h3 className="text-xl font-bold mb-2">Still have questions?</h3>
          <p className="text-emerald-100 mb-4">We're here to help you 24/7</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="mailto:marakiyeshi@gmail.com">
              <Button className="bg-white text-emerald-600 hover:bg-gray-100 rounded-xl">
                📧 Email Us
              </Button>
            </a>
            <Link to="/">
              <Button variant="outline" className="border-white text-emerald-600 hover:bg-white hover:text-emerald-600 rounded-xl">
                🌍 Explore Destinations
              </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} MakiTravel. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default FAQ;