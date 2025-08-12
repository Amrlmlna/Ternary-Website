"use client"

import type React from "react"

import { useState } from "react"
import { Users, MessageCircle, Github, Twitter, DiscIcon as Discord, Send, Clock, User } from "lucide-react"
import Navbar from "../../components/navbar"

export default function CommunityPage() {
  const [darkMode, setDarkMode] = useState(true)
  const [newPost, setNewPost] = useState("")

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
  ]

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newPost.trim()) {
      // Handle post submission
      setNewPost("")
    }
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${darkMode ? "bg-[#0f0f0f] text-white" : "bg-[#f5f5f5] text-black"}`}
    >
      <Navbar darkMode={darkMode} onDownloadClick={() => {}} onThemeToggle={() => setDarkMode(!darkMode)} />

      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${darkMode ? "text-white" : "text-black"}`}>
              Community
            </h1>
            <p className={`text-lg max-w-2xl mx-auto ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              Share your thoughts, ask questions, and connect with other Ternary users.
            </p>
          </div>

          <div className="flex justify-center gap-4 mb-12">
            <a
              href="https://discord.gg/ternary"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-lg transition-all duration-300 ${
                darkMode
                  ? "bg-[#1a1a1a] shadow-[3px_3px_6px_#000,-3px_-3px_6px_#2f2f2f] hover:shadow-[inset_3px_3px_6px_#000,inset_-3px_-3px_6px_#1f1f1f]"
                  : "bg-[#e8e8e8] shadow-[3px_3px_6px_#c5c5c5,-3px_-3px_6px_#ffffff] hover:shadow-[inset_3px_3px_6px_#c5c5c5,inset_-3px_-3px_6px_#ffffff]"
              }`}
            >
              <Discord className="w-5 h-5" />
            </a>
            <a
              href="https://github.com/TernaryStudio/Ternary-App/discussions"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-lg transition-all duration-300 ${
                darkMode
                  ? "bg-[#1a1a1a] shadow-[3px_3px_6px_#000,-3px_-3px_6px_#2f2f2f] hover:shadow-[inset_3px_3px_6px_#000,inset_-3px_-3px_6px_#1f1f1f]"
                  : "bg-[#e8e8e8] shadow-[3px_3px_6px_#c5c5c5,-3px_-3px_6px_#ffffff] hover:shadow-[inset_3px_3px_6px_#c5c5c5,inset_-3px_-3px_6px_#ffffff]"
              }`}
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://twitter.com/ternaryapp"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-lg transition-all duration-300 ${
                darkMode
                  ? "bg-[#1a1a1a] shadow-[3px_3px_6px_#000,-3px_-3px_6px_#2f2f2f] hover:shadow-[inset_3px_3px_6px_#000,inset_-3px_-3px_6px_#1f1f1f]"
                  : "bg-[#e8e8e8] shadow-[3px_3px_6px_#c5c5c5,-3px_-3px_6px_#ffffff] hover:shadow-[inset_3px_3px_6px_#c5c5c5,inset_-3px_-3px_6px_#ffffff]"
              }`}
            >
              <Twitter className="w-5 h-5" />
            </a>
          </div>

          <div
            className={`p-6 rounded-2xl mb-8 ${
              darkMode
                ? "bg-[#1a1a1a] shadow-[8px_8px_16px_#000,-8px_-8px_16px_#2f2f2f]"
                : "bg-[#e8e8e8] shadow-[8px_8px_16px_#c5c5c5,-8px_-8px_16px_#ffffff]"
            }`}
          >
            <form onSubmit={handlePostSubmit}>
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="Share your thoughts with the community..."
                className={`w-full p-4 rounded-xl border-0 resize-none h-24 ${
                  darkMode
                    ? "bg-[#212121] shadow-[inset_3px_3px_6px_#000,inset_-3px_-3px_6px_#2f2f2f] text-white placeholder-gray-400"
                    : "bg-[#f0f0f0] shadow-[inset_3px_3px_6px_#c5c5c5,inset_-3px_-3px_6px_#ffffff] text-black placeholder-gray-500"
                }`}
              />
              <div className="flex justify-end mt-4">
                <button
                  type="submit"
                  className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 ${
                    darkMode
                      ? "bg-[#212121] shadow-[3px_3px_6px_#000,-3px_-3px_6px_#2f2f2f] hover:shadow-[inset_3px_3px_6px_#000,inset_-3px_-3px_6px_#1f1f1f]"
                      : "bg-[#e8e8e8] shadow-[3px_3px_6px_#c5c5c5,-3px_-3px_6px_#ffffff] hover:shadow-[inset_3px_3px_6px_#c5c5c5,inset_-3px_-3px_6px_#ffffff]"
                  }`}
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
                className={`p-6 rounded-2xl ${
                  darkMode
                    ? "bg-[#1a1a1a] shadow-[8px_8px_16px_#000,-8px_-8px_16px_#2f2f2f]"
                    : "bg-[#e8e8e8] shadow-[8px_8px_16px_#c5c5c5,-8px_-8px_16px_#ffffff]"
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      darkMode
                        ? "bg-[#212121] shadow-[inset_3px_3px_6px_#000,inset_-3px_-3px_6px_#2f2f2f]"
                        : "bg-[#f0f0f0] shadow-[inset_3px_3px_6px_#c5c5c5,inset_-3px_-3px_6px_#ffffff]"
                    }`}
                  >
                    <User className="w-5 h-5 opacity-70" />
                  </div>
                  <div>
                    <div className="font-medium">{post.author}</div>
                    <div className="text-sm opacity-60 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.time}
                    </div>
                  </div>
                </div>
                <p className="mb-4 leading-relaxed">{post.content}</p>
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
  )
}
