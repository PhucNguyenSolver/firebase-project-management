import { doc, getDoc, setDoc } from 'firebase/firestore';
import IUsers, { UserDTO } from './IUsers'
import db from './persistent'

/**
 * 
 * @implements {IUsers}
 * @augments IUsers
 */
export default class Users extends IUsers {
  constructor() {
    this.db = db
    this.table = 'test.users'
  }

  async create(userId, user) {
    let ref = doc(this.db, this.table, userId).withConverter(userConverter)
    await setDoc(ref, user);
  }

  async read(userId) {
    let ref = doc(this.db, this.table, userId).withConverter(userConverter)
    let snapshot = await getDoc(ref)
    return snapshot.data()
  }
}

const userConverter = {
  toFirestore: (user) => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new UserDTO(data.id, data.name, data.email)
  },
};
