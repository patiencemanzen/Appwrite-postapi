/**
 * Handle Database(Appwrite)
 *
 * @param {Database} databases
 * @returns {Mixed}
 */
export const Database = (databaseService) => {
  const database = databaseService;
  const doc_id = Math.random().toString(16).slice(2);

  let database_id = null;
  let collection_id = null;

  /**
   * Set database id
   *
   * @param {String} database_id
   * @returns {Self}
   */
  const setDatabase = (database) => {
    database_id = database
      ? database
      : import.meta.env.VITE_APPWRITE_DATABASE_ID;
  };

  /**
   * Set collection id
   *
   * @param {String} collection_id
   * @returns {Self}
   */
  const collection = (collection) => {
    collection_id = collection;
  };

  /**
   * Register new document
   *
   * @param {Object} data
   * @returns {Promise}
   */
  const create = (data) => {
    return database.createDocument(database_id, collection_id, doc_id, data);
  };

  /**
   * Get all documents from collection
   *
   * @returns {Promise}
   */
  const index = (queries) => {
    return database.listDocuments(database_id, collection_id, queries);
  };

  /**
   * Get single document by id
   *
   * @param {String} document_id
   * @returns
   */
  const show = (document_id) => {
    return database.getDocument(database_id, collection_id, document_id);
  };

  /**
   * Get single document by id
   *
   * @param {String} document_id
   * @returns
   */
  const update = (document_id, new_document_data) => {
    return database.updateDocument(
      database_id,
      collection_id,
      document_id,
      new_document_data
    );
  };

  /**
   * Get single document by id
   *
   * @param {String} document_id
   * @returns
   */
  const destroy = (document_id) => {
    return database.deleteDocument(database_id, collection_id, document_id);
  };

  return { setDatabase, create, collection, index, show, destroy, update };
};
