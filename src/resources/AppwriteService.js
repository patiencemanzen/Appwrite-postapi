import { Account, Client, Databases, Storage } from "appwrite";
import { Storage as StorageFile } from "./StorageService";
import { Database as Schema } from "./DatabaseService";

export const AppwriteService = () => {
  const client = new Client();

  client.setEndpoint(import.meta.env.VITE_APPWRITE_CLIENT_ENDPOINT);
  client.setProject(import.meta.env.VITE_APPWRITE_CLIENT_ID);

  // Bucket(storage)
  const storage = (bucket_id = null) => {
    const bucket = StorageFile(new Storage(client));
    bucket.setBucket(bucket_id);

    return bucket;
  };

  // Databases (Schema)
  const database = (database_id = null) => {
    const schema = Schema(new Databases(client));
    schema.setDatabase(database_id);

    return schema;
  };

  // Client Account
  const account = () => {
    return new Account(client);
  };

  return { storage, database, account };
};
