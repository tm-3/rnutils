# React Native Utils #

I found myself writing the same things over and over again, as we always do. I looked for a generator or some project scaffolding tools that would do what I wanted and as usual didn't find them. I probably could have put this in slush but I just wanted to get something done rather than learning yet another tool, even if it is simple. 

`rnutils` is a command line utility to help create the basic patterns that I use when working on react native projects and initialize them with the `create-react-native-app` utility. I typically use the following tools and libraries:

* TypeScript
* StoryBook 
* Jest
* Mobx

This is intended for use with vscode, but most features should be editor independent. Setting up debugging will not work with any other editor. 

## Installation ##

```bash
yarn global add rnutils
```

## New Project ##

To get started on a new typescript project:

1. Run `create-react-native-app [projectName]` as you normally would.
1. Navigate to your new project directory and run `rnutils`.
1. Choose `Post CRNA Config` to setup a basic typescript/react native project. See the options below for more detail. 

## Usage ##

From your project directory:
```
rnutils 
```

## Options ##

When running the `rnutils` you will have the following choices:

* Create Component
* Create Stateless Component
* Create Screen
* Post CRNA Config
* Exit

**Create Component**

This command will create a component at the `/components/ComponentName` directory along with four files: 

* Component.ts
* IComponentProps.ts
* IComponentState.ts
* index.ts

The files will contain basic boilerplate and the index.ts will take care of exporting each file. You can include subdirectories in the component name. The first letter of the component name will be capatilazed

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

**Post CRNA Config**

This option performs a series of tasks that are meant to be completed right after you run the `create-react-native-app`. They are:

* Install the following dev dependencies:
    * typescript
    * jest-expo-ts
    * react-test-renderer
    * react-native-typescript-transformer
    * @types/react
    * @types/react-native
    * @typesreact-test-renderer
    * @types/jest
* Install the follwing dependencies:
    * mobx
    * mobx-react
* Update `app.json` for typescript.
    * The `app.json` file needs to be aware of the `react-native-typescript-transformer`. It will be modified accordingly.
* Create `tsconfig.json`.
* Delete `jsconfig.json`.
* Create `.vscode/settings.json`. 
    * Creates the file. It will overwrite anything already there.
    * This is necesary for vscode to debug.
* Create additonal scripts in the `package.json` file:
    * cleanWatchman: Deletes all inotify watches
    * startEmulator: Starts the Android emulator. This may be different on other machines.
    * preandroid: Runs before android to clean inotify watches and starts the emulator.
    * increaseWatches: Increases the number of inotify watches. This is reset on reboot. I should probably make this permanent on my machine instead of having the script here.
* Creates my Standard Directory Structure:

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


***NOTE*** I am only testing on linux/ubuntu. Most of these options should work on windows as I'm using shelljs and fs for any file access. I'm happy to accept a PR (when I publish) to fix any windows bugs you may have found.

## Known Issues ## 

* The inquirer UI does not provide feedback when something goes wrong.
* I did not do any validation on user input. 

