const { MongoClient, ObjectId } = require('mongodb');
const moment = require('moment');

const mongoUrl =
  'mongodb://root:localhost@localhost:27017/?authMechanism=DEFAULT'; // Update with your MongoDB URL
const numPosts = 10000; // Specify the number of posts you want to create

async function createPosts(authors) {
  if (!authors.length) {
    return;
  }

  const client = new MongoClient(mongoUrl, { useUnifiedTopology: true });

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db('imagegram');
    const postsCollection = db.collection('posts'); // Replace 'posts' with your collection name
    await postsCollection.createIndex(
      { rank: -1, createdAt: -1 },
      { name: 'indexName' },
    );

    const posts = [];

    const currentDateTime = moment();

    for (let i = 0; i < numPosts; i++) {
      const time = currentDateTime.clone().add(i, 'minutes').toDate();

      posts.push({
        title: `Post Title ${100000 + i + 1}`,
        caption: `Post Caption ${100000 + i + 1}`,
        author: new ObjectId(
          authors[Math.floor(Math.random() * authors.length)],
        ),
        comments: [], // Add comments if needed
        createdAt: time,
        updatedAt: time,
      });
    }

    const result = await postsCollection.insertMany(posts);
    console.log('result', result);
    console.log(`Created ${result.insertedCount} posts`);
  } catch (error) {
    console.error('Error creating posts:', error);
  } finally {
    client.close();
    console.log('Disconnected from MongoDB');
  }
}

const authors = ['651d76fe41a9ef6f08b37fac', '651d7968a864519e9d262396'];

createPosts(authors);
