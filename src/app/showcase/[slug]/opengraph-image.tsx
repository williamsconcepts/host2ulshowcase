import { ImageResponse } from "next/og";
import { getProjectBySlug } from "@/lib/store";

export const runtime = "nodejs";
export const alt = "Host2uls Case Study";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  const title = project?.title || "Host2uls Showcase Project";
  const category = project?.category || "Web Development";
  const clientName = project?.clientName || "Host2uls Client";
  const metric = project?.resultMetric || "Built for Nigerian & Global Businesses";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#1E1B4B",
          padding: "60px 80px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Subtle decorative circles */}
        <div
          style={{
            position: "absolute",
            top: -100,
            right: -100,
            width: 400,
            height: 400,
            borderRadius: "50%",
            backgroundColor: "#FF5A5F",
            opacity: 0.15,
          }}
        />

        {/* Top Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                backgroundColor: "#FF5A5F",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#FFFFFF",
                fontSize: 24,
                fontWeight: 900,
              }}
            >
              H
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 28, fontWeight: 900, color: "#FFFFFF" }}>
                Host2uls
              </span>
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#FF5A5F",
                  letterSpacing: 2,
                  textTransform: "uppercase",
                }}
              >
                web services
              </span>
            </div>
          </div>

          <div
            style={{
              backgroundColor: "#23214E",
              border: "1px solid rgba(255, 90, 95, 0.4)",
              borderRadius: 9999,
              padding: "10px 24px",
              color: "#FFFFFF",
              fontSize: 16,
              fontWeight: 700,
            }}
          >
            {category}
          </div>
        </div>

        {/* Center Main Content */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              color: "#FDA4AF",
              fontSize: 18,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: 1.5,
            }}
          >
            Client: {clientName}
          </div>
          <div
            style={{
              fontSize: 54,
              fontWeight: 900,
              color: "#FFFFFF",
              lineHeight: 1.15,
              maxWidth: 950,
            }}
          >
            {title}
          </div>
          <div
            style={{
              backgroundColor: "rgba(255, 90, 95, 0.15)",
              border: "1px solid rgba(255, 90, 95, 0.3)",
              borderRadius: 16,
              padding: "16px 24px",
              color: "#FFFFFF",
              fontSize: 22,
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
            }}
          >
            &rarr; {metric}
          </div>
        </div>

        {/* Bottom Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            paddingTop: "24px",
            color: "#9CA3AF",
            fontSize: 16,
          }}
        >
          <span>host2uls.com/showcase</span>
          <span style={{ color: "#FF5A5F", fontWeight: 700 }}>
            WhatsApp: +234 814 127 2216
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

