// Sets the footer "Last updated" date from this page's own Last-Modified
// HTTP header, which S3/CloudFront set automatically on every deploy.
// If the fetch fails for any reason, the static fallback text in the HTML stays.
(function () {
  fetch(window.location.href, { method: 'HEAD', cache: 'no-store' })
    .then(function (res) {
      var lastModified = res.headers.get('Last-Modified');
      if (!lastModified) return;
      var date = new Date(lastModified);
      if (isNaN(date.getTime())) return;
      var formatted = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      var el = document.getElementById('last-updated');
      if (el) el.textContent = 'Last updated ' + formatted;
    })
    .catch(function () {
      // Network error, CSP block, etc. — leave the static fallback text as-is.
    });
})();
