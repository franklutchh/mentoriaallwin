
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ExternalLink, Heart, TrendingUp, Users, DollarSign, Globe, Tag } from 'lucide-react';
import { Offer } from '@/types/offer';

interface OfferCardProps {
  offer: Offer;
}

const getStatusBadgeVariant = (status: string) => {
  switch (status) {
    case 'ativo':
      return 'default' as const;
    case 'pausado':
      return 'secondary' as const;
    case 'finalizado':
      return 'destructive' as const;
    default:
      return 'outline' as const;
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'ativo':
      return 'Escalando';
    case 'pausado':
      return 'Pré-Escala';
    case 'finalizado':
      return 'Validando';
    default:
      return status;
  }
};

const getFormatBadgeVariant = (format: string) => {
  switch (format) {
    case 'videos':
      return 'default' as const;
    case 'imagens':
      return 'secondary' as const;
    case 'carrossel':
      return 'outline' as const;
    case 'colecao':
      return 'destructive' as const;
    default:
      return 'outline' as const;
  }
};

const getLanguageLabel = (language: string) => {
  switch (language) {
    case 'portugues':
      return 'Português';
    case 'ingles':
      return 'Inglês';
    case 'espanhol':
      return 'Espanhol';
    default:
      return language;
  }
};

export default function OfferCard({ offer }: OfferCardProps) {
  return (
    <Card
      className="group relative hover:shadow-2xl transition-all duration-300 cursor-pointer rounded-2xl overflow-hidden border-2 hover:border-primary/20"
      onClick={() => (window.location.href = `/ofertas/${offer.id}`)}
    >
      <CardContent className="p-0">
        {/* Cover Image */}
        {offer.thumbnail_url && (
          <div className="relative overflow-hidden">
            <AspectRatio ratio={16 / 9}>
              <img
                src={offer.thumbnail_url}
                alt={`Imagem da oferta ${offer.title} por ${offer.advertiser_name}`}
                className="h-full w-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
              
              {/* Status badge */}
              <div className="absolute top-4 right-4">
                <Badge 
                  variant={getStatusBadgeVariant(offer.status)} 
                  className="text-xs font-semibold px-3 py-1 shadow-lg"
                >
                  {getStatusLabel(offer.status)}
                </Badge>
              </div>

              {/* Title and advertiser info */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center gap-3 mb-3">
                  <Avatar className="h-12 w-12 ring-2 ring-white/80 shadow-lg">
                    <AvatarImage src={offer.advertiser_avatar || ''} alt={`Avatar de ${offer.advertiser_name}`} />
                    <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                      {offer.advertiser_name?.[0] || 'A'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-white text-lg drop-shadow-lg line-clamp-1">
                      {offer.title}
                    </h3>
                    <p className="text-white/90 text-sm drop-shadow">{offer.advertiser_name}</p>
                  </div>
                </div>
              </div>
            </AspectRatio>
          </div>
        )}

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Category badges */}
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="flex items-center gap-1.5 px-3 py-1">
              <Tag className="h-3 w-3" />
              {offer.niche}
            </Badge>
            <Badge variant={getFormatBadgeVariant(offer.format)} className="px-3 py-1">
              {offer.format}
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1.5 px-3 py-1">
              <Globe className="h-3 w-3" />
              {getLanguageLabel(offer.language)}
            </Badge>
          </div>

          {/* Description */}
          {offer.description && (
            <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">
              {offer.description}
            </p>
          )}

          {/* Metrics cards */}
          <div className="grid grid-cols-3 gap-3">
            {typeof offer.active_ads === 'number' && offer.active_ads > 0 && (
              <div className="bg-muted/50 rounded-xl p-4 text-center">
                <Users className="h-5 w-5 text-primary mx-auto mb-2" />
                <div className="font-bold text-lg text-foreground">{offer.active_ads}</div>
                <div className="text-xs text-muted-foreground">Anúncios</div>
              </div>
            )}
            {typeof offer.roas === 'number' && (
              <div className="bg-muted/50 rounded-xl p-4 text-center">
                <TrendingUp className="h-5 w-5 text-green-600 mx-auto mb-2" />
                <div className="font-bold text-lg text-foreground">{offer.roas.toFixed(1)}x</div>
                <div className="text-xs text-muted-foreground">ROAS</div>
              </div>
            )}
            {typeof offer.average_ticket === 'number' && (
              <div className="bg-muted/50 rounded-xl p-4 text-center">
                <DollarSign className="h-5 w-5 text-emerald-600 mx-auto mb-2" />
                <div className="font-bold text-lg text-foreground">R${offer.average_ticket}</div>
                <div className="text-xs text-muted-foreground">Ticket</div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-border/50">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Heart className="h-4 w-4" />
              <span className="text-sm font-medium">{offer.likes_count}</span>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="hover:bg-primary/10 hover:text-primary"
              aria-label="Ver detalhes da oferta"
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
