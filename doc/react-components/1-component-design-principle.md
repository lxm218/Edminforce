
###General

#####React + Flux + Meteor
 
view/view-controller
action/action-creator
dispatch  
storage 

component/component-owner/component-parent


http://react-in-meteor.readthedocs.org/en/latest/  meteor react
https://atmospherejs.com/meteorflux/dispatcher		 meteor flux

##### React + Meteor
When using meteor + react, Fulx is not necessary.

https://github.com/meteor/react-packages/tree/devel/examples/react-todos

___由于flux在meteor中非必需，一般情况不采用，除非有特别的便利___


###tips

===
Flux is a quite loose concept, and exact implementations change from team to team. I noticed that Facebook has changed some approaches here and there over time as well. The exact cycle is not strictly defined. There are some quite "fixed" things though:

There is a Dispatcher that dispatches all actions to all stores and permits only one action at the time to prevent event-chain hell.
Stores are action receivers, and all state must be changed through actions.
actions are "fire and forget" (no callbacks!)
Views receive state from the store and fire actions
Other things are done differently from implementation to implementation







