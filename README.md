# 🐊 Renekton Guide • O Guia Definitivo do Godrekton

[![React](https://img.shields.io/badge/React-19.0-61dafb?style=for-the-badge&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178c6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![League of Legends](https://img.shields.io/badge/League%20of%20Legends-170%20Matchups-c8aa6e?style=for-the-badge&logo=riotgames)](https://leagueoflegends.com/)

Aplicação web moderna, responsiva e ultrarrápida desenvolvida para jogadores de **Renekton (League of Legends)**, baseada na clássica planilha enciclopédica criada pelo pro player e criador de conteúdo **Godrekton** (12 anos de mono Renekton).

O objetivo principal deste projeto é solucionar a dificuldade de navegação e busca rápida em planilhas do Excel durante as partidas, oferecendo uma interface limpa, imersiva no tema Shurima/Renekton, com fotos oficiais da Riot Games e atalhos rápidos de teclado.

---

## ⚡ Principais Funcionalidades

### 1. 🛡️ Matchup Hub (170 Campeões)
- **Busca Instantânea**: Foco automático na barra com suporte a atalhos (`/` ou `Ctrl+K`) para achar o oponente em 2 segundos durante a tela de carregamento.
- **Filtros Rápidos por Dificuldade**: Todos (170), Fácil (1-3), Médio (4-7) e Difícil (8-10).
- **Ordenação**: Alfabética (A-Z), Mais Difíceis primeiro ou Mais Fáceis primeiro.
- **Cheat-Sheet Rápido (Visão Pré-Jogo de 5 segundos)**:
  - Runas Recomendadas (PTA, Conqueror, Eletrocutar, Grasp)
  - Itens Iniciais (Lâmina de Doran, Escudo, Espada Longa)
  - Feitiços de Invocador (Incendiar, Teleporte, Fantasma, Flash)
  - Ordem de Maximização (`Q > E > W`)
  - Medidor visual de dificuldade da partida
- **Resumo Tático da Rota**: Condição de vitória macro e dinâmica do confronto.
- **Dicas Passo a Passo**: Dicas táticas numeradas com estratégias de nível 1, esquiva de habilidades perigosas, rush de corta-cura e combos recomendados.
- **Gameplay em Vídeo**: Link direto para a gameplay do Godrekton contra o campeão no YouTube.
- **Navegação com Teclado**: Use as setas `←` e `→` para navegar entre os campeões.

### 2. ⚡ Combos & Mecânicas Avançadas
- Cancelamentos de animação de ataque básico (Auto Attack Cancels: `AA > Q`, `AA > W`, `AA > E`, `AA > R`).
- Interações com itens ativos: Hidra Raivosa, Quebrapassos e Hidra Profana.
- Mecânicas de Q (Buffering contra controle de grupo e Q Flash).
- Mecânicas de W (Destruição de escudos, 3 acertos de efeitos de contato e cancelamento `W > R`).
- Mecânicas de E (E Flash e remoção de delay entre E1 e E2).
- Mecânicas de R (Aumento de alcance +25 range e cancelamento `R > AA`).
- Diagramas visuais em alta resolução de trocas curtas e all-in.

### 3. 🔥 Gerenciamento de Fúria (Fury Management)
- Regras dos 50+ de Fúria e quando fortalecer cada habilidade:
  - **Q Fortalecido**: Dano ampliado e cura triplicada contra campeões (sustain).
  - **W Fortalecido**: Destrói escudos inimigos e aplica 1.5s de atordoamento com dano massivo (225% AD).
  - **E Fortalecido**: Destrói até 35% da armadura do alvo por 4 segundos (anti-tanque).
- Infográfico oficial de geração e manutenção de fúria.
- Preparação de rota e métodos de treino.

### 4. ⚔️ Runas, Feitiços & Builds
- Comparativo detalhado: **PTA vs Conqueror**.
- 6 páginas visuais completas de Runas do Godrekton.
- Builds completas: Core Bruiser, Alto Dano e Letalidade / Assassino.
- Tier list de itens individuais (S, A, B, C, D) e critério de escolha de botas.
- Recomendações de habilidades no nível 1 e maximização.

### 5. 🐊 Skins, FAQ & Sobre
- Tier list visual de fluidez de animação e hitbox das skins do Renekton.
- Perguntas frequentes (FAQ) respondidas pelo Godrekton.
- História e links da comunidade oficial.

---

## 🚀 Como Executar o Projeto Localmente

### Pré-requisitos
- [Node.js](https://nodejs.org/) (versão 18+)

### Instalação e Execução

1. Clone o repositório:
```bash
git clone https://github.com/SEU_USUARIO/renekton-guide.git
cd renekton-guide
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev -- --host --open
```

> **No Windows**: Você pode simplesmente dar **duplo clique** no arquivo `iniciar-guia.bat`!

---

## 📱 Acesso no Celular / Tablet (Segunda Tela)

Ao rodar com `--host`, o terminal mostrará seu IP local (ex: `http://192.168.1.15:5173/`).
Basta acessar esse endereço no navegador do seu smartphone ou tablet conectado na mesma rede Wi-Fi para usar o guia enquanto joga no computador!

---

## 🛠️ Tecnologias Utilizadas

- **React 19**
- **Vite 8**
- **Tailwind CSS v4**
- **TypeScript**
- **Lucide React** (Ícones)
- **Riot Games Data Dragon API** (Avatares oficiais de campeões)

---

## 📄 Licença e Créditos

- **Conteúdo do Guia**: Todo o conhecimento tático, notas e gráficos são de autoria do criador **Godrekton** ([YouTube](https://www.youtube.com/@Godrekton)).
- **Código Fonte**: Licença MIT.
