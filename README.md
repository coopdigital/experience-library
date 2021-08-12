# Co-op Experience Library

Guidelines, tools and resources to help us create better digital experiences.

The Experience Library is for anyone working on products, services and communications at Co-op.

## Prerequisites
You'll need [Node.js](https://nodejs.org/), [NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) and [Ruby](https://www.ruby-lang.org/en/) with the gem dependencies installed. When you run the next step these will be installed autoamtically, however on Co-op Macs you may not have permissions to do this. 

If you get an error:

1. Log out.
2. Log back in as the admin account.
3. Choose Apple menu > System Preferences.
4. Click Users & Groups.
5. Click the lock icon to unlock it, then enter an administrator name and password.
6. Select a standard user or managed user in the list of users, then select “Allow user to administer this computer.”
7. Log out of the admin account.
8. Log back in with your standard account.

## Local development

This project uses [Jekyll](http://jekyllrb.com/) to generate pages, and various NPM packages with [Gulp](http://gulpjs.com/) to compile the assets into the `build` directory. To install all the necessary dependencies:

```sh
bundle install
npm ci
```

Once dependencies have been installed, you can build and serve your prototype locally. Gulp commands are already set up to generate the Jekyll build, lint and compile the postCSS and JavaScript, to copy over necessary assets from the Toolkit, and to run a local server for development.

The default gulp task will build and compile all the assets, start a local server, and watch for file changes:

```sh
npm run server
```

A local version of the website will now be accessible at http://0.0.0.0:9000.

_Note: for the browser to reload automatically when a file changes, you will need to [install the LiveReload extension](http://livereload.com/extensions/)._


## Deploying the website

Changes to the main branch are automatically deplyed to Heroku at:
[https://pioneer-design-system.herokuapp.com](https://pioneer-design-system.herokuapp.com)
