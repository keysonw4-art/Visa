# Visa Contabilidade

Site institucional desenvolvido para um escritório de contabilidade de Cascavel. O projeto combina aquisição de leads, conteúdo especializado, SEO local e proteção dos formulários públicos.

## Funcionalidades

1. Páginas institucionais e páginas de serviços
2. Conteúdo segmentado por perfil de empresa
3. Blog em MDX com categorias e paginação
4. Glossário contábil
5. Formulário de contato com validação
6. Proteção contra abuso com Turnstile e limitação de requisições
7. Envio de email com Resend
8. Metadados, dados estruturados, sitemap e conteúdo para mecanismos de busca
9. Gestão de consentimento para ferramentas de análise

## Arquitetura

O projeto usa o App Router do Next.js. O conteúdo editorial é validado durante a geração do site e as configurações institucionais ficam centralizadas em `lib/site.config.ts`.

A rota de contato valida origem, tamanho da requisição e campos recebidos antes do envio. Os controles de segurança e as variáveis privadas permanecem somente no servidor.

## Tecnologias

Next.js 16, React 19, TypeScript, Velite, MDX, Zod, React Hook Form, Resend, Turnstile, Tailwind CSS e GSAP.

## Executar localmente

1. Instale o Node.js
2. Execute `pnpm install`
3. Copie `.env.example` para `.env.local`
4. Execute `pnpm dev`
5. Acesse `http://localhost:3000`

O modo padrão do email é simulado. Dessa forma, o projeto pode ser avaliado localmente sem enviar mensagens reais.

## Qualidade

```bash
pnpm lint
pnpm build
```

## Status

Projeto em produção para um cliente real. Dados institucionais exibidos no site são públicos. Credenciais e configurações privadas não fazem parte do repositório.

## Uso do código

Código disponibilizado para avaliação técnica. A marca e o conteúdo institucional pertencem à Visa Contabilidade.
