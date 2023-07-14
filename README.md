# Project Management web-app
 
## About
- Can be used for personal tasks or collaborate project.
- To create and manage tasks in multiple workspaces (teams).
- Inspired by Notion board and Trello.
- [Link Deploy](https://thanhdatdelta.herokuapp.com/)(the old version)
> **Important:**
> I'm making the old version --> into my personal portfolio, 
> with [more features](#feature-request) and [more improvements]([#What-can-be-improved?])
> try out the new version here ...
 
## Technologies
- Frontend: `NodeJS` `Ant-Design` `Bootstrap`
- Backend: `Native-JS` `Firebase` (*Firestore* and *Authentication*)
 
## feature-request
- [x] login as guest
- [ ] add change-log workspace
      - [x] editable by admin account (nguyenhuuphuc.cse@gmail.com)
      - [x] available to guest account (login as guest)
      - [ ] read-only, but
      - [ ] anyone can leave comment or feature-request !?
- [ ] history feature: 
  - save events related to task. these include:
  - column changed (e.g. TODO -> In Progress)
  - assignee changed
  - use in combination with comment, date-created
- [ ] categorize task using tag (badge) 
- [ ] export csv
- [ ] markdown description feature
- [ ] chat feature
- [ ] backup data !?
- [ ] attach image feature !?

## What can be improved?
- [ ] Some quick fix to improve UI
  - autofocus text-input and submit-button
  - autofocus when open modal
- [ ] search in vietnamese not working (e.g "Phúc" did not work while "Phuc" work well)
- [x] enable scroll horizontal when there is many column
- [ ] exception when online user deleted from their workspace
- [ ] make these name unique: workspace, column
- [ ] assignee field should be optional (not required)
- [ ] I have no idea who is the workspace's admin
- [ ] I accidentally delete my workspace :(
- [x] save user's journey on reload
- [ ] show toast on success
- [ ] drag & drop

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
 
