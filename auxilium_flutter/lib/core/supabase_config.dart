import 'package:supabase_flutter/supabase_flutter.dart';

class SupabaseConfig {
  static const String url = 'https://rxlwhqsrvhyrieocdnbg.supabase.co';
  static const String anonKey = 'sb_publishable_SdvVM6cJGXrM5bH3rGL8Aw_utwoz9kJ';

  static Future<void> init() async {
    await Supabase.initialize(
      url: url,
      anonKey: anonKey,
    );
  }

  static SupabaseClient get client => Supabase.instance.client;
}
