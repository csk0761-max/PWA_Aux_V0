import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../../core/theme.dart';
import '../../core/report_generator.dart';

class IntelligenceListingScreen extends StatefulWidget {
  const IntelligenceListingScreen({super.key});

  @override
  State<IntelligenceListingScreen> createState() => _IntelligenceListingScreenState();
}

class _IntelligenceListingScreenState extends State<IntelligenceListingScreen> with SingleTickerProviderStateMixin {
  late TabController _tabController;
  
  final List<String> _sections = [
    'Suitability', 'Grid', 'Legal', 'ESG', 'Resource', 'Infra', 'Commercials', 'Marketplace', 'AI Insights'
  ];

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: _sections.length, vsync: this);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: AuxiliumTheme.bgDark,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(LucideIcons.arrowLeft, color: Colors.white),
          onPressed: () => context.pop(),
        ),
        title: const Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('RE Intelligence Hub', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
            Text('Developer-Grade Assessment', style: TextStyle(fontSize: 11, color: AuxiliumTheme.textMuted)),
          ],
        ),
        actions: [
          IconButton(
            icon: const Icon(LucideIcons.share2, color: AuxiliumTheme.accentOrange),
            onPressed: () => ReportGenerator.generateProjectTeaser(
              title: 'Phalodi Solar Site A',
              location: 'Rajasthan, India',
              capacity: '100',
              area: '480',
              gssDistance: '2.4',
              score: '88',
            ),
          ),
          const SizedBox(width: 8),
        ],
        bottom: TabBar(
          controller: _tabController,
          isScrollable: true,
          indicatorColor: AuxiliumTheme.accentOrange,
          labelColor: AuxiliumTheme.accentOrange,
          unselectedLabelColor: AuxiliumTheme.textMuted,
          tabs: _sections.map((s) => Tab(text: s)).toList(),
        ),
      ),
      body: TabBarView(
        controller: _tabController,
        children: [
          _buildSuitabilitySection(),
          _buildGridSection(),
          _buildPlaceholderSection('Legal & Title'),
          _buildPlaceholderSection('ESG & Risk'),
          _buildPlaceholderSection('Resource Analysis'),
          _buildPlaceholderSection('Infra & Logistics'),
          _buildPlaceholderSection('Commercials'),
          _buildPlaceholderSection('Marketplace'),
          _buildAIInsightsSection(),
        ],
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () {},
        backgroundColor: AuxiliumTheme.accentOrange,
        icon: const Icon(LucideIcons.save, color: Colors.black),
        label: const Text('Save Draft', style: TextStyle(color: Colors.black, fontWeight: FontWeight.bold)),
      ),
    );
  }

  Widget _buildSuitabilitySection() {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _buildSectionCard('Project Suitability', [
            _buildDropdown('Project Type', ['Solar', 'Wind', 'Hybrid', 'BESS']),
            const SizedBox(height: 16),
            _buildNumberField('Estimated Area (Acres)', '500'),
            const SizedBox(height: 20),
            _buildIntelligenceCard('Calculated Potential', '100 MW', LucideIcons.zap),
          ]),
          const SizedBox(height: 24),
          _buildSectionCard('Terrain Analysis', [
            _buildDropdown('Profile', ['Flat', 'Undulating', 'Hilly']),
            const SizedBox(height: 16),
            _buildDropdown('Soil Type', ['Black', 'Red', 'Rocky']),
          ]),
        ],
      ),
    );
  }

  Widget _buildGridSection() {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _buildSectionCard('Grid Connectivity', [
            _buildTextField('Nearest GSS', 'Phalodi 220kV'),
            const SizedBox(height: 16),
            _buildDropdown('Voltage Level', ['33kV', '132kV', '220kV', '400kV', '765kV']),
            const SizedBox(height: 16),
            _buildNumberField('Distance to GSS (km)', '2.4'),
          ]),
          const SizedBox(height: 24),
          _buildIntelligenceCard('Feasibility Score', '88/100', LucideIcons.trendingUp),
        ],
      ),
    );
  }

  Widget _buildAIInsightsSection() {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          const Icon(LucideIcons.brainCircuit, size: 64, color: AuxiliumTheme.accentPurple),
          const SizedBox(height: 24),
          const Text('AI Intelligence Engine', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
          const SizedBox(height: 8),
          const Text('Analyzing GIS and market data...', style: TextStyle(color: AuxiliumTheme.textMuted)),
          const SizedBox(height: 32),
          Container(
            width: 200,
            height: 4,
            decoration: BoxDecoration(
              color: AuxiliumTheme.bgSurface,
              borderRadius: BorderRadius.circular(2),
            ),
            child: LinearProgressIndicator(
              backgroundColor: Colors.transparent,
              valueColor: const AlwaysStoppedAnimation<Color>(AuxiliumTheme.accentPurple),
              borderRadius: BorderRadius.circular(2),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildSectionCard(String title, List<Widget> children) {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: AuxiliumTheme.bgSurface,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AuxiliumTheme.borderGlass),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(title, style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: AuxiliumTheme.accentOrange)),
          const SizedBox(height: 24),
          ...children,
        ],
      ),
    );
  }

  Widget _buildIntelligenceCard(String label, String value, IconData icon) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AuxiliumTheme.accentOrange.withOpacity(0.05),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: AuxiliumTheme.accentOrange.withOpacity(0.2)),
      ),
      child: Row(
        children: [
          Icon(icon, color: AuxiliumTheme.accentOrange, size: 20),
          const SizedBox(width: 12),
          Text(label, style: const TextStyle(fontSize: 13, color: AuxiliumTheme.textSecondary)),
          const Spacer(),
          Text(value, style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: AuxiliumTheme.accentOrange)),
        ],
      ),
    );
  }

  Widget _buildTextField(String label, String initialValue) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(label, style: const TextStyle(fontSize: 11, color: AuxiliumTheme.textMuted, textTransform: TextTransform.uppercase)),
        const SizedBox(height: 8),
        TextFormField(
          initialValue: initialValue,
          style: const TextStyle(fontSize: 15),
          decoration: const InputDecoration(),
        ),
      ],
    );
  }

  Widget _buildNumberField(String label, String initialValue) {
    return _buildTextField(label, initialValue);
  }

  Widget _buildDropdown(String label, List<String> options) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(label, style: const TextStyle(fontSize: 11, color: AuxiliumTheme.textMuted, textTransform: TextTransform.uppercase)),
        const SizedBox(height: 8),
        DropdownButtonFormField<String>(
          value: options[0],
          dropdownColor: AuxiliumTheme.bgSurface,
          decoration: const InputDecoration(),
          items: options.map((String value) {
            return DropdownMenuItem<String>(
              value: value,
              child: Text(value),
            );
          }).toList(),
          onChanged: (_) {},
        ),
      ],
    );
  }

  Widget _buildPlaceholderSection(String title) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(LucideIcons.layoutGrid, size: 48, color: AuxiliumTheme.textMuted),
          const SizedBox(height: 16),
          Text(title, style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
          const Text('Advanced modules loading...', style: TextStyle(color: AuxiliumTheme.textMuted)),
        ],
      ),
    );
  }
}
