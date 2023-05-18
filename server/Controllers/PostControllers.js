var Post = require('../Models/Post');
var Client = require('../Models/User');



exports.findOne = async (req, res, next) => {
    try {
        const id = req.params.id;
        const post = await Post.findById(id)

        if (!post) {
            res.status(404).json('Airport not found');
        } else {
            res.status(200).json(post);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.find = (req, res) => {
    if (req.query.id) {
        const id = req.query.id;
        Post.findById(id)

            .then(data => {
                if (!data) {
                    res.status(404).send({ message: "Not found project with id " + id })
                } else {
                    res.send(data)
                }
            })
            .catch(err => {
                res.status(500).send({ message: "Erro retrieving client with id " + id })
            })

    } else {
        Post.find()

            .then(project => {
                res.send(project)
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Error Occurred while retriving client information" })
            })
    }
}
exports.create = async (req, res) => {
    try {
        const client = await Client.findById(req.body.User);
        if (!client) {
            res.status(404).json('client not found');
        }
        const newPost = new Post({
            Title: req.body.Title,
            Description: req.body.Description,
            image:req.body.image,
            User: req.body.User,
        })
        const savedPost = await newPost.save();
        client.Posts.push(savedPost);
        const savedClient = await client.save();
        res.status(200).json(client);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.update = (req, res) => {
    if (!req.body) {
        return res
            .status(400)
            .send({ message: "Data to update can not be empty" })
    }

    const id = req.params.id;
    Post.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot Update Post with ${id}. Maybe client not found!` })
            } else {
                res.send(data)
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error Update client information" })
        })
}
exports.delete = (req, res) => {
    const id = req.params.id;

    Post.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot Delete with id ${id}. Maybe id is wrong` })
            } else {
                res.send({
                    message: "Post was deleted successfully!"
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Client with id=" + id
            });
        });
}




exports.likePost = async (req, res) => {
    const id = req.params.id;
    const { userId } = req.body;
    try {
        const post = await Post.findById(id);
        if (post.likes.includes(userId)) {
            await post.updateOne({ $pull: { likes: userId } });
            res.status(200).json("Post disliked");
        } else {
            await post.updateOne({ $push: { likes: userId } });
            res.status(200).json("Post liked");
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*exports.randomize = async (req, res) => {
    const userPost = req.params.userPost;

    const loggedPost = await Post.findById(userPost);

    const Posts = await Post.find({
        $and: [
            { _id: { $ne: userPost } },
            { _id: { $nin: loggedPost.likes } },
            { _id: { $nin: loggedPost.dislikes } },
        ],
    });

    return res.json(Posts);
}*/