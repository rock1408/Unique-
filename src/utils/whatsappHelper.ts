import { BUSINESS_CONFIG } from '../data/businessConfig';

/**
 * Generates direct WhatsApp URLs and handles cross-platform direct redirection.
 * Ensures direct launch of WhatsApp app on mobile and WhatsApp Web / Desktop on PC.
 */

export const getCleanWhatsAppNumber = (): string => {
  let num = BUSINESS_CONFIG.contact.whatsappNumber.replace(/[^0-9]/g, '');
  if (num.length === 10) {
    num = `91${num}`;
  }
  return num;
};

export const getDirectWhatsAppUrl = (customMessage?: string): string => {
  const phone = getCleanWhatsAppNumber();
  const message = customMessage || BUSINESS_CONFIG.contact.whatsappDefaultMessage;
  const encodedText = encodeURIComponent(message);
  
  // Official API endpoint that directly triggers WhatsApp chat on both mobile and desktop
  return `https://api.whatsapp.com/send/?phone=${phone}&text=${encodedText}&type=phone_number&app_absent=0`;
};

export const getNativeWhatsAppScheme = (customMessage?: string): string => {
  const phone = getCleanWhatsAppNumber();
  const message = customMessage || BUSINESS_CONFIG.contact.whatsappDefaultMessage;
  const encodedText = encodeURIComponent(message);
  
  // Custom URI scheme that launches native WhatsApp client immediately on mobile devices
  return `whatsapp://send?phone=${phone}&text=${encodedText}`;
};

/**
 * Robust cross-browser redirect function that avoids iframe popup blocker issues.
 * Triggers native app on mobile or direct web/desktop chat on PC.
 */
export const openWhatsAppDirect = (customMessage?: string) => {
  const directUrl = getDirectWhatsAppUrl(customMessage);
  const nativeUrl = getNativeWhatsAppScheme(customMessage);
  
  const isMobile = typeof navigator !== 'undefined' && 
    /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  if (isMobile) {
    // Try native app scheme first for direct app launch
    const start = Date.now();
    window.location.href = nativeUrl;
    
    // Fallback to web link if native scheme doesn't respond within 1.2s
    setTimeout(() => {
      if (Date.now() - start < 1500) {
        window.open(directUrl, '_blank', 'noopener,noreferrer');
      }
    }, 1200);
  } else {
    // On desktop, programmatically click a clean anchor to prevent iframe popup blocking
    const link = document.createElement('a');
    link.href = directUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
