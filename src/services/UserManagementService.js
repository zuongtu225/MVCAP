class UserManagementService {
  getUsers(requestModel) {
    const userRepository = new UserRepository();
    const userEntities: UserEntity[] = userRepository.getUsers();

    const userManagementResponseModel = new UserManagementResponseModel();
    userManagementResponseModel.users = [];

    for (const userEntity of userEntities) {
      const user = new User();
      user.fullName = `${userEntity.firstName} ${userEntity.lastName}`;
      user.email = userEntity.email;
      userManagementResponseModel.users.push(user);
    }

    return userManagementResponseModel;
  }
}
