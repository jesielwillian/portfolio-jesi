# NEXUS LOG — Transporte & Logística

Site institucional responsivo para uma empresa de transporte e logística, com foco em apresentação comercial, serviços, tecnologia, rastreamento de frota e solicitação de cotação.

## 1. Sobre o projeto

O projeto foi reorganizado com foco em:

- código mais fácil de localizar e manter;
- separação clara por seções;
- CSS em arquitetura **Desktop First**;
- propriedades CSS em ordem alfabética dentro dos seletores;
- seletores/classes organizados alfabeticamente dentro de cada seção;
- remoção de regras CSS duplicadas e declarações redundantes;
- agrupamento de todas as animações `@keyframes`;
- centralização da lógica de contadores;
- comentários estruturais no HTML, CSS e JavaScript;
- manutenção da estrutura visual e funcional existente;
- documentação das configurações necessárias para publicação.

## 2. Estrutura de arquivos

```text
transporte/
├── index.html
├── README.md
├── css/
│   └── style.css
├── js/
│   ├── config.js
│   ├── counter.js
│   ├── custom-select.js
│   └── main.js
└── imagens/
    ├── hero_poster.webp
    └── hero_video.mp4
```

## 3. Tecnologias utilizadas

- HTML5 semântico
- CSS3
- JavaScript moderno (ES6+)
- Google Fonts:
  - Quicksand
  - Archivo
- Font Awesome 6.5.2
- Google Maps JavaScript API
- Intersection Observer API
- `requestAnimationFrame`
- `IntersectionObserver` para lazy-load do vídeo e animações de entrada

## 4. Organização do HTML

O `index.html` foi dividido em blocos comentados:

1. **Metadados / fontes / estilos**
2. **Elementos globais / loader / indicadores**
3. **Header / navegação**
4. **Conteúdo principal**
   - Hero
   - Estatísticas
   - História / Empresa
   - Serviços
   - Tecnologia
   - Rastreamento / Frota
   - Cobertura / Mapa
   - Cotação
5. **Rodapé / contato**
6. **JavaScript**

Cada seção principal possui uma finalidade bem definida e seus IDs são utilizados pela navegação interna.

## 5. Organização do CSS

O `css/style.css` segue uma arquitetura **Desktop First**.

### Ordem das seções

```text
01. Base / Estrutura
02. Header / Navegação
03. Hero / Destaque
04. Estatísticas
05. História / Empresa
06. Serviços / Soluções
07. Tecnologia
08. Rastreamento / Frota
09. Cobertura / Mapa
10. Cotação / Formulário
11. Rodapé
12. Componentes / Utilitários
13. Animações
14. Responsividade — Tablet / 980px
15. Responsividade — Mobile / 700px
16. Responsividade — Mobile pequeno / 420px
17. Acessibilidade — Movimento reduzido
```

### Regras de organização

- `:root` fica no início da base, concentrando as variáveis globais.
- As propriedades de cada seletor são ordenadas alfabeticamente.
- Os seletores são organizados alfabeticamente dentro de cada seção.
- Regras duplicadas foram consolidadas.
- Declarações repetidas dentro do mesmo seletor foram reduzidas à versão efetiva.
- As media queries ficam no final do arquivo.
- A ordem responsiva é:
  - desktop como base;
  - até `980px`;
  - até `700px`;
  - até `420px`;
  - preferência por movimento reduzido.
- Todas as `@keyframes` ficam agrupadas na seção de animações.
- O Custom Select foi incorporado à seção de formulário, evitando um bloco solto depois das media queries.

## 6. JavaScript

### `js/main.js`

Concentra as interações gerais:

- helpers `$` e `$$`;
- lazy-load do vídeo da hero;
- loader inicial;
- progresso de scroll;
- header com estado de scroll;
- menu mobile;
- animações de reveal;
- efeito tilt;
- efeito magnético dos botões;
- rastreamento demonstrativo;
- lista de veículos;
- Google Maps;
- mapa de cobertura;
- atualização simulada da frota;
- navegação suave;
- atualização do item ativo da navegação;
- botão voltar ao topo;
- efeito de cursor.

