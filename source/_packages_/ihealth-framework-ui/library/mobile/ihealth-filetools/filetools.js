
listFiles = function(directory) {
  if(typeof(directory) !== 'undefined' && typeof(directory.createReader) !== 'undefined') {
    var directoryReader = directory.createReader();
    directoryReader.readEntries(function(entries) {
        var i;
        for (i=0; i<entries.length; i++) {
          console.log(directory + ' entry ' + i + ':' );
          console.log(entries[i]);
          if(entries[i].isDirectory) { listFiles(entries[i])};
        }
    }, function (error) {
        alert(error.code);
    });
  }
};

listDir = function() {
  if (Meteor.isCordova) {
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
        console.log('fileSystem', fileSystem)
        fileSystem = fileSystem;

        console.log('fileSystem.root', fileSystem.root)
        root = fileSystem.root

        appDir = cordova.file.applicationDirectory
        console.log('appDir ', appDir )

        listFiles(appDir );
    }, function(error) {
        alert("can't even get the file system: " + error.code);
    });
  }
}
