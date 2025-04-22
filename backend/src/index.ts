import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { ContentModel, LinkModel, UserModel } from './db';
import bcrypt from 'bcrypt';
import { userMiddleware } from './middleware';
import { random } from './utils';
const JWT_SECRET = "jaishreeram";
import cors from 'cors';


const app = express();
app.use(express.json());
app.use(cors());

app.post('/api/v1/signup', async (req, res) => {
    // ZOD validation, hash password, try catch error if same username exists
    
    try {
        const { username, password } = req.body;

        const existingUser = await UserModel.findOne({ username });
        if (existingUser) {
            res.status(400).json({ message: "User already exists" });
        }
        else {
            const hashedPassword = await bcrypt.hash(password, 10);

            await UserModel.create({
                username,
                password: hashedPassword
            });

            res.json({
                message: "Sign up successful"
            });
        }
    } catch (e) {
        res.status(500).json({ message: (e as Error).message });
    }
});

app.post('/api/v1/signin', async (req, res) => {
    // ZOD validation, hash password, try catch error if same username exists

    try {
        const { username, password } = req.body;
        const user = await UserModel.findOne({ username });

        if(user) {
            const isMatch = await bcrypt.compare(password, user.password as string);
            if (!isMatch) {
                res.status(400).json({ message: "Invalid credentials" });
            }
            else {
                const token = jwt.sign({ id: user._id }, JWT_SECRET);

                res.status(200).json({ token:token, id:user._id });
            }
        }
        else {
            res.status(403).json({
                message: 'Incorrect credentials'
            })
        }
    } catch (error) {
        res.status(500).json({ message: "Error signing in", error });
    }
});

app.post('/api/v1/content', userMiddleware, async (req, res) => {
    const types = req.body.types;
    const link = req.body.link;
    const title = req.body.title;

    await ContentModel.create({
        types,
        link,
        title,
        tags: [],
        // @ts-ignore
        userId: req.userId
    })

    res.json({
        message: "content added succesfully"
    })
});

app.get('/api/v1/content', userMiddleware, async (req, res) => {
    // @ts-ignore
    const userId = req.userId;

    const Content = await ContentModel.find({
        userId: userId,
    }).populate("userId", "username");

    console.log(Content);
    
    res.json({
        Content
    })
});

app.get('/api/v1/content/title', userMiddleware, async (req, res) => {
    // @ts-ignore
    const userId = req.userId;
    const searchValue = req.query.searchValue;

    const Content = await ContentModel.find({
        userId: userId,
        title: {
            $regex: searchValue
        }
    }).populate("userId", "username");

    res.json({
        Content
    })
});

app.delete('/api/v1/content', userMiddleware, async (req, res) => {
    const contentId = req.body.contentId

    await ContentModel.deleteMany({
        contentId,
        //@ts-ignore
        userId: req.userId
    })
    
    res.json({
        message: "content removed"
    })
});

app.post('/api/v1/brain/share', userMiddleware, async (req, res) => {
    const { share } = req.body;

    if(share) {

        const existingLink = await LinkModel.findOne({
            //@ts-ignore
            userId: req.userId
        });

        if(existingLink) {
            res.json({
                message: existingLink.hash
            })
            return;
        }

        const hash = random(10);
        await LinkModel.create({
            hash: hash,
            //@ts-ignore
            userId: req.userId
        })

        res.json({
            message: hash
        })
    }
    else {
        await LinkModel.deleteMany({
            //@ts-ignore
            userId: req.userId
        })

        res.json({
            message: "removed link"
        })
    }
});

app.get('/api/v1/brain/:shareLink', async (req, res) => {
    const hash = req.params.shareLink;

    const link = await LinkModel.findOne({
        hash
    });

    if(!link) {
        res.status(404).json({
            message: "Link not found"
        })
        return;
    }

    const content = await ContentModel.find({
        userId: link.userId
    });

    const user = await UserModel.findById({
        _id: link.userId
    });

    if(!user) {
        res.status(404).json({
            message: "User not found"
        })
        return;
    }

    res.json({
        username: user?.username,
        content: content
    })
});

app.listen(3000);