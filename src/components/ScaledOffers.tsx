import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Offer, CreateOfferRequest } from '@/types/offer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit, Trash2, ExternalLink, Eye } from 'lucide-react';
import { toast } from 'sonner';

export default function ScaledOffers() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingOffer, setEditingOffer] = useState<Offer | null>(null);
  const [formData, setFormData] = useState<CreateOfferRequest>({
    title: '',
    description: '',
    advertiser_name: '',
    status: 'ativo',
    format: 'videos',
    niche: '',
    language: 'portugues',
    is_published: false,
  });

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('offers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOffers(data || []);
    } catch (error) {
      console.error('Error fetching offers:', error);
      toast.error('Erro ao carregar ofertas');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingOffer) {
        const { error } = await supabase
          .from('offers')
          .update(formData)
          .eq('id', editingOffer.id);

        if (error) throw error;
        toast.success('Oferta atualizada com sucesso!');
      } else {
        const { error } = await supabase
          .from('offers')
          .insert([formData]);

        if (error) throw error;
        toast.success('Oferta criada com sucesso!');
      }

      resetForm();
      fetchOffers();
    } catch (error) {
      console.error('Error saving offer:', error);
      toast.error('Erro ao salvar oferta');
    }
  };

  const handleEdit = (offer: Offer) => {
    setEditingOffer(offer);
    setFormData({
      title: offer.title,
      description: offer.description || '',
      advertiser_name: offer.advertiser_name,
      advertiser_avatar: offer.advertiser_avatar || '',
      facebook_link: offer.facebook_link || '',
      creative_link: offer.creative_link || '',
      library_link: offer.library_link || '',
      website_link: offer.website_link || '',
      status: offer.status,
      format: offer.format,
      niche: offer.niche,
      language: offer.language,
      active_ads: offer.active_ads,
      roas: offer.roas,
      average_ticket: offer.average_ticket,
      thumbnail_url: offer.thumbnail_url || '',
      is_published: offer.is_published,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta oferta?')) return;

    try {
      const { error } = await supabase
        .from('offers')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Oferta excluída com sucesso!');
      fetchOffers();
    } catch (error) {
      console.error('Error deleting offer:', error);
      toast.error('Erro ao excluir oferta');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      advertiser_name: '',
      status: 'ativo',
      format: 'videos',
      niche: '',
      language: 'portugues',
      is_published: false,
    });
    setEditingOffer(null);
    setIsDialogOpen(false);
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'ativo': return 'default';
      case 'pausado': return 'secondary';
      case 'finalizado': return 'destructive';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Ofertas Escaladas</h1>
          <p className="text-muted-foreground">Gerencie ofertas que estão performando bem</p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" asChild>
            <a href="/ofertas" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              Ver Página Pública
            </a>
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => resetForm()}>
                <Plus className="mr-2 h-4 w-4" />
                Nova Oferta
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingOffer ? 'Editar Oferta' : 'Nova Oferta'}
                </DialogTitle>
              </DialogHeader>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <Tabs defaultValue="basic" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="basic">Básico</TabsTrigger>
                    <TabsTrigger value="links">Links</TabsTrigger>
                    <TabsTrigger value="metrics">Métricas</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="basic" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <Label htmlFor="title">Título *</Label>
                        <Input
                          id="title"
                          value={formData.title}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          required
                        />
                      </div>
                      
                      <div className="col-span-2">
                        <Label htmlFor="description">Descrição</Label>
                        <Textarea
                          id="description"
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          rows={3}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="advertiser_name">Nome do Anunciante *</Label>
                        <Input
                          id="advertiser_name"
                          value={formData.advertiser_name}
                          onChange={(e) => setFormData({ ...formData, advertiser_name: e.target.value })}
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="niche">Nicho *</Label>
                        <Input
                          id="niche"
                          value={formData.niche}
                          onChange={(e) => setFormData({ ...formData, niche: e.target.value })}
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="status">Status</Label>
                        <Select value={formData.status} onValueChange={(value: any) => setFormData({ ...formData, status: value })}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ativo">Ativo</SelectItem>
                            <SelectItem value="pausado">Pausado</SelectItem>
                            <SelectItem value="finalizado">Finalizado</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="format">Formato</Label>
                        <Select value={formData.format} onValueChange={(value: any) => setFormData({ ...formData, format: value })}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="videos">Vídeos</SelectItem>
                            <SelectItem value="imagens">Imagens</SelectItem>
                            <SelectItem value="carrossel">Carrossel</SelectItem>
                            <SelectItem value="colecao">Coleção</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="language">Idioma</Label>
                        <Select value={formData.language} onValueChange={(value: any) => setFormData({ ...formData, language: value })}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="portugues">Português</SelectItem>
                            <SelectItem value="ingles">Inglês</SelectItem>
                            <SelectItem value="espanhol">Espanhol</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="thumbnail_url">URL da Thumbnail</Label>
                        <Input
                          id="thumbnail_url"
                          value={formData.thumbnail_url || ''}
                          onChange={(e) => setFormData({ ...formData, thumbnail_url: e.target.value })}
                        />
                      </div>
                      
                      <div className="col-span-2 flex items-center space-x-2">
                        <Switch
                          id="is_published"
                          checked={formData.is_published}
                          onCheckedChange={(checked) => setFormData({ ...formData, is_published: checked })}
                        />
                        <Label htmlFor="is_published">Publicar oferta</Label>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="links" className="space-y-4">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="facebook_link">Link do Facebook</Label>
                        <Input
                          id="facebook_link"
                          value={formData.facebook_link || ''}
                          onChange={(e) => setFormData({ ...formData, facebook_link: e.target.value })}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="creative_link">Link do Criativo</Label>
                        <Input
                          id="creative_link"
                          value={formData.creative_link || ''}
                          onChange={(e) => setFormData({ ...formData, creative_link: e.target.value })}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="library_link">Link da Biblioteca</Label>
                        <Input
                          id="library_link"
                          value={formData.library_link || ''}
                          onChange={(e) => setFormData({ ...formData, library_link: e.target.value })}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="website_link">Link do Site</Label>
                        <Input
                          id="website_link"
                          value={formData.website_link || ''}
                          onChange={(e) => setFormData({ ...formData, website_link: e.target.value })}
                        />
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="metrics" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="active_ads">Anúncios Ativos</Label>
                        <Input
                          id="active_ads"
                          type="number"
                          value={formData.active_ads || ''}
                          onChange={(e) => setFormData({ ...formData, active_ads: parseInt(e.target.value) || 0 })}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="roas">ROAS</Label>
                        <Input
                          id="roas"
                          type="number"
                          step="0.01"
                          value={formData.roas || ''}
                          onChange={(e) => setFormData({ ...formData, roas: parseFloat(e.target.value) || undefined })}
                        />
                      </div>
                      
                      <div className="col-span-2">
                        <Label htmlFor="average_ticket">Ticket Médio (R$)</Label>
                        <Input
                          id="average_ticket"
                          type="number"
                          step="0.01"
                          value={formData.average_ticket || ''}
                          onChange={(e) => setFormData({ ...formData, average_ticket: parseFloat(e.target.value) || undefined })}
                        />
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
                
                <div className="flex justify-end gap-3">
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Cancelar
                  </Button>
                  <Button type="submit">
                    {editingOffer ? 'Atualizar' : 'Criar'} Oferta
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Offers List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {offers.map((offer) => (
          <Card key={offer.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{offer.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{offer.advertiser_name}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(offer)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(offer.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge variant={getStatusBadgeVariant(offer.status)}>
                    {offer.status}
                  </Badge>
                  <Badge variant="outline">{offer.format}</Badge>
                  <Badge variant="outline">{offer.niche}</Badge>
                  {offer.is_published ? (
                    <Badge variant="default">Publicado</Badge>
                  ) : (
                    <Badge variant="secondary">Rascunho</Badge>
                  )}
                </div>
                
                {offer.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {offer.description}
                  </p>
                )}
                
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {offer.active_ads > 0 && (
                    <div>Anúncios: {offer.active_ads}</div>
                  )}
                  {offer.roas && (
                    <div>ROAS: {offer.roas.toFixed(2)}</div>
                  )}
                  <div>Curtidas: {offer.likes_count}</div>
                  <div>
                    Criado: {new Date(offer.created_at).toLocaleDateString('pt-BR')}
                  </div>
                </div>
                
                {offer.is_published && (
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <a href={`/ofertas/${offer.id}`} target="_blank" rel="noopener noreferrer">
                      <Eye className="mr-2 h-4 w-4" />
                      Ver Página Pública
                    </a>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {offers.length === 0 && !loading && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <h3 className="text-lg font-semibold text-foreground mb-2">Nenhuma oferta criada</h3>
            <p className="text-muted-foreground mb-4">Comece criando sua primeira oferta escalada.</p>
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Nova Oferta
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}