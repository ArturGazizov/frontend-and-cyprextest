# APItests
# frontend-and-cyprextest


localstorage has token to stay logged in
logged in user can add blogs
liking, viewing, seeing details of blog, deleting it by author is possible

PropTypes used

css classes used for testing, 
tests with all test names are in and in cypress/integration/examples and (for jest-dom) in src/components/blog.test.js
to test run
npm run cypress:open
npm run start:test


to run jest test type to package.json command
"test": "NODE_ENV=test jest --verbose --runInBand"
and use it



(folder tests from previous exercise)


do not run the eslint --init command. It will install the latest version of ESlint that is not compatible 

add to .env file

MONGODB_URI = 'mongodb+srv://LOGIN:PASSWORD@cluster0-wcm2d.gcp.mongodb.net/test?retryWrites=true&w=majority'
TEST_MONGODB_URI='mongodb+srv://LOGIN:PASSWORD@cluster0-wcm2d.gcp.mongodb.net/test?retryWrites=true&w=majority'
SECRET='ssasaa'
PORT=3001


npm install

npm run:start to run on background of running cyprex


npm test
