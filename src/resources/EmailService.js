import { host, username, password, from } from "../configs/email";

export const sendEmail = async (email, subject, message) => {
  return await window.Email.send({
    Host: host,
    Username: username,
    Password: password,
    To: email,
    From: from,
    Subject: subject,
    Body: message,
  });
};
