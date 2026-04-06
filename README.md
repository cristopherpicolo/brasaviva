# 🔥 Brasa Viva — Site Completo

Restaurante & Churrascaria | Vacaria - RS

---

## 📁 Estrutura de Arquivos

```
brasa-viva/
├── index.html     ← Página principal (toda a estrutura)
├── style.css      ← Estilos completos (responsivo, animações)
├── script.js      ← JavaScript (interações, animações)
└── README.md      ← Este arquivo
```

---

## 🚀 Como Publicar

### Opção 1 — Netlify Drop (GRÁTIS, mais fácil)
1. Acesse https://app.netlify.com/drop
2. Arraste a pasta `brasa-viva/` inteira para a área indicada
3. Pronto! O site fica online em segundos com URL grátis

### Opção 2 — GitHub Pages (GRÁTIS)
1. Crie uma conta em https://github.com
2. Crie um repositório novo chamado `brasa-viva`
3. Faça upload dos arquivos (index.html, style.css, script.js)
4. Vá em Settings → Pages → Source: main → Save
5. Acesse: https://SEU_USUARIO.github.io/brasa-viva

### Opção 3 — Vercel (GRÁTIS, mais rápido)
1. Crie conta em https://vercel.com
2. Importe o repositório do GitHub
3. Deploy automático em segundos

### Opção 4 — Hospedagem própria (cPanel/FTP)
1. Compre um domínio (ex: brasaviva.com.br)
2. Contrate uma hospedagem (ex: HostGator, Locaweb)
3. Acesse o gerenciador de arquivos ou use FTP
4. Faça upload dos arquivos para a pasta `public_html/`

---

## 🔧 Personalização Necessária

### 1. Número do WhatsApp
Troque `5554999999999` pelo número real em todos os arquivos.
Exemplo: Se o número for (54) 9 8888-7777 → use `5554988887777`

Busque e substitua `5554999999999` em:
- index.html (múltiplas ocorrências)

### 2. Endereço no Google Maps
No arquivo `index.html`, localize a tag `<iframe>` e substitua o `src` 
pelo link embed do Google Maps do endereço real:
1. Vá para https://maps.google.com
2. Pesquise o endereço
3. Clique em "Compartilhar" → "Incorporar um mapa"
4. Copie o código e substitua o iframe

### 3. Redes Sociais
No rodapé, atualize os links:
```html
<a href="https://facebook.com/SUA_PAGINA">
<a href="https://instagram.com/SEU_PERFIL">
```

### 4. Preços do Cardápio
Atualize os preços na seção cardápio em `index.html`.
Procure por `R$ XX,XX` e atualize conforme os preços reais.

### 5. Fotos Reais (Recomendado)
Substitua os placeholders de emoji por fotos reais:
- Adicione `<img src="foto.jpg" alt="descrição">` dentro de `.menu-card-img`
- Adicione foto real na seção "Sobre" (`.sobre-img-placeholder`)

---

## ✅ Funcionalidades Incluídas

- [x] Design responsivo (mobile-first)
- [x] Menu fixo com efeito ao rolar
- [x] Menu hambúrguer mobile
- [x] Animações suaves ao rolar (Intersection Observer)
- [x] Abas interativas no cardápio
- [x] Partículas de brasa animadas no hero
- [x] Barras de rating animadas
- [x] Contadores animados (Sobre)
- [x] Botão flutuante WhatsApp com pulsação
- [x] Botão voltar ao topo
- [x] Status de aberto/fechado em tempo real
- [x] Efeito ripple nos botões do cardápio
- [x] Mapa com lazy loading (performance)
- [x] SEO básico (meta tags, title, description)
- [x] Open Graph para redes sociais
- [x] Links tel: e wa.me clicáveis
- [x] Acessibilidade (aria-labels, alt texts)

---

## 📞 Suporte

Para dúvidas ou ajustes, entre em contato pelo WhatsApp!
