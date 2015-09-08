##Structure
####Data
Reactive data in getMetaData() function.

```
	getMetaData(){

 
	 return {
	 		key:reactiveData
	 }

	}
```

This include flux logic below :
 
   * listern change of store 
   * set state to update component


####Hierarchy && Properties
This include a couple parts:
 
1. outer (properties/child)

  ```

  <MyList property=data>  </Mylist>
  
  ```
		
2. inner (hierarchy)

```
	<ul>
		<li> </li>
		<li> </li>
		<li> </li>
		   ...
	</ul>
```	 

####View Events/Actions /Dispatch

	flux action/dispatch

####Store
	flux store

##Example

#####spec

todo

#####implementation

todo

