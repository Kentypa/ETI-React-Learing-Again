export type PostType = {
  id: number;
  author: string;
  avatar: string;
  content: string;
  date: string;
  likes: number;
  tag: string;
};

export const postsData: PostType[] = [
  {
    id: 1,
    author: "User123",
    avatar: "https://placehold.co/50",
    content: "Це мій перший пост у новій соціальній мережі! React - це круто.",
    date: "2 год тому",
    likes: 5,
    tag: "React",
  },
  {
    id: 2,
    author: "Admin",
    avatar: "https://placehold.co/50",
    content:
      "Сьогодні ми вивчаємо Lists та Keys. Не забувайте про унікальні ключі!",
    date: "4 год тому",
    likes: 12,
    tag: "JavaScript",
  },
  {
    id: 3,
    author: "Student_KP",
    avatar: "https://placehold.co/50",
    content: "Лабораторна робота №2 виконується успішно.",
    date: "1 день тому",
    likes: 2,
    tag: "University",
  },
  {
    id: 4,
    author: "CoderX",
    avatar: "https://placehold.co/50",
    content: "TypeScript робить код більш зрозумілим та безпечним.",
    date: "3 дні тому",
    likes: 20,
    tag: "TypeScript",
  },
  {
    id: 5,
    author: "DesignerPro",
    avatar: "https://placehold.co/50",
    content: "UI/UX — це не тільки про красу, а й про зручність.",
    date: "5 днів тому",
    likes: 15,
    tag: "Design",
  },
  {
    id: 6,
    author: "TechGuru",
    avatar: "https://placehold.co/50",
    content: "Node.js дозволяє створювати масштабовані серверні застосунки.",
    date: "1 тиждень тому",
    likes: 30,
    tag: "Node.js",
  },
  {
    id: 7,
    author: "GamerLife",
    avatar: "https://placehold.co/50",
    content: "Нова гра вражає графікою та сюжетом!",
    date: "2 тижні тому",
    likes: 50,
    tag: "Gaming",
  },
  {
    id: 8,
    author: "Traveler",
    avatar: "https://placehold.co/50",
    content: "Подорож до Карпат була неймовірною! Рекомендую всім.",
    date: "3 тижні тому",
    likes: 40,
    tag: "Travel",
  },
];
