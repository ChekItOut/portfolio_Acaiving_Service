export interface Profile {
  name: string;
  role: string;
  bio: string;
  skills: string[];
  email: string;
}

export interface Portfolio {
  id: string;
  title: string;
  thumbnail: string;
  description: string;
  skills: string[];
}
