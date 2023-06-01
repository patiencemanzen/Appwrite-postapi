/**
 * Handle Bucket(storage)
 *
 * @param {Storage} storages
 * @returns {Mixed}
 */
export const Storage = (storageService) => {
  const storage = storageService;
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
