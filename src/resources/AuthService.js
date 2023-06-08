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

  const guard = async (to, from, next) => {
    return AppwriteService()
      .account()
      .get()
      .then(() => next())
      .catch(() => {
        if (to.name == "home") {
          next({ name: "home" });
        } else {
          next({ name: "login" });
        }
      });
  };

  return { user, check, guard };
};
