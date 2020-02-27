$("#buttonId").click(async function () {
  let sandboxJob = $('#sandbox').val();
  let productionJob = $('#production').val();
  saveStorage('sandbox', sandboxJob);
  saveStorage('production', productionJob);
});

function saveStorage(key, value) {
  chrome.storage.sync.set({[key]: value});
}
