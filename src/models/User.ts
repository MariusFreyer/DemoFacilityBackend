import * as bcrypt from 'bcrypt';
import { model, Schema } from 'mongoose';
import { ObjectID } from 'mongodb';

export interface IUser extends Document {
    _id: ObjectID;
    username: string;
    email: string;
    password: string;
    role: string;
    createdAt: Date;
}

export const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        index: { unique: true },
    },
    email: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: ['user', 'supporter', 'admin'],
        default: 'user',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
},
    {
        toObject: {
            transform: (doc, ret, options) => {
                delete ret.password;
                return ret;
            },
        },
        toJSON: {
            transform: (doc, ret, options) => {
                delete ret.password;
                return ret;
            },
        },
    });

UserSchema.pre('save', function(next) {

    const user = this;

    bcrypt.hash(user.get('password'), +process.env.BCRYPT_SALT_ROUNDS, (err, hash) => {
        user.set('password', hash);
        next();
    });
});

export const User = model('User', UserSchema);
