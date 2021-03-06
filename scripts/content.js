$(document).ready(async function () {
  let gitUBranchInfo = $(".head-ref a").attr('title');
  let gitInfo = new GitInfo(gitUBranchInfo);

  let htmlComponentGenerator = new HtmlComponentGenerator(gitInfo);

  let clipboardIcon = $(".js-clipboard-copy");
  clipboardIcon.after(await htmlComponentGenerator.production());
  clipboardIcon.after(await await htmlComponentGenerator.sandbox());

});
