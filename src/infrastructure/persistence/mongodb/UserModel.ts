import { model, Schema } from 'mongoose'
import validator from 'validator'

import response from '../../constants/response.js'

import type { HydratedDocument, InferSchemaType } from 'mongoose'

const { BAD_REQUEST } = response

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
      validate: {
        validator(value: string) {
          return validator.isStrongPassword(value)
        },
        message: BAD_REQUEST.text,
      },
    },
    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
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
