// Receives "Get the full report" sign-ups from the Livewell Report site
// and appends each one as a row in this spreadsheet.

var SHEET_NAME = 'Sign-ups';
var HEADERS = ['Timestamp', 'Full name', 'Email', 'Organisation'];

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var p = e.parameter || {};
    // Honeypot field: real visitors never fill it in.
    if (p['bot-field']) return reply_('ignored');

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    if (sheet.getLastRow() === 0) sheet.appendRow(HEADERS);

    sheet.appendRow([new Date(), clean_(p.name), clean_(p.email), clean_(p.organisation)]);
    return reply_('success');
  } finally {
    lock.releaseLock();
  }
}

// Stop submitted text from being read as a spreadsheet formula.
function clean_(value) {
  var v = String(value || '').slice(0, 300);
  return /^[=+\-@]/.test(v) ? "'" + v : v;
}

function reply_(result) {
  return ContentService.createTextOutput(JSON.stringify({ result: result }))
    .setMimeType(ContentService.MimeType.JSON);
}
