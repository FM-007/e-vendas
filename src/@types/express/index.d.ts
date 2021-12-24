declare namespace Express {
  // Adicionando id ao tipo Request
  export interface Request {
    user: {
      id: string;
    };
  }
}
