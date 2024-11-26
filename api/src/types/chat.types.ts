export interface ICreateUserPayload {
  id: string;
  name: string;
  pictureUrl?: string;
}

export interface ICreateUserResponse {
  user: {
    id: string;
    createdAt: string;
    updatedAt: string;
    name: string;
    pictureUrl?: string;
  };
  key: string;
}
