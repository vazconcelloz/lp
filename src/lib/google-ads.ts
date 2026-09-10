export const gtagReportConversion = (url?: string) => {
  if (typeof window === "undefined") {
    return false;
  }

  const globalReporter = (window as any).gtag_report_conversion;
  if (typeof globalReporter === "function") {
    return globalReporter(url);
  }

  if (!(window as any).gtag) {
    return false;
  }

  const callback = () => {
    if (typeof url !== "undefined") {
      window.location.href = url;
    }
  };

  (window as any).gtag("event", "conversion", {
    send_to: "AW-825474787/ChbOCNmR6ZUYEOP9zokD",
    event_callback: callback
  });

  return false;
};

export const reportGoogleAdsConversion = () => gtagReportConversion();
