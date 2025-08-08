import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Offer, OfferFilters } from '@/types/offer';
import OfferCard from '@/components/offers/OfferCard';
import OffersFilters from '@/components/offers/OffersFilters';
import { toast } from 'sonner';
import { Card, CardContent } from '@/components/ui/card';

export default function Offers() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<OfferFilters>({});
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    fetchOffers();
  }, [filters]);

  // SEO
  useEffect(() => {
    document.title = 'Ofertas Escaladas | Descubra ofertas que performam';
    const desc = 'Explore ofertas escaladas com filtros por status, formato e idioma.';
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', desc);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', window.location.href);
  }, []);

  // Structured Data (JSON-LD)
  useEffect(() => {
    const data = {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListElement: offers.map((o, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        url: `${window.location.origin}/ofertas/${o.id}`,
        name: o.title,
      })),
    };

    let script = document.getElementById('offers-jsonld') as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = 'offers-jsonld';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(data);
  }, [offers]);

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

  const getStatusRingClass = (status: string) => {
    switch (status) {
      case 'ativo': return 'ring-1 ring-primary/40';
      case 'pausado': return 'ring-1 ring-secondary/40';
      case 'finalizado': return 'ring-1 ring-destructive/40';
      default: return 'ring-1 ring-border';
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
        <OffersFilters filters={filters} onChange={handleFilterChange} />

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.map((offer) => (
            <OfferCard key={offer.id} offer={offer} />
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