# Inventário da interface atual do Astrea

O que existe hoje em tela, antes de qualquer proposta. Serve ao diagnóstico
de consistência da Q1. É o "inventário do mês 1" que o plano da Q2 promete.
É a base do redesenho da Q3.

Fonte: os prints em `evidencias/`. Cor por amostragem de pixel, pela cor
mais frequente em cada região. Valor de cor de texto é aproximado, porque
o antialias contamina a amostra. Valor de cor de fundo e de botão é exato.

Fato e inferência separados. Inferência marcada com [I].

## Cores encontradas

| Onde aparece | Hex | Observação |
|---|---|---|
| Fundo da página e dos widgets | `#ffffff` | |
| Fundo da caixa de estado vazio | `#f1f3f4` | |
| Divisor do menu lateral | `#dee2e6` | Igual ao cinza 3 da paleta padrão do Mantine |
| Texto principal, títulos | `#202124` | Igual ao cinza 900 do Material, do Google |
| Texto secundário, itens do menu | `#6c757d` | Igual ao cinza 600 do Bootstrap |
| Botão primário, links, números em azul | `#228be6` | Igual ao azul 6 da paleta padrão do Mantine |
| Logo Astrea | `#008fd5` | Igual ao azul do site de marketing |
| Botão "Contratar" | `#02883c` | Verde, só nesta chamada comercial |
| IA: texto e ícone | `#5159a2` e `#5e4ece` | Roxo, só nos itens de IA |
| IA: fundo do item ativo | `#e6e8f9` | |
| Faixa de campanha: fundo | `#fbffa5` | Amarelo da campanha |
| Faixa de campanha: botão e azul | `#0255c4` | Terceiro azul da tela |
| Faixa de campanha: chip | `#8be3ff` | |

[I] Três azuis diferentes na mesma tela: `#008fd5` da marca, `#228be6` do
componente, `#0255c4` da campanha. Três cinzas de texto vindos de três
bibliotecas diferentes. É a evidência concreta de "times diferentes
construindo partes diferentes".

[I] O azul do botão e o cinza do divisor batem com os valores padrão do
Mantine. Hipótese inicial: o front novo usa Mantine sem tema próprio.

Fato, lido no CSS do produto logado em 07/11, pelo Claude in Chrome:

- O Astrea declara 646 variáveis CSS. 609 têm o prefixo `--nectar-legacy-`.
  Existe um design system legado em código, chamado Nectar. O briefing
  diz "não existe DS estruturado"; existe um, legado e sem Figma.
- As 36 variáveis fora do Nectar são a paleta de hoje. `--primary`
  `#228BE6`, `--primary900` `#1D6BB7`, `--primary100` `#DAF3FF`. Cinzas de
  `--gray100` a `--gray900`. `--danger`, `--success` e `--warning`, cada
  uma com degraus 100 e 900.
- A fonte é `museo-sans`, declarada em `--primary-font`. O corpo usa peso
  300 em 14px. Escala de texto: 10, 12, 14, 16. Títulos: 20, 24, 32, 48.
- Raio dominante: 8px em 28 elementos; 4px em 4.
- Os cinco ícones do cabeçalho têm nome no código: Adicionar, Resultados
  de buscas, Cronômetro timesheet, Administração, e o de IA.
- Botão primário "Adicionar tarefa": `#228BE6` com texto branco, caixa
  alta, 12px, peso 800, raio 8. Botão "Contratar": `#02883C`.

[I] O `#228BE6` é o `--primary` deles, não um default de biblioteca. A
coincidência com o Mantine é do valor, não da origem. A hipótese do
Mantine cai. A conclusão para a Q2 fica mais forte. Os primitivos do DS
novo nascem do Nectar. A fase 2 começa renomeando, não inventando.

Os 609 tokens do Nectar ficam em `referencias/nectar-tokens.json`.

## Componentes vistos, por tela

### Cadastro no site (telas 01 a 04)

| Componente | Variação vista | Nota |
|---|---|---|
| Barra de progresso | Sem rótulo, sem contagem | Padrão diferente do stepper do produto |
| Campo de texto | Rótulo acima, raio 8px | |
| Botão primário | Azul, caixa baixa, raio 8px | |
| Botão secundário | "Voltar" com seta, texto | Anel de foco preto do navegador |
| Chip de regra | Verde com check, em tempo real | Bom padrão, candidato ao DS |
| Cartão | Branco, raio grande, sombra | |

