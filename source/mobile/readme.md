## Code Standard

### Required Libraries and Tools for Developers

### Style Guildes for Reference
Refer to the following style guides if need be:

- [JavaScript Style Guide](https://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml)
- [HTML/CSS Style Guide](https://google-styleguide.googlecode.com/svn/trunk/htmlcssguide.xml)

### Guide lines for Developers

#### Folder Structure
 
 ```
 root/
 	|-- client/
 		|-- lib/					// Just for client
 			|-- router/
 				|-- module_name.router.jsx
 		|-- main.jsx				// Enter js file
 		|-- scss.scss
 		|-- app/
 			|-- auth/
 			|-- auth.login/
 				|-- Login.component.jsx
 				|-- Login.jsx
 				|-- sass/
 					|-- login.sass
 			|-- auth.reset/
 			|-- auth.logout/
 	|-- lib/						// Both for client and server
 	|-- both/
 		|-- collections/
 	|-- server/
 	 	|-- methods/
 	 		|-- module_name.method.js
 		|-- permissions/
 			|-- module_name.permission.js
 		|-- publish/
 			|-- module_name.publish.js
 		|-- seed.js				// Initial DB
 		|-- lib/					// Just for server
 	|-- public/					// Store all the images and other static 
 resources
 	|-- test/
 ```
 **Namespacing:**

* App Components: Cal.ComponentName. All components should register on Cal.
* All module name should be lowercase
* All component must add a surfix - `component`. For example: `Login.component.jsx`
* All router need to put to `client/lib/router`, and create a jsx file for your router, the name formart should be like `module_name.router.jsx`. For example: `auth.login.router.jsx`
* Choose any one by yourself
	
	```
	// this format you can use var or let
	(function(){
		
	})()
	```
	or
	
	```
	// This format just use let
	{
		let
	}
	```
* Sass file. All css in your module should be wrap by a class named by module name. For example, `auth.login`, the css should be like:

	```
	.auth-login{
		// write your css here
	}
	```

















