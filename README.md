# React Native Utils #

**Very much a work in progress right now**

This is a simple command line utility to help create the basic patterns that I use when working on react native projects and initialize them with the `create-react-native-app` utility. I typically use the following tools and libraries:

* TypeScript
* StoryBook
* Jest
* Mobx

## Installation ##

**NOT YET PUBLISHED**
For now, clone the project and run `yarn tsc` from the project root to transpile the typescript. You can run `npm install -g` from the project root to make this accessible globally while it is still in development.

## Functions ##

**Create Directory Structure**
This option creates my standard directory structure: 

```
.
├──__tests__
|  ├──components
|  ├──config
|  ├──navigation
|  ├──screens
|  ├──stores
|  └──util
└──src
    ├──components
    ├──config
    ├──navigation
    ├──screens
    ├──stores
    └──util

```
This should be run immediately after CRNA.


**Create Component**

This command will create a component at the `/components/ComponentName` directory along with four files: 

* Component.ts
* IComponentProps.ts
* IComponentState.ts
* index.ts

The files will contain basic boilerplate and the index.ts will take care of exporting each file.

**Create Stateless Component** 

This command will create a stateless component at the `/components/ComponentName` directory along with three files: 

* Component.ts
* IComponentProps.ts
* index.ts

The files will contain basic boilerplate and the index.ts will take care of exporting each file.

**Create Screen**

This command will create a component at the `/screens/ScreenName` directory along with four files: 

* Screen.ts
* IScreenProps.ts
* IScreenState.ts
* index.ts

The files will contain basic boilerplate and the index.ts will take care of exporting each file.

**Create Scripts**

*not yet implemeneted*

Adds the following scripts to the package.json file:

* cleanWatchman - 
* startEmulator - 


***NOTE*** I am only testing on linux. Most of these options should work on windows as I'm using shelljs and fs for any file access. I'm happy to accept a PR (when I publish) to fix any windows bugs you may have found.


