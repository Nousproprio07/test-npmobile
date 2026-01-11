import { useCallback, useRef } from "react";

export function useNotificationSound() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const triggerVibration = useCallback(() => {
    // Check if Vibration API is supported
    if ("vibrate" in navigator) {
      // Gentle vibration pattern: short pulse, pause, short pulse
      // Pattern: vibrate 80ms, pause 50ms, vibrate 80ms
      navigator.vibrate([80, 50, 80]);
    }
  }, []);

  const playNotification = useCallback(() => {
    // Always trigger vibration (works even on silent mode)
    triggerVibration();

    try {
      // Create audio element if it doesn't exist
      if (!audioRef.current) {
        audioRef.current = new Audio("/sounds/notification.m4a");
        audioRef.current.volume = 0.6;
      }
      
      // Reset and play
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {
        // Silently fail if autoplay is blocked
        console.log("Audio playback blocked by browser");
      });
    } catch (error) {
      console.log("Audio not supported");
    }
  }, [triggerVibration]);

  return { playNotification, triggerVibration };
}
