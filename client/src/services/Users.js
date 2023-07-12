import { getFirestore, collection, addDoc, getDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';


/**
 * A class that implements the {@link IUsers} interface and supports CRUD operations on users.
 * @implements {IUsers}
 */
class Users {
  constructor() {
    this.db = getFirestore();
    this.usersCollection = collection(this.db, 'test.users');
  }

  async create(user) {
    await addDoc(this.usersCollection, user);
  }

  async read(id) {
    const userDoc = await getDoc(doc(this.usersCollection, id));
    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      return undefined;
    }
  }

  async update(id, data) {
    await updateDoc(doc(this.usersCollection, id), data);
  }

  async delete(id) {
    await deleteDoc(doc(this.usersCollection, id));
  }
}
