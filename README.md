# Northcoders News API

1. Run npm install: to get started, please run 'npm install' command to install the required packages.

2. Set up environment variables:
In order to run the project the environment variables must be set.
The developer must create .env.development and .env.test files to the project's main folder. the files must contain the environment variable PGDATABASE in the format - PGDATABASE=<db_name> with the curresponding database names. 

The dev and test db names are nc_news and nc_news_test respectively. Therefore a .env.test file should be created containing PGDATABASE=nc_news_test. Similarly, .env.development file should be created containing PGDATABASE=nc_news.

3: Setup data base: Run 'npm run setup-dbs' command to run the script that creates the test and development databases.


Run the following commands

1. npm run seed

2. npm install -D supertest

3. npm i express

4. npm i jest-sorted. 
Also add the following in the package.json file.
"jest": {
  "setupFilesAfterEnv": ["jest-sorted"]
}