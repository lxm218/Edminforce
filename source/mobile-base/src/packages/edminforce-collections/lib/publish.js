Meteor.startup(function () {
    // Get all program list
    Meteor.publish("EF-Program", ()=> {
        return EdminForce.Collections.program.find({});
    });

    // Get Trial Class list based on programID
    Meteor.publishComposite("EF-Class-programID", function (programID) {
            return {
                find: function () {
                    //console.log(programID);
                    return EdminForce.Collections.class.find({
                        programID: programID
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
                        find: function () {
                            return EdminForce.Collections.classStudent.find({}, {
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
                find: function () {
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
                    find: function () {
                        return EdminForce.Collections.classStudent.find({
                            accountID: this.userId
                        });
                    }
                },
                // all classes
                {
                    find: function () {
                        return EdminForce.Collections.class.find({});
                    }
                }

            ]
        }
    });

    Meteor.publishComposite("EF-Cart-Detail-By-ID", function (cartID, classID, studentID) {
        console.log(studentID);
        return {
            find: function () {
                return EdminForce.Collections.classStudent.find({
                    _id: cartID
                });
            },
            children: [
                {
                    find: function () {
                        return EdminForce.Collections.class.find({
                            _id: classID
                        });
                    }
                },
                {
                    find: function () {
                        return EdminForce.Collections.student.find({
                            _id: studentID
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
                    status: "pending"
                });
            },
            children: [
                {
                    find: function () {
                        return EdminForce.Collections.class.find({
                        });
                    }
                },
                {
                    find: function () {
                        return EdminForce.Collections.student.find({
                            accountID: this.userId
                        });
                    }
                },
                {
                    find: function () {
                        return EdminForce.Collections.orders.find({
                            accountID: this.userId
                        });
                    }
                }
            ]
        }
    });

});