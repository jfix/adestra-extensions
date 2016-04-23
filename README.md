# OECD.Direct

This project is a tiny widget that helps integrating MessageFocus with the (currently) private OECD Publications API. These extensions are developed independently from Adestra who is the company behind the newsletter Saas application MessageFocus. The extensions now work for both the so-called *HTML Editor* and the *Email Editor*.

The repository contains currently two extensions, one for Chrome and one for Firefox. They are very small and have a lot in common, so it would make sense to refactor the `contentscript.js` file. At the moment the two instances of this file are exactly the same but live in different locations. Therefore, refactoring still applies but would require some kind of build tool, `gulp` or whatever.

## Documentation

### Packaging

> Mainly as a reminder for myself.

Chrome: https://developer.chrome.com/extensions/packaging (keep your `.pem` file safe but handy ...).
Also, and more importantly: https://chrome.google.com/webstore/developer/dashboard

Firefox (`node`-based `jpm` tool is necessary):

To test within a real Firefox instance (console output will be shown on the command line):

```
$ cd [project-dir/ext-dir]
$ jpm  run
```

To create the package for installation:

```
$ cd [project-dir/ext-dir]
$ jpm  xpi
$ jpm sign --api-key [apikey] --api-secret [apisecret]
```

More information: https://developer.mozilla.org/en-US/Add-ons/SDK/Tutorials/Getting_Started_(jpm)#Packaging_the_add-on


## TODOs

* create an `ant` (or `gulp`?) file that builds the extensions.
* set up automatic updates through releases on github (or elsewhere)
* more documentation
* tests!!!!1!one!
