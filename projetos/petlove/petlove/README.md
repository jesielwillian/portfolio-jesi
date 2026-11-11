# PetLove — Pet shop front-end

Site responsivo multipágina desenvolvido em HTML, CSS e JavaScript puro.

## Páginas
- `index.html`: landing page com hero animada, categorias, produtos, counters, depoimentos e newsletter.
- `produtos.html`: catálogo com pesquisa, filtros de categoria/preço e ordenação.
- `produto.html`: detalhe dinâmico do produto via `?id=...`.
- `carrinho.html`: carrinho persistido em `localStorage`, quantidades, remoção e resumo.
- `checkout.html`: formulário de checkout demonstrativo com validação e seleção de pagamento.
- `servicos.html`: serviços e CTAs de agendamento.
- `sobre.html`: história, valores e números animados.
- `contato.html`: formulário demonstrativo e FAQ.

## Como executar
Abra `index.html` no navegador ou sirva a pasta com um servidor estático (recomendado para desenvolvimento), por exemplo:

```bash
python -m http.server 8000
```

Depois acesse `http://localhost:8000`.

## Imagens

Coloque imagens em `assets/images/`. O arquivo `assets/images/README.txt` traz a lista completa dos nomes e dimensões recomendadas.

- Destaque da home: `hero-pet.jpg` — 1200 × 1400 px.
- História da marca: `our-story.jpg` — 1000 × 1300 px.
- Fotos de produtos: 1000 × 1000 px cada; os nomes já estão configurados em `js/app.js`.

Se uma imagem de produto ainda não existir, o site mantém a ilustração de fallback até você adicionar o arquivo correto.

## Observações importantes
Este é um protótipo front-end, não uma loja pronta para receber pagamentos. Carrinho e preferências são locais ao navegador. Formulários não enviam dados para um servidor; o checkout não processa pagamentos. Para produção, integre backend/API, estoque, frete, autenticação quando necessária, gateway de pagamento PCI-compliant, proteção contra abuso, validação server-side, HTTPS, política de privacidade/LGPD, logs e monitoramento. Não armazene dados de cartão no front-end.


## Controle de zoom das imagens

Edite o bloco `CONTROLE DE ZOOM DAS IMAGENS` no final de `css/style.css`.

- `--zoom-hero`: zoom da foto principal da home.
- `--zoom-historia`: zoom das fotos da seção/página Nossa história.
- `--zoom-produtos`: zoom das imagens dos cards de produto.
- `--posicao-*`: posição do recorte, usando valores CSS como `center center`, `center top`, `left center` ou `60% 40%`.

Escala `1` mantém o tamanho normal; `1.15` aproxima 15%; `0.90` reduz 10%. Valores muito altos podem cortar partes da foto.
Exemplo: `--zoom-produtos: 0.85;` e `--posicao-produtos: center center;`.


### Zoom dos produtos na página inicial

Edite `petlove/css/style.css` nas variáveis `--index-product-image-zoom` e `--index-product-image-zoom-hover`. Use `1` para tamanho original, `0.90` para reduzir 10%, ou `1.10` para ampliar 10%. Esse controle afeta apenas os produtos em destaque do `index.html`; a página da loja não é alterada.


## Refinamento visual — edição premium

Esta versão preserva a identidade visual azul-clara da PetLove e aprimora
hierarquia, espaçamento, estados de foco, feedbacks, elevação dos cards,
microinterações, cabeçalho durante a rolagem e navegação responsiva.

### Como executar
Abra `index.html` em um navegador ou utilize uma extensão/servidor local
(como Live Server no VS Code). Os arquivos são estáticos e não exigem build.

### Observação
Carrinho, favoritos, filtros e checkout funcionam como demonstração no
navegador. Para receber pedidos reais, conecte um backend, estoque, frete
e um provedor de pagamento; o checkout atual informa que não processa cobranças.
