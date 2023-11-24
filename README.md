# Northcoders News API

Link to the hosted API: https://aditya-nc-news.onrender.com
(try adding endpoints such as '/api' , '/api/articles' etc at the end of the URL to see the functionality)

Summary:
This project is a back-end application that manages news articles, the topics involved, comments as well as users. It has been built using Node.js and utilizes a PostgreSQL (PSQL) database. The features available include retrieving the existing data, adding additional data, updating records and deleting certain records. The API built includes distinct endpoints that helps to use these features. 

Instructions
1. Cloning the repository
Use the following command to clone the public repository:
git clone https://github.com/abkc727/aditya-nc-news.git

2. Installing the dependencies
  a. Run 'npm install' command to install the required packages. Now run the following.
  b. Run 'npm run setup-dbs' to create the test and development databases.
  c. Run 'npm run seed' to seed the database.     
  d. npm install -D supertest    
  e. npm i express    
  f. npm i jest-sorted

3. Add the following in the package.json file.
"jest": {
  "setupFilesAfterEnv": ["jest-sorted"]
}

4. Setting up environment variables:
In order to run the project the environment variables must be set.
The developer must create .env.development and .env.test files to the project's main folder. the files must contain the environment variable PGDATABASE in the format - PGDATABASE=<db_name> with the curresponding database names. 

The dev and test db names are nc_news and nc_news_test respectively. Therefore a .env.test file should be created containing PGDATABASE=nc_news_test. Similarly, .env.development file should be created containing PGDATABASE=nc_news.

5. Running the tests

Run 'npm t app.test.js' to run the integration test file. This will run tests for each of the endpoints.

6. Additional Information
  a. Minimum Versions
    Node.js: v20.8.1
    Postgres: 14.9