### `js/counter.js`

Responsável exclusivamente pelos contadores `[data-counter]`.

A lógica foi centralizada para evitar que `main.js` e `counter.js` executassem duas animações diferentes sobre os mesmos elementos.

Também foram mantidos:

- sufixos como `+` e `%`;
- formato abreviado em `K`;
- números decimais;
- ativação somente quando o contador entra na área visível.

### `js/custom-select.js`

Controla o select personalizado da seção de cotação, mantendo o `<select>` nativo como campo de formulário.

Inclui:

- abertura e fechamento;
- seleção de opção;
- estado visual;
- `aria-expanded`;
- `aria-selected`;
- suporte básico a teclado;
- fechamento ao clicar fora.

### `js/config.js`

Arquivo de configuração do Google Maps.

```js
window.NEXUS_CONFIG = Object.freeze({
    GOOGLE_MAPS_API_KEY: "COLOQUE_SUA_GOOGLE_MAPS_API_KEY_AQUI",
    GOOGLE_MAP_ID: "DEMO_MAP_ID"
});
```

## 7. Configuração do Google Maps

Para ativar os mapas:

1. Crie ou utilize um projeto no Google Cloud.
2. Ative a **Maps JavaScript API**.
3. Configure faturamento conforme as regras atuais do Google Cloud.
4. Crie uma API Key.
5. Restrinja a chave ao domínio utilizado pelo site.
6. Abra:

```text
js/config.js
```

7. Substitua:

```js
GOOGLE_MAPS_API_KEY: "COLOQUE_SUA_GOOGLE_MAPS_API_KEY_AQUI"
```

pela chave real.

### Importante

Não publique uma API Key sem restrições.

A aplicação possui mensagens de fallback para quando a API não estiver configurada, evitando que a interface fique completamente sem retorno para o usuário.

## 8. Rastreamento

O rastreamento atual é uma **demonstração front-end**.

Os códigos de teste ficam no objeto `trackingDatabase` em:

```text
js/main.js
```

Os dados incluem:

- veículo;
- motorista;
- origem;
- destino;
- status;
- progresso;
- ETA;
- velocidade;
- eventos.

Para transformar o rastreamento em um sistema real, substitua o banco local por uma API, WebSocket ou outra fonte de telemetria.

A frota exibida no Google Maps também utiliza dados simulados.

## 9. Formulário de cotação

O formulário atualmente funciona como demonstração de interface.

Ao enviar:

- o envio tradicional é impedido;
- uma mensagem de confirmação é exibida;
- o formulário é resetado.

Para produção, conecte o formulário a um backend, API ou serviço de recebimento de leads.

Exemplos de integração possíveis:

- endpoint próprio;
- PHP;
- Node.js;
- serviço de formulários;
- CRM;
- API interna da empresa.

## 10. Responsividade

O projeto utiliza Desktop First.

### Desktop

As regras principais são aplicadas fora das media queries.

### Tablet — `980px`

Ajusta:

- grids;
- espaçamentos;
- hero;
- navegação;
- mapas;
- cartões;
- componentes de rastreamento.

### Mobile — `700px`

Ajusta:

- menu;
- grids para uma coluna;
- tamanhos tipográficos;
- formulários;
- cards;
- mapa;
- rastreamento;
- espaçamentos.

### Mobile pequeno — `420px`

Ajusta especificamente telas menores, reduzindo:

- tipografia;
- largura dos containers;
- altura dos elementos;
- espaçamentos;
- cards;
- componentes de rastreamento.

## 11. Acessibilidade

Foi preservado o suporte a:

- navegação por teclado no Custom Select;
- `aria-label`;
- `aria-expanded`;
- `aria-selected`;
- preferência `prefers-reduced-motion`;
- elementos semânticos de navegação e seções.

