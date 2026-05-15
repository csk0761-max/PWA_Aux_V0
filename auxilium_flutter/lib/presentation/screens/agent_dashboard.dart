import 'package:image_picker/image_picker.dart';
import 'package:supabase_flutter/supabase_flutter.dart';

class AgentDashboard extends StatefulWidget {
  const AgentDashboard({super.key});

  @override
  State<AgentDashboard> createState() => _AgentDashboardState();
}

class _AgentDashboardState extends State<AgentDashboard> {
  final ImagePicker _picker = ImagePicker();

  Future<void> _handleImageCapture() async {
    final XFile? image = await _picker.pickImage(source: ImageSource.camera);
    if (image != null && mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Photo Captured: ${image.name}')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              _buildHeader(),
              const SizedBox(height: 32),
              _buildStatsGrid(),
              const SizedBox(height: 32),
              _buildSectionHeader('Field Operations', () {}),
              const SizedBox(height: 16),
              _buildOperationCard(
                context,
                'Run GPS Scanner',
                'Capture high-precision coordinates',
                LucideIcons.navigation,
                AuxiliumTheme.accentOrange,
                () => context.push('/field-survey'),
              ),
              const SizedBox(height: 12),
              _buildOperationCard(
                context,
                'Upload Site Media',
                'Sync 360° photos and documents',
                LucideIcons.camera,
                AuxiliumTheme.accentBlue,
                _handleImageCapture,
              ),
              const SizedBox(height: 12),
              _buildOperationCard(
                context,
                'Global Map Explorer',
                'Track live surveys and grid points',
                LucideIcons.globe,
                AuxiliumTheme.accentPurple,
                () => context.push('/map-explorer'),
              ),
              const SizedBox(height: 32),
              _buildSectionHeader('Active Survey Queue', () {}),
              const SizedBox(height: 16),
              _buildSurveyItem('SURV-882', 'Phalodi Solar Park', 'Rajasthan', 'Priority'),
              _buildSurveyItem('SURV-901', 'Bhadla North-II', 'Rajasthan', 'Scheduled'),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildHeader() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'Field Ops Hub',
              style: TextStyle(fontSize: 24, fontWeight: FontWeight.w800, color: AuxiliumTheme.accentOrange),
            ),
            Text(
              'Agent: Chandan Singh',
              style: TextStyle(color: AuxiliumTheme.textSecondary, fontSize: 14),
            ),
          ],
        ),
        Row(
          children: [
            IconButton(
              icon: const Icon(LucideIcons.logOut, size: 20, color: Colors.white70),
              onPressed: () async {
                await Supabase.instance.client.auth.signOut();
                if (context.mounted) context.go('/onboarding');
              },
            ),
            const SizedBox(width: 8),
            Container(
              padding: const EdgeInsets.all(10),
              decoration: BoxDecoration(
                color: AuxiliumTheme.bgSurface,
                borderRadius: BorderRadius.circular(12),
                border: Border.all(color: AuxiliumTheme.borderGlass),
              ),
              child: const Icon(LucideIcons.bell, size: 20, color: Colors.white),
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildStatsGrid() {
    return Row(
      children: [
        _buildStatCard('Active Tasks', '04', LucideIcons.clipboardCheck),
        const SizedBox(width: 12),
        _buildStatCard('Synced Today', '12', LucideIcons.database),
      ],
    );
  }

  Widget _buildStatCard(String label, String value, IconData icon) {
    return Expanded(
      child: Container(
        padding: const EdgeInsets.all(20),
        decoration: BoxDecoration(
          color: AuxiliumTheme.bgSurface,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: AuxiliumTheme.borderGlass),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Icon(icon, size: 20, color: AuxiliumTheme.textMuted),
            const SizedBox(height: 12),
            Text(value, style: const TextStyle(fontSize: 24, fontWeight: FontWeight.bold)),
            Text(label, style: const TextStyle(fontSize: 11, color: AuxiliumTheme.textMuted)),
          ],
        ),
      ),
    );
  }

  Widget _buildSectionHeader(String title, VoidCallback onSeeAll) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(title, style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
        TextButton(onPressed: onSeeAll, child: const Text('See All', style: TextStyle(color: AuxiliumTheme.accentOrange))),
      ],
    );
  }

  Widget _buildOperationCard(BuildContext context, String title, String subtitle, IconData icon, Color color, VoidCallback onTap) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.all(20),
        decoration: BoxDecoration(
          color: AuxiliumTheme.bgSurface,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: AuxiliumTheme.borderGlass),
        ),
        child: Row(
          children: [
            Container(
              width: 52,
              height: 52,
              decoration: BoxDecoration(
                color: color.withOpacity(0.1),
                borderRadius: BorderRadius.circular(14),
              ),
              child: Icon(icon, color: color, size: 24),
            ),
            const SizedBox(width: 16),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
                  Text(subtitle, style: const TextStyle(fontSize: 12, color: AuxiliumTheme.textMuted)),
                ],
              ),
            ),
            const Icon(LucideIcons.chevronRight, color: AuxiliumTheme.textMuted, size: 20),
          ],
        ),
      ),
    );
  }

  Widget _buildSurveyItem(String id, String title, String location, String status) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AuxiliumTheme.bgSurface.withOpacity(0.5),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: AuxiliumTheme.borderGlass),
      ),
      child: Row(
        children: [
          Container(
            width: 40,
            height: 40,
            decoration: BoxDecoration(
              color: AuxiliumTheme.bgDark,
              borderRadius: BorderRadius.circular(10),
            ),
            child: const Icon(LucideIcons.fileText, size: 18, color: AuxiliumTheme.textSecondary),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(title, style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 14)),
                Text('$id • $location', style: const TextStyle(fontSize: 11, color: AuxiliumTheme.textMuted)),
              ],
            ),
          ),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
            decoration: BoxDecoration(
              color: status == 'Priority' ? Colors.orange.withOpacity(0.1) : Colors.blue.withOpacity(0.1),
              borderRadius: BorderRadius.circular(6),
            ),
            child: Text(
              status,
              style: TextStyle(
                fontSize: 10,
                fontWeight: FontWeight.bold,
                color: status == 'Priority' ? Colors.orange : Colors.blue,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
