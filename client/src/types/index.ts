export interface IUser {
  id?: string;
  name: string;
  name_user: string;
  email: string;
  userId: string;
  role: string;
  biography: string;
  avatarUrl: string;
  followers: number;
  following: number;
  xp: number;
}

export type DialogType =
  | "createPost"
  | "editPost"
  | "editResponse"
  | "createComment"
  | "editComment"
  | "createGroup";

export interface IPost {
  id: string;
  title: string;
  content: string;
  author: IUser;
  likes: number;
  createdAt: string;
  liked: boolean;
  saved: boolean;
  tags: string[]
}


export interface IComment {
  id: string;
  author: IUser;
  likes: number;
  content: string;
  liked: boolean;
  createdAt: string;
}

export interface IResponsesComment {
  id: string;
  author: IUser;
  comment: string;
  content: string;
  createdAt: string;
}

export interface IStudent {
  id: string;
  name: string;
  email: string;
  role: string;
}

// Grupos
type Teacher = {
  departament: string;
  formation: string;
  user: IUser;
};

type Members = {
  id: string;
  name: string;
  email: string;
  bio: string;
  role: string;
  
};

export interface IGroup {
  _id: string;
  name: string;
  description: string;
  teacher_id: number;
  author: IUser;
  members: Members[];
}

type data = {
  xp: number
}

export interface IChallenge {
  id: string;
  title: string;
  description: string;
  author: IUser;
  type: string;
  data: data;
  group_id: string;
}

export interface INotification {
  _id: string;
  message: string;
  type: string;
  readAt: boolean;
  createdAt: string;
}