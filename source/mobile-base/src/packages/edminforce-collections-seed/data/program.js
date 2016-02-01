/**
 * Created on 9/14/15.
 */

Meteor.startup(function () {

    function resetData(){
        EdminForce.Collections.program.remove({});

        let data = [
            {
                _id: "beginning",
                name:"Beginning",
                description: '<h2 id="toc_1">Why packages based?</h2> <ol> <li>File load order. The load order of files is explicit when using packages.</li> <li>Code Organization(Modularity). With packages, organization of your code is more modular and coupling between components is reduced or eliminated completely. <ul> <li>Typically each feature has it\'s own package</li><li>Each feature is independent, you can remove a package and the application still works.</li></ul></li> </ol>"',
                availableTrial: true
            },
            {
                _id: "intermediate",
                name:"Intermediate",
                description: '<h2 id="toc_1">Why packages based?</h2> <ol> <li>File load order. The load order of files is explicit when using packages.</li> <li>Code Organization(Modularity). With packages, organization of your code is more modular and coupling between components is reduced or eliminated completely. <ul> <li>Typically each feature has it\'s own package</li><li>Each feature is independent, you can remove a package and the application still works.</li></ul></li> </ol>"',
                availableTrial: true
            },
            {
                _id: "advanced",
                name:"Pre-advanced/Advanced",
                description: '<h2 id="toc_1">Why packages based?</h2> <ol> <li>File load order. The load order of files is explicit when using packages.</li> <li>Code Organization(Modularity). With packages, organization of your code is more modular and coupling between components is reduced or eliminated completely. <ul> <li>Typically each feature has it\'s own package</li><li>Each feature is independent, you can remove a package and the application still works.</li></ul></li> </ol>"',
                availableTrial: true
            },
            {
                _id: "ap",
                name:"Pre-AP/AP",
                description: '<h2 id="toc_1">Why packages based?</h2> <ol> <li>File load order. The load order of files is explicit when using packages.</li> <li>Code Organization(Modularity). With packages, organization of your code is more modular and coupling between components is reduced or eliminated completely. <ul> <li>Typically each feature has it\'s own package</li><li>Each feature is independent, you can remove a package and the application still works.</li></ul></li> </ol>"',
                availableTrial: true
            },
            {
                _id: "summercamp",
                name:"Summer Camp",
                description: '<h2 id="toc_1">Why packages based?</h2> <ol> <li>File load order. The load order of files is explicit when using packages.</li> <li>Code Organization(Modularity). With packages, organization of your code is more modular and coupling between components is reduced or eliminated completely. <ul> <li>Typically each feature has it\'s own package</li><li>Each feature is independent, you can remove a package and the application still works.</li></ul></li> </ol>"',
                availableTrial: false
            }
        ];

        _(data).forEach(function(item){
            EdminForce.Collections.program.insert(item);
        });
        //EdminForce.Collections.program.insert();

    }

    if (EdminForce.Collections.program.find({}).count() === 0) {
        resetData()
    }

});