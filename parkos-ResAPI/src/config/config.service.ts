export class ApiConfigService {
  private AppPort: number = 8000

  set setAppPort(port: number) {
    this.AppPort = port;
  }
  
  get getAppPort():number {
    return this.AppPort
  }
}
