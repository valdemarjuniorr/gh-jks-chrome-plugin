class GitInfo {
  constructor(gitUser, projectName, branch) {
    this.gitUser = gitUser;
    this.projectName = projectName;
    this.branch = branch;
  }
}


let gitUBranchInfo = $(".head-ref a").attr('title');
let gitInfo = getGitUser(gitUBranchInfo);

let clipboardIcon = $(".TableObject-item--primary clipboard-copy")
  .after(addIconLinkProd(gitInfo.projectName, gitInfo.gitUser, gitInfo.branch));
clipboardIcon.after(addIconLink(gitInfo.projectName, gitInfo.gitUser, gitInfo.branch));

function addIconLink(project, fork, branch) {
  let iconPath = chrome.extension.getURL('images/rsz_jenkins_sandbox.png');
  return "<span> <a target=_blank href=http://ci.contaazul.ninja:8080/job/ms-deploy-sandbox/buildWithParameters?delay=10sec&PROJECT=" + project + "&FORK=" + fork + "&BRANCH=" + branch + ">" +
    "<img title='Sandbox' src=" + iconPath + " class='margin-top'></a></span>";
}

function addIconLinkProd(project, fork, branch) {
  let iconPath = chrome.extension.getURL('images/rsz_cool-jenkins.png');
  return "<span> <a target=_blank href=http://ci.contaazul.ninja:8080/job/ms-deploy-prod/buildWithParameters?delay=10sec&PROJECT=" + project + "&FORK=" + fork + "&BRANCH=" + branch + ">" +
    "<img title='Production' src=" + iconPath + " class='margin-top'></a></span>";
}


function getGitUser(gitBranchInfo) {
  let userPosition = gitBranchInfo.search("/");
  let projectNamePosition = gitBranchInfo.search(":");

  let gitUser = gitBranchInfo.substring(0, userPosition);
  let projectName = gitBranchInfo.substring(parseInt(userPosition + 1), projectNamePosition);
  let branch = gitBranchInfo.substring(parseInt(projectNamePosition + 1), gitBranchInfo.length);

  return new GitInfo(gitUser, projectName, branch);
}

