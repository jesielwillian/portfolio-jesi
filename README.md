# ✦ Jesi — Front-end Developer Portfolio

Portfólio profissional desenvolvido para apresentar minha atuação como **Desenvolvedor Front-end**, reunindo projetos, competências técnicas, serviços e canais de contato em uma experiência digital autoral.

A proposta visual combina uma interface escura com elementos em destaque, microinterações e componentes inspirados no universo de desenvolvimento. Mais do que uma vitrine, o projeto foi pensado para comunicar atenção aos detalhes, consistência visual e cuidado com a experiência de navegação.

## ✨ Sobre o projeto

- **Tipo:** Portfólio profissional
- **Idioma:** Português (Brasil)
- **Formato:** Single Page Website
- **Tecnologias:** HTML5, CSS3, JavaScript e Tailwind CSS
- **Ferramentas:** Vite, Font Awesome e Google Fonts
- **Foco:** UI, responsividade, interações e apresentação de projetos

## 🧭 Seções do portfólio

| Seção | Conteúdo |
|---|---|
| Início | Apresentação, proposta profissional e chamadas para ação |
| Sobre | Resumo do perfil e da forma de trabalho |
| Skills | Tecnologias e competências |
| Projetos | Portfólio de trabalhos com filtros e visualização de detalhes |
| Serviços | Soluções e serviços oferecidos |
| Experiência | Trajetória e informações profissionais |
| Contato | Área para iniciar uma conversa |

## ⚡ Recursos e interações

- Layout responsivo para diferentes tamanhos de tela.
- Navegação por âncoras com indicação da seção ativa.
- Menu mobile com controle de abertura e fechamento.
- Animações de entrada acionadas conforme os elementos aparecem na tela.
- Contadores animados para indicadores do portfólio.
- Filtros e pesquisa para facilitar a navegação entre projetos.
- Modal com informações detalhadas dos projetos.
- Seção de perguntas frequentes em formato accordion.
- Efeitos visuais de cursor e canvas com estrelas.
- Command menu com atalho de teclado `Ctrl + K`.
- Alternância de tema com preferência armazenada no navegador.
- Feedback visual para interações e formulário de contato.

## 🛠️ Stack e ferramentas

| Tecnologia | Utilização |
|---|---|
| HTML5 | Estrutura semântica e conteúdo |
| CSS3 | Layout, responsividade, animações e efeitos |
| JavaScript | Interações e comportamento da interface |
| Tailwind CSS | Camada de utilitários de estilo |
| Vite | Servidor local de desenvolvimento |
| Font Awesome | Ícones |
| Google Fonts | Tipografia DM Sans e Space Grotesk |

## 📁 Estrutura do projeto

```text
portfolio-jesi/
├── css/
│   ├── style.css
│   └── command.css
├── imagens/
│   ├── favicon.png
│   ├── logo.png
│   └── imagens dos projetos e perfil
├── js/
│   ├── command.js
│   ├── counter.js
│   ├── cursor.js
│   ├── modal.js
│   ├── scrollbar.js
│   ├── script.js
│   └── stars.js
├── src/
│   ├── input.css
│   └── output.css
├── index.html
├── package.json
└── package-lock.json
```

## 🚀 Executar localmente

### Pré-requisitos
- Node.js (versão LTS recomendada)
- npm

### Instalação

Na pasta raiz do projeto, instale as dependências:

```bash
npm install
```

Inicie o servidor de desenvolvimento do Vite:

```bash
npx vite
```

Para disponibilizar o servidor na rede local:

```bash
npx vite --host 0.0.0.0
```

Abra no navegador o endereço local exibido pelo Vite — normalmente `http://localhost:5173`.

> O projeto já inclui os arquivos CSS de saída em `src/output.css`. Caso altere o CSS de entrada do Tailwind, gere novamente a saída com a CLI compatível com a versão instalada do Tailwind CSS.

## 🎨 Onde personalizar

- **Conteúdo e estrutura:** `index.html`
- **Estilos principais:** `css/style.css`
- **Estilos do command menu:** `css/command.css`
- **Estilos de entrada do Tailwind:** `src/input.css`
- **Lógica principal e interações:** `js/script.js`
- **Command menu:** `js/command.js`
- **Contadores:** `js/counter.js`
- **Modal de projetos:** `js/modal.js`
- **Efeitos visuais:** `js/cursor.js`, `js/scrollbar.js` e `js/stars.js`
- **Imagens:** `imagens/`

Links de redes sociais, informações de contato, currículo e conteúdo dos projetos podem ser atualizados diretamente no HTML e nos arquivos JavaScript correspondentes.

## 🔧 Próximas evoluções

- Conectar o formulário de contato a um serviço de envio ou backend.
- Substituir links demonstrativos pelos perfis e destinos definitivos.
- Revisar metadados e imagens Open Graph para compartilhamento.
- Adicionar testes automatizados para interações essenciais.
- Acompanhar métricas de acessibilidade, performance e SEO.

## 📌 Observação sobre o formulário

O formulário presente nesta versão apresenta feedback visual no navegador, mas não realiza envio real para um servidor. Para receber mensagens em produção, conecte-o a uma API ou serviço de formulários e implemente validação e proteção contra abuso no backend.

---

<p align="center">
  Desenvolvido com código, criatividade e atenção aos detalhes. ✦
</p>
