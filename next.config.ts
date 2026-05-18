import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Allow microphone (and camera, autoplay) on the motionmotors voice-call page.
        // Browsers block getUserMedia when the document has a Permissions-Policy
        // that doesn't include `microphone=(self)`.
        source: "/motionmotors/:path*",
        headers: [
          {
            key: "Permissions-Policy",
            value: 'microphone=(self), camera=(self), autoplay=(self), display-capture=(self)',
          },
        ],
      },
      {
        source: "/motionmotors",
        headers: [
          {
            key: "Permissions-Policy",
            value: 'microphone=(self), camera=(self), autoplay=(self), display-capture=(self)',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
