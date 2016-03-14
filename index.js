// Import the page-mod API
var oecdDirect = require("sdk/page-mod");
// import tabs module to be able to know the URL of the host page
var tabs = require('sdk/tabs');

// Create a page-mod
// It will run a script whenever the MessageFocus web app is loaded
// Then it executes the script add-button.js
// Also, we're passing in some options.
oecdDirect.PageMod({
  // this currently only works for the 'new' HTML editor
  // not yet for the 'template' HTML editor
  include: [
    // this is the current 'new' HTML editor
    /https?:\/\/app\.adestra\.com\/.*\/html_editor_new\/?$/,

    // TODO: this is the new 'template' HTML editor
    /https?:\/\/app\.adestra\.com\/.*\/email_editor\/?$/
  ],

  contentScriptFile: [
    "./add-button.js"
  ],
  contentScriptOptions: {
    logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAVlpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDUuNC4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iPgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KTMInWQAAAlBJREFUOBHdks9PE0EUx7+zW3a7hdJCUSARJbEiUQ8lHkAJplz8kWhSNDHxZHuRcFAhJh68VEw8aGKKXDxWj1x0jQeONuEkGlg0RkUjq1gRSqVls6W7/bG+aSDxPzDxJZ95b2fm++btmwH+tbG/C5CHxiNMUkJMkgFR0sEEdSs5nNvZ8+ilNzQyaGg7ns8LfJDO3AzJ527NM5f0jEnuOOqUOCVKUrzkGX4S5Xu2LbHtI5QkwmNG4s6B7vb54N7dfqWhEX6/H1VRxoy+iVafghZFhE9msbsXeh+TyCHNGOEnLhM9roGuXfETh9r9LYFmNDT6UO/1ouBI6NzThjZK4BaB2cV0wnMlqQLXdBLFiXGik8dCR7Mn6q5zUS0MvCF8XDMsXJ1awNv0Jk0znoifGCZqp+eXu/h3ysoHRoVGOqJaraJaqaBClMslvNB+ANUyvqzmYFtFTM0uAZUyb6Caed+n/prnuTC2ooUhHuw/ebupXsbTuWUobhkeuQ5Z08b3rIk5fR1l28Jg0AdtKfM81n/g49ZG6wSJX2U/He2uWJ6wMLOY1QyzgPRaDpPTC3j9+SdOBb24eISqLJpIvfsGZhdx9nAgRUJ+C7z8HHGd0MRCR6/1YcWIZI0iWKUMycXglUW8+ZpBej0P0zSxv1lKTY6cv9d37LhKohSxSpwmLvG+8XeQJBflca2Zgogmr4KNQglwHA0CG7TUO7nRsRsbtKOHiBL7JhIPYrWHZE/fj9HEEKGRAA5V8jtn6I5dHHdKVk1Ma9wekkgnz3+B38j/YH8AOHTbrz+l84oAAAAASUVORK5CYII=",
    targetUrl: "http://vs-pac-int-2/oecd.direct",
    targetWindowHeight: 500,
    targetWindowWidth: 700,
    // not currently used, but necessary to trigger correct code
    // depending which HTML editor was selected by user
    currentUrl: tabs.activeTab.url
  }
});
