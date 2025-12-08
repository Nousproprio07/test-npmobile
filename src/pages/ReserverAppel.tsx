import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, Video } from "lucide-react";
import Logo from "@/components/Logo";

const ReserverAppel = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  
  const accompaniment = location.state?.accompaniment;
  const prenom = location.state?.prenom || "Ami(e)";

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Simulated available dates (next 7 days)
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      if (date.getDay() !== 0 && date.getDay() !== 6) { // Exclude weekends
        dates.push({
          value: date.toISOString().split('T')[0],
          label: date.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' })
        });
      }
    }
    return dates;
  };

  const availableDates = getAvailableDates();
  const availableTimes = ["10:00", "11:00", "14:00", "15:00", "16:00", "17:00"];

  const handleConfirm = () => {
    // Simulation - in reality would integrate with Calendly
    alert(`Simulation: Rendez-vous confirmé pour ${selectedDate} à ${selectedTime}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-hero">
        <div className="container py-6">
          <header className="flex items-center justify-between">
            <Logo variant="light" />
            <Button 
              variant="ghost" 
              className="text-primary-foreground hover:bg-primary-foreground/10"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour
            </Button>
          </header>
        </div>
      </div>

      {/* Simulation Banner */}
      <div className="bg-accent py-3">
        <div className="container">
          <p className="text-center text-sm font-bold text-white uppercase tracking-wide">
            ⚠️ SIMULATION PAGE CALENDLY - Pour l'équipe CRO et Développeur ⚠️
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="container py-8 md:py-12">
        <div className={`max-w-2xl mx-auto transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          
          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
              Réserve ton appel découverte
            </h1>
            <p className="text-muted-foreground">
              30 minutes pour discuter de ton projet avec un expert NousProprio
            </p>
            {accompaniment && (
              <div className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                Pack concerné : {accompaniment.type}
              </div>
            )}
          </div>

          {/* Calendar simulation */}
          <div className="bg-card rounded-2xl p-6 md:p-8 shadow-elegant border border-border">
            
            {/* Meeting info */}
            <div className="flex items-center gap-4 pb-6 mb-6 border-b border-border">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                <Video className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Appel Découverte NousProprio</h3>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    30 min
                  </span>
                  <span>•</span>
                  <span>Google Meet</span>
                </div>
              </div>
            </div>

            {/* Date selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-foreground mb-3">
                <Calendar className="w-4 h-4 inline mr-2" />
                Choisis une date
              </label>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                {availableDates.map((date) => (
                  <button
                    key={date.value}
                    onClick={() => setSelectedDate(date.value)}
                    className={`px-3 py-3 rounded-lg text-sm font-medium transition-all ${
                      selectedDate === date.value
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted hover:bg-muted/80 text-foreground'
                    }`}
                  >
                    {date.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Time selection */}
            {selectedDate && (
              <div className={`mb-6 transition-all duration-300 ${selectedDate ? 'opacity-100' : 'opacity-0'}`}>
                <label className="block text-sm font-medium text-foreground mb-3">
                  <Clock className="w-4 h-4 inline mr-2" />
                  Choisis un horaire
                </label>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                  {availableTimes.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`px-3 py-3 rounded-lg text-sm font-medium transition-all ${
                        selectedTime === time
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted hover:bg-muted/80 text-foreground'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Confirm button */}
            {selectedDate && selectedTime && (
              <div className={`transition-all duration-300 ${selectedTime ? 'opacity-100' : 'opacity-0'}`}>
                <Button 
                  variant="cta" 
                  size="lg" 
                  className="w-full"
                  onClick={handleConfirm}
                >
                  Confirmer le rendez-vous
                </Button>
                <p className="text-center text-xs text-muted-foreground mt-3">
                  Tu recevras un email de confirmation avec le lien Google Meet
                </p>
              </div>
            )}
          </div>

          {/* Trust elements */}
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              ✨ Gratuit et sans engagement • Conseils personnalisés • 100% indépendant
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReserverAppel;
