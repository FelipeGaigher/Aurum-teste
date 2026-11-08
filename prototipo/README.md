# Protótipo navegável do Astrea

Este protótipo mostra a plataforma Astrea inteira, com o Kanban no topo do menu e os módulos abaixo dele. Ele funciona local, sem rede e sem build. Não precisa de instalação.

## 1. Como abrir

Dê dois cliques no arquivo `prototipo/area-de-trabalho.html`. O arquivo abre no navegador, e o menu leva às outras páginas.

Você também pode abrir pelo servidor local. Na raiz do repositório, execute:

```bash
python -m http.server 8000
```

Depois abra `http://localhost:8000/prototipo/area-de-trabalho.html` no navegador.

## 2. As páginas

O menu segue a ordem do Astrea. O grupo "Especialista UX/UI" fica no topo, com duas páginas novas.

| Página | Arquivo | O que mostra |
|---|---|---|
| Gestão kanban | `kanban.html` | O quadro de atividades e o plano de 12 meses do redesign |
| Design system | `design-system.html` | Fundamentos, componentes, estados e propriedades |
| Área de trabalho | `area-de-trabalho.html` | Atrasadas acima de Hoje, prazos na área principal, a tela da Q3 |
| Agenda | `agenda.html` | Dia, semana e mês, com abertura em Hoje e criar atividade |
| Contatos | `contatos.html` | Lista em tabela ou cards, ficha e adicionar contato |
| Atendimentos | `atendimentos.html` | Lista e adicionar atendimento |
| Processos e casos | `processos.html` | Lista, ficha, adicionar processo, caso e busca automática |
| Resultados de buscas | `buscas.html` | As três abas da busca automática, dentro de Processos |
| Publicações | `publicacoes.html` | Módulo bloqueado no plano de teste, com o upsell |
| Financeiro | `financeiro.html` | Módulo bloqueado no plano de teste, com o upsell |
| Documentos | `documentos.html` | Modelos e o fluxo do documento padrão |
| Indicadores | `indicadores.html` | Módulo bloqueado no plano de teste, com o upsell |
| Alertas | `alertas.html` | Alertas por tipo, com detalhe e descarte |
| Suporte | `suporte.html` | Canais de ajuda |
| Conheça as IAs | `ias.html` | As quatro IAs, três delas com upsell |
| Administração | `administracao.html` | Escritório, usuários, modelos, certificados e plano, pelo menu do usuário |

O botão "Adicionar" do cabeçalho abre o formulário certo de cada módulo. O item "Tarefa" e o item "Evento" abrem o painel de criar atividade na Agenda.

## 3. Os arquivos compartilhados

Toda página nova monta a tela com quatro arquivos. A tag `script` é clássica, porque `type="module"` falha em `file://`.

- `astrea.css` guarda os tokens, a moldura e os componentes. Cor literal só existe no bloco de primitivos.
- `moldura.js` monta o cabeçalho e o menu lateral, marca o item ativo e guarda o tema e o menu recolhido.
- `componentes.js` monta as peças do design system: seletor, data, caixa, rádio, toast, painel lateral e as outras.
- `dados.js` guarda os dados fictícios que as páginas compartilham.

O Kanban mantém cópia própria dos tokens e da moldura. O portão estático compara a cópia com `astrea.css` e `moldura.js`.

## 4. O que é fictício

Tudo o que aparece no protótipo é fictício. Isso vale para os dados, os nomes e os processos.

- As atividades nascem do array `ATIVIDADES` do Kanban.
- Os nomes dos responsáveis, dos contatos e o nome no menu do usuário.
- Os números de processo. Eles seguem o padrão CNJ, mas não são reais.
- Os prazos. Eles caem perto da data de abertura, e alguns estão vencidos.

## 5. O que fica fora

Estes itens não entram no protótipo:

- Persistência de dados. Ao recarregar a página, a tela volta ao dado fictício. Só o tema, o menu recolhido e algumas escolhas de leitura ficam guardados.
- Salvar de verdade. Os formulários abrem e verificam os campos, mas nada vai para um servidor.
- O que exige dado, serviço ou permissão nova. Módulo de plano superior e o Cronômetro ficam bloqueados, como no plano de teste do Astrea.

## 6. Como verificar

O protótipo tem dois portões. Execute os comandos a partir da raiz do repositório.

O portão estático não abre o navegador:

```bash
python prototipo/test_verificar.py
python prototipo/verificar.py --todos --base-kanban --sincronia
python prototipo/verificar.py --dados-reais <lista>
```

O primeiro comando testa o verificador. O segundo verifica cor, rede e o detector da skill `sem-plastico` em cada página. Ele também compara o Kanban com a base e com os compartilhados. O terceiro busca os termos de uma lista de nomes reais. A lista fica fora do repositório, e o relatório traz arquivo e contagem, nunca o termo.

O portão de navegador abre cada página no Chrome, sem janela:

```bash
node scripts/verificar-app.js
```

Ele imprime uma linha por requisito, de RF-01 a RF-15, menos RF-02, RF-13 e RF-14, que são do portão estático. Os dois portões terminam com código 0 quando passam.
