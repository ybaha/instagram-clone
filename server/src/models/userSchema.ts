import { createSchema, ExtractDoc, Type, typedModel } from "ts-mongoose";

const UserSchema = createSchema({
  user_id: Type.string({ required: true, unique: true }),
  username: Type.string({ required: true, unique: true }),
  real_name: Type.string(),
  website: Type.string(),
  bio: Type.string(),
  email: Type.string({ required: true, unique: true }),
  following: [
    {
      user_id: Type.string({ required: true, unique: true }),
      username: Type.string({ required: true }),
    },
  ],
  posts: [{ post_id: Type.string({ required: true, unique: true }) }],
});

export const User = typedModel("User", UserSchema);
export type UserDoc = ExtractDoc<typeof UserSchema>;
