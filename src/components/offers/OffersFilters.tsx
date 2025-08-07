import { OfferFilters } from '@/types/offer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';

interface OffersFiltersProps {
  filters: OfferFilters;
  onChange: (key: keyof OfferFilters, value: string) => void;
}

export default function OffersFilters({ filters, onChange }: OffersFiltersProps) {
  const hasFilters = Object.entries(filters).some(([k, v]) => k !== 'search' && Boolean(v));

  return (
    <div className="bg-card p-6 rounded-xl border shadow-sm mb-8 animate-enter">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <div className="lg:col-span-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
            <Input
              placeholder="Buscar ofertas..."
              value={filters.search || ''}
              onChange={(e) => onChange('search', e.target.value)}
              className="pl-10"
              aria-label="Buscar ofertas"
            />
          </div>
        </div>

        <Select value={filters.status || ''} onValueChange={(v) => onChange('status', v)}>
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

        <Select value={filters.format || ''} onValueChange={(v) => onChange('format', v)}>
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

        <Select value={filters.language || ''} onValueChange={(v) => onChange('language', v)}>
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

        <div className="flex items-center gap-2">
          <Select value={filters.sortBy || ''} onValueChange={(v) => onChange('sortBy', v)}>
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

          {hasFilters && (
            <Button
              variant="outline"
              onClick={() => {
                onChange('search', '');
                onChange('status', 'all');
                onChange('format', 'all');
                onChange('language', 'all');
                onChange('sortBy', '');
              }}
            >
              Limpar
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
