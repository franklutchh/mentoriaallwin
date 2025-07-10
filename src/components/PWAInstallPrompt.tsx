import React, { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export const PWAInstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      return;
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowPrompt(true);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowPrompt(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    // Show manual prompt for iOS
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isInStandaloneMode = window.matchMedia('(display-mode: standalone)').matches;
    
    if (isIOS && !isInStandaloneMode) {
      setTimeout(() => setShowPrompt(true), 3000);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
        setShowPrompt(false);
      }
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('pwa-prompt-dismissed', Date.now().toString());
  };

  // Don't show if already installed or dismissed recently
  if (isInstalled || !showPrompt) return null;

  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

  return (
    <Card className="fixed bottom-4 left-4 right-4 z-50 p-4 bg-card border shadow-lg">
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
          <Download className="w-6 h-6 text-primary-foreground" />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm text-foreground mb-1">
            Instalar Mentor Hub
          </h3>
          <p className="text-xs text-muted-foreground mb-3">
            {isIOS 
              ? 'Toque no ícone de compartilhar e selecione "Adicionar à Tela de Início"'
              : 'Adicione à sua tela inicial para acesso rápido e experiência completa'
            }
          </p>
          
          <div className="flex gap-2">
            {!isIOS && (
              <Button 
                size="sm" 
                onClick={handleInstallClick}
                className="text-xs h-8 px-3"
              >
                Instalar
              </Button>
            )}
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleDismiss}
              className="text-xs h-8 px-3"
            >
              Agora não
            </Button>
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={handleDismiss}
          className="p-1 h-6 w-6 flex-shrink-0"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    </Card>
  );
};