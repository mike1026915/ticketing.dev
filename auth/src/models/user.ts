import mongoose from "mongoose";
import { Password } from '../utility/password';

// An interface that describes the properties
// that are required to create a new User
interface UserAttrs {
    email: string;
    password: string;
}

// An interface that describes the properties
// that a User Model has
interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc;
}

// An interface that describes the properties
// that a User Document has
interface UserDoc extends mongoose.Document {
    email: string;
    password: string,
}

const userSchema = new mongoose.Schema({
    email: {
        type: String, // JS's String type. In TS, string type is :string, lower case string
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
})

userSchema.pre('save', async function(done) { // middleware using function keyword to define function to get the handling context instead of current context
    if (this.isModified('password')) {
        const hashed = await Password.toHash(this.get('password'));
        this.set('password', hashed)
    }

    done();
})

userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs);
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User }