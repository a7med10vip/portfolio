import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  // The signature renderer reads its plate and fonts off disk at request time,
  // and file tracing can't see through the path join to find them.
  outputFileTracingIncludes: {
    "/api/signature/img": ["./src/lib/signature/assets/**"],
  },
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
