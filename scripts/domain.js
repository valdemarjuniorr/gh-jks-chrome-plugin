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

class ChromeStorage {

  async get(key) {
    return new Promise(res => chrome.storage.sync.get([key], result => res(result[key])));
  }

  save(key, value) {
    chrome.storage.sync.set({[key]: value});
  }
}

class HtmlComponentGenerator {
  constructor(gitInfo) {
    this.gitInfo = gitInfo;
    this.storage = new ChromeStorage();
  }

  async sandbox() {
    let sandboxJob = await this.storage.get('sandbox')
    return this.generateLink('Sandbox', sandboxJob, this.getSandboxIcon())
  }

  async production() {
    let productionJob = await this.storage.get('production')
    return this.generateLink('Production', productionJob, this.getProductionIcon())
  }

  generateLink(title, jobName, iconPath) {
    return "<span> <a target=_blank href=http://ci.contaazul.ninja:8080/job/" + jobName + "/buildWithParameters?delay=5sec&PROJECT=" + this.gitInfo.projectName() + "&FORK=" + this.gitInfo.gitUser() + "&BRANCH=" + this.gitInfo.branch() + ">" +
      "<img title='" + title + "' src=" + iconPath + " class='margin-top'></a></span>";
  }

  getSandboxIcon() {
    return chrome.extension.getURL('images/rsz_jenkins_sandbox.png');
  }
  getProductionIcon() {
    return chrome.extension.getURL('images/rsz_cool-jenkins.png');
  }
}
