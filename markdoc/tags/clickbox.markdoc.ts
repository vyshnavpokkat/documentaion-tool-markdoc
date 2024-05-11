import { ClickBox } from "../../components/ClickBox";

export const clickbox = {
  render: ClickBox,
  children: ['paragraph', 'tag', 'list'],
  attributes: {
    title: {
      type: String,
    },
  },
};
