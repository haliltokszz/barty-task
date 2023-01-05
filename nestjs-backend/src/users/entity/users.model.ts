/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

export type UserDocument = mongoose.HydratedDocument<User>;

@Schema()
export class User {
  _id: mongoose.Types.ObjectId; // ObjectId or Unique Id
  @Prop({ required: true })
  username: string;
  @Exclude()
  @Prop({ required: true })
  password: string;
  @Prop()
  name: string;
  @Prop()
  surname: string;
  @Prop()
  age: number;
  @Prop()
  bornAt: Date; // Birthday
  location: {
    type: {
      type: string;
      enum: ['Point'];
    };
    coordinates: {
      type: [number];
      required: true;
    };
  };
  @Prop()
  about: string;
  @Prop()
  image: string; //Profile Image
  @Prop()
  email: string;
  @Prop()
  balance: number; // Represents user’s deposited money in the system
  @Prop()
  phoneNumber: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({ location: '2dsphere' });

UserSchema.pre('save', function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});
