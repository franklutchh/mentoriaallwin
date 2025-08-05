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
  Eye,
  Image as ImageIcon,
  Play
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
    <div className="min-h-screen bg-background">
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
                      alt={offer.title}
                      className="w-full h-full object-cover"
                    />
                    {offer.format === 'videos' && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-black/50 rounded-full p-4">
                          <Play className="h-8 w-8 text-white" />
                        </div>
                      </div>
                    )}
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
                {offer.facebook_link && (
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href={offer.facebook_link} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Página no Facebook
                    </a>
                  </Button>
                )}
                {offer.creative_link && (
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href={offer.creative_link} target="_blank" rel="noopener noreferrer">
                      <ImageIcon className="mr-2 h-4 w-4" />
                      Link do Criativo
                    </a>
                  </Button>
                )}
                {offer.library_link && (
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href={offer.library_link} target="_blank" rel="noopener noreferrer">
                      <Eye className="mr-2 h-4 w-4" />
                      Biblioteca de Anúncios
                    </a>
                  </Button>
                )}
                {offer.website_link && (
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href={offer.website_link} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Site do Anunciante
                    </a>
                  </Button>
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
                      {offer.status}
                    </Badge>
                    <Badge variant={getFormatBadgeVariant(offer.format)}>
                      {offer.format}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">{offer.niche}</Badge>
                    <Badge variant="outline">{offer.language}</Badge>
                  </div>
                </div>

                <Separator />

                {/* Metrics */}
                <div className="space-y-3">
                  {offer.active_ads > 0 && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Anúncios Ativos</span>
                      </div>
                      <span className="font-semibold">{offer.active_ads}</span>
                    </div>
                  )}
                  
                  {offer.roas && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">ROAS</span>
                      </div>
                      <span className="font-semibold">{offer.roas.toFixed(2)}</span>
                    </div>
                  )}
                  
                  {offer.average_ticket && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Ticket Médio</span>
                      </div>
                      <span className="font-semibold">R$ {offer.average_ticket.toFixed(2)}</span>
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