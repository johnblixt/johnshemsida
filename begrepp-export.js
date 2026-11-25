/* ════════════════════════════════════════════════════════════
   begrepp-export.js — Word-nedladdning från begreppssidor
   ────────────────────────────────────────────────────────────
   Exponerar window.BegreppExport med:
     BegreppExport.exportList(concepts, meta)      → begreppslista med förklaringar
     BegreppExport.exportCutCards(concepts, meta)  → klipp-ut-kort utan förklaring

   concepts: [{ term, definition }]  (även `def` accepteras)
   meta: {
     title:      'Ekonomisk politik',        // områdets namn
     course:     'Samhällskunskap 1a2',      // kursens fulla namn
     short:      'Sa1a2',                    // kort kursnamn på korten
     fileBase:   PROGRESS_ID,                // filnamnets bas (utan .docx)
     color:      PRIMARY,                    // ämnets primärfärg (#hex)
     colorLight: PRIMARY_LIGHT,              // ljus bakgrund (#hex)
     colorText:  PRIMARY_TEXT,               // mörk text på färg (#hex)
     getDefinition: (c) => c.definition      // valfri — t.ex. för Enkel svenska
   }

   docx.js laddas först när någon klickar (påverkar inte sidans laddtid).
   ════════════════════════════════════════════════════════════ */
