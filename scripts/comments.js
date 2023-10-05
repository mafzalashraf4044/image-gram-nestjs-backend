const { MongoClient, ObjectId } = require('mongodb');
const posts = require('./imagegram.posts.json');
const moment = require('moment');

// const posts = [
//   {
//     _id: { $oid: '651da7e3c899d762314068ac' },
//     title: 'Post Title 1',
//     caption: 'Post Caption 1',
//     author: { $oid: '651d7968a864519e9d262396' },
//     comments: [],
//   },
// ];

const mongoUrl =
  'mongodb://root:localhost@localhost:27017/?authMechanism=DEFAULT'; // Update with your MongoDB URL

async function createComments(authors) {
  if (!authors.length) {
    return;
  }

  const client = new MongoClient(mongoUrl, { useUnifiedTopology: true });

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db('imagegram');
    const commentsCollection = db.collection('comments'); // Replace 'posts' with your collection name
    const postsCollection = db.collection('posts'); // Replace 'posts' with your collection name

    for (let j = 0; j < posts.length; j++) {
      const postId = posts[j]._id.$oid;

      const comments = [];
      const numComments = 1 + Math.floor(Math.random() * 50);
      const currentDateTime = moment();

      for (let i = 0; i < numComments; i++) {
        const time = currentDateTime.clone().add(i, 'minutes').toDate();

        comments.push({
          content: `Comment Content ${i + 1}`,
          author: new ObjectId(
            authors[Math.floor(Math.random() * authors.length)],
          ),
          post: new ObjectId(postId),
          createdAt: time,
          updatedAt: time,
        });
      }

      const resultComment = await commentsCollection.insertMany(comments);
      console.log(`Created ${resultComment.insertedCount} comments`);

      const filter = { _id: new ObjectId(postId) }; // Specify the filter criteria (e.g., document with _id equal to 1)
      const update = {
        $set: {
          comments: Object.values(resultComment.insertedIds),
          rank: resultComment.insertedCount,
        },
      };
      const resultPost = await postsCollection.updateOne(filter, update);
      console.log(
        `Updated ${resultPost.modifiedCount} posts, index: ${j} id: ${postId} `,
      );
    }
  } catch (error) {
    console.error('Error creating commnets:', error);
  } finally {
    client.close();
    console.log('Disconnected from MongoDB');
  }
}

const authors = ['651d76fe41a9ef6f08b37fac', '651d7968a864519e9d262396'];

createComments(authors);
