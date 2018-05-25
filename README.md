# Nearby Shops

This mini project is a solution for [this web coding challenge](https://github.com/hiddenfounders/web-internship-cc).
<br/>
<br/>Developed on Eclipse (IDE) with Java/Spring Boot (Back-end) and AngularJs (front-end).

## Concept
Web application that allows users to see the list of nearby shops, as well as to keep track of their favorite ones.

## Features
- As a User, I can sign up using my email & password.
- As a User, I can sign in using my email & password.
- As a User, I can display the list of shops sorted by distance.
- As a User, I can like a shop, so it can be added to my preferred shops.
- Acceptance criteria: liked shops shouldn’t be displayed on the main page.
- [Optional] As a User, I can dislike a shop, so it won’t be displayed within “Nearby Shops” list during the next 2 hours.
- [Optional] As a User, I can display the list of preferred shops.
- [Optional] As a User, I can remove a shop from my preferred shops list.


## Mockups
![mainpage](https://user-images.githubusercontent.com/22826923/40513579-be12fb2c-5f95-11e8-8ac5-520e42e1f159.png)

![preferredshops](https://user-images.githubusercontent.com/22826923/40513600-ce7f0d70-5f95-11e8-95b9-33c7f8ad77a8.png)

## Requirements on your machine
- MongoDB must be installed.
- Wamp or Xampp to run localhost.
- Eclipse IDE.

## Setup the Database
- To try this application on your localhost, you need first to install [this MongoDB dump shops database](https://github.com/timpeace/nearby-shops/raw/master/shops.zip) that contains more than 300 shops, every shop entity contains: **name, picture, city, email, location**.
- To import this database, you need to extract the "**shops.zip**" file that you downloaded.
<br/>Just to make sure, the exctracted folder named "**shops**" must contains 2 files: **shops.bson** and **shops.metadata.json**.
- On your cmd/terminal console, run "mongod" command to start mongodb connections:
```
mongod
```
![mongod](https://user-images.githubusercontent.com/22826923/40526292-1322f8ee-5fd5-11e8-81ce-92a14c5369b1.jpg)

- Open a new cmd/terminal console and execute the command below:
```
mongorestore --db shops path_to_the_extracted_shops_folder
```
![mongorestore](https://user-images.githubusercontent.com/22826923/40526296-1821217c-5fd5-11e8-8027-a568a16d4e56.jpg)```

## Run the application
To launch this web application, you need to:
1. Import the "nearbyshops" project in Eclipse.
2. Make sue your localhost server (wamp/xamp...) is started.
3. On cmd/terminal console, run "**mongod**" command to start mongodb connections.
4. Run "MainNearbyShops.java" class as java application.
5. Go to http://localhost:8080
