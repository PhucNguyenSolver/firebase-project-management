import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore"
import db from "./persistent"

export class WorkspaceDTO {
  constructor(name, owner, members, columns) {
    this.name = name
    this.columns = columns
    this.members = members
    this.owner = owner
  }
  withId(id) {
    this.id = id
    return this
  }
  toString() { return JSON.stringify(this) }
}


/**
 * An interface for a class that supports CRUD operations on users.
 * @interface
 */
export default class WorkspaceService {
  constructor() {
    this.db = db
    this.table = 'workspace'
    // this.table = 'test.workspace'
    this.collection = collection(this.db, this.table).withConverter(workspaceConverter)
  }

  async create(workspace) {
    let { name, owner, members, columns } = workspace

    let existing = await this.getByMemberId(owner)
    let sameName = existing.filter(ws => ws.name === name)[0]
    if (sameName) throw new Error("workspace's name already in used: " + name)

    let snapshot = await addDoc(this.collection, workspace);
    return snapshot.id
  }

  /**
   * 
   * @param {string} workspaceId
   * @returns {Promise<WorkspaceDTO | undefined>}
   * @throws if not found
   */
  async getById(workspaceId) {
    let snapshot = await getDoc(doc(this.collection, workspaceId))
    if (snapshot.exists()) return snapshot.data()
    else throw new Error('workspace not exist: ' + workspaceId)
  }

  /**
   * 
   * @param {string} memberId
   * @returns {Promise<WorkspaceDTO[]>}
   */
  async getByMemberId(memberId) {
    let cond = where('memberIdList', 'array-contains', memberId)
    let snapshot = await getDocs(query(this.collection, cond))
    return snapshot.docs.map(any => any.data())
  }

  async rename(workspaceId, newName) {
    let ref = doc(this.collection, workspaceId)
    await updateDoc(ref, { "name": newName })
  }

  async addMember(workspaceId, memberId) {
    let oldMembers = (await this.getById(workspaceId)).members
    if (oldMembers.includes(memberId)) return
    let ref = doc(this.collection.workspaceId)
    await updateDoc(ref, { "members": [...oldMembers, memberId] })
  }

  async delete(workspaceId) {
    let ref = doc(this.collection, workspaceId)
    await deleteDoc(ref)
  }
}

const workspaceConverter = {
  toFirestore: (ws) => {
    return {
      name: ws.name,
      createdById: ws.owner,
      columnIdList: ws.columns,
      memberIdList: ws.members,
      createdAt: serverTimestamp(),
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    // console.log({ snapshot, data })
    return new WorkspaceDTO(
      data.name,
      data.createdById,
      data.memberIdList,
      data.columnIdList,
    )
      .withId(snapshot.id)
  },
};
