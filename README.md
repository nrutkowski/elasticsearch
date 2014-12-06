elasticsearch
=============

This is an Elasticsearch tutorial written in Node JS.

In this tutorial cron retrieves tweets from a user timeline and saves them in elasticsearch. A user can search these documents by keyword.

### Intall Elasticsearch
[Download](http://www.elasticsearch.org/overview/elkdownloads/) Elasticsearch to your computer/server.

In a terminal window, `cd` to the elasticsearch directory.

Run `./bin/elasticsearch` to start the elasticsearch instance on port 9200

### Run The App

In another terminal window, `cd` to the project directory

Run `npm install` to install all dependencies

Once complete, run `node app`

If no errors are present, navigate to `http://localhost:3000` to begin your search!

### Screenshot of Results
![screenshot](public/screenshots/screenshot_results.png?raw=true)
