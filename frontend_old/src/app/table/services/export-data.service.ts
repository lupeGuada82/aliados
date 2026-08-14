import { Injectable } from '@angular/core';
import JSZip from 'jszip';

@Injectable()
export class ExportDataService {
  constructor() { }

  export(type: 'pdf' | 'xls' | 'csv', columns: any[], datasource: any, title: string = 'tabla') {
    const data = datasource.data;
    if (!data || !data.length) return;

    const visibleColumns = columns.filter(col => col.visible && col.key !== 'acciones');

    // Construir filas planas
    const rows = data.map(row => {
      const obj: any = {};
      visibleColumns.forEach(col => {
        const value = col.valueGetter ? col.valueGetter(row) : row[col.key] ?? '';
        obj[col.key] = value === null || value === undefined ? '' : value.toString();
      });
      return obj;
    });

    if (type === 'pdf') {
      this.exportPDF(visibleColumns, rows, title);
    } else if (type === 'xls') {
      this.exportXLS(visibleColumns, rows, title);
    } else if (type === 'csv') {
      this.exportCSV(visibleColumns, rows, title);
    }
  }

  /** PDF */

  private exportPDF(columns: any[], rows: any[], title: string) {
    const maxWeightPerPage = 700; // Ajustar según pruebas visuales
    const docDefinition: any = this.createDocDefinition(title);
    // 1. Calcular pesos de las columnas para calcular el total
    const weightedColumns = this.calculateColumnWeights(columns, rows);
    // 2. Agrupar columnas en bloques por peso máximo
    const columnBlocks = this.groupColumnsByWeight(weightedColumns, maxWeightPerPage);
    // 3. Crear contenido PDF (tablas divididas)
    this.addColumnBlocksToDoc(docDefinition, columnBlocks, rows, weightedColumns);
    // 4. Descargar PDF
    // pdfMake.createPdf(docDefinition).download(`${title}.pdf`);
  }

  /** Crea definición base del PDF */
  private createDocDefinition(title: string) {
    return {
      pageSize: 'A4',
      pageOrientation: 'landscape',
      pageMargins: [40, 40, 40, 40],
      styles: {
        header: { fontSize: 18, bold: true, margin: [0, 0, 0, 10] },
        tableFont: { fontSize: 9, lineHeight: 1 }
      },
      content: [
        // { text: title, style: 'header', alignment: 'center', margin: [0, 0, 0, 20] }
      ]
    };
  }


  /** Calcula peso de cada columna según contenido (si no tiene width fijo) */
  // private calculateColumnWeights(columns: any[], rows: any[]): { col: any; weight: number }[] {
  //   const MAX_COLUMN_WEIGHT = 25;
  //   const MIN_COLUMN_WEIGHT = 5;

  //   return columns.map(col => {
  //     // Si la columna ya tiene un ancho definido, no necesita peso
  //     if (col.width) return { col, weight: 0 };

  //     const labelLength = col.label?.length ?? 0;
  //     const dataLengths = rows.map(row => {
  //       const value = row[col.key];
  //       return value ? value.toString().length : 0;
  //     });

  //     const avgContentLength = dataLengths.length
  //       ? dataLengths.reduce((a, b) => a + b, 0) / dataLengths.length
  //       : 0;

  //     const rawWeight = Math.max(labelLength, avgContentLength);
  //     const boundedWeight = Math.max(MIN_COLUMN_WEIGHT, Math.min(MAX_COLUMN_WEIGHT, rawWeight));

  //     return { col, weight: boundedWeight };
  //   });
  // }
  private calculateColumnWeights(columns: any[], rows: any[]): { col: any; weight: number }[] {
    return columns.map(col => {
      // Si tiene width explícito en puntos, usarlo como peso
      if (typeof col.width === 'number') return { col, weight: col.width };

      // Si es porcentaje, calcular peso estimado (sobre A4 ~ 800 puntos)
      if (typeof col.width === 'string' && col.width.endsWith('%')) {
        const percent = parseFloat(col.width);
        return { col, weight: (percent / 100) * 800 };
      }

      // Si es 'auto' o no definido → calcular por contenido
      const labelLength = col.label?.length ?? 0;
      const dataLengths = rows.map(row => {
        const value = row[col.key];
        return value ? value.toString().length : 0;
      });

      const avgContentLength = dataLengths.length
        ? dataLengths.reduce((a, b) => a + b, 0) / dataLengths.length
        : 0;

      // Aproximar ancho en puntos (1 carácter ≈ 7pt)
      const estimatedWidth = Math.max(labelLength, avgContentLength) * 7;

      // Limitar entre 50 y 300 pt
      return { col, weight: Math.min(300, Math.max(50, estimatedWidth)) };
    });
  }

