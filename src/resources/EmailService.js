import {
  sender_email,
  sender_name,
  mailjet_api_key,
  mailjet_secret_key,
} from "../configs/email";

export const sendEmail = async (name, email, subject, message) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.set(
    "Authorization",
    "Basic " + btoa(mailjet_api_key + ":" + mailjet_secret_key)
  );

  const data = JSON.stringify({
    Messages: [
      {
        From: { Email: sender_email, Name: sender_name },
        To: [{ Email: email, Name: name }],
        Subject: subject,
        TextPart: message,
      },
    ],
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: data,
  };

  return fetch("https://api.mailjet.com/v3.1/send", requestOptions);
};
