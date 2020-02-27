class GitInfo {

  constructor(gitForkBranchInfo) {
    this.gitForkBranchInfo = gitForkBranchInfo;
  }

  gitUser() {
    let userPosition = this.gitForkBranchInfo.search('/');
    return this.gitForkBranchInfo.substring(0, userPosition);
  }

  projectName() {
    let userPosition = this.gitForkBranchInfo.search('/');
    let projectNamePosition = this.gitForkBranchInfo.search(":");
    return this.gitForkBranchInfo.substring(parseInt(userPosition + 1), projectNamePosition);
  }

  branch() {
    let projectNamePosition = this.gitForkBranchInfo.search(":");
    return this.gitForkBranchInfo.substring(parseInt(projectNamePosition + 1), this.gitForkBranchInfo.length);
  }
}
