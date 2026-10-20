# Send report sign-ups to your own Google Sheet

The "Get the full report" form on the Livewell Report site can write each
sign-up straight into a Google Sheet you own. It works on any host or domain.

## Set up (about 5 minutes)

1. Create a new Google Sheet (for example "Livewell Report sign-ups").
2. In the sheet, open **Extensions → Apps Script**.
3. Delete the sample code, paste in everything from `Code.gs`, and click **Save**.
4. Click **Deploy → New deployment**.
   - Select type: **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Click **Deploy**, approve the permissions Google asks for, and copy the
   **Web app URL** (it ends in `/exec`).
6. In `livewell/index.html`, find this line:

   ```js
   var SHEET_URL = '';
   ```

   and paste the URL between the quotes:

   ```js
   var SHEET_URL = 'https://script.google.com/macros/s/XXXX/exec';
   ```

7. Redeploy the site. Submit the form once yourself: a **Sign-ups** tab
   appears in the sheet with a row for your entry.

## Notes

- "Anyone" access only lets people add rows through the form. They cannot
  open or read the sheet.
- If you later edit `Code.gs`, use **Deploy → Manage deployments → Edit →
  New version** so the same URL keeps working.
- To be emailed on each sign-up, use **Tools → Notification settings** in
  the sheet.
- With `SHEET_URL` left empty, the form falls back to Netlify Forms.
