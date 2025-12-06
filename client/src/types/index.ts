export interface IUser {
  id: number;
  name: string;
  name_user: string;
  email: string;
  role: string;
  bio: string;
}

interface Like {
  ID: number;
  UserId: number;
  PostId: number;
}

export interface ITag {
  ID: number;
  Name: string;
}

export type DialogType =
  | "createPost"
  | "editPost"
  | "editResponse"
  | "createComment"
  | "editComment"
  | "createGroup";

export interface IPost {
  id: number;
  title: string;
  content: string;
  created_at: string;
  user: IUser;
  likes_count: number;
  Likes: Like[];
  liked_by_me: boolean;
  tags: ITag[];
}

export interface IComment {
  id: number;
  user: IUser;
  Likes: number | null;
  content: string;
  created_at: string;
}

export interface IResponsesComment {
  id: number;
  user: IUser;
  comment_id: number;
  content: string;
  created_at: string;
}

export interface IStudent {
  UserID: number;
  User: IUser;
  course: string;
  matricula: string;
}

// Grupos
type Teacher = {
  departament: string;
  formation: string;
  user: IUser;
};

type Members = {
  id: number;
  student_id: number;
  student: {
    id: number;
    name: string;
    email: string;
    bio: string;
    role: string;
  };
};

export interface IGroup {
  id: string;
  nome: string;
  Description: string;
  teacher_id: number;
  teacher: Teacher;
  user: IUser;
  members: Members[];
}

export interface IChallenge {
  id: number;
  title: string;
  description: string;
  teacher: Teacher;
  type: string;
  xp: number;
  group_id: number;
  teacher_id: number;
}