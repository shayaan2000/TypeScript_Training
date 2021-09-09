# Modal Window Project

## Description
This is a simple mini-project for displaying a Modal Window on the screen upon clicking a button. 

It has been developed using HTML, Sass, and TypeScript.

## Requirements
- [NodeJs v14](https://nodejs.org/en/download)

## Running the App
The process of trying the project out is really simple:
1. Clone the repository and navigate to 03-Modal-Project/
2. Open the index.html file in your browser (make sure JavaScript is enabled)

## Project Structure
Inside the 03-Modal-Project directory, we have: 

Item | Descritpion |
--- | --- |
index.html file| The main HTML file for the project|
tsconfig.json file| For setting options for the typescript|
src directory| Contains the main typescript file, main.ts|
dist directory| Contains the emitted javascript file, main.ts|
css directory| Contains the relevant css and scss files|

## Project Setup
To setup the project, you need to:

- #### Install NodeJs
  Refer to [this link](https://nodejs.org/en/download) to download and install NodeJs

- #### Install TypeScript
  Once you have NodeJs installed, you can use node package manager to install typescript.

  The following command will install typescript globally:
  ``` 
  npm i typescript -g
  ```

  You can then check the version of the typescript:
  ```
  tsc -v
  ```

  To run typescript program in watchmode, use the below command.

  This command will work when your run it in the project directory as the tsconfig.js already has rootDir set to "./src"
  ```
  tsc -w
  ```

- #### Install SASS
  Finally, to use Sass, you can either use a plugin such as "Watch Sass" in your editor, or you can install Sass using npm with the below command:
  ```
  npm install -g sass
  ```

  The sass code then can be compiled:
  ```
  sass --watch main.scss main.css
  ```

