import React from 'react';
import { Container } from 'semantic-ui-react';
import PDFDocument from 'pdfkit';

export const Invoice = () => {
  const doc = new PDFDocument();
  const stream = doc.pipe(blobStream());

  doc.rect(10, 130, 90, 17).fillOpacity(0.4).fill('grey');
  doc.rect(170, 130, 70, 17).fillOpacity(0.4).fill('grey');
  doc.rect(320, 130, 70, 17).fillOpacity(0.4).fill('grey');

  doc.rect(10, 180, 590, 17).fillOpacity(0.4).fill('grey');

  doc.rect(400, 345, 100, 15).fillOpacity(0.4).fill('grey');

  doc.font('Helvetica');
  doc.fillColor('black').fillOpacity(1);
  doc
    .fontSize(8)
    .text('INVOICE TO: XXXX Limited', 30, 30)
    .text('DELIVER TO: XXXX Limited', 180, 30)
    .text('Managed Integrity Evaluation (MIE)', 390, 30)
    .text('XXXX Limited', 30, 45)
    .text('XXXX Group', 180, 45)
    .text('Building 2', 390, 45)
    .text('P.O. Box 0000', 30, 60)
    .text('P.O. Box 509741', 180, 60)
    .text('Jean Park Chambers', 390, 60)
    .text('Randburg', 30, 75)
    .text('Randburg', 180, 75)
    .text('252 Jean Avenue', 390, 75)
    .text('2125', 30, 90)
    .text('2125', 180, 90)
    .text('Centurion', 390, 90)
    .text('0157', 390, 105);

  doc.text('VAT No. 400000', 30, 120);

  doc
    .strokeColor('#000000')
    .lineWidth(1)
    .moveTo(10, 130)
    .lineTo(600, 130)
    .stroke();

  doc.text('Inv. No.', 30, 135, { align: 'left' });
  doc.text('DFI 46100000', 110, 135, { align: 'left' });
  doc.text('DATE', 180, 135);
  doc.text('13 AUG 2021', 250, 135);
  doc.text('CUST. No.', 330, 135);
  doc.text('CXXXX0001', 400, 135);

  doc
    .strokeColor('#000000')
    .lineWidth(1)
    .moveTo(10, 145)
    .lineTo(600, 145)
    .stroke();

  doc
    .strokeColor('#000000')
    .lineWidth(1)
    .moveTo(10, 147)
    .lineTo(600, 147)
    .stroke();

  doc.text('CUST. ORDER', 30, 150, { align: 'left' });
  doc.text('PROJECT', 180, 150, { align: 'left' });
  doc.text('INV. CONTACT', 330, 150);
  doc.text('Danny Hlabatau', 400, 150);

  doc.text('REF. A', 30, 160);
  doc.text('12345', 110, 160);
  doc.text('CONTRACT', 180, 160);
  doc.text('BUS CONTACT', 330, 160);
  doc.text('REF. B', 30, 170);
  doc.text('None', 110, 170);
  doc.text('END CUST.', 180, 170);
  doc.text('SALES AREA', 330, 170);

  doc
    .strokeColor('#000000')
    .lineWidth(1)
    .moveTo(10, 180)
    .lineTo(600, 180)
    .stroke();

  doc
    .strokeColor('#000000')
    .lineWidth(1)
    .moveTo(10, 182)
    .lineTo(600, 182)
    .stroke();

  // Vertical lines

  doc
    .strokeColor('#000000')
    .lineWidth(1)
    .moveTo(100, 130)
    .lineTo(100, 180)
    .stroke();

  doc
    .strokeColor('#000000')
    .lineWidth(1)
    .moveTo(170, 130)
    .lineTo(170, 180)
    .stroke();

  doc
    .strokeColor('#000000')
    .lineWidth(1)
    .moveTo(240, 130)
    .lineTo(240, 180)
    .stroke();

  doc
    .strokeColor('#000000')
    .lineWidth(1)
    .moveTo(320, 130)
    .lineTo(320, 180)
    .stroke();

  doc
    .strokeColor('#000000')
    .lineWidth(1)
    .moveTo(390, 130)
    .lineTo(390, 180)
    .stroke();

  // Line items
  doc.text('Line', 30, 185);
  doc.text('Code', 70, 185);
  doc.text('Description', 110, 185);
  doc.text('Qty', 300, 185);
  doc.text('Unit', 330, 185);
  doc.text('Unit Price', 360, 185);
  doc.text('Nett Price', 500, 185);

  doc
    .strokeColor('#000000')
    .lineWidth(1)
    .moveTo(10, 195)
    .lineTo(600, 195)
    .stroke();

  doc.text('10', 30, 198);
  doc.text('5048', 70, 198);
  doc.text('Combined Credit Check - South Africa', 110, 198);
  doc.text('554.00', 300, 198);
  doc.text('ea', 330, 198);
  doc.text('9.0000', 360, 198);
  doc.text('50 835.04', 540, 198);

  doc.text('20', 30, 208);
  doc.text('9708', 70, 208);
  doc.text('Combined Sequestration', 110, 208);
  doc.text('136.00', 300, 208);
  doc.text('ea', 330, 208);
  doc.text('10.0000', 360, 208);
  doc.text('8 160.00', 540, 208);

  doc.text('30', 30, 218);
  doc.text('5133', 70, 218);
  doc.text('Compuscan Comprehensive - South Africa', 110, 218);
  doc.text('25.00', 300, 218);
  doc.text('ea', 330, 218);
  doc.text('15.0000', 360, 218);
  doc.text('748.25', 540, 218);

  doc.text('40', 30, 228);
  doc.text('5196', 70, 228);
  doc.text('Compuscan Comprehensive - South Africa', 110, 228);
  doc.text('25.00', 300, 228);
  doc.text('ea', 330, 228);
  doc.text('15.0000', 360, 228);
  doc.text('748.25', 540, 228);

  doc.text('50', 30, 238);
  doc.text('5197', 70, 238);
  doc.text('Compuscan Notices - South Africa', 110, 238);
  doc.text('35.00', 300, 238);
  doc.text('ea', 330, 238);
  doc.text('30.0000', 360, 238);
  doc.text('888.30', 540, 238);

  doc.text('60', 30, 248);
  doc.text('5048', 70, 248);
  doc.text('Combined Credit Check - South Africa', 110, 248);
  doc.text('554.00', 300, 248);
  doc.text('ea', 330, 248);
  doc.text('9.0000', 360, 248);
  doc.text('50 835.04', 540, 248);

  doc.text('70', 30, 258);
  doc.text('9708', 70, 258);
  doc.text('Combined Sequestration', 110, 258);
  doc.text('136.00', 300, 258);
  doc.text('ea', 330, 258);
  doc.text('10.0000', 360, 258);
  doc.text('8 160.00', 540, 258);

  doc.text('80', 30, 268);
  doc.text('5133', 70, 268);
  doc.text('Compuscan Comprehensive - South Africa', 110, 268);
  doc.text('25.00', 300, 268);
  doc.text('ea', 330, 268);
  doc.text('15.0000', 360, 268);
  doc.text('748.25', 540, 268);

  doc.text('90', 30, 278);
  doc.text('5196', 70, 278);
  doc.text('Compuscan Comprehensive - South Africa', 110, 278);
  doc.text('25.00', 300, 278);
  doc.text('ea', 330, 278);
  doc.text('15.0000', 360, 278);
  doc.text('748.25', 540, 278);

  doc.text('100', 30, 288);
  doc.text('5197', 70, 288);
  doc.text('Compuscan Notices - South Africa', 110, 288);
  doc.text('35.00', 300, 288);
  doc.text('ea', 330, 288);
  doc.text('30.0000', 360, 288);
  doc.text('888.30', 540, 288);

  doc
    .strokeColor('#000000')
    .lineWidth(1)
    .moveTo(10, 315)
    .lineTo(600, 315)
    .stroke();

  // Vertical lines

  doc
    .strokeColor('#000000')
    .lineWidth(1)
    .moveTo(55, 182)
    .lineTo(55, 300)
    .stroke();

  doc
    .strokeColor('#000000')
    .lineWidth(1)
    .moveTo(100, 182)
    .lineTo(100, 300)
    .stroke();

  doc
    .strokeColor('#000000')
    .lineWidth(1)
    .moveTo(280, 182)
    .lineTo(280, 300)
    .stroke();

  doc
    .strokeColor('#000000')
    .lineWidth(1)
    .moveTo(328, 182)
    .lineTo(328, 300)
    .stroke();

  doc
    .strokeColor('#000000')
    .lineWidth(1)
    .moveTo(352, 182)
    .lineTo(352, 300)
    .stroke();

  doc
    .strokeColor('#000000')
    .lineWidth(1)
    .moveTo(400, 182)
    .lineTo(400, 300)
    .stroke();

  doc
    .strokeColor('#000000')
    .lineWidth(1)
    .moveTo(599, 182)
    .lineTo(599, 300)
    .stroke();

  doc.text('NETT', 470, 320);
  doc.text('68 990.75', 540, 320);
  doc.text('TOTAL VAT', 450, 335);
  doc.text('10 290.75', 540, 335);

  doc
    .strokeColor('#000000')
    .lineWidth(1)
    .moveTo(10, 330)
    .lineTo(600, 330)
    .stroke();

  doc
    .strokeColor('#000000')
    .lineWidth(1)
    .moveTo(10, 345)
    .lineTo(600, 345)
    .stroke();

  doc.text('PAYMENT TERMS', 20, 350);
  doc.text('30 Days from Statement', 110, 350);

  doc.font('Helvetica-BoldOblique');
  doc.text('TOTAL AMOUNT ZAR', 410, 350);
  doc.text('79 339.36', 510, 350);

  doc.font('Helvetica');

  doc
    .strokeColor('#000000')
    .lineWidth(1)
    .moveTo(10, 360)
    .lineTo(600, 360)
    .stroke();

  // Vertical lines

  doc
    .strokeColor('#000000')
    .lineWidth(1)
    .moveTo(500, 315)
    .lineTo(500, 360)
    .stroke();

  doc
    .strokeColor('#000000')
    .lineWidth(1)
    .moveTo(170, 130)
    .lineTo(170, 180)
    .stroke();

  doc.text('ENQUIRIES', 20, 365);
  doc.text('MIE Accounts', 110, 365);
  doc.text('EMAIL', 20, 375);
  doc.text('TELEPHONE', 20, 385);
  doc.text('accounts@mie.co.za', 110, 385);

  doc
    .strokeColor('#000000')
    .lineWidth(1)
    .moveTo(10, 395)
    .lineTo(600, 395)
    .stroke();

  doc.font('Helvetica-BoldOblique');
  doc.text('* ITEMS MARKED, INDICATES NO VAT', 20, 400);

  doc
    .strokeColor('#000000')
    .lineWidth(1)
    .moveTo(10, 410)
    .lineTo(600, 410)
    .stroke();

  doc.font('Helvetica');

  doc.text('BANK', 20, 415);
  doc.text('Standard Bank - 411372386', 110, 415);
  doc.text('ACCOUNT', 20, 425);
  doc.text('411372386', 110, 425);
  doc.text('BRANCH', 20, 435);
  doc.text('Centurion/012645', 110, 435);
  doc.text('SWIFT CODE', 20, 445);
  doc.text('SBZAZAJJ', 110, 445);
  doc.text('IBAN', 20, 455);
  doc.text('DFI 46175568', 110, 455);
  doc.text('REFERENCE', 20, 465);

  doc
    .strokeColor('#000000')
    .lineWidth(1)
    .moveTo(10, 475)
    .lineTo(600, 475)
    .stroke();

  doc.font('Helvetica-BoldOblique');
  doc.text('** PLEASE USE INVOICE NUMBER AS PAYMENT REFERENCE **', 20, 480);

  doc
    .strokeColor('#000000')
    .lineWidth(1)
    .moveTo(10, 490)
    .lineTo(600, 490)
    .stroke();

  // end and display the document in the iframe to the right
  doc.end();
  stream.on('finish', function () {
    iframe.src = stream.toBlobURL('application/pdf');
  });
  return <Container>Invoice</Container>;
};
