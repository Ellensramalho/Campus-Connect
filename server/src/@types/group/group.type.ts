import { Types } from "mongoose";

export type TGroup = {
    _id?: string;
    author: Types.ObjectId;
    name: string;
    description: string;
    members?: Types.ObjectId[];
    createdAt?: Date;
}