import mongoose, { model, Schema } from "mongoose";

mongoose.connect('mongodb+srv://admin:Pradoom%40321@cluster0.pu3wp.mongodb.net/second-brain');

const UserSchema = new Schema({
    username: {type: String, unique: true},
    password: String
});

export const UserModel = model('User', UserSchema);    // {schema, tableName} 

const ContentSchema = new Schema({
    types: String,
    link: String,
    title: String,
    tags: [{type: mongoose.Types.ObjectId, ref: 'Tag'}],
    userId: {type: mongoose.Types.ObjectId, ref: 'User', required: true}
});

export const ContentModel = model("Content", ContentSchema);

const LinkSchema = new Schema({
    hash: String,
    userId: {type: mongoose.Types.ObjectId, ref: 'User', required: true, unique: true}
});

export const LinkModel = model("Links", LinkSchema);