import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'core/theme.dart';
import 'presentation/screens/onboarding_screen.dart';
import 'presentation/screens/agent_dashboard.dart';
import 'presentation/screens/field_survey_screen.dart';
import 'presentation/screens/intelligence_listing_screen.dart';
import 'presentation/screens/map_explorer_screen.dart';
import 'package:lucide_icons/lucide_icons.dart';

import 'core/supabase_config.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  
  // Initialize Supabase
  await SupabaseConfig.init();
  
  runApp(
    const ProviderScope(
      child: AuxiliumApp(),
    ),
  );
}

class AuxiliumApp extends StatelessWidget {
  const AuxiliumApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      title: 'Auxilium RE Intelligence',
      debugShowCheckedModeBanner: false,
      theme: AuxiliumTheme.darkTheme,
      routerConfig: _router,
    );
  }
}

final _router = GoRouter(
  initialLocation: '/',
  routes: [
    GoRoute(
      path: '/',
      builder: (context, state) => const SplashScreen(),
    ),
    GoRoute(
      path: '/onboarding',
      builder: (context, state) => const OnboardingScreen(),
    ),
    GoRoute(
      path: '/dashboard',
      builder: (context, state) => const AgentDashboard(),
    ),
    GoRoute(
      path: '/field-survey',
      builder: (context, state) => const FieldSurveyScreen(),
    ),
    GoRoute(
      path: '/intelligence-listing',
      builder: (context, state) => const IntelligenceListingScreen(),
    ),
    GoRoute(
      path: '/map-explorer',
      builder: (context, state) => const MapExplorerScreen(),
    ),
  ],
);

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {
  @override
  void initState() {
    super.initState();
    Future.delayed(const Duration(seconds: 3), () {
      if (mounted) context.go('/onboarding');
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Container(
              width: 100,
              height: 100,
              decoration: BoxDecoration(
                color: AuxiliumTheme.bgSurface,
                borderRadius: BorderRadius.circular(24),
                border: Border.all(color: AuxiliumTheme.borderGlass),
              ),
              child: const Icon(LucideIcons.zap, color: AuxiliumTheme.accentOrange, size: 48),
            ),
            const SizedBox(height: 24),
            const Text(
              'AUXILIUM',
              style: TextStyle(
                fontSize: 24,
                fontWeight: FontWeight.w800,
                letterSpacing: 4,
              ),
            ),
            const SizedBox(height: 8),
            const Text(
              'RE INTELLIGENCE PLATFORM',
              style: TextStyle(
                color: AuxiliumTheme.textSecondary,
                fontSize: 10,
                letterSpacing: 2,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class DashboardPlaceholder extends StatelessWidget {
  const DashboardPlaceholder({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Dashboard')),
      body: const Center(child: Text('Dashboard Logic Coming Soon')),
    );
  }
}
