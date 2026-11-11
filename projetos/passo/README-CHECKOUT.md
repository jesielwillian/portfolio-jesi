# PASSO LABS — Checkout Mercado Pago

## O que foi implementado
- Checkout ligado ao carrinho via `localStorage`.
- Revalidação dos IDs, quantidades e preços no servidor.
- Frete calculado no servidor: grátis a partir de R$ 299,00; abaixo disso, R$ 19,90.
- Criação de pedidos no Mercado Pago Checkout Pro (Orders API).
- Redirecionamento para a página segura de pagamento do Mercado Pago.
- Persistência dos pedidos em SQLite.
- Página `pedido-status.html` e consulta do status real no backend.
- Webhook com validação HMAC SHA-256 usando `x-signature`, `x-request-id` e `data.id`.
- Idempotência por tentativa do cliente e por pedido criado no Mercado Pago.
- Limite de requisições, Helmet, limite de payload e token de pagamento apenas no servidor.

## Requisitos
- Node.js 20 ou superior.
- Conta Mercado Pago e aplicação criada em Mercado Pago Developers.
- Access Token de teste para homologação; use credenciais de produção somente após testar.
- Hospedagem capaz de executar Node.js com HTTPS público e armazenamento persistente.

## Instalação local
1. Entre nesta pasta (`portfolio/projetos/passo`).
2. Instale dependências: `npm install`.
3. Copie `.env.example` para `.env`.
4. Preencha `MP_ACCESS_TOKEN`.
5. Para pagamentos/webhooks reais, configure `BASE_URL` para a URL pública HTTPS e preencha `MP_WEBHOOK_SECRET`.
6. Execute `npm start`.
7. Abra a URL informada no terminal. O endpoint `/api/health` informa se as credenciais estão configuradas.

> O Mercado Pago precisa alcançar o endpoint de webhook via HTTPS público. Para testes locais, use um túnel HTTPS e defina `BASE_URL` com essa URL. `localhost` não recebe notificações do Mercado Pago.

## Configuração de webhook
No painel Mercado Pago Developers, configure a URL:
`https://SEU-DOMINIO/api/webhooks/mercadopago`

Habilite notificações de **Orders / Checkout Pro**, copie a assinatura secreta para `MP_WEBHOOK_SECRET` e mantenha o servidor acessível por HTTPS.

## Publicação
Este projeto contém front-end estático e backend Node.js. Enviar os arquivos por FTP para uma hospedagem exclusivamente estática **não ativa o pagamento**. Publique o diretório em um serviço que execute Node.js (ou hospede o backend separadamente e ajuste os caminhos `/api/...` no front-end para o domínio da API, com CORS restrito).

A pasta `server/data` contém o banco SQLite e precisa ser persistente, gravável e incluída nos backups. Para alto volume, migre a persistência para PostgreSQL gerenciado e configure backups, monitoramento, logs e política de retenção de dados pessoais.

## Segurança e limitações
- Nunca compartilhe ou versione o arquivo `.env` nem coloque `MP_ACCESS_TOKEN` no JavaScript.
- O status é consultado no servidor diretamente na API do Mercado Pago; os parâmetros da URL de retorno não são tratados como prova de pagamento.
- O status aprovado só deve liberar separação/entrega depois de validado pelo servidor.
- Configure política de privacidade/retention para os dados pessoais de entrega.
- Este pacote não pode ser ativado em produção sem credenciais válidas, URL HTTPS, configuração do webhook e testes da conta do vendedor. Não foram incluídas credenciais no ZIP.
