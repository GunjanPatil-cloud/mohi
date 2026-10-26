import React from 'react';
import { REVIEWS } from '../data/chairs';
import { Star, CheckCircle } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  return (
    <section className="py-16 lg:py-24 bg-zinc-50 border-y border-zinc-200">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-2">
              Verified Posture Feedback
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950 font-display">
              Trusted by creators who sit for a living.
            </h2>
          </div>

          {/* Rating Summary */}
          <div className="flex items-center gap-4 bg-white px-5 py-3 rounded-2xl border border-zinc-200 shadow-2xs">
            <div className="text-3xl font-bold font-mono tabular-nums text-zinc-950">
              4.9
            </div>
            <div>
              <div className="flex items-center gap-0.5 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs text-zinc-500 mt-0.5">
                Based on 745+ verified owner reviews
              </p>
            </div>
          </div>
        </div>

        {/* 3 Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="bg-white p-6 rounded-2xl border border-zinc-200/90 shadow-2xs flex flex-col justify-between"
            >
              <div>
                {/* Rating Stars & Model */}
                <div className="flex items-center justify-between mb-3 text-xs text-zinc-500">
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <span className="font-medium text-zinc-700">{review.chairName}</span>
                </div>

                <h3 className="text-sm font-semibold text-zinc-900 mb-2">
                  "{review.title}"
                </h3>

                <p className="text-xs text-zinc-600 leading-relaxed">
                  {review.content}
                </p>
              </div>

              {/* Author & Attribution */}
              <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center justify-between text-xs">
                <div>
                  <div className="font-semibold text-zinc-900">{review.author}</div>
                  <div className="text-[11px] text-zinc-500">{review.role}</div>
                  <div className="text-[10px] text-zinc-400">{review.location}</div>
                </div>
                {review.verified && (
                  <span className="flex items-center gap-1 text-[11px] text-emerald-700 font-medium">
                    <CheckCircle className="w-3 h-3 text-emerald-600" />
                    <span>Verified</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
