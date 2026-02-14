export interface Profile {
  name: string;
  role: string;
  bio: string;
  skills: string[];
  email: string;
  avatar?: string;
}

export interface Portfolio {
  id: string;
  title: string;
  thumbnail: string;
  images?: string[];
  description: string;
  skills: string[];
}
