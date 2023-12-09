// userEntity.ts
export class UserEntity {
  public id: number;
  public username: string;
  public password: string;
  public points: number; // Add this property

  constructor(id: number, username: string, password: string, points: number) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.points = points;
  }
}
