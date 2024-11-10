export class ApiResponse {
  constructor(
    public success: boolean,
    public message: String,
    public data: any,
  ) {}
}
