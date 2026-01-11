import { useCallback, useRef, useEffect } from "react";

export function useNotificationSound() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Preload audio on mount for instant playback
  useEffect(() => {
    audioRef.current = new Audio("/sounds/notification.m4a");
    audioRef.current.volume = 0.6;
    audioRef.current.preload = "auto";
    
    // Force browser to load the audio file
    audioRef.current.load();
  }, []);

  const triggerVibration = useCallback(() => {
    if ("vibrate" in navigator) {
      navigator.vibrate([80, 50, 80]);
    }
  }, []);

  const playNotification = useCallback(() => {
    try {
      if (audioRef.current) {
        // Reset to start and play immediately
        audioRef.current.currentTime = 0;
        
        // Use play() promise to detect if sound played successfully
        const playPromise = audioRef.current.play();
        
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Sound blocked or silent mode - vibrate as fallback
            triggerVibration();
          });
        }
      }
    } catch (error) {
      triggerVibration();
    }
  }, [triggerVibration]);

  return { playNotification, triggerVibration };
}
