export const appWriteCollections = {
  collection_table: "6476318e5d93d1082bc4",
  organization_table: "647b8f363006c3b089cd",
  projects_table: "647b8f3eeadb714d7327",
  organization_roles_table: "64763158a667d0415fc3",
  organization_members_table: "647f3335e602454e7dc9"
};

export const appAPIConfigs = {
  headers: {
    "X-Appwrite-Project": import.meta.env.VITE_APPWRITE_CLIENT_ID,
    "Content-Type": "application/json",
    "X-Appwrite-Key": import.meta.env.VITE_APPWRITE_API_KEY,
  },
};
