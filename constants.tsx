
import { Teacher, NewsItem, ScheduleEntry, Grade, Task } from './types';

export const SCHOOL_NAME = "35-sonli umumta'lim maktabi";
export const SCHOOL_MOTTO = "Bilim - kelajak poydevori";

export const TEACHERS: Teacher[] = [
  {
    id: 1,
    name: "Aliyeva Gulnora",
    subject: "Ona tili va adabiyot",
    experience: "20 yil",
    image: "https://picsum.photos/id/64/300/300"
  },
  {
    id: 2,
    name: "Usmonov Jahongir",
    subject: "Matematika",
    experience: "15 yil",
    image: "https://picsum.photos/id/91/300/300"
  },
  {
    id: 3,
    name: "Karimova Zilola",
    subject: "Ingliz tili",
    experience: "10 yil",
    image: "https://picsum.photos/id/177/300/300"
  },
  {
    id: 4,
    name: "Sultonov Rustam",
    subject: "Fizika",
    experience: "25 yil",
    image: "https://picsum.photos/id/442/300/300"
  }
];

export const NEWS: NewsItem[] = [
  {
    id: 1,
    title: "Maktabimizda 'Zulfiyaxonim qizlari' ko'rik tanlovi bo'lib o'tdi",
    date: "2024-05-15",
    summary: "Iqtidorli o'quvchi qizlarimiz o'z mahoratlarini namoyish etishdi.",
    image: "https://picsum.photos/id/20/600/400"
  },
  {
    id: 2,
    title: "Sport musobaqalarida g'oliblik!",
    date: "2024-05-10",
    summary: "Maktab futbol jamoasi tuman miqyosida birinchi o'rinni egalladi.",
    image: "https://picsum.photos/id/73/600/400"
  },
  {
    id: 3,
    title: "Yangi kutubxona ochilish marosimi",
    date: "2024-05-01",
    summary: "Maktabimizda zamonaviy va boy fondga ega yangi kutubxona ish boshladi.",
    image: "https://picsum.photos/id/145/600/400"
  }
];

export const STUDENT_SCHEDULE: ScheduleEntry[] = [
  {
    day: "Dushanba",
    lessons: [
      { time: "08:30", subject: "Matematika", room: "204", teacher: "Usmonov J." },
      { time: "09:20", subject: "Ona tili", room: "105", teacher: "Aliyeva G." },
      { time: "10:10", subject: "Fizika", room: "302", teacher: "Sultonov R." },
      { time: "11:00", subject: "Ingliz tili", room: "210", teacher: "Karimova Z." }
    ]
  },
  {
    day: "Seshanba",
    lessons: [
      { time: "08:30", subject: "Tarix", room: "108", teacher: "Nazarov K." },
      { time: "09:20", subject: "Kimyo", room: "305", teacher: "Azizov S." },
      { time: "10:10", subject: "Biologiya", room: "201", teacher: "Saidova M." },
      { time: "11:00", subject: "Jismoniy tarbiya", room: "Sport zal", teacher: "Xudoyorov B." }
    ]
  }
];

export const STUDENT_GRADES: Grade[] = [
  { subject: "Matematika", score: 5, date: "2024-05-14", type: "Nazorat" },
  { subject: "Ingliz tili", score: 4, date: "2024-05-13", type: "Og'zaki" },
  { subject: "Ona tili", score: 5, date: "2024-05-12", type: "Amaliy" },
  { subject: "Fizika", score: 3, date: "2024-05-10", type: "Nazorat" },
  { subject: "Tarix", score: 4, date: "2024-05-08", type: "Og'zaki" }
];

export const STUDENT_TASKS: Task[] = [
  { id: 1, subject: "Matematika", title: "Logarifmlar mavzusidagi 12-25 misollar", deadline: "2024-05-20", status: "pending" },
  { id: 2, subject: "Ingliz tili", title: "Present Perfect vs Past Simple essay", deadline: "2024-05-22", status: "pending" },
  { id: 3, subject: "Ona tili", title: "Insho: 'Mening kelajagim'", deadline: "2024-05-18", status: "completed" }
];
