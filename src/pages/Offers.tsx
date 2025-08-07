import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Offer, OfferFilters } from '@/types/offer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Heart, ExternalLink, TrendingUp, Users } from 'lucide-react';
import { toast } from 'sonner';

export default function Offers() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<OfferFilters>({});
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    fetchOffers();
  }, [filters]);

  const fetchOffers = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('offers')
        .select('*')
        .eq('is_published', true);

      if (filters.status) {
        query = query.eq('status', filters.status);
      }
      if (filters.format) {
        query = query.eq('format', filters.format);
      }
      if (filters.niche) {
        query = query.eq('niche', filters.niche);
      }
      if (filters.language) {
        query = query.eq('language', filters.language);
      }
      if (filters.search) {
        query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%,advertiser_name.ilike.%${filters.search}%`);
      }

      // Sorting
      switch (filters.sortBy) {
        case 'oldest':
          query = query.order('created_at', { ascending: true });
          break;
        case 'likes':
          query = query.order('likes_count', { ascending: false });
          break;
        case 'roas':
          query = query.order('roas', { ascending: false });
          break;
        case 'ads':
          query = query.order('active_ads', { ascending: false });
          break;
        default:
          query = query.order('created_at', { ascending: false });
      }

      const { data, error } = await query;

      if (error) throw error;
      setOffers(data || []);
    } catch (error) {
      console.error('Error fetching offers:', error);
      toast.error('Erro ao carregar ofertas');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key: keyof OfferFilters, value: string) => {
    const normalized = value === 'all' ? undefined : (value || undefined);
    const newFilters = { ...filters, [key]: normalized };
    setFilters(newFilters);
    
    const params = new URLSearchParams();
    Object.entries(newFilters).forEach(([k, v]) => {
      if (v) params.set(k, String(v));
    });
    setSearchParams(params);
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
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="h-6 bg-muted rounded mb-4"></div>
                  <div className="h-4 bg-muted rounded mb-2"></div>
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Ofertas Escaladas</h1>
          <p className="text-muted-foreground">Descubra ofertas que estão performando bem no mercado</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4">
        {/* Filters */}
        <div className="bg-card p-6 rounded-lg border mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Buscar ofertas..."
                  value={filters.search || ''}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Select value={filters.status || ''} onValueChange={(value) => handleFilterChange('status', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Status</SelectItem>
                <SelectItem value="ativo">Ativo</SelectItem>
                <SelectItem value="pausado">Pausado</SelectItem>
                <SelectItem value="finalizado">Finalizado</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filters.format || ''} onValueChange={(value) => handleFilterChange('format', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Formato" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Formatos</SelectItem>
                <SelectItem value="videos">Vídeos</SelectItem>
                <SelectItem value="imagens">Imagens</SelectItem>
                <SelectItem value="carrossel">Carrossel</SelectItem>
                <SelectItem value="colecao">Coleção</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filters.language || ''} onValueChange={(value) => handleFilterChange('language', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Idioma" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Idiomas</SelectItem>
                <SelectItem value="portugues">Português</SelectItem>
                <SelectItem value="ingles">Inglês</SelectItem>
                <SelectItem value="espanhol">Espanhol</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filters.sortBy || ''} onValueChange={(value) => handleFilterChange('sortBy', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Mais Recentes</SelectItem>
                <SelectItem value="oldest">Mais Antigos</SelectItem>
                <SelectItem value="likes">Mais Curtidos</SelectItem>
                <SelectItem value="roas">Maior ROAS</SelectItem>
                <SelectItem value="ads">Mais Anúncios</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.map((offer) => (
            <Card key={offer.id} className="group hover:shadow-lg transition-all duration-300 cursor-pointer" 
                  onClick={() => window.location.href = `/ofertas/${offer.id}`}>
              <CardContent className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {offer.advertiser_avatar && (
                      <img 
                        src={offer.advertiser_avatar} 
                        alt={offer.advertiser_name}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    )}
                    <div>
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {offer.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{offer.advertiser_name}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant={getStatusBadgeVariant(offer.status)}>
                    {offer.status}
                  </Badge>
                  <Badge variant={getFormatBadgeVariant(offer.format)}>
                    {offer.format}
                  </Badge>
                  <Badge variant="outline">{offer.niche}</Badge>
                </div>

                {/* Description */}
                {offer.description && (
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {offer.description}
                  </p>
                )}

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  {offer.active_ads > 0 && (
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{offer.active_ads} anúncios</span>
                    </div>
                  )}
                  {offer.roas && (
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">ROAS: {offer.roas.toFixed(2)}</span>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Heart className="h-4 w-4" />
                    <span>{offer.likes_count}</span>
                  </div>
                  <Button variant="ghost" size="sm">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {offers.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold text-foreground mb-2">Nenhuma oferta encontrada</h3>
            <p className="text-muted-foreground">Ajuste os filtros para encontrar mais ofertas.</p>
          </div>
        )}
      </div>
    </div>
  );
}