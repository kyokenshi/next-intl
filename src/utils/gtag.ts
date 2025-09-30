// utils/gtag.ts
export const gtag_report_conversion = (url?: string) => {
  const callback = () => {
    if (url) {
      window.location.href = url;
    }
  };

  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'conversion', {
      send_to: 'AW-17540507188/NECOCLKxwaEbELTM-6tB',
      event_callback: callback
    });
  }

  return false;
};
