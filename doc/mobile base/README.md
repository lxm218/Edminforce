> **This document still in progress**

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

```
|-- packages/
		|-- edminforce/
		|-- edminforce-lib/
		|-- edminforce-core/
		|-- edminforce-login/
		|-- edminforce-classes/
		|-- edminforce-classses-register/
		|-- edminforce-common/
|-- edminforce-index/
```

1. `edminforce-login`: Contains all our core Meteor and 3rd party referencese, and set up our application's global namespace

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


