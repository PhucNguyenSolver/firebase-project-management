export class UserDTO {
  constructor(id, name, email) {
    this.id = id
    this.name = name
    this.email = email
  }

  toString() { return [this.id, this.name, this.email].join(', ') }
}


/**
 * An interface for a class that supports CRUD operations on users.
 * @interface
 */
export default class IUsers {
  /**
   * Creates a new user.
   * @param {string} userId - The ID of the user to create.
   * @param {UserDTO} user - The user data to create.
   * @returns {Promise<void>}
   */
  async create(userId, user) { }

  /**
   * Reads a user by ID.
   * @param {string} userId - The ID of the user to read.
   * @returns {Promise<UserDTO | undefined>}
   * return undefined if not found
   */
  async read(userId) { }
}