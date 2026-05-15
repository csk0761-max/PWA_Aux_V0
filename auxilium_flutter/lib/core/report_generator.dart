import 'dart:typed_data';
import 'package:pdf/pdf.dart';
import 'package:pdf/widgets.dart' as pw;
import 'package:printing/printing.dart';

class ReportGenerator {
  static Future<void> generateProjectTeaser({
    required String title,
    required String location,
    required String capacity,
    required String area,
    required String gssDistance,
    required String score,
  }) async {
    final pdf = pw.Document();

    pdf.addPage(
      pw.Page(
        pageFormat: PdfPageFormat.a4,
        build: (pw.Context context) {
          return pw.Padding(
            padding: const pw.EdgeInsets.all(40),
            child: pw.Column(
              crossAxisAlignment: pw.CrossAxisAlignment.start,
              children: [
                // Header
                pw.Row(
                  mainAxisAlignment: pw.MainAxisAlignment.spaceBetween,
                  children: [
                    pw.Column(
                      crossAxisAlignment: pw.CrossAxisAlignment.start,
                      children: [
                        pw.Text('AUXILIUM', style: pw.TextStyle(fontSize: 24, fontWeight: pw.FontWeight.bold, color: PdfColors.orange800)),
                        pw.Text('Renewable Energy Intelligence', style: pw.TextStyle(fontSize: 10, color: PdfColors.grey700)),
                      ],
                    ),
                    pw.Container(
                      padding: const pw.EdgeInsets.symmetric(horizontal: 10, vertical: 5),
                      decoration: pw.BoxDecoration(color: PdfColors.orange100, borderRadius: pw.BorderRadius.circular(5)),
                      child: pw.Text('CONFIDENTIAL PROJECT TEASER', style: pw.TextStyle(fontSize: 8, fontWeight: pw.FontWeight.bold, color: PdfColors.orange900)),
                    ),
                  ],
                ),
                pw.SizedBox(height: 40),
                pw.Divider(thickness: 2, color: PdfColors.orange800),
                pw.SizedBox(height: 20),

                // Title Section
                pw.Text(title, style: pw.TextStyle(fontSize: 32, fontWeight: pw.FontWeight.bold)),
                pw.Text(location, style: pw.TextStyle(fontSize: 16, color: PdfColors.grey600)),
                pw.SizedBox(height: 40),

                // Stats Grid
                pw.Row(
                  children: [
                    _buildStatBox('Estimated Capacity', '$capacity MW'),
                    pw.SizedBox(width: 20),
                    _buildStatBox('Total Plot Area', '$area Acres'),
                    pw.SizedBox(width: 20),
                    _buildStatBox('Feasibility Score', '$score/100'),
                  ],
                ),
                pw.SizedBox(height: 40),

                // Technical Details
                pw.Text('TECHNICAL SUMMARY', style: pw.TextStyle(fontSize: 14, fontWeight: pw.FontWeight.bold, letterSpacing: 1.5)),
                pw.SizedBox(height: 10),
                _buildDetailRow('Grid Connectivity', 'Nearest GSS located at $gssDistance km from site perimeter.'),
                _buildDetailRow('Evacuation Potential', '220kV Line infrastructure proximity confirmed.'),
                _buildDetailRow('Land Ownership', 'Single title private ownership (100% verified).'),
                _buildDetailRow('Topography', 'Flat terrain with < 2% slope (Ideal for Solar).'),

                pw.Spacer(),

                // Footer
                pw.Divider(color: PdfColors.grey300),
                pw.Row(
                  mainAxisAlignment: pw.MainAxisAlignment.spaceBetween,
                  children: [
                    pw.Text('Generated via Auxilium Mobile Platform', style: pw.TextStyle(fontSize: 8, color: PdfColors.grey500)),
                    pw.Text('www.auxilium-power.com', style: pw.TextStyle(fontSize: 8, color: PdfColors.grey500)),
                  ],
                ),
              ],
            ),
          );
        },
      ),
    );

    await Printing.layoutPdf(onLayout: (PdfPageFormat format) async => pdf.save());
  }

  static pw.Widget _buildStatBox(String label, String value) {
    return pw.Expanded(
      child: pw.Container(
        padding: const pw.EdgeInsets.all(15),
        decoration: pw.BoxDecoration(
          border: pw.Border.all(color: PdfColors.grey300),
          borderRadius: pw.BorderRadius.circular(8),
        ),
        child: pw.Column(
          crossAxisAlignment: pw.CrossAxisAlignment.start,
          children: [
            pw.Text(label, style: pw.TextStyle(fontSize: 8, color: PdfColors.grey600)),
            pw.SizedBox(height: 5),
            pw.Text(value, style: pw.TextStyle(fontSize: 14, fontWeight: pw.FontWeight.bold)),
          ],
        ),
      ),
    );
  }

  static pw.Widget _buildDetailRow(String label, String value) {
    return pw.Padding(
      padding: const pw.EdgeInsets.only(bottom: 10),
      child: pw.Row(
        crossAxisAlignment: pw.CrossAxisAlignment.start,
        children: [
          pw.Container(width: 4, height: 4, margin: const pw.EdgeInsets.only(top: 6), decoration: const pw.BoxDecoration(color: PdfColors.orange800, shape: pw.BoxShape.circle)),
          pw.SizedBox(width: 10),
          pw.Expanded(
            child: pw.RichText(
              text: pw.TextSpan(
                children: [
                  pw.TextSpan(text: '$label: ', style: pw.TextStyle(fontWeight: pw.FontWeight.bold, fontSize: 10)),
                  pw.TextSpan(text: value, style: const pw.TextStyle(fontSize: 10)),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
