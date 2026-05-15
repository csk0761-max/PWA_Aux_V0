import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class AuxiliumTheme {
  static const Color bgDark = Color(0xFF0A0A0A);
  static const Color bgSurface = Color(0xFF141414);
  static const Color accentOrange = Color(0xFFF59E0B);
  static const Color accentBlue = Color(0xFF3B82F6);
  static const Color accentPurple = Color(0xFFA78BFA);
  static const Color accentGreen = Color(0xFF10B981);
  static const Color textMain = Colors.white;
  static const Color textSecondary = Color(0xFFA1A1AA);
  static const Color textMuted = Color(0xFF71717A);
  static const Color borderGlass = Color(0x14FFFFFF);

  static ThemeData darkTheme = ThemeData(
    brightness: Brightness.dark,
    scaffoldBackgroundColor: bgDark,
    primaryColor: accentOrange,
    colorScheme: const ColorScheme.dark(
      primary: accentOrange,
      secondary: accentBlue,
      surface: bgSurface,
    ),
    textTheme: GoogleFonts.plusJakartaSansTextTheme().apply(
      bodyColor: textMain,
      displayColor: textMain,
    ),
    cardTheme: CardTheme(
      color: bgSurface,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(16),
        side: const BorderSide(color: borderGlass),
      ),
      elevation: 0,
    ),
    inputDecorationTheme: InputDecorationTheme(
      filled: true,
      fillColor: Colors.white.withOpacity(0.05),
      border: OutlineInputBorder(
        borderRadius: BorderRadius.circular(12),
        borderSide: const BorderSide(color: borderGlass),
      ),
      enabledBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(12),
        borderSide: const BorderSide(color: borderGlass),
      ),
      focusedBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(12),
        borderSide: const BorderSide(color: accentOrange, width: 2),
      ),
      labelStyle: const TextStyle(color: textMuted),
    ),
  );
}
