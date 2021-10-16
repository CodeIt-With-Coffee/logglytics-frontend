interface IAuth {
  auth: boolean;
  login: (token: string) => void;
  logout: () => void;
}

export type { IAuth };
