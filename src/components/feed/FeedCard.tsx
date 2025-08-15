import StarDisplay from '../shared/StarDisplay';
import FeedCardHeader from './FeedCardHeader';
import FeedMediaContainer from './FeedMediaContainer';
import Actions from './Actions';
import { FeedRating } from '@/types/rating';

export type FeedCardProps = FeedRating & {
  onDelete: (ratingId: string) => void;
};

export default function FeedCard(props: FeedCardProps) {
  const {
    user,
    mediaTitle,
    score,
    comment,
    createdAt,
    poster_path,
    overview,
    mediaId,
    mediaType,
    id,
    isOwner,
    onDelete,
  } = props;

  return (
    <div className="flex flex-col gap-4 p-5 border-b border-[#cccccc50]">
      <div className="flex justify-between">
        <FeedCardHeader
          user={user}
          mediaTitle={mediaTitle}
          createdAt={createdAt}
          isOwner={isOwner}
        />
        {isOwner && (
          <Actions
            mediaType={mediaType}
            mediaId={mediaId}
            onDelete={onDelete}
            ratingId={id}
          />
        )}
      </div>
      <StarDisplay value={score} />
      <p className="text-[#737373]">{comment}</p>
      <FeedMediaContainer
        mediaType={mediaType}
        mediaId={mediaId}
        mediaTitle={mediaTitle}
        poster_path={poster_path ?? ''}
        overview={overview ?? ''}
      />
    </div>
  );
}
