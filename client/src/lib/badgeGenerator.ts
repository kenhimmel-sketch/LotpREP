import JsBarcode from "jsbarcode";

export interface BadgeData {
  memberName: string;
  memberId: string;
  parkCode: string;
  parkName: string;
  parkColor: string;
  role: string;
  joinDate: string; // MM/YYYY format
  profileImageUrl?: string;
  issuedAt: string; // ISO date
}

// Park code to 4-letter abbreviation mapping
const PARK_CODE_MAP: Record<string, string> = {
  acacia: "ACAC",
  discovery: "DISC",
  veterans: "VETS",
  sunset: "SUNS",
};

// Load Google Fonts dynamically
function loadFont(fontFamily: string, fontWeight: string = "400"): Promise<void> {
  return new Promise((resolve) => {
    const link = document.createElement("link");
    link.href = `https://fonts.googleapis.com/css2?family=${fontFamily.replace(
      " ",
      "+"
    )}:wght@${fontWeight}&display=swap`;
    link.rel = "stylesheet";
    document.head.appendChild(link);

    // Wait for font to load
    document.fonts.ready.then(() => {
      setTimeout(resolve, 100);
    });
  });
}

// Generate diagonal noise texture
function generateNoisePattern(ctx: CanvasRenderingContext2D, width: number, height: number) {
  const imageData = ctx.createImageData(width, height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const noise = Math.random() * 255 * 0.04; // 4% opacity
    data[i] = noise; // R
    data[i + 1] = noise; // G
    data[i + 2] = noise; // B
    data[i + 3] = noise; // A
  }

  return imageData;
}

