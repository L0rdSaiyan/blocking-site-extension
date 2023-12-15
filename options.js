document.addEventListener('DOMContentLoaded', function() {
  const urls = document.getElementById("urls");
  const storage = document.getElementById("storage");
  const checkbox = document.getElementById("checkbox");
  const checkboxPlaceholder = document.getElementById("placeholder")
  const toggle = document.getElementById("switch")
  const credits = document.getElementById("credits")

  toggle.addEventListener("change", function(){

    if (this.checked) {
        console.log("Checkbox is checked..");
        storage.innerText = 'Save!'
        checkboxPlaceholder.innerText = 'Enabled?'
        credits.innerText = 'Made by: João Victor'
      } else {
        console.log("Checkbox is not checked..");
        storage.innerText = 'Salvar!'
        checkboxPlaceholder.innerText = 'Habilitado?'
        credits.innerText = 'Feito por: João Victor'
      }

  })

  storage.addEventListener("click", () => {
      const blocked = urls.value.split("\n").map(s => s.trim()).filter(Boolean);
      chrome.storage.local.set({ blocked });
  });

  checkbox.addEventListener("change", (event) => {
      const enabled = event.target.checked;
      chrome.storage.local.set({ enabled });
  });

  chrome.storage.local.get(["blocked", "enabled"], function (local) {
      const { blocked, enabled } = local;
      if (Array.isArray(blocked)) {
          urls.value = blocked.join("\n");
      }
      if (typeof enabled === "boolean") {
          checkbox.checked = enabled;
      }
  });
});
