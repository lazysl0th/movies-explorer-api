import { model, Schema } from 'mongoose'

import type { HydratedDocument, InferSchemaType } from 'mongoose'

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

type TUser = InferSchemaType<typeof userSchema>

type TUserDocument = HydratedDocument<TUser>

const UserModel = model<TUserDocument>('User', userSchema)

export type TUserModel = typeof UserModel

export default UserModel
