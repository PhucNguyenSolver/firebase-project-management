/**
 * @typedef UserDTO
 * @type {object}
 * @property {string} id - The user's ID.
 * @property {string} name - The user's name.
 * @property {string} email - The user's email.
 */


/**
 * An interface for a class that supports CRUD operations on users.
 * @interface
 */
class IUsers {
  /**
   * Creates a new user.
   * @param {UserDTO} user - The user to create.
   * @returns {Promise<void>}
   */
  async create(user) { }

  /**
   * Reads a user by ID.
   * @param {string} id - The ID of the user to read.
   * @returns {Promise<UserDTO | undefined>}
   */
  async read(id) { }

  /**
   * Updates a user by ID.
   * @param {string} id - The ID of the user to update.
   * @param {Partial<UserDTO>} data - The data to update the user with.
   * @returns {Promise<void>}
   */
  async update(id, data) { }

  /**
   * Deletes a user by ID.
   * @param {string} id - The ID of the user to delete.
   * @returns {Promise<void>}
   */
  async delete(id) { }
}