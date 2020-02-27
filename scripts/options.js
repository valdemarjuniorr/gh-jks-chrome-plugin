$(document).ready(async function () {
  let storage = new ChromeStorage();
  let sandboxJob = await storage.get('sandbox');
  $("#sandbox").val(sandboxJob);

  let productionJob = await storage.get('production');
  $("#production").val(productionJob);

});

$("#buttonId").click(async function () {
  $('#saved').hide();
  let storage = new ChromeStorage();

  let sandboxJob = $('#sandbox').val();
  storage.save('sandbox', sandboxJob);

  let productionJob = $('#production').val();
  storage.save('production', productionJob);

  $('#saved').show("slow");
});
