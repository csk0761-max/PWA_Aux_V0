import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../../core/theme.dart';
import '../../data/models/role.dart';

final selectedRoleProvider = StateProvider<String?>((ref) => null);

class OnboardingScreen extends ConsumerWidget {
  const OnboardingScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final selectedRole = ref.watch(selectedRoleProvider);

    return Scaffold(
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 24.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const SizedBox(height: 40),
              const Text(
                'Welcome to Auxilium',
                style: TextStyle(
                  fontSize: 28,
                  fontWeight: FontWeight.w800,
                  color: AuxiliumTheme.accentOrange,
                ),
              ),
              const SizedBox(height: 8),
              const Text(
                'Choose your role to get started',
                style: TextStyle(
                  fontSize: 16,
                  color: AuxiliumTheme.textSecondary,
                ),
              ),
              const SizedBox(height: 32),
              Expanded(
                child: ListView.separated(
                  itemCount: UserRole.roles.length,
                  separatorBuilder: (context, index) => const SizedBox(height: 16),
                  itemBuilder: (context, index) {
                    final role = UserRole.roles[index];
                    final isSelected = selectedRole == role.id;

                    return GestureDetector(
                      onTap: () => ref.read(selectedRoleProvider.notifier).state = role.id,
                      child: Container(
                        padding: const EdgeInsets.all(20),
                        decoration: BoxDecoration(
                          color: isSelected ? AuxiliumTheme.bgSurface : AuxiliumTheme.bgSurface.withOpacity(0.5),
                          borderRadius: BorderRadius.circular(16),
                          border: Border.all(
                            color: isSelected ? AuxiliumTheme.accentOrange : AuxiliumTheme.borderGlass,
                            width: isSelected ? 2 : 1,
                          ),
                          boxShadow: isSelected ? [
                            BoxShadow(
                              color: AuxiliumTheme.accentOrange.withOpacity(0.1),
                              blurRadius: 20,
                              spreadRadius: 0,
                            )
                          ] : null,
                        ),
                        child: Row(
                          children: [
                            Container(
                              width: 48,
                              height: 48,
                              decoration: BoxDecoration(
                                color: AuxiliumTheme.bgDark,
                                borderRadius: BorderRadius.circular(12),
                              ),
                              child: Icon(
                                _getIcon(role.iconName),
                                color: isSelected ? AuxiliumTheme.accentOrange : AuxiliumTheme.textMuted,
                                size: 24,
                              ),
                            ),
                            const SizedBox(width: 16),
                            Expanded(
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    role.title,
                                    style: TextStyle(
                                      fontWeight: FontWeight.bold,
                                      fontSize: 16,
                                      color: isSelected ? AuxiliumTheme.textMain : AuxiliumTheme.textSecondary,
                                    ),
                                  ),
                                  Text(
                                    role.description,
                                    style: const TextStyle(
                                      fontSize: 12,
                                      color: AuxiliumTheme.textMuted,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ],
                        ),
                      ),
                    );
                  },
                ),
              ),
              const SizedBox(height: 24),
              SizedBox(
                width: double.infinity,
                height: 56,
                child: ElevatedButton(
                  onPressed: selectedRole != null ? () => context.go('/dashboard') : null,
                  style: ElevatedButton.styleFrom(
                    backgroundColor: AuxiliumTheme.accentOrange,
                    foregroundColor: Colors.black,
                    disabledBackgroundColor: AuxiliumTheme.bgSurface,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(16),
                    ),
                  ),
                  child: const Text(
                    'Continue to Platform',
                    style: TextStyle(fontWeight: FontWeight.w800, fontSize: 16),
                  ),
                ),
              ),
              const SizedBox(height: 24),
            ],
          ),
        ),
      ),
    );
  }

  IconData _getIcon(String name) {
    switch (name) {
      case 'home': return LucideIcons.home;
      case 'layout_grid': return LucideIcons.layoutGrid;
      case 'zap': return LucideIcons.zap;
      case 'shield_check': return LucideIcons.shieldCheck;
      case 'map_pin': return LucideIcons.mapPin;
      default: return LucideIcons.helpCircle;
    }
  }
}
