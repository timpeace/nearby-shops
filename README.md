# Nearby Shops

This is a solution for [this web coding challenge](https://github.com/hiddenfounders/web-internship-cc).

This is a mini project developed with Java/Spring Boot (Back-end) and AngularJs (front-end).

## Concept
web application that allows users to see the list of nearby shops, as well as to keep track of their favorite ones.

## Features
- As a User, I can sign up using my email & password.
- As a User, I can sign in using my email & password.
- As a User, I can display the list of shops sorted by distance.
- As a User, I can like a shop, so it can be added to my preferred shops.
- Acceptance criteria: liked shops shouldn’t be displayed on the main page.
- [Optional] As a User, I can dislike a shop, so it won’t be displayed within “Nearby Shops” list during the next 2 hours.
- [Optional] As a User, I can display the list of preferred shops.
- [Optional] As a User, I can remove a shop from my preferred shops list.

## Database (MongoDB)
MongoDB must be installed on your machine.
To try this application on your localhost, you need first to install [this MongoDB dump shops database](https://github.com/timpeace/nearby-shops/blob/master/shops.zip).
This is a MongoDB dump shops database contains more than 300 shops.
To import this database, you need to extract the "shops.zip" file then execute the command below :
```
mongorestore --db shops <path_to_the_extracted_shops_folder>
```

## Mockups
![mainpage](https://user-images.githubusercontent.com/22826923/40513579-be12fb2c-5f95-11e8-8ac5-520e42e1f159.png)

![preferredshops](https://user-images.githubusercontent.com/22826923/40513600-ce7f0d70-5f95-11e8-95b9-33c7f8ad77a8.png)
