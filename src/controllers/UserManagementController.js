class UserManagementController {
  getUsers(requestModel) {
    const userManagementService = new UserManagementService();
    const userManagementRequestModel =
      userManagementService.getUsers(requestModel);

    return userManagementRequestModel;
  }
}