Quando o usuário possui redução de movimento ativada, animações, transições e o comportamento de scroll suave são desativados pelo CSS.

## 12. Desempenho

O projeto já utiliza algumas estratégias para reduzir trabalho inicial do navegador:

- carregamento tardio do vídeo da hero;
- `IntersectionObserver`;
- vídeo carregado somente quando se aproxima da viewport;
- carregamento condicional do Google Maps;
- scripts separados por responsabilidade;
- remoção da lógica duplicada de contadores;
- CSS sem regras duplicadas identificadas na organização atual.

### Observação sobre o vídeo

O arquivo:

```text
imagens/hero_video.mp4
```

é o maior recurso do projeto.

Para obter ganhos adicionais de carregamento, recomenda-se futuramente:

- criar uma versão WebM/AV1 ou WebM/VP9;
- reduzir resolução e bitrate para uso em background;
- manter `hero_poster.webp` como imagem de fallback;
- utilizar CDN quando o projeto estiver em produção.

## 13. Personalização rápida

### Cores

As cores principais ficam em `:root`:

```css
:root {
    --bg: ...;
    --bg2: ...;
    --blue: ...;
    --cyan: ...;
    --green: ...;
    --line: ...;
    --muted: ...;
    --panel: ...;
    --panel2: ...;
    --shadow: ...;
    --text: ...;
}
```

Alterar essas variáveis permite modificar grande parte da identidade visual sem procurar cada cor individualmente.

### Largura do conteúdo

A largura máxima está em:

```css
--container: 1180px;
```

### Fontes

As fontes são carregadas no `index.html` e utilizadas principalmente como:

```css
font-family: Quicksand, sans-serif;
font-family: Archivo, sans-serif;
```

## 14. Como executar localmente

O site é estático e pode ser aberto diretamente no navegador.

Para desenvolvimento, recomenda-se utilizar um servidor local, por exemplo:

```text
VS Code → Live Server
```

ou qualquer servidor HTTP local.

Isso é especialmente importante para testar:

- Google Maps;
- carregamento de recursos;
- vídeo;
- comportamento de APIs;
- restrições de domínio da API Key.

## 15. Publicação

Antes de publicar:

- substitua a API Key de demonstração;
- configure as restrições da API Key;
- conecte o formulário a um destino real;
- substitua os dados simulados de rastreamento;
- revise telefone, e-mail e links sociais;
- teste todos os breakpoints;
- teste navegação por teclado;
- teste em Chrome, Edge, Firefox e Safari;
- valide o carregamento do vídeo em dispositivos móveis.

## 16. Manutenção

Ao adicionar CSS novo:

1. Identifique a seção correta.
2. Mantenha a arquitetura Desktop First.
3. Coloque propriedades em ordem alfabética.
4. Evite criar o mesmo seletor duas vezes na mesma seção.
5. Prefira variáveis do `:root` para cores, sombras e medidas reutilizáveis.
6. Coloque alterações de tablet/mobile somente nas media queries correspondentes.
7. Não crie uma nova media query se a regra puder ser incorporada à existente.
8. Para animações novas, adicione o `@keyframes` na seção 13.
9. Para novas interações JavaScript, coloque o código na seção funcional correspondente.

## 17. Resumo da reorganização

A versão entregue foi estruturada para que:

- o HTML fique dividido por áreas funcionais;
- o CSS siga Desktop First;
- o `:root` esteja no início da base;
- propriedades CSS estejam em ordem alfabética;
- seletores/classes estejam organizados por ordem alfabética dentro das seções;
- duplicações de regras sejam consolidadas;
- as animações estejam agrupadas;
- as media queries estejam concentradas no final;
- o Custom Select não fique isolado depois das media queries;
- os contadores tenham uma única implementação;
- cada arquivo JavaScript tenha uma responsabilidade clara;
- o projeto tenha documentação suficiente para manutenção e publicação.
