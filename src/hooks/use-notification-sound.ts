import { useCallback, useRef } from "react";

export function useNotificationSound() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const triggerVibration = useCallback(() => {
    // Check if Vibration API is supported
    if ("vibrate" in navigator) {
      // Gentle vibration pattern: short pulse, pause, short pulse
      navigator.vibrate([80, 50, 80]);
    }
  }, []);

  const playNotification = useCallback(() => {
    try {
      // Create audio element if it doesn't exist
      if (!audioRef.current) {
        audioRef.current = new Audio("/sounds/notification.m4a");
        audioRef.current.volume = 0.6;
      }
      
      // Reset and play
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {
        // Sound blocked or on silent mode - trigger vibration as fallback
        console.log("Audio playback blocked - using vibration fallback");
        triggerVibration();
      });
    } catch (error) {
      // Audio not supported - trigger vibration as fallback
      console.log("Audio not supported - using vibration fallback");
      triggerVibration();
    }
  }, [triggerVibration]);

  return { playNotification, triggerVibration };
}
