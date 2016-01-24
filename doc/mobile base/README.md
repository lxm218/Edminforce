> **This document still in progress**

Following questions I am not sure:

1. Should we separate server code and client code to different package
My understand, we should do it.


  **Advantage**

 * Make our code more reusable
 * Make our application more easy to be configured

 **Disadvantage**

 * Increas package number, if we didn't organizate well, increase the difficult of maintain package  - I think we can use name standard to improve this

 > **Kevin:** **No**, we should not. Most Meteor Packages are not either. Please read most of the current existing packages, how they managed. They have client and server in the same package. I did not see any of your "Advantages" if you separate client and server. Package is separated by functionalities.


2. How to extend a package?

 > **Kevin:** The same as you expend any javascript object. For example, Package A export an object Shaoke. You can easily add a function to Shaoke by Shaoke.newFunction = function something(){...}
 
 > **Note:** After discuss with Kevin, Kevin's suggestion is for this version, we don't need to think about extend pacakge, so we don't need to export our class, Kevin's suggestion he think if we need to extend a package, we can create a branch, and modify on it this branch, and you need to take care about merge by yourself, or you can copy this package and modify. Kevin said duplicate code sometime is unavoid. 

3. Should we make collections be a package?

  My answer is **Yes**.

  Currently, we have both mobile app and web app, and they are using same Database, so collections will be reuse both mobile app and web app, but maybe the server code is different, so I think we should make collections be a package, and one package has one collection.


  > Kevin My answer is **No**
  
  > If one of your package use a collection, and you are sure no one else will use it, you can define the collection in side your package. I did not see any reason you create a pacakge without any functionalities just a group of collections.
  
  > Kevin think to solve the problem: same collection used by admin and mobile app, we should document it on git or wiki. Github has wiki, so when you create a collection, you need to create a wiki page to descibe this collection. For example: schema, field.

# Package based Architecture

You can think package is same with Modularity. So all the principles of Modularity, you can use it here.

## Why packages based?

1. File load order. The load order of files is explicit when using packages.
2. Code Organization(Modularity). With packages, organization of your code is more modular and coupling between components is reduced or eliminated completely.
	* Typically each feature has it's own package
	* Each feature is independent, you can remove a package and the application still works.
3. Dependency Management.
4. Global namespace conflicts.
5. Customizations are easier.
6. Update. You can use `meteor update` to update your application

## Key Principles
1. Packages. "Packages for everything" and build small, very specific custom packages that do one thing very well
2. Namespace
3. Transform Classes
4. Common Validation Logic
5. Behavior Pattern

**Note:**
1. For third party packages/libraries, you should specify version

## Folder Structure

### Application Structure LIFT Principle

Structure your app such that you can `L`ocate your code quickly, `I`dentify the code at a glance, keep the `F`lattest structure you can, and `T`ry to stay DRY. The structure should follow these 4 basic guidelines.

*Why LIFT?*: Provides a consistent structure that scales well, is modular, and makes it easier to increase developer efficiency by finding code quickly. Another way to check your app structure is to ask yourself: How quickly can you open and work in all of the related files for a feature?

When I find my structure is not feeling comfortable, I go back and revisit these LIFT guidelines

1. `L`ocating our code is easy
2. `I`dentify code at a glance
3. `F`lat structure as long as we can
4. `T`ry to stay DRY (Don’t Repeat Yourself) or T-DRY

```
|-- packages/
		|-- edminforce/
		|-- edminforce-lib/
		|-- edminforce-core/
		|-- edminforce-common/
		|-- edminforce-login/
		|-- edminforce-classes/
		|-- edminforce-classses-register/
|-- edminforce-index/
```

1. `edminforce`: Set up our application and global namespace for this application
2. `edminforce-lib`: Include all common third party libraries
3. `edminforce-core`: Core function of your application.
4. `edminforce-common`: Sharable function between packages

## Folder Structure of Package

```
/edminforce-login/
    |-- package.js
    |-- startup.js  
    |-- README.md
    |-- tests/
    |-- lib/
            |-- client/
                |-- models/
                |-- views/
                |-- controllers/
                |-- lib/
                |-- collections/
                |-- less/
                |-- vendor/
            |-- server/
            |-- both/
            |-- collections/
            |-- router/
            |-- packages/
            |-- private/
```

## Code Standards
### package name
Package folder name Format: `[app-prefix]-[parent package name]-[package name]`.

Package name: `[app-prefix]:[parent package name]-[package name]`

For examples:

1. Folder name: `edminforce-lib`, Package Name: `edminforce:lib`
2. Folder name: `edminforce-classes`, Package Name: `edminforce:classes`

### Namespace
Add one meaningful global namespace for your app(`MyApp`), and register other global value to this global namespace. And it should at least contains following properties:

1. `Collections`. Register all your collections to this property.
2. `VERSION`. Version of your application

For example:

`EdminForce`, `EdminForce.Collections`

#### Global value in package
The global value in package should have same format with package name.

For example:

Package name `edminforce-home`, then the global namespace should be `EdminForce.Home`, and you can add your value to `EdminForce.Home`, like `EdminForce.Home.value`. The name following UpperCamelCase.


## Reference
1. [Converting a project to a package based architecture](http://experimentsinmeteor.com/package-based-architecture/)
2. [http://meteor.redandivory.com/#/](http://meteor.redandivory.com/#/)
3. [Large Meteor projects - best practices](https://blog.tableflip.io/large-meteor-projects-best-practices/)
4. [Building Large Apps: Tips](https://meteor.hackpad.com/Building-Large-Apps-Tips-d8PQ848nLyE)
5. [Telescope](https://github.com/TelescopeJS/Telescope)
6. [Fast and Efficient Meteor Apps](https://bulletproofmeteor.com/basics/introduction)