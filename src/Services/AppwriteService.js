import { Account, Client, Databases, Storage } from "appwrite";

/**
 * Handle Bucket(storage)
 *
 * @param {Storage} storages
 * @returns {Mixed}
 */
export const StorageFile = (storages) => {
  const storage = storages;
  let bucket_id = null;
  let file_id = Math.random().toString(16).slice(2);

  /**
   * Set collection id
   *
   * @param {String} bucket_id
   * @returns {Self}
   */
  const setBucket = (new_bucket_id) => {
    bucket_id = new_bucket_id
      ? bucket_id
      : import.meta.env.VITE_APPWRITE_BUCKET_ID;
  };

  /**
   * Create newly file
   *
   * @param {Mixed} target_file
   * @returns {Promise}
   */
  const store = (target_file) => {
    return storage.createFile(bucket_id, file_id, target_file);
  };

  /**
   * Get all files in storage
   *
   * @param {String} file_id
   * @returns {Promise}
   */
  const index = () => {
    return storage.listFiles(bucket_id);
  };

  /**
   * Show single file by id in storage
   *
   * @param {String} file_id
   * @returns {Promise}
   */
  const show = (file_id) => {
    return storage.getFile(bucket_id, file_id);
  };

  /**
   * View single file content by id in storage
   *
   * @param {String} file_id
   * @returns {Promise}
   */
  const view = (file_id) => {
    return storage.getFileDownload(bucket_id, file_id);
  };

  /**
   * Delete single file in storage
   *
   * @param {String} file_id
   * @returns {Promise}
   */
  const destroy = (file_id) => {
    return storage.deleteFile(bucket_id, file_id);
  };

  return { setBucket, index, show, destroy, store, view };
};

/**
 * Handle Database(Appwrite)
 *
 * @param {Database} databases
 * @returns {Mixed}
 */
export const Database = (databases) => {
  const database = databases;
  let database_id = null;
  let collection_id = null;
  const doc_id = Math.random().toString(16).slice(2);

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
    console.log(collection_id);
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

export const AppwriteService = () => {
  const client = new Client();

  client.setEndpoint(import.meta.env.VITE_APPWRITE_CLIENT_ENDPOINT);
  client.setProject(import.meta.env.VITE_APPWRITE_CLIENT_ID);

  const storage = (bucket_id = null) => {
    const storage = StorageFile(new Storage(client));
    storage.setBucket(bucket_id);

    return storage;
  };

  const database = (database_id = null) => {
    const database = Database(new Databases(client));
    database.setDatabase(database_id);

    return database;
  };

  const account = () => {
    return new Account(client);
  };

  return { storage, database, account };
};
