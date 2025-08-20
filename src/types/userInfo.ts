export type UserInfo = {
  id: string;
  name: string;
  email?: string;
  image: string | null;
  createdAt: Date | null | undefined;
};
