# Project Management web-app
 
## About
- Can be used for personal tasks or collaborate project.
- To create and manage tasks in multiple workspaces (teams).
- Inspired by Notion board and Trello.

> **Important:**
> I'm making the [initial version]((https://thanhdatdelta.herokuapp.com/)) --> into my personal project,
> with [more features](#feature-request) and [more improvements]([#What-can-be-improved?])
> try out the new version at: <https://deltaplus.netlify.app/>
 
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

## Installation 

Pre-requisite:

- Tested on node:18
- ReactJS - [setup guide](https://www.geeksforgeeks.org/how-to-install-reactjs-on-windows/)

This project consists of 2 seperate folder:
- `client`: React app
- `node-server` (in the future): connect with DB and support CRUD operations

<!-- ### to start node-server
you may want to change MongoDB config [here](node-server\app\config\db.config.js)

```console
cd node-server
npm install
npm start
``` -->

<!-- The server will be listening on [localhost:8080](http://localhost:8080) -->

### to start React app

```console
cd client
npm install
npm start
```
The app will be available at [localhost:3000](http://localhost:3000)

you might want to change the `firebase/config` in [this file](./client/src/firebase/config.js)

you might also want to use `firebase emulator` for local dev environment. check out the [documentation](https://firebase.google.com/docs/emulator-suite/connect_and_prototype)

 
