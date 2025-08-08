import StarDisplay from '../shared/StarDisplay';
import { RatingWithUser } from '@/types/rating';
import Actions from './Actions';
import FeedCardHeader from './FeedCardHeader';
import FeedMediaContainer from './FeedMediaContainer';

interface FeedCardProps extends RatingWithUser {
  isOwner: boolean;
  onDelete: (ratingId: string) => void;
}

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
    <div className="flex flex-col gap-4 p-5 border-b-1 border-[#cccccc50]">
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
      <div>
        <p className="text-[#737373]">{comment}</p>
      </div>
      <FeedMediaContainer
        mediaType={mediaType}
        mediaId={mediaId}
        mediaTitle={mediaTitle}
        poster_path={poster_path}
        overview={overview}
      />
    </div>
  );
}
