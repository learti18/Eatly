
export const getTotalUnreadMessages = () => {
  try {
    const unreadMessages = localStorage.getItem('restaurant-unread-messages');
    console.log('Getting restaurant unread messages from localStorage:', unreadMessages);
    if (!unreadMessages) return 0;
    
    const parsed = JSON.parse(unreadMessages);
    const total = Object.values(parsed).reduce((total, count) => total + (count || 0), 0);
    console.log('Total unread messages for restaurant:', total);
    return total;
  } catch (error) {
    console.error('Error getting unread message count:', error);
    return 0;
  }
};

export const getUnreadMessagesForUser = () => {
  try {
    const unreadMessages = localStorage.getItem('user-unread-messages');
    if (!unreadMessages) return 0;
    
    const parsed = JSON.parse(unreadMessages);
    return Object.values(parsed).reduce((total, count) => total + (count || 0), 0);
  } catch (error) {
    console.error('Error getting user unread message count:', error);
    return 0;
  }
};

export const markRoomAsRead = (roomId, isRestaurant = true) => {
  try {
    const storageKey = isRestaurant ? 'restaurant-unread-messages' : 'user-unread-messages';
    const timestampKey = isRestaurant ? 'restaurant-last-read-timestamps' : 'user-last-read-timestamps';
    
    // Update unread count
    const unreadMessages = JSON.parse(localStorage.getItem(storageKey) || '{}');
    unreadMessages[roomId] = 0;
    localStorage.setItem(storageKey, JSON.stringify(unreadMessages));
    
    // Update timestamp
    const timestamps = JSON.parse(localStorage.getItem(timestampKey) || '{}');
    timestamps[roomId] = Date.now();
    localStorage.setItem(timestampKey, JSON.stringify(timestamps));
    
    console.log(`Marked room ${roomId} as read`);
    console.log('Updated unread state:', unreadMessages);
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent('unreadMessagesChanged', { 
      detail: { roomId, isRestaurant, type: 'markRead' } 
    }));
  } catch (error) {
    console.error('Error marking room as read:', error);
  }
};

export const incrementUnreadCount = (roomId, isRestaurant = true) => {
  try {
    const storageKey = isRestaurant ? 'restaurant-unread-messages' : 'user-unread-messages';
    const unreadMessages = JSON.parse(localStorage.getItem(storageKey) || '{}');
    unreadMessages[roomId] = (unreadMessages[roomId] || 0) + 1;
    localStorage.setItem(storageKey, JSON.stringify(unreadMessages));
    
    console.log(`Incremented unread count for room ${roomId}:`, unreadMessages[roomId]);
    console.log('Full unread state:', unreadMessages);
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent('unreadMessagesChanged', { 
      detail: { roomId, isRestaurant, type: 'increment' } 
    }));
  } catch (error) {
    console.error('Error incrementing unread count:', error);
  }
};
