## README

This is a Node.js program, so that's required to execute.

In the ./app.js file, there are three example tests for the exponential backoff procedure. These are testing exponential backoff with a operation (procedure) that will always fail, an operation that will always succeed, and an operation that will suceed after one failure. In order to test these (which can only be done once at a time, unless you like a cluttered terminal), uncomment lines which call their tester procedures. E.g., if you want to test the always failing operation, line 45 should look like
```
failingOpTest();
```

To run,
```
$ node app.js
```
