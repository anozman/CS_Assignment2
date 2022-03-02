# CS_Assignment2
## Description
This program is the implementation of a basic REST API for a twitter JSON. This program will run basic GET, POST, PUT, and DELETE api calls

The program runs on a local host on port 3000
The program is run by starting inputing command
```bash
node express.js
```
From there the program will pull up the front end implemented in the 'index.html' file, where buttons and input fields are wired to the api calls

### GET

'/api/id'

- This gets the ID's of all the users within the Twitter JSON

'/api/tweetIds'

- This gets all the ID's of the tweets

- This was not a requirement for the assignment, however it was easy for implementation and it helped troubleshoot some other problems that I was working through

'/api/tweets'

- This got the all of the times and the text of all the tweets in the JSON
- Each of these fields are put within a temporary object

'/api/tweet/:id'

- This tets the tweet given an tweet ID

### POST

'/api/newTweet/:id/:text'

- This creates a tweet given an ID and a the text of a tweet

### PUT

'/api/change_username/:current_name/:screen_name'

- This updates the screen name of a user given a current username and a new username

### DELETE

'/api/delete/:id'

- This deletes a tweet from the JSON given an ID
