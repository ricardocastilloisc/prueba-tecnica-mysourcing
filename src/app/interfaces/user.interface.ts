export interface User {
  name: {
    first: string;
    last: string;
  };
  email: string;
  nat: string;
  picture: {
    medium: string;
  };
}

export interface RandomUserResponse {
  results: User[];
}

export interface UserTableRow {
  photo: string;
  first_name: string;
  last_name: string;
  email: string;
  nationality: string;
}
