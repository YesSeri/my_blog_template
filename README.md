# Express Blog Template

A blog template. I use it like a diary. Everything needed to have a text blog is here. 

When you go to posts you will have to login with an admin account, to post. Set the username and password in your .env file. 

## Deployment
### Environment Variables

To run this project, you will need to add the following environment variables to your .env file

```
BLOGUSER=username
PASSWORD=password
```

### Setup Server
Setup the needed node_modules and then run server like this.
```
yarn install 
yarn dev
```
Open `localhost:3000` and login with the username and password you choose in your .env file.



## Production
I use [pm2](https://pm2.keymetrics.io/) to run the server permanently. You can use a free Ec2 instance from AWS to host the blog online. 

I used this [guide](https://ourcodeworld.com/articles/read/977/how-to-deploy-a-node-js-application-on-aws-ec2-server) to learn how to deploy a nodejs project to EC2. 
## Tech Stack

- **Client:** [Simple.CSS](https://simplecss.org/), [Quill](https://simplecss.org/), [Google Fonts](https://fonts.google.com/)
- **Server:** [Node](https://nodejs.org/en/), [Express](https://expressjs.com/), [Sqlite](https://www.sqlite.org/index.html)

## Authors

- [@Henrik Zenkert](https://www.github.com/YesSeri)

