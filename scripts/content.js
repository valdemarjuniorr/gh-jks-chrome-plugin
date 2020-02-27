$(document).ready(async function () {
  let gitUBranchInfo = $(".head-ref a").attr('title');
  let gitInfo = getGitUser(gitUBranchInfo);

  let clipboardIcon = $(".TableObject-item--primary clipboard-copy")
    .after(await addIconLinkProd(gitInfo));
  clipboardIcon.after(await addIconLink(gitInfo));

  async function addIconLink(gitInfo) {
    let sandboxJob = await getFromStorage('sandbox');
    let iconPath = chrome.extension.getURL('images/rsz_jenkins_sandbox.png');
    return generateLink('SandBox', sandboxJob, iconPath, gitInfo);
  }

  async function addIconLinkProd(gitInfo) {
    let productionJob = await getFromStorage('production');
    let iconPath = chrome.extension.getURL('images/rsz_cool-jenkins.png');
    return generateLink('Production', productionJob, iconPath, gitInfo)
  }
});

async function generateLink(title, jobName, iconPath, gitInfo) {
  return "<span> <a target=_blank href=http://ci.contaazul.ninja:8080/job/" + jobName + "/buildWithParameters?delay=5sec&PROJECT=" + gitInfo.projectName + "&FORK=" + gitInfo.gitUser + "&BRANCH=" + gitInfo.branch + ">" +
    "<img title='" + title + "' src=" + iconPath + " class='margin-top'></a></span>";
}

class GitInfo {
  constructor(gitUser, projectName, branch) {
    this.gitUser = gitUser;
    this.projectName = projectName;
    this.branch = branch;
  }
}

async function getFromStorage(key) {
  return new Promise(res => chrome.storage.sync.get([key], result => res(result[key])));
}

function getGitUser(gitBranchInfo) {
  let userPosition = gitBranchInfo.search("/");
  let projectNamePosition = gitBranchInfo.search(":");

  let gitUser = gitBranchInfo.substring(0, userPosition);
  let projectName = gitBranchInfo.substring(parseInt(userPosition + 1), projectNamePosition);
  let branch = gitBranchInfo.substring(parseInt(projectNamePosition + 1), gitBranchInfo.length);

  return new GitInfo(gitUser, projectName, branch);
}

