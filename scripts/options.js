$(document).ready(async function () {
  let sandboxJob = await getFromStorage('sandbox');
  $("#sandbox").val(sandboxJob);
  let productionJob = await getFromStorage('production');
  $("#production").val(productionJob);
});

$("#buttonId").click(async function () {
  let sandboxJob = $('#sandbox').val();
  let productionJob = $('#production').val();
  saveStorage('sandbox', sandboxJob);
  saveStorage('production', productionJob);
  $('#saved').show();

});

function saveStorage(key, value) {
  chrome.storage.sync.set({[key]: value});
}

async function getFromStorage(key) {
  return new Promise(res => chrome.storage.sync.get([key], result => res(result[key])));
}
