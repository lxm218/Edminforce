
if (Meteor.isClient) {

  Meteor.startup( function() {

    // Important : Meta
    var metaTag=document.createElement('meta');
    metaTag.name = "viewport"
    metaTag.content = "user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1"
    document.getElementsByTagName('head')[0].appendChild(metaTag)

  })

}
