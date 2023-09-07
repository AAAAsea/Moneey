export interface IBaseUserInfo {
  userId: number;
  nickname: string;
  username: string;
}

export interface IOrganization {
  id: number;
  name: string;
  createdTime: string;
}

export type Organizations = IOrganization[];

export interface IUserState extends IBaseUserInfo {
  isLogin: boolean;
  token: string;
  organizations: Organizations;
}

export interface IUserProfile extends IBaseUserInfo {
  organizations: Organizations;
}

export interface IRegisterParams {
  username: string;
  password: string;
  nickname: string;
}

