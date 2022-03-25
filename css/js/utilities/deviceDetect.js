
export const detectOS = () => {
  // Detect os name
  let osName = "Unknown";

  if (window.navigator.userAgent.indexOf("Windows NT 10.0") != -1) osName = "Windows 10";
  if (window.navigator.userAgent.indexOf("Windows NT 6.2") != -1) osName = "Windows 8";
  if (window.navigator.userAgent.indexOf("Windows NT 6.1") != -1) osName = "Windows 7";
  if (window.navigator.userAgent.indexOf("Windows NT 6.0") != -1) osName = "Windows Vista";
  if (window.navigator.userAgent.indexOf("Windows NT 5.1") != -1) osName = "Windows XP";
  if (window.navigator.userAgent.indexOf("Windows NT 5.0") != -1) osName = "Windows 2000";
  if (window.navigator.userAgent.indexOf("Mac") != -1) osName = "Mac/iOS";
  if (window.navigator.userAgent.indexOf("X11") != -1) osName = "UNIX";
  if (window.navigator.userAgent.indexOf("Linux") != -1) osName = "Linux";

  // For mobile platform

  if (window.screen.width <= 640) {

    if (/windows phone/i.test(window.navigator.userAgent)) {
      osName = "Windows Phone";
    }
    if (/Android/i.test(window.navigator.userAgent)) {
      osName = "Android";
    }
    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(window.navigator.userAgent) && !window.MSStream) {
      osName = "iOS";
    }
  }

  return osName;
}
