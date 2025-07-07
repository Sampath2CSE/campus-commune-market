import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.35267ad81a3d47bb86eab5774a75fa4e',
  appName: 'campus-commune-market',
  webDir: 'dist',
  server: {
    url: 'https://35267ad8-1a3d-47bb-86ea-b5774a75fa4e.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    Camera: {
      permissions: ['camera', 'photos']
    }
  }
};

export default config;