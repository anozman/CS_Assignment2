const { json } = require('express');
const express = require('express');
const app = express();
let PORT = 3000;


//Required for the reading of the json file
const fs = require('fs');
const path = require('path');
app.use(express.json());

//Imports the raw data from the file favs.json and saves the data as a list of objects in the tweets object
let rawdata = fs.readFileSync(path.resolve(__dirname, 'favs.json'));
let tweets = JSON.parse(rawdata);


/**
 * This api request gets all of the ID's of the people who tweeted given the JSON file 
 * 
 * The function getIDs is a helper function that is used to help comb through the data and grab each of the ID's
 */
app.get('/api/id', (req, res) => {
    res.send(getIDs());
});
function getIDs()
{
    let ids = Array(tweets.length);
    for(let x = 0; x < tweets.length; x++)
        {
            ids[x] = tweets[x].user.id;
        }
    return ids;
}

/**
 * This api request gets all of the ID's of the tweets in the JSON file
 * This was not a formal part of the assignment, however it was conveinient for me to have when checking other API calls
 * 
 * The function getIDs is a helper function that is used to help comb through the data and grab each of the ID's
 */
 app.get('/api/tweetIds', (req, res) => {
    res.send(getTweetIDs());
});
function getTweetIDs()
{
    let tweetids = Array(tweets.length);
    for(let x = 0; x < tweets.length; x++)
        {
            tweetids[x] = tweets[x].id;
        }
    return tweetids;
}

/**
 * This api request gets all of the tweets, both the time sent and the tweet text
 * 
 * The helper function reads through the JSON file and pulls the data specified above
 */
app.get('/api/tweets', (req,res) => {
    res.send(getTweets());
});
function getTweets()
{
    let tweets_array = Array(tweets.length);
    let tweet_obj;
    for(let x = 0; x < tweets_array.length; x++)
    {
        tweet_obj = {
            time: tweets[x].created_at,
            text: tweets[x].text
        }
        tweets_array[x] = tweet_obj;
    }
    return tweets_array;
}

/**
 * This api request prints the details of a particular tweet given an id number
 */
app.get('/api/tweet/:id', (req,res) => {
    const id = Number(parseInt(req.params["id"]));
    for(let x = 0; x < tweets.length; x++)
    {
        if(tweets[x].id === id)
            res.send(tweets[x]);
    }
    res.send("This tweet does not exist");
});

/**
 * This api request cre ates a new tweet from a given id and text
 */
app.post('/api/newTweet/:id/:text', (req,res) => {
    let rawtweet = req.params;
    const tweet = {
        id: Number(parseInt(rawtweet['id'])),
        text: rawtweet['text']
    }
    tweets.push(tweet);
    res.send(tweet);
});

/**
 * This api request allows the user to update a screen name given:
 * The new screen name
 * Current user name
 */
app.get('/api/change_username/:current_name/:screen_name', (req, res) => {
    const tweet = tweets.find(c => c.user.screen_name === req.params.current_name);
    if(!tweet) res.status(404).send("This user does not exist");
    else {
        tweet.user.screen_name = req.params.screen_name;
        //tweets.put(tweet);
        res.send("Request successful");
    }
});

/**
 * This api request allows the user to delete a tweet given the id number of the tweet
 * 
 * The helper function finds the position of the selected tweet and sets that position of the JSON to null
 * Moves all the other objects up on the JSON and shortens the length by one
 */
app.get('/api/delete/:id', (req,res) => {
    const tweet = tweets.find(c => c.id === parseInt(req.params.id));
    if(!tweet) res.status(404).send("This tweet does not exist");
    else{
        let delete_success = delete_tweet(parseInt(req.params.id));
        if(delete_success === true)
            res.send("Successfully deleted the tweet");
        else
            res.send("Something went wrong, try again");
    }
});
function delete_tweet(tweet_id)
{
    for(let x = 0; x < tweets.length; x++)
    {
        if(tweets[x].id === tweet_id)
        {
            tweets[x] = null;
            //This is to move the elements up in the JSON, then shortens the JSON
            //This if statement has position < length-2 because length-1 would be the last element
            if(x < tweets.length-2)
            {
                for(let y = x; y < tweets.length-1; y++)
                {
                    tweets[y] = tweets[y+1];
                }
            }
            tweets.length -= 1;
            return true;
        }
    }
    return false;
}

/**
 * This sets the local Node server to the predefined port (3000)
 */
 app.listen(PORT, function(err){
     if (err) console.log(err);
     console.log("Server listening on PORT", PORT);
 });

 /**
 * This is the default for the website
 */
 app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
  });