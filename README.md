# Imagegram Backend with NestJS

Imagegram is a backend application built with NestJS that allows users to upload images, create posts with captions, comment on posts, and manage comments. This project also includes Docker Compose configurations for setting up a development environment.

### Links

- Deployed backend is avaiable at: http://52.90.184.247:3003
- Swagger Documentation: http://52.90.184.247:3003/api
- Explanation Document: https://docs.google.com/document/d/1Tn8DoSeAjCijWeyrcvrlBJetMCJKeRJzcwZtjnzdi6E/edit?usp=sharing
- Demo Videos: https://www.youtube.com/watch?v=4KlEFihQJhY&list=PL3K0sg_g_SL4ygYQV-3Yafdy31ps4xp1Z

## Requirements

- Node.js
- Docker
- Docker Compose
- AWS

# AWS Architecture

The Imagegram backend project incorporates various AWS services to enhance its functionality and scalability. Below are the key components of the AWS architecture:

* **S3 Buckets:**
  * Two S3 buckets are used for storing and managing assets and files, ensuring efficient storage and retrieval.
* **Lambda Function - imagegram-post-image-converter:**
  * A Lambda function named "imagegram-post-image-converter" is implemented with a specific role. This function likely handles image conversion or related tasks.
* **EC2 Instance (t2.micro):**
  * The backend application and MongoDB are deployed on an Amazon Elastic Compute Cloud (EC2) instance. The choice of a t2.micro instance suggests a flexible and cost-effective approach.
* **IAM User, Role, User Group, and Custom Policies:**
  * AWS Identity and Access Management (IAM) resources, including an IAM user, role, user group, and custom policies, are created and configured to manage AWS resources securely. This ensures that the project follows AWS best practices for access control and resource management.

## Docker Compose Configuration

The `docker-compose.yml` file includes configurations for Docker containers, including MongoDB, which is used as the database for the Imagegram application.

## Getting Started

Follow these steps to set up and run the application:

1. Clone the repository from GitHub:

   ```bash
   git clone https://github.com/mafzalashraf4044/image-gram-nestjs-backend.git
   ```
2. Navigate to the project directory:

   ```bash
   cd image-gram-nestjs-backend
   ```
3. Build and start the Docker containers using Docker Compose:

   ```bash
   docker-compose up --build
   ```
4. The application will be accessible at [http://localhost:3003](http://localhost:3003/).

## API Endpoints

Swagger API documentation is available at [http://localhost:3003/api](http://localhost:3003/api).

## Contributing

If you would like to contribute to this project or report issues, please visit the GitHub repository at [https://github.com/mafzalashraf4044/image-gram-nestjs-backend](https://github.com/mafzalashraf4044/image-gram-nestjs-backend).
