import { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { subscribeToUnreadCounts } from '../Services/FirebaseService';

/**
 * Custom hook for Firebase-based unread message tracking
 * Provides real-time unread counts that work across devices and sessions
 * 
 * @returns {Object} { totalUnreadCount, unreadCounts, loading }
 */
export const useFirebaseUnreadMessages = () => {
  const [unreadCounts, setUnreadCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const firebaseAuth = getAuth();

  useEffect(() => {
    let unsubscribe = () => {};

    const setupSubscription = () => {
      if (!firebaseAuth.currentUser) {
        console.log('useFirebaseUnreadMessages: Waiting for authentication...');
        setLoading(true);
        return;
      }

      console.log('useFirebaseUnreadMessages: Setting up subscription for user:', firebaseAuth.currentUser.uid);
      setLoading(true);
      setError(null);

      try {
        unsubscribe = subscribeToUnreadCounts(firebaseAuth.currentUser.uid, (newUnreadCounts) => {
          console.log('useFirebaseUnreadMessages: Received unread counts:', newUnreadCounts);
          setUnreadCounts(newUnreadCounts || {});
          setLoading(false);
        });
      } catch (err) {
        console.error('useFirebaseUnreadMessages: Error setting up subscription:', err);
        setError(err);
        setLoading(false);
      }
    };

    // Set up subscription immediately if user is already authenticated
    if (firebaseAuth.currentUser) {
      setupSubscription();
    } else {
      // Listen for auth state changes
      const authUnsubscribe = firebaseAuth.onAuthStateChanged((user) => {
        if (user) {
          setupSubscription();
        } else {
          console.log('useFirebaseUnreadMessages: User signed out, clearing unread counts');
          setUnreadCounts({});
          setLoading(false);
        }
      });

      return () => {
        authUnsubscribe();
        unsubscribe();
      };
    }

    return () => {
      unsubscribe();
    };
  }, [firebaseAuth]);

  // Calculate total unread count
  const totalUnreadCount = Object.values(unreadCounts).reduce((total, count) => total + count, 0);

  return {
    totalUnreadCount,
    unreadCounts,
    loading,
    error
  };
};
