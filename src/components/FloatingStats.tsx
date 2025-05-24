import React, { useEffect, useState } from 'react';
import styles from './FloatingStats.module.css';

interface FloatingStatsProps {
  path: string;
}

interface LikeData {
  count: number;
  users: Array<{
    login: string;
    avatar_url: string;
  }>;
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
        const viewResponse = await fetch(`/api/visit-counter${path}`, {
          method: 'POST',
        }).catch(() => null);

        if (viewResponse?.ok) {
          const data = await viewResponse.json() as { total: number };
          setViews(data.total);
        }

        // Fetch likes
        const likeResponse = await fetch(`/api/likes${path}`).catch(() => null);

        if (likeResponse?.ok) {
          const data = await likeResponse.json() as LikeData;
          setLikes(data);

          // Check if current user has liked
          const currentUser = await getCurrentUser();
          if (
            currentUser &&
            data.users.some((user) => user.login === currentUser.login)
          ) {
            setIsLiked(true);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
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
        const data = await response.json() as { login: string };
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
        const data = await response.json() as LikeData;
        setLikes(data);
        setIsLiked(!isLiked);
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
