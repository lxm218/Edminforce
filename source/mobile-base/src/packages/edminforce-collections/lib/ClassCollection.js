/**
 * @name ClassCollection
 * @description store the program information
 * @type {Mongo.Collection}
 */

ClassCollection = class ClassCollection extends BaseCollection {

    /**
     * Collection instance should be singleton.
     * Most of case you should reinstanced, but if you really want to do it. set this value to null, then instance again
     */
    static _instance;

    constructor(name, options) {
        if (!ClassCollection._instance) {
            super(name, options);
            // Store this instance
            ClassCollection._instance = this;
        }

        return ClassCollection._instance;
    }

    defineCollectionSchema() {
        return {
            name: {
                type: String
            },
            programID: {
                type: String,
                optional: false

            },
            sessionID: {
                type: String,
                optional: false
            },
            status: {
                type: String,
                allowedValues: ['Active', 'Inactive'],
                defaultValue: "Active"
            },
            length: {
                type: String,
                optional: false
            },

            levels: {
                type: [String],
                allowedValues: ['Beginner', 'Intermediate', 'Advanced'],
                defaultValue: 'Beginner',
                optional: false
            },
            teacher: {
                type: String,
                optional: true
            },

            schedule: {
                type: new SimpleSchema({
                    day: {
                        type: String,
                        allowedValues: ['Sun', 'Mon', 'Tues', 'Wed', 'Thu', 'Fri', 'Sat'],
                        optional: false
                    },
                    time: {
                        type: String,
                        optional: false
                    }
                }),
                optional: false
            },

            tuition: {
                type: new SimpleSchema({
                    type : {
                        type: String,
                        allowedValues : ['each', 'total']
                    },
                    money : {
                        type: String,
                        label : 'Tuition money'
                    }
                })
            },
            maxStudent : {
                type : Number,
                label : 'Maximum Student',
                custom : function(){
                    let min = this.field('minStudent');
                    //console.log(min, this.value);
                    if(this.value < min.value){
                        //throw new Error('max student is must more than minimum student');
                        return 'max student is must more than minimum student!';
                    }

                }
            },

            minStudent : {
                defaultValue : 0,
                type : Number,
                label : 'Minimum Student',
                custom: function(){
                    let max = this.field('maxStudent');
                    //console.log(min, this.value);
                    if(this.value > max.value){
                        //throw new Error('min student is must less than max student');
                        return 'Min student is must less than max student!';
                    }
                }
            },
            trialStudent :{
                defaultValue : 0,
                type : Number,
                label : 'Trial Student'
            },

            makeupStudent :{
                defaultValue : 0,
                optional : true,
                type : Number,
                label : 'Makeup Student'
            },

            makeupClassFee : {
                type : Number,
                optional : true,
                defaultValue : 0
            },

            minAgeRequire : {
                type : Number,
                defaultValue : 0,
                optional : true,
                label : 'Minimum Age'
            },
            maxAgeRequire : {
                type : Number,
                optional : true,
                label : 'Maximum Age'
            },
            genderRequire :{
                type: String,
                allowedValues : ['All', 'Male', 'Female'],
                defaultValue : 'All'
            },

            createTime : {
                type: Date,
                optional : true,
                autoValue: function(){
                    if (this.isInsert){
                        return new Date();
                    }
                }
            },
            updateTime : {
                type: Date,
                optional: true,
                autoValue: function () {
                    if (this.isInsert) {
                        return new Date();
                    }
                    if (this.isUpdate) {
                        return new Date();
                    }
                }
            }
        }
    }
}
