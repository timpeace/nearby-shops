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
- On your cmd/terminal console, run "mongod" command to start mongodb server:
```
mongod
```
![mongod](https://user-images.githubusercontent.com/22826923/40526292-1322f8ee-5fd5-11e8-81ce-92a14c5369b1.jpg)
<br/>
![mongod-2](https://user-images.githubusercontent.com/22826923/40526538-c2503d44-5fd6-11e8-84d7-af27f5d715ae.jpg)

- Open a new cmd/terminal console and execute the command below:
```
mongorestore --db shops path_to_the_extracted_shops_folder
```
![mongorestore](https://user-images.githubusercontent.com/22826923/40526296-1821217c-5fd5-11e8-8027-a568a16d4e56.jpg)
<br/>
![mongorestore-2](https://user-images.githubusercontent.com/22826923/40526541-c2d602bc-5fd6-11e8-86d1-55faea5f0dd2.jpg)

- To check if the shops database was successfully installed, execute:
```
mongo
```
![mongo](https://user-images.githubusercontent.com/22826923/40526540-c2aa5cc0-5fd6-11e8-9cab-743d02802aa9.jpg)
<br/>
![mongo-2](https://user-images.githubusercontent.com/22826923/40526539-c27d6350-5fd6-11e8-85fb-2dc3557d8ab5.jpg)

## Run the application
To launch this web application, you need to:
1. Import the "nearbyshops" project in Eclipse.
2. Make sure localhost server is started (wamp/xamp...).
3. Make sure mongodb server is started (with "**mongod**" command).
4. Run "MainNearbyShops.java" class as java application.
5. Go to http://localhost:8080

## Video Tutorial - How To Setup and Run

<a href="http://www.youtube.com/watch?feature=player_embedded&v=qsD8Fg0RQ70" target="_blank"><img src="https://user-images.githubusercontent.com/22826923/40578342-f864e980-6101-11e8-951d-9ebce8d8ef07.jpg" 
alt="IMAGE ALT TEXT HERE" width="720" height="540" border="10" /></a>

[![Video_Tutorial](https://user-images.githubusercontent.com/22826923/40578342-f864e980-6101-11e8-951d-9ebce8d8ef07.jpg)](http://www.youtube.com/watch?v=qsD8Fg0RQ70)