export async function generateBadge(badgeData: BadgeData): Promise<string> {
  // Load required fonts
  await Promise.all([
    loadFont("Cinzel", "400;700"),
    loadFont("Inter", "400;600;700"),
    loadFont("Roboto+Mono", "400"),
  ]);

  // Create canvas
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not get canvas context");

  // Set dimensions (1.5x for retina)
  const WIDTH = 954;
  const HEIGHT = 1518;
  canvas.width = WIDTH;
  canvas.height = HEIGHT;

  // Colors
  const BLACK = "#000000";
  const GOLD = "#D4AF37";
  const GOLD_DARK = "#A88427";
  const GREEN_ACCENT = "#2EB67D";
  const PARK_COLOR = badgeData.parkColor;

  // Fill black background
  ctx.fillStyle = BLACK;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // Add diagonal noise texture
  const noise = generateNoisePattern(ctx, WIDTH, HEIGHT);
  ctx.putImageData(noise, 0, 0);

  // Draw 1px faint gold inner frame
  ctx.strokeStyle = `${GOLD}30`; // 30 = ~18% opacity
  ctx.lineWidth = 1;
  ctx.strokeRect(12, 12, WIDTH - 24, HEIGHT - 24);

  // === TOP SECTION: BRANDING ===
  const topMargin = 60;

  // Title: "LEGENDS OF THE PARK"
  ctx.fillStyle = GOLD;
  ctx.font = "700 48px Cinzel";
  ctx.textAlign = "center";
  ctx.letterSpacing = "8px";
  ctx.fillText("LEGENDS OF THE PARK", WIDTH / 2, topMargin);

  // Tagline
  ctx.fillStyle = `${GOLD}AA`; // Muted gold
  ctx.font = "400 14px Inter";
  ctx.letterSpacing = "2px";
  ctx.fillText("DEFEND WHAT'S LOCAL", WIDTH / 2, topMargin + 30);

  // Park accent stripe (2px under title)
  ctx.fillStyle = PARK_COLOR;
  ctx.fillRect(WIDTH / 2 - 200, topMargin + 45, 400, 3);

  // === MIDDLE SECTION: PHOTO + INFO ===
  const contentTop = topMargin + 80;
  const photoSize = 240;
  const photoX = 80;
  const photoY = contentTop;

  // Draw circular photo with gold ring
  ctx.save();
  ctx.beginPath();
  ctx.arc(photoX + photoSize / 2, photoY + photoSize / 2, photoSize / 2, 0, Math.PI * 2);
  ctx.closePath();
  ctx.clip();

  // Fill with dark background if no image
  ctx.fillStyle = "#1a1a1a";
  ctx.fillRect(photoX, photoY, photoSize, photoSize);

  // Draw profile image if available
  if (badgeData.profileImageUrl) {
    try {
      const img = new Image();
      img.crossOrigin = "anonymous";
      await new Promise<void>((resolve, reject) => {
        img.onload = () => {
          ctx.drawImage(img, photoX, photoY, photoSize, photoSize);
          resolve();
        };
        img.onerror = reject;
        img.src = badgeData.profileImageUrl!;
      });
    } catch (e) {
      // If image fails to load, show initials
      ctx.fillStyle = GOLD;
      ctx.font = "700 72px Inter";
      ctx.textAlign = "center";
      ctx.fillText(
        badgeData.memberName
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
          .slice(0, 2),
        photoX + photoSize / 2,
        photoY + photoSize / 2 + 24
      );
    }
  } else {
    // Show initials
    ctx.fillStyle = GOLD;
    ctx.font = "700 72px Inter";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(
      badgeData.memberName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2),
      photoX + photoSize / 2,
      photoY + photoSize / 2
    );
  }

  ctx.restore();

  // Gold ring around photo
  ctx.strokeStyle = GOLD;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(photoX + photoSize / 2, photoY + photoSize / 2, photoSize / 2 + 1, 0, Math.PI * 2);
  ctx.stroke();

  // === RIGHT COLUMN: TEXT INFO ===
  const textX = photoX + photoSize + 60;
  const textStartY = contentTop + 20;

  // Member Name
  ctx.fillStyle = GOLD;
  ctx.font = "700 32px Inter";
  ctx.textAlign = "left";
  ctx.letterSpacing = "0px";
  const nameLines = wrapText(ctx, badgeData.memberName.toUpperCase(), 360, 2);
  nameLines.forEach((line, i) => {
    ctx.fillText(line, textX, textStartY + i * 38);
  });

  // Role
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "600 16px Inter";
  ctx.fillText(badgeData.role.toUpperCase(), textX, textStartY + nameLines.length * 38 + 30);

  // Two-column spec list
  const specStartY = textStartY + nameLines.length * 38 + 70;
  const labelStyle = "400 12px Inter";
  const valueStyle = "400 14px Inter";
  const lineHeight = 32;

  const specs = [
    { label: "PARK CODE", value: PARK_CODE_MAP[badgeData.parkCode] || badgeData.parkCode.toUpperCase() },
    { label: "MEMBER ID", value: badgeData.memberId },
    { label: "JOINED", value: badgeData.joinDate },
  ];

  specs.forEach((spec, i) => {
    const y = specStartY + i * lineHeight;

    // Label (70% white)
    ctx.fillStyle = "#FFFFFFB3";
    ctx.font = labelStyle;
    ctx.fillText(spec.label, textX, y);

    // Value (90% white)
    ctx.fillStyle = "#FFFFFFE6";
    ctx.font = valueStyle;
    ctx.fillText(spec.value, textX + 140, y);

    // Thin gold separator line
    if (i < specs.length - 1) {
      ctx.strokeStyle = `${GOLD}2E`; // 18% opacity
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(textX, y + lineHeight / 2 + 6);
      ctx.lineTo(textX + 360, y + lineHeight / 2 + 6);
      ctx.stroke();

      // Micro green dot separator
      ctx.fillStyle = GREEN_ACCENT;
      ctx.beginPath();
      ctx.arc(textX + 180, y + lineHeight / 2 + 6, 2, 0, Math.PI * 2);
      ctx.fill();
    }
  });

  // === BOTTOM SECTION: BARCODE BAND ===
  const barcodeHeight = 128;
  const barcodeY = HEIGHT - barcodeHeight;

  // Gold background band
  ctx.fillStyle = GOLD;
  ctx.fillRect(0, barcodeY, WIDTH, barcodeHeight);

  // Generate barcode
  const barcodePayload = `LOTP|v1|${badgeData.memberId}|${
    PARK_CODE_MAP[badgeData.parkCode]
  }|${badgeData.issuedAt}`;

  const barcodeCanvas = document.createElement("canvas");
  JsBarcode(barcodeCanvas, barcodePayload, {
    format: "CODE128",
    width: 3,
    height: 60,
    displayValue: false,
    margin: 10,
  });

  // Draw barcode on badge
  const barcodeImgX = WIDTH / 2 - barcodeCanvas.width / 2;
  const barcodeImgY = barcodeY + 20;
  ctx.drawImage(barcodeCanvas, barcodeImgX, barcodeImgY);

  // Human-readable ID under barcode with hairline above
  ctx.strokeStyle = BLACK;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(barcodeImgX, barcodeImgY + 70);
  ctx.lineTo(barcodeImgX + barcodeCanvas.width, barcodeImgY + 70);
  ctx.stroke();

  ctx.fillStyle = BLACK;
  ctx.font = "400 16px 'Roboto Mono'";
  ctx.textAlign = "center";
  ctx.fillText(badgeData.memberId, WIDTH / 2, barcodeImgY + 90);

  // Convert to PNG
  return canvas.toDataURL("image/png");
}

// Helper function to wrap text
function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  maxLines: number
): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let currentLine = words[0];

  for (let i = 1; i < words.length && lines.length < maxLines - 1; i++) {
    const word = words[i];
    const width = ctx.measureText(currentLine + " " + word).width;
    if (width < maxWidth) {
      currentLine += " " + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }

  if (lines.length < maxLines) {
    lines.push(currentLine);
  } else {
    // Truncate last line with ellipsis
    const lastLine = currentLine;
    let truncated = lastLine;
    while (ctx.measureText(truncated + "...").width > maxWidth && truncated.length > 0) {
      truncated = truncated.slice(0, -1);
    }
    lines[lines.length - 1] = truncated + "...";
  }

  return lines;
}
