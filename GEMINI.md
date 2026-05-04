# Projeto: Portfolio Pessoal (matheusmarnt.github.io)

## Contexto Geral
Portfolio moderno de Engenheiro de Software focado em Govtech, IA e ecossistema Laravel. Design "dark mode" tecnológico com elementos interativos e gamificados.

## Diretrizes de Desenvolvimento (Guidelines)
- **UI/UX Pattern**: Seguir padrão "UX Pro Max" — animações suaves, glassmorphism, feedback tátil e visual premium.
- **Tech Stack**: Alpine.js (reatividade), Tailwind CSS (estilização), HTML5 Canvas (games/visuals).
- **Acessibilidade**: Manter conformidade WCAG AA. Elementos flutuantes devem ser acessíveis.
- **Internacionalização (i18n)**: Sempre suportar `pt` e `en`. Novas strings devem ser adicionadas em ambos os dicionários no objeto `translations`.
- **Navegação**: O site utiliza um navegador de seções dinâmico (Floating Navigator). Novas seções devem ser registradas no método `navigate` e possuir `id` correspondente.

## Implementações Chave (Histórico)

### 1. Snake Game (Snake_OS v1.0)
- **Localização**: Seção final (`#game`). Oculto dos menus principais para ser um "easter egg" de fim de página.
- **Animações Pac-Man**: A cobra abre a boca ao se aproximar da comida (raio de 3 casas) usando interpolação de ângulos no Canvas.
- **Efeito Explosão**: Partículas geradas ao consumir comida com sistema de ciclo de vida (`life`, `alpha`, `size`).
- **Navegação**: Integrado como última parada do Floating Navigator.

### 2. Navegador Dinâmico (Floating Navigator)
- **Comportamento**: Centralizado na home, move-se para a lateral direita (ou esquerda conforme config) em outras seções.
- **Lógica**: Usa `x-intersect` para detectar a seção ativa e despachar eventos para o componente global.

### 3. Terminal Loader & Typing
- **Intro**: Simulação de terminal Linux carregando o portfolio.
- **Typing Animation**: Ciclo infinito de cargos/especialidades no Hero com efeito de deleção e escrita.

### 4. LiveCharts Project
- **Localização**: Seção de projetos (`#projetos`).
- **Conteúdo**: Adicionado card de projeto LiveCharts com suporte i18n e efeito tilt reativo.

## Regras de Workflow (Git)
- **Branching**: `feat/` para novas funcionalidades, `fix/` para correções.
- **Commits**: Seguir Conventional Commits.
- **Pull Requests**: Sempre usar `gh pr create` e `gh pr merge` para manter o histórico limpo e rastreável.
- **Ignore**: O diretório `docs/` é ignorado pelo Git para economizar tokens de contexto em repositórios remotos, mas mantido localmente para referência de specs/plans.

---
*Documento gerado para promover economia de tokens e alinhamento técnico imediato de novos agentes.*
