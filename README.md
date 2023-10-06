# Imagegram Backend with NestJS

Imagegram is a backend application built with NestJS that allows users to upload images, create posts with captions, comment on posts, and manage comments. This project also includes Docker Compose configurations for setting up a development environment.

## Requirements

- Node.js
- Docker
- Docker Compose
- AWS

## Getting Started

Follow these steps to set up and run the application:

1. Clone the repository from GitHub:

   ```bash
   git clone https://github.com/mafzalashraf4044/imagegram-backend.git
   ```
2. Navigate to the project directory:

   ```bash
   cd imagegram-backend
   ```
3. Build and start the Docker containers using Docker Compose:

   ```bash
   docker-compose up --build
   ```
4. The application will be accessible at [http://localhost:3003](http://localhost:3003/).

## Docker Compose Configuration

The `docker-compose.yml` file includes configurations for Docker containers, including MongoDB, which is used as the database for the Imagegram application.

## Technologies Used

- Backend: NestJS
- Database: MongoDB
- Cloud: AWS

## API Endpoints

Swagger API documentation is available at [http://localhost:3003](http://localhost:3003/)/api.

## Contributing

If you would like to contribute to this project or report issues, please visit the GitHub repository at [https://github.com/mafzalashraf4044/imagegram](https://github.com/mafzalashraf4044/imagegram).

## Task Details

This project was completed for an interview assessment by Bandlab. The task included building an "Imagegram" system that allows users to upload images, create posts with captions, comment on posts, and more. The project utilized MongoDB as the database and NestJS for the backend. The task requirements and details are outlined in the initial project description.

This is the backend for a simple email sending application built with NestJS, Kafka, and MySQL. It allows you to trigger email sending jobs and monitor their progress in near real-time.


### Project Folder Architecture:

- The folder architecture of this project is modular & reusable to make it scalable
- All common entities that are reusable reside in the common folder:
  - constants
  - database -> model
  - errors
  - filters
  - interfaces
  - services
  - utils
  - validators
- I have created a customized config module with envorinement variable validation.
- The core logic of the application is splitted in different modules. Each module contains all the relevant files needed for the specific feature. e.g post module has the following files/folders:
  - dto => Data Type Object (for validation of incoming requests)
  - interfaces => interfaces related to this module
  - post.controller.ts => controller file, here routes related to post are defined
  - post.service.ts => business logic related to posts
  - post.schema.ts => mongoose schema file for post collection
  - post.model.ts => database model file for post collection, this is extending the base model file.
  - post.errors.ts => errors related to posts
  - posts.utils.ts => util functions related to posts.

### Database Selection:

- I have decided to use MongoDB for this project b/c horizontal scaling will be needed.
- As we can see in the usage forcast section, 100k new comments per 1h. It means around 72000000 comments per month.
- Although relational database can handle this amount of load but MongoDB is more fesiable as it comes with built in support for sharding and horizonal scaling.
- DynammoDB was also one of my consideration, but I was not much fimilar with it.

### Image compression:

- I have used an async approach for converting the image associated with a post to the required format and dimensions.
- I have two s3 buckets:
  - imagegram-post-images
  - imagegram-post-original-images
- I have used two different buckets here to mitigate the risk of recursive calls to the lambda function. Although this can be ignore using a single bucket as well, but i wanted to make it simple for now.
- Both of these buckets are not publically accessible. imagegram-post-images is accessible via Cloudfront, whereas imagegram-post-original-images is only used for create operations. It is also workign as a trigger for the lambda function.
- I am saving the image provided by the user in create post request to bucket => imagegram-post-original-images
- I am using async approach with AWS lambda functions to convert this image to required dimensions and format.

#### Lambda function:



### Cursor Based Pagination:

- As we know the target was to sort the posts by number of comments in descending order.
- Here i have used rank (number of comments) and createdAt field of post collection as a cursor. I am sorting the posts in desc order using rank and createdAt fields.
- I have also created a compound index in post collection:
  - rank: -1
  - createdAt: -1
- Without indexing the latency of the endpoint for fetching 20 records was between 40-80 ms
- After indexing the latency was improved by x%, now it is between 20-30 ms.
- I am using encryption to convert the value of cursor to a string.


### Sort Posts By Number of Comments in Desc Order:

- This was one of the tricky problem in this task.
- Initially i did some RnD using PgSQL. I was thinking to create a join of comments with post table. I was getting all comments related to the post and after this i was counting the number of comments. I was sorting the posts after this.
- It was taking alot of time.
- I tried two approaches to optimize it:
  - created index in comment table for postId.
    - It was still not optimized the, the query was taking 40-60 seconds with 100000 posts and 5000000 comments.
  - create a materialized view (sorted by num of comments) having post details along with number of comments.
    - the view needs to be refreshed if a comment is added or deleted, this was taking a lot of time.
- While implementing the mongodb schema as a solution I came up with an approach where i am saving the number of comments in post table along with comment refs. I have named this field as 'rank'.
- The only downside of this approach is the tradeoff in create comment operation. We need to update the post collection whenever there is a new comment or if a comment is deleted. But this is acceptable.
- There can be some issues with this approach as well, e.g if multiple user are commenting on the same post, creating a new comment will take a bit more than expected b/c post document will be locked in this case. this can be optimized using sharding and horizontal scaling.


### TODO to make the applicaiton production ready:

The application is almost production ready, but we need to improve some aspects of the application to make sure it is durable and scalable to handle production load.

- Enable horizontal database scaling i.e sharding with MongoDB.
- Use AWS Secret Manager to store secrets.
- More security precautions to mitigate the risk of an attack
  - Add appropriate security headers using helmet.
- Database transactions.
- Http logging.
- JWT Refresh token functionality.




# Project Completion Document

## Project Overview

I have successfully completed the "Imagegram" project, a backend system that allows users to upload images and comment on them through a RESTful Web API. The project includes features such as image uploading, adding text captions to posts, commenting on posts, deleting comments, and retrieving posts with the last 2 comments. The project's primary goal was to demonstrate my strengths and skills as a Backend Developer, focusing on good design and clean implementation.

## Project Folder Architecture

The project's folder architecture was designed with modularity and reusability in mind to ensure scalability. Key components of the architecture include:

- **Common Folder**: Contains reusable entities like constants, database models, error handling, filters, interfaces, services, utilities, and validators.
- **Customized Config Module**: Includes environment variable validation for configuration settings.
- **Module-Based Structure**: Core logic is organized into separate modules. For example, the post module consists of DTOs (Data Type Objects), interfaces, controller, service, schema, model, error handling, and utility functions, each dedicated to the specific feature of posts.

## Database Selection

I opted to use MongoDB as the database for this project due to its suitability for horizontal scaling. The usage forecast, with 100k new comments per hour, necessitates a database capable of handling high loads. MongoDB provides built-in support for sharding and horizontal scaling, making it a robust choice for this scenario. While DynamoDB was considered, my familiarity with MongoDB made it the preferred choice.

## Image Compression

Image handling is a crucial part of the project. I implemented an asynchronous approach for image conversion and storage, utilizing AWS Lambda functions and two S3 buckets: "imagegram-post-images" and "imagegram-post-original-images."

- The original image is saved in the "imagegram-post-original-images" bucket.
- AWS Lambda functions are used to convert the original image to the required format and dimensions, storing the result in the "imagegram-post-images" bucket.
- This approach prevents recursive calls to Lambda functions and ensures efficient image processing.

## Cursor-Based Pagination

To achieve the goal of sorting posts by the number of comments in descending order, I employed cursor-based pagination.

- Posts are sorted using a combination of the "rank" (number of comments) and "createdAt" fields.
- A compound index was created in the post collection to optimize sorting.
- Encryption is applied to convert the cursor value to a string for secure pagination.

## Sort Posts By Number of Comments in Desc Order

Sorting posts by the number of comments presented a challenge. I initially explored PostgreSQL for its JOIN capabilities but found performance issues. Two optimization attempts were made:

1. Index creation on the comment table for the "postId" field, but it still resulted in slow query performance.
2. A materialized view was considered but proved challenging due to refresh requirements.

Ultimately, I implemented a MongoDB schema where the "rank" field is used to store the number of comments for each post, along with comment references. While this approach requires updating the post collection when comments are added or deleted, it significantly improves the query performance.

## TODO for Production Readiness

The application is nearly production-ready but requires some enhancements:

- **Enable Horizontal Database Scaling**: Implement MongoDB sharding for horizontal scaling.
- **Use AWS Secret Manager**: Store sensitive information securely.
- **Security Precautions**: Enhance security with appropriate headers using Helmet, implement database transactions, enable HTTP logging, and add JWT Refresh token functionality.

This project serves as a demonstration of my skills as a Backend Developer, showcasing clean and efficient coding practices, modular architecture, and thoughtful design decisions. It aligns with the specified interview task, and I am ready to discuss any questions or further improvements.
