import { Account, Client, Databases, Storage } from "appwrite";
import { Storage as StorageFile } from "./Storage";
import { Database as Schema } from "./Database";

export const AppwriteService = () => {
  const client = new Client();

  client.setEndpoint(import.meta.env.VITE_APPWRITE_CLIENT_ENDPOINT);
  client.setProject(import.meta.env.VITE_APPWRITE_CLIENT_ID);

  const storage = (bucket_id = null) => {
    const bucket = StorageFile(new Storage(client));
    bucket.setBucket(bucket_id);

    return bucket;
  };

  const database = (database_id = null) => {
    const schema = Schema(new Databases(client));
    schema.setDatabase(database_id);

    return schema;
  };

  const account = () => {
    return new Account(client);
  };

  return { storage, database, account };
};
