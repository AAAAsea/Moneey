import { ROLE } from '@/constants/org';

export type IOrgList = IOrgItem[];

export interface IOrgItem {
  id: number;
  name: string;
  creatorId: number;
  role: ROLE;
}

export type IOrgMemberList = IOrgMemberItem[];

export interface IOrgMemberItem {
  id: number;
  name: string;
  role: ROLE;
}

export interface IOrgInfo {
  id: number;
  name: string;
  creatorId: number;
  role: ROLE;
  members: IOrgMemberItem[];
}
