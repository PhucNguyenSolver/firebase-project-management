# Project Management web-app
 
## About
- To create and manage tasks in multiple workspaces.
- Can be used for one's tasks or team's projects.
- Inspired by Notion board and Trello.
- [Link Deploy](https://thanhdatdelta.herokuapp.com/)
 
## Development
- Frontend: `NodeJS` `Ant-Design` `Bootstrap`
- Backend: `Native-JS` `Firebase` (*Firestore* and *Authentication*)
 
## Useful Scripts
 
After you've got the codebase, you may need to install the app's dependencies:
### `npm install`
Wait for the installation to finish. You only need to do this for the first time.
 
You can run the command:
### `npm start`
 
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
 
The page will reload if you make edits.\
You will also see any lint errors in the console.
 
In development mode, you might want to host the Firestore locally. For more details, take a look at the document for [Firebase Emulator](https://firebase.google.com/docs/emulator-suite/connect_and_prototype)
### `firebase emulators:start`
 
### `npm build`
 
Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.
 
The build is minified, the filenames include the hashes.\
Your app is ready to be deployed!
 
See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
 
### What can be improved?
- Enhance the UI by adding drag & drop to move a task between columns.
- Make the navbar and top bar fit into screen size.
- More on user's permissions logic. What they can do and cannot.

