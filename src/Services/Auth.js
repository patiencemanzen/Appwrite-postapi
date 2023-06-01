import { AppwriteService } from "./AppwriteService";

export const Auth = () => {
  /**
   * Get loggedin user
   * @returns {Boolean}
   */
  const user = () => {
    return AppwriteService().account().get();
  };

  /**
   * Check if user is loggedin
   * @returns {Boolean}
   */
  const check = () => {
    return AppwriteService()
      .account()
      .get()
      .then(() => true)
      .catch(() => false);
  };

  return { user, check };
};
