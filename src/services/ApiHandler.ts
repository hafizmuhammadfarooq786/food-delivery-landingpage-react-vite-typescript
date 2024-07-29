export interface ApiHandler {
  get<Query, Res>(path: string, query?: Query): Promise<Res>;

  post<Req, Res>(path: string, req: Req): Promise<Res>;

  patch<Req, Res>(path: string, req: Req): Promise<Res>;

  delete<Req, Res>(path: string, req: Req): Promise<Res>;
}
