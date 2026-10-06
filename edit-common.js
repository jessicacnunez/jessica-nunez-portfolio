(function () {
  var STYLE = "\n" +
    "#edit-bar{position:fixed;left:50%;bottom:24px;transform:translateX(-50%);z-index:100;display:flex;align-items:center;gap:10px;background:#26202B;padding:10px 14px;border-radius:999px;box-shadow:0 8px 24px rgba(0,0,0,0.25);font-family:'Space Grotesk',sans-serif}\n" +
    "#edit-bar button{font-family:'Space Grotesk',sans-serif;font-weight:500;font-size:13px;border:none;border-radius:999px;padding:9px 16px;cursor:pointer}\n" +
    "#edit-toggle{background:#F5EEDF;color:#26202B}\n" +
    "#edit-toggle.on{background:#C1401E;color:#F5EEDF}\n" +
    "#edit-save{background:#6E3159;color:#F5EEDF;display:none}\n" +
    "#edit-status{font-size:12px;color:rgba(245,238,223,0.75);min-width:60px}\n" +
    "body.editing-mode [data-key]{cursor:text;border-radius:2px}\n" +
    "body.editing-mode [data-key]:hover,body.editing-mode [data-key]:focus{outline:2px dashed #C1401E;outline-offset:4px}\n";

  var pristineRoot = null;

  function buildHtml() {
    var clone = pristineRoot.cloneNode(true);
    document.querySelectorAll('[data-key]').forEach(function (liveEl) {
      var key = liveEl.getAttribute('data-key');
      var sel = '[data-key="' + key.replace(/"/g, '\\"') + '"]';
      var cloneEl = clone.querySelector(sel);
      if (cloneEl) cloneEl.innerHTML = liveEl.innerHTML;
    });
    return '<!doctype html>\n' + clone.outerHTML;
  }

  function init() {
    // Snapshot the page's pristine structure before any editing UI or edits touch it.
    pristineRoot = document.documentElement.cloneNode(true);

    var styleEl = document.createElement('style');
    styleEl.textContent = STYLE;
    document.head.appendChild(styleEl);

    var bar = document.createElement('div');
    bar.id = 'edit-bar';
    bar.innerHTML =
      '<button id="edit-toggle" type="button">Edit content</button>' +
      '<button id="edit-save" type="button">Save changes</button>' +
      '<span id="edit-status"></span>';
    document.body.appendChild(bar);

    var toggleBtn = document.getElementById('edit-toggle');
    var saveBtn = document.getElementById('edit-save');
    var status = document.getElementById('edit-status');
    var editing = false;
    var artifactApi = null;

    function setEditing(on) {
      editing = on;
      document.querySelectorAll('[data-key]').forEach(function (el) {
        el.contentEditable = on ? 'true' : 'false';
      });
      document.body.classList.toggle('editing-mode', on);
      toggleBtn.classList.toggle('on', on);
      toggleBtn.textContent = on ? 'Exit edit mode' : 'Edit content';
      saveBtn.style.display = on ? 'inline-block' : 'none';
      status.textContent = on ? 'Click any text to edit it' : '';
    }

    toggleBtn.addEventListener('click', function () {
      setEditing(!editing);
    });

    // Pressing Enter inside a contenteditable <p>/<h*>/<span> can make the
    // browser split it into new sibling block elements (a <div> can't legally
    // live inside a <p>, so the browser closes it and starts a fresh one
    // outside the original tag). That new element has none of the page's
    // classes or inline styles, so it shows up as an extra paragraph in the
    // wrong font. Force a plain line break instead, except inside editable
    // lists (<ul>/<ol>), where a new <li> on Enter is the expected behavior.
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Enter' || e.shiftKey || e.isComposing) return;
      var host = e.target && e.target.closest ? e.target.closest('[data-key]') : null;
      if (!host || host.contentEditable !== 'true') return;
      if (host.tagName === 'UL' || host.tagName === 'OL') return;
      e.preventDefault();
      var sel = window.getSelection();
      if (!sel || !sel.rangeCount) return;
      var range = sel.getRangeAt(0);
      range.deleteContents();
      var br = document.createElement('br');
      range.insertNode(br);
      range.setStartAfter(br);
      range.setEndAfter(br);
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
    });

    saveBtn.addEventListener('click', function () {
      save();
    });

    async function save() {
      status.textContent = 'Saving…';
      var html = buildHtml();
      if (!artifactApi) {
        status.textContent = 'Open the shared preview link (not a local file) to save.';
        return;
      }
      try {
        await artifactApi.publish(html);
        status.textContent = 'Saved ✓';
        setTimeout(function () {
          if (status.textContent === 'Saved ✓') status.textContent = '';
        }, 3000);
      } catch (e) {
        status.textContent = 'Could not save (' + ((e && e.code) || 'error') + ')';
      }
    }

    if (window.claude && typeof window.claude.use === 'function') {
      window.claude.use('artifact').then(function (api) {
        artifactApi = api;
        if (!api) status.textContent = 'Read-only view — editing is off here.';
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