  /** Agrega los bloques de columnas al documento PDF */
  private addColumnBlocksToDoc(docDefinition: any, columnBlocks: any[][], rows: any[], weightedColumns: { col: any; weight: number }[]) {
    columnBlocks.forEach((blockHeaders, index) => {
      const body: any[] = [];

      // Encabezados
      body.push(blockHeaders.map(col => col.label));

      // Filas de datos
      rows.forEach(row => {
        body.push(
          blockHeaders.map(col => {
            const value = row[col.key];
            const text = value == null ? '' : value.toString();
            return {
              text: text.slice(0, 100), // Puedes ajustar si necesitas truncar menos o más
              noWrap: false
            };
          })
        );
      });

      // Calcular pesos para columnas sin `col.width`
      const blockWeights = blockHeaders.map(col => {
        const w = weightedColumns.find(wc => wc.col === col)?.weight ?? 1;
        return w;
      });

      const totalWeight = blockWeights.reduce((a, b) => a + b, 0);

      // Generar array de `widths` respetando `col.width` si está definido
      const widths = blockHeaders.map(col => {
        // Si hay una propiedad `width` definida, usarla directamente
        if (col.width) return col.width;

        // Si hay pocas columnas y no tienen width, usar fijo
        if (blockHeaders.length <= 2) return 200;

        // Caso normal: calcular porcentaje proporcional
        const weight = weightedColumns.find(wc => wc.col === col)?.weight ?? 1;
        const widthPercent = (weight / totalWeight) * 100;
        return widthPercent + '%';
      });

      const tableBlock = {
        table: {
          headerRows: 1,
          widths,
          body
        },
        layout: 'lightHorizontalLines',
        style: 'tableFont',
        margin: [0, 0, 0, 20],
        ...(index > 0 && { pageBreak: 'before' })
      };

      docDefinition.content.push(tableBlock);
    });
  }


  S

  /** Agrupa columnas en bloques respetando peso máximo por página */
  private groupColumnsByWeight(weightedColumns: { col: any; weight: number }[], maxWeight: number): any[][] {
    const blocks: any[][] = [];
    let currentBlock: any[] = [];
    let currentWeight = 0;


    weightedColumns.forEach(({ col, weight }) => {
      if (currentWeight + weight > maxWeight && currentBlock.length) {
        blocks.push(currentBlock);
        currentBlock = [];
        currentWeight = 0;
      }

      currentBlock.push(col);
      currentWeight += weight;
    });


    if (currentBlock.length) blocks.push(currentBlock);
    return blocks;
  }


  // /** Excel (.xls) con ancho automático */
  private exportXLS(columns: { key: string, label: string }[], rows: any[], filename: string = 'archivo.xls') {
    const zip = new JSZip();

    // Crear archivos XML
    zip.file('[Content_Types].xml', this.getContentTypesXml());
    zip.folder('_rels')?.file('.rels', this.getRelsXml());

    const xl = zip.folder('xl')!;
    xl.file('workbook.xml', this.getWorkbookXml());
    xl.folder('_rels')?.file('workbook.xml.rels', this.getWorkbookRelsXml());
    xl.file('styles.xml', this.getStylesXml());
    xl.folder('worksheets')?.file('sheet1.xml', this.buildSheetXml(columns, rows));
    zip.generateAsync({ type: 'blob' }).then((blob) => {
      const blobXlsx = new Blob([blob], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });


    });

