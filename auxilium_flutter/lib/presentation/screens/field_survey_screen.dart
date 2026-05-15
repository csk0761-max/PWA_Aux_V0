import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:lucide_icons/lucide_icons.dart';
import 'package:geolocator/geolocator.dart';
import '../../core/theme.dart';
import 'package:flutter_animate/flutter_animate.dart';

class FieldSurveyScreen extends StatefulWidget {
  const FieldSurveyScreen({super.key});

  @override
  State<FieldSurveyScreen> createState() => _FieldSurveyScreenState();
}

class _FieldSurveyScreenState extends State<FieldSurveyScreen> {
  int _currentStep = 0;
  final PageController _pageController = PageController();
  bool _isLocating = false;
  Position? _currentPosition;
  
  // Form State
  final Map<String, dynamic> _surveyData = {
    'aggregatorName': '',
    'contactPerson': '',
    'landCategory': 'General',
    'ownershipType': 'Private',
    'projectCapacity': '',
    'plotArea': '',
  };

  Future<void> _handleGPSCapture() async {
    setState(() => _isLocating = true);
    
    try {
      bool serviceEnabled = await Geolocator.isLocationServiceEnabled();
      if (!serviceEnabled) throw 'Location services are disabled.';

      LocationPermission permission = await Geolocator.checkPermission();
      if (permission == LocationPermission.denied) {
        permission = await Geolocator.requestPermission();
        if (permission == LocationPermission.denied) throw 'Location permissions are denied.';
      }

      // Simulate high-precision lock delay for enterprise feel
      await Future.delayed(const Duration(seconds: 2));
      
      Position position = await Geolocator.getCurrentPosition(
        desiredAccuracy: LocationAccuracy.high,
      );

      setState(() {
        _currentPosition = position;
        _isLocating = false;
      });
    } catch (e) {
      setState(() => _isLocating = false);
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(e.toString())));
      }
    }
  }

  void _nextStep() {
    if (_currentStep < 4) {
      _pageController.nextPage(duration: const Duration(milliseconds: 300), curve: Curves.easeInOut);
      setState(() => _currentStep++);
    }
  }

  void _prevStep() {
    if (_currentStep > 0) {
      _pageController.previousPage(duration: const Duration(milliseconds: 300), curve: Curves.easeInOut);
      setState(() => _currentStep--);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Column(
          children: [
            _buildHeader(),
            _buildProgressBar(),
            Expanded(
              child: PageView(
                controller: _pageController,
                physics: const NeverScrollableScrollPhysics(),
                children: [
                  _buildStep1GPS(),
                  _buildStep2LandInfo(),
                  _buildStep3Ownership(),
                  _buildStep4ProjectSpecs(),
                  _buildStep5Review(),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildHeader() {
    return Padding(
      padding: const EdgeInsets.all(24.0),
      child: Row(
        children: [
          GestureDetector(
            onTap: () => context.pop(),
            child: Container(
              padding: const EdgeInsets.all(10),
              decoration: BoxDecoration(
                color: AuxiliumTheme.bgSurface,
                borderRadius: BorderRadius.circular(12),
              ),
              child: const Icon(LucideIcons.arrowLeft, size: 20),
            ),
          ),
          const SizedBox(width: 16),
          const Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text('Site Survey', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
              Text('REF: AUX-902', style: TextStyle(fontSize: 12, color: AuxiliumTheme.textMuted)),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildProgressBar() {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 24.0),
      child: Row(
        children: List.generate(5, (index) {
          return Expanded(
            child: Container(
              height: 4,
              margin: const EdgeInsets.symmetric(horizontal: 2),
              decoration: BoxDecoration(
                color: _currentStep >= index ? AuxiliumTheme.accentOrange : AuxiliumTheme.bgSurface,
                borderRadius: BorderRadius.circular(2),
              ),
            ),
          );
        }),
      ),
    );
  }

  Widget _buildStep1GPS() {
    return Padding(
      padding: const EdgeInsets.all(24.0),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Container(
            width: 80,
            height: 80,
            decoration: BoxDecoration(
              color: AuxiliumTheme.bgSurface,
              shape: BoxShape.circle,
              border: Border.all(color: _isLocating ? AuxiliumTheme.accentOrange : AuxiliumTheme.borderGlass),
            ),
            child: Icon(LucideIcons.navigation, color: AuxiliumTheme.accentOrange, size: 32)
                .animate(target: _isLocating ? 1 : 0)
                .rotate(duration: 2.seconds),
          ),
          const SizedBox(height: 24),
          const Text('Capture Coordinates', style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold)),
          const SizedBox(height: 8),
          const Text(
            'Ensure you are at the center of the parcel for maximum engineering precision.',
            textAlign: TextAlign.center,
            style: TextStyle(color: AuxiliumTheme.textMuted),
          ),
          const SizedBox(height: 48),
          if (_currentPosition != null) ...[
            Container(
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                color: AuxiliumTheme.bgSurface,
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: AuxiliumTheme.accentOrange),
              ),
              child: Column(
                children: [
                  const Text('GPS LOCK SECURED', style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: AuxiliumTheme.accentOrange)),
                  const SizedBox(height: 8),
                  Text('${_currentPosition!.latitude}, ${_currentPosition!.longitude}', style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
                ],
              ),
            ),
            const SizedBox(height: 32),
            SizedBox(
              width: double.infinity,
              height: 56,
              child: ElevatedButton(
                onPressed: _nextStep,
                style: ElevatedButton.styleFrom(backgroundColor: AuxiliumTheme.accentOrange, foregroundColor: Colors.black, shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16))),
                child: const Text('Continue to Details', style: TextStyle(fontWeight: FontWeight.bold)),
              ),
            ),
          ] else
            SizedBox(
              width: double.infinity,
              height: 56,
              child: ElevatedButton(
                onPressed: _isLocating ? null : _handleGPSCapture,
                style: ElevatedButton.styleFrom(backgroundColor: AuxiliumTheme.bgSurface, shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16))),
                child: Text(_isLocating ? 'Scanning Satellites...' : 'Initiate GPS Scan'),
              ),
            ),
        ],
      ),
    );
  }

  Widget _buildStep2LandInfo() {
    return _buildFormStep(
      'Land Parcel Info',
      [
        _buildTextField('Land Aggregator Name', 'aggregatorName'),
        const SizedBox(height: 16),
        _buildTextField('Contact Person', 'contactPerson'),
        const SizedBox(height: 16),
        _buildTextField('Govt Official Details', 'govtDetails'),
      ],
    );
  }

  Widget _buildStep3Ownership() {
    return _buildFormStep(
      'Type of Land',
      [
        const Text('Land Category', style: TextStyle(fontSize: 12, color: AuxiliumTheme.textMuted)),
        const SizedBox(height: 12),
        _buildToggleGroup(['General', 'SC / ST', 'Mixed'], 'landCategory'),
        const SizedBox(height: 24),
        const Text('Ownership', style: TextStyle(fontSize: 12, color: AuxiliumTheme.textMuted)),
        const SizedBox(height: 12),
        _buildToggleGroup(['Private', 'Govt'], 'ownershipType'),
      ],
    );
  }

  Widget _buildStep4ProjectSpecs() {
    return _buildFormStep(
      'Project Specs',
      [
        _buildTextField('Project Capacity (MW)', 'projectCapacity', keyboardType: TextInputType.number),
        const SizedBox(height: 16),
        _buildTextField('Plot Area (Acre)', 'plotArea', keyboardType: TextInputType.number),
        const SizedBox(height: 16),
        _buildTextField('GSS Distance (km)', 'gssDistance', keyboardType: TextInputType.number),
      ],
    );
  }

  Widget _buildStep5Review() {
    return Padding(
      padding: const EdgeInsets.all(24.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text('Review Submission', style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold)),
          const SizedBox(height: 24),
          _buildReviewRow('Location', '${_currentPosition?.latitude}, ${_currentPosition?.longitude}'),
          _buildReviewRow('Aggregator', _surveyData['aggregatorName']),
          _buildReviewRow('Category', _surveyData['landCategory']),
          _buildReviewRow('Capacity', '${_surveyData['projectCapacity']} MW'),
          const Spacer(),
          SizedBox(
            width: double.infinity,
            height: 56,
            child: ElevatedButton(
              onPressed: () => context.go('/dashboard'),
              style: ElevatedButton.styleFrom(backgroundColor: AuxiliumTheme.accentOrange, foregroundColor: Colors.black, shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16))),
              child: const Text('Sync with Repository', style: TextStyle(fontWeight: FontWeight.bold)),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildFormStep(String title, List<Widget> children) {
    return Padding(
      padding: const EdgeInsets.all(24.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(title, style: const TextStyle(fontSize: 22, fontWeight: FontWeight.bold)),
          const SizedBox(height: 32),
          ...children,
          const Spacer(),
          Row(
            children: [
              Expanded(child: TextButton(onPressed: _prevStep, child: const Text('Back', style: TextStyle(color: Colors.white)))),
              const SizedBox(width: 16),
              Expanded(
                child: ElevatedButton(
                  onPressed: _nextStep,
                  style: ElevatedButton.styleFrom(backgroundColor: AuxiliumTheme.accentOrange, foregroundColor: Colors.black, shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16))),
                  child: const Text('Next'),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildTextField(String label, String key, {TextInputType? keyboardType}) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(label, style: const TextStyle(fontSize: 12, color: AuxiliumTheme.textMuted)),
        const SizedBox(height: 8),
        TextField(
          keyboardType: keyboardType,
          style: const TextStyle(color: Colors.white),
          onChanged: (v) => _surveyData[key] = v,
          decoration: const InputDecoration(),
        ),
      ],
    );
  }

  Widget _buildToggleGroup(List<String> options, String key) {
    return Wrap(
      spacing: 8,
      children: options.map((opt) {
        final isSelected = _surveyData[key] == opt;
        return GestureDetector(
          onTap: () => setState(() => _surveyData[key] = opt),
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
            decoration: BoxDecoration(
              color: isSelected ? AuxiliumTheme.accentOrange.withOpacity(0.1) : AuxiliumTheme.bgSurface,
              borderRadius: BorderRadius.circular(10),
              border: Border.all(color: isSelected ? AuxiliumTheme.accentOrange : AuxiliumTheme.borderGlass),
            ),
            child: Text(opt, style: TextStyle(color: isSelected ? AuxiliumTheme.accentOrange : AuxiliumTheme.textSecondary, fontWeight: isSelected ? FontWeight.bold : FontWeight.normal)),
          ),
        );
      }).toList(),
    );
  }

  Widget _buildReviewRow(String label, String value) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(label, style: const TextStyle(fontSize: 11, color: AuxiliumTheme.textMuted, letterSpacing: 1)),
          const SizedBox(height: 4),
          Text(value, style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w600)),
          const Divider(color: AuxiliumTheme.borderGlass, height: 24),
        ],
      ),
    );
  }
}
