# GraphQL-React-Native-Ordering-App

This task of this project is basically ordering from the store. You can create categories and add products to these categories. The user signs up or signs in through the application named letsOrder and then, sees the shop, the categories and the products addded to them, and his/her cart if he/she had one before.

Up to now, i did not build an interface to insert categories or products attached to them so, you will be using graphiql tool working at the localhost:4000/graphql to perform these. 

I am also working for conducting an efficient inventory management with MongoDB, even though MongoDB does not fit this purpose in terms of necessary correlation between tables/collections.

You can also see demonstration of building nested schemas and usage of these with the schema_types in GraphQL.

You can understand how JWT authentication works in GraphQL way.

You can understand the usage of apollo-Client with its cache methods. Apollo-Client v2.0 or above, offers a cache store we can use instead Redux. Firstly, I strongly suggest you should check the docs of apollo-graphql for react. Then, you could check how i handle mutations, store them in the cache and reading those datas from the cache. In addition to this, you can achieve how to construct a navigation dynamically for example building a tab navigation bar fed by the categories and products fetched after successful login. The tab bar has some nice features such as swiping and horizontal scrolling. Following this, a cart drawer involves in with the purpose for displaying the user's cart. It does not only display it but also offers some functions which work by pressing two small buttons that increae and decrease the quantity of the items in the cart.

You can start finding out by clicking the nodeAPI or aslanOrder which is an app built with React Native.

Clone the app ;

npm install on both directories.

npm run start on both applications.

For iOs : first run the following command : npm run start, open XCode by running aslanOrder.xcodeproject inside the /ios folder in aslanOrder. Run the simulator.

For Android : inside the aslanOrder, after you run your Android simulator successfully, run the following command : react-native run-android

New Screenshots from the app :

![alt text](https://github.com/ozercevikaslan/GraphQL-React-Native-Ordering-App/blob/master/screenshots/Simulator%20Screen%20Shot%20-%20iPhone%207%20-%202018-05-10%20at%2000.54.57.png)

![alt text](https://github.com/ozercevikaslan/GraphQL-React-Native-Ordering-App/blob/master/screenshots/Simulator%20Screen%20Shot%20-%20iPhone%207%20-%202018-05-10%20at%2000.55.06.png)

![alt text](https://github.com/ozercevikaslan/GraphQL-React-Native-Ordering-App/blob/master/screenshots/Simulator%20Screen%20Shot%20-%20iPhone%207%20-%202018-05-10%20at%2000.55.19.png)

![alt text](https://github.com/ozercevikaslan/GraphQL-React-Native-Ordering-App/blob/master/screenshots/Simulator%20Screen%20Shot%20-%20iPhone%207%20-%202018-05-10%20at%2000.55.26.png)



