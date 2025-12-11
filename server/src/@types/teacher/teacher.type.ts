import { Types } from "mongoose";

export type TSocialLinks = {
    github?: string,
    linkedin?: string,
    lattes?: string,
}

export type TTeacher = {
    _id?: string;
    avatarUrl: string;
    area: string;
    expertise: string[];
    groups?: Types.ObjectId[];
    user: Types.ObjectId;
    isVerified: boolean;
    bio?: string;
    verifiedAt?: Date;
    socialLinks?: TSocialLinks;
    createdAt?: Date;
}