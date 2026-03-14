// lib/emailLayout.js
// Shared branded HTML wrapper for all Budget Ndio Story emails

export function emailLayout({ previewText = '', body }) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
  <title>Budget Ndio Story</title>
  <!--[if mso]><noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript><![endif]-->
  <style>
    body, html { margin: 0; padding: 0; background: #f4f6f9; font-family: Arial, Helvetica, sans-serif; }
    .wrapper   { width: 100%; background: #f4f6f9; padding: 32px 0; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff;
                 border-radius: 8px; overflow: hidden;
                 border: 1px solid #e0e4ea; }
    .header    { background: #1A5276; padding: 28px 32px; }
    .header h1 { color: #ffffff; margin: 0; font-size: 20px; font-weight: 700; letter-spacing: 0.5px; }
    .header p  { color: #a8c5e0; margin: 4px 0 0; font-size: 13px; }
    .body      { padding: 32px; color: #333333; font-size: 15px; line-height: 1.7; }
    .body h2   { color: #1A5276; font-size: 18px; margin: 0 0 12px; }
    .body p    { margin: 0 0 16px; }
    .btn       { display: inline-block; padding: 13px 28px; background: #1E8449;
                 color: #ffffff !important; text-decoration: none; border-radius: 6px;
                 font-weight: 700; font-size: 15px; margin: 8px 0 20px; }
    .divider   { border: none; border-top: 1px solid #e8ecf0; margin: 24px 0; }
    .meta      { background: #f8fafc; padding: 16px 32px; border-top: 1px solid #e0e4ea; }
    .meta p    { margin: 0; font-size: 12px; color: #888; line-height: 1.6; }
    .meta a    { color: #1A5276; text-decoration: none; }
    .badge     { display: inline-block; background: #eaf4ff; color: #1A5276;
                 border-radius: 4px; padding: 2px 10px; font-size: 12px;
                 font-weight: 700; margin-bottom: 16px; }
    .amount    { font-size: 28px; font-weight: 700; color: #1E8449; }
    .info-row  { display: flex; justify-content: space-between; padding: 8px 0;
                 border-bottom: 1px solid #f0f0f0; font-size: 14px; }
    .info-row span:first-child { color: #888; }
    .info-row span:last-child  { font-weight: 600; color: #333; }
  </style>
</head>
<body>
  ${previewText ? `<div style="display:none;max-height:0;overflow:hidden;color:#f4f6f9;">${previewText}</div>` : ''}
  <div class="wrapper">
    <div class="container">
      <div class="header">
        <h1>Budget Ndio Story</h1>
        <p>Kenya's civic budget platform</p>
      </div>
      <div class="body">
        ${body}
      </div>
      <div class="meta">
        <p>
          Budget Ndio Story &nbsp;·&nbsp; Nairobi, Kenya<br/>
          <a href="https://budgetndiostory.org">budgetndiostory.org</a>
          &nbsp;·&nbsp;
          <a href="mailto:info@budgetndiostory.org">info@budgetndiostory.org</a>
        </p>
      </div>
    </div>
  </div>
</body>
</html>`.trim();
}
