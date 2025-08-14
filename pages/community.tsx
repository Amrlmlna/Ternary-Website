"use client";

import { useState } from "react";
import {
  Users,
  MessageCircle,
  Github,
  Twitter,
  DiscIcon as Discord,
  Send,
  Clock,
  User,
} from "lucide-react";
import Navbar from "@/components/Navbar";

export default function CommunityPage() {
  const [darkMode, setDarkMode] = useState(true);
  const [newPost, setNewPost] = useState("");

  const communityPosts = [
    {
      id: 1,
      author: "Alex Chen",
      time: "2 hours ago",
      content:
        "Just built my first app with Ternary! The AI suggestions are incredibly helpful. Anyone else working on e-commerce projects?",
      replies: 12,
      likes: 24,
    },
    {
      id: 2,
      author: "Sarah Kim",
      time: "5 hours ago",
      content:
        "Pro tip: Use the debugging feature when your components aren't rendering correctly. Saved me hours of troubleshooting!",
      replies: 8,
      likes: 31,
    },
    {
      id: 3,
      author: "Mike Rodriguez",
      time: "1 day ago",
      content:
        "Looking for collaborators on an open-source project using Ternary. DM me if you're interested in contributing to a productivity app!",
      replies: 15,
      likes: 18,
    },
    {
      id: 4,
      author: "Emma Wilson",
      time: "2 days ago",
      content:
        "The new local models feature is a game changer. Finally can work offline without compromising on AI assistance.",
      replies: 22,
      likes: 45,
    },
  ];

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPost.trim()) {
      // Handle post submission
      setNewPost("");
    }
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen neu-bg neu-transition">
        <Navbar
          darkMode={darkMode}
          onDownloadClick={() => {}}
          onThemeToggle={() => setDarkMode(!darkMode)}
        />

        <div className="pt-20 pb-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[var(--neu-text)]">
                Community
              </h1>
              <p className="text-lg max-w-2xl mx-auto opacity-80 text-[var(--neu-text)]">
                Share your thoughts, ask questions, and connect with other Ternary
                users.
              </p>
            </div>

            <div className="flex justify-center gap-4 mb-12">
              <a
                href="https://discord.gg/ternary"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 neu-bg neu-radius neu-transition neu-shadow"
              >
                <Discord className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/TernaryStudio/Ternary-App/discussions"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 neu-bg neu-radius neu-transition neu-shadow"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com/TernaryStudio"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 neu-bg neu-radius neu-transition neu-shadow"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>

            <div className="p-6 neu-radius mb-8 neu-bg neu-shadow neu-transition">
              <form onSubmit={handlePostSubmit}>
                <textarea
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  placeholder="Share your thoughts with the community..."
                  className="w-full neu-input resize-none h-24"
                />
                <div className="flex justify-end mt-4">
                  <button
                    type="submit"
                    className="px-6 py-2 neu-radius font-medium neu-transition flex items-center gap-2 neu-bg neu-shadow"
                  >
                    <Send className="w-4 h-4" />
                    Post
                  </button>
                </div>
              </form>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {communityPosts.map((post) => (
                <div
                  key={post.id}
                  className="p-6 neu-radius neu-bg neu-shadow neu-transition"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-10 h-10 neu-radius flex items-center justify-center neu-bg neu-shadow-inset"
                    >
                      <User className="w-5 h-5 opacity-70" />
                    </div>
                    <div>
                      <div className="font-medium">{post.author}</div>
                      <div className="text-sm opacity-60 flex items-center gap-1 text-[var(--neu-text)]">
                        <Clock className="w-3 h-3" />
                        {post.time}
                      </div>
                    </div>
                  </div>
                  <p className="mb-4 leading-relaxed text-[var(--neu-text)]">{post.content}</p>
                  <div className="flex items-center gap-6 text-sm opacity-70">
                    <button className="flex items-center gap-1 hover:opacity-100 transition-opacity">
                      <MessageCircle className="w-4 h-4" />
                      {post.replies} replies
                    </button>
                    <button className="flex items-center gap-1 hover:opacity-100 transition-opacity">
                      <Users className="w-4 h-4" />
                      {post.likes} likes
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
