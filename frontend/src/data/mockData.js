// Mock data for the college event management system

export const mockEvents = [
  {
    id: 1,
    title: "Tech Symposium 2026",
    description: "Annual technology symposium featuring latest innovations in AI and Machine Learning",
    date: "2026-03-15",
    time: "09:00",
    venue: "Main Auditorium",
    category: "Technology",
    organizer: "Tech Club",
    organizerId: 1,
    maxParticipants: 200,
    registeredCount: 145,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400",
    status: "upcoming",
    registrations: []
  },
  {
    id: 2,
    title: "Cultural Fest",
    description: "Celebrate diversity with music, dance, and art performances",
    date: "2026-03-20",
    time: "18:00",
    venue: "Open Ground",
    category: "Cultural",
    organizer: "Cultural Committee",
    organizerId: 2,
    maxParticipants: 500,
    registeredCount: 320,
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400",
    status: "upcoming",
    registrations: []
  },
  {
    id: 3,
    title: "Sports Championship",
    description: "Inter-college sports competition across multiple categories",
    date: "2026-02-28",
    time: "08:00",
    venue: "Sports Complex",
    category: "Sports",
    organizer: "Sports Committee",
    organizerId: 3,
    maxParticipants: 300,
    registeredCount: 280,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400",
    status: "completed",
    registrations: []
  },
  {
    id: 4,
    title: "Career Fair 2026",
    description: "Meet top recruiters and explore career opportunities",
    date: "2026-03-25",
    time: "10:00",
    venue: "Convention Center",
    category: "Career",
    organizer: "Placement Cell",
    organizerId: 4,
    maxParticipants: 400,
    registeredCount: 89,
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400",
    status: "upcoming",
    registrations: []
  }
];

export const mockStudents = [
  {
    id: 1,
    name: "Alex Johnson",
    email: "alex.johnson@college.edu",
    rollNumber: "CS2021001",
    department: "Computer Science",
    year: "3rd Year",
    phone: "+1234567890",
    registeredEvents: [1, 2, 3],
    certificates: [3]
  },
  {
    id: 2,
    name: "Sarah Williams",
    email: "sarah.williams@college.edu",
    rollNumber: "EC2021002",
    department: "Electronics",
    year: "2nd Year",
    phone: "+1234567891",
    registeredEvents: [1, 4],
    certificates: []
  }
];

export const mockOrganizers = [
  {
    id: 1,
    name: "Dr. Michael Chen",
    email: "michael.chen@college.edu",
    department: "Computer Science",
    position: "Professor",
    phone: "+1234567892",
    eventsCreated: [1]
  },
  {
    id: 2,
    name: "Prof. Emily Davis",
    email: "emily.davis@college.edu",
    department: "Arts & Culture",
    position: "Associate Professor",
    phone: "+1234567893",
    eventsCreated: [2]
  }
];

export const mockAdmin = {
  id: 1,
  name: "Admin User",
  email: "admin@college.edu",
  role: "System Administrator",
  phone: "+1234567894"
};

export const categories = [
  "All Categories",
  "Technology",
  "Cultural",
  "Sports",
  "Career",
  "Academic",
  "Workshop"
];