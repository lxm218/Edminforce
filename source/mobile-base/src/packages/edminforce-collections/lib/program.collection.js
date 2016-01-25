/**
 * @name edminforce_program
 * @description store the program information
 * @type {Mongo.Collection}
 */
let edminforce_program = EdminForce.Collections.edminforce_program = new Mongo.Collection('edminforce_program');

edminforce_program.schema = new SimpleSchema({
    name:{
        type: String
    },
    description: {
        type: String
    },
    availableTrial: {
        type: Boolean,
        defaultValue: true
    }
});

edminforce_program.attachSchema(edminforce_program.schema);
