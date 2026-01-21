// Utility functions for the event management system

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const formatTime = (timeString) => {
  const [hours, minutes] = timeString.split(':');
  const date = new Date();
  date.setHours(parseInt(hours), parseInt(minutes));
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
};

export const isEventPast = (eventDate) => {
  return new Date(eventDate) < new Date();
};

export const filterEvents = (events, searchTerm, category) => {
  return events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.organizer.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = category === 'All Categories' || event.category === category;
    
    return matchesSearch && matchesCategory;
  });
};

export const generateCertificateId = () => {
  return 'CERT-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
};

export const getEventStatusColor = (status) => {
  switch (status) {
    case 'upcoming':
      return 'bg-blue-100 text-blue-800';
    case 'ongoing':
      return 'bg-green-100 text-green-800';
    case 'completed':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const calculateProgress = (registered, max) => {
  return Math.round((registered / max) * 100);
};