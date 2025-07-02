import * as yup from "yup";

export const ChatMessageSchema = yup.object().shape({
  message: yup
    .string()
    .required("Message is required")
    .trim()
    .min(1, "Message cannot be empty")
    .max(1000, "Message is too long (maximum 1000 characters)"),
});
