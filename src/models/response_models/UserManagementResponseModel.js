class UserManagementResponseModel extends BaseResponeModel {
  users: User[];
}

class User {
  fullName;
  email;
}
