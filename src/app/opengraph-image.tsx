import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 96px",
          background: "radial-gradient(circle at 80% 30%, #1e293b 0%, #020817 55%)",
          color: "#f8fafc",
        }}
      >
        <div style={{ fontSize: 32, color: "#a1a1aa" }}>Hi, I am</div>
        <div style={{ fontSize: 120, fontWeight: 700, lineHeight: 1.05, marginTop: 8 }}>{site.name}</div>
        <div style={{ fontSize: 36, color: "#94a3b8", marginTop: 28 }}>{site.roles.join(" · ")}</div>
      </div>
    ),
    size,
  );
}
