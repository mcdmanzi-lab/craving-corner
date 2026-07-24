import React from 'react';
import { Instagram, Play, Heart, MessageCircle, ExternalLink, Sparkles, Star } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/cravingCornerData';

export const InstagramFeedGallery: React.FC = () => {
  const instagramPosts = [
    {
      id: 'post-1',
      title: '30,000 RWF Grand Shared Platter Review in Gisozi 🍱',
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
      likes: '1,420',
      comments: '184',
      type: 'Reel',
      caption: 'Feeds 5 people for only 30k RWF! Loaded with ribs, chicken, beef pilau & wedges @craving_corner_resto_and_cafe'
    },
    {
      id: 'post-2',
      title: 'Romantic Candlelight Proposal Setup ✨',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
      likes: '2,890',
      comments: '210',
      type: 'Photo',
      caption: 'She said YES! Custom proposal table decor & flowers organized by our event team in Gisozi.'
    },
    {
      id: 'post-[#post-3]',
      title: 'Monday Burger Promo Day Special 🍔',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
      likes: '980',
      comments: '76',
      type: 'Reel',
      caption: 'Every single Monday: enjoy our signature large beef burger for only 4,500 RWF instead of 6,500 RWF!'
    },
    {
      id: 'post-4',
      title: 'Fresh Iced Blue Mountain Refresher 🍹',
      image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
      likes: '1,150',
      comments: '92',
      type: 'Photo',
      caption: 'Beat the Kigali warmth with our signature Blue Mountain & Mango Madness iced drinks.'
    }
  ];

  return (
    <section id="gallery" className="py-16 bg-[#1A1A1A] text-white border-b border-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-800 pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Instagram className="w-5 h-5 text-[#E5383B]" />
              <span className="text-[10px] font-bold tracking-[2px] uppercase text-[#E5383B] block font-serif">
                OFFICIAL INSTAGRAM FEED
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif text-white">
              Food Reviews & Event Moments
            </h2>
          </div>

          <a
            href={RESTAURANT_INFO.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#C8102E] hover:bg-[#A60C24] text-white font-medium px-5 py-3 text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-2 self-start md:self-auto"
          >
            <span>Follow {RESTAURANT_INFO.instagramHandle}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {instagramPosts.map(post => (
            <a
              key={post.id}
              href={RESTAURANT_INFO.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#121212] border border-stone-800 group hover:border-[#C8102E] transition-all flex flex-col justify-between overflow-hidden"
            >
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter contrast-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <p className="text-xs text-stone-200 line-clamp-2">{post.caption}</p>
                </div>

                <div className="absolute top-3 left-3 bg-[#1A1A1A]/90 text-white text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 border border-stone-700 flex items-center gap-1">
                  {post.type === 'Reel' && <Play className="w-2.5 h-2.5 fill-current" />}
                  <span>{post.type}</span>
                </div>
              </div>

              <div className="p-4 space-y-3">
                <h4 className="font-serif font-bold text-xs text-white line-clamp-1">
                  {post.title}
                </h4>

                <div className="flex items-center justify-between text-[11px] text-stone-400 border-t border-stone-800 pt-2">
                  <span className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 text-red-500 fill-current" />
                    {post.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-3.5 h-3.5 text-stone-400" />
                    {post.comments}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Customer Proof Quote Banner */}
        <div className="bg-[#121212] border border-stone-800 p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="space-y-1">
            <div className="flex justify-center text-[#E5383B] gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <p className="text-xs text-stone-300 italic font-serif pt-1">
              "The 30,000 RWF platter is unmatched in Kigali! Feeds 5 friends easily and the ribs are so tender."
            </p>
            <span className="text-[10px] text-stone-400 block font-bold uppercase tracking-wider">— Kigali Foodie Review</span>
          </div>

          <div className="space-y-1 border-y md:border-y-0 md:border-x border-stone-800 py-4 md:py-0">
            <div className="flex justify-center text-[#E5383B] gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <p className="text-xs text-stone-300 italic font-serif pt-1">
              "They decorated our marriage proposal table with candlelight and flowers. Truly an unforgettable night!"
            </p>
            <span className="text-[10px] text-stone-400 block font-bold uppercase tracking-wider">— Couple Milestone</span>
          </div>

          <div className="space-y-1">
            <div className="flex justify-center text-[#E5383B] gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <p className="text-xs text-stone-300 italic font-serif pt-1">
              "Open 24/7 in Gisozi right by Rubis Gas Station. Late night chicken shawarma delivered at 2 AM was fresh and hot."
            </p>
            <span className="text-[10px] text-stone-400 block font-bold uppercase tracking-wider">— Nighttime Diner</span>
          </div>
        </div>

      </div>
    </section>
  );
};
