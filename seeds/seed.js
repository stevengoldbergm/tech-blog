// Define seeds
const seedUsers = require("./user-seeds.json");
const seedPosts = require("./post-seeds.json");
const seedComments = require("./comment-seeds.json")

// Connect to sequelize through connections
const sequelize = require("../config/connection");
const { User, Post } = require('../models')

const seedDatabase = async () => {
    await sequelize.sync({force: true})

    const users = await User.bulkCreate(seedUsers, {
        individualHooks: true,
        returning: true,
    });

    for (const post of seedPosts) {
        await Post.create({
            ...post,
            user_id: users[Math.floor(Math.random() * users.length)].id,
        });
    };

    for (const comment of seedComments) {
        await Comment.create({
            ...comment,
            user_id: users[Math.floor(Math.random() * users.length)].id,
            post_id: posts[Math.floor(Math.random() * users.length)].id,
        });
    };

    console.log('\n----- DATABASE SYNCED -----\n');
    process.exit(0)
}

seedDatabase();