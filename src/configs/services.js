/**
 * Appwrite Collections Keys
 * @return {Object}
 */
export const appwriteCollections = {
  collection_table: import.meta.env.VITE_APPWRITE_COLLECTIONS,
  organization_table: import.meta.env.VITE_APPWRITE_ORGANIZATIONS,
  projects_table: import.meta.env.VITE_APPWRITE_PROJECTS,
  organization_roles_table: import.meta.env.VITE_APPWRITE_ORGANIZATION_ROLES,
  organization_members_table: import.meta.env.VITE_APPWRITE_ORGANIZATION_MEMBERS,
  notifications_table: import.meta.env.VITE_APPWRITE_NOTIFICATIONS,
  invitations_table: import.meta.env.VITE_APPWRITE_INVITATIONS,
};

/**
 * Appwrite apis configs
 * @return {Object}
 */
export const appwriteAuthHeader = {
  headers: {
    "X-Appwrite-Project": import.meta.env.VITE_APPWRITE_CLIENT_ID,
    "Content-Type": "application/json",
    "X-Appwrite-Key": import.meta.env.VITE_APPWRITE_API_KEY,
  },
};
