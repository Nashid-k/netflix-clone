import { Star } from 'lucide-react';
import { formatRuntime } from '../../../utils/formatters';

export const ContentMetadata = ({ content }) => (
  <div className="flex flex-wrap items-center gap-6">
    <RatingBadge rating={content.vote_average} />
    <YearBadge date={content.release_date || content.first_air_date} />
    <AgeBadge adult={content.adult} />
    {content.runtime && <RuntimeBadge runtime={content.runtime} />}
  </div>
);

const RatingBadge = ({ rating }) => (
  <div className="flex items-center bg-white/10 px-3 py-1 rounded-full">
    <Star className="w-4 h-4 text-yellow-500 mr-1" />
    <span>{rating?.toFixed(1)}</span>
  </div>
);

const YearBadge = ({ date }) => (
  <span className="bg-white/10 px-3 py-1 rounded-full">
    {date?.split("-")[0]}
  </span>
);

const AgeBadge = ({ adult }) => (
  <span className={`px-3 py-1 rounded-full ${
    adult ? 'bg-red-600/80' : 'bg-green-600/80'
  }`}>
    {adult ? "18+" : "PG-13"}
  </span>
);

const RuntimeBadge = ({ runtime }) => (
  <span className="bg-white/10 px-3 py-1 rounded-full">
    {formatRuntime(runtime)}
  </span>
);