### Onboarding do produto (telas 05 a 10)

| Componente | Variação vista | Nota |
|---|---|---|
| Stepper | Cinco passos com rótulo, verde | Melhor dos dois padrões de progresso |
| Cartão de opção | Ícone em caixa cinza, título e descrição | Lista de escolha única |
| Botão primário | Azul, caixa alta, largura total | Caixa alta aqui, caixa baixa no site |
| Botão secundário | Texto cinza em caixa alta, ou link | Dois estilos para a mesma função |
| Campo de texto | Sem rótulo visível, placeholder no lugar | Rótulo some quando preenchido |
| Seletor | Anel de foco azul | Foco azul aqui, preto no site |
| Caixa de aviso | Cinza com ícone de escudo | |
| Caixa de dica | Cinza, "Dica:" em negrito | |
| Tela de confirmação | Ilustração, título, lista de checks | Sem ação do usuário |

### Área de trabalho (tela 11)

| Componente | Variação vista | Nota |
|---|---|---|
| Faixa de campanha | Amarela, no topo do produto | Dentro da moldura |
| Cabeçalho | Logo, busca global, cinco ícones sem rótulo, usuário, selo, botão verde | Três chamadas comerciais |
| Menu lateral | Dez itens com ícone, divisor, item de IA em roxo | Sem Kanban no menu |
<!-- lint-ignore: deriva-terminologica — "Pesquisar" é o texto literal do campo -->
| Busca global | Placeholder "Pesquisar contato, processo ou tarefa" | |
| Estado vazio | Título, caixa com quatro passos, botão, link | |
| Botão primário | Azul, caixa alta, com ícone de mais | Terceira variação de botão primário |
| Widget | Título, "Ocultar", botão de mais, conteúdo | Três na coluna direita |
| Seletor nativo | "Últimos 30 dias" | Componente do navegador no meio dos customizados |
| Link | Azul, usado para ação e para número | Mesma cor para dado e para ação |

## Vocabulário

| Palavra | Onde | Nota |
|---|---|---|
| Tarefa | Produto: estado vazio, busca, botão | |
| Atividade | Enunciado, menu "Agenda" | A confirmar na tela de criação |
| Processos e casos | Menu | |
| Atendimento | Menu e passo 3 do estado vazio | |

## Como coletar o que o print não mostra

Cole no console do navegador, logado no Astrea. Só lê, não altera nada.
Mande a saída para o registro.

```js
(() => {
  const root = getComputedStyle(document.documentElement);
  const vars = {};
  for (const sheet of document.styleSheets) {
    let rules; try { rules = sheet.cssRules; } catch { continue; }
    for (const r of rules) {
      if (!r.style) continue;
      for (const p of r.style) if (p.startsWith("--")) vars[p] = r.style.getPropertyValue(p).trim();
    }
  }
  const fonts = {}, radii = {}, btns = [];
  document.querySelectorAll("body *").forEach(el => {
    const cs = getComputedStyle(el);
    fonts[cs.fontFamily] = (fonts[cs.fontFamily] || 0) + 1;
    if (cs.borderRadius !== "0px") radii[cs.borderRadius] = (radii[cs.borderRadius] || 0) + 1;
  });
  document.querySelectorAll("button, [role=button], a.btn").forEach(b => {
    const cs = getComputedStyle(b);
    btns.push([b.innerText.trim().slice(0, 30), cs.backgroundColor, cs.color, cs.borderRadius, cs.textTransform, cs.fontSize, cs.fontWeight].join(" | "));
  });
  const classes = new Set();
  document.querySelectorAll("[class]").forEach(el => el.classList.forEach(c => { const m = c.match(/^(mantine|MuiC|chakra|ant-|btn-|bp\d|rs-)/); if (m) classes.add(m[1]); }));
  console.log(JSON.stringify({ vars, fonts, radii, btns: [...new Set(btns)], libs: [...classes] }, null, 2));
})();
```

O que ele devolve, em cinco blocos. Variáveis CSS declaradas. Famílias de
fonte em uso, com contagem. Raios em uso, com contagem. Cada botão com cor,
raio e caixa. Prefixos de classe que denunciam a biblioteca, como
`mantine-`, `Mui` e `ant-`.
