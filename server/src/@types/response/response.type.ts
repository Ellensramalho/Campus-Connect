import { Types } from "mongoose";

export type TResponse = {
    _id?: string;
    author: Types.ObjectId | string;
    comment: Types.ObjectId;
    content: string;
    likes?: Types.ObjectId[];
    createdAt?: Date;
}