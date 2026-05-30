import { model, Schema, Types } from 'mongoose'

import type { HydratedDocument, InferSchemaType } from 'mongoose'

const userSchema = new Schema(
  {
    _id: {
      type: Types.ObjectId,
      required: true,
    },
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
    _id: false,
    timestamps: true,
  },
)

type TDbUser = InferSchemaType<typeof userSchema>

export type TUserDocument = HydratedDocument<TDbUser>

type TDbSafeUser = Omit<TDbUser, 'password'>

export type TSafeUserDocument = HydratedDocument<TDbSafeUser>

const UserModel = model<TUserDocument>('User', userSchema)

export type TUserModel = typeof UserModel

export default UserModel
