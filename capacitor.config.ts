import type { CapacitorConfig } from "@capacitor/cli"

const config: CapacitorConfig = {
  appId: "com.nottoai.app",
  appName: "NottoAI",
  webDir: "out",
  server: {
    // Load the deployed web app
    url: "https://nottoai.com",
    cleartext: false,
  },
  ios: {
    scheme: "NottoAI",
    contentInset: "always",
  },
}

export default config
