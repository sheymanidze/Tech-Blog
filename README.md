# Tech-Blog

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

## Table of contents
 * [General info](#General-Info)
 * [Specifics](#Specifics)
 * [Deployment of application](#Deployment-of-application)
 * [Application Code](#Application-Code)
 * [Screenshots](#Screenshots)
 * [Future Developments](#Future-Developments)


 # General Info
   Tech-Blog is an application that allows users to read, create, edit and delete posts, as well create comments under any existing post.

 # Specifics

   * Entering the application:
     * In order to proceed with application user has to login or register. 
     * For security purposes, the password must have a minimum of 6 and a maximum of 20 characters; the password must also conform to additional measures, such as the use of special and uppercase characters. 
 
   * Homepage:
     * Once user is successfully logedin, the option to logout will be shown in navigation bar
     * User is presenting with randomly selected 3 posts
     * There is an option on the bottom “View all post”
     * All posts contain title, content, username, who created it, and the date when the post was created
     * User can add comment or view all comments for each post
     * By clicking on the one post user will be presented with current post only, where “add comment” and all comments for the post will be available 

   * Dashboard:
     * User can view their own posts, if they exist. If user did not create any, an option “Create new post” will be presented
     * If user already has posts, option to “Edit” or “Delete” will be presented
     * All user’s posts arrange based on the date they were created (from the most recent) 

   * Create a New Post
     * User can create a post by clicking on “New Post” on navigation bar or while browsing the dashboard with no posts created
     * User has to write a title and a content in order to create the post
     * After submitting user will be relocated to dashboard, where “edit”, or “delete” the post options will be presented
     * All created posts will contain username and the date

   * Log Out
     * After user click on the logout button, entering page will be presented
     * User will be automatically signed out when idle on the page for more than 5 mins


 # Deployment of application

   To run a project, please follow the link 

   [Heroku](https://tech-blog-a.herokuapp.com/)



 # Application Code

   To view application code, please follow the link 

   [GitHub](https://github.com/sheymanidze/Tech-Blog)


 # Screenshots

   <img src="./public/img/enter.png" alt="Enter page" width = "500"/>

   ### Sign in page
   <img src="./public/img/login.png" alt="Enter page" width = "500"/>

   ### Sign up page
   <img src="./public/img/signup.png" alt="Enter page" width = "500"/>

   ### Home page with random 3 posts
   <img src="./public/img/random_3.png" alt="Enter page" width = "500"/>

   ### Home page with all posts, opened comments, add comment area
   <img src="./public/img/mix.png" alt="Enter page" width = "500"/>

   ### Single page
   <img src="./public/img/single.png" alt="Enter page" width = "500"/>

   ### Dashboard page when user has posts
   <img src="./public/img/dashboard.png" alt="Enter page" width = "500"/>

   ### Dashboard page for new user, with no posts
   <img src="./public/img/noposts.png" alt="Enter page" width = "500"/>

   ### Edit post page that belongs to logged in user
   <img src="./public/img/edit.png" alt="Enter page" width = "500"/>

   ### Create a post page
   <img src="./public/img/create.png" alt="Enter page" width = "500"/>


 # Future Developments

 * Forgot password. In case if user will forget the password, the application will be able to send an email for a registered user to update the password

 * Social Media sign in/sign up. It will be available for a user to make log in or register process easier

 * Delete comments. Dashboard will contain user’s comments and option to edit or delete them

 * Options to upload post related photos or videos will be added

 * Profile page will be added. Users will be able to update personal information, upload image for avatar, write description about themselves.