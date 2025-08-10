import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Offer } from '@/types/offer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft, 
  Heart, 
  Share2, 
  ExternalLink, 
  TrendingUp, 
  Users, 
  DollarSign,
  Globe,
  Film,
  Archive,
  Link2,
  Copy
} from 'lucide-react';
import { toast } from 'sonner';

export default function OfferDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [offer, setOffer] = useState<Offer | null>(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (id) {
      fetchOffer();
    }
  }, [id]);

  const fetchOffer = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('offers')
        .select('*')
        .eq('id', id)
        .eq('is_published', true)
        .single();

      if (error) throw error;
      setOffer(data);
    } catch (error) {
      console.error('Error fetching offer:', error);
      toast.error('Erro ao carregar oferta');
      navigate('/ofertas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!offer) return;
    document.title = `${offer.title} | Detalhes da Oferta`;
    const description = (offer.description || `${offer.advertiser_name} - ${offer.niche}, ${offer.format} em ${getLanguageLabel(offer.language)}`).slice(0, 160);
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', description);
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', window.location.href);
  }, [offer]);

  const handleLike = async () => {
    if (!offer) return;
    
    try {
      const newLikesCount = liked ? offer.likes_count - 1 : offer.likes_count + 1;
      
      const { error } = await supabase
        .from('offers')
        .update({ likes_count: newLikesCount })
        .eq('id', offer.id);

      if (error) throw error;

      setOffer({ ...offer, likes_count: newLikesCount });
      setLiked(!liked);
      toast.success(liked ? 'Curtida removida' : 'Oferta curtida!');
    } catch (error) {
      console.error('Error updating likes:', error);
      toast.error('Erro ao curtir oferta');
    }
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: offer?.title,
        text: offer?.description,
        url: window.location.href,
      });
    } catch (error) {
      // Fallback para copiar URL
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copiado para a área de transferência!');
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'ativo': return 'default';
      case 'pausado': return 'secondary';
      case 'finalizado': return 'destructive';
      default: return 'outline';
    }
  };

  const getFormatBadgeVariant = (format: string) => {
    switch (format) {
      case 'videos': return 'default';
      case 'imagens': return 'secondary';
      case 'carrossel': return 'outline';
      case 'colecao': return 'destructive';
      default: return 'outline';
    }
};

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'ativo': return 'Escalando';
      case 'pausado': return 'Pré-Escala';
      case 'finalizado': return 'Validando';
      default: return status;
    }
  };

  const getLanguageLabel = (language: string) => {
    switch (language) {
      case 'portugues': return 'Português';
      case 'ingles': return 'Inglês';
      case 'espanhol': return 'Espanhol';
      default: return language;
    }
  };

  type LinkItemProps = {
    href: string;
    title: string;
    description: string;
    Icon: any;
  };

  const LinkItem = ({ href, title, description, Icon }: LinkItemProps) => (
    <div className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors">
      <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 min-w-0 group">
        <div className="h-9 w-9 rounded-md bg-muted flex items-center justify-center text-foreground/80">
          <Icon className="h-4 w-4" />
        </div>
        <div className="min-w-0">
          <div className="font-medium text-sm text-foreground group-hover:underline">{title}</div>
          <div className="text-xs text-muted-foreground truncate">{description}</div>
        </div>
      </a>
      <div className="flex items-center gap-2 ml-4">
        <Button variant="ghost" size="icon" asChild aria-label={`Abrir ${title}`}>
          <a href={href} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
        <Button variant="ghost" size="icon" aria-label={`Copiar link de ${title}`} onClick={() => { navigator.clipboard.writeText(href); toast.success('Link copiado!'); }}>
          <Copy className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded mb-4 w-1/4"></div>
            <div className="h-12 bg-muted rounded mb-6"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="h-64 bg-muted rounded mb-6"></div>
                <div className="h-32 bg-muted rounded"></div>
              </div>
              <div className="h-96 bg-muted rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!offer) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">Oferta não encontrada</h2>
          <p className="text-muted-foreground mb-4">A oferta que você está procurando não existe ou foi removida.</p>
          <Button onClick={() => navigate('/ofertas')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para ofertas
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="links-theme min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/ofertas')}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para ofertas
          </Button>
          
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              {offer.advertiser_avatar && (
                <img 
                  src={offer.advertiser_avatar} 
                  alt={offer.advertiser_name}
                  className="h-16 w-16 rounded-full object-cover"
                />
              )}
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">{offer.title}</h1>
                <p className="text-lg text-muted-foreground">por {offer.advertiser_name}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Badge variant={getStatusBadgeVariant(offer.status)}>{getStatusLabel(offer.status)}</Badge>
                  <Badge variant={getFormatBadgeVariant(offer.format)}>{offer.format}</Badge>
                  <Badge variant="outline">{offer.niche}</Badge>
                  <Badge variant="outline">{getLanguageLabel(offer.language)}</Badge>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={handleLike}>
                <Heart className={`mr-2 h-4 w-4 ${liked ? 'fill-current text-red-500' : ''}`} />
                {offer.likes_count}
              </Button>
              <Button variant="outline" onClick={handleShare}>
                <Share2 className="mr-2 h-4 w-4" />
                Compartilhar
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Media Section */}
            {offer.thumbnail_url && (
              <Card>
                <CardContent className="p-6">
                  <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                    <img 
                      src={offer.thumbnail_url} 
                      alt={`Imagem da oferta ${offer.title}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>Descrição</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {offer.description || 'Nenhuma descrição disponível para esta oferta.'}
                </p>
              </CardContent>
            </Card>

            {/* Links */}
            <Card>
              <CardHeader>
                <CardTitle>Links Úteis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {!offer.facebook_link && !offer.creative_link && !offer.library_link && !offer.website_link ? (
                  <p className="text-sm text-muted-foreground">Nenhum link disponível para esta oferta.</p>
                ) : (
                  <>
                    {offer.facebook_link && (
                      <LinkItem
                        href={offer.facebook_link}
                        title="Página no Facebook"
                        description="Acompanhe a página e analise os posts e interações"
                        Icon={Globe}
                      />
                    )}
                    {offer.creative_link && (
                      <LinkItem
                        href={offer.creative_link}
                        title="Link do Criativo"
                        description="Veja o criativo principal utilizado nas campanhas"
                        Icon={Film}
                      />
                    )}
                    {offer.library_link && (
                      <LinkItem
                        href={offer.library_link}
                        title="Biblioteca de Anúncios"
                        description="Explore os anúncios ativos e o histórico da conta"
                        Icon={Archive}
                      />
                    )}
                    {offer.website_link && (
                      <LinkItem
                        href={offer.website_link}
                        title="Site do Anunciante"
                        description="Analise a página de destino e a experiência do funil"
                        Icon={Link2}
                      />
                    )}
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Info Card */}
            <Card>
              <CardHeader>
                <CardTitle>Informações</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Badges */}
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant={getStatusBadgeVariant(offer.status)}>
                      {getStatusLabel(offer.status)}
                    </Badge>
                    <Badge variant={getFormatBadgeVariant(offer.format)}>
                      {offer.format}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">{offer.niche}</Badge>
                    <Badge variant="outline">{getLanguageLabel(offer.language)}</Badge>
                  </div>
                </div>

                <Separator />

                {/* Metrics */}
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
                      <TrendingUp className="h-5 w-5 text-primary mx-auto mb-2" />
                      <div className="font-bold text-lg text-foreground">{offer.roas.toFixed(2)}x</div>
                      <div className="text-xs text-muted-foreground">ROAS</div>
                    </div>
                  )}
                  {typeof offer.average_ticket === 'number' && (
                    <div className="bg-muted/50 rounded-xl p-4 text-center">
                      <DollarSign className="h-5 w-5 text-primary mx-auto mb-2" />
                      <div className="font-bold text-lg text-foreground">R$ {offer.average_ticket.toFixed(2)}</div>
                      <div className="text-xs text-muted-foreground">Ticket</div>
                    </div>
                  )}
                </div>

                <Separator />

                {/* Date */}
                <div className="text-sm text-muted-foreground">
                  Publicado em {new Date(offer.created_at).toLocaleDateString('pt-BR')}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}