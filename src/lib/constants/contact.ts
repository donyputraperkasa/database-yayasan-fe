const defaultWhatsappMessage =
  "Halo masdon, saya butuh bantuan untuk Dashboard Yayasan.";

export const itWhatsappUrl =
  process.env.NEXT_PUBLIC_IT_WHATSAPP_URL ??
  `https://wa.me/?text=${encodeURIComponent(defaultWhatsappMessage)}`;