    // Generar .zip con extensión .xlsx o .xls
    zip.generateAsync({ type: 'blob' }).then((blob) => {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = filename.endsWith('.xlsx') ? filename : `${filename}.xlsx`;
      a.click();
      URL.revokeObjectURL(a.href);
    });
  }

  private getContentTypesXml(): string {
    return `<?xml version="1.0" encoding="UTF-8"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>
  <Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>
  <Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>
</Types>`;
  }

  private getRelsXml(): string {
    return `<?xml version="1.0" encoding="UTF-8"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>
</Relationships>`;
  }

  private getWorkbookXml(): string {
    return `<?xml version="1.0" encoding="UTF-8"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"
          xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <sheets>
    <sheet name="Hoja1" sheetId="1" r:id="rId1"/>
  </sheets>
</workbook>`;
  }

  private getWorkbookRelsXml(): string {
    return `<?xml version="1.0" encoding="UTF-8"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
</Relationships>`;
  }

  private getStylesXml(): string {
    return `<?xml version="1.0" encoding="UTF-8"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <fonts count="2">
    <font><sz val="11"/><name val="Calibri"/></font> <!-- Normal -->
    <font><b/><sz val="11"/><name val="Calibri"/></font> <!-- Bold -->
  </fonts>
  <fills count="1">
    <fill><patternFill patternType="none"/></fill>
  </fills>
  <borders count="3">
    <border/> <!-- 0: sin bordes -->
    <border> <!-- 1: bottom grueso -->
      <left/><right/><top/>
      <bottom style="thick"><color rgb="FF000000"/></bottom>
    </border>
    <border> <!-- 2: bottom fino -->
      <left/><right/><top/>
      <bottom style="thin"><color rgb="FF000000"/></bottom>
    </border>
  </borders>
  <cellStyleXfs count="1">
    <xf numFmtId="0" fontId="0" fillId="0" borderId="0"/>
  </cellStyleXfs>
  <cellXfs count="3">
    <xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/>
    <xf numFmtId="0" fontId="1" fillId="0" borderId="1" xfId="0" applyFont="1" applyBorder="1">
      <alignment wrapText="1"/>
    </xf>
    <xf numFmtId="0" fontId="0" fillId="0" borderId="2" xfId="0" applyBorder="1">
      <alignment wrapText="1"/>
    </xf>
  </cellXfs>
</styleSheet>`;
  }


  private buildSheetXml(columns: { key: string; label: string }[], rows: any[]): string {
    const escapeXml = (str: any): string =>
      String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');

    const getCellRef = (colIndex: number, rowIndex: number): string => {
      let colName = '';
      while (colIndex >= 0) {
        colName = String.fromCharCode((colIndex % 26) + 65) + colName;
        colIndex = Math.floor(colIndex / 26) - 1;
      }
      return `${colName}${rowIndex}`;
    };

    // === Calcular anchos de columnas ===
    const colWidths = columns.map((col) => {
      const maxDataLength = Math.max(
        col.label.length,
        ...rows.map(row => (row[col.key] ? row[col.key].toString().length : 0))
      );
      const width = Math.min(maxDataLength + 2, 50);
      return width;
    });

    // === Armar XML ===
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <cols>\n`;

    colWidths.forEach((width, i) => {
      xml += `    <col min="${i + 1}" max="${i + 1}" width="${width}" customWidth="1"/>\n`;
    });

    xml += `  </cols>
  <sheetData>\n`;

    // === Header ===
    xml += `    <row r="1">\n`;
    columns.forEach((col, colIndex) => {
      const cellRef = getCellRef(colIndex, 1);
      const value = escapeXml(col.label);
      xml += `      <c r="${cellRef}" t="inlineStr" s="1"><is><t>${value}</t></is></c>\n`;
    });
    xml += `    </row>\n`;

    // === Data rows ===
    rows.forEach((row, rowIndex) => {
      const r = rowIndex + 2; // fila real
      xml += `    <row r="${r}">\n`;

      columns.forEach((col, colIndex) => {
        const cellRef = getCellRef(colIndex, r);
        const rawValue = row[col.key];

        const styleId = 2; // estilo con borde fino

        if (rawValue === null || rawValue === undefined || rawValue === '') {
          // Celda vacía con estilo
          xml += `      <c r="${cellRef}" t="inlineStr" s="${styleId}"><is><t></t></is></c>\n`;
        } else if (typeof rawValue === 'number') {
          xml += `      <c r="${cellRef}" t="n" s="${styleId}"><v>${rawValue}</v></c>\n`;
        } else {
          const text = escapeXml(rawValue.toString());
          xml += `      <c r="${cellRef}" t="inlineStr" s="${styleId}"><is><t>${text}</t></is></c>\n`;
        }
      });

      xml += `    </row>\n`;
    });

    xml += `  </sheetData>
</worksheet>`;

    return xml;
  }









  /** CSV */
  exportCSV(columns: { key: string; label: string }[], rows: any[], filename: string = 'archivo.csv') {
    const escapeCsv = (value: any): string => {
      if (value == null) return '';
      const str = value.toString();
      if (str.includes('"') || str.includes(',') || str.includes('\n')) {
        return `"${str.replace(/"/g, '""')}"`; // escapa comillas dobles
      }
      return str;
    };

    const headers = columns.map(col => escapeCsv(col.label)).join(',');
    const lines = rows.map(row =>
      columns.map(col => escapeCsv(row[col.key])).join(',')
    );

    const csvContent = [headers, ...lines].join('\r\n');

    const bom = '\uFEFF'; // BOM para UTF-8
    const blob = new Blob([bom + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

}
