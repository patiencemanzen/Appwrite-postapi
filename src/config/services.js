export const appWriteCollections = {
  collection_table: "6476318e5d93d1082bc4",
};

export const appAPIConfigs = {
  headers: {
    "X-Appwrite-Project": import.meta.env.VITE_APPWRITE_CLIENT_ID,
    "Content-Type": "application/json",
    "X-Appwrite-Key": import.meta.env.VITE_APPWRITE_API_KEY,
  },
};
