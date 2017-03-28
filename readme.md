# HB-APP #

## Basic Concept ##
HB-APP is a HTML5 application built with [Meteor](www.meteor.com) **1.4**.
Please follow the DEV Environment Setup steps to setup your environment.

### Design ###
Meteor is a full stack Javascript framework. Web, server and mobile are all covered by Meteor.

## Folder Structure ##

**If you need any additional folders, please get advises from your manager/senior.**

- `client` All files in it will be packed in mobile and web server to show in client side.
  - `client/compatibility` File will be executed first before all other code as **global** scope in client side.
- `server` All files in it will be packed in server side like api and web services
- `node_modules` Standard npm package folder. Files in it will be packed if and only if they are imported from client or server
- `imports` Files will be packed if and only if they are imported in client or server
  - `components`
  - `reducers`
  - `actions`
  - `stores`
    - `store.js`
  - `routes`
    - `route.jsx`
- `tests` This folder stores all Mocha/Jasmine testing files. No file will be packed by Meteor.
- `public` Public folder that will be packed as root folder. This is a good place for favicon.ico. For example, in order to refer file `public/myImage.jpg`, it should be `<img src='myImage.jpg'>`.
- `private` This is the private folder for server only. `Assets` API provided by Meteor is the way to read it. This is generally for storing server side configuration.

## Coding Style ##

### File ###
- All file names should follow the `export default` object name with case-sensitive.
  - If `export default class Animal`, the file name should be `Animal`.
  - If `export default function getUser`, the file name should be `getUser`.
- Each file **must** have at least one `export default` statement.
- All file extensions must be lower cases.
- One class per file except inner and/or private classes.
- One component per file except inner and/or private components.


### Naming Convertion ###
- All classes, variables, functions and objects must be camel cases.
  - For example, `userName`, `password`, `thisIsCamelCaseFunction`.
- All names including file names, variable names, class names must **not** have symbols like `.`,`-`,`_`....etc.
- `class` must start with **upper** case e.g. `MyClass`.
- variables must start with **lower** case e.g. `var myVar`.
- functions must start with **verb** e.g. `getUser`, `isUserValid`, `checkForm`, `setState`, `runCheck`.

### Comments ###

#### Inline Comments ####
Please put necessary comment in your code.

```
/**
 * @description Reverse the input array.
 * @params {Array} arr The input array.
 * @returns {undefined} Nothing will be returned.
 */
function reverse(arr) {
  if (!arr) return; // if the arr is null, exit the function.

  // just loop half of the array
  // and the idea is to swap values in the front and at the back.
  for(let i=0; i<arr.length/2; i++) {

    // the following three lines are XOR SWAP
    arr[i] = arr[i] ^ arr[arr.length-i-1];
    arr[arr.length-i-1] = arr[i] ^ arr[arr.length-i-1];
    arr[i] = arr[i] ^ arr[arr.length-i-1];
  }
}
```

#### Special Comments ####
- `FIXME` - should be corrected.
- `HACK` - a workaround.
- `TODO` - something to be done.
- `UNDONE` - a reversal or "roll back" of previous code.
- `XXX` - warn other programmers of problematic or misguiding code
- `UX` - user experience, notice about non-trivial code.



### Functions ###
- Function names must start with **verb**, e.g. `get`, `set`, `is`, `check`, `run`.
- All functons must have proper comment header with `@description` and `@returns` elements.
- If the function returns nothing, `@return {undefined} Nothing will be returned` should be put in the comment.

Here is an example.
```
/**
 * @description Get the current user
 * @typedef {object} User
 * @typedef {object} Meteor
 * @param {Meteor} meteor The current meteor object
 * @returns {Promise<User>} A promise of getting user
 */
function getUser(meteor) {
  return new Promise((resolve, reject)=> {
    if (meteor) {
      resolve(meteor.user);
    } else {
      resolve(null);
    }
  });
}
```

Empty functions somethings are necessary. However, you have to put the comments inside to tell other developers that is intensionally blank.

```
function emptyFunction() {
  // do nothing
}
```


#### Class ####

- Class names must start with **upper** case.
- Class names must be meaningfully representing the actual object.
- `constructor` is optional.
- `@description` is mandatory in class header leavel.

Here is an example.

```
/**
 * @description Animal is the base class for all animals.
 */
export default class Animal {
  /**
   * @description Animal is the base class for all animals.
   * @param {number} weight The weight of the animal.
   * @returns {Animal} A new instance of Animal.
   */
  constructor(weight) {
    this.weight = weight
  }

  /**
   * @description Get the weight of the animal.
   * @returns {number} The weight of the animal.
   */
  getWeight() {
    return this.weight;
  }

  /**
   * @description Set a new weight of the animal.
   * @param {number} newWeight The new weight of the animal.
   * @returns {undefined} Nothing will be returned.
   */
  setWeight(newWeight) {
    this.weight = newWeight;
  }
}
```



## Commit Comments ##

- Comment comments must have an issue linked to.
- In order to link to an issue, the commit comments must have `#ProjectCode-123` as prefix where `ProjectCode-123` can be found in JIRA.



## Install ESLint Globally ##
```
npm install -g eslint
```


## Environment Variables ##

- SMS_APP_ID : leancloud appId
- SMS_APP_KEY : leancloud appKey

> These two variables are stored in `dev_run.sh`,
> if you pull the latest code, 
> please run `npm start` to start your app.



## Console ##

Console shares a lot of files with Client. So Console will be copied to a new directory and then build and debug. 
- `.console_client` will be copied to `client`.
- `.console_.meteor` will be copied to `.meteor`.
- `server`, `public`, `private`, `imports` will be copied to the Console directory.

`console.sh` is a hand command for build, test and deploy Console.

- `./console.sh deploy` will deploy everything to `../hbconsole` directory.
- `./console.sh reset` will delete the entire directory of `../hbconsole`.
- `./console.sh run` will deploy everything to `../hbconsole` directory and then run.


## Mobile Hot Deploy ##
Reference to: https://github.com/meteor/meteor/issues/7760
[Mobile App Creation]
```
meteor run ios-device -p 4000 --mobile-server http://192.168.1.100:4000
```

This creates the app with the connectivity I want for debugging.

[Launch Server]
```
meteor –p 4000 --mobile-server http://192.168.1.100:4000
```


## Cannot Run Client and Console ##
Sometimes, you cannot run Client and Console at the same time because MacOS limits the number of files open on OS level. The default limit is about 10,000 files. The following commands will set the limit to 65,535 files.
```
echo kern.maxfiles=65536 | sudo tee -a /etc/sysctl.conf
echo kern.maxfilesperproc=65536 | sudo tee -a /etc/sysctl.conf
sudo sysctl -w kern.maxfiles=65536
sudo sysctl -w kern.maxfilesperproc=65536
ulimit -n 65536
```


# IPv6 in Aliyun #

modprobe sit

https://tunnelbroker.net/tunnel_detail.php?tid=387145
https://jiandanxinli.github.io/2016-08-06.html
https://davecoyle.com/tech-notes/tunnelled-ipv6-via-hurricane-electric-on-ubuntu/


