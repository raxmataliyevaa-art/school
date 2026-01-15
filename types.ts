
export interface Teacher {
  id: number;
  name: string;
  subject: string;
  image: string;
  experience: string;
}

export interface NewsItem {
  id: number;
  title: string;
  date: string;
  summary: string;
  image: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface ScheduleEntry {
  day: string;
  lessons: {
    time: string;
    subject: string;
    room: string;
    teacher: string;
  }[];
}

export interface Grade {
  subject: string;
  score: number;
  date: string;
  type: 'Nazorat' | 'Amaliy' | 'Og\'zaki';
}

export interface Task {
  id: number;
  subject: string;
  title: string;
  deadline: string;
  status: 'pending' | 'completed';
}

export interface AttendanceRecord {
  subject: string;
  totalLessons: number;
  attended: number;
  missed: number;
  lastMissedDate?: string;
}
