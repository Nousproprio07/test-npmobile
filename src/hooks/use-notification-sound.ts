import { useCallback, useRef } from "react";

export function useNotificationSound() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playNotification = useCallback(() => {
    try {
      // Create audio element if it doesn't exist
      if (!audioRef.current) {
        audioRef.current = new Audio("/sounds/notification.mp3");
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
  }, []);

  return { playNotification };
}
