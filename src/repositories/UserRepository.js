class UserRepository {
  async getUsers() {
    const listUsers: UserEntity[] = await UserEntity.findAll();
    return listUsers;
  }
}
