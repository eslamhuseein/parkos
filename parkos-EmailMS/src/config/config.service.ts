export class ApiConfigService {
  private AppPort: number = 11001

  set setAppPort(port: number) {
    this.AppPort = port;
  }
  
  get getAppPort():number {
    return this.AppPort
  }
}
