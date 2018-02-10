# GraphQL-React-Native-Ordering-App

This task of this project is basically ordering from the store. You can create categories and add products to these categories. The user signs up or signs in through the application named letsOrder and then, sees the shop, the categories and the products addded to them, and his/her cart if he/she had one before.

Up to now, i did not build an interface to insert categories or products attached to them so, you will be using graphiql tool working at the localhost:4000/graphql to perform these. 

I am also working for conducting an efficient inventory management with MongoDB, even though MongoDB does not fit this purpose well.

You can also see demonstration of building nested schemas and usage of these with the schema_types in GraphQL.

You can understand how JWT authentication works in GraphQL way.

You can understand the usage of apollo-Client with its cache and store methods. Apollo-Client v2.0 or above, offers a cache store we can use instead Redux. Firstly, I strongly suggest you should check the docs of apollo-graphql for react. Then, you could check how i handle mutations, store them in the cache and reading those datas from the cache.

You can start finding out by clicking the nodeAPI or letsOrder which is an app built with React Native.

Clone the app ;

npm install on both directories.

npm run start on both applications.

For iOs : first run the following command : npm run start, open XCode by running letsOrder.xcodeproject inside the /ios folder in letsOrder. Run the simulator.

For Android : inside the letsOrder, after you run your Android simulator successfully, run the following command : react-native run-android
