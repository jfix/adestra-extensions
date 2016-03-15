# OECD.Direct

This is about a widget that helps integrating MessageFocus with the (currently) private OECD Publications API. These extensions are developed independently from Adestra who is the company behind the newsletter Saas application MessageFocus.

The repository contains currently two extensions, one for Chrome and one for Firefox. They are very small and have a lot in common, so it would make sense to refactor the `add-button.js` file.

## Documentation

### Packaging

> Mainly as a reminder for myself.

Chrome: https://developer.chrome.com/extensions/packaging (keep your `.pem` file safe but handy ...).

Firefox (`node`-based `jpm` tool is necessary):

```
cd [project-dir/ext-dir]
jpm  xpi
jpm sign --api-key [apikey] --api-secret [apisecret]

```

more information: https://developer.mozilla.org/en-US/Add-ons/SDK/Tutorials/Getting_Started_(jpm)#Packaging_the_add-on


## TODOs

* create an `ant` (or `gulp`?) file that builds the extensions.
* refactor common code (see `add-button.js`)
* set up automatic updates through releases on github (or elsewhere)
* more documentation
* tests!!!!1!one!
