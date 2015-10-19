Package.describe({
  name:"cal:immutable",
  summary: "Immutable Data Collections for Javascript.",
  version: "0.0.1",
  git: ""
});

Npm.depends({
	"immutable": "3.7.5"
});

Package.onUse(function(api) {
  api.versionsFrom("METEOR@0.9.0.1");
  api.addFiles("vendor/Immutable.js", "client");
  api.addFiles("lib/require-immutable.js", "server");
  api.export("Immutable", ["server", "client"]);
});
