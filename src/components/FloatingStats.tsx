import React, { useEffect, useState } from 'react';
import styles from './FloatingStats.module.css';

interface FloatingStatsProps {
  path: string;
}

interface GitHubUser {
  login: string;
  avatar_url: string;
}

interface LikeData {
  count: number;
  users: GitHubUser[];
}

interface LikeApiResponse {
  count?: number;
  users?: GitHubUser[];
  error?: string;
}

const defaultLikeData: LikeData = {
  count: 0,
  users: [],
};

const HeartIcon = ({ filled }: { filled: boolean }) => (
  <span role="img" aria-label="like">
    {filled ? '❤️' : '♡'}
  </span>
);

const FloatingStats: React.FC<FloatingStatsProps> = ({ path }) => {
  const [views, setViews] = useState<number>(0);
  const [likes, setLikes] = useState<LikeData>(defaultLikeData);
  const [isLiked, setIsLiked] = useState(false);
  const [showLikeDetails, setShowLikeDetails] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch views
        try {
          const viewResponse = await fetch(`/api/visit-counter${path}`, {
            method: 'POST',
          });

          if (viewResponse?.ok) {
            const data = (await viewResponse.json()) as { total?: number; error?: string };
            if (data && typeof data.total === 'number') {
              setViews(data.total);
            }
          } else {
            console.warn('Failed to fetch views:', viewResponse?.status);
          }
        } catch (error) {
          console.warn('Error fetching views:', error);
        }

        // Fetch likes
        try {
          const likeResponse = await fetch(`/api/likes${path}`);

          if (likeResponse?.ok) {
            const data = (await likeResponse.json()) as LikeApiResponse;
            if (data && typeof data.count === 'number' && Array.isArray(data.users)) {
              setLikes(data as LikeData);

              // Check if current user has liked
              const currentUser = await getCurrentUser();
              if (currentUser && data.users.some((user) => user.login === currentUser.login)) {
                setIsLiked(true);
              }
            }
          } else {
            console.warn('Failed to fetch likes:', likeResponse?.status);
          }
        } catch (error) {
          console.warn('Error fetching likes:', error);
        }
      } catch (error) {
        console.error('Error in fetchData:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [path]);

  const getCurrentUser = async () => {
    try {
      const response = await fetch('/api/auth/user');
      if (response.ok) {
        const data = (await response.json()) as { login: string };
        return data;
      }
      return null;
    } catch {
      return null;
    }
  };

  const handleLike = async () => {
    try {
      const response = await fetch(`/api/likes${path}`, {
        method: 'POST',
      });
      if (response.ok) {
        const data = (await response.json()) as LikeApiResponse;
        if (data && typeof data.count === 'number' && Array.isArray(data.users)) {
          setLikes(data as LikeData);
          setIsLiked(!isLiked);
        }
      } else {
        console.warn('Failed to update like:', response.status);
      }
    } catch (error) {
      console.error('Error updating like:', error);
    }
  };

  const toggleLikeDetails = () => {
    if (likes.users.length > 0) {
      setShowLikeDetails(!showLikeDetails);
    }
  };

  return (
    <div className={`${styles.floatingStats} ${isLoading ? styles.loading : ''}`}>
      <div className={styles.stat}>
        <span role="img" aria-label="views">
          👀
        </span>
        <span>{views}</span>
      </div>

      <div className={styles.stat}>
        <button
          onClick={handleLike}
          className={`${styles.likeButton} ${isLiked ? styles.liked : ''}`}
          disabled={isLoading}
          aria-label={isLiked ? 'Unlike post' : 'Like post'}
        >
          <HeartIcon filled={isLiked} />
        </button>
        <button
          onClick={toggleLikeDetails}
          className={`${styles.countButton} ${showLikeDetails ? styles.active : ''}`}
          disabled={isLoading || likes.users.length === 0}
        >
          {likes.count}
        </button>
      </div>

      {showLikeDetails && likes.users.length > 0 && (
        <div className={styles.likeDetails}>
          <div className={styles.likeDetailsHeader}>
            Liked by:
            <button
              className={styles.closeButton}
              onClick={() => setShowLikeDetails(false)}
              aria-label="Close likes details"
            >
              ×
            </button>
          </div>
          <div className={styles.userList}>
            {likes.users.map((user) => (
              <div key={user.login} className={styles.userItem}>
                <img src={user.avatar_url} alt={user.login} className={styles.userAvatar} />
                <span className={styles.userName}>{user.login}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FloatingStats;
