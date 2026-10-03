import React, { useState } from 'react';
import { useFarmContext } from '../context/FarmContext';
import { MOCK_FORUM_POSTS } from '../data/mockData';
import type { ForumPost } from '../types';
import { Users, ThumbsUp, MessageSquare, Plus, Send } from 'lucide-react';

const palette = {
  parchment: '#EAE3CD',
  panel: '#F6F1E3',
  ink: '#262B1E',
  inkSoft: '#5C6350',
  line: '#CDC3A0',
  green: '#3E6B45',
  greenDeep: '#26422B',
  water: '#2E6C89',
  ochre: '#B0651E',
};

export const CommunityForum: React.FC = () => {
  const { showNotification } = useFarmContext();
  const [posts, setPosts] = useState<ForumPost[]>(MOCK_FORUM_POSTS);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = ['All', 'Irrigation', 'Pests', 'Weather', 'Subsidies'];

  const filteredPosts = activeCategory === 'All' ? posts : posts.filter((p) => p.category === activeCategory);

  const handleLike = (id: string) => {
    setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, likes: p.likes + 1 } : p)));
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const post: ForumPost = {
      id: `post-${Date.now()}`,
      author: 'Farmer User',
      authorRole: 'Community Member',
      location: 'Ludhiana, Punjab',
      avatar: '👨‍🌾',
      title: newTitle.trim(),
      content: newContent.trim(),
      category: 'Irrigation',
      likes: 1,
      repliesCount: 0,
      timestamp: 'Just now',
      tags: ['SmartWaterGuardian', 'FarmCommunity'],
    };

    setPosts([post, ...posts]);
    setNewTitle('');
    setNewContent('');
    setIsModalOpen(false);
    showNotification('Your discussion post has been published to the community!');
  };

  return (
    <div style={{ backgroundColor: palette.parchment, color: palette.ink }} className="font-sans min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 lg:px-12 py-10 space-y-8">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs" style={{ color: palette.inkSoft }}>
              <Users className="w-3.5 h-3.5" /> Farmer community
            </div>
            <h1 className="font-serif text-3xl mt-1">Knowledge exchange</h1>
            <p className="text-sm mt-2 max-w-xl" style={{ color: palette.inkSoft }}>
              12,000+ farmers, agronomists, FPOs and water conservation specialists across India.
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2.5 text-sm text-white flex items-center gap-2 self-start"
            style={{ backgroundColor: palette.green }}
          >
            <Plus className="w-4 h-4" /> Ask a question
          </button>
        </div>

        {/* CATEGORY FILTERS — underlined tabs, not pill buttons */}
        <div className="flex flex-wrap gap-6 text-sm" style={{ borderBottom: `1px solid ${palette.line}` }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="pb-2"
              style={{
                color: activeCategory === cat ? palette.ink : palette.inkSoft,
                borderBottom: activeCategory === cat ? `2px solid ${palette.green}` : '2px solid transparent',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* POSTS — one continuous list, not stacked cards */}
        <div>
          {filteredPosts.map((post) => (
            <div key={post.id} className="py-6" style={{ borderBottom: `1px solid ${palette.line}` }}>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{post.avatar}</span>
                  <div>
                    <div className="text-sm font-medium">
                      {post.author} <span style={{ color: palette.inkSoft }}>· {post.location}</span>
                    </div>
                    <div className="text-xs" style={{ color: palette.inkSoft }}>
                      {post.authorRole} · {post.timestamp}
                    </div>
                  </div>
                </div>
                <span className="text-xs shrink-0" style={{ color: palette.water }}>{post.category}</span>
              </div>

              <h3 className="text-base font-medium mb-1">{post.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: palette.inkSoft }}>{post.content}</p>

              <div className="flex flex-wrap gap-2 mt-3">
                {post.tags.map((tag, idx) => (
                  <span key={idx} className="text-xs px-2 py-0.5" style={{ border: `1px solid ${palette.line}`, color: palette.inkSoft }}>
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-6 mt-4 text-xs">
                <button
                  onClick={() => handleLike(post.id)}
                  className="flex items-center gap-1.5 transition-colors"
                  style={{ color: palette.inkSoft }}
                >
                  <ThumbsUp className="w-3.5 h-3.5" /> {post.likes} helpful
                </button>
                <button className="flex items-center gap-1.5" style={{ color: palette.inkSoft }}>
                  <MessageSquare className="w-3.5 h-3.5" /> {post.repliesCount} replies
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CREATE POST MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(38,43,30,0.6)' }}>
          <div className="w-full max-w-lg p-6 space-y-4" style={{ backgroundColor: palette.panel }}>
            <h3 className="font-serif text-xl">Post to the community</h3>
            <form onSubmit={handleCreatePost} className="space-y-4">
              <div>
                <label className="block text-xs mb-1" style={{ color: palette.inkSoft }}>Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Recommended moisture levels for wheat in sandy soil"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm focus:outline-none"
                  style={{ backgroundColor: palette.parchment, border: `1px solid ${palette.line}`, color: palette.ink }}
                />
              </div>

              <div>
                <label className="block text-xs mb-1" style={{ color: palette.inkSoft }}>Content & advice</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Share your experience with Smart Water Guardian..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full px-4 py-2 text-sm focus:outline-none"
                  style={{ backgroundColor: palette.parchment, border: `1px solid ${palette.line}`, color: palette.ink }}
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm"
                  style={{ color: palette.inkSoft }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-sm text-white flex items-center gap-2"
                  style={{ backgroundColor: palette.green }}
                >
                  <Send className="w-4 h-4" /> Publish post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};