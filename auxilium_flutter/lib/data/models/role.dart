class UserRole {
  final String id;
  final String title;
  final String description;
  final String iconName;

  UserRole({
    required this.id,
    required this.title,
    required this.description,
    required this.iconName,
  });

  static List<UserRole> roles = [
    UserRole(
      id: 'landowner',
      title: 'Land Owner',
      description: 'List your property for direct developer bids',
      iconName: 'home',
    ),
    UserRole(
      id: 'aggregator',
      title: 'Land Aggregator',
      description: 'Manage multiple parcels and project leads',
      iconName: 'layout_grid',
    ),
    UserRole(
      id: 'developer',
      title: 'Project Developer',
      description: 'Discover and acquire investment-grade land',
      iconName: 'zap',
    ),
    UserRole(
      id: 'legal',
      title: 'Legal Firm',
      description: 'Verify titles and manage due diligence',
      iconName: 'shield_check',
    ),
    UserRole(
      id: 'agent',
      title: 'Field Agent',
      description: 'Run site surveys and GPS scanning ops',
      iconName: 'map_pin',
    ),
  ];
}
