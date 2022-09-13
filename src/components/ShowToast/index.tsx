import { notification } from "antd";

interface IMessage {
  message: string;
  description: string;
  type: "success" | "info" | "warning" | "error";
}

export const showToast = ({ message, description, type }: IMessage) => {
  notification[type]({
    message: `${message}`,
    description: `${description}`,
  });
};
