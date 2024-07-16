import {User} from "../users/models/User";

export interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}