(function () {
  var DOCX_URL = 'https://unpkg.com/docx@9.16.0/dist/index.iife.js';
  var FONT = 'Calibri';
  var loading = null;

  function loadDocx() {
    if (window.docx) return Promise.resolve(window.docx);
    if (loading) return loading;
    loading = new Promise(function (resolve, reject) {
      var s = document.createElement('script');
      s.src = DOCX_URL;
      s.onload = function () { window.docx ? resolve(window.docx) : reject(new Error('docx saknas')); };
      s.onerror = function () { loading = null; reject(new Error('Kunde inte ladda docx.js')); };
      document.head.appendChild(s);
    });
    return loading;
  }

  function hex(c, fallback) { return String(c || fallback).replace('#', '').toUpperCase(); }
  function defOf(c, meta) {
    if (meta && typeof meta.getDefinition === 'function') return meta.getDefinition(c) || '';
    return c.definition || c.def || '';
  }

  // ── Begreppslista: Nr | Begrepp | Förklaring ───────────────
  function buildList(d, concepts, meta) {
    var light = hex(meta.colorLight, '#F1F5F9');
    var dark = hex(meta.colorText, '#1E293B');
    var accent = hex(meta.color, '#64748B');
    var line = { style: d.BorderStyle.SINGLE, size: 4, color: 'CBD5E1' };
    var borders = { top: line, bottom: line, left: line, right: line };
    var W = [700, 2900, 6038]; // twips, summa = 9638 (A4 med 2 cm marginal)

    function cell(text, width, opts) {
      opts = opts || {};
      return new d.TableCell({
        width: { size: width, type: d.WidthType.DXA },
        borders: borders,
        shading: opts.fill ? { type: d.ShadingType.CLEAR, color: 'auto', fill: opts.fill } : undefined,
        margins: { top: 90, bottom: 90, left: 120, right: 120 },
        verticalAlign: d.VerticalAlign.TOP,
        children: [new d.Paragraph({
          alignment: opts.center ? d.AlignmentType.CENTER : d.AlignmentType.LEFT,
          children: [new d.TextRun({ text: text, bold: !!opts.bold, color: opts.color, size: opts.size || 22, font: FONT })]
        })]
      });
    }

    var head = new d.TableRow({
      tableHeader: true,
      cantSplit: true,
      children: [
        cell('Nr', W[0], { bold: true, fill: light, color: dark, center: true }),
        cell('Begrepp', W[1], { bold: true, fill: light, color: dark }),
        cell('Förklaring', W[2], { bold: true, fill: light, color: dark })
      ]
    });
    var rows = concepts.map(function (c, i) {
      return new d.TableRow({
        cantSplit: true,
        children: [
          cell(String(i + 1), W[0], { center: true, color: '64748B' }),
          cell(c.term, W[1], { bold: true }),
          cell(defOf(c, meta), W[2])
        ]
      });
    });

    return new d.Document({
      creator: 'johnshemsida.netlify.app',
      title: meta.title + ' – Begrepp',
      styles: { default: { document: { run: { font: FONT, size: 22 } } } },
      sections: [{
        properties: { page: {
          size: { width: 11906, height: 16838 },
          margin: { top: 1134, bottom: 1134, left: 1134, right: 1134 }
        } },
        footers: { default: new d.Footer({ children: [new d.Paragraph({
          alignment: d.AlignmentType.CENTER,
          children: [
            new d.TextRun({ text: meta.course + ' · ' + meta.title + ' · Sida ', size: 16, color: '94A3B8', font: FONT }),
            new d.TextRun({ children: [d.PageNumber.CURRENT], size: 16, color: '94A3B8', font: FONT }),
            new d.TextRun({ text: ' av ', size: 16, color: '94A3B8', font: FONT }),
            new d.TextRun({ children: [d.PageNumber.TOTAL_PAGES], size: 16, color: '94A3B8', font: FONT })
          ]
        })] }) },
        children: [
          new d.Paragraph({
            spacing: { after: 60 },
            children: [new d.TextRun({ text: meta.title + ' – Begrepp', bold: true, size: 40, color: dark, font: FONT })]
          }),
          new d.Paragraph({
            spacing: { after: 240 },
            border: { bottom: { style: d.BorderStyle.SINGLE, size: 12, color: accent, space: 6 } },
            children: [new d.TextRun({ text: meta.course + ' · ' + concepts.length + ' begrepp', size: 22, color: '64748B', font: FONT })]
          }),
          new d.Table({ width: { size: 9638, type: d.WidthType.DXA }, columnWidths: W, rows: [head].concat(rows) })
        ]
      }]
    });
  }

  // ── Klipp-ut-kort: 2 × 4 per A4, bara begreppet ────────────
  function buildCutCards(d, concepts, meta) {
    var dark = hex(meta.colorText, '#1E293B');
    var CARD_W = 5233;  // 9,23 cm — två kort fyller sidbredden
    var CARD_H = 3600;  // 6,35 cm — fyra rader fyller sidhöjden
    var dash = { style: d.BorderStyle.DASHED, size: 6, color: '64748B' };
    var none = { style: d.BorderStyle.NONE, size: 0, color: 'FFFFFF' };
    var label = (meta.short || meta.course) + ' · ' + meta.title;

    function card(c) {
      var b = c ? dash : none;
      return new d.TableCell({
        width: { size: CARD_W, type: d.WidthType.DXA },
        borders: { top: b, bottom: b, left: b, right: b },
        verticalAlign: d.VerticalAlign.CENTER,
        margins: { top: 120, bottom: 120, left: 240, right: 240 },
        children: c ? [
          new d.Paragraph({
            alignment: d.AlignmentType.CENTER,
            spacing: { after: 360 },
            children: [new d.TextRun({ text: c.term, bold: true, size: 40, color: '1E293B', font: FONT })]
          }),
          new d.Paragraph({
            alignment: d.AlignmentType.CENTER,
            children: [new d.TextRun({ text: label, size: 16, color: '94A3B8', font: FONT })]
          })
        ] : [new d.Paragraph('')]
      });
    }

    var rows = [];
    for (var i = 0; i < concepts.length; i += 2) {
      rows.push(new d.TableRow({
        cantSplit: true,
        height: { value: CARD_H, rule: d.HeightRule.EXACT },
        children: [card(concepts[i]), card(concepts[i + 1])]
      }));
    }

    return new d.Document({
      creator: 'johnshemsida.netlify.app',
      title: meta.title + ' – Klipp-ut-kort',
      styles: { default: { document: { run: { font: FONT, size: 22 } } } },
      sections: [{
        properties: { page: {
          size: { width: 11906, height: 16838 },
          margin: { top: 1000, bottom: 600, left: 720, right: 720, header: 400, footer: 300 }
        } },
        headers: { default: new d.Header({ children: [new d.Paragraph({
          alignment: d.AlignmentType.CENTER,
          children: [
            new d.TextRun({ text: '✂  ' + meta.title + ' – ', bold: true, size: 18, color: dark, font: FONT }),
            new d.TextRun({ text: 'Klipp ut korten längs de streckade linjerna och skriv förklaringen på baksidan.', size: 18, color: '475569', font: FONT })
          ]
        })] }) },
        children: [new d.Table({
          width: { size: CARD_W * 2, type: d.WidthType.DXA },
          columnWidths: [CARD_W, CARD_W],
          layout: d.TableLayoutType.FIXED,
          rows: rows
        })]
      }]
    });
  }

  function download(blob, name) {
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 2000);
  }

  function run(builder, suffix) {
    return function (concepts, meta) {
      return loadDocx().then(function (d) {
        return d.Packer.toBlob(builder(d, concepts, meta));
      }).then(function (blob) {
        download(blob, (meta.fileBase || 'begrepp') + '_' + suffix + '.docx');
      });
    };
  }

  window.BegreppExport = {
    exportList: run(buildList, 'lista'),
    exportCutCards: run(buildCutCards, 'klippkort'),
    _buildList: buildList,           // för test
    _buildCutCards: buildCutCards    // för test
  };
})();
