"use client";

import { useState } from "react";
import { MessageCircle, Mail, Book, Search, HelpCircle, ExternalLink, Clock, CheckCircle } from "lucide-react";
import Navbar from "@/components/navbar";

export default function SupportPage() {
  const [darkMode, setDarkMode] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const supportChannels = [
    {
      name: "Live Chat",
      description: "Get instant help from our support team during business hours.",
      icon: MessageCircle,
      availability: "Mon-Fri, 9AM-6PM PST",
      responseTime: "< 5 minutes",
      action: "Start Chat",
      link: "#chat",
    },
    {
      name: "Email Support",
      description: "Send us detailed questions and we'll get back to you promptly.",
      icon: Mail,
      availability: "24/7",
      responseTime: "< 24 hours",
      action: "Send Email",
      link: "mailto:support@ternary.app",
    },
    {
      name: "Documentation",
      description: "Browse our comprehensive guides and tutorials.",
      icon: Book,
      availability: "Always available",
      responseTime: "Instant",
      action: "Browse Docs",
      link: "/docs",
    },
  ];

  const faqItems = [
    {
      question: "How do I get started with Ternary?",
      answer:
        "Download the app from our homepage, create an account, and follow the quickstart guide in our documentation.",
    },
    {
      question: "What AI models does Ternary support?",
      answer:
        "Ternary supports all major AI models including GPT-4, Claude, Gemini, and local models through our flexible API system.",
    },
    {
      question: "Can I use Ternary offline?",
      answer: "Yes, Ternary supports local AI models that can run completely offline on your machine.",
    },
    {
      question: "How do I upgrade to Pro?",
      answer:
        "Visit our pricing page and select the Pro plan. You'll get instant access to advanced features and priority support.",
    },
    {
      question: "Is my data secure with Ternary?",
      answer: "Absolutely. We use end-to-end encryption and never store your code or personal data on our servers.",
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer: "Yes, you can cancel your subscription at any time from your account settings. No questions asked.",
    },
  ];

  const filteredFAQ = faqItems.filter(
    (item) =>
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${darkMode ? "bg-[#0f0f0f] text-white" : "bg-[#f5f5f5] text-black"}`}
    >
      <Navbar darkMode={darkMode} onDownloadClick={() => {}} onThemeToggle={() => setDarkMode(!darkMode)} />

      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${darkMode ? "text-white" : "text-black"}`}>
              How can we help you?
            </h1>
            <p className={`text-lg md:text-xl max-w-3xl mx-auto ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              Get the support you need to make the most of Ternary. We're here to help you succeed.
            </p>
          </div>

          {/* Support Channels */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {supportChannels.map((channel, index) => (
              <div
                key={index}
                className={`p-8 rounded-2xl ${
                  darkMode
                    ? "bg-[#1a1a1a] shadow-[8px_8px_16px_#000,-8px_-8px_16px_#2f2f2f]"
                    : "bg-[#e8e8e8] shadow-[8px_8px_16px_#c5c5c5,-8px_-8px_16px_#ffffff]"
                }`}
              >
                <channel.icon className="w-12 h-12 mb-4 opacity-70" />
                <h3 className="text-xl font-bold mb-3">{channel.name}</h3>
                <p className="text-sm opacity-70 mb-4">{channel.description}</p>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-xs opacity-60">
                    <Clock className="w-4 h-4" />
                    {channel.availability}
                  </div>
                  <div className="flex items-center gap-2 text-xs opacity-60">
                    <CheckCircle className="w-4 h-4" />
                    Response: {channel.responseTime}
                  </div>
                </div>
                <a
                  href={channel.link}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    darkMode
                      ? "bg-[#212121] shadow-[3px_3px_6px_#000,-3px_-3px_6px_#2f2f2f] hover:shadow-[inset_3px_3px_6px_#000,inset_-3px_-3px_6px_#1f1f1f]"
                      : "bg-[#e8e8e8] shadow-[3px_3px_6px_#c5c5c5,-3px_-3px_6px_#ffffff] hover:shadow-[inset_3px_3px_6px_#c5c5c5,inset_-3px_-3px_6px_#ffffff]"
                  }`}
                >
                  {channel.action}
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>

          {/* FAQ Section */}
          <div>
            <h2 className={`text-3xl font-bold text-center mb-8 ${darkMode ? "text-white" : "text-black"}`}>
              Frequently Asked Questions
            </h2>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-12">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 opacity-50" />
                <input
                  type="text"
                  placeholder="Search FAQ..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-12 pr-4 py-4 rounded-2xl text-sm transition-all duration-300 ${
                    darkMode
                      ? "bg-[#1a1a1a] shadow-[inset_8px_8px_16px_#000,inset_-8px_-8px_16px_#2f2f2f] focus:shadow-[inset_4px_4px_8px_#000,inset_-4px_-4px_8px_#2f2f2f]"
                      : "bg-[#e8e8e8] shadow-[inset_8px_8px_16px_#c5c5c5,inset_-8px_-8px_16px_#ffffff] focus:shadow-[inset_4px_4px_8px_#c5c5c5,inset_-4px_-4px_8px_#ffffff]"
                  } outline-none`}
                />
              </div>
            </div>

            {/* FAQ Items */}
            <div className="max-w-4xl mx-auto space-y-4">
              {filteredFAQ.map((item, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-2xl ${
                    darkMode
                      ? "bg-[#1a1a1a] shadow-[8px_8px_16px_#000,-8px_-8px_16px_#2f2f2f]"
                      : "bg-[#e8e8e8] shadow-[8px_8px_16px_#c5c5c5,-8px_-8px_16px_#ffffff]"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <HelpCircle className="w-6 h-6 mt-1 opacity-50 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold mb-3">{item.question}</h3>
                      <p className="text-sm opacity-70 leading-relaxed">{item.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredFAQ.length === 0 && (
              <div className="text-center py-12">
                <p className="text-lg opacity-50">No FAQ items match your search.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
