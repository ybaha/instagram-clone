import { createSchema, ExtractDoc, Type, typedModel } from "ts-mongoose";

const UserSchema = createSchema({
  uid: Type.string({ required: true, unique: true }),
  username: Type.string({ required: true, unique: true }),
  profile_picture: Type.string(),
  real_name: Type.string(),
  website: Type.string(),
  bio: Type.string(),
  email: Type.string({ required: true, unique: true }),
  following: Type.array().of({
    uid: Type.string({ required: true, unique: true }),
    username: Type.string({ required: true }),
  }),
  posts: Type.array({ default: [] }).of({
    post_id: Type.string({ required: true, unique: true }),
  }),
});

export const User = typedModel("User", UserSchema);
export type UserDoc = ExtractDoc<typeof UserSchema>;
