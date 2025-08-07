import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ExternalLink, Heart, TrendingUp, Users } from 'lucide-react';
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

const getStatusRingClass = (status: string) => {
  switch (status) {
    case 'ativo':
      return 'ring-1 ring-primary/40';
    case 'pausado':
      return 'ring-1 ring-secondary/40';
    case 'finalizado':
      return 'ring-1 ring-destructive/40';
    default:
      return 'ring-1 ring-border';
  }
};

export default function OfferCard({ offer }: OfferCardProps) {
  return (
    <Card
      className={`group relative hover-scale hover:shadow-2xl transition-all duration-300 cursor-pointer rounded-xl ${getStatusRingClass(
        offer.status
      )}`}
      onClick={() => (window.location.href = `/ofertas/${offer.id}`)}
    >
      <CardContent className="p-0">
        {/* Cover */}
        {offer.thumbnail_url && (
          <div className="relative overflow-hidden rounded-t-xl border-b">
            <AspectRatio ratio={16 / 9}>
              <img
                src={offer.thumbnail_url}
                alt={`Imagem da oferta ${offer.title} por ${offer.advertiser_name}`}
                className="h-full w-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              {/* Gradient overlay + shine */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
              <div className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.25),transparent)] transition-transform duration-700 group-hover:translate-x-full" />

              {/* Status pill */}
              <div className="absolute right-3 top-3">
                <Badge variant={getStatusBadgeVariant(offer.status)} className="shadow">
                  {offer.status === 'ativo' ? 'Escalando' : offer.status === 'pausado' ? 'Pré-Escala' : 'Finalizado'}
                </Badge>
              </div>

              {/* Title over image */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center gap-3">
                <Avatar className="h-10 w-10 ring-2 ring-background/80">
                  <AvatarImage src={offer.advertiser_avatar || ''} alt={`Avatar de ${offer.advertiser_name}`} />
                  <AvatarFallback>{offer.advertiser_name?.[0] || 'A'}</AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <h3 className="truncate font-semibold text-card-foreground drop-shadow">
                    {offer.title}
                  </h3>
                  <p className="truncate text-sm text-muted-foreground">{offer.advertiser_name}</p>
                </div>
              </div>
            </AspectRatio>
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          {/* Badges */}
          <div className="mb-4 flex flex-wrap gap-2">
            <Badge variant={getStatusBadgeVariant(offer.status)}>{offer.status}</Badge>
            <Badge variant={getFormatBadgeVariant(offer.format)}>{offer.format}</Badge>
            {offer.niche && <Badge variant="outline">{offer.niche}</Badge>}
          </div>

          {/* Description */}
          {offer.description && (
            <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">{offer.description}</p>
          )}

          {/* Metrics */}
          <div className="mb-4 grid grid-cols-2 gap-4">
            {typeof offer.active_ads === 'number' && offer.active_ads > 0 && (
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{offer.active_ads} anúncios</span>
              </div>
            )}
            {typeof offer.roas === 'number' && (
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">ROAS: {offer.roas.toFixed(2)}</span>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t pt-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Heart className="h-4 w-4" />
              <span>{offer.likes_count}</span>
            </div>
            <Button variant="ghost" size="sm" aria-label="Abrir oferta em nova aba">
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
