document.addEventListener('DOMContentLoaded', function() {
  const urls = document.getElementById("urls");
  const storage = document.getElementById("storage");
  const checkbox = document.getElementById("checkbox");

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
