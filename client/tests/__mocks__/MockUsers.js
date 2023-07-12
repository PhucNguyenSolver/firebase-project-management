import IUsers from '../../src/services/IUsers';

/**
 * A mock class that implements the IUsers interface.
 * @implements {IUsers}
 */
export default class MockUsers extends IUsers {
  /**
   * @private
   * @type {Map<string, UserDTO>}
   */
  #users = new Map();

  /**
   * Creates a new user.
   * @param {string} userId - The ID of the user to create.
   * @param {UserDTO} user - The user data to create.
   * @returns {Promise<void>}
   */
  async create(userId, user) {
    this.#users.set(userId, user);
  }

  /**
   * Reads a user by ID.
   * @param {string} userId - The ID of the user to read.
   * @returns {Promise<UserDTO | undefined>}
   */
  async read(userId) {
    return this.#users.get(userId);
  }
}
