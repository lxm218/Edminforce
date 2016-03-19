Meteor.startup(function () {
    // Get all program list
    Meteor.publish("EF-Program", function () {
        return EdminForce.Collections.program.find({});
    });

    // Get Trial Class list based on programID
    Meteor.publishComposite("EF-Class-programID", function (programID) {
            return {
                find: function () {
                    //console.log(programID);
                    return EdminForce.Collections.class.find({
                        programID: programID,
                        status: 'Active'
                    });
                },
                children: [{
                    find: function () {
                        return EdminForce.Collections.session.find({}, {
                            sort: {
                                startDate: -1
                            }
                        });
                    }
                },
                {
                    find: function (cls) {
                        return EdminForce.Collections.classStudent.find({classID:cls._id}, {
                            sort: {
                                startDate: -1
                            }
                        });
                    }
                }]
            }
        }
    );

    // Get Trial Class information
    Meteor.publishComposite("EF-Class-By-ClassID", function (classID) {
        return {
            find: function () {
                return EdminForce.Collections.class.find({
                    _id: classID
                });
            },
            children: [{
                find: function () {
                    //console.log(this.userId);
                    return EdminForce.Collections.student.find({
                        accountID: this.userId
                    }, {
                        sort: {
                            name: 1
                        }
                    })
                }
            }, {
                find: function (classData) {
                    //console.log(this.userId);
                    return EdminForce.Collections.classStudent.find({
                        accountID: this.userId
                    }, {
                        sort: {
                            lessonDate: 1
                        }
                    })
                }
            }]
        }
    });

    // Get the class for register
    Meteor.publishComposite("EF-Classes-For-Register", function () {
        return {
            find: function () {
                return EdminForce.Collections.student.find({
                    accountID: this.userId
                }, {
                    sort: {
                        name: 1
                    }
                })
            },
            children: [
                // program list
                {
                    find: function () {
                        return EdminForce.Collections.program.find({}, {
                            sort: {
                                createTime: 1
                            }
                        });
                    }
                },
                // currently user's students registered which classes
                {
                    find: function (student) {
                        return EdminForce.Collections.classStudent.find({studentID:student._id});
                    }
                },

                // all active classes
                {
                    find: function () {
                        return EdminForce.Collections.class.find({status: 'Active'});
                    }
                },

                // all sessions
                {
                    find: function () {
                        return EdminForce.Collections.session.find({});
                    }
                }
            ]
        }
    });

    Meteor.publishComposite("EF-Cart-Detail-By-ID", function (cartIDs /*, classID, studentID*/) {

        return {
            find: function () {
                return EdminForce.Collections.classStudent.find({
                    _id: {$in:cartIDs}
                });
            },
            children: [
                {
                    find: function (clsStudent) {
                        return EdminForce.Collections.class.find({
                            _id: clsStudent.classID,
                            status: 'Active'
                        });
                    },
                    children: [
                        {
                            find: function (cls) {
                                return EdminForce.Collections.session.find({
                                    _id: cls.sessionID
                                });
                            }
                        },
                        {
                            find: function (cls) {
                                return EdminForce.Collections.program.find({
                                    _id: cls.programID
                                });
                            }
                        }
                    ]
                },
                {
                    find: function (cls) {
                        return EdminForce.Collections.student.find({
                            _id: cls.studentID
                        });
                    }
                }
            ]
        }
    });

    Meteor.publishComposite("EF-ShoppingCarts-Checkout", function () {
        return {
            find: function () {
                return EdminForce.Collections.classStudent.find({
                    accountID: this.userId
                });
            },
            children: [
                {
                    find: function (clsStudent) {
                        return EdminForce.Collections.class.find({_id:clsStudent.classID});
                    },
                    children: [
                        {
                            find: function(cls) {
                                return EdminForce.Collections.session.find({_id:cls.sessionID});
                            }
                        },
                        {
                            find: function (cls) {
                                return EdminForce.Collections.program.find({
                                    _id: cls.programID
                                });
                            }
                        }
                    ]
                },
                {
                    find: function (clsStudent) {
                        return EdminForce.Collections.student.find({
                            _id: clsStudent.studentID
                        });
                    }
                },
                {
                    find: function () {
                        return EdminForce.Collections.orders.find({
                            accountID: this.userId
                        });
                    }
                },
                {
                    find: function(){
                        return EdminForce.Collections.customerCoupon.find({
                            customerID: this.userId
                        })
                    }
                }
            ]
        }
    });

    Meteor.publishComposite("EF-Students", function () {
        return {
            find: function () {
                return EdminForce.Collections.student.find({
                    accountID: this.userId
                });
            },
            children: [
                {
                    find: function () {
                        return EdminForce.Collections.classStudent.find({
                            accountID: this.userId,
                            type: {
                                $in: ['register', 'wait']
                            },
                            status: {
                                $in: ["checkouted"]
                            }
                        })
                    }
                },
                {
                    find: function () {
                        return EdminForce.Collections.class.find({})
                    }
                },
                {
                    find: function () {
                        return EdminForce.Collections.session.find({})
                    }
                }
            ]
        }
    });

    Meteor.publishComposite("EF-Students-details", function (studentID, classStudentID, programID) {
        return {
            find: function () {
                return EdminForce.Collections.student.find({
                    accountID: this.userId,
                    _id: studentID
                });
            },
            children: [
                {
                    find: function () {
                        return EdminForce.Collections.classStudent.find({
                            accountID: this.userId
                        })
                    }
                },
                {
                    find: function () {
                        return EdminForce.Collections.class.find({
                            programID: programID
                        })
                    }
                },
                {
                    find: function () {
                        return EdminForce.Collections.session.find({})
                    }
                }
            ]
        }

    });

    Meteor.publishComposite("EF-UserData", function () {
        return {
            find: function () {
                return Meteor.users.find({_id: this.userId}, {
                    fields : {
                        username : 1,
                        emails : 1,
                        role : 1,
                        _id : 1
                    }
                });
            },
            children:[
                {
                    find : function(){
                        return EdminForce.Collections.Customer.find({
                            _id : this.userId
                        })
                    }
                },
                {
                    find: function(){
                        return EdminForce.Collections.student.find({
                            accountID: this.userId
                        });
                    }
                }
            ]
        }
    });

    // A composite publish that returns all (or optionally filtered by a single studentID)
    // students for the currently logged-in user.
    // For each student, returns all classes, sessions, programs.
    Meteor.publishComposite("EFStudentsWithClasses", function(studentID) {
        const userId = this.userId;
        return {
            // all students of the logged-in user
            find () {
                let query = {
                    accountID: userId
                }
                studentID && (query._id = studentID);
                return EdminForce.Collections.student.find(query);
            },

            children: [
                {
                    // registered classes for each student (not started, in-session, or completed )
                    find (student) {
                        return EdminForce.Collections.classStudent.find({
                            studentID: student._id,
                            type: {
                                $in: ['register', 'trial']
                            },
                            status: {
                                $in: ['checkouted']
                            },
                            $or:[{lessonDate:{$exists:false}}, {lessonDate:{$gte:new Date()}}]
                        })
                    },
                    children: [
                        {
                            // class info
                            find(studentClass) {
                                return EdminForce.Collections.class.find({_id:studentClass.classID})
                            },
                            children: [
                                {
                                    // session info for the class
                                    find(classDoc) {
                                        return EdminForce.Collections.session.find({_id:classDoc.sessionID})
                                    }
                                },
                                {
                                    // program info for the class
                                    find(classDoc) {
                                        return EdminForce.Collections.program.find({_id:classDoc.programID})
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    });

    // Publishes the current customer
    Meteor.publish("EFCurrentCustomer", function () {
        return EdminForce.Collections.Customer.find({_id: this.userId});
    });

